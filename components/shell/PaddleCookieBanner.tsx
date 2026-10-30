"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  readPaddleCookie,
  writePaddleCookie,
  type PaddleCookieChoice,
} from "@/lib/paddleCookie";
import { button, focusRing } from "@/lib/ui";

const OPEN_EVENT = "mockinterview-paddle-cookie";

export function PaddleCookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(readPaddleCookie() === null);
    const show = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, show);
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, []);

  useEffect(() => {
    document.body.style.paddingBottom = open ? "8.5rem" : "";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [open]);

  function choose(choice: PaddleCookieChoice) {
    writePaddleCookie(choice);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-surface/95 px-5 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.16em] text-secondary">Cookie Paddle</p>
          <p className="mt-2 text-sm leading-6 text-foreground">
            Paddle encaisse les offres payantes. En acceptant, un cookie est déposé pour ouvrir le
            checkout et garder la session de paiement. MockInterview ne dépose pas de cookie
            publicitaire.
          </p>
          <Link href="/conditions#cookie-paddle" className={`mt-2 inline-block text-sm text-secondary ${focusRing}`}>
            Lire les conditions
          </Link>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" className={button.quiet} onClick={() => choose("refused")}>
            Refuser
          </button>
          <button type="button" className={button.primary} onClick={() => choose("accepted")}>
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}

export function PaddleCookieButton() {
  return (
    <button
      type="button"
      className={`text-secondary hover:underline ${focusRing}`}
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      Cookie Paddle
    </button>
  );
}
