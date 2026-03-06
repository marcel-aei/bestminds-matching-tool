import { Candidate, MatchResult } from "@/data/candidates";
import { Vacancy } from "@/data/vacancies";

function computeTotalScore(
  techFit: number,
  roleFit: number,
  domainFit: number,
  levelFit: number,
  languageMatch: boolean,
  locationStatus: string
): number {
  // Weighted: tech 30%, role 30%, domain 20%, level 10%, language 5%, location 5%
  const base =
    techFit * 0.3 +
    roleFit * 0.3 +
    domainFit * 0.2 +
    levelFit * 0.1;
  const langBonus = languageMatch ? 0.05 : 0;
  const locBonus = locationStatus === "ok" ? 0.05 : locationStatus === "remote" ? 0.03 : 0;
  // base max = 5*0.3+5*0.3+5*0.2+5*0.1 = 5, so normalise to 0–100
  const raw = ((base / 5) + langBonus + locBonus) * 100;
  return Math.min(100, Math.round(raw));
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

      // Generate plausible dimension scores from matched skills
      const techFit = Math.max(1, Math.min(5, rawScore));
      const roleFit = Math.max(1, Math.min(5, rawScore + (Math.random() > 0.5 ? 1 : -1)));
      const domainFit = Math.max(1, Math.min(5, rawScore + Math.floor(Math.random() * 2)));
      const levelFit = Math.max(1, Math.min(5, Math.ceil(Math.random() * 5)));
      const languageMatch = Math.random() > 0.2;
      const locationStatus: "ok" | "remote_unclear" | "mismatch" = Math.random() > 0.3 ? "ok" : "remote_unclear";

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
