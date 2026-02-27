import { useState, useCallback } from "react";
import Header from "@/components/Header";
import UploadZone from "@/components/UploadZone";
import CandidateCard from "@/components/CandidateCard";
import VacancySidebar from "@/components/VacancySidebar";
import { vacancies } from "@/data/vacancies";
import { mockCandidates, CandidateWithMatches } from "@/data/candidates";
import { matchCandidateToVacancies } from "@/lib/matching";
import { Users } from "lucide-react";

const Index = () => {
  const [candidates, setCandidates] = useState<CandidateWithMatches[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = useCallback((_files: FileList) => {
    setIsProcessing(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const processed = mockCandidates.map((candidate) => ({
        ...candidate,
        matches: matchCandidateToVacancies(candidate, vacancies),
      }));
      setCandidates(processed);
      setIsProcessing(false);
    }, 1800);
  }, []);

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

            {candidates.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-primary" />
                  <h2 className="font-display font-semibold text-base">
                    Ergebnisse ({candidates.length} Kandidaten)
                  </h2>
                </div>
                <div className="space-y-4">
                  {candidates.map((candidate) => (
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
