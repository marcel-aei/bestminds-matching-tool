import { Candidate, MatchResult } from "@/data/candidates";
import { Vacancy } from "@/data/vacancies";

export function matchCandidateToVacancies(candidate: Candidate, vacancies: Vacancy[]): MatchResult[] {
  return vacancies
    .map((vacancy) => {
      const matchedSkills = candidate.skills.filter((skill) =>
        vacancy.keywords.some(
          (kw) => kw.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(kw.toLowerCase())
        )
      );

      const score = Math.min(100, Math.round((matchedSkills.length / vacancy.keywords.length) * 100 * 1.3));

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
