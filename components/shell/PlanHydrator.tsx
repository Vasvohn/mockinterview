"use client";

import { useEffect } from "react";
import { useSessionStore } from "@/store/useSessionStore";

/** Charge le plan local après l'hydratation, pour garder le rendu serveur stable. */
export function PlanHydrator() {
  const hydrate = useSessionStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return null;
}
