export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export const button = {
  primary: `inline-flex h-9 items-center justify-center gap-2 rounded-md bg-white px-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40 ${focusRing}`,
  quiet: `inline-flex h-9 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 text-sm text-zinc-100 transition-colors hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40 ${focusRing}`,
} as const;
