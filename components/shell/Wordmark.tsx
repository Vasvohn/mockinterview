export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`flex items-center gap-2 text-sm font-medium tracking-tight text-foreground ${className}`}
    >
      <span
        aria-hidden
        className="grid h-7 w-7 place-items-center rounded-md bg-cta text-white"
      >
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden>
          <circle cx="8" cy="6.4" r="2.35" fill="currentColor" />
          <path
            fill="currentColor"
            d="M4.6 18.4c.35-3.15 1.7-5 3.4-5s3.05 1.85 3.4 5H4.6Z"
          />
          <path
            d="M10.6 12.2c1.15-.55 2.15-1.7 2.7-2.9"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <rect x="14.15" y="4.15" width="4" height="6.5" rx="2" fill="currentColor" />
          <path
            d="M16.15 10.65v2.15"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      MockInterview
    </span>
  );
}
