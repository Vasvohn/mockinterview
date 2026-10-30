import type { LiveTick, NonverbalState } from "@/lib/types";

const calm: NonverbalState = {
  posture: "open",
  gaze: "camera",
  smile: "natural",
  cue: null,
};

/**
 * Scénarios factices. Chaque battement remplace les repères
 * et ajoute une question d'interlocuteur plus une bribe de réponse.
 */
export const scripts: Record<string, LiveTick[]> = {
  entretien: [
    {
      question: "Pouvez-vous vous présenter en deux minutes ?",
      candidateLine:
        "Je suis product manager. Au dernier trimestre, j'ai raccourci le cycle de livraison de 30 %.",
      suggestions: [
        { id: "e1a", text: "Rôle, puis un impact chiffré" },
        { id: "e1b", text: "Une réalisation, pas un CV" },
        { id: "e1c", text: "Terminez par ce que vous cherchez" },
      ],
      pace: "optimal",
      paceMessage: "Rythme optimal",
      wordsPerMinute: 146,
      stressLevel: 28,
      filler: null,
      silenceSeconds: 0.4,
      nonverbal: calm,
    },
    {
      question: "Pourquoi Linear, et pourquoi maintenant ?",
      candidateLine:
        "Du coup j'aime beaucoup le produit, du coup je me suis dit que c'était le moment.",
      suggestions: [
        { id: "e2a", text: "Un problème précis que vous avez vécu" },
        { id: "e2b", text: "Le lien avec leur façon de construire" },
        { id: "e2c", text: "Évitez le compliment général" },
      ],
      pace: "too-fast",
      paceMessage: "Parlez un peu plus lentement",
      wordsPerMinute: 186,
      stressLevel: 54,
      filler: "du coup",
      silenceSeconds: 0.2,
      nonverbal: {
        posture: "neutral",
        gaze: "away",
        smile: "absent",
        cue: "Revenez vers la caméra",
      },
    },
    {
      question: "Parlez-moi d'un désaccord avec l'ingénierie.",
      candidateLine:
        "Sur une refonte de navigation, l'équipe voulait tout recoder. On a cadré un test d'une semaine.",
      suggestions: [
        { id: "e3a", text: "Utilisez la méthode STAR" },
        { id: "e3b", text: "Le désaccord, puis la décision" },
        { id: "e3c", text: "L'effet mesuré ensuite" },
      ],
      pace: "optimal",
      paceMessage: "Rythme optimal",
      wordsPerMinute: 138,
      stressLevel: 40,
      filler: null,
      silenceSeconds: 0.6,
      nonverbal: calm,
    },
    {
      question: "Comment décidez-vous de ce qui n'entre pas dans le trimestre ?",
      candidateLine: "Euh… on regarde… euh l'impact, puis l'effort.",
      suggestions: [
        { id: "e4a", text: "Un critère, un exemple, un refus" },
        { id: "e4b", text: "Nommez ce que vous avez sorti" },
      ],
      pace: "too-slow",
      paceMessage: "Reprenez un peu de rythme",
      wordsPerMinute: 104,
      stressLevel: 47,
      filler: "euh",
      silenceSeconds: 2.4,
      nonverbal: {
        posture: "neutral",
        gaze: "camera",
        smile: "absent",
        cue: null,
      },
    },
    {
      question: "Que feriez-vous dans les 90 premiers jours ?",
      candidateLine:
        "Écouter les équipes, choisir un irritant visible, livrer un correctif mesurable.",
      suggestions: [
        { id: "e5a", text: "Écouter, choisir, livrer" },
        { id: "e5b", text: "Mentionnez votre expérience chez un produit proche" },
        { id: "e5c", text: "Un chiffre, puis le contexte" },
      ],
      pace: "optimal",
      paceMessage: "Rythme optimal",
      wordsPerMinute: 150,
      stressLevel: 33,
      filler: null,
      silenceSeconds: 0.5,
      nonverbal: calm,
    },
  ],
  levee: [
    {
      question: "Où en êtes-vous, en une minute ?",
      candidateLine:
        "Douze équipes paient. Le cycle de vente médian est de 18 jours.",
      suggestions: [
        { id: "l1a", text: "Une phrase de traction" },
        { id: "l1b", text: "Le problème, pas l'historique" },
        { id: "l1c", text: "Qui paie déjà" },
      ],
      pace: "optimal",
      paceMessage: "Rythme optimal",
      wordsPerMinute: 142,
      stressLevel: 31,
      filler: null,
      silenceSeconds: 0.3,
      nonverbal: calm,
    },
    {
      question: "Pourquoi vous, pourquoi cette équipe ?",
      candidateLine:
        "Du coup on a construit ça, du coup on connaît le métier mieux que personne.",
      suggestions: [
        { id: "l2a", text: "Une preuve, pas un adjectif" },
        { id: "l2b", text: "Le droit d'être dans ce marché" },
        { id: "l2c", text: "Mentionnez votre expérience chez un acteur proche" },
      ],
      pace: "too-fast",
      paceMessage: "Parlez un peu plus lentement",
      wordsPerMinute: 178,
      stressLevel: 58,
      filler: "du coup",
      silenceSeconds: 0.1,
      nonverbal: {
        posture: "closed",
        gaze: "away",
        smile: "absent",
        cue: "Ouvrez légèrement les épaules",
      },
    },
    {
      question: "Quel risque vous empêche de dormir ?",
      candidateLine:
        "La distribution. On a un canal qui marche, pas encore un deuxième.",
      suggestions: [
        { id: "l3a", text: "Nommez le risque" },
        { id: "l3b", text: "Ce que vous faites cette semaine" },
        { id: "l3c", text: "La métrique qui vous rassurerait" },
      ],
      pace: "optimal",
      paceMessage: "Rythme optimal",
      wordsPerMinute: 136,
      stressLevel: 44,
      filler: null,
      silenceSeconds: 0.8,
      nonverbal: calm,
    },
    {
      question: "Comment utilisez-vous cet argent ?",
      candidateLine: "Euh… surtout le produit… euh et un peu de commercial.",
      suggestions: [
        { id: "l4a", text: "Trois postes de dépense" },
        { id: "l4b", text: "L'échéance de la prochaine preuve" },
      ],
      pace: "too-slow",
      paceMessage: "Reprenez un peu de rythme",
      wordsPerMinute: 98,
      stressLevel: 51,
      filler: "euh",
      silenceSeconds: 2.1,
      nonverbal: {
        posture: "neutral",
        gaze: "camera",
        smile: "absent",
        cue: null,
      },
    },
    {
      question: "Et si un concurrent lève avant vous ?",
      candidateLine:
        "On gagne sur le déploiement, pas sur une fonctionnalité de plus.",
      suggestions: [
        { id: "l5a", text: "La distribution, pas la fonction" },
        { id: "l5b", text: "Restez sur une phrase" },
        { id: "l5c", text: "Utilisez la méthode STAR sur une vente gagnée" },
      ],
      pace: "optimal",
      paceMessage: "Rythme optimal",
      wordsPerMinute: 148,
      stressLevel: 36,
      filler: null,
      silenceSeconds: 0.4,
      nonverbal: calm,
    },
  ],
  negociation: [
    {
      question: "Reprenez le contexte de ce renouvellement.",
      candidateLine:
        "L'équipe support a réduit de 22 % les tickets réouverts depuis le déploiement.",
      suggestions: [
        { id: "n1a", text: "Le résultat client d'abord" },
        { id: "n1b", text: "Un chiffre d'usage" },
        { id: "n1c", text: "La date de décision" },
      ],
      pace: "optimal",
      paceMessage: "Rythme optimal",
      wordsPerMinute: 144,
      stressLevel: 30,
      filler: null,
      silenceSeconds: 0.5,
      nonverbal: calm,
    },
    {
      question: "Votre prix est au-dessus du budget.",
      candidateLine:
        "Je comprends, on peut regarder tout de suite ce qu'on retire du périmètre.",
      suggestions: [
        { id: "n2a", text: "Une question avant la concession" },
        { id: "n2b", text: "Laissez deux secondes de silence" },
        { id: "n2c", text: "Séparez prix et périmètre" },
      ],
      pace: "too-fast",
      paceMessage: "Parlez un peu plus lentement",
      wordsPerMinute: 184,
      stressLevel: 62,
      filler: null,
      silenceSeconds: 0.1,
      nonverbal: {
        posture: "closed",
        gaze: "camera",
        smile: "absent",
        cue: "Ouvrez légèrement les épaules",
      },
    },
    {
      question: "Qu'est-ce qui est négociable ?",
      candidateLine:
        "L'accompagnement de lancement. Le prix de la plateforme, non.",
      suggestions: [
        { id: "n3a", text: "Utilisez la méthode STAR sur un closing passé" },
        { id: "n3b", text: "Mentionnez votre expérience chez un compte similaire" },
        { id: "n3c", text: "Ce qui ne bouge pas, en une phrase" },
      ],
      pace: "optimal",
      paceMessage: "Rythme optimal",
      wordsPerMinute: 132,
      stressLevel: 38,
      filler: null,
      silenceSeconds: 1.1,
      nonverbal: calm,
    },
    {
      question: "On signe si vous retirez l'onboarding.",
      candidateLine: "Euh… oui peut-être… euh on peut voir.",
      suggestions: [
        { id: "n4a", text: "Nommez ce que l'onboarding évite" },
        { id: "n4b", text: "Proposez un échange, pas une coupe" },
      ],
      pace: "too-slow",
      paceMessage: "Reprenez un peu de rythme",
      wordsPerMinute: 96,
      stressLevel: 57,
      filler: "euh",
      silenceSeconds: 2.6,
      nonverbal: {
        posture: "closed",
        gaze: "away",
        smile: "absent",
        cue: null,
      },
    },
    {
      question: "Quelle est la prochaine étape concrète ?",
      candidateLine:
        "Je vous envoie le bon de commande demain, 10 h, avec le périmètre figé.",
      suggestions: [
        { id: "n5a", text: "Une date et un propriétaire" },
        { id: "n5b", text: "Le document, pas une promesse" },
        { id: "n5c", text: "Reformulez l'accord en une phrase" },
      ],
      pace: "optimal",
      paceMessage: "Rythme optimal",
      wordsPerMinute: 140,
      stressLevel: 29,
      filler: null,
      silenceSeconds: 0.4,
      nonverbal: calm,
    },
  ],
  "premier-emploi": [
    {
      question: "Présentez-vous simplement.",
      candidateLine:
        "J'aime rendre un système plus clair. Mon dernier projet suivait des vélos sur le campus.",
      suggestions: [
        { id: "p1a", text: "Ce que vous aimez construire" },
        { id: "p1b", text: "Un projet concret" },
        { id: "p1c", text: "Ce que vous voulez apprendre ici" },
      ],
      pace: "optimal",
      paceMessage: "Rythme optimal",
      wordsPerMinute: 134,
      stressLevel: 34,
      filler: null,
      silenceSeconds: 0.5,
      nonverbal: calm,
    },
    {
      question: "Pourquoi ce stage ?",
      candidateLine:
        "Du coup votre produit m'intéresse, du coup je veux travailler avec vous.",
      suggestions: [
        { id: "p2a", text: "Un cours ou un projet, pas un slogan" },
        { id: "p2b", text: "Le lien avec leur métier" },
        { id: "p2c", text: "Mentionnez votre expérience chez ce projet de campus" },
      ],
      pace: "too-fast",
      paceMessage: "Parlez un peu plus lentement",
      wordsPerMinute: 172,
      stressLevel: 49,
      filler: "du coup",
      silenceSeconds: 0.2,
      nonverbal: {
        posture: "neutral",
        gaze: "away",
        smile: "absent",
        cue: "Revenez vers la caméra",
      },
    },
    {
      question: "Racontez un travail de groupe difficile.",
      candidateLine:
        "Deux d'entre nous bloquaient sur l'API. J'ai découpé le sujet et on a livré la démo.",
      suggestions: [
        { id: "p3a", text: "Utilisez la méthode STAR" },
        { id: "p3b", text: "Votre rôle exact" },
        { id: "p3c", text: "Ce que le groupe a livré" },
      ],
      pace: "optimal",
      paceMessage: "Rythme optimal",
      wordsPerMinute: 140,
      stressLevel: 36,
      filler: null,
      silenceSeconds: 0.6,
      nonverbal: calm,
    },
    {
      question: "Qu'est-ce que vous ne savez pas encore faire ?",
      candidateLine: "Euh… beaucoup de choses… euh le déploiement, je crois.",
      suggestions: [
        { id: "p4a", text: "Un manque précis" },
        { id: "p4b", text: "Comment vous l'apprenez" },
      ],
      pace: "too-slow",
      paceMessage: "Reprenez un peu de rythme",
      wordsPerMinute: 92,
      stressLevel: 55,
      filler: "euh",
      silenceSeconds: 2.2,
      nonverbal: {
        posture: "closed",
        gaze: "camera",
        smile: "absent",
        cue: null,
      },
    },
    {
      question: "Avez-vous des questions pour nous ?",
      candidateLine:
        "Comment se passe la première semaine pour un stagiaire dans l'équipe ?",
      suggestions: [
        { id: "p5a", text: "Une question sur l'équipe" },
        { id: "p5b", text: "Une question sur la première semaine" },
        { id: "p5c", text: "Écoutez la réponse jusqu'au bout" },
      ],
      pace: "optimal",
      paceMessage: "Rythme optimal",
      wordsPerMinute: 128,
      stressLevel: 27,
      filler: null,
      silenceSeconds: 0.7,
      nonverbal: {
        posture: "open",
        gaze: "camera",
        smile: "natural",
        cue: null,
      },
    },
  ],
};

export function getBeats(profileId: string | null): LiveTick[] {
  if (profileId && scripts[profileId]) return scripts[profileId];
  return scripts.entretien;
}
