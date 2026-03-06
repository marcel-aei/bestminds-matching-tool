import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

interface UploadZoneProps {
  onUpload: (files: FileList) => void;
  isProcessing: boolean;
}

const MESSAGES = [
  "Dokumente werden analysiert…",
  "KI-Matching läuft…",
  "Ergebnisse werden aufbereitet…",
];

const UploadZone = ({ onUpload, isProcessing }: UploadZoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileCount, setFileCount] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  // Rotate status text
  useState(() => {
    if (!isProcessing) return;
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  });

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
    return (
      <div className="glass-card rounded-xl p-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Loader2 className="h-7 w-7 text-primary animate-spin" />
        </div>
        <h3 className="font-display text-lg font-semibold mb-1">
          {MESSAGES[msgIndex]}
        </h3>
        <p className="text-sm text-muted-foreground">
          {fileCount} {fileCount === 1 ? "Dokument" : "Dokumente"} werden verarbeitet
        </p>
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
