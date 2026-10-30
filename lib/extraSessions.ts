import type { InterviewProfile, LiveTick, NonverbalState, SpeechPace } from "@/lib/types";

const calm: NonverbalState = {
  posture: "open",
  gaze: "camera",
  smile: "natural",
  cue: null,
};

const away: NonverbalState = {
  posture: "neutral",
  gaze: "away",
  smile: "absent",
  cue: "Revenez vers la caméra",
};

const hesitant: NonverbalState = {
  posture: "closed",
  gaze: "camera",
  smile: "absent",
  cue: null,
};

interface BeatInput {
  question: string;
  answer: string;
  tips: string[];
  mode: "optimal" | "fast" | "slow";
}

const modes = {
  optimal: {
    pace: "optimal" as SpeechPace,
    paceMessage: "Rythme optimal",
    wordsPerMinute: 144,
    stressLevel: 33,
    filler: null,
    silenceSeconds: 0.5,
    nonverbal: calm,
  },
  fast: {
    pace: "too-fast" as SpeechPace,
    paceMessage: "Parlez un peu plus lentement",
    wordsPerMinute: 182,
    stressLevel: 58,
    filler: "du coup",
    silenceSeconds: 0.2,
    nonverbal: away,
  },
  slow: {
    pace: "too-slow" as SpeechPace,
    paceMessage: "Reprenez un peu de rythme",
    wordsPerMinute: 100,
    stressLevel: 49,
    filler: "euh",
    silenceSeconds: 2.3,
    nonverbal: hesitant,
  },
};

function beats(id: string, rows: BeatInput[]): LiveTick[] {
  return rows.map((row, index) => {
    const mode = modes[row.mode];
    return {
      question: row.question,
      candidateLine: row.answer,
      suggestions: row.tips.map((text, tipIndex) => ({
        id: `${id}-${index}-${tipIndex}`,
        text,
      })),
      ...mode,
    };
  });
}

export const extraProfiles: readonly InterviewProfile[] = [
  {
    id: "entretien-dev",
    kind: "Entretien",
    role: "Développeur",
    company: "Équipe produit",
    focus: "Un problème technique, votre rôle, le résultat en production.",
    durationMin: 45,
  },
  {
    id: "entretien-design",
    kind: "Entretien",
    role: "Designer produit",
    company: "Équipe design",
    focus: "Un parcours utilisateur, un arbitrage, ce que vous avez mesuré.",
    durationMin: 45,
  },
  {
    id: "entretien-data",
    kind: "Entretien",
    role: "Analyste de données",
    company: "Équipe data",
    focus: "La question métier, la donnée, la limite de votre conclusion.",
    durationMin: 45,
  },
  {
    id: "entretien-commercial",
    kind: "Entretien",
    role: "Commercial",
    company: "Cycle de vente",
    focus: "Un compte, l'écoute, la prochaine étape datée.",
    durationMin: 40,
  },
  {
    id: "entretien-conseil",
    kind: "Entretien",
    role: "Consultant",
    company: "Cabinet",
    focus: "Le problème du client, votre analyse, la recommandation.",
    durationMin: 45,
  },
  {
    id: "entretien-manager",
    kind: "Entretien",
    role: "Manager d'équipe",
    company: "Organisation",
    focus: "Un conflit, une décision, ce que l'équipe a livré.",
    durationMin: 45,
  },
  {
    id: "entretien-rh",
    kind: "Entretien",
    role: "Chargé de recrutement",
    company: "Ressources humaines",
    focus: "Un besoin flou, votre grille, un refus clair.",
    durationMin: 40,
  },
  {
    id: "entretien-soin",
    kind: "Entretien",
    role: "Infirmier",
    company: "Service de soins",
    focus: "Une situation de soin, l'équipe, la sécurité du patient.",
    durationMin: 40,
  },
  {
    id: "entretien-enseignant",
    kind: "Entretien",
    role: "Enseignant",
    company: "Établissement",
    focus: "Une séance, les élèves en difficulté, le travail avec l'équipe.",
    durationMin: 40,
  },
  {
    id: "entretien-comptable",
    kind: "Entretien",
    role: "Collaborateur comptable",
    company: "Cabinet",
    focus: "Une anomalie, la pièce, la question posée au client.",
    durationMin: 40,
  },
  {
    id: "entretien-journaliste",
    kind: "Entretien",
    role: "Journaliste",
    company: "Rédaction",
    focus: "L'angle, les sources, ce que vous n'avez pas pu vérifier.",
    durationMin: 35,
  },
  {
    id: "alternance",
    kind: "Alternance",
    role: "Alternance",
    company: "Rythme école et entreprise",
    focus: "Le calendrier, ce que vous apportez déjà, le tuteur.",
    durationMin: 30,
  },
  {
    id: "oral",
    kind: "Oral",
    role: "Soutenance",
    company: "Jury",
    focus: "La question, le résultat, la limite de votre travail.",
    durationMin: 20,
  },
  {
    id: "client",
    kind: "Client",
    role: "Rendez-vous client",
    company: "Découverte",
    focus: "Le besoin, le silence, la prochaine étape.",
    durationMin: 40,
  },
];

export const extraScripts: Record<string, LiveTick[]> = {
  "entretien-dev": beats("dev", [
    {
      question: "Parlez-moi d'un bug difficile que vous avez corrigé.",
      answer: "Une requête saturait l'API. J'ai isolé l'appel, ajouté un index, et le temps de réponse est passé sous 200 ms.",
      tips: ["Le symptôme, pas l'historique", "Votre geste précis", "Le chiffre après correction"],
      mode: "optimal",
    },
    {
      question: "Comment travaillez-vous avec quelqu'un qui n'est pas d'accord avec votre approche ?",
      answer: "Du coup je défends mon idée, du coup on verra bien.",
      tips: ["Le désaccord en une phrase", "L'essai que vous proposez", "Utilisez la méthode STAR"],
      mode: "fast",
    },
    {
      question: "Que feriez-vous les deux premières semaines dans l'équipe ?",
      answer: "Lire le code des parcours critiques, corriger un petit irritant, et demander une revue.",
      tips: ["Lire, corriger, faire relire", "Un irritant déjà visible", "Mentionnez une expérience proche"],
      mode: "optimal",
    },
  ]),
  "entretien-design": beats("design", [
    {
      question: "Montrez un parcours que vous avez simplifié.",
      answer: "L'inscription demandait huit champs. On en a gardé trois, et le taux de complétion a gagné 18 points.",
      tips: ["Le frottement avant", "Ce que vous avez retiré", "La mesure ensuite"],
      mode: "optimal",
    },
    {
      question: "Un développeur vous dit que c'est trop long à construire.",
      answer: "Du coup on fait la version complète, du coup ce sera mieux.",
      tips: ["Une version plus petite", "Ce que vous acceptez de couper", "Le critère de réussite"],
      mode: "fast",
    },
    {
      question: "Comment savez-vous que l'écran est compris ?",
      answer: "Cinq personnes l'utilisent sans aide. Je note où elles hésitent, puis je corrige cet écran-là.",
      tips: ["Un test, pas une opinion", "L'hésitation observée", "La correction qui suit"],
      mode: "optimal",
    },
  ]),
  "entretien-data": beats("data", [
    {
      question: "Quelle décision votre analyse a-t-elle changée ?",
      answer: "Les relances partaient trop tôt. En décalant de trois jours, le taux de réponse a monté de 9 points.",
      tips: ["La décision, pas le tableau", "Le chiffre", "Ce que vous n'avez pas pu conclure"],
      mode: "optimal",
    },
    {
      question: "La donnée est incomplète. Que dites-vous ?",
      answer: "Euh… on peut quand même conclure… euh je crois.",
      tips: ["Nommez le trou", "Ce que le chiffre permet encore", "Ce qu'il ne permet pas"],
      mode: "slow",
    },
    {
      question: "Comment expliquez-vous le résultat à quelqu'un du métier ?",
      answer: "Une phrase, le chiffre, puis ce qu'ils peuvent faire lundi.",
      tips: ["Une phrase d'abord", "Le geste concret", "Pas de méthode dans la réponse"],
      mode: "optimal",
    },
  ]),
  "entretien-commercial": beats("commercial", [
    {
      question: "Racontez une vente que vous avez conclue.",
      answer: "Le client bloquait sur le délai. J'ai séparé le démarrage et la formation, et on a signé le mois suivant.",
      tips: ["L'objection réelle", "Ce que vous n'avez pas bradé", "La date de signature"],
      mode: "optimal",
    },
    {
      question: "Votre prix est trop haut.",
      answer: "Du coup je baisse, du coup on avance.",
      tips: ["Une question avant la concession", "Laissez deux secondes", "Séparez prix et périmètre"],
      mode: "fast",
    },
    {
      question: "Quelle est la prochaine étape ?",
      answer: "Un appel jeudi avec leur directeur, et le bon de commande envoyé avant.",
      tips: ["Une date et un nom", "Le document, pas une promesse", "Reformulez l'accord"],
      mode: "optimal",
    },
  ]),
  "entretien-conseil": beats("conseil", [
    {
      question: "Décrivez un problème client que vous avez structuré.",
      answer: "Leur délai de réponse client dépassait cinq jours. La cause était le transfert entre deux équipes, pas le volume.",
      tips: ["Le symptôme chiffré", "La cause, pas la liste", "Trois actions maximum"],
      mode: "optimal",
    },
    {
      question: "Le client conteste votre recommandation.",
      answer: "Euh… on peut changer… euh si vous voulez.",
      tips: ["Répétez ce qu'il conteste", "Le fait qui tient encore", "Ce que vous ajustez vraiment"],
      mode: "slow",
    },
    {
      question: "Comment présentez-vous la suite ?",
      answer: "Un pilote de quatre semaines, un responsable chez eux, un chiffre de succès.",
      tips: ["Le pilote", "Le responsable", "Le critère d'arrêt"],
      mode: "optimal",
    },
  ]),
  "entretien-manager": beats("manager", [
    {
      question: "Parlez d'un désaccord dans votre équipe.",
      answer: "Deux personnes bloquaient une livraison. J'ai tranché le périmètre de la semaine et on a livré le reste.",
      tips: ["Utilisez la méthode STAR", "La décision que vous assumez", "L'effet sur l'équipe"],
      mode: "optimal",
    },
    {
      question: "Quelqu'un est en dessous du niveau attendu.",
      answer: "Du coup je lui dis de faire attention, du coup ça ira.",
      tips: ["Un fait observable", "L'attendu, daté", "Le soutien que vous mettez"],
      mode: "fast",
    },
    {
      question: "Que gardez-vous pour vous, et que dites-vous à l'équipe ?",
      answer: "Je dis la contrainte et la décision. Je ne commente pas la personne absente.",
      tips: ["La contrainte", "La décision", "Ce que vous ne colportez pas"],
      mode: "optimal",
    },
  ]),
  "entretien-rh": beats("rh", [
    {
      question: "Un manager veut aller trop vite sur un recrutement.",
      answer: "J'ai fait réécrire le besoin en trois critères. Deux candidatures sont sorties, une est restée.",
      tips: ["Les critères avant les CV", "Ce que vous avez écarté", "Le manager reste décideur"],
      mode: "optimal",
    },
    {
      question: "Comment refusez-vous quelqu'un ?",
      answer: "Euh… on vous recontactera… euh peut-être.",
      tips: ["Un fait lié au besoin", "Une phrase ferme", "Pas de promesse floue"],
      mode: "slow",
    },
    {
      question: "Que mesurez-vous sur vos recrutements ?",
      answer: "Le délai, le taux d'acceptation, et si la personne est encore là à six mois.",
      tips: ["Trois indicateurs", "Celui que vous pouvez bouger", "Mentionnez une expérience proche"],
      mode: "optimal",
    },
  ]),
  "entretien-soin": beats("soin", [
    {
      question: "Décrivez une situation où la sécurité du patient a primé.",
      answer: "Une prescription me semblait incohérente. J'ai suspendu l'administration et appelé le médecin.",
      tips: ["Le fait observé", "Ce que vous avez arrêté", "Qui vous avez appelé"],
      mode: "optimal",
    },
    {
      question: "L'équipe est en retard sur les soins.",
      answer: "Du coup je me dépêche, du coup je rattrape.",
      tips: ["Ce que vous priorisez", "Ce que vous transmettez", "Ouvrez légèrement les épaules"],
      mode: "fast",
    },
    {
      question: "Comment accueillez-vous une famille inquiète ?",
      answer: "Je dis ce que je sais, ce que je ne sais pas, et à quelle heure je reviens.",
      tips: ["Le fait", "La limite", "L'heure de retour"],
      mode: "optimal",
    },
  ]),
  "entretien-enseignant": beats("enseignant", [
    {
      question: "Racontez une séance qui n'a pas marché, puis ce que vous avez changé.",
      answer: "La consigne était trop longue. La fois suivante, je l'ai coupée en deux temps et le groupe a produit.",
      tips: ["Ce qui a bloqué", "Le changement précis", "Ce que les élèves ont fait"],
      mode: "optimal",
    },
    {
      question: "Un élève refuse le travail.",
      answer: "Euh… je le laisse… euh ou je hausse le ton.",
      tips: ["La demande, courte", "Une issue possible", "Le cadre, sans humiliation"],
      mode: "slow",
    },
    {
      question: "Comment travaillez-vous avec l'équipe ?",
      answer: "Je remonte un fait de classe, pas un jugement, et je demande ce qui a déjà été essayé.",
      tips: ["Un fait", "Ce qui a déjà été tenté", "Votre demande précise"],
      mode: "optimal",
    },
  ]),
  "entretien-comptable": beats("comptable", [
    {
      question: "Vous trouvez un écart. Que faites-vous ?",
      answer: "Je rapproche la pièce et le relevé. Si l'écart reste, je le note et je pose une question au client.",
      tips: ["La pièce", "L'écart chiffré", "La question, pas l'accusation"],
      mode: "optimal",
    },
    {
      question: "Le client veut une clôture demain.",
      answer: "Du coup je valide tout, du coup on signe.",
      tips: ["Ce qui est prêt", "Ce qui bloque encore", "La date réelle"],
      mode: "fast",
    },
    {
      question: "Comment expliquez-vous une écriture à quelqu'un qui n'est pas comptable ?",
      answer: "Je dis ce qui est entré, ce qui est sorti, et pourquoi le solde a bougé.",
      tips: ["Entré, sorti, solde", "Sans le nom du compte d'abord", "Une seule écriture en exemple"],
      mode: "optimal",
    },
  ]),
  "entretien-journaliste": beats("journaliste", [
    {
      question: "Quel est l'angle de votre dernier sujet ?",
      answer: "Pas « la grève », mais le délai réel pour obtenir un rendez-vous médical cette semaine-là.",
      tips: ["L'angle en une phrase", "La source", "Ce que vous n'avez pas vérifié"],
      mode: "optimal",
    },
    {
      question: "Une source vous demande de retirer une phrase vraie.",
      answer: "Euh… je retire… euh pour garder le contact.",
      tips: ["Le fait qui reste publiable", "Ce que vous pouvez nuancer", "Ce que vous ne cédez pas"],
      mode: "slow",
    },
    {
      question: "Vous avez vingt minutes avant le bouclage.",
      answer: "Je garde le fait, la source, et je coupe le contexte qui peut attendre.",
      tips: ["Le fait", "La source", "Ce qui peut attendre"],
      mode: "optimal",
    },
  ]),
  alternance: beats("alternance", [
    {
      question: "Comment tenez-vous le rythme école et entreprise ?",
      answer: "Je bloque les rendus école le dimanche et les questions tuteur le lundi matin.",
      tips: ["Le calendrier réel", "Ce que l'entreprise y gagne", "Le point avec le tuteur"],
      mode: "optimal",
    },
    {
      question: "Pourquoi cette alternance plutôt qu'un stage ?",
      answer: "Du coup c'est plus long, du coup j'apprendrai plus.",
      tips: ["Une mission qui dure", "Ce que vous savez déjà faire", "Le lien avec le diplôme"],
      mode: "fast",
    },
    {
      question: "Que voulez-vous savoir sur la première semaine ?",
      answer: "Qui est mon tuteur, quelle est la première tâche, et quels jours je suis à l'école.",
      tips: ["Le tuteur", "La première tâche", "Les jours de présence"],
      mode: "optimal",
    },
  ]),
  oral: beats("oral", [
    {
      question: "En une minute, quelle question votre travail pose-t-il ?",
      answer: "Est-ce qu'un rappel la veille réduit les rendez-vous manqués dans ce service.",
      tips: ["La question, pas le plan", "Le terrain", "Le résultat en une phrase"],
      mode: "optimal",
    },
    {
      question: "Votre échantillon est petit. Le jury insiste.",
      answer: "Du coup ça reste vrai, du coup on peut généraliser.",
      tips: ["La limite, tout de suite", "Ce que le résultat permet", "Ce qu'il ne permet pas"],
      mode: "fast",
    },
    {
      question: "Que feriez-vous si vous aviez un mois de plus ?",
      answer: "Reprendre la même mesure sur un deuxième site, avec le même protocole.",
      tips: ["Une suite précise", "Le même protocole", "Pas une nouvelle question"],
      mode: "optimal",
    },
  ]),
  client: beats("client", [
    {
      question: "Reprenez ce que vous avez compris de notre besoin.",
      answer: "Vous perdez des demandes entre le formulaire et l'appel. Vous voulez un délai de réponse sous un jour.",
      tips: ["Leur phrase, pas votre offre", "Le délai qu'ils ont dit", "Demandez si c'est juste"],
      mode: "optimal",
    },
    {
      question: "On n'a pas le budget cette année.",
      answer: "Du coup je vous fais une réduction, du coup on signe.",
      tips: ["Une question avant la concession", "Ce qui peut attendre", "Laissez le silence"],
      mode: "fast",
    },
    {
      question: "Quelle suite proposez-vous ?",
      answer: "Un atelier de deux heures jeudi, avec la personne qui traite les demandes aujourd'hui.",
      tips: ["La date", "La personne utile", "Le livrable de l'atelier"],
      mode: "optimal",
    },
  ]),
};
