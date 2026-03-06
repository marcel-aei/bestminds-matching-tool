export interface Candidate {
  id: string;
  name: string;
}

export interface MatchResult {
  vacancyId: string;
  vacancyTitle?: string;
  vacancyUrl?: string;
  techFit: number | null;       // 0–5
  roleFit: number | null;       // 0–5
  domainFit: number | null;     // 0–5
  levelFit: number | null;      // 0–5
  languageMatch: boolean | null;
  locationStatus: "ok" | "remote_unclear" | "mismatch" | null;
  comment: string;
  totalScore: number;           // computed 0–100
}

export interface CandidateWithMatches extends Candidate {
  matches: MatchResult[];
}
