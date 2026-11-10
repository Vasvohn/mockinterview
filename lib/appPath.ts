/** Préfixe public, renseigné seulement pour le build GitHub Pages. */
export function publicBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH ?? "";
}

/** Page d'offres après le checkout, avec ou sans le slash final de Pages. */
export function offersReturnUrl(): string {
  const base = publicBasePath();
  const path = base ? `${base}/offres/` : "/offres";
  return `${window.location.origin}${path}?paiement=retour`;
}
