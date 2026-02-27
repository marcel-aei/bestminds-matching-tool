export interface Vacancy {
  id: string;
  title: string;
  location: string;
  category: string;
  description: string;
  tasks: string[];
  requirements: string[];
  keywords: string[];
  url: string;
}

export const vacancies: Vacancy[] = [
  {
    id: "1935",
    title: "Firewall Administrator",
    location: "München",
    category: "IT Security",
    description: "Unterstützung der globalen Firewall-Infrastruktur. Administration, Konfiguration und Dokumentation.",
    tasks: [
      "Administration, Konfiguration und Dokumentation der Firewall-Infrastruktur",
      "Planung und Koordination der Einführung von Firewall-Infrastrukturen",
      "Einhaltung von SLAs im Rahmen der Ticketbearbeitung",
      "Einführung neuer Technologien zur Optimierung des Service",
    ],
    requirements: [
      "Studium der Informatik oder vergleichbare Qualifikation",
      "Kenntnisse in Check Point Firewalls",
      "Fundierte Netzwerkkenntnisse (IPv4, IPv6, Routing)",
      "IT-Sicherheitskonzepte, ITIL",
      "Linux, Ansible, Terraform, Python",
    ],
    keywords: ["firewall", "check point", "netzwerk", "it-sicherheit", "linux", "ansible", "terraform", "python", "ipv4", "ipv6", "itil", "routing"],
    url: "https://www.valentum.de/stellenanzeige/1935/muenchen-firewall-administrator.html",
  },
  {
    id: "1936",
    title: "Requirements Engineer Radio Communication Systems",
    location: "München",
    category: "Systems Engineering",
    description: "Spezifizierung und Konzeption innovativer, komplexer Kommunikationssysteme im militärischen Bereich.",
    tasks: [
      "Spezifikation und Entwurf militärischer Kommunikationssysteme",
      "Führung technischer Verhandlungen mit Kunden und Partnern",
      "Erfassung und Umsetzung von Kundenanforderungen in technische Systemlösungen",
      "Entwicklung ganzheitlicher Architektur von Kommunikationssystemen",
    ],
    requirements: [
      "Studium der Elektrotechnik, Nachrichtentechnik oder Informatik",
      "Erfahrung in Anforderungsmanagement (DOORS)",
      "Kenntnisse in Funkkommunikation und HF-Technik",
      "Verständnis militärischer Standards",
      "Deutsch und Englisch fließend",
    ],
    keywords: ["requirements engineering", "kommunikationssysteme", "funk", "militär", "doors", "elektrotechnik", "nachrichtentechnik", "hf-technik", "systemarchitektur"],
    url: "https://www.valentum.de/stellenanzeige/1936/muenchen-requirements-engineer-radio-communication-systems.html",
  },
  {
    id: "1937",
    title: "Product Safety Specialist HF Radio Devices",
    location: "München",
    category: "Safety / Compliance",
    description: "Definition und Implementierung von Produktsicherheitsstrategien für Software Defined Radios im Bereich sicherer Funkkommunikation.",
    tasks: [
      "Festlegung der Produktsicherheitsstrategie für Software Defined Radios",
      "Entwurf und Bewertung von Architekturen unter Sicherheits- und Zertifizierungsperspektive",
      "Durchführung von Risikoanalysen",
      "Implementierung von Sicherheitsmaßnahmen auf konzeptioneller Ebene",
    ],
    requirements: [
      "Erfahrung in Produktsicherheit von Funksystemen",
      "Kenntnisse EU Cyber Resilience Act (CRA), Funkgeräterichtlinie (RED)",
      "Erfahrung mit Common Criteria, IEC 62443",
      "Verständnis von HF-Hardware und Embedded-Systemen",
    ],
    keywords: ["produktsicherheit", "safety", "sdr", "funkkommunikation", "risikoanalyse", "common criteria", "iec 62443", "cra", "red", "zertifizierung", "embedded", "hf"],
    url: "https://www.valentum.de/stellenanzeige/1937/muenchen-product-safety-specialist-hf-radio-devices.html",
  },
  {
    id: "1938",
    title: "Device Architect ATC Radio Equipment",
    location: "München",
    category: "Architecture / Engineering",
    description: "End-to-End-Verantwortung für die Hardware- und Softwarearchitektur der ATC-Funkgeräte.",
    tasks: [
      "Verantwortung für HW- und SW-Architektur von ATC-Funkgeräten",
      "Analyse und Ableitung technischer Anforderungen für Funksoftware und Hardware",
      "Koordination interner und externer Entwicklungspartner",
      "Erstellung technischer Konzepte und Spezifikationen",
    ],
    requirements: [
      "Studium Elektrotechnik, Nachrichtentechnik oder Informatik",
      "Embedded-Kenntnisse und architektonisches Denken",
      "Erfahrung mit Funkgeräten / ATC-Systemen",
      "Kenntnisse in FPGA, DSP oder Embedded Linux",
    ],
    keywords: ["architektur", "atc", "funkgeräte", "embedded", "hardware", "software", "fpga", "dsp", "embedded linux", "funksoftware", "nachrichtentechnik"],
    url: "https://www.valentum.de/stellenanzeige/1938/muenchen-device-architect-atc-radio-equipment.html",
  },
  {
    id: "1939",
    title: "Requirements Specialist Software Defined Radio ATC",
    location: "München",
    category: "Systems Engineering",
    description: "Spezifizierung und Konzeption komplexer ATC-Kommunikationssysteme inkl. Ableitung neuer Sicherheitsstandards auf Produktebene.",
    tasks: [
      "Spezifikation und Design von ATC-Kommunikationssystemen",
      "Ableitung der Auswirkungen neuer Sicherheitsstandards auf Produktebene",
      "Erfassung und Umsetzung von Kundenanforderungen",
      "Ganzheitliche Betrachtung der Kommunikationssystemarchitektur",
    ],
    requirements: [
      "Studium Elektrotechnik, Nachrichtentechnik oder Informatik",
      "Erfahrung im Anforderungsmanagement (DOORS)",
      "Kenntnisse in ATC und Funkkommunikation",
      "Erfahrung mit modellbasierter Systemtechnik (SysML/UML)",
    ],
    keywords: ["requirements", "sdr", "atc", "kommunikationssysteme", "doors", "sysml", "uml", "funkkommunikation", "sicherheitsstandards", "systemarchitektur"],
    url: "https://www.valentum.de/stellenanzeige/1939/muenchen-requirements-specialist-software-defined-radio-atc.html",
  },
  {
    id: "1932",
    title: "Cyber/IT Security Architect/Specialist",
    location: "Stuttgart",
    category: "IT Security",
    description: "Security-Architektur und -Spezialist mit fundierten Kenntnissen im Bereich EU Security Standards.",
    tasks: [
      "Entwurf und Bewertung von Architekturen unter Sicherheitsaspekten",
      "Definition und Überprüfung von Sicherheitsmaßnahmen",
      "Durchführung von Risikobewertungen und Risikoanalysen",
      "Implementierung der Informationssicherheit gemäß ISO 27001 und NIS-2",
    ],
    requirements: [
      "Mehrjährige Erfahrung in Cyber-/IT-Sicherheit",
      "Erfahrung mit Common Criteria, Zulassungs- und Zertifizierungsprozessen",
      "Kenntnisse ISO 27001, NIS-2, EU Cyber Resilience Act",
      "Verständnis von IT-Sicherheitsarchitekturen",
    ],
    keywords: ["cyber security", "it-sicherheit", "iso 27001", "nis-2", "common criteria", "risikoanalyse", "zertifizierung", "sicherheitsarchitektur", "cra"],
    url: "https://www.valentum.de/stellenanzeige/1932/stuttgart-cyberit-security-architectspecialist.html",
  },
];
