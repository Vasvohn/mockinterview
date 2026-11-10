"use client";

import { useEffect, useState } from "react";
import { canPayWithPaddle, paddleClientToken, type PaidPlanId } from "@/lib/paddle";
import { bindPaddleHandlers, openPaddleCheckout } from "@/lib/paddleCheckout";
import { getPlan, plans, quotaLabel, type PlanId } from "@/lib/plans";
import { button } from "@/lib/ui";
import { useSessionStore } from "@/store/useSessionStore";

export function Offers() {
  const hydrated = useSessionStore((state) => state.hydrated);
  const planId = useSessionStore((state) => state.planId);
  const sessionsUsed = useSessionStore((state) => state.sessionsUsed);
  const selectPlan = useSessionStore((state) => state.selectPlan);
  const [opening, setOpening] = useState<PaidPlanId | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [returned, setReturned] = useState(false);
  const paddleReady = Boolean(paddleClientToken());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setReturned(params.get("paiement") === "retour");
  }, []);

  useEffect(
    () =>
      bindPaddleHandlers((paid) => {
        selectPlan(paid);
        setNotice(
          `Paiement confirmé. ${getPlan(paid).name} est actif sur cet appareil. Aucun compte n'a été créé : ce choix reste dans ce navigateur.`,
        );
      }, setNotice),
    [selectPlan],
  );

  async function choose(next: PlanId) {
    if (next === "free") {
      selectPlan("free");
      setNotice(null);
      return;
    }
    setNotice(null);
    setOpening(next);
    try {
      await openPaddleCheckout(next);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Le paiement Paddle n'a pas pu démarrer.");
    } finally {
      setOpening(null);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Offres</p>
      <h1 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight text-foreground">
        Un essai court, puis un abonnement quand les entretiens s&apos;enchaînent.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        La découverte reste gratuite. Les autres offres s&apos;ouvrent dans Paddle Checkout.
      </p>
      <section className="mt-6 max-w-2xl rounded-xl border border-line bg-surface p-5">
        <h2 className="text-base font-medium text-foreground">Après le paiement</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Paddle vous ramène sur cette page. Aucun compte n&apos;est créé. Le plan ne s&apos;active
          ici, sur cet appareil, que si Paddle confirme la transaction.
        </p>
        {returned && hydrated ? (
          <p className="mt-3 text-sm leading-6 text-foreground" role="status">
            {planId === "free"
              ? "Vous êtes de retour, mais aucun plan payant n'est actif sur cet appareil. Le paiement n'a pas été confirmé : vous pouvez relancer Paddle."
              : `${getPlan(planId).name} est actif sur cet appareil. Il n'y a pas de compte à ouvrir : ce choix reste dans ce navigateur.`}
          </p>
        ) : null}
      </section>
      <p className="mt-4 text-sm text-foreground">
        {hydrated ? quotaLabel(planId, sessionsUsed) : "Lecture du plan…"}
      </p>
      {notice ? (
        <p className="mt-3 text-sm text-amber-800" role="status">
          {notice}
        </p>
      ) : null}
      {!paddleReady ? (
        <p className="mt-3 max-w-2xl text-sm leading-6 text-amber-800" role="status">
          Paddle n&apos;est pas encore branché. Ajoutez le jeton client et les identifiants de prix
          dans <span className="font-medium">.env.local</span>, à partir de{" "}
          <span className="font-medium">.env.example</span>.
        </p>
      ) : null}

      <h2 className="mt-10 text-base font-medium text-foreground">Formules</h2>
      <ul className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => {
          const active = planId === plan.id;
          const payable = plan.id === "free" || canPayWithPaddle(plan.id);
          const busy = opening === plan.id;
          return (
            <li key={plan.id}>
              <article
                className={`flex h-full flex-col rounded-xl border bg-surface p-5 ${
                  plan.highlighted ? "border-cta" : "border-line"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-medium text-foreground">{plan.name}</h3>
                  {plan.highlighted ? (
                    <span className="text-[10px] uppercase tracking-[0.14em] text-secondary">
                      Repère
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 text-2xl font-medium tracking-tight text-foreground">{plan.price}</p>
                <p className="mt-1 text-xs text-muted">{plan.cadence}</p>
                <p className="mt-4 text-sm leading-6 text-muted">{plan.audience}</p>
                <ul className="mt-4 flex-1 space-y-2 text-sm text-foreground">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`${active ? button.quiet : button.primary} mt-6`}
                  disabled={!hydrated || active || busy || !payable}
                  onClick={() => void choose(plan.id)}
                >
                  {active ? "Plan en cours" : label(plan.id, busy)}
                </button>
              </article>
            </li>
          );
        })}
      </ul>

      <section className="mt-8 rounded-xl border border-secondary/30 bg-secondary/10 p-5">
        <h2 className="text-base font-medium text-foreground">Écoles et cabinets</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Une licence globale pour préparer une promotion aux entretiens de stage et de premier
          emploi. Sur devis, en dehors de Paddle Checkout.
        </p>
      </section>
    </div>
  );
}

function label(planId: PlanId, busy: boolean): string {
  if (planId === "free") return "Choisir Découverte";
  if (busy) return "Ouverture…";
  return "Payer avec Paddle";
}
