import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Loader2, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

interface CvViewerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blobUrl: string;
  candidateName: string;
}

const ZOOM_STEPS = [0.5, 0.75, 1, 1.25, 1.5, 2, 2.5];

const CvViewerDialog = ({ open, onOpenChange, blobUrl, candidateName }: CvViewerDialogProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [zoomIdx, setZoomIdx] = useState(2); // default 100%

  const zoom = ZOOM_STEPS[zoomIdx];

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setPage(1);
    setPdf(null);
    setZoomIdx(2);

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

      const containerWidth = container.clientWidth - 32; // padding
      const viewport = p.getViewport({ scale: 1 });
      const baseScale = containerWidth / viewport.width;
      const scale = baseScale * zoom;
      const scaledViewport = p.getViewport({ scale });

      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;

      await p.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
    };
    renderPage();
  }, [pdf, page, zoom]);

  const zoomIn = useCallback(() => setZoomIdx(i => Math.min(i + 1, ZOOM_STEPS.length - 1)), []);
  const zoomOut = useCallback(() => setZoomIdx(i => Math.max(i - 1, 0)), []);
  const resetZoom = useCallback(() => setZoomIdx(2), []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[90vw] h-[85vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-4 py-3 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between gap-4">
            <DialogTitle className="font-display text-sm truncate">CV – {candidateName}</DialogTitle>

            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Zoom controls */}
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={zoomOut} disabled={zoomIdx <= 0} title="Verkleinern">
                <ZoomOut className="h-3.5 w-3.5" />
              </Button>
              <button onClick={resetZoom} className="text-[11px] text-muted-foreground w-10 text-center hover:text-foreground transition-colors" title="Zoom zurücksetzen">
                {Math.round(zoom * 100)}%
              </button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={zoomIn} disabled={zoomIdx >= ZOOM_STEPS.length - 1} title="Vergrößern">
                <ZoomIn className="h-3.5 w-3.5" />
              </Button>

              {/* Divider */}
              {numPages > 1 && <div className="w-px h-4 bg-border mx-1" />}

              {/* Page navigation */}
              {numPages > 1 && (
                <>
                  <Button variant="ghost" size="icon" className="h-7 w-7" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </Button>
                  <span className="text-[11px] text-muted-foreground w-10 text-center">{page} / {numPages}</span>
                  <Button variant="ghost" size="icon" className="h-7 w-7" disabled={page >= numPages} onClick={() => setPage(p => p + 1)}>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogHeader>

        <div ref={containerRef} className="flex-1 min-h-0 overflow-auto flex justify-center bg-muted/30 p-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <canvas ref={canvasRef} className="shadow-md rounded" />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CvViewerDialog;
