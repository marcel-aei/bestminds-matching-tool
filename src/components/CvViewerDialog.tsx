import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

interface CvViewerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blobUrl: string;
  candidateName: string;
}

const CvViewerDialog = ({ open, onOpenChange, blobUrl, candidateName }: CvViewerDialogProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setPage(1);
    setPdf(null);

    const loadPdf = async () => {
      try {
        const doc = await pdfjsLib.getDocument(blobUrl).promise;
        setPdf(doc);
        setNumPages(doc.numPages);
      } catch (err) {
        console.error("PDF load error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPdf();
  }, [open, blobUrl]);

  useEffect(() => {
    if (!pdf || !canvasRef.current || !containerRef.current) return;

    const renderPage = async () => {
      const p = await pdf.getPage(page);
      const container = containerRef.current!;
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;

      const containerWidth = container.clientWidth;
      const viewport = p.getViewport({ scale: 1 });
      const scale = containerWidth / viewport.width;
      const scaledViewport = p.getViewport({ scale });

      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;

      await p.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
    };
    renderPage();
  }, [pdf, page]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[90vw] h-[85vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-display text-base">CV – {candidateName}</DialogTitle>
            {numPages > 1 && (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-7 w-7" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-xs text-muted-foreground">{page} / {numPages}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7" disabled={page >= numPages} onClick={() => setPage(p => p + 1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </DialogHeader>
        <div ref={containerRef} className="flex-1 min-h-0 overflow-auto flex justify-center bg-muted/30 p-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <canvas ref={canvasRef} className="max-w-full shadow-md rounded" />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CvViewerDialog;
