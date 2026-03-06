import { CandidateWithMatches, MatchResult } from "@/data/candidates";
import { computeTotalScore } from "@/lib/matching";

const MATCHING_WEBHOOK = "https://valentum-engineering.app.n8n.cloud/webhook/calculate_matching";

interface WebhookMatchResult {
  candidate_name: string;
  tech_fit: number | null;
  role_fit: number | null;
  domain_fit: number | null;
  level_fit: number | null;
  language_match: boolean | null;
  location_status: "ok" | "remote_unclear" | "mismatch" | null;
  Kommentar: string;
  vakanz_title: string;
  vakanz_id: number;
  vakanz_url: string;
  // ignored: model, prompt_tokens, completion_tokens
}

/**
 * Uploads candidate PDFs to the n8n matching webhook and returns
 * structured CandidateWithMatches objects grouped by candidate.
 */
export async function uploadAndMatch(files: FileList): Promise<CandidateWithMatches[]> {
  const formData = new FormData();
  Array.from(files).forEach((file) => {
    formData.append("files", file);
  });

  const res = await fetch(MATCHING_WEBHOOK, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Matching-Fehler: ${res.status}`);
  }

  const raw: WebhookMatchResult[] = await res.json();

  // Group results by candidate_name
  const grouped = new Map<string, { matches: MatchResult[]; fileName: string }>();

  for (const item of raw) {
    const name = item.candidate_name ?? "Unbekannt";

    if (!grouped.has(name)) {
      grouped.set(name, { matches: [], fileName: "" });
    }

    const techFit = item.tech_fit ?? null;
    const roleFit = item.role_fit ?? null;
    const domainFit = item.domain_fit ?? null;
    const levelFit = item.level_fit ?? null;
    const languageMatch = item.language_match ?? null;
    const locationStatus = item.location_status ?? null;

    const totalScore = computeTotalScore(techFit, roleFit, domainFit, levelFit, languageMatch, locationStatus);

    grouped.get(name)!.matches.push({
      vacancyId: String(item.vakanz_id),
      vacancyTitle: item.vakanz_title,
      vacancyUrl: item.vakanz_url,
      techFit,
      roleFit,
      domainFit,
      levelFit,
      languageMatch,
      locationStatus,
      comment: item.Kommentar ?? "",
      totalScore,
    });
  }

  // Build CandidateWithMatches objects
  const batch = Date.now();
  let idx = 0;
  const results: CandidateWithMatches[] = [];

  for (const [name, data] of grouped) {
    // Sort matches by score descending
    data.matches.sort((a, b) => b.totalScore - a.totalScore);

    results.push({
      id: `api-${batch}-${idx++}`,
      name,
      title: "",
      fileName: "",
      skills: [],
      experience: "",
      education: "",
      summary: "",
      matches: data.matches,
    });
  }

  return results;
}
