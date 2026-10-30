"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PaywallDialog } from "@/components/dashboard/PaywallDialog";
import { getPlan, quotaLabel } from "@/lib/plans";
import { profiles } from "@/lib/profiles";
import type { InterviewProfile } from "@/lib/types";
import { button } from "@/lib/ui";
import { useSessionStore } from "@/store/useSessionStore";

export function Dashboard() {
  const router = useRouter();
  const [paywall, setPaywall] = useState(false);
  const [query, setQuery] = useState("");
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
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Sessions</p>
          <h1 className="mt-3 text-3xl font-medium tracking-tight text-foreground">
            Choisissez le contexte
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            Entretiens, clients, oraux, alternance, et un stage par secteur. Le copilote ne
            s&apos;affiche qu&apos;après votre accord, et cette version simule le flux.
          </p>
        </div>
        <p className="text-sm text-foreground">
          {hydrated ? quotaLabel(planId, sessionsUsed) : "Lecture du plan…"}
          {hydrated ? (
            <span className="mt-1 block text-xs text-muted">{getPlan(planId).name}</span>
          ) : null}
        </p>
      </div>

      <label className="mt-8 block max-w-md">
        <span className="sr-only">Filtrer les sessions</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Métier, secteur, stage…"
          className="h-10 w-full rounded-md border border-line bg-surface px-3 text-sm text-foreground outline-none placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
        />
      </label>

      <SessionGroups query={query} hydrated={hydrated} onLaunch={launch} />

      <p className="mt-8 max-w-2xl text-sm leading-6 text-muted">
        Le quota découverte se remet à zéro chaque mois, sur cet appareil. Transcription et
        signaux restent en mémoire le temps de la session : ils ne sont pas enregistrés.
      </p>

      <PaywallDialog open={paywall} onClose={() => setPaywall(false)} />
    </div>
  );
}

function SessionGroups({
  query,
  hydrated,
  onLaunch,
}: {
  query: string;
  hydrated: boolean;
  onLaunch: (profileId: string) => void;
}) {
  const groups = [
    {
      title: "Contextes",
      items: profiles.filter((profile) => profile.kind !== "Stage" && matches(profile, query)),
    },
    {
      title: "Stages par secteur",
      items: profiles.filter((profile) => profile.kind === "Stage" && matches(profile, query)),
    },
  ];
  const visible = groups.reduce((count, group) => count + group.items.length, 0);

  if (visible === 0) {
    return <p className="mt-8 text-sm text-muted">Aucune session ne correspond à cette recherche.</p>;
  }

  return (
    <div className="mt-10 space-y-10">
      {groups.map((group) =>
        group.items.length === 0 ? null : (
          <section key={group.title}>
            <h2 className="text-sm font-medium text-foreground">
              {group.title}
              <span className="ml-2 text-muted">{group.items.length}</span>
            </h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((profile) => (
                <li key={profile.id}>
                  <SessionCard profile={profile} hydrated={hydrated} onLaunch={onLaunch} />
                </li>
              ))}
            </ul>
          </section>
        ),
      )}
    </div>
  );
}

function matches(profile: InterviewProfile, query: string): boolean {
  const needle = query.trim().toLocaleLowerCase("fr");
  if (!needle) return true;
  return `${profile.kind} ${profile.role} ${profile.company} ${profile.focus}`
    .toLocaleLowerCase("fr")
    .includes(needle);
}

function SessionCard({
  profile,
  hydrated,
  onLaunch,
}: {
  profile: InterviewProfile;
  hydrated: boolean;
  onLaunch: (profileId: string) => void;
}) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-line bg-surface p-5">
      <p className="text-[11px] uppercase tracking-[0.16em] text-secondary">{profile.kind}</p>
      <h3 className="mt-3 text-lg font-medium tracking-tight text-foreground">{profile.role}</h3>
      <p className="mt-1 text-sm text-muted">{profile.company}</p>
      <p className="mt-4 flex-1 text-sm leading-6 text-foreground">{profile.focus}</p>
      <div className="mt-6 flex items-center justify-between gap-3">
        <span className="text-xs text-muted">{profile.durationMin} min</span>
        <button
          type="button"
          className={button.primary}
          disabled={!hydrated}
          onClick={() => onLaunch(profile.id)}
        >
          Lancer
        </button>
      </div>
    </article>
  );
}
