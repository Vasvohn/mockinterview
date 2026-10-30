"use client";

import { useState } from "react";
import Link from "next/link";
import { getProfile } from "@/lib/profiles";
import { button } from "@/lib/ui";
import { useSessionStore } from "@/store/useSessionStore";

export function ConsentGate() {
  const [accepted, setAccepted] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const profileId = useSessionStore((state) => state.profileId);
  const hydrated = useSessionStore((state) => state.hydrated);
  const confirmConsent = useSessionStore((state) => state.confirmConsent);
  const profile = getProfile(profileId);

  function start() {
    const ok = confirmConsent();
    if (!ok) setBlocked(true);
  }

  return (
    <main id="contenu" className="grid min-h-screen place-items-center px-5 py-16">
      <div className="w-full max-w-lg">
        <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          {profile ? `${profile.kind} · ${profile.company}` : "Session"}
        </p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight text-white">
          Autoriser cette session
        </h1>
        <ul className="mt-6 space-y-3 text-sm leading-6 text-zinc-300">
          <li>Le copilote ne démarre que si vous l&apos;autorisez.</li>
          <li>Cette version simule le flux : le micro et la webcam restent fermés.</li>
          <li>Rien n&apos;est envoyé ni enregistré. Le compteur de sessions reste sur cet appareil.</li>
        </ul>

        <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-zinc-200">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-white"
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
          />
          <span>Je lance cette session pour moi, sur un échange que j&apos;ai le droit de préparer.</span>
        </label>

        {blocked ? (
          <p className="mt-4 text-sm text-amber-200">
            Le quota du mois est atteint.{" "}
            <Link href="/offres" className="underline">
              Voir les offres
            </Link>
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            className={button.primary}
            disabled={!accepted || !hydrated}
            onClick={start}
          >
            Démarrer le copilote
          </button>
          <Link href="/dashboard" className={button.quiet}>
            Retour
          </Link>
        </div>
      </div>
    </main>
  );
}
