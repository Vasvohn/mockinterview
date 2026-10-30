import { currentMonthKey } from "@/lib/format";
import { canStart, isPlanId, type PlanId } from "@/lib/plans";
import type {
  LiveTick,
  NonverbalState,
  SessionStatus,
  SpeechPace,
  Suggestion,
  TranscriptEntry,
} from "@/lib/types";
import { create } from "zustand";

const STORAGE_KEY = "mockinterview.plan";

interface PersistedPlan {
  planId: PlanId;
  sessionsUsed: number;
  monthKey: string;
}

export type PrepareResult = "loading" | "blocked" | "ready";

interface SignalState {
  transcript: TranscriptEntry[];
  suggestions: Suggestion[];
  currentQuestion: string | null;
  pace: SpeechPace;
  paceMessage: string;
  wordsPerMinute: number;
  stressLevel: number;
  filler: string | null;
  silenceSeconds: number;
  fillers: string[];
  nonverbal: NonverbalState;
}

interface SessionState extends SignalState {
  status: SessionStatus;
  profileId: string | null;
  consentGranted: boolean;
  planId: PlanId;
  sessionsUsed: number;
  monthKey: string;
  hydrated: boolean;
  startedAt: number | null;
  accumulatedMs: number;
  runningSince: number | null;
  hydrate: () => void;
  selectPlan: (planId: PlanId) => void;
  prepareSession: (profileId: string) => PrepareResult;
  confirmConsent: () => boolean;
  togglePause: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  relaunch: () => boolean;
  applyTick: (tick: LiveTick) => void;
}

/**
 * Repart d'un état de signaux neuf.
 * Les tableaux ne sont pas partagés entre les sessions.
 */
function freshSignals(): SignalState {
  return {
    transcript: [],
    suggestions: [],
    currentQuestion: null,
    pace: "optimal",
    paceMessage: "En attente du flux",
    wordsPerMinute: 0,
    stressLevel: 0,
    filler: null,
    silenceSeconds: 0,
    fillers: [],
    nonverbal: {
      posture: "neutral",
      gaze: "camera",
      smile: "absent",
      cue: null,
    },
  };
}

function readPlan(): PersistedPlan {
  const monthKey = currentMonthKey();
  const fallback: PersistedPlan = { planId: "free", sessionsUsed: 0, monthKey };
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return fallback;
    const record = parsed as Partial<PersistedPlan>;
    const planId = isPlanId(record.planId) ? record.planId : "free";
    const storedMonth = typeof record.monthKey === "string" ? record.monthKey : monthKey;
    const sessionsUsed =
      storedMonth === monthKey &&
      typeof record.sessionsUsed === "number" &&
      Number.isFinite(record.sessionsUsed)
        ? Math.max(0, Math.floor(record.sessionsUsed))
        : 0;
    return { planId, sessionsUsed, monthKey };
  } catch {
    return fallback;
  }
}

function persistBilling(planId: PlanId, sessionsUsed: number, monthKey: string) {
  const payload: PersistedPlan = { planId, sessionsUsed, monthKey };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function usedThisMonth(sessionsUsed: number, monthKey: string): number {
  return monthKey === currentMonthKey() ? sessionsUsed : 0;
}

/**
 * État global du copilote.
 * Transcription, suggestions, rythme et tension restent en mémoire.
 * Le plan et le quota mensuel sont les seules données locales.
 */
export const useSessionStore = create<SessionState>((set, get) => ({
  ...freshSignals(),
  status: "idle",
  profileId: null,
  consentGranted: false,
  planId: "free",
  sessionsUsed: 0,
  monthKey: "0000-00",
  hydrated: false,
  startedAt: null,
  accumulatedMs: 0,
  runningSince: null,

  hydrate: () => {
    if (get().hydrated) return;
    const stored = readPlan();
    set({
      planId: stored.planId,
      sessionsUsed: stored.sessionsUsed,
      monthKey: stored.monthKey,
      hydrated: true,
    });
  },

  selectPlan: (planId) => {
    const state = get();
    if (!state.hydrated) return;
    const monthKey = currentMonthKey();
    const sessionsUsed = usedThisMonth(state.sessionsUsed, state.monthKey);
    set({ planId, sessionsUsed, monthKey });
    persistBilling(planId, sessionsUsed, monthKey);
  },

  prepareSession: (profileId) => {
    const state = get();
    if (!state.hydrated) return "loading";
    const monthKey = currentMonthKey();
    const sessionsUsed = usedThisMonth(state.sessionsUsed, state.monthKey);
    if (!canStart(state.planId, sessionsUsed)) {
      set({ sessionsUsed, monthKey });
      persistBilling(state.planId, sessionsUsed, monthKey);
      return "blocked";
    }
    set({
      ...freshSignals(),
      profileId,
      status: "idle",
      consentGranted: false,
      sessionsUsed,
      monthKey,
      startedAt: null,
      accumulatedMs: 0,
      runningSince: null,
    });
    return "ready";
  },

  confirmConsent: () => {
    const state = get();
    if (!state.hydrated || !state.profileId) return false;
    const monthKey = currentMonthKey();
    const usedBase = usedThisMonth(state.sessionsUsed, state.monthKey);
    if (!canStart(state.planId, usedBase)) return false;
    const sessionsUsed = usedBase + 1;
    const now = Date.now();
    set({
      consentGranted: true,
      status: "live",
      sessionsUsed,
      monthKey,
      startedAt: now,
      accumulatedMs: 0,
      runningSince: now,
    });
    persistBilling(state.planId, sessionsUsed, monthKey);
    return true;
  },

  pause: () => {
    const { status, runningSince, accumulatedMs } = get();
    if (status !== "live" || runningSince == null) return;
    set({
      status: "paused",
      accumulatedMs: accumulatedMs + (Date.now() - runningSince),
      runningSince: null,
    });
  },

  resume: () => {
    if (get().status !== "paused") return;
    set({ status: "live", runningSince: Date.now() });
  },

  togglePause: () => {
    const status = get().status;
    if (status === "live") get().pause();
    else if (status === "paused") get().resume();
  },

  stop: () => {
    const { status, runningSince, accumulatedMs } = get();
    if (status !== "live" && status !== "paused") return;
    const extra = runningSince != null ? Date.now() - runningSince : 0;
    set({
      status: "ended",
      accumulatedMs: accumulatedMs + extra,
      runningSince: null,
    });
  },

  relaunch: () => {
    const state = get();
    if (!state.hydrated || !state.profileId) return false;
    const monthKey = currentMonthKey();
    const usedBase = usedThisMonth(state.sessionsUsed, state.monthKey);
    if (!canStart(state.planId, usedBase)) return false;
    const sessionsUsed = usedBase + 1;
    const now = Date.now();
    set({
      ...freshSignals(),
      status: "live",
      consentGranted: true,
      sessionsUsed,
      monthKey,
      startedAt: now,
      accumulatedMs: 0,
      runningSince: now,
    });
    persistBilling(state.planId, sessionsUsed, monthKey);
    return true;
  },

  applyTick: (tick) => {
    const at = Date.now();
    set((state) => ({
      currentQuestion: tick.question,
      suggestions: tick.suggestions.slice(0, 3),
      pace: tick.pace,
      paceMessage: tick.paceMessage,
      wordsPerMinute: tick.wordsPerMinute,
      stressLevel: tick.stressLevel,
      filler: tick.filler,
      silenceSeconds: tick.silenceSeconds,
      nonverbal: tick.nonverbal,
      fillers: tick.filler ? [...state.fillers, tick.filler].slice(-8) : state.fillers,
      transcript: [
        ...state.transcript,
        {
          id: crypto.randomUUID(),
          speaker: "recruiter" as const,
          text: tick.question,
          at,
        },
        {
          id: crypto.randomUUID(),
          speaker: "candidate" as const,
          text: tick.candidateLine,
          at,
        },
      ].slice(-40),
    }));
  },
}));
