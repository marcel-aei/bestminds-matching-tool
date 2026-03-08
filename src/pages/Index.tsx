import { useState, useCallback, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import LoginScreen from "@/components/LoginScreen";
import UploadZone from "@/components/UploadZone";
import CandidateCard from "@/components/CandidateCard";
import VacancySidebar from "@/components/VacancySidebar";
import { fetchVacancies, Vacancy } from "@/data/vacancies";
import { CandidateWithMatches } from "@/data/candidates";
import { uploadAndMatch } from "@/data/matchingApi";
import { Users, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Index = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [vacanciesLoading, setVacanciesLoading] = useState(true);
  const [candidates, setCandidates] = useState<CandidateWithMatches[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!authenticated) return;
    fetchVacancies()
      .then((v) => {
        setVacancies(v);
        toast.success(`${v.length} Vakanzen geladen`);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Vakanzen konnten nicht geladen werden.");
      })
      .finally(() => setVacanciesLoading(false));
  }, [authenticated]);

  const handleUpload = useCallback(async (files: FileList) => {
    setIsProcessing(true);
    try {
      // Create blob URLs for each file to allow in-app viewing
      const fileMap = new Map<string, string>();
      Array.from(files).forEach((file) => {
        fileMap.set(file.name, URL.createObjectURL(file));
      });

      const results = await uploadAndMatch(files);

      // Try to match files to candidates by filename similarity
      const fileEntries = Array.from(fileMap.entries());
      results.forEach((candidate, idx) => {
        // Try matching candidate name in filename
        const matched = fileEntries.find(([filename]) =>
          candidate.name.split(" ").some((part) =>
            part.length > 2 && filename.toLowerCase().includes(part.toLowerCase())
          )
        );
        if (matched) {
          candidate.cvBlobUrl = matched[1];
        } else if (fileEntries[idx]) {
          // Fallback: match by position (1:1 mapping)
          candidate.cvBlobUrl = fileEntries[idx][1];
        }
      });

      setCandidates((prev) => [...prev, ...results]);
      toast.success(`${results.length} Kandidat(en) analysiert`);
    } catch (err) {
      console.error(err);
      toast.error("Matching fehlgeschlagen – bitte erneut versuchen.");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const sortedCandidates = useMemo(() => {
    return [...candidates].sort((a, b) => {
      const bestA = a.matches.length > 0 ? Math.max(...a.matches.map((m) => m.totalScore)) : 0;
      const bestB = b.matches.length > 0 ? Math.max(...b.matches.map((m) => m.totalScore)) : 0;
      return bestB - bestA;
    });
  }, [candidates]);

  const handleExport = useCallback(() => {
    const rows: string[] = ["Kandidat;Vakanz;Score;Tech Fit;Role Fit;Domain Fit;Level Fit;Sprache;Standort;Kommentar"];
    sortedCandidates.forEach((c) => {
      if (c.matches.length === 0) {
        rows.push(`${c.name};Keine passende Vakanz;0;;;;;;;`);
      } else {
        c.matches.forEach((m) => {
          const vacancy = vacancies.find((v) => v.id === m.vacancyId);
          const title = vacancy?.title ?? m.vacancyTitle ?? m.vacancyId;
          rows.push(`${c.name};${title};${m.totalScore}%;${m.techFit};${m.roleFit};${m.domainFit};${m.levelFit};${m.languageMatch === null ? "" : m.languageMatch ? "Ja" : "Nein"};${m.locationStatus ?? ""};${m.comment}`);
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
  }, [sortedCandidates, vacancies]);

  if (!authenticated) {
    return <LoginScreen onLogin={() => setAuthenticated(true)} />;
  }

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
            <VacancySidebar vacancies={vacancies} isLoading={vacanciesLoading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
