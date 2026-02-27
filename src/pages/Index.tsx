import { useState, useCallback, useMemo } from "react";
import Header from "@/components/Header";
import UploadZone from "@/components/UploadZone";
import CandidateCard from "@/components/CandidateCard";
import VacancySidebar from "@/components/VacancySidebar";
import { vacancies } from "@/data/vacancies";
import { CandidateWithMatches, generateCandidatesFromFiles } from "@/data/candidates";
import { matchCandidateToVacancies } from "@/lib/matching";
import { Users, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [candidates, setCandidates] = useState<CandidateWithMatches[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = useCallback((files: FileList) => {
    setIsProcessing(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const generated = generateCandidatesFromFiles(files);
      const processed = generated.map((candidate) => ({
        ...candidate,
        matches: matchCandidateToVacancies(candidate, vacancies),
      }));
      setCandidates((prev) => [...prev, ...processed]);
      setIsProcessing(false);
    }, 1800);
  }, []);

  const sortedCandidates = useMemo(() => {
    return [...candidates].sort((a, b) => {
      const bestA = a.matches.length > 0 ? Math.max(...a.matches.map((m) => m.score)) : 0;
      const bestB = b.matches.length > 0 ? Math.max(...b.matches.map((m) => m.score)) : 0;
      return bestB - bestA;
    });
  }, [candidates]);

  const handleExport = useCallback(() => {
    const rows: string[] = ["Kandidat;Titel;Vakanz;Score;Gematchte Skills;Begründung"];
    sortedCandidates.forEach((c) => {
      if (c.matches.length === 0) {
        rows.push(`${c.name};${c.title};Keine passende Vakanz;0;;`);
      } else {
        c.matches.forEach((m) => {
          const v = vacancies.find((v) => v.id === m.vacancyId);
          rows.push(`${c.name};${c.title};${v?.title ?? m.vacancyId};${m.score}%;${m.matchedSkills.join(", ")};${m.reasoning}`);
        });
      }
    });
    const blob = new Blob(["\uFEFF" + rows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kandidaten-matching-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [sortedCandidates]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold tracking-tight mb-1">
            Kandidaten-Matching
          </h1>
          <p className="text-muted-foreground text-sm">
            Laden Sie Kandidaten-Exposés hoch – das System matcht automatisch mit den betreuten Vakanzen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <UploadZone onUpload={handleUpload} isProcessing={isProcessing} />

            {sortedCandidates.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <h2 className="font-display font-semibold text-base">
                      Ergebnisse ({sortedCandidates.length} Kandidaten)
                    </h2>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleExport}>
                    <Download className="h-3.5 w-3.5 mr-1.5" />
                    CSV Export
                  </Button>
                </div>
                <div className="space-y-4">
                  {sortedCandidates.map((candidate) => (
                    <CandidateCard
                      key={candidate.id}
                      candidate={candidate}
                      vacancies={vacancies}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <VacancySidebar vacancies={vacancies} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
