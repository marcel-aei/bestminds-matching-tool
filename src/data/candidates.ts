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
  techFit: number;       // 1–5
  roleFit: number;       // 1–5
  domainFit: number;     // 1–5
  levelFit: number;      // 1–5
  languageMatch: boolean;
  locationStatus: string; // "ok" | "relocation" | "remote" etc.
  comment: string;
  totalScore: number;    // computed 0–100
}

export interface CandidateWithMatches extends Candidate {
  matches: MatchResult[];
}

export const candidatePool: Candidate[] = [
  {
    id: "c1",
    name: "Markus Weber",
    title: "Senior Network & Security Engineer",
    fileName: "",
    skills: ["check point", "firewall", "netzwerk", "linux", "ansible", "python", "it-sicherheit", "ipv4", "ipv6", "routing", "terraform", "itil", "cyber security", "iso 27001", "risikoanalyse"],
    experience: "8 Jahre Erfahrung in IT-Security und Netzwerkadministration",
    education: "M.Sc. Informatik, TU München",
    summary: "Erfahrener Security-Spezialist mit Schwerpunkt Firewall-Administration, Cyber Security und Netzwerksicherheit.",
  },
  {
    id: "c2",
    name: "Sarah Müller",
    title: "Systems Engineer – Kommunikationstechnik",
    fileName: "",
    skills: ["requirements engineering", "requirements", "doors", "kommunikationssysteme", "funk", "funkkommunikation", "elektrotechnik", "systemarchitektur", "hf-technik", "sysml", "uml", "nachrichtentechnik"],
    experience: "6 Jahre im Bereich Kommunikationssysteme und Anforderungsmanagement",
    education: "Dipl.-Ing. Nachrichtentechnik, Universität Stuttgart",
    summary: "Spezialistin für Kommunikationssysteme mit Erfahrung in Anforderungsmanagement und Systemarchitektur.",
  },
  {
    id: "c3",
    name: "Thomas Bauer",
    title: "Embedded-Entwickler & Safety Engineer",
    fileName: "",
    skills: ["embedded", "embedded linux", "fpga", "dsp", "hardware", "software", "safety", "common criteria", "iec 62443", "risikoanalyse", "zertifizierung", "produktsicherheit"],
    experience: "7 Jahre Embedded-Entwicklung und Produktsicherheit in der Funktechnik",
    education: "M.Sc. Elektrotechnik, KIT Karlsruhe",
    summary: "Embedded-Spezialist mit starkem Fokus auf Funkgeräte-Architektur und Produktsicherheit/Zertifizierung.",
  },
  {
    id: "c4",
    name: "Julia Schneider",
    title: "Projektmanagerin – Maschinenbau",
    fileName: "",
    skills: ["projektmanagement", "maschinenbau", "lean management", "agile", "scrum", "ms project", "sap"],
    experience: "5 Jahre Projektmanagement im Maschinenbau",
    education: "B.Eng. Maschinenbau, Hochschule München",
    summary: "Erfahrene Projektmanagerin ohne direkten Bezug zu IT-Security oder Funktechnik.",
  },
  {
    id: "c5",
    name: "Andreas Koch",
    title: "Full-Stack-Entwickler",
    fileName: "",
    skills: ["react", "typescript", "node.js", "postgresql", "docker", "aws", "ci/cd", "graphql"],
    experience: "4 Jahre Full-Stack-Webentwicklung",
    education: "B.Sc. Informatik, LMU München",
    summary: "Webentwickler mit Fokus auf moderne Frontend- und Backend-Technologien.",
  },
  {
    id: "c6",
    name: "Lisa Hartmann",
    title: "RF Engineer",
    fileName: "",
    skills: ["hf-technik", "antennentechnik", "funkgeräte", "emc", "matlab", "cst studio", "rf design", "sdr", "software defined radio"],
    experience: "6 Jahre HF-Entwicklung und Antennentechnik",
    education: "M.Sc. Elektrotechnik, TU Darmstadt",
    summary: "HF-Ingenieurin mit Erfahrung in Funkgeräte-Design und Software Defined Radio.",
  },
  {
    id: "c7",
    name: "Peter Hoffmann",
    title: "Qualitätsmanager – Automotive",
    fileName: "",
    skills: ["qualitätsmanagement", "iatf 16949", "iso 9001", "audit", "fmea", "8d-report", "automotive"],
    experience: "10 Jahre Qualitätsmanagement in der Automobilindustrie",
    education: "Dipl.-Ing. Fahrzeugtechnik, Universität Stuttgart",
    summary: "QM-Spezialist in der Automobilbranche ohne Bezug zu den aktuellen Vakanzen.",
  },
  {
    id: "c8",
    name: "Christina Wagner",
    title: "IT Security Consultant",
    fileName: "",
    skills: ["penetration testing", "siem", "cyber security", "iso 27001", "nist", "risikoanalyse", "soc", "incident response", "firewall"],
    experience: "5 Jahre IT-Security-Beratung",
    education: "M.Sc. IT-Sicherheit, Ruhr-Universität Bochum",
    summary: "Security-Beraterin mit Schwerpunkt auf Penetration Testing und Incident Response.",
  },
  {
    id: "c9",
    name: "Michael Braun",
    title: "Vertriebsingenieur – Medizintechnik",
    fileName: "",
    skills: ["vertrieb", "medizintechnik", "key account", "crm", "salesforce", "produktpräsentation"],
    experience: "7 Jahre technischer Vertrieb in der Medizintechnik",
    education: "B.Eng. Medizintechnik, FH Aachen",
    summary: "Vertriebsingenieur mit Branchenfokus Medizintechnik – kein Match zu aktuellen IT/Funk-Vakanzen.",
  },
  {
    id: "c10",
    name: "Katharina Fischer",
    title: "Systemarchitektin – Avionik",
    fileName: "",
    skills: ["systemarchitektur", "avionik", "do-178c", "requirements", "sysml", "modellbasierte entwicklung", "atc", "flugfunk"],
    experience: "9 Jahre Systemarchitektur in der Luftfahrt",
    education: "M.Sc. Luft- und Raumfahrttechnik, TU Berlin",
    summary: "Systemarchitektin mit Erfahrung in Avionik und Flugfunk-Kommunikation.",
  },
  {
    id: "c11",
    name: "Daniel Krüger",
    title: "DevOps Engineer",
    fileName: "",
    skills: ["kubernetes", "terraform", "aws", "ci/cd", "docker", "jenkins", "monitoring", "linux"],
    experience: "4 Jahre DevOps und Cloud-Infrastruktur",
    education: "B.Sc. Informatik, Universität Hamburg",
    summary: "DevOps-Spezialist mit Cloud-Fokus – kein direkter Bezug zu den Vakanzen.",
  },
  {
    id: "c12",
    name: "Elena Petrov",
    title: "Data Scientist",
    fileName: "",
    skills: ["python", "machine learning", "tensorflow", "pandas", "sql", "data engineering", "nlp"],
    experience: "3 Jahre Data Science und Machine Learning",
    education: "M.Sc. Data Science, TU München",
    summary: "Data Scientist ohne Bezug zu den aktuellen Valentum-Vakanzen im Bereich Security/Funk.",
  },
];

/**
 * Generates mock candidates based on uploaded file names.
 * Randomly assigns profiles from the pool, using file names as the document reference.
 */
export function generateCandidatesFromFiles(files: FileList): Candidate[] {
  const shuffled = [...candidatePool].sort(() => Math.random() - 0.5);
  const count = Math.min(files.length, shuffled.length);
  const batch = Date.now();

  return Array.from({ length: count }, (_, i) => ({
    ...shuffled[i],
    id: `upload-${batch}-${i}`,
    fileName: files[i].name,
  }));
}
