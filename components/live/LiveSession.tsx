"use client";

import Link from "next/link";
import { CallStage } from "@/components/live/CallStage";
import { ConsentGate } from "@/components/live/ConsentGate";
import { HudWidget } from "@/components/hud/HudWidget";
import { useMockLiveAI } from "@/hooks/useMockLiveAI";
import { button } from "@/lib/ui";
import { useSessionStore } from "@/store/useSessionStore";

export function LiveSession() {
  useMockLiveAI();
  const profileId = useSessionStore((state) => state.profileId);
  const status = useSessionStore((state) => state.status);
  const consentGranted = useSessionStore((state) => state.consentGranted);

  if (!profileId) {
    return (
      <main id="contenu" className="grid min-h-screen place-items-center px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-medium tracking-tight text-white">Aucune session armée</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Choisissez un contexte dans le tableau de bord. Le copilote attend votre accord avant
            de s&apos;afficher.
          </p>
          <Link href="/dashboard" className={`${button.primary} mt-6`}>
            Voir les sessions
          </Link>
        </div>
      </main>
    );
  }

  if (status === "idle" && !consentGranted) {
    return <ConsentGate />;
  }

  return (
    <>
      <CallStage />
      <HudWidget />
    </>
  );
}
