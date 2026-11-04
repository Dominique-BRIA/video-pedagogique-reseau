import React from "react";
import { interpolate, interpolateColors, useCurrentFrame, useVideoConfig } from "remotion";
import { Icone, NomIcone } from "./Icone";
import { Apparait, Moment, Pos, useActif, useMoment, useProgres } from "./scene";
import { C, T } from "./theme";

// ---------- Titre de scène ----------
export const TitreScene: React.FC<{ texte: string; x?: number; y?: number }> = ({
  texte,
  x = 120,
  y = 130,
}) => (
  <Pos x={x} y={y}>
    <Apparait a={0.1}>
      <div style={{ fontSize: 62, fontWeight: 700, color: C.encre, letterSpacing: -0.5 }}>{texte}</div>
    </Apparait>
  </Pos>
);

// ---------- Badge (pastille) ----------
export const Badge: React.FC<{
  texte: string;
  couleur?: string;
  fond?: string;
  icone?: NomIcone;
  taille?: number;
  style?: React.CSSProperties;
}> = ({ texte, couleur = C.accent, fond = C.accentClair, icone, taille = T.petit, style }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 14,
      padding: `${taille * 0.32}px ${taille * 0.6}px`,
      borderRadius: 999,
      background: fond,
      color: couleur,
      fontSize: taille,
      fontWeight: 700,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {icone ? <Icone nom={icone} taille={taille * 1.15} couleur={couleur} epaisseur={3.2} /> : null}
    {texte}
  </div>
);

// ---------- Carte (élément nommé par la voix, mis en évidence quand il est actif) ----------
export const Carte: React.FC<{
  icone?: NomIcone;
  titre: string;
  sous?: string;
  a?: Moment;
  actifDe?: Moment;
  actifJusqua?: Moment;
  largeur?: number;
  hauteur?: number;
  horizontal?: boolean;
  tailleTitre?: number;
  couleurIcone?: string;
  enTete?: React.ReactNode;
  children?: React.ReactNode;
}> = ({
  icone,
  titre,
  sous,
  a = 0,
  actifDe,
  actifJusqua,
  largeur = 420,
  hauteur,
  horizontal,
  tailleTitre = T.moyen,
  couleurIcone = C.bleu,
  enTete,
  children,
}) => {
  const actif = useActif(actifDe ?? 100000, actifJusqua);
  return (
    <Apparait a={a}>
      <div
        style={{
          width: largeur,
          height: hauteur,
          boxSizing: "border-box",
          background: C.carte,
          borderRadius: 28,
          border: `5px solid ${interpolateColors(actif, [0, 1], [C.grisClair, C.accent])}`,
          boxShadow: `0 ${8 + actif * 10}px ${24 + actif * 20}px rgba(28,43,58,${0.08 + actif * 0.1})`,
          scale: String(1 + actif * 0.03),
          padding: "30px 34px",
          display: "flex",
          flexDirection: horizontal ? "row" : "column",
          alignItems: horizontal ? "center" : "flex-start",
          gap: horizontal ? 28 : 16,
        }}
      >
        {enTete}
        {icone ? <Icone nom={icone} taille={horizontal ? 96 : 84} couleur={couleurIcone} /> : null}
        <div>
          <div style={{ fontSize: tailleTitre, fontWeight: 700, color: C.encre, lineHeight: 1.15 }}>{titre}</div>
          {sous ? (
            <div style={{ fontSize: T.petit, color: C.gris, marginTop: 10, lineHeight: 1.25, whiteSpace: "pre-line" }}>
              {sous}
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </Apparait>
  );
};

// ---------- Équipement : icône + étiquette juste à côté (contiguïté spatiale) ----------
export const Equipement: React.FC<{
  x: number;
  y: number;
  icone: NomIcone;
  label?: string;
  sous?: string;
  a?: Moment;
  actifDe?: Moment;
  actifJusqua?: Moment;
  taille?: number;
  couleur?: string;
  labelEnHaut?: boolean;
}> = ({ x, y, icone, label, sous, a = 0, actifDe, actifJusqua, taille = 120, couleur = C.bleu, labelEnHaut }) => {
  const actif = useActif(actifDe ?? 100000, actifJusqua);
  const libelle = label ? (
    <div style={{ textAlign: "center", marginTop: labelEnHaut ? 0 : 10, marginBottom: labelEnHaut ? 10 : 0 }}>
      <div style={{ fontSize: T.petit + 2, fontWeight: 700, color: C.encre, whiteSpace: "nowrap" }}>{label}</div>
      {sous ? <div style={{ fontSize: 30, color: C.gris, whiteSpace: "nowrap" }}>{sous}</div> : null}
    </div>
  ) : null;
  return (
    <Pos x={x} y={y} centre>
      <Apparait a={a} dy={18}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {labelEnHaut ? libelle : null}
          <div
            style={{
              background: C.carte,
              borderRadius: 999,
              padding: taille * 0.16,
              border: `5px solid ${interpolateColors(actif, [0, 1], [C.grisClair, C.accent])}`,
              boxShadow: `0 6px ${18 + actif * 16}px rgba(28,43,58,${0.1 + actif * 0.12})`,
              scale: String(1 + actif * 0.08),
            }}
          >
            <Icone nom={icone} taille={taille} couleur={couleur} />
          </div>
          {labelEnHaut ? null : libelle}
        </div>
      </Apparait>
    </Pos>
  );
};

// ---------- Trait (lien réseau) tracé progressivement ----------
export const Trait: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  a?: Moment;
  couleur?: string;
  epaisseur?: number;
  pointille?: boolean;
  fleche?: boolean;
  duree?: number;
  couleurApres?: { a: Moment; couleur: string; pointille?: boolean };
}> = ({ x1, y1, x2, y2, a = 0, couleur = C.gris, epaisseur = 6, pointille, fleche, duree = 18, couleurApres }) => {
  const p = useProgres(a, duree);
  const bascule = useProgres(couleurApres?.a ?? 100000, 8);
  const coul = couleurApres ? interpolateColors(bascule, [0, 1], [couleur, couleurApres.couleur]) : couleur;
  const pointil = couleurApres?.pointille && bascule > 0.5 ? true : pointille;
  const len = Math.hypot(x2 - x1, y2 - y1);
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const xe = x1 + (x2 - x1) * p;
  const ye = y1 + (y2 - y1) * p;
  const pointe = 22;
  return (
    <svg
      width={1920}
      height={1080}
      style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none", overflow: "visible" }}
    >
      <line
        x1={x1}
        y1={y1}
        x2={xe}
        y2={ye}
        stroke={coul}
        strokeWidth={epaisseur}
        strokeLinecap="round"
        strokeDasharray={pointil ? "4 16" : undefined}
      />
      {fleche && p > 0.95 && len > 0 ? (
        <path
          d={`M ${x2} ${y2} L ${x2 - pointe * Math.cos(ang - 0.45)} ${y2 - pointe * Math.sin(ang - 0.45)} L ${
            x2 - pointe * Math.cos(ang + 0.45)
          } ${y2 - pointe * Math.sin(ang + 0.45)} Z`}
          fill={coul}
        />
      ) : null}
    </svg>
  );
};

// ---------- Marque de panne : croix dans un disque (forme + couleur) ----------
export const Panne: React.FC<{ x: number; y: number; a: Moment; taille?: number }> = ({ x, y, a, taille = 64 }) => {
  const p = useProgres(a, 10);
  return (
    <Pos x={x} y={y} centre>
      <div
        style={{
          opacity: p,
          scale: String(0.4 + 0.6 * p),
          width: taille,
          height: taille,
          borderRadius: 999,
          background: C.rouge,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 14px rgba(192,57,43,0.4)",
        }}
      >
        <Icone nom="croix" taille={taille * 0.62} couleur="#fff" epaisseur={5} />
      </div>
    </Pos>
  );
};

// ---------- Paquet qui circule le long d'un chemin ----------
export const Paquet: React.FC<{
  points: [number, number][];
  a: Moment;
  dureeSec: number;
  couleur?: string;
}> = ({ points, a, dureeSec, couleur = C.accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const debut = useMoment(a);
  const t = interpolate(frame, [debut, debut + dureeSec * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (frame < debut) return null;
  const segs = points.length - 1;
  const i = Math.min(segs - 1, Math.floor(t * segs));
  const local = t * segs - i;
  const [xa, ya] = points[i];
  const [xb, yb] = points[i + 1];
  const visible = frame < debut + dureeSec * fps + 10;
  return visible ? (
    <Pos x={xa + (xb - xa) * local} y={ya + (yb - ya) * local} centre>
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 8,
          background: couleur,
          boxShadow: `0 0 0 8px ${C.accentClair}`,
        }}
      />
    </Pos>
  ) : null;
};

// ---------- Objectifs (début de vidéo) ----------
export const Objectifs: React.FC<{
  items: { a: Moment; icone: NomIcone; verbe: string; texte: string }[];
}> = ({ items }) => (
  <>
    <TitreScene texte="À la fin de cette vidéo, vous saurez…" />
    <Pos x={120} y={300} w={1680}>
      <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
        {items.map((it, i) => (
          <Carte
            key={i}
            a={it.a}
            actifDe={it.a}
            actifJusqua={items[i + 1]?.a}
            horizontal
            largeur={1500}
            icone={it.icone}
            titre={it.verbe}
            sous={it.texte}
            tailleTitre={T.grand}
          />
        ))}
      </div>
    </Pos>
  </>
);

// ---------- Récapitulatif : 3 points ----------
export const Recap: React.FC<{ items: { a: Moment; texte: string }[] }> = ({ items }) => (
  <>
    <TitreScene texte="À retenir" />
    <Pos x={120} y={290} w={1680}>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {items.map((it, i) => (
          <Carte
            key={i}
            a={it.a}
            actifDe={it.a}
            actifJusqua={items[i + 1]?.a}
            horizontal
            largeur={1620}
            titre={it.texte}
            tailleTitre={48}
            enTete={
              <div
                style={{
                  minWidth: 96,
                  height: 96,
                  borderRadius: 999,
                  background: C.bleu,
                  color: "#fff",
                  fontSize: 52,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {i + 1}
              </div>
            }
          />
        ))}
      </div>
    </Pos>
  </>
);

// ---------- Compte à rebours pendant la pause de réflexion ----------
export const CompteARebours: React.FC<{ debutSec: number; dureeSec: number }> = ({ debutSec, dureeSec }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const debut = Math.round(debutSec * fps);
  const fin = debut + Math.round(dureeSec * fps);
  if (frame < debut) return null;
  const t = interpolate(frame, [debut, fin], [0, 1], { extrapolateRight: "clamp" });
  const reste = Math.max(0, Math.ceil(dureeSec * (1 - t)));
  const apparition = interpolate(frame, [debut, debut + 10], [0, 1], { extrapolateRight: "clamp" });
  const r = 70;
  const circ = 2 * Math.PI * r;
  return (
    <Pos x={1530} y={760} style={{ opacity: apparition }}>
      <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
        <svg width={170} height={170} viewBox="0 0 170 170">
          <circle cx={85} cy={85} r={r} fill={C.carte} stroke={C.grisClair} strokeWidth={14} />
          <circle
            cx={85}
            cy={85}
            r={r}
            fill="none"
            stroke={C.accent}
            strokeWidth={14}
            strokeDasharray={circ}
            strokeDashoffset={circ * t}
            strokeLinecap="round"
            transform="rotate(-90 85 85)"
          />
          <text x={85} y={102} textAnchor="middle" fontSize={54} fontWeight={700} fill={C.encre}>
            {reste}
          </text>
        </svg>
      </div>
      <div style={{ fontSize: 30, color: C.gris, marginTop: 10, width: 260 }}>Réfléchissez…</div>
    </Pos>
  );
};

// ---------- Annonce de la vidéo suivante ----------
export const Suivante: React.FC<{ a: Moment; titre: string; icone: NomIcone }> = ({ a, titre, icone }) => (
  <Pos x={120} y={790} w={1680}>
    <Apparait a={a}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 30,
          background: C.bleu,
          color: "#fff",
          borderRadius: 28,
          padding: "26px 40px",
        }}
      >
        <Icone nom={icone} taille={80} couleur="#fff" />
        <div>
          <div style={{ fontSize: 32, opacity: 0.85 }}>Prochaine vidéo</div>
          <div style={{ fontSize: 48, fontWeight: 700 }}>{titre}</div>
        </div>
      </div>
    </Apparait>
  </Pos>
);
