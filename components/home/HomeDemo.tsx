"use client";

import { useEffect, useState } from "react";
import { HudFrame } from "@/components/hud/HudFrame";
import { button } from "@/lib/ui";
import type { SessionStatus, SpeechPace, Suggestion } from "@/lib/types";

interface Beat {
  pace: SpeechPace;
  paceMessage: string;
  wordsPerMinute: number;
  alert: string | null;
  suggestions: Suggestion[];
}

const beats: readonly Beat[] = [
  {
    pace: "optimal",
    paceMessage: "Rythme optimal",
    wordsPerMinute: 142,
    alert: null,
    suggestions: [
      { id: "demo-1a", text: "Utilisez la méthode STAR" },
      { id: "demo-1b", text: "Un chiffre, puis le contexte" },
    ],
  },
  {
    pace: "too-fast",
    paceMessage: "Parlez un peu plus lentement",
    wordsPerMinute: 184,
    alert: "Évitez « euh »",
    suggestions: [
      { id: "demo-2a", text: "Une phrase, puis une pause" },
      { id: "demo-2b", text: "Nommez le résultat" },
    ],
  },
  {
    pace: "too-slow",
    paceMessage: "Reprenez un peu de rythme",
    wordsPerMinute: 104,
    alert: "Revenez vers la caméra",
    suggestions: [
      { id: "demo-3a", text: "Regardez l'objectif" },
      { id: "demo-3b", text: "Terminez la réponse" },
    ],
  },
];

const idle: Beat = {
  pace: "optimal",
  paceMessage: "En attente du flux",
  wordsPerMinute: 0,
  alert: null,
  suggestions: [],
};

export function HomeDemo() {
  const [status, setStatus] = useState<SessionStatus>("idle");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (status !== "live") return;
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % beats.length);
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [status, index]);

  const beat = status === "idle" ? idle : beats[index] ?? beats[0];

  function start() {
    setIndex(0);
    setStatus("live");
  }

  function togglePause() {
    setStatus((current) => (current === "paused" ? "live" : current === "live" ? "paused" : current));
  }

  function stop() {
    if (status === "idle") return;
    setStatus("ended");
  }

  const running = status === "live" || status === "paused";

  return (
    <div>
      <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-muted">
        Affichage pendant l&apos;appel
      </p>
      <button type="button" className={`${button.primary} mb-3`} onClick={start} disabled={running}>
        {status === "ended" ? "Relancer la simulation" : "Tester la simulation"}
      </button>
      <p className="mb-3 max-w-sm text-sm leading-6 text-muted">
        Le micro et la webcam restent fermés. Ce bouton rejoue un flux simulé : le débit change,
        puis une alerte de tic ou de posture apparaît.
      </p>
      <HudFrame
        status={status === "idle" ? "idle" : status}
        pace={beat.pace}
        paceMessage={beat.paceMessage}
        wordsPerMinute={beat.wordsPerMinute}
        suggestions={beat.suggestions}
        alert={beat.alert}
        interactive={status === "live" || status === "paused"}
        onTogglePause={togglePause}
        onStop={stop}
      />
    </div>
  );
}
