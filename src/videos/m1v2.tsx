import React from "react";
import { interpolateColors } from "remotion";
import { Icone, NomIcone } from "../kit/Icone";
import { Apparait, Attenue, Moment, Pos, useActif, useProgres } from "../kit/scene";
import { C, T } from "../kit/theme";
import { Badge, Carte, Equipement, Objectifs, Panne, Paquet, Recap, Suivante, TitreScene, Trait } from "../kit/ui";

// ---------- 1. Accroche : la page de connexion inattendue ----------
const EcranNavigateur: React.FC = () => {
  const bascule = useProgres("page", 12);
  return (
    <div
      style={{
        width: 900,
        height: 560,
        background: C.carte,
        borderRadius: 24,
        border: `6px solid ${C.encre}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ height: 64, background: C.grisClair, display: "flex", alignItems: "center", gap: 14, paddingLeft: 24 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 18, height: 18, borderRadius: 99, background: C.gris }} />
        ))}
        <div style={{ marginLeft: 20, background: C.carte, borderRadius: 99, padding: "6px 24px", fontSize: 28, color: C.gris }}>
          {bascule < 0.5 ? "connexion au Wi-Fi…" : "portail.campus"}
        </div>
      </div>
      <div style={{ position: "absolute", inset: "64px 0 0 0", display: "flex", alignItems: "center", justifyContent: "center", opacity: 1 - bascule }}>
        <Icone nom="wifi" taille={180} couleur={C.gris} />
      </div>
      <div
        style={{
          position: "absolute",
          inset: "64px 0 0 0",
          opacity: bascule,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 22,
        }}
      >
        <div style={{ fontSize: 46, fontWeight: 700, color: C.bleu }}>Wi-Fi du campus</div>
        {["Identifiant", "Mot de passe"].map((c) => (
          <div key={c} style={{ width: 520, padding: "14px 22px", border: `3px solid ${C.grisClair}`, borderRadius: 14, fontSize: 30, color: C.gris }}>
            {c}
          </div>
        ))}
        <div style={{ background: C.bleu, color: "#fff", borderRadius: 14, padding: "14px 40px", fontSize: 32, fontWeight: 700 }}>
          Se connecter
        </div>
      </div>
    </div>
  );
};

const Accroche: React.FC = () => (
  <>
    <Pos x={160} y={230}>
      <EcranNavigateur />
    </Pos>
    <Pos x={1160} y={300}>
      <Apparait a="page">
        <div style={{ fontSize: 200, fontWeight: 700, color: C.accent, lineHeight: 1 }}>?</div>
      </Apparait>
    </Pos>
    <Pos x={1160} y={560}>
      <Apparait a="cours">
        <div style={{ fontSize: T.petit, color: C.gris, marginBottom: 18 }}>Derrière cette page :</div>
      </Apparait>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
        {[
          ["Réseau", "routeur"],
          ["Sécurité", "bouclier"],
          ["Supervision", "oeil"],
        ].map(([t, i], k) => (
          <Apparait key={t} a={["cours", 0.4 + k * 0.5]} dx={-20} dy={0}>
            <Badge texte={t} icone={i as NomIcone} couleur={C.bleu} fond={C.bleuClair} taille={T.petit} />
          </Apparait>
        ))}
      </div>
    </Pos>
  </>
);

// ---------- 2. Objectifs ----------
const ObjectifsScene: React.FC = () => (
  <Objectifs
    items={[
      { a: "o1", icone: "navigateur", verbe: "Expliquer", texte: "le rôle d'un portail captif" },
      { a: "o2", icone: "cadenas", verbe: "Décrire les 5 contrôles", texte: "d'accès au réseau" },
      { a: "o3", icone: "serveur", verbe: "Situer les 3 couches", texte: "de l'architecture" },
    ]}
  />
);

// ---------- 3. Le réseau maillé du campus ----------
const N: Record<string, [number, number]> = {
  A: [210, 500],
  B: [500, 380],
  C: [790, 500],
  D: [880, 810],
  E: [500, 680],
  F: [220, 840],
};
const LIENS: [string, string][] = [
  ["A", "B"],
  ["B", "C"],
  ["C", "D"],
  ["A", "E"],
  ["E", "C"],
  ["E", "D"],
  ["A", "F"],
  ["F", "E"],
];

const Cwmn: React.FC = () => (
  <>
    <TitreScene texte="Le réseau du campus" />
    <Pos x={120} y={225}>
      <Apparait a="cwmn">
        <Badge texte="CWMN · Campus Wireless Mesh Network" couleur={C.bleu} fond={C.bleuClair} taille={32} />
      </Apparait>
    </Pos>
    {LIENS.map(([a, b]) => {
      const touche = a === "B" || b === "B";
      return (
        <Trait
          key={a + b}
          x1={N[a][0]}
          y1={N[a][1]}
          x2={N[b][0]}
          y2={N[b][1]}
          a={0.3}
          epaisseur={5}
          couleur={C.gris}
          couleurApres={touche ? { a: "panne", couleur: C.rougeClair, pointille: true } : undefined}
        />
      );
    })}
    {Object.entries(N).map(([k, [x, y]]) => (
      <Equipement key={k} x={x} y={y} icone="wifi" taille={70} />
    ))}
    <Paquet points={[N.A, N.B, N.C, N.D]} a="maille" dureeSec={3} />
    <Panne x={N.B[0] + 70} y={N.B[1] - 50} a="panne" taille={56} />
    <Paquet points={[N.A, N.E, N.D]} a={["panne", 0.6]} dureeSec={2.4} />
    <Pos x={1080} y={280}>
      <Carte a="wiagate" actifDe="wiagate" actifJusqua="wiabox" horizontal largeur={720} icone="navigateur" titre="WiAGate" sous="portail captif" />
    </Pos>
    <Pos x={1080} y={470}>
      <Carte a="wiabox" actifDe="wiabox" actifJusqua="ticket" horizontal largeur={720} icone="cadenas" titre="WiABox" sous="authentification" />
    </Pos>
    <Pos x={1080} y={660}>
      <Carte a="ticket" actifDe="ticket" horizontal largeur={720} icone="ticket" titre="Système de tickets" sous="suivi des incidents" />
    </Pos>
  </>
);

// ---------- 4. Étape 1 : le portail captif ----------
const Etape1: React.FC = () => (
  <>
    <TitreScene texte="Étape 1 · Le portail captif" />
    <Trait x1={340} y1={440} x2={855} y2={440} a="intercept" couleur={C.bleu} fleche />
    <Trait x1={1050} y1={470} x2={1560} y2={470} a="intercept" couleur={C.grisClair} pointille />
    <Trait x1={855} y1={505} x2={340} y2={505} a="redirect" couleur={C.accent} fleche />
    <Equipement x={260} y={520} icone="utilisateur" label="Awa" sous="non authentifiée" a="s1" actifDe="s1" actifJusqua="intercept" taille={110} />
    <Equipement x={1650} y={500} icone="nuage" label="Site demandé" taille={110} />
    <Equipement x={950} y={530} icone="navigateur" label="WiAGate" sous="portail captif" a="intercept" actifDe="intercept" taille={120} />
    <Pos x={597} y={398} centre>
      <Apparait a="intercept">
        <span style={{ fontSize: 32, fontWeight: 700, color: C.bleu }}>1re requête web</span>
      </Apparait>
    </Pos>
    <Panne x={1300} y={470} a={["intercept", 0.6]} taille={56} />
    <Pos x={610} y={555} centre>
      <Apparait a="redirect">
        <span style={{ fontSize: 32, fontWeight: 700, color: C.accent }}>→ page de connexion</span>
      </Apparait>
    </Pos>
    <Pos x={960} y={830} centre>
      <Apparait a="couche">
        <Badge texte="Couche réseau : le trafic est détourné" icone="routeur" taille={T.moyen} />
      </Apparait>
    </Pos>
  </>
);

// ---------- 5. Étape 2 : les 5 contrôles AAA-PBP ----------
const Controle: React.FC<{
  a: Moment;
  fin?: Moment;
  lettre: string;
  titre: string;
  question: string;
  icone: NomIcone;
}> = ({ a, fin, lettre, titre, question, icone }) => {
  const actif = useActif(a, fin);
  return (
    <Apparait a={a} dx={-30} dy={0}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
          background: C.carte,
          borderRadius: 22,
          border: `5px solid ${interpolateColors(actif, [0, 1], [C.grisClair, C.accent])}`,
          padding: "10px 30px",
          width: 1680,
          boxSizing: "border-box",
          scale: String(1 + actif * 0.015),
        }}
      >
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: 99,
            background: interpolateColors(actif, [0, 1], [C.bleu, C.accent]),
            color: "#fff",
            fontSize: 40,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {lettre}
        </div>
        <Icone nom={icone} taille={64} />
        <div style={{ fontSize: T.moyen, fontWeight: 700, width: 520 }}>{titre}</div>
        <div style={{ fontSize: T.petit + 2, color: C.gris }}>{question}</div>
      </div>
    </Apparait>
  );
};

const Etape2: React.FC = () => (
  <>
    <TitreScene texte="Étape 2 · Les 5 contrôles" />
    <Pos x={1290} y={140}>
      <Apparait a="sigle">
        <Badge texte="AAA-PBP" taille={T.moyen} />
      </Apparait>
    </Pos>
    <Pos x={120} y={250}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Controle a="auth" fin="autor" lettre="A" icone="carte" titre="Authentification" question="Est-ce bien Awa ?" />
        <Controle a="autor" fin="acc" lettre="A" icone="cle" titre="Autorisation" question="À quoi a-t-elle droit ?" />
        <Controle a="acc" fin="pricing" lettre="A" icone="compteur" titre="Comptabilisation" question="Que consomme-t-elle ?" />
        <Controle a="pricing" fin="billing" lettre="P" icone="etiquette" titre="Tarification" question="Quel prix pour cet usage ?" />
        <Controle a="billing" fin="contrat" lettre="B·P" icone="facture" titre="Paiement" question="La facture" />
      </div>
    </Pos>
    <Pos x={960} y={905} centre>
      <Apparait a="contrat">
        <Badge texte="Chaque utilisateur : un contrat + un mode de facturation" icone="facture" couleur={C.bleu} fond={C.bleuClair} taille={T.petit} />
      </Apparait>
    </Pos>
  </>
);

// ---------- 6. Étape 3 : une seule connexion (OAuth) + tickets en coulisses ----------
const Etape3: React.FC = () => {
  const apps: { y: number; icone: NomIcone; titre: string; sous?: string; d: number }[] = [
    { y: 240, icone: "enveloppe", titre: "Messagerie", d: 0 },
    { y: 385, icone: "livre", titre: "Cours en ligne", d: 0.6 },
    { y: 530, icone: "telephone", titre: "WiATalk (voix)", d: 1.2 },
  ];
  const aps = [260, 420, 580, 740];
  return (
    <>
      <TitreScene texte="Étape 3 · Une seule connexion" />
      {apps.map((ap) => (
        <Trait key={ap.titre} x1={330} y1={400} x2={1090} y2={ap.y + 62} a={["apps", ap.d]} couleur={C.bleu} fleche epaisseur={5} />
      ))}
      <Equipement x={260} y={430} icone="utilisateur" label="Awa" sous="1 seule connexion" a="s3" actifDe="s3" actifJusqua="apps" taille={110} />
      {apps.map((ap) => (
        <Pos key={ap.titre} x={1100} y={ap.y}>
          <Carte a={["apps", ap.d]} horizontal largeur={700} hauteur={128} icone={ap.icone} titre={ap.titre} sous={ap.sous} />
        </Pos>
      ))}
      <Pos x={120} y={612}>
        <Apparait a="oauth">
          <Badge texte="OAuth : 1 connexion → plusieurs services" taille={34} />
        </Apparait>
      </Pos>
      <Pos x={120} y={715} w={1680} h={250}>
        <Apparait a="s4" style={{ height: "100%" }}>
          <div
            style={{
              height: "100%",
              boxSizing: "border-box",
              background: C.bleuClair,
              borderRadius: 28,
              position: "relative",
              padding: "20px 34px",
            }}
          >
            <div style={{ fontSize: T.petit, fontWeight: 700, color: C.bleu }}>En coulisses : le système de tickets</div>
            {aps.map((x, i) => (
              <div key={x} style={{ position: "absolute", left: x - 140, top: 90 }}>
                <Icone nom="wifi" taille={84} couleur={C.bleu} />
                <div style={{ fontSize: 26, textAlign: "center", color: C.bleu, fontWeight: 700 }}>{"ABCD"[i]}</div>
              </div>
            ))}
            <Panne x={482} y={100} a="down" taille={54} />
            <div style={{ position: "absolute", left: 820, top: 70 }}>
              <Apparait a={["down", 0.7]} dx={30} dy={0}>
                <div style={{ display: "flex", alignItems: "center", gap: 22, background: C.carte, borderRadius: 20, padding: "18px 28px", border: `5px solid ${C.accent}` }}>
                  <Icone nom="ticket" taille={80} couleur={C.accent} />
                  <div>
                    <div style={{ fontSize: 40, fontWeight: 700 }}>Ticket n°142 ouvert</div>
                    <div style={{ fontSize: 30, color: C.gris }}>point d'accès C hors service</div>
                  </div>
                </div>
              </Apparait>
            </div>
          </div>
        </Apparait>
      </Pos>
    </>
  );
};

// ---------- 7. Les 3 couches de l'architecture ----------
const Architecture: React.FC = () => {
  const couches: { y: number; a: Moment; fin?: Moment; icone: NomIcone; titre: string; sous: string; tag: string }[] = [
    { y: 245, a: "saas", fin: "idee", icone: "navigateur", titre: "Services & applications", sous: "ce qu'utilise Awa", tag: "SaaS" },
    { y: 435, a: "wcnaas", fin: "saas", icone: "serveur", titre: "Plateforme WiCoNAS", sous: "API REST · utilisateurs · rôles", tag: "WCNaaS" },
    { y: 625, a: "iaas", fin: "wcnaas", icone: "wifi", titre: "Infrastructure", sous: "boîtiers WiABox", tag: "IaaS" },
  ];
  return (
    <>
      <TitreScene texte="Les 3 couches du réseau" />
      {couches.map((c) => (
        <React.Fragment key={c.tag}>
          <Pos x={120} y={c.y}>
            <Carte a={c.a} actifDe={c.a} actifJusqua={c.fin} horizontal largeur={1240} hauteur={170} icone={c.icone} titre={c.titre} sous={c.sous} />
          </Pos>
          <Pos x={1320} y={c.y + 85} centre style={{ translate: "-100% -50%" }}>
            <Apparait a={c.a}>
              <Badge texte={c.tag} couleur={C.bleu} fond={C.bleuClair} taille={T.petit} />
            </Apparait>
          </Pos>
        </React.Fragment>
      ))}
      <Trait x1={1360} y1={330} x2={1520} y2={330} a="saas" couleur={C.bleu} epaisseur={5} />
      <Equipement x={1620} y={360} icone="utilisateur" label="Awa" a="saas" taille={100} />
      <Pos x={120} y={830} w={1680}>
        <Apparait a="idee">
          <div style={{ background: C.bleu, color: "#fff", borderRadius: 28, padding: "26px 40px", fontSize: 44, fontWeight: 600 }}>
            Le Wi-Fi devient un service : contrat · droits · facture
          </div>
        </Apparait>
      </Pos>
    </>
  );
};

// ---------- 8. Erreur fréquente : authentification ≠ autorisation ----------
const Volet: React.FC<{
  a: Moment;
  titre: string;
  question: string;
  exempleA: Moment;
  icone: NomIcone;
  exemple: string;
  ok: boolean;
}> = ({ a, titre, question, exempleA, icone, exemple, ok }) => (
  <Apparait a={a}>
    <div
      style={{
        width: 820,
        height: 480,
        boxSizing: "border-box",
        background: C.carte,
        borderRadius: 28,
        border: `5px solid ${C.grisClair}`,
        padding: "34px 40px",
        position: "relative",
      }}
    >
      <div style={{ fontSize: T.grand, fontWeight: 700 }}>{titre}</div>
      <div style={{ fontSize: T.moyen, color: C.gris, marginTop: 8 }}>{question}</div>
      <Apparait a={exempleA} style={{ position: "absolute", left: 40, top: 220 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <Icone nom={icone} taille={150} />
          <div>
            <div style={{ fontSize: T.petit + 4, fontWeight: 700, width: 420 }}>{exemple}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
              <Icone nom={ok ? "coche" : "croix"} taille={50} couleur={ok ? C.vert : C.rouge} epaisseur={4} />
              <span style={{ fontSize: T.petit, fontWeight: 700, color: ok ? C.vert : C.rouge }}>{ok ? "accepté" : "refusé"}</span>
            </div>
          </div>
        </div>
      </Apparait>
    </div>
  </Apparait>
);

const Erreur: React.FC = () => (
  <>
    <Pos x={120} y={135}>
      <Apparait a={0.1}>
        <Badge texte="Confusion fréquente" icone="alerte" couleur={C.rouge} fond={C.rougeClair} taille={T.moyen} />
      </Apparait>
    </Pos>
    <Pos x={120} y={260}>
      <Volet a="confusion" titre="Authentification" question="Qui êtes-vous ?" exempleA="badge" icone="carte" exemple="Carte d'étudiant à l'entrée du campus" ok />
    </Pos>
    <Pos x={980} y={260}>
      <Volet a={["confusion", 0.8]} titre="Autorisation" question="Avez-vous le droit ?" exempleA="salle" icone="porte" exemple="Salle des serveurs" ok={false} />
    </Pos>
    <Pos x={960} y={860} centre>
      <Apparait a="ordre">
        <Badge texte="Toujours : 1 · authentifier  →  2 · autoriser" taille={T.moyen} />
      </Apparait>
    </Pos>
  </>
);

// ---------- 9. Récapitulatif ----------
const RecapScene: React.FC = () => (
  <Recap
    items={[
      { a: "r1", texte: "Portail captif : intercepte, puis redirige vers la connexion" },
      { a: "r2", texte: "5 contrôles : authentification · autorisation · comptabilisation · tarification · paiement" },
      { a: "r3", texte: "3 couches : infrastructure · plateforme réseau · services" },
    ]}
  />
);

// ---------- 10. Question ----------
const Question: React.FC = () => (
  <>
    <TitreScene texte="À vous !" />
    <Equipement x={300} y={420} icone="utilisateur" label="Awa" sous="connectée" taille={110} />
    <Trait x1={380} y1={395} x2={760} y2={395} a="q" couleur={C.bleu} fleche />
    <Pos x={780} y={320}>
      <Carte a="q" horizontal largeur={640} icone="cadenas" titre="Espace enseignants" sous="accès refusé" />
    </Pos>
    <Panne x={1420} y={330} a={["q", 0.6]} />
    <Pos x={120} y={590} w={1350}>
      <Apparait a="q2">
        <div style={{ borderLeft: `12px solid ${C.accent}`, paddingLeft: 34 }}>
          <div style={{ fontSize: T.grand, fontWeight: 700 }}>Quel contrôle a bloqué Awa ?</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 24 }}>
            {["Authentification", "Autorisation", "Comptabilisation", "Tarification", "Paiement"].map((t) => (
              <Badge key={t} texte={t} couleur={C.bleu} fond={C.bleuClair} taille={30} />
            ))}
          </div>
        </div>
      </Apparait>
    </Pos>
  </>
);

// ---------- 11. Réponse ----------
const Reponse: React.FC = () => (
  <>
    <TitreScene texte="Réponse" />
    <Pos x={120} y={260}>
      <Apparait a="a1">
        <Badge texte="L'autorisation" icone="cle" couleur={C.vert} fond={C.vertClair} taille={T.grand} />
      </Apparait>
    </Pos>
    <Pos x={120} y={430}>
      <Attenue a="next" jusqua={0.5}>
        <Carte a="a2" horizontal largeur={820} icone="coche" couleurIcone={C.vert} titre="Authentifiée" sous="c'est bien Awa" />
      </Attenue>
    </Pos>
    <Pos x={980} y={430}>
      <Attenue a="next" jusqua={0.5}>
        <Carte a={["a2", 1.5]} horizontal largeur={820} icone="croix" couleurIcone={C.rouge} titre="Rôle : étudiante" sous="pas les droits enseignants" />
      </Attenue>
    </Pos>
    <Suivante a="next" titre="Module 2 · Pourquoi administrer un réseau ?" icone="graphique" />
  </>
);

export const scenesM1V2: Record<string, React.FC> = {
  accroche: Accroche,
  objectifs: ObjectifsScene,
  cwmn: Cwmn,
  etape1: Etape1,
  etape2: Etape2,
  etape3: Etape3,
  architecture: Architecture,
  erreur: Erreur,
  recap: RecapScene,
  question: Question,
  reponse: Reponse,
};
