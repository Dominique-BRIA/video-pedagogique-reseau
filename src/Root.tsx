import React from "react";
import { Composition } from "remotion";
import { dureeTotale, DonneesVideo, VideoCours } from "./kit/VideoCours";
import { scenesM1V1 } from "./videos/m1v1";
import { scenesM1V2 } from "./videos/m1v2";
import m1v1Json from "./generated/m1v1.json";
import m1v2Json from "./generated/m1v2.json";

const m1v1 = m1v1Json as unknown as DonneesVideo;
const m1v2 = m1v2Json as unknown as DonneesVideo;

// Une composition par vidéo (les scènes sont liées ici, pas passées en props sérialisées).
const M1V1: React.FC = () => <VideoCours donnees={m1v1} scenes={scenesM1V1} />;
const M1V2: React.FC = () => <VideoCours donnees={m1v2} scenes={scenesM1V2} />;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="m1v1-metier-administrateur"
      component={M1V1}
      durationInFrames={dureeTotale(m1v1)}
      fps={m1v1.fps}
      width={1920}
      height={1080}
    />
    <Composition
      id="m1v2-wifi-campus"
      component={M1V2}
      durationInFrames={dureeTotale(m1v2)}
      fps={m1v2.fps}
      width={1920}
      height={1080}
    />
  </>
);
