import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, interpolate, Series, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneProvider } from "./scene";
import { C, fontFamily } from "./theme";
import { CompteARebours } from "./ui";

export type SceneDonnees = {
  id: string;
  section: string;
  audio: string;
  audioSec: number;
  pauseAfter: number;
  countdown: boolean;
  frames: number;
  cues: Record<string, number>;
};

export type DonneesVideo = {
  id: string;
  titre: string;
  module: string;
  numero: string;
  fps: number;
  scenes: SceneDonnees[];
};

export const dureeTotale = (d: DonneesVideo) => d.scenes.reduce((s, x) => s + x.frames, 0);

// Fondu court à l'entrée et à la sortie de chaque scène (pas de transition spectaculaire).
const Fondu: React.FC<{ duree: number; children: React.ReactNode }> = ({ duree, children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10, duree - 10, duree], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

// Bandeau : titre de la vidéo, chapitre en cours, barre de progression par chapitre.
const Cadre: React.FC<{ donnees: DonneesVideo }> = ({ donnees }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  let debut = 0;
  let courant = 0;
  const segments = donnees.scenes.map((s, i) => {
    const seg = { debut, fin: debut + s.frames, section: s.section };
    if (frame >= debut && frame < debut + s.frames) courant = i;
    debut += s.frames;
    return seg;
  });
  const marge = 120;
  const largeur = 1920 - 2 * marge;
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: marge,
          right: marge,
          top: 44,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 28,
          color: C.gris,
        }}
      >
        <div>
          <span style={{ fontWeight: 700, color: C.bleu }}>
            {donnees.module} · {donnees.numero}
          </span>
          <span> — {donnees.titre}</span>
        </div>
        <div style={{ fontWeight: 700, color: C.accent }}>{segments[courant].section}</div>
      </div>
      <div style={{ position: "absolute", left: marge, top: 1028, width: largeur, height: 10, display: "flex", gap: 6 }}>
        {segments.map((s, i) => {
          const rempli = interpolate(frame, [s.debut, s.fin], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={i}
              style={{
                flex: (s.fin - s.debut) / durationInFrames,
                background: C.grisClair,
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <div style={{ width: `${rempli * 100}%`, height: "100%", background: i === courant ? C.accent : C.bleu }} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export const VideoCours: React.FC<{
  donnees: DonneesVideo;
  scenes: Record<string, React.FC>;
}> = ({ donnees, scenes }) => (
  <AbsoluteFill style={{ background: C.fond, fontFamily, color: C.encre }}>
    <Series>
      {donnees.scenes.map((s) => {
        const Contenu = scenes[s.id];
        if (!Contenu) throw new Error(`Scène sans visuel : ${s.id}`);
        return (
          <Series.Sequence key={s.id} durationInFrames={s.frames} name={s.section}>
            <SceneProvider cues={s.cues}>
              <Audio src={staticFile(s.audio)} />
              <Fondu duree={s.frames}>
                <Contenu />
              </Fondu>
              {s.countdown ? (
                <CompteARebours debutSec={s.audioSec + 0.2} dureeSec={Math.max(1, s.pauseAfter - 0.8)} />
              ) : null}
            </SceneProvider>
          </Series.Sequence>
        );
      })}
    </Series>
    <Cadre donnees={donnees} />
  </AbsoluteFill>
);
