import React from "react";
import { Icone } from "../kit/Icone";
import { Apparait, Attenue, Pos } from "../kit/scene";
import { C, T } from "../kit/theme";
import { Badge, Carte, Equipement, Objectifs, Panne, Recap, Suivante, TitreScene, Trait } from "../kit/ui";

// ---------- 1. Accroche : la panne du lundi matin ----------
const Accroche: React.FC = () => {
  const postes = [560, 760, 960, 1160, 1360];
  return (
    <>
      <Trait x1={960} y1={280} x2={960} y2={530} couleur={C.vert} couleurApres={{ a: "panne", couleur: C.rouge, pointille: true }} />
      {postes.map((x) => (
        <Trait key={x} x1={960} y1={530} x2={x} y2={850} couleur={C.grisClair} epaisseur={5} />
      ))}
      <Equipement x={960} y={250} icone="nuage" label="Internet" labelEnHaut taille={110} />
      <Equipement x={960} y={560} icone="batiment" label="L'école" taille={120} />
      {postes.map((x) => (
        <Equipement key={x} x={x} y={860} icone="ordinateur" taille={72} />
      ))}
      <Panne x={960} y={405} a="panne" />
      <Pos x={1015} y={372}>
        <Apparait a="panne" dx={-20} dy={0}>
          <Badge texte="Plus d'Internet" icone="alerte" couleur={C.rouge} fond={C.rougeClair} taille={T.moyen} />
        </Apparait>
      </Pos>
      <Equipement x={1580} y={540} icone="utilisateur" label="Administrateur réseau" a="qui" actifDe="qui" taille={130} />
      <Pos x={1290} y={700}>
        <Apparait a="avant">
          <Badge texte="Le savoir avant la plainte" icone="cloche" taille={34} />
        </Apparait>
      </Pos>
    </>
  );
};

// ---------- 2. Objectifs ----------
const ObjectifsScene: React.FC = () => (
  <Objectifs
    items={[
      { a: "o1", icone: "livre", verbe: "Définir", texte: "l'administration réseau" },
      { a: "o2", icone: "utilisateur", verbe: "Citer les 4 missions", texte: "de l'administrateur" },
      { a: "o3", icone: "batiment", verbe: "Reconnaître les 3 profils", texte: "de parc informatique" },
    ]}
  />
);

// ---------- 3. Définition : état physique et état logique ----------
const Definition: React.FC = () => {
  const physique = { a: "physique", couleur: C.accent };
  return (
    <>
      <TitreScene texte="Administrer un réseau, c'est connaître…" />
      {/* Petit réseau d'exemple (sans noms : ils viennent dans la scène suivante) */}
      <Trait x1={330} y1={340} x2={330} y2={540} couleurApres={physique} />
      <Trait x1={330} y1={540} x2={170} y2={740} couleurApres={physique} />
      <Trait x1={330} y1={540} x2={490} y2={740} couleurApres={physique} />
      <Trait x1={330} y1={540} x2={640} y2={540} couleurApres={physique} />
      <Equipement x={330} y={340} icone="routeur" taille={84} />
      <Equipement x={330} y={540} icone="switch" taille={84} />
      <Equipement x={640} y={540} icone="serveur" taille={84} />
      <Equipement x={170} y={740} icone="ordinateur" taille={84} />
      <Equipement x={490} y={740} icone="ordinateur" taille={84} />
      {/* Étiquettes logiques, posées à côté de chaque objet */}
      <Pos x={170} y={850} centre>
        <Apparait a="logique">
          <Badge texte="192.168.1.10" couleur={C.bleu} fond={C.bleuClair} taille={30} />
        </Apparait>
      </Pos>
      <Pos x={490} y={850} centre>
        <Apparait a={["logique", 0.3]}>
          <Badge texte="192.168.1.11" couleur={C.bleu} fond={C.bleuClair} taille={30} />
        </Apparait>
      </Pos>
      <Pos x={640} y={650} centre>
        <Apparait a={["logique", 0.6]}>
          <Badge texte="DNS répond" icone="coche" couleur={C.vert} fond={C.vertClair} taille={30} />
        </Apparait>
      </Pos>
      <Pos x={330} y={240} centre>
        <Apparait a={["logique", 0.9]}>
          <Badge texte="route → Internet" couleur={C.bleu} fond={C.bleuClair} taille={30} />
        </Apparait>
      </Pos>

      <Pos x={880} y={245}>
        <Carte a="physique" actifDe="physique" actifJusqua="logique" horizontal largeur={920} icone="cable" titre="L'état physique" sous="câbles · équipements allumés" />
      </Pos>
      <Pos x={880} y={430}>
        <Carte a="logique" actifDe="logique" actifJusqua="pourquoi" horizontal largeur={920} icone="globe" titre="L'état logique" sous="adresses · routes · services" />
      </Pos>
      <Pos x={880} y={615}>
        <Carte a="pourquoi" actifDe="pourquoi" actifJusqua="comment" horizontal largeur={920} icone="cloche" titre="Pourquoi ?" sous="détecter avant l'utilisateur" />
      </Pos>
      <Pos x={880} y={800}>
        <Carte a="comment" actifDe="comment" horizontal largeur={920} titre="Comment ?" icone="loupe">
          <div style={{ display: "flex", gap: 18, marginTop: 10 }}>
            <Apparait a="comment">
              <Badge texte="Joignable ?" icone="coche" couleur={C.bleu} fond={C.bleuClair} taille={32} />
            </Apparait>
            <Apparait a="stats">
              <Badge texte="Statistiques" icone="graphique" couleur={C.bleu} fond={C.bleuClair} taille={32} />
            </Apparait>
          </div>
        </Carte>
      </Pos>
    </>
  );
};

// ---------- 4. Les équipements (pré-formation : nommer avant d'expliquer) ----------
const Equipements: React.FC = () => {
  const y = 515;
  return (
    <>
      <TitreScene texte="Les équipements surveillés" />
      <Trait x1={220} y1={y} x2={590} y2={y} a="switch" />
      <Trait x1={590} y1={y} x2={960} y2={y} a="routeur" />
      <Trait x1={960} y1={y} x2={1330} y2={y} a="parefeu" />
      <Trait x1={1330} y1={y} x2={1700} y2={y} a={["parefeu", 0.4]} />
      <Trait x1={590} y1={700} x2={590} y2={790} a="serveur" />
      <Equipement x={220} y={560} icone="ordinateur" label="Postes" sous="des utilisateurs" taille={110} />
      <Equipement x={590} y={560} icone="switch" label="Commutateur" sous="réseau local" a="switch" actifDe="switch" actifJusqua="routeur" taille={110} />
      <Equipement x={960} y={560} icone="routeur" label="Routeur" sous="relie les réseaux" a="routeur" actifDe="routeur" actifJusqua="parefeu" taille={110} />
      <Equipement x={1330} y={560} icone="parefeu" label="Pare-feu" sous="filtre le trafic" a="parefeu" actifDe="parefeu" actifJusqua="serveur" taille={110} />
      <Equipement x={1700} y={560} icone="nuage" label="Internet" taille={110} />
      <Equipement x={590} y={835} icone="serveur" label="Serveurs" sous="DNS · DHCP" a="serveur" actifDe="serveur" taille={110} />
    </>
  );
};

// ---------- 5. Les 4 missions ----------
const Missions: React.FC = () => {
  const l = 820;
  const h = 300;
  return (
    <>
      <TitreScene texte="Les 4 missions de l'administrateur" />
      <Pos x={120} y={250}>
        <Carte a="m1" actifDe="m1" actifJusqua="m2" horizontal largeur={l} hauteur={h} icone="cable" titre="1 · Câblage" sous={"connexion physique\ncuivre · fibre · sans fil"} />
      </Pos>
      <Pos x={980} y={250}>
        <Carte a="m2" actifDe="m2" actifJusqua="m3" horizontal largeur={l} hauteur={h} icone="routeur" titre="2 · Routage" sous={"connexion logique\nstatique · dynamique"} />
      </Pos>
      <Pos x={120} y={590}>
        <Attenue a="physlog">
          <Carte a="m3" actifDe="m3" actifJusqua="m4" horizontal largeur={l} hauteur={h} icone="bouclier" titre="3 · Sécurité" sous={"antivirus · pare-feu\ndétection d'intrusion"} />
        </Attenue>
      </Pos>
      <Pos x={980} y={590}>
        <Attenue a="physlog">
          <Carte a="m4" actifDe="m4" actifJusqua="physlog" horizontal largeur={l} hauteur={h} icone="cle" titre="4 · Droits d'accès" sous={"qui entre ?\nà quelles ressources ?"} />
        </Attenue>
      </Pos>
      <Pos x={890} y={278} centre style={{ translate: "-100% 0" }}>
        <Apparait a="physlog" dy={-16}>
          <Badge texte="PHYSIQUE" taille={34} />
        </Apparait>
      </Pos>
      <Pos x={1750} y={278} centre style={{ translate: "-100% 0" }}>
        <Apparait a={["physlog", 1.6]} dy={-16}>
          <Badge texte="LOGIQUE" taille={34} />
        </Apparait>
      </Pos>
    </>
  );
};

// ---------- 6. Les 3 profils de parc ----------
const Ligne: React.FC<{ a: Parameters<typeof Apparait>[0]["a"]; icone: "ordinateur" | "serveur"; texte: string }> = ({
  a,
  icone,
  texte,
}) => (
  <Apparait a={a} dx={-20} dy={0}>
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
      <Icone nom={icone} taille={64} />
      <span style={{ fontSize: T.petit, fontWeight: 700 }}>{texte}</span>
    </div>
  </Apparait>
);

const Profils: React.FC = () => {
  const l = 530;
  const h = 680;
  return (
    <>
      <TitreScene texte="Les 3 profils de parc" />
      <Pos x={120} y={250}>
        <Carte a="homo" actifDe="homo" actifJusqua="hetero" largeur={l} hauteur={h} titre="Homogène" sous="machines identiques">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 120px)", gap: 24, marginTop: 40, marginLeft: 50 }}>
            {[0, 1, 2, 3].map((i) => (
              <Icone key={i} nom="ordinateur" taille={110} />
            ))}
          </div>
        </Carte>
      </Pos>
      <Pos x={695} y={250}>
        <Carte a="hetero" actifDe="hetero" actifJusqua="multi" largeur={l} hauteur={h} titre="Hétérogène" sous="systèmes différents">
          <div style={{ marginTop: 26 }}>
            <Apparait a="pme1">
              <div style={{ fontSize: 30, color: C.gris, marginBottom: 4 }}>Exemple : une PME</div>
            </Apparait>
            <Ligne a="pme1" icone="ordinateur" texte="10 postes Windows" />
            <Ligne a="pme2" icone="ordinateur" texte="+ équipe macOS" />
            <Ligne a="pme3" icone="serveur" texte="+ serveurs Linux" />
          </div>
        </Carte>
      </Pos>
      <Pos x={1270} y={250}>
        <Carte a="multi" actifDe="multi" largeur={l} hauteur={h} titre="Multi-site" sous="des sites distants">
          <div style={{ position: "relative", width: 460, height: 380, marginTop: 10 }}>
            <svg width={460} height={380} style={{ position: "absolute", left: 0, top: 0 }}>
              <line x1={70} y1={150} x2={390} y2={150} stroke={C.gris} strokeWidth={6} strokeDasharray="4 14" strokeLinecap="round" />
            </svg>
            <div style={{ position: "absolute", left: 10, top: 80, textAlign: "center" }}>
              <Icone nom="batiment" taille={110} />
              <div style={{ fontSize: 30, fontWeight: 700 }}>Siège</div>
            </div>
            <div style={{ position: "absolute", left: 340, top: 80, textAlign: "center" }}>
              <Icone nom="batiment" taille={110} />
              <div style={{ fontSize: 30, fontWeight: 700 }}>Agence</div>
            </div>
            <div style={{ position: "absolute", left: 150, top: 200, display: "flex", alignItems: "center", gap: 8 }}>
              <Icone nom="horloge" taille={40} couleur={C.gris} />
              <span style={{ fontSize: 28, color: C.gris }}>latence</span>
            </div>
            <Panne x={230} y={150} a="question" taille={58} />
            <Pos x={0} y={280}>
              <Apparait a="question">
                <Badge texte="L'agence continue ?" taille={32} />
              </Apparait>
            </Pos>
          </div>
        </Carte>
      </Pos>
    </>
  );
};

// ---------- 7. Les compétences ----------
const Competences: React.FC = () => (
  <>
    <TitreScene texte="Deux piliers de compétences" />
    <Pos x={120} y={250}>
      <Carte a="os" actifDe="os" actifJusqua="reseau" largeur={820} hauteur={320} icone="terminal" titre="Systèmes d'exploitation" sous="Linux · Windows · ligne de commande" />
    </Pos>
    <Pos x={980} y={250}>
      <Carte a="reseau" actifDe="reseau" actifJusqua="verbes" largeur={820} hauteur={320} icone="globe" titre="Technologies réseau" sous="réseau local · IP · protocoles d'Internet" />
    </Pos>
    <Pos x={120} y={650} w={1680}>
      <Apparait a="verbes">
        <div style={{ fontSize: T.petit, color: C.gris, marginBottom: 20 }}>Le but du cours : savoir…</div>
      </Apparait>
      <div style={{ display: "flex", gap: 30 }}>
        <Apparait a="verbes">
          <Badge texte="Diagnostiquer" icone="loupe" taille={T.moyen} />
        </Apparait>
        <Apparait a={["verbes", 0.9]}>
          <Badge texte="Superviser" icone="oeil" taille={T.moyen} />
        </Apparait>
        <Apparait a={["verbes", 1.7]}>
          <Badge texte="Faire évoluer" icone="evolution" taille={T.moyen} />
        </Apparait>
      </div>
    </Pos>
  </>
);

// ---------- 8. Erreur fréquente : le câblage non documenté ----------
const Panneau: React.FC<{ children: React.ReactNode; bord: string }> = ({ children, bord }) => (
  <div
    style={{
      width: 820,
      height: 500,
      boxSizing: "border-box",
      background: C.carte,
      borderRadius: 28,
      border: `5px solid ${bord}`,
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 8px 24px rgba(28,43,58,0.08)",
    }}
  >
    {children}
  </div>
);

const Erreur: React.FC = () => {
  const ports = ["Port 1 → Salle 29", "Port 2 → Accueil", "Port 3 → Salle 100", "Port 25 → Cœur réseau"];
  return (
    <>
      <Pos x={120} y={135}>
        <Apparait a={0.1}>
          <Badge texte="Erreur fréquente" icone="alerte" couleur={C.rouge} fond={C.rougeClair} taille={T.moyen} />
        </Apparait>
      </Pos>
      <Pos x={120} y={250}>
        <Attenue a="remede" jusqua={0.45}>
          <Apparait a="erreur">
            <Panneau bord={C.rougeClair}>
              <div style={{ position: "absolute", left: 50, top: 40 }}>
                <Icone nom="switch" taille={130} />
              </div>
              <svg
                width={820}
                height={270}
                viewBox="0 40 820 440"
                preserveAspectRatio="none"
                style={{ position: "absolute", left: 0, top: 140 }}
              >
                {[
                  "M120 150 C 300 420, 380 60, 560 300 S 700 120, 760 380",
                  "M150 150 C 200 300, 520 360, 420 180 S 640 440, 760 260",
                  "M180 150 C 420 160, 260 440, 600 410 S 690 200, 770 160",
                  "M210 150 C 330 300, 640 80, 520 380 S 300 460, 740 450",
                ].map((d, i) => (
                  <path
                    key={i}
                    d={d}
                    fill="none"
                    stroke={i % 2 ? C.gris : C.bleu}
                    strokeWidth={6}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>
              <div style={{ position: "absolute", right: 40, top: 30, fontSize: 120, fontWeight: 700, color: C.rouge }}>?</div>
              <div style={{ position: "absolute", left: 40, bottom: 30, display: "flex", alignItems: "center", gap: 14 }}>
                <Icone nom="horloge" taille={56} couleur={C.rouge} />
                <span style={{ fontSize: T.petit, fontWeight: 700, color: C.rouge }}>des heures de diagnostic</span>
              </div>
            </Panneau>
          </Apparait>
        </Attenue>
      </Pos>
      <Pos x={980} y={250}>
        <Apparait a="remede">
          <Panneau bord={C.vert}>
            <div style={{ position: "absolute", left: 40, top: 40 }}>
              <Icone nom="switch" taille={130} />
            </div>
            <div style={{ position: "absolute", left: 200, top: 40, display: "flex", flexDirection: "column", gap: 14 }}>
              {ports.map((p, i) => (
                <Apparait key={p} a={["remede", 0.5 + i * 0.5]} dx={-20} dy={0}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Icone nom="etiquette" taille={44} couleur={C.vert} />
                    <span style={{ fontSize: 34, fontWeight: 600 }}>{p}</span>
                  </div>
                </Apparait>
              ))}
            </div>
            <div style={{ position: "absolute", left: 40, bottom: 30, display: "flex", alignItems: "center", gap: 14 }}>
              <Icone nom="coche" taille={56} couleur={C.vert} />
              <span style={{ fontSize: T.petit, fontWeight: 700, color: C.vert }}>étiqueter + documenter</span>
            </div>
          </Panneau>
        </Apparait>
      </Pos>
      <Pos x={120} y={790} w={1680}>
        <Apparait a="outils">
          <div style={{ background: C.bleu, color: "#fff", borderRadius: 28, padding: "30px 44px", fontSize: 46, fontWeight: 600 }}>
            « Les outils sont des moyens, jamais une fin. »
          </div>
        </Apparait>
      </Pos>
    </>
  );
};

// ---------- 9. Récapitulatif ----------
const RecapScene: React.FC = () => (
  <Recap
    items={[
      { a: "r1", texte: "Administrer = connaître l'état physique et logique, à tout instant" },
      { a: "r2", texte: "4 missions : câblage · routage · sécurité · droits d'accès" },
      { a: "r3", texte: "3 parcs : homogène · hétérogène · multi-site" },
    ]}
  />
);

// ---------- 10. Question (pratique de récupération) ----------
const Question: React.FC = () => (
  <>
    <TitreScene texte="À vous !" />
    <Trait x1={420} y1={420} x2={1180} y2={420} couleurApres={{ a: "q", couleur: C.rouge, pointille: true }} />
    <Equipement x={420} y={450} icone="batiment" label="Siège" sous="les fichiers" taille={120} />
    <Equipement x={1180} y={450} icone="batiment" label="Agence" sous="sans accès" taille={120} />
    <Panne x={800} y={420} a="q" />
    <Pos x={120} y={700} w={1300}>
      <Apparait a="q2">
        <div style={{ borderLeft: `12px solid ${C.accent}`, paddingLeft: 34 }}>
          <div style={{ fontSize: T.grand, fontWeight: 700 }}>Quel profil de parc ?</div>
          <div style={{ fontSize: T.grand, fontWeight: 700, marginTop: 10 }}>Quelle mission ?</div>
        </div>
      </Apparait>
    </Pos>
  </>
);

// ---------- 11. Réponse ----------
const Reponse: React.FC = () => (
  <>
    <TitreScene texte="Réponse" />
    <Pos x={120} y={260} w={1680}>
      <div style={{ display: "flex", gap: 30 }}>
        <Apparait a="a1">
          <Badge texte="Parc multi-site" icone="batiment" couleur={C.vert} fond={C.vertClair} taille={T.grand} />
        </Apparait>
        <Apparait a="a2">
          <Badge texte="Mission : routage" icone="routeur" couleur={C.vert} fond={C.vertClair} taille={T.grand} />
        </Apparait>
      </div>
    </Pos>
    <Pos x={120} y={430}>
      <Carte a="a3" horizontal largeur={820} icone="serveur" titre="Serveur de fichiers local" sous="l'agence reste autonome" />
    </Pos>
    <Pos x={980} y={430}>
      <Carte a={["a3", 1.8]} horizontal largeur={820} icone="cable" titre="Lien de secours" sous="un second chemin" />
    </Pos>
    <Suivante a="next" titre="Le Wi-Fi du campus" icone="wifi" />
  </>
);

export const scenesM1V1: Record<string, React.FC> = {
  accroche: Accroche,
  objectifs: ObjectifsScene,
  definition: Definition,
  equipements: Equipements,
  missions: Missions,
  profils: Profils,
  competences: Competences,
  erreur: Erreur,
  recap: RecapScene,
  question: Question,
  reponse: Reponse,
};
