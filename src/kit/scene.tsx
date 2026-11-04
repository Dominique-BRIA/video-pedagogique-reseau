import React, { createContext, useContext } from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

// Repères de la voix off (en secondes, relatifs au début de la scène).
type Contexte = { cues: Record<string, number> };
const SceneCtx = createContext<Contexte>({ cues: {} });

export const SceneProvider: React.FC<{
  cues: Record<string, number>;
  children: React.ReactNode;
}> = ({ cues, children }) => (
  <SceneCtx.Provider value={{ cues }}>{children}</SceneCtx.Provider>
);

// Nom de repère, secondes depuis le début de la scène, ou [repère, décalage en secondes].
export type Moment = string | number | [string, number];

// Frame (relative à la scène) où un repère est prononcé.
export const useMoment = (m: Moment): number => {
  const { cues } = useContext(SceneCtx);
  const { fps } = useVideoConfig();
  if (typeof m === "number") return Math.round(m * fps);
  const [nom, decalage] = typeof m === "string" ? [m, 0] : m;
  if (!(nom in cues)) throw new Error(`Repère inconnu : ${nom}`);
  // 2 images d'avance : l'élément apparaît pendant que le mot est prononcé.
  return Math.max(0, Math.round((cues[nom] + decalage) * fps) - 2);
};

const douce = Easing.bezier(0.16, 1, 0.3, 1);

// 0 → 1 à partir d'un repère.
export const useProgres = (m: Moment, duree = 14): number => {
  const frame = useCurrentFrame();
  const debut = useMoment(m);
  return interpolate(frame, [debut, debut + duree], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: douce,
  });
};

// Vrai entre deux repères (signalisation de l'élément dont parle la voix).
export const useActif = (de: Moment, jusqua?: Moment): number => {
  const frame = useCurrentFrame();
  const debut = useMoment(de);
  const fin = useMoment(jusqua ?? 100000);
  const entree = interpolate(frame, [debut, debut + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sortie = interpolate(frame, [fin, fin + 8], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return Math.min(entree, sortie);
};

// Apparition douce d'un élément au moment où la voix le nomme.
export const Apparait: React.FC<{
  a: Moment;
  dx?: number;
  dy?: number;
  duree?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ a, dx = 0, dy = 28, duree = 14, style, children }) => {
  const p = useProgres(a, duree);
  return (
    <div
      style={{
        opacity: p,
        translate: `${(1 - p) * dx}px ${(1 - p) * dy}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Atténue un élément à partir d'un repère (pour recentrer l'attention).
export const Attenue: React.FC<{
  a: Moment;
  jusqua?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ a, jusqua = 0.3, style, children }) => {
  const p = useProgres(a, 12);
  return <div style={{ opacity: 1 - p * (1 - jusqua), ...style }}>{children}</div>;
};

// Positionnement absolu dans la scène 1920 × 1080.
export const Pos: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  centre?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ x, y, w, h, centre, style, children }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: h,
      translate: centre ? "-50% -50%" : undefined,
      ...style,
    }}
  >
    {children}
  </div>
);
