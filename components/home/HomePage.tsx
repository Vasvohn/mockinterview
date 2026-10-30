import Link from "next/link";
import { HudFrame } from "@/components/hud/HudFrame";
import { button } from "@/lib/ui";

const signals = [
  {
    kicker: "Voix",
    title: "Débit, silences, tics",
    body: "Le rythme se lit en direct. « euh » et « du coup » n'apparaissent que lorsqu'ils reviennent, puis le HUD se tait.",
  },
  {
    kicker: "Contenu",
    title: "La question, puis la structure",
    body: "La phrase de l'interlocuteur est suivie. Deux ou trois puces proposent une forme de réponse, souvent la méthode STAR.",
  },
  {
    kicker: "Corps",
    title: "Un seul geste à la fois",
    body: "Posture, regard caméra, sourire. Une consigne courte, uniquement quand elle change quelque chose.",
  },
] as const;

export function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-16 sm:pt-20">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
        Entretiens · Levées · Négociations
      </p>
      <div className="mt-6 grid items-start gap-14 lg:grid-cols-[minmax(0,1.15fr)_22rem]">
        <div>
          <h1 className="max-w-xl text-4xl font-medium tracking-tight text-foreground sm:text-5xl sm:leading-[1.05]">
            Le copilote reste dans un coin de l&apos;écran.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted">
            En visio, le poste, la levée ou le contrat se joue sur le rythme, la structure de la
            réponse et quelques gestes. MockInterview les suit pendant l&apos;appel et n&apos;affiche
            que l&apos;essentiel.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dashboard" className={button.primary}>
              Ouvrir les sessions
            </Link>
            <Link href="/offres" className={button.quiet}>
              Voir les offres
            </Link>
          </div>
        </div>
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-muted">
            Affichage pendant l&apos;appel
          </p>
          <HudFrame
            status="live"
            pace="too-fast"
            paceMessage="Parlez un peu plus lentement"
            wordsPerMinute={184}
            suggestions={[
              { id: "preview-a", text: "Utilisez la méthode STAR" },
              { id: "preview-b", text: "Mentionnez votre expérience chez un produit proche" },
              { id: "preview-c", text: "Un chiffre, puis le contexte" },
            ]}
            alert="Revenez vers la caméra"
          />
        </div>
      </div>

      <ol className="mt-16 divide-y divide-line border-y border-line">
        {signals.map((signal) => (
          <li key={signal.kicker} className="grid gap-2 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <h2 className="text-[11px] uppercase tracking-[0.16em] text-muted">
              {signal.kicker}
            </h2>
            <div>
              <p className="text-base font-medium text-foreground">{signal.title}</p>
              <p className="mt-1 max-w-xl text-sm leading-6 text-muted">{signal.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-14 grid gap-8 border-t border-line pt-10 sm:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="text-base font-medium text-foreground">Vous autorisez chaque session</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            Cette version n&apos;ouvre ni le micro ni la webcam. Le flux est simulé, l&apos;échange
            n&apos;est pas enregistré, et le copilote ne démarre qu&apos;après un accord explicite.
            Les analyses futures resteront limitées aux réunions que vous lancez vous-même.
          </p>
        </div>
        <div>
          <h2 className="text-base font-medium text-foreground">Offres</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Découverte 0 € · Semaine 19 € · Job Seeker 39 € · Sales &amp; Executive 149 €.
            Les offres payantes sont encaissées par Paddle.
          </p>
          <Link href="/offres" className={`${button.quiet} mt-4`}>
            Détail des offres
          </Link>
        </div>
      </section>
    </div>
  );
}
