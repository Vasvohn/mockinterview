import type { Metadata } from "next";
import { MarketingShell } from "@/components/shell/MarketingShell";

export const metadata: Metadata = {
  title: "Conditions",
};

export default function ConditionsPage() {
  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-5 py-12">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Conditions</p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight text-foreground">
          Conditions générales
        </h1>
        <div className="mt-8 space-y-8 text-sm leading-6 text-foreground">
          <section>
            <h2 className="text-base font-medium">Le service</h2>
            <p className="mt-2 text-muted">
              MockInterview affiche un copilote pendant une préparation d&apos;entretien, de levée de
              fonds ou de négociation. Cette version simule le flux : le micro et la webcam ne sont
              pas ouverts, aucune donnée biométrique n&apos;est calculée, et la transcription reste en
              mémoire le temps de la session.
            </p>
          </section>
          <section>
            <h2 className="text-base font-medium">Offres et paiement</h2>
            <p className="mt-2 text-muted">
              La découverte est gratuite, dans la limite de trois sessions par mois sur cet appareil.
              Les offres Semaine, Job Seeker et Sales &amp; Executive sont vendues par Paddle, qui
              encaisse le paiement. Le plan s&apos;active ici lorsque Paddle confirme la transaction.
              Les prix affichés sont ceux présentés au checkout.
            </p>
          </section>
          <section>
            <h2 className="text-base font-medium">Rétractation et remboursement</h2>
            <p className="mt-2 text-muted">
              L&apos;achat est conclu avec Paddle. Le droit de rétractation, l&apos;annulation et le
              remboursement suivent les conditions d&apos;achat Paddle, y compris le délai de 14 jours
              lorsqu&apos;il s&apos;applique. La demande se fait depuis le reçu envoyé par Paddle.
            </p>
          </section>
          <section id="cookie-paddle">
            <h2 className="text-base font-medium">Cookie Paddle</h2>
            <p className="mt-2 text-muted">
              Un cookie nommé mockinterview_paddle enregistre votre choix : accepté ou refusé, pendant
              six mois, sur cet appareil. S&apos;il est accepté, Paddle peut déposer les cookies
              nécessaires au checkout et à la session de paiement. S&apos;il est refusé, le paiement ne
              s&apos;ouvre pas. Aucun cookie publicitaire n&apos;est déposé par MockInterview. Le plan et
              le quota mensuel restent dans le stockage local du navigateur, pas dans ce cookie.
            </p>
          </section>
          <section>
            <h2 className="text-base font-medium">Données</h2>
            <p className="mt-2 text-muted">
              MockInterview ne crée pas de compte. Paddle traite les informations de paiement en tant
              que vendeur. Le détail figure dans la politique de confidentialité de Paddle.
            </p>
          </section>
        </div>
      </article>
    </MarketingShell>
  );
}
