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
  score: number;
  matchedSkills: string[];
  reasoning: string;
}

export interface CandidateWithMatches extends Candidate {
  matches: MatchResult[];
}

export const mockCandidates: Candidate[] = [
  {
    id: "c1",
    name: "Markus Weber",
    title: "Senior Network & Security Engineer",
    fileName: "Weber_Markus_Expose.pdf",
    skills: ["check point", "firewall", "netzwerk", "linux", "ansible", "python", "it-sicherheit", "ipv4", "ipv6", "routing", "terraform", "itil", "cyber security", "iso 27001", "risikoanalyse"],
    experience: "8 Jahre Erfahrung in IT-Security und Netzwerkadministration",
    education: "M.Sc. Informatik, TU München",
    summary: "Erfahrener Security-Spezialist mit Schwerpunkt Firewall-Administration, Cyber Security und Netzwerksicherheit.",
  },
  {
    id: "c2",
    name: "Sarah Müller",
    title: "Systems Engineer – Kommunikationstechnik",
    fileName: "Mueller_Sarah_Expose.pdf",
    skills: ["requirements engineering", "requirements", "doors", "kommunikationssysteme", "funk", "funkkommunikation", "elektrotechnik", "systemarchitektur", "hf-technik", "sysml", "uml", "nachrichtentechnik"],
    experience: "6 Jahre im Bereich Kommunikationssysteme und Anforderungsmanagement",
    education: "Dipl.-Ing. Nachrichtentechnik, Universität Stuttgart",
    summary: "Spezialistin für Kommunikationssysteme mit Erfahrung in Anforderungsmanagement und Systemarchitektur.",
  },
  {
    id: "c3",
    name: "Thomas Bauer",
    title: "Embedded-Entwickler & Safety Engineer",
    fileName: "Bauer_Thomas_Expose.pdf",
    skills: ["embedded", "embedded linux", "fpga", "dsp", "hardware", "software", "safety", "common criteria", "iec 62443", "risikoanalyse", "zertifizierung", "produktsicherheit"],
    experience: "7 Jahre Embedded-Entwicklung und Produktsicherheit in der Funktechnik",
    education: "M.Sc. Elektrotechnik, KIT Karlsruhe",
    summary: "Embedded-Spezialist mit starkem Fokus auf Funkgeräte-Architektur und Produktsicherheit/Zertifizierung.",
  },
];
