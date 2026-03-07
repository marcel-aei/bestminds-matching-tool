import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Loader2, ZoomIn, ZoomOut } from "lucide-react";
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
  const [scale, setScale] = useState(1.5); // good default for readability

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setPage(1);
    setPdf(null);
    setScale(1.5);

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
    if (!pdf || !canvasRef.current) return;

    let cancelled = false;
    const renderPage = async () => {
      const p = await pdf.getPage(page);
      if (cancelled) return;
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      const viewport = p.getViewport({ scale });

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await p.render({ canvasContext: ctx, viewport }).promise;
    };
    renderPage();
    return () => { cancelled = true; };
  }, [pdf, page, scale]);

  const zoomIn = useCallback(() => setScale(s => Math.min(s + 0.25, 4)), []);
  const zoomOut = useCallback(() => setScale(s => Math.max(s - 0.25, 0.5)), []);
  const zoomPct = Math.round(scale / 1.5 * 100);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-[95vw] h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border flex-shrink-0 bg-background">
          <DialogHeader className="p-0 border-0">
            <DialogTitle className="font-display text-sm">{candidateName}</DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={zoomOut} disabled={scale <= 0.5}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs text-muted-foreground w-12 text-center tabular-nums">{zoomPct}%</span>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={zoomIn} disabled={scale >= 4}>
              <ZoomIn className="h-4 w-4" />
            </Button>

            {numPages > 1 && (
              <>
                <div className="w-px h-5 bg-border mx-2" />
                <Button variant="outline" size="icon" className="h-8 w-8" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-xs text-muted-foreground w-12 text-center tabular-nums">{page} / {numPages}</span>
                <Button variant="outline" size="icon" className="h-8 w-8" disabled={page >= numPages} onClick={() => setPage(p => p + 1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* PDF canvas */}
        <div ref={containerRef} className="flex-1 min-h-0 overflow-auto bg-muted/40 p-6 flex justify-center">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <canvas ref={canvasRef} className="shadow-lg rounded max-w-none" />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CvViewerDialog;
