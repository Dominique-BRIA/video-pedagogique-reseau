# Vidéos pédagogiques — Administration des réseaux

Série de vidéos courtes (4 à 6 min) tirées du cours *Administration des Réseaux*
(ENSP Yaoundé, version 2026), réalisées avec [Remotion](https://www.remotion.dev).

Plan : 32 vidéos en 7 modules. Les principes de conception (Mayer, Brame, Guo)
sont résumés dans [docs/principes-pedagogiques.md](docs/principes-pedagogiques.md).

| Module | Vidéos | État |
|---|---|---|
| 1 · Introduction | 1 · Le métier d'administrateur réseau — 2 · Le fil rouge : le Wi-Fi du campus | terminé |
| 2 · Fondamentaux | 3 à 5 | à faire |
| 3 · Ingénierie du trafic | 6 à 9 | à faire |
| 4 · Modèle OSI, CMIP, ASN.1, MIB | 10 à 16 | à faire |
| 5 · Diagnostic et SNMP | 17 à 21 | à faire |
| 6 · Supervision et gestion IT | 22 à 27 | à faire |
| 7 · Actualisation 2026 | 28 à 32 | à faire |

## Fabriquer une vidéo

1. **Script** : `narration/<id>.json`. Chaque scène a son texte ; `{c:nom}` marque le
   mot où un élément visuel doit apparaître.
2. **Voix** : `py -I scripts/voix.py <id>` génère la voix (edge-tts, voix
   `fr-FR-RemyMultilingualNeural`), les repères dans `src/generated/<id>.json`
   et les sous-titres `out/<id>.srt`.
3. **Visuels** : une scène React par scène du script dans `src/videos/<id>.tsx`,
   avec le kit commun `src/kit/`, puis enregistrement dans `src/Root.tsx`.
4. **Aperçu** : `npm run dev` (Remotion Studio).
5. **MP4** : `py -I scripts/assembler.py <id> <composition> out/<fichier>.mp4`.

Sur le poste de développement, le FFmpeg fourni avec Remotion plante au hasard :
`npx remotion render` en MP4 échoue. `scripts/assembler.py` exporte les images avec
Remotion, monte le son en Python, puis encode avec le FFmpeg officiel installé dans
`D:\Tools\ffmpeg\`.

## Organisation du dépôt

- `main` : vidéos validées uniquement.
- `module-N` : une branche par module en cours, fusionnée dans `main` une fois le
  module validé, puis marquée d'une étiquette `module-N`.
- Les MP4 ne sont pas dans Git (trop lourds) : ils se régénèrent avec le script, ou
  se publient en pièce jointe d'une Release GitHub par module.

## Prérequis

- Node.js ≥ 20 et `npm install`
- Python (`py`) avec edge-tts : `py -m pip install --target D:\Tools\pylib edge-tts`
- FFmpeg officiel dans `D:\Tools\ffmpeg\`
- `npx remotion skills add` pour réinstaller les compétences Remotion de l'agent

Remotion est gratuit pour les équipes de 3 personnes au plus.
