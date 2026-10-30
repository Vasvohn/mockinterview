"use client";

import { plans, quotaLabel } from "@/lib/plans";
import { button } from "@/lib/ui";
import { useSessionStore } from "@/store/useSessionStore";

export function Offers() {
  const hydrated = useSessionStore((state) => state.hydrated);
  const planId = useSessionStore((state) => state.planId);
  const sessionsUsed = useSessionStore((state) => state.sessionsUsed);
  const selectPlan = useSessionStore((state) => state.selectPlan);

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Offres</p>
      <h1 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight text-white">
        Un essai court, puis un abonnement quand les entretiens s&apos;enchaînent.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
        Les prix décrivent le modèle visé : découverte, pass semaine, recherche active, et une
        licence pour le closing. Ici, activer un plan change seulement la démo sur cet appareil.
        Aucun paiement n&apos;est encaissé.
      </p>
      <p className="mt-4 text-sm text-zinc-300">
        {hydrated ? quotaLabel(planId, sessionsUsed) : "Lecture du plan…"}
      </p>

      <ul className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => {
          const active = planId === plan.id;
          return (
            <li key={plan.id}>
              <article
                className={`flex h-full flex-col rounded-xl border p-5 ${
                  plan.highlighted ? "border-white/40" : "border-white/10"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-base font-medium text-white">{plan.name}</h2>
                  {plan.highlighted ? (
                    <span className="text-[10px] uppercase tracking-[0.14em] text-zinc-400">
                      Repère
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 text-2xl font-medium tracking-tight text-white">{plan.price}</p>
                <p className="mt-1 text-xs text-zinc-500">
                  {plan.id === "free" ? plan.cadence : `Prix visé · ${plan.cadence}`}
                </p>
                <p className="mt-4 text-sm leading-6 text-zinc-400">{plan.audience}</p>
                <ul className="mt-4 flex-1 space-y-2 text-sm text-zinc-300">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`${active ? button.quiet : button.primary} mt-6`}
                  disabled={!hydrated || active}
                  onClick={() => selectPlan(plan.id)}
                >
                  {active ? "Plan en cours" : "Activer en démo"}
                </button>
              </article>
            </li>
          );
        })}
      </ul>

      <section className="mt-8 rounded-xl border border-white/10 p-5">
        <h2 className="text-base font-medium text-white">Écoles et cabinets</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
          Une licence globale pour préparer une promotion aux entretiens de stage et de premier
          emploi. Sur devis, hors de cette démo.
        </p>
      </section>
    </div>
  );
}
