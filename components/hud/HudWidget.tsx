"use client";

import { useRef, useState, type PointerEvent } from "react";
import { HudFrame } from "@/components/hud/HudFrame";
import { useSessionStore } from "@/store/useSessionStore";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * HUD flottant. On le déplace par la barre du haut.
 * Tant qu'il n'a pas bougé, il reste ancré en bas à gauche.
 */
export function HudWidget() {
  const frameRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const status = useSessionStore((state) => state.status);
  const pace = useSessionStore((state) => state.pace);
  const paceMessage = useSessionStore((state) => state.paceMessage);
  const wordsPerMinute = useSessionStore((state) => state.wordsPerMinute);
  const suggestions = useSessionStore((state) => state.suggestions);
  const filler = useSessionStore((state) => state.filler);
  const cue = useSessionStore((state) => state.nonverbal.cue);
  const togglePause = useSessionStore((state) => state.togglePause);
  const stop = useSessionStore((state) => state.stop);

  const alert = filler ? `Évitez « ${filler} »` : cue;

  function onGripPointerDown(event: PointerEvent<HTMLElement>) {
    if (event.button !== 0) return;
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      left: rect.left,
      top: rect.top,
    };
    setPos({ x: rect.left, y: rect.top });
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onGripPointerMove(event: PointerEvent<HTMLElement>) {
    const origin = drag.current;
    const frame = frameRef.current;
    if (!origin || !frame) return;
    const maxX = Math.max(8, window.innerWidth - frame.offsetWidth - 8);
    const maxY = Math.max(8, window.innerHeight - frame.offsetHeight - 8);
    setPos({
      x: clamp(origin.left + event.clientX - origin.x, 8, maxX),
      y: clamp(origin.top + event.clientY - origin.y, 8, maxY),
    });
  }

  function onGripPointerUp(event: PointerEvent<HTMLElement>) {
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <div
      ref={frameRef}
      className={pos ? "fixed z-50" : "fixed bottom-4 left-4 z-50"}
      style={pos ? { left: pos.x, top: pos.y } : undefined}
    >
      <HudFrame
        interactive
        status={status}
        pace={pace}
        paceMessage={paceMessage}
        wordsPerMinute={wordsPerMinute}
        suggestions={suggestions}
        alert={alert}
        onGripPointerDown={onGripPointerDown}
        onGripPointerMove={onGripPointerMove}
        onGripPointerUp={onGripPointerUp}
        onTogglePause={togglePause}
        onStop={stop}
      />
    </div>
  );
}
