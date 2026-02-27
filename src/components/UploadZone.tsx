import { Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

interface UploadZoneProps {
  onUpload: (files: FileList) => void;
  isProcessing: boolean;
}

const UploadZone = ({ onUpload, isProcessing }: UploadZoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files);
    }
  };

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
        onChange={(e) => e.target.files && onUpload(e.target.files)}
      />
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent">
        {isProcessing ? (
          <FileText className="h-6 w-6 text-accent-foreground animate-pulse" />
        ) : (
          <Upload className="h-6 w-6 text-accent-foreground" />
        )}
      </div>
      <h3 className="font-display text-lg font-semibold mb-1">
        {isProcessing ? "Exposés werden analysiert…" : "Kandidaten-Exposés hochladen"}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        PDF oder Word-Dateien hierher ziehen oder klicken
      </p>
      <Button variant="outline" size="sm" disabled={isProcessing}>
        Dateien auswählen
      </Button>
    </div>
  );
};

export default UploadZone;
