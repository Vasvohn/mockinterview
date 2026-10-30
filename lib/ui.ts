export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta";

export const button = {
  primary: `inline-flex h-9 items-center justify-center gap-2 rounded-md bg-cta px-3 text-sm font-medium text-white transition-colors hover:bg-cta-hover disabled:cursor-not-allowed disabled:opacity-40 ${focusRing}`,
  quiet: `inline-flex h-9 items-center justify-center gap-2 rounded-md bg-secondary px-3 text-sm font-medium text-white transition-colors hover:bg-secondary-hover disabled:cursor-not-allowed disabled:opacity-40 ${focusRing}`,
} as const;
