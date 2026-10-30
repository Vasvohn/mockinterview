import { GripHorizontal, Pause, Play, Square } from "lucide-react";
import type { PointerEvent } from "react";
import { button } from "@/lib/ui";
import type { SessionStatus, SpeechPace, Suggestion } from "@/lib/types";

const paceTone: Record<SpeechPace, string> = {
  "too-fast": "bg-rose-600",
  optimal: "bg-cta",
  "too-slow": "bg-amber-500",
};

const paceText: Record<SpeechPace, string> = {
  "too-fast": "text-rose-700",
  optimal: "text-cta",
  "too-slow": "text-amber-700",
};

const statusLabel: Record<SessionStatus, string> = {
  idle: "Prêt",
  live: "Direct",
  paused: "Pause",
  ended: "Arrêté",
};

interface HudFrameProps {
  status: SessionStatus;
  pace: SpeechPace;
  paceMessage: string;
  wordsPerMinute: number;
  suggestions: Suggestion[];
  alert: string | null;
  interactive?: boolean;
  onGripPointerDown?: (event: PointerEvent<HTMLElement>) => void;
  onGripPointerMove?: (event: PointerEvent<HTMLElement>) => void;
  onGripPointerUp?: (event: PointerEvent<HTMLElement>) => void;
  onTogglePause?: () => void;
  onStop?: () => void;
}

function pacePercent(wordsPerMinute: number): number {
  const min = 80;
  const max = 200;
  return Math.min(100, Math.max(0, ((wordsPerMinute - min) / (max - min)) * 100));
}

/**
 * Cadre visuel du HUD. Il reste léger : rythme, deux ou trois puces, une alerte au plus.
 */
export function HudFrame({
  status,
  pace,
  paceMessage,
  wordsPerMinute,
  suggestions,
  alert,
  interactive = false,
  onGripPointerDown,
  onGripPointerMove,
  onGripPointerUp,
  onTogglePause,
  onStop,
}: HudFrameProps) {
  const marker = pacePercent(wordsPerMinute);
  const paused = status === "paused";
  const ended = status === "ended";

  return (
    <section
      aria-label="Copilote MockInterview"
      className="w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-line bg-surface/95 p-3.5 text-foreground shadow-[0_18px_50px_-28px_rgba(44,51,58,0.45)] backdrop-blur-xl"
    >
      <header
        className={`flex items-center justify-between gap-3 ${
          interactive ? "cursor-grab touch-none select-none active:cursor-grabbing" : ""
        }`}
        onPointerDown={onGripPointerDown}
        onPointerMove={onGripPointerMove}
        onPointerUp={onGripPointerUp}
      >
        <p className="flex items-center gap-2 text-xs text-foreground">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              status === "live"
                ? "animate-pulse bg-cta"
                : status === "paused"
                  ? "bg-amber-500"
                  : "bg-muted"
            }`}
            aria-hidden
          />
          {statusLabel[status]}
        </p>
        {interactive ? (
          <GripHorizontal className="h-4 w-4 text-muted" aria-hidden />
        ) : null}
      </header>

      <div className="mt-3" aria-live="polite">
        <p className="text-[10px] uppercase tracking-[0.16em] text-muted">Rythme</p>
        <div className="relative mt-2 h-1.5 rounded-full bg-stage">
          <span
            aria-hidden
            className="absolute inset-y-0 left-[38%] w-[28%] rounded-full bg-cta/25"
          />
          <span
            aria-hidden
            className={`absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full ${paceTone[pace]}`}
            style={{ left: `calc(${marker}% - 5px)` }}
          />
        </div>
        <p className={`mt-2 text-[13px] ${paceText[pace]}`}>
          {paceMessage}
          {wordsPerMinute > 0 ? (
            <span className="text-muted"> · {wordsPerMinute} mots/min</span>
          ) : null}
        </p>
      </div>

      <div className="mt-3.5">
        <p className="text-[10px] uppercase tracking-[0.16em] text-muted">Repères</p>
        {suggestions.length === 0 ? (
          <p className="mt-2 text-[13px] text-muted">Les repères arrivent avec la question.</p>
        ) : (
          <ul
            key={suggestions.map((item) => item.id).join("|")}
            className="pf-rise mt-2 space-y-1.5"
          >
            {suggestions.slice(0, 3).map((item) => (
              <li
                key={item.id}
                className="rounded-lg border border-secondary/25 bg-secondary/10 px-2.5 py-1.5 text-[13px] leading-5 text-foreground"
              >
                {item.text}
              </li>
            ))}
          </ul>
        )}
      </div>

      {alert ? <p className="mt-3 text-[12px] leading-5 text-amber-800">{alert}</p> : null}

      {interactive ? (
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className={button.quiet}
            onClick={onTogglePause}
            disabled={ended}
            aria-pressed={paused}
          >
            {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            {paused ? "Reprendre" : "Pause"}
          </button>
          <button type="button" className={button.quiet} onClick={onStop} disabled={ended}>
            <Square className="h-3.5 w-3.5" />
            Stop
          </button>
        </div>
      ) : (
        <div className="mt-4 flex gap-2" aria-hidden>
          <span className={button.quiet}>
            <Pause className="h-3.5 w-3.5" />
            Pause
          </span>
          <span className={button.quiet}>
            <Square className="h-3.5 w-3.5" />
            Stop
          </span>
        </div>
      )}
    </section>
  );
}
