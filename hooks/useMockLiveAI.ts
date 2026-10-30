"use client";

import { useEffect, useRef } from "react";
import { getBeats } from "@/lib/mockScript";
import { useSessionStore } from "@/store/useSessionStore";

/**
 * Simule un flux d'entretien.
 * La première question arrive tout de suite, les suivantes toutes les 5 à 10 secondes.
 * Le hook s'arrête en pause et reprend le scénario là où il en était.
 * Un futur adaptateur audio pourra appeler `applyTick` à la place de ce scénario.
 */
export function useMockLiveAI() {
  const status = useSessionStore((state) => state.status);
  const profileId = useSessionStore((state) => state.profileId);
  const applyTick = useSessionStore((state) => state.applyTick);
  const indexRef = useRef(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (status !== "live" || !profileId) {
      if (status === "idle" || status === "ended") {
        indexRef.current = 0;
        startedRef.current = false;
      }
      return;
    }

    const beats = getBeats(profileId);
    let timer = 0;
    let cancelled = false;

    const publish = () => {
      const beat = beats[indexRef.current % beats.length];
      if (!beat) return;
      const cycle = Math.floor(indexRef.current / beats.length);
      applyTick({
        ...beat,
        suggestions: beat.suggestions.map((item) => ({
          ...item,
          id: `${cycle}-${item.id}`,
        })),
      });
      indexRef.current += 1;
    };

    const schedule = () => {
      const delay = 5000 + Math.floor(Math.random() * 5001);
      timer = window.setTimeout(() => {
        if (cancelled) return;
        publish();
        schedule();
      }, delay);
    };

    if (!startedRef.current) {
      startedRef.current = true;
      publish();
    }
    schedule();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [status, profileId, applyTick]);
}
