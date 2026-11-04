import { loadFont } from "@remotion/google-fonts/Lexend";

// Lexend : police conçue pour la lisibilité (lecture sur téléphone).
export const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin", "latin-ext"],
});

// Une seule couleur d'accent (orange), réservée à la signalisation.
export const C = {
  fond: "#F5F2EB",
  carte: "#FFFFFF",
  encre: "#1C2B3A",
  bleu: "#1F4E79",
  bleuClair: "#DCE7F2",
  accent: "#E8590C",
  accentClair: "#FDE8DB",
  gris: "#5F6B7A",
  grisClair: "#E3DED3",
  vert: "#2E7D4F",
  vertClair: "#DDF0E4",
  rouge: "#C0392B",
  rougeClair: "#F8DEDA",
};

// Tailles minimales lisibles sur téléphone (vidéo 1920 px de large).
export const T = {
  titre: 76,
  grand: 56,
  moyen: 44,
  petit: 36,
};
