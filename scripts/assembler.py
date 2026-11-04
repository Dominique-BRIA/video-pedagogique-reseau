"""Rendu final d'une vidéo en MP4.

Pourquoi pas « npx remotion render » directement : sur ce poste, le FFmpeg fourni
avec Remotion plante au hasard (code 259). On découpe donc le travail :
  1. piste son : chaque MP3 de scène converti en WAV, complété par son silence
     (durée exacte de la scène), puis mis bout à bout en Python → son.wav ;
  2. images : Remotion exporte une suite de JPEG (sans FFmpeg) ;
  3. le FFmpeg officiel (D:/Tools/ffmpeg, build gyan.dev) encode images + son.

Usage : py scripts/assembler.py <video-id> <composition-id> <sortie.mp4> [--encoder-seulement]
   ex : py scripts/assembler.py m1v1 m1v1-metier-administrateur out/M1-V1.mp4
--encoder-seulement : réutilise son.wav et les images déjà présentes dans D:/Temp/rendu/<id>.
"""

import json
import shutil
import subprocess
import sys
import wave
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
FFMPEG = '"D:/Tools/ffmpeg/ffmpeg.exe"'
ENV_TEMP = "set TEMP=D:\\Temp&& set TMP=D:\\Temp&& "


def lancer(commande: str):
    print(">", commande[:160], flush=True)
    subprocess.run(ENV_TEMP + commande, shell=True, check=True, cwd=RACINE)


def piste_son(donnees, travail: Path) -> Path:
    fps, taux, morceaux = donnees["fps"], 24000, []
    for i, sc in enumerate(donnees["scenes"]):
        wav = travail / f"scene{i:02}.wav"
        lancer(
            f'{FFMPEG} -hide_banner -loglevel error -y -i "{RACINE / "public" / sc["audio"]}" '
            f'-ar {taux} -ac 1 -c:a pcm_s16le "{wav}"'
        )
        with wave.open(str(wav), "rb") as w:
            pcm = w.readframes(w.getnframes())
        echantillons = round(sc["frames"] / fps * taux)
        morceaux.append(pcm[: echantillons * 2].ljust(echantillons * 2, b"\x00"))
    son = travail / "son.wav"
    with wave.open(str(son), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(taux)
        w.writeframes(b"".join(morceaux))
    return son


def main(video_id: str, composition: str, sortie: str, encoder_seulement: bool):
    donnees = json.loads((RACINE / "src" / "generated" / f"{video_id}.json").read_text(encoding="utf-8"))
    fps = donnees["fps"]
    travail = Path("D:/Temp/rendu") / video_id

    if not encoder_seulement:
        shutil.rmtree(travail, ignore_errors=True)
        (travail / "images").mkdir(parents=True)
        piste_son(donnees, travail)
        lancer(
            f'npx remotion render {composition} "{travail / "images"}" --sequence '
            f"--image-format=jpeg --jpeg-quality=92 --muted --log=error"
        )

    images = sorted((travail / "images").glob("*.jpeg"))
    attendu = sum(s["frames"] for s in donnees["scenes"])
    if len(images) != attendu:
        raise SystemExit(f"{len(images)} images trouvées, {attendu} attendues")
    premier = images[0].stem  # ex. element-0000
    prefixe = premier.rstrip("0123456789")
    chiffres = len(premier) - len(prefixe)

    chemin_sortie = (RACINE / sortie).resolve()
    lancer(
        f"{FFMPEG} -hide_banner -loglevel error -y -framerate {fps} -start_number 0 "
        f'-i "{travail / "images" / (prefixe + "%0" + str(chiffres) + "d.jpeg")}" -i "{travail / "son.wav"}" '
        f"-c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p -c:a aac -b:a 128k "
        f'-movflags +faststart -shortest "{chemin_sortie}"'
    )
    shutil.rmtree(travail, ignore_errors=True)
    print(f"OK {chemin_sortie} ({chemin_sortie.stat().st_size / 1e6:.1f} Mo)", flush=True)


if __name__ == "__main__":
    main(*sys.argv[1:4], encoder_seulement="--encoder-seulement" in sys.argv)
