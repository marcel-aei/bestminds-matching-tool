export interface Candidate {
  id: string;
  name: string;
  title: string;
  fileName: string;
  skills: string[];
  experience: string;
  education: string;
  summary: string;
}

export interface MatchResult {
  vacancyId: string;
  score: number; // 0-100
  matchedSkills: string[];
  reasoning: string;
}

export interface CandidateWithMatches extends Candidate {
  matches: MatchResult[];
}

// Mock candidates that will be "uploaded"
export const mockCandidates: Candidate[] = [
  {
    id: "c1",
    name: "Markus Weber",
    title: "Senior Network & Security Engineer",
    fileName: "Weber_Markus_Expose.pdf",
    skills: ["check point firewalls", "palo alto", "netzwerk", "linux", "ansible", "python", "it-sicherheit", "ipv4", "ipv6", "routing", "terraform", "itil"],
    experience: "8 Jahre Erfahrung in IT-Security und Netzwerkadministration",
    education: "M.Sc. Informatik, TU München",
    summary: "Erfahrener Security-Spezialist mit Schwerpunkt Firewall-Administration und Netzwerksicherheit. Tiefgehende Kenntnisse in Check Point und modernen IaC-Tools.",
  },
  {
    id: "c2",
    name: "Sarah Müller",
    title: "Systems Engineer – Kommunikationstechnik",
    fileName: "Mueller_Sarah_Expose.pdf",
    skills: ["requirements engineering", "doors", "kommunikationssysteme", "funk", "elektrotechnik", "systemarchitektur", "hf-technik", "matlab"],
    experience: "6 Jahre im Bereich Kommunikationssysteme und Anforderungsmanagement",
    education: "Dipl.-Ing. Nachrichtentechnik, Universität Stuttgart",
    summary: "Spezialistin für Kommunikationssysteme mit Erfahrung in Anforderungsmanagement und Systemarchitektur. Fundierte Kenntnisse in HF-Technik.",
  },
  {
    id: "c3",
    name: "Thomas Bauer",
    title: "Embedded Softwareentwickler",
    fileName: "Bauer_Thomas_Expose.pdf",
    skills: ["embedded", "c", "c++", "autosar", "can", "lin", "debugging", "automobil", "iso 26262", "python", "git"],
    experience: "5 Jahre Embedded-Entwicklung in der Automobilindustrie",
    education: "B.Sc. Elektrotechnik, Hochschule München",
    summary: "Embedded-Entwickler mit starkem Fokus auf automotive Steuergeräte-Software. Erfahrung mit AUTOSAR und funktionaler Sicherheit.",
  },
];
