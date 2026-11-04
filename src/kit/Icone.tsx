import React from "react";
import { C } from "./theme";

export type NomIcone =
  | "ordinateur"
  | "serveur"
  | "routeur"
  | "switch"
  | "parefeu"
  | "nuage"
  | "batiment"
  | "utilisateur"
  | "bouclier"
  | "cle"
  | "cable"
  | "horloge"
  | "cloche"
  | "graphique"
  | "coche"
  | "croix"
  | "alerte"
  | "etiquette"
  | "terminal"
  | "globe"
  | "wifi"
  | "navigateur"
  | "carte"
  | "cadenas"
  | "ticket"
  | "enveloppe"
  | "livre"
  | "telephone"
  | "facture"
  | "loupe"
  | "oeil"
  | "evolution"
  | "dossier"
  | "compteur"
  | "porte";

// Pictogrammes au trait (viewBox 48 × 48), dessinés pour rester lisibles en petit.
export const Icone: React.FC<{
  nom: NomIcone;
  taille?: number;
  couleur?: string;
  fond?: string;
  epaisseur?: number;
  style?: React.CSSProperties;
}> = ({ nom, taille = 96, couleur = C.bleu, fond = "none", epaisseur = 2.6, style }) => {
  const p = {
    fill: "none",
    stroke: couleur,
    strokeWidth: epaisseur,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const plein = { fill: couleur, stroke: "none" };
  const dessins: Record<NomIcone, React.ReactNode> = {
    ordinateur: (
      <>
        <rect x={9} y={10} width={30} height={21} rx={2} {...p} fill={fond} />
        <path d="M4 37h40l-3-5H7z" {...p} />
      </>
    ),
    serveur: (
      <>
        <rect x={10} y={6} width={28} height={16} rx={2} {...p} fill={fond} />
        <rect x={10} y={26} width={28} height={16} rx={2} {...p} fill={fond} />
        <circle cx={16} cy={14} r={1.8} {...plein} />
        <circle cx={16} cy={34} r={1.8} {...plein} />
        <path d="M24 14h9M24 34h9" {...p} />
      </>
    ),
    routeur: (
      <>
        <circle cx={24} cy={24} r={18} {...p} fill={fond} />
        <path d="M15 15l7 7M33 33l-7-7M33 15l-7 7M15 33l7-7" {...p} />
        <path d="M15 20v-5h5M33 28v5h-5M28 15h5v5M20 33h-5v-5" {...p} />
      </>
    ),
    switch: (
      <>
        <rect x={5} y={13} width={38} height={22} rx={3} {...p} fill={fond} />
        <path d="M12 20h22l-4-3M36 28H14l4 3" {...p} />
      </>
    ),
    parefeu: (
      <>
        <rect x={7} y={9} width={34} height={30} rx={1} {...p} fill={fond} />
        <path d="M7 19h34M7 29h34M18 9v10M30 9v10M12 19v10M24 19v10M36 19v10M18 29v10M30 29v10" {...p} />
      </>
    ),
    nuage: (
      <path
        d="M14 36h21a8 8 0 0 0 1-16 11 11 0 0 0-21-3 9 9 0 0 0-1 19z"
        {...p}
        fill={fond}
      />
    ),
    batiment: (
      <>
        <path d="M8 42V12l16-6 16 6v30z" {...p} fill={fond} />
        <path d="M15 18h4M29 18h4M15 26h4M29 26h4M21 42v-8h6v8" {...p} />
      </>
    ),
    utilisateur: (
      <>
        <circle cx={24} cy={15} r={8} {...p} fill={fond} />
        <path d="M8 42c1-10 7-15 16-15s15 5 16 15" {...p} fill={fond} />
      </>
    ),
    bouclier: (
      <>
        <path d="M24 5l15 6v11c0 10-6 17-15 21C15 39 9 32 9 22V11z" {...p} fill={fond} />
        <path d="M17 24l5 5 9-10" {...p} />
      </>
    ),
    cle: (
      <>
        <circle cx={15} cy={24} r={8} {...p} fill={fond} />
        <path d="M23 24h19M36 24v6M42 24v5" {...p} />
      </>
    ),
    cable: (
      <>
        <rect x={16} y={6} width={16} height={14} rx={2} {...p} fill={fond} />
        <path d="M20 6V2M28 6V2M24 20v6c0 8-14 6-14 16" {...p} />
      </>
    ),
    horloge: (
      <>
        <circle cx={24} cy={24} r={18} {...p} fill={fond} />
        <path d="M24 13v11l8 5" {...p} />
      </>
    ),
    cloche: (
      <>
        <path d="M12 34V22a12 12 0 0 1 24 0v12l3 3H9z" {...p} fill={fond} />
        <path d="M20 41a4 4 0 0 0 8 0" {...p} />
      </>
    ),
    graphique: (
      <>
        <path d="M6 6v36h36" {...p} />
        <rect x={13} y={26} width={6} height={12} {...plein} />
        <rect x={23} y={18} width={6} height={20} {...plein} />
        <rect x={33} y={10} width={6} height={28} {...plein} />
      </>
    ),
    coche: (
      <>
        <circle cx={24} cy={24} r={19} {...p} fill={fond} />
        <path d="M15 24l7 7 12-14" {...p} />
      </>
    ),
    croix: <path d="M12 12l24 24M36 12L12 36" {...p} />,
    alerte: (
      <>
        <path d="M24 5l20 36H4z" {...p} fill={fond} />
        <path d="M24 18v11" {...p} />
        <circle cx={24} cy={35} r={1.8} {...plein} />
      </>
    ),
    etiquette: (
      <>
        <path d="M6 8h18l18 18-16 16L6 24z" {...p} fill={fond} />
        <circle cx={15} cy={17} r={3} {...p} />
      </>
    ),
    terminal: (
      <>
        <rect x={5} y={8} width={38} height={32} rx={3} {...p} fill={fond} />
        <path d="M12 19l6 5-6 5M22 31h12" {...p} />
      </>
    ),
    globe: (
      <>
        <circle cx={24} cy={24} r={18} {...p} fill={fond} />
        <path d="M6 24h36M24 6c-7 8-7 28 0 36M24 6c7 8 7 28 0 36" {...p} />
      </>
    ),
    wifi: (
      <>
        <path d="M8 22a23 23 0 0 1 32 0M14 28a14 14 0 0 1 20 0M20 34a6 6 0 0 1 8 0" {...p} />
        <circle cx={24} cy={39} r={2.2} {...plein} />
      </>
    ),
    navigateur: (
      <>
        <rect x={5} y={8} width={38} height={32} rx={3} {...p} fill={fond} />
        <path d="M5 16h38" {...p} />
        <circle cx={10} cy={12} r={1.4} {...plein} />
        <circle cx={15} cy={12} r={1.4} {...plein} />
      </>
    ),
    carte: (
      <>
        <rect x={4} y={11} width={40} height={26} rx={3} {...p} fill={fond} />
        <circle cx={15} cy={22} r={4} {...p} />
        <path d="M9 32c1-3 3-5 6-5s5 2 6 5M26 19h12M26 25h12M26 31h8" {...p} />
      </>
    ),
    cadenas: (
      <>
        <rect x={10} y={21} width={28} height={21} rx={3} {...p} fill={fond} />
        <path d="M16 21v-6a8 8 0 0 1 16 0v6M24 29v5" {...p} />
      </>
    ),
    ticket: (
      <>
        <path
          d="M5 13h38v7a4 4 0 0 0 0 8v7H5v-7a4 4 0 0 0 0-8z"
          {...p}
          fill={fond}
        />
        <path d="M30 13v22" {...p} strokeDasharray="3 3" />
        <path d="M11 21h12M11 27h8" {...p} />
      </>
    ),
    enveloppe: (
      <>
        <rect x={5} y={11} width={38} height={26} rx={2} {...p} fill={fond} />
        <path d="M5 13l19 14 19-14" {...p} />
      </>
    ),
    livre: (
      <>
        <path d="M24 12c-5-4-12-4-18-2v28c6-2 13-2 18 2 5-4 12-4 18-2V10c-6-2-13-2-18 2z" {...p} fill={fond} />
        <path d="M24 12v28" {...p} />
      </>
    ),
    telephone: (
      <>
        <rect x={14} y={4} width={20} height={40} rx={3} {...p} fill={fond} />
        <path d="M21 38h6" {...p} />
      </>
    ),
    facture: (
      <>
        <path d="M10 4h20l8 8v32H10z" {...p} fill={fond} />
        <path d="M30 4v8h8M16 20h16M16 27h16" {...p} />
        <text x={24} y={41} textAnchor="middle" fontSize={11} fontWeight={700} fill={couleur}>
          €
        </text>
      </>
    ),
    loupe: (
      <>
        <circle cx={20} cy={20} r={13} {...p} fill={fond} />
        <path d="M30 30l12 12" {...p} />
      </>
    ),
    oeil: (
      <>
        <path d="M3 24s8-14 21-14 21 14 21 14-8 14-21 14S3 24 3 24z" {...p} fill={fond} />
        <circle cx={24} cy={24} r={6} {...p} />
      </>
    ),
    evolution: (
      <>
        <path d="M5 38l12-12 8 8 17-18" {...p} />
        <path d="M32 16h10v10" {...p} />
      </>
    ),
    dossier: (
      <path d="M5 12h14l4 5h20v23H5z" {...p} fill={fond} />
    ),
    compteur: (
      <>
        <path d="M6 34a18 18 0 0 1 36 0" {...p} />
        <path d="M24 34l9-11" {...p} />
        <circle cx={24} cy={34} r={2.5} {...plein} />
      </>
    ),
    porte: (
      <>
        <path d="M11 44V6h26v38" {...p} fill={fond} />
        <path d="M6 44h36" {...p} />
        <circle cx={31} cy={26} r={1.8} {...plein} />
      </>
    ),
  };
  return (
    <svg width={taille} height={taille} viewBox="0 0 48 48" style={{ display: "block", overflow: "visible", ...style }}>
      {dessins[nom]}
    </svg>
  );
};
