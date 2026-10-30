import type { InterviewProfile } from "@/lib/types";

export const profiles: readonly InterviewProfile[] = [
  {
    id: "entretien",
    kind: "Entretien",
    role: "Product Manager",
    company: "Linear",
    focus: "Réponses structurées, impact chiffré, rythme tenu.",
    durationMin: 45,
  },
  {
    id: "levee",
    kind: "Levée de fonds",
    role: "Fondateur",
    company: "Tour seed",
    focus: "Traction, usage des fonds, risque nommé sans se presser.",
    durationMin: 30,
  },
  {
    id: "negociation",
    kind: "Négociation",
    role: "Account Executive",
    company: "Renouvellement",
    focus: "Silence, périmètre, prochaine étape datée.",
    durationMin: 40,
  },
  {
    id: "premier-emploi",
    kind: "Premier emploi",
    role: "Stage ingénieur",
    company: "Cabinet partenaire",
    focus: "Clarté, regard caméra, un projet concret.",
    durationMin: 30,
  },
];

export function getProfile(id: string | null): InterviewProfile | null {
  if (!id) return null;
  return profiles.find((profile) => profile.id === id) ?? null;
}

export function initials(value: string): string {
  const parts = value.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "PF";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}
