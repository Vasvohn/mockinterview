/** Statut d'une session de copilote. */
export type SessionStatus = "idle" | "live" | "paused" | "ended";

/** Rythme de parole estimé pour la personne qui répond. */
export type SpeechPace = "too-slow" | "optimal" | "too-fast";

/** Intervenant dans la transcription simulée. */
export type Speaker = "recruiter" | "candidate";

export interface TranscriptEntry {
  id: string;
  speaker: Speaker;
  text: string;
  at: number;
}

export interface Suggestion {
  id: string;
  text: string;
}

/** Signaux corporels réduits à une seule consigne utile. */
export interface NonverbalState {
  posture: "open" | "closed" | "neutral";
  gaze: "camera" | "away";
  smile: "natural" | "absent";
  cue: string | null;
}

/** Instantané poussé par le flux, réel ou simulé. */
export interface LiveTick {
  question: string;
  candidateLine: string;
  suggestions: Suggestion[];
  pace: SpeechPace;
  paceMessage: string;
  wordsPerMinute: number;
  /** 0–100, tension perçue. */
  stressLevel: number;
  filler: string | null;
  silenceSeconds: number;
  nonverbal: NonverbalState;
}

export type ProfileKind =
  | "Entretien"
  | "Levée de fonds"
  | "Négociation"
  | "Premier emploi"
  | "Stage"
  | "Alternance"
  | "Oral"
  | "Client";

export interface InterviewProfile {
  id: string;
  kind: ProfileKind;
  role: string;
  company: string;
  focus: string;
  durationMin: number;
}
