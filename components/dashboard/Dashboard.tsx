"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PaywallDialog } from "@/components/dashboard/PaywallDialog";
import { getPlan, quotaLabel } from "@/lib/plans";
import { profiles } from "@/lib/profiles";
import { button } from "@/lib/ui";
import { useSessionStore } from "@/store/useSessionStore";

export function Dashboard() {
  const router = useRouter();
  const [paywall, setPaywall] = useState(false);
  const hydrated = useSessionStore((state) => state.hydrated);
  const planId = useSessionStore((state) => state.planId);
  const sessionsUsed = useSessionStore((state) => state.sessionsUsed);
  const prepareSession = useSessionStore((state) => state.prepareSession);

  function launch(profileId: string) {
    const result = prepareSession(profileId);
    if (result === "blocked") {
      setPaywall(true);
      return;
    }
    if (result === "ready") router.push("/live-session");
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Sessions</p>
          <h1 className="mt-3 text-3xl font-medium tracking-tight text-white">
            Choisissez le contexte
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
            Entretien, levée, négociation ou premier emploi. Le copilote ne s&apos;affiche
            qu&apos;après votre accord, et cette version simule le flux.
          </p>
        </div>
        <p className="text-sm text-zinc-300">
          {hydrated ? quotaLabel(planId, sessionsUsed) : "Lecture du plan…"}
          {hydrated ? (
            <span className="mt-1 block text-xs text-zinc-500">{getPlan(planId).name}</span>
          ) : null}
        </p>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {profiles.map((profile) => (
          <li key={profile.id}>
            <article className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                {profile.kind}
              </p>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-white">
                {profile.role}
              </h2>
              <p className="mt-1 text-sm text-zinc-400">{profile.company}</p>
              <p className="mt-4 flex-1 text-sm leading-6 text-zinc-300">{profile.focus}</p>
              <div className="mt-6 flex items-center justify-between gap-3">
                <span className="text-xs text-zinc-500">{profile.durationMin} min</span>
                <button
                  type="button"
                  className={button.primary}
                  disabled={!hydrated}
                  onClick={() => launch(profile.id)}
                >
                  Lancer
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-2xl text-sm leading-6 text-zinc-500">
        Le quota découverte se remet à zéro chaque mois, sur cet appareil. Transcription et
        signaux restent en mémoire le temps de la session : ils ne sont pas enregistrés.
      </p>

      <PaywallDialog open={paywall} onClose={() => setPaywall(false)} />
    </div>
  );
}
