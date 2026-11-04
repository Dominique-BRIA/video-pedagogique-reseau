"""Génère la voix off d'une vidéo à partir de narration/<id>.json.

Pour chaque scène :
  - public/voix/<id>/<scene>.mp3      (voix neuronale edge-tts)
et pour la vidéo :
  - src/generated/<id>.json            (durées, repères {c:nom} en secondes)
  - out/<id>.srt                       (sous-titres, piste séparée)

Usage : py scripts/voix.py m1v1 [m1v2 ...]
Les repères s'écrivent {c:nom} juste avant le mot où l'élément visuel doit apparaître.
"""

import sys

sys.path.insert(0, "D:/Tools/pylib")  # edge-tts installé sur D: (C: presque plein)

import asyncio
import json
import math
import re
from pathlib import Path

import edge_tts

RACINE = Path(__file__).resolve().parent.parent
FPS = 30
CUE = re.compile(r"\{c:([a-z0-9_]+)\}")
OCTETS_PAR_SECONDE = 48000 / 8  # edge-tts : mp3 24 kHz, 48 kbit/s CBR


def separer_reperes(texte: str):
    """Retire les {c:nom} et renvoie (texte propre, {nom: position caractère})."""
    propre, reperes, curseur = [], {}, 0
    for m in CUE.finditer(texte):
        propre.append(texte[curseur : m.start()])
        reperes[m.group(1)] = len("".join(propre))
        curseur = m.end()
    propre.append(texte[curseur:])
    return re.sub(r"\s+", " ", "".join(propre)).strip(), reperes


async def synthese(texte, voix, debit, chemin_mp3):
    mots = []
    com = edge_tts.Communicate(texte, voix, rate=debit, boundary="WordBoundary")
    with open(chemin_mp3, "wb") as f:
        async for bloc in com.stream():
            if bloc["type"] == "audio":
                f.write(bloc["data"])
            elif bloc["type"] == "WordBoundary":
                debut = bloc["offset"] / 1e7
                mots.append({"t": bloc["text"], "s": debut, "e": debut + bloc["duration"] / 1e7})
    return mots


def placer_mots(texte, mots):
    """Associe à chaque mot sa position dans le texte propre."""
    pointeur = 0
    for mot in mots:
        idx = texte.find(mot["t"], pointeur)
        if idx == -1:
            idx = texte.lower().find(mot["t"].lower(), pointeur)
        if idx != -1:
            mot["pos"] = idx
            pointeur = idx + len(mot["t"])
        else:
            mot["pos"] = pointeur


def temps_repere(mots, position):
    for mot in mots:
        if mot["pos"] >= position:
            return round(mot["s"], 3)
    return round(mots[-1]["s"], 3) if mots else 0.0


def blocs_sous_titres(texte, mots, max_car=84):
    """Découpe en phrases (puis aux virgules si trop long) et date chaque bloc."""
    morceaux = re.findall(r"[^.!?;:]+[.!?;:]?", texte)
    blocs = []
    for m in morceaux:
        m = m.strip()
        if not m:
            continue
        if len(m) <= max_car:
            blocs.append(m)
            continue
        courant = ""
        for partie in re.split(r"(?<=,)\s", m):
            if courant and len(courant) + len(partie) + 1 > max_car:
                blocs.append(courant)
                courant = partie
            else:
                courant = f"{courant} {partie}".strip()
        if courant:
            blocs.append(courant)
    resultat, pointeur = [], 0
    for b in blocs:
        debut_car = texte.find(b, pointeur)
        fin_car = debut_car + len(b)
        pointeur = fin_car
        dedans = [w for w in mots if debut_car <= w["pos"] < fin_car]
        if dedans:
            resultat.append((b, dedans[0]["s"], dedans[-1]["e"]))
    return resultat


def horodatage_srt(s):
    ms = int(round(s * 1000))
    h, ms = divmod(ms, 3600000)
    m, ms = divmod(ms, 60000)
    sec, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{sec:02},{ms:03}"


async def traiter(video_id):
    conf = json.loads((RACINE / "narration" / f"{video_id}.json").read_text(encoding="utf-8"))
    dossier_audio = RACINE / "public" / "voix" / video_id
    dossier_audio.mkdir(parents=True, exist_ok=True)

    scenes, srt, debut_scene, n = [], [], 0.0, 1
    for sc in conf["scenes"]:
        texte, reperes = separer_reperes(sc["text"])
        mp3 = dossier_audio / f"{sc['id']}.mp3"
        mots = await synthese(texte, conf["voice"], conf.get("rate", "+0%"), mp3)
        placer_mots(texte, mots)
        duree = max(mp3.stat().st_size / OCTETS_PAR_SECONDE, (mots[-1]["e"] + 0.15) if mots else 0)
        frames = math.ceil((duree + sc.get("pauseAfter", 0.8)) * FPS)
        cues = {nom: temps_repere(mots, pos) for nom, pos in reperes.items()}
        scenes.append(
            {
                "id": sc["id"],
                "section": sc["section"],
                "audio": f"voix/{video_id}/{sc['id']}.mp3",
                "audioSec": round(duree, 3),
                "pauseAfter": sc.get("pauseAfter", 0.8),
                "countdown": sc.get("countdown", False),
                "frames": frames,
                "cues": cues,
            }
        )
        for txt, s, e in blocs_sous_titres(texte, mots):
            srt.append(f"{n}\n{horodatage_srt(debut_scene + s)} --> {horodatage_srt(debut_scene + e + 0.2)}\n{txt}\n")
            n += 1
        debut_scene += frames / FPS
        print(f"  {sc['id']:<14} {duree:6.1f} s  repères : {', '.join(cues) or '-'}")

    sortie = {k: conf[k] for k in ("id", "titre", "module", "numero")}
    sortie["fps"] = FPS
    sortie["scenes"] = scenes
    (RACINE / "src" / "generated").mkdir(parents=True, exist_ok=True)
    (RACINE / "src" / "generated" / f"{video_id}.json").write_text(
        json.dumps(sortie, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (RACINE / "out").mkdir(exist_ok=True)
    (RACINE / "out" / f"{video_id}.srt").write_text("\n".join(srt), encoding="utf-8")
    total = sum(s["frames"] for s in scenes) / FPS
    print(f"{video_id} : {total // 60:.0f} min {total % 60:02.0f} s, {len(scenes)} scènes")


if __name__ == "__main__":
    for vid in sys.argv[1:]:
        asyncio.run(traiter(vid))
