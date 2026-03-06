import { Candidate, MatchResult } from "@/data/candidates";
import { Vacancy } from "@/data/vacancies";

function computeTotalScore(
  techFit: number | null,
  roleFit: number | null,
  domainFit: number | null,
  levelFit: number | null,
  languageMatch: boolean | null,
  locationStatus: string | null
): number {
  // Weighted dimensions – null values are excluded and weight redistributed
  const dims: { value: number | null; weight: number }[] = [
    { value: techFit, weight: 0.3 },
    { value: roleFit, weight: 0.3 },
    { value: domainFit, weight: 0.2 },
    { value: levelFit, weight: 0.1 },
  ];

  const available = dims.filter((d) => d.value !== null);
  const nullCount = dims.length - available.length;

  // If no dimensions available, return 0
  if (available.length === 0) return 0;

  // Redistribute weight proportionally among available dimensions
  const totalAvailableWeight = available.reduce((sum, d) => sum + d.weight, 0);
  const base = available.reduce((sum, d) => sum + (d.value! / 5) * (d.weight / totalAvailableWeight), 0);

  // Confidence penalty: each missing dimension reduces the max possible score
  // 0 missing → 100% cap, 1 missing → 85% cap, 2 → 70%, 3 → 55%, 4 → 0%
  const confidenceCap = Math.max(0, 1 - nullCount * 0.15);

  // Language & location bonuses (only if known)
  const langBonus = languageMatch === true ? 0.05 : 0;
  const locBonus = locationStatus === "ok" ? 0.05 : locationStatus === "remote_unclear" ? 0.02 : 0;

  const raw = (base + langBonus + locBonus) * 100;
  return Math.min(100, Math.round(raw * confidenceCap));
}

export { computeTotalScore };

export function matchCandidateToVacancies(candidate: Candidate, vacancies: Vacancy[]): MatchResult[] {
  return vacancies
    .map((vacancy) => {
      const searchText = `${vacancy.profil} ${vacancy.aufgabengebiet} ${vacancy.title}`.toLowerCase();

      const matchedSkills = candidate.skills.filter((skill) => {
        const s = skill.toLowerCase();
        return searchText.includes(s);
      });

      const profilWords = searchText
        .replace(/[•\-–—]/g, " ")
        .split(/[\n,;()\/\s]+/)
        .filter((w) => w.length > 3);
      const uniqueWords = new Set(profilWords).size;
      const denominator = Math.max(uniqueWords * 0.15, 5);
      const rawScore = Math.min(5, Math.round((matchedSkills.length / denominator) * 5));

      // Generate plausible dimension scores with some null values and strong candidates
      const techFit: number | null = Math.random() > 0.1 ? Math.max(0, Math.min(5, rawScore + Math.floor(Math.random() * 2))) : null;
      const roleFit: number | null = Math.random() > 0.1 ? Math.max(0, Math.min(5, rawScore + (Math.random() > 0.5 ? 1 : -1))) : null;
      const domainFit: number | null = Math.random() > 0.15 ? Math.max(0, Math.min(5, rawScore + Math.floor(Math.random() * 2))) : null;
      const levelFit: number | null = Math.random() > 0.1 ? Math.max(0, Math.min(5, Math.ceil(Math.random() * 5))) : null;
      const languageMatch: boolean | null = Math.random() > 0.15 ? Math.random() > 0.2 : null;
      const locationStatus: "ok" | "remote_unclear" | "mismatch" | null =
        Math.random() > 0.15
          ? (Math.random() > 0.3 ? "ok" : Math.random() > 0.5 ? "remote_unclear" : "mismatch")
          : null;

      const totalScore = computeTotalScore(techFit, roleFit, domainFit, levelFit, languageMatch, locationStatus);

      const comment = totalScore >= 60
        ? `Starke Übereinstimmung: ${matchedSkills.length} relevante Skills passen zur Vakanz.`
        : totalScore >= 35
        ? `Teilweise Übereinstimmung: Einige relevante Fähigkeiten vorhanden, aber Lücken erkennbar.`
        : `Geringe Übereinstimmung: Nur wenige Skills passen zur Anforderung.`;

      return {
        vacancyId: vacancy.id,
        techFit,
        roleFit,
        domainFit,
        levelFit,
        languageMatch,
        locationStatus,
        comment,
        totalScore,
      };
    })
    .filter((m) => m.totalScore >= 20)
    .sort((a, b) => b.totalScore - a.totalScore);
}
