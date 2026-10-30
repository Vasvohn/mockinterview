import type { PlanId } from "@/lib/plans";

/** Offres encaissées par Paddle. La découverte reste gratuite. */
export type PaidPlanId = Exclude<PlanId, "free">;

const priceEnv: Record<PaidPlanId, string | undefined> = {
  week: process.env.NEXT_PUBLIC_PADDLE_PRICE_WEEK,
  seeker: process.env.NEXT_PUBLIC_PADDLE_PRICE_SEEKER,
  executive: process.env.NEXT_PUBLIC_PADDLE_PRICE_EXECUTIVE,
};

function trimmed(value: string | undefined): string | null {
  const next = value?.trim();
  return next ? next : null;
}

export function paddleClientToken(): string | null {
  return trimmed(process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN);
}

/** Sandbox par défaut, sauf jeton live_ ou variable explicite. */
export function paddleEnvironment(): "sandbox" | "production" {
  const explicit = trimmed(process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT);
  if (explicit === "production" || explicit === "sandbox") return explicit;
  const token = paddleClientToken() ?? "";
  return token.startsWith("live_") ? "production" : "sandbox";
}

export function priceIdFor(planId: PaidPlanId): string | null {
  return trimmed(priceEnv[planId]);
}

export function canPayWithPaddle(planId: PaidPlanId): boolean {
  return Boolean(paddleClientToken() && priceIdFor(planId));
}

/** Retrouve l'offre à partir du prix Paddle réellement payé. */
export function planIdFromPrice(priceId: string): PaidPlanId | null {
  const plans = Object.keys(priceEnv) as PaidPlanId[];
  for (const planId of plans) {
    if (priceIdFor(planId) === priceId) return planId;
  }
  return null;
}
