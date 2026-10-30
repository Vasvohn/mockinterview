"use client";

import { useEffect, useRef } from "react";
import { formatSeconds } from "@/lib/format";
import { useSessionStore } from "@/store/useSessionStore";

const postureLabel = {
  open: "Ouverte",
  closed: "Fermée",
  neutral: "Neutre",
} as const;

const gazeLabel = {
  camera: "Caméra",
  away: "Ailleurs",
} as const;

const smileLabel = {
  natural: "Présent",
  absent: "Absent",
} as const;

function tally(words: string[]): { word: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const word of words) counts.set(word, (counts.get(word) ?? 0) + 1);
  return [...counts.entries()].map(([word, count]) => ({ word, count }));
}

export function SessionJournal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const endRef = useRef<HTMLDivElement>(null);
  const transcript = useSessionStore((state) => state.transcript);
  const currentQuestion = useSessionStore((state) => state.currentQuestion);
  const paceMessage = useSessionStore((state) => state.paceMessage);
  const wordsPerMinute = useSessionStore((state) => state.wordsPerMinute);
  const silenceSeconds = useSessionStore((state) => state.silenceSeconds);
  const stressLevel = useSessionStore((state) => state.stressLevel);
  const fillers = useSessionStore((state) => state.fillers);
  const nonverbal = useSessionStore((state) => state.nonverbal);

  useEffect(() => {
    if (!open) return;
    endRef.current?.scrollIntoView({ block: "end" });
  }, [open, transcript]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const fillerRows = tally(fillers);

  return (
    <aside
      className="fixed inset-y-0 right-0 z-40 flex w-full max-w-sm flex-col border-l border-white/10 bg-zinc-950/95 backdrop-blur-xl"
      aria-label="Journal de session"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <h2 className="text-sm font-medium text-white">Journal</h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md px-2 py-1 text-sm text-zinc-400 hover:text-white"
        >
          Fermer
        </button>
      </div>
      <div className="flex-1 space-y-6 overflow-y-auto px-4 py-4">
        <section>
          <h3 className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Question</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-200">
            {currentQuestion ?? "En attente de la première question."}
          </p>
        </section>

        <section>
          <h3 className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Voix</h3>
          <dl className="mt-2 space-y-1 text-sm text-zinc-300">
            <div className="flex justify-between gap-4">
              <dt>Rythme</dt>
              <dd>{paceMessage}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Débit</dt>
              <dd>{wordsPerMinute > 0 ? `${wordsPerMinute} mots/min` : "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Silence</dt>
              <dd>{formatSeconds(silenceSeconds)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Tension</dt>
              <dd>{stressLevel}/100</dd>
            </div>
          </dl>
          <div className="mt-2 h-1 rounded-full bg-white/10">
            <div className="h-1 rounded-full bg-white/70" style={{ width: `${stressLevel}%` }} />
          </div>
          <p className="mt-3 text-sm text-zinc-400">
            {fillerRows.length === 0
              ? "Aucun tic relevé."
              : fillerRows.map((row) => `« ${row.word} » × ${row.count}`).join(" · ")}
          </p>
        </section>

        <section>
          <h3 className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Non-verbal</h3>
          <dl className="mt-2 space-y-1 text-sm text-zinc-300">
            <div className="flex justify-between gap-4">
              <dt>Posture</dt>
              <dd>{postureLabel[nonverbal.posture]}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Regard</dt>
              <dd>{gazeLabel[nonverbal.gaze]}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Sourire</dt>
              <dd>{smileLabel[nonverbal.smile]}</dd>
            </div>
          </dl>
        </section>

        <section>
          <h3 className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Transcription</h3>
          <ol className="mt-2 space-y-3">
            {transcript.length === 0 ? (
              <li className="text-sm text-zinc-500">Le flux simulé n&apos;a pas encore parlé.</li>
            ) : (
              transcript.map((entry) => (
                <li key={entry.id}>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                    {entry.speaker === "recruiter" ? "Interlocuteur" : "Vous"}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-zinc-200">{entry.text}</p>
                </li>
              ))
            )}
          </ol>
          <div ref={endRef} />
        </section>

        <p className="text-xs leading-5 text-zinc-500">
          Signaux simulés pour la démonstration. Aucune donnée biométrique réelle n&apos;est
          calculée, et cette transcription n&apos;est pas conservée.
        </p>
      </div>
    </aside>
  );
}
