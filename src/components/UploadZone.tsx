import { Upload, FileText, Brain, Search, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

interface UploadZoneProps {
  onUpload: (files: FileList) => void;
  isProcessing: boolean;
}

const STEPS = [
  { icon: Upload, label: "Dokumente werden hochgeladen…" },
  { icon: Brain, label: "KI analysiert Kandidatenprofile…" },
  { icon: Search, label: "Matching mit Vakanzen läuft…" },
  { icon: CheckCircle2, label: "Ergebnisse werden aufbereitet…" },
];

const UploadZone = ({ onUpload, isProcessing }: UploadZoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [fileCount, setFileCount] = useState(0);

  // Cycle through loading steps while processing
  useEffect(() => {
    if (!isProcessing) {
      setStepIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, STEPS.length - 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isProcessing]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      setFileCount(e.dataTransfer.files.length);
      onUpload(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const dt = new DataTransfer();
      Array.from(e.target.files).forEach((f) => dt.items.add(f));
      setFileCount(dt.files.length);
      onUpload(dt.files);
    }
    e.target.value = "";
  };

  if (isProcessing) {
    const step = STEPS[stepIndex];
    const StepIcon = step.icon;
    const progress = ((stepIndex + 1) / STEPS.length) * 100;

    return (
      <div className="glass-card rounded-xl p-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <StepIcon className="h-7 w-7 text-primary animate-pulse" />
        </div>

        <h3 className="font-display text-lg font-semibold mb-1">
          {step.label}
        </h3>
        <p className="text-sm text-muted-foreground mb-5">
          {fileCount} {fileCount === 1 ? "Dokument" : "Dokumente"} · Schritt {stepIndex + 1} von {STEPS.length}
        </p>

        <div className="max-w-xs mx-auto mb-4">
          <Progress value={progress} className="h-1.5" />
        </div>

        {/* Step indicators */}
        <div className="flex justify-center gap-6 mt-4">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === stepIndex;
            const isDone = i < stepIndex;
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                    isDone
                      ? "bg-primary text-primary-foreground"
                      : isActive
                      ? "bg-primary/20 text-primary ring-2 ring-primary/30"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Icon className={`h-4 w-4 ${isActive ? "animate-pulse" : ""}`} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="glass-card rounded-xl p-8 text-center transition-all hover:border-primary/40 cursor-pointer"
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent">
        <Upload className="h-6 w-6 text-accent-foreground" />
      </div>
      <h3 className="font-display text-lg font-semibold mb-1">
        Kandidaten-Exposés hochladen
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        PDF oder Word-Dateien hierher ziehen oder klicken
      </p>
      <Button variant="outline" size="sm">
        Dateien auswählen
      </Button>
    </div>
  );
};

export default UploadZone;
