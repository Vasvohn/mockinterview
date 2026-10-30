"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SessionJournal } from "@/components/live/SessionJournal";
import { Wordmark } from "@/components/shell/Wordmark";
import { useElapsed } from "@/hooks/useElapsed";
import { getProfile, initials } from "@/lib/profiles";
import { button, focusRing } from "@/lib/ui";
import { useSessionStore } from "@/store/useSessionStore";

export function CallStage() {
  const router = useRouter();
  const [journalOpen, setJournalOpen] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const status = useSessionStore((state) => state.status);
  const profileId = useSessionStore((state) => state.profileId);
  const accumulatedMs = useSessionStore((state) => state.accumulatedMs);
  const runningSince = useSessionStore((state) => state.runningSince);
  const pause = useSessionStore((state) => state.pause);
  const relaunch = useSessionStore((state) => state.relaunch);
  const clock = useElapsed(accumulatedMs, runningSince);
  const profile = getProfile(profileId);

  function leave() {
    if (useSessionStore.getState().status === "live") pause();
    router.push("/dashboard");
  }

  function restart() {
    const ok = relaunch();
    setBlocked(!ok);
    if (ok) setJournalOpen(false);
  }

  return (
    <div className="relative min-h-screen">
      <header className="flex h-14 items-center justify-between gap-3 border-b border-line bg-background/90 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={leave}
            aria-label="Retour aux sessions"
            className={`inline-flex items-center gap-1.5 rounded-md text-sm text-muted hover:text-foreground ${focusRing}`}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Sessions</span>
          </button>
          <span className="hidden h-4 w-px bg-line sm:block" aria-hidden />
          <Wordmark />
        </div>
        <div className="flex items-center gap-3 text-sm">
          <p className="hidden truncate text-muted sm:block">
            {profile ? `${profile.kind} · ${profile.role}` : "Session"}
          </p>
          <p className="tabular-nums text-foreground">{clock}</p>
          <button
            type="button"
            className={button.quiet}
            aria-expanded={journalOpen}
            onClick={() => setJournalOpen((open) => !open)}
          >
            Journal
          </button>
        </div>
      </header>

      <main id="contenu" className="relative grid min-h-[calc(100vh-3.5rem)] place-items-center px-4 py-10">
        <p className="absolute left-4 top-4 text-[11px] uppercase tracking-[0.16em] text-muted sm:left-6">
          Démonstration · flux simulé
        </p>
        <div className="aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border border-line bg-stage">
          <div className="flex h-full flex-col items-center justify-center gap-5 px-6">
            <div className="grid h-20 w-20 place-items-center rounded-full border border-line bg-surface text-sm tracking-wide text-foreground">
              {initials(profile?.company ?? "MockInterview")}
            </div>
            <div className="flex h-8 items-end gap-1" aria-hidden>
              {[0, 1, 2, 3, 4].map((index) => (
                <span
                  key={index}
                  className={`w-1 rounded-full bg-secondary ${status === "live" ? "pf-bar h-6" : "h-1"}`}
                  style={status === "live" ? { animationDelay: `${index * 120}ms` } : undefined}
                />
              ))}
            </div>
            <div className="text-center">
              <p className="text-sm text-foreground">Interlocuteur</p>
              <p className="mt-1 text-xs text-muted">
                {profile ? `${profile.company} · ${profile.durationMin} min` : "Visio"}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute right-4 top-14 w-28 overflow-hidden rounded-xl border border-line bg-surface p-3 sm:right-6 sm:top-16">
          <p className="text-[11px] uppercase tracking-[0.14em] text-secondary">Vous</p>
          <p className="mt-2 text-xs text-muted">Aperçu local</p>
        </div>

        {status === "ended" ? (
          <div className="absolute inset-x-0 top-24 grid place-items-center px-4 sm:top-28">
            <div className="w-full max-w-md rounded-2xl border border-line bg-surface/95 p-5 shadow-xl backdrop-blur-xl">
              <h2 className="text-lg font-medium tracking-tight text-foreground">Session arrêtée</h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                Aucun audio et aucune vidéo n&apos;ont été conservés. Les derniers repères restent
                dans le HUD jusqu&apos;à ce que vous quittiez la page.
              </p>
              {blocked ? (
                <p className="mt-3 text-sm text-amber-800">
                  Le quota du mois est atteint.{" "}
                  <Link href="/offres" className="text-secondary underline">
                    Voir les offres
                  </Link>
                </p>
              ) : null}
              <div className="mt-5 flex flex-wrap gap-2">
                <button type="button" className={button.primary} onClick={restart}>
                  Relancer
                </button>
                <button type="button" className={button.quiet} onClick={leave}>
                  Retour aux sessions
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </main>

      <SessionJournal open={journalOpen} onClose={() => setJournalOpen(false)} />
    </div>
  );
}
