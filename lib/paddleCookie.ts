/** Choix du visiteur pour le cookie de paiement Paddle. */
export const PADDLE_COOKIE = "mockinterview_paddle";

export type PaddleCookieChoice = "accepted" | "refused";

const MAX_AGE = 60 * 60 * 24 * 180;

export function readPaddleCookie(): PaddleCookieChoice | null {
  if (typeof document === "undefined") return null;
  const row = document.cookie.split("; ").find((part) => part.startsWith(`${PADDLE_COOKIE}=`));
  if (!row) return null;
  const value = decodeURIComponent(row.slice(PADDLE_COOKIE.length + 1));
  return value === "accepted" || value === "refused" ? value : null;
}

export function writePaddleCookie(choice: PaddleCookieChoice) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${PADDLE_COOKIE}=${choice}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax${secure}`;
}
