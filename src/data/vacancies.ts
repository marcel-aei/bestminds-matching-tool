export interface Vacancy {
  id: string;
  title: string;
  location: string;
  category: string;
  description: string;
  tasks: string[];
  requirements: string[];
  keywords: string[];
  url?: string;
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
  },
  {
    id: "1940",
    title: "Embedded Software Entwickler (C/C++)",
    location: "Stuttgart",
    category: "Software Development",
    description: "Entwicklung von Embedded-Software für Steuergeräte in der Automobilindustrie.",
    tasks: [
      "Entwicklung und Test von Embedded-Software in C/C++",
      "Integration von Softwaremodulen auf Steuergeräten",
      "Debugging und Fehleranalyse auf Hardware-Ebene",
      "Erstellung technischer Dokumentationen",
    ],
    requirements: [
      "Studium Informatik, Elektrotechnik oder vergleichbar",
      "Erfahrung mit Embedded C/C++",
      "Kenntnisse in AUTOSAR, CAN, LIN",
      "Erfahrung mit Debuggern und Oszilloskopen",
      "ASPICE oder ISO 26262 von Vorteil",
    ],
    keywords: ["embedded", "c", "c++", "autosar", "can", "lin", "steuergerät", "automobil", "debugging", "iso 26262", "aspice"],
  },
  {
    id: "1942",
    title: "Projektleiter Automatisierungstechnik",
    location: "Nürnberg",
    category: "Project Management",
    description: "Leitung von Automatisierungsprojekten in der industriellen Fertigung.",
    tasks: [
      "Leitung von Automatisierungsprojekten von der Planung bis zur Inbetriebnahme",
      "Koordination interdisziplinärer Teams",
      "Budget- und Terminverantwortung",
      "Technische Beratung der Kunden",
    ],
    requirements: [
      "Studium Elektrotechnik, Automatisierungstechnik oder Maschinenbau",
      "Mehrjährige Projektleitungserfahrung",
      "Kenntnisse in SPS-Programmierung (Siemens S7, TIA Portal)",
      "Erfahrung mit Scada-Systemen",
      "PMP oder PRINCE2 Zertifizierung von Vorteil",
    ],
    keywords: ["projektleitung", "automatisierung", "sps", "siemens", "tia portal", "scada", "inbetriebnahme", "fertigung"],
  },
  {
    id: "1945",
    title: "DevOps Engineer",
    location: "München",
    category: "IT / Cloud",
    description: "Aufbau und Betrieb von CI/CD-Pipelines und Cloud-Infrastruktur für Automotive-Projekte.",
    tasks: [
      "Aufbau und Pflege von CI/CD-Pipelines (Jenkins, GitLab CI)",
      "Verwaltung von Kubernetes-Clustern",
      "Infrastructure as Code mit Terraform und Ansible",
      "Monitoring und Alerting mit Prometheus und Grafana",
    ],
    requirements: [
      "Studium der Informatik oder vergleichbar",
      "Erfahrung mit Docker und Kubernetes",
      "Kenntnisse in Terraform, Ansible",
      "Scripting in Python oder Bash",
      "Erfahrung mit AWS oder Azure",
    ],
    keywords: ["devops", "kubernetes", "docker", "terraform", "ansible", "ci/cd", "jenkins", "gitlab", "aws", "azure", "python", "cloud", "monitoring"],
  },
  {
    id: "1948",
    title: "Testingenieur ADAS/Autonomes Fahren",
    location: "Ingolstadt",
    category: "Testing / Validation",
    description: "Absicherung von Fahrerassistenzsystemen und autonomen Fahrfunktionen.",
    tasks: [
      "Erstellung und Durchführung von Testfällen für ADAS-Funktionen",
      "HIL- und SIL-Tests",
      "Analyse und Dokumentation von Testergebnissen",
      "Mitarbeit bei der Testautomatisierung",
    ],
    requirements: [
      "Studium Fahrzeugtechnik, Elektrotechnik oder Informatik",
      "Erfahrung mit ADAS-Systemen (Radar, Lidar, Kamera)",
      "Kenntnisse in CANoe, dSPACE",
      "Erfahrung mit MATLAB/Simulink",
      "Grundkenntnisse in Python",
    ],
    keywords: ["adas", "autonomes fahren", "testing", "hil", "sil", "canoe", "dspace", "matlab", "simulink", "radar", "lidar", "testautomatisierung"],
  },
];
