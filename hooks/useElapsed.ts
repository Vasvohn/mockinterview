"use client";

import { useEffect, useState } from "react";
import { formatClock } from "@/lib/format";

/** Chronomètre de session. Il se fige quand `runningSince` est nul. */
export function useElapsed(accumulatedMs: number, runningSince: number | null): string {
  const [now, setNow] = useState(0);

  useEffect(() => {
    if (runningSince == null) return;
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [runningSince]);

  const extra = runningSince != null && now > 0 ? Math.max(0, now - runningSince) : 0;
  return formatClock(accumulatedMs + extra);
}
