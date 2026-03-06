/**
 * Computes a weighted total score from individual fit dimensions.
 * Missing (null) dimensions are excluded and a confidence penalty is applied.
 */
export function computeTotalScore(
  techFit: number | null,
  roleFit: number | null,
  domainFit: number | null,
  levelFit: number | null,
  languageMatch: boolean | null,
  locationStatus: string | null
): number {
  const dims: { value: number | null; weight: number }[] = [
    { value: techFit, weight: 0.3 },
    { value: roleFit, weight: 0.3 },
    { value: domainFit, weight: 0.2 },
    { value: levelFit, weight: 0.1 },
  ];

  const available = dims.filter((d) => d.value !== null);
  const nullCount = dims.length - available.length;

  if (available.length === 0) return 0;

  const totalAvailableWeight = available.reduce((sum, d) => sum + d.weight, 0);
  const base = available.reduce((sum, d) => sum + (d.value! / 5) * (d.weight / totalAvailableWeight), 0);

  // Confidence penalty: each missing dimension reduces the max possible score
  const confidenceCap = Math.max(0, 1 - nullCount * 0.15);

  const langBonus = languageMatch === true ? 0.05 : 0;
  const locBonus = locationStatus === "ok" ? 0.05 : locationStatus === "remote_unclear" ? 0.02 : 0;

  const raw = (base + langBonus + locBonus) * 100;
  return Math.min(100, Math.round(raw * confidenceCap));
}
