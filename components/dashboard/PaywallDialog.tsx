"use client";

import { useEffect } from "react";
import Link from "next/link";
import { button, focusRing } from "@/lib/ui";

interface PaywallDialogProps {
  open: boolean;
  onClose: () => void;
}

export function PaywallDialog({ open, onClose }: PaywallDialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4" role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="paywall-title"
        className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-2xl"
      >
        <h2 id="paywall-title" className="text-lg font-medium tracking-tight text-white">
          Les 3 sessions découverte sont utilisées
        </h2>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Le quota du mois est atteint sur cet appareil. Les offres Job Seeker et Sales &amp;
          Executive lèvent cette limite. Aucun paiement n&apos;est réalisé dans cette démo.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/offres" className={button.primary} onClick={onClose}>
            Voir les offres
          </Link>
          <button type="button" className={`${button.quiet} ${focusRing}`} onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
