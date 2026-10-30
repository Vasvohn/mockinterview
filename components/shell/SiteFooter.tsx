import Link from "next/link";
import { PaddleCookieButton } from "@/components/shell/PaddleCookieBanner";
import { focusRing } from "@/lib/ui";

const linkClass = `text-secondary hover:underline ${focusRing}`;

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-5xl px-5 py-8">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Conditions</p>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
          MockInterview prépare un entretien, une levée ou une négociation. Le flux est simulé : le
          micro et la webcam restent fermés, et l&apos;échange n&apos;est pas enregistré. Les offres
          payantes sont vendues par Paddle. Le cookie Paddle ne sert qu&apos;au paiement, et seulement
          si vous l&apos;acceptez.
        </p>
        <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm" aria-label="Conditions">
          <Link href="/conditions" className={linkClass}>
            Conditions générales
          </Link>
          <a
            href="https://www.paddle.com/legal/checkout-buyer-terms"
            className={linkClass}
            target="_blank"
            rel="noreferrer"
          >
            Conditions d&apos;achat Paddle
          </a>
          <a
            href="https://www.paddle.com/legal/privacy"
            className={linkClass}
            target="_blank"
            rel="noreferrer"
          >
            Confidentialité Paddle
          </a>
          <PaddleCookieButton />
        </nav>
      </div>
    </footer>
  );
}
