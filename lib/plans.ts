export type PlanId = "free" | "week" | "seeker" | "executive";

export interface Plan {
  id: PlanId;
  name: string;
  price: string;
  cadence: string;
  audience: string;
  /** Null : pas de plafond dans la démo. */
  sessionLimit: number | null;
  highlighted?: boolean;
  features: readonly string[];
}

/** Prix visés du modèle. Le paiement n'est pas branché. */
export const plans: readonly Plan[] = [
  {
    id: "free",
    name: "Découverte",
    price: "0 €",
    cadence: "3 sessions / mois",
    audience: "Pour essayer le copilote sur un vrai contexte.",
    sessionLimit: 3,
    features: [
      "Rythme de parole",
      "Deux ou trois repères",
      "Compteur local, sans compte",
      "Aucun enregistrement",
    ],
  },
  {
    id: "week",
    name: "Semaine d'entretiens",
    price: "19 €",
    cadence: "pass court",
    audience: "Une série d'entretiens rapprochés.",
    sessionLimit: null,
    features: [
      "Sessions ouvertes dans la démo",
      "Tics de langage signalés",
      "Même HUD, même discrétion",
    ],
  },
  {
    id: "seeker",
    name: "Job Seeker",
    price: "39 €",
    cadence: "par mois",
    audience: "Recherche active, quand le poste compte.",
    sessionLimit: null,
    highlighted: true,
    features: [
      "Voix, contenu et non-verbal",
      "Entretiens, levées et négociations",
      "Repères STAR pendant la réponse",
    ],
  },
  {
    id: "executive",
    name: "Sales & Executive",
    price: "149 €",
    cadence: "par mois / utilisateur",
    audience: "Closing, conseil et tours de table.",
    sessionLimit: null,
    features: [
      "Contextes de négociation et de pitch",
      "Silences et rythme de closing",
      "Licence pensée par utilisateur",
    ],
  },
];

const planIds = new Set<string>(plans.map((plan) => plan.id));

export function isPlanId(value: unknown): value is PlanId {
  return typeof value === "string" && planIds.has(value);
}

export function getPlan(id: PlanId): Plan {
  const plan = plans.find((item) => item.id === id);
  if (!plan) {
    throw new Error(`Plan inconnu : ${id}`);
  }
  return plan;
}

export function canStart(planId: PlanId, sessionsUsed: number): boolean {
  const limit = getPlan(planId).sessionLimit;
  return limit == null || sessionsUsed < limit;
}

export function quotaLabel(planId: PlanId, sessionsUsed: number): string {
  const plan = getPlan(planId);
  if (plan.sessionLimit == null) {
    return `${plan.name} · sessions ouvertes`;
  }
  const left = Math.max(0, plan.sessionLimit - sessionsUsed);
  if (left === 0) return "Limite du mois atteinte";
  if (left === 1) return "1 session restante ce mois-ci";
  return `${left} sessions restantes ce mois-ci`;
}
