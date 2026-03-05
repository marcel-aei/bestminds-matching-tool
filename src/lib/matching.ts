import { Candidate, MatchResult } from "@/data/candidates";
import { Vacancy } from "@/data/vacancies";

export function matchCandidateToVacancies(candidate: Candidate, vacancies: Vacancy[]): MatchResult[] {
  return vacancies
    .map((vacancy) => {
      const searchText = `${vacancy.profil} ${vacancy.aufgabengebiet} ${vacancy.title}`.toLowerCase();

      const matchedSkills = candidate.skills.filter((skill) => {
        const s = skill.toLowerCase();
        return searchText.includes(s);
      });

      // Rough keyword count from profil for scoring denominator
      const profilWords = searchText
        .replace(/[•\-–—]/g, " ")
        .split(/[\n,;()\/\s]+/)
        .filter((w) => w.length > 3);
      const uniqueWords = new Set(profilWords).size;
      const denominator = Math.max(uniqueWords * 0.15, 5);

      const score = Math.min(100, Math.round((matchedSkills.length / denominator) * 100));

      const reasoning = score >= 70
        ? `Starke Übereinstimmung: ${matchedSkills.length} relevante Skills passen zur Vakanz.`
        : score >= 40
        ? `Teilweise Übereinstimmung: Einige relevante Fähigkeiten vorhanden, aber Lücken erkennbar.`
        : `Geringe Übereinstimmung: Nur wenige Skills passen zur Anforderung.`;

      return {
        vacancyId: vacancy.id,
        score,
        matchedSkills,
        reasoning,
      };
    })
    .filter((m) => m.score >= 25)
    .sort((a, b) => b.score - a.score);
}
