export interface Vacancy {
  id: string;
  title: string;
  ort: string;
  aufgabengebiet: string;
  profil: string;
  url: string;
  ansprechpartner_name: string;
  ansprechpartner_email: string;
}

const WEBHOOK_URL = "https://valentum-engineering.app.n8n.cloud/webhook/get_vakanzliste";

export async function fetchVacancies(): Promise<Vacancy[]> {
  const res = await fetch(WEBHOOK_URL);
  if (!res.ok) throw new Error(`Fehler beim Laden der Vakanzen: ${res.status}`);
  const data = await res.json();

  return data.map((item: any) => ({
    id: String(item.id ?? item.title),
    title: item.title ?? "Unbekannte Vakanz",
    ort: item.ort ?? "",
    aufgabengebiet: item.aufgabengebiet ?? "",
    profil: item.profil ?? "",
    url: item.url ?? "",
    ansprechpartner_name: item.ansprechpartner_name ?? "",
    ansprechpartner_email: item.ansprechpartner_email ?? "",
  }));
}

/**
 * Extracts lowercase keyword tokens from profil + aufgabengebiet for matching.
 */
export function extractKeywords(vacancy: Vacancy): string[] {
  const text = `${vacancy.profil} ${vacancy.aufgabengebiet}`.toLowerCase();
  // Split on common delimiters, filter short/noise words
  const tokens = text
    .replace(/[•\-–—]/g, " ")
    .split(/[\n,;()\/]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 2);
  return tokens;
}
