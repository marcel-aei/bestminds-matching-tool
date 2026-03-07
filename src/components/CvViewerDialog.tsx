import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Loader2, ZoomIn, ZoomOut, X } from "lucide-react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(1.5);
  const renderTaskRef = useRef<any>(null);

  const clampScale = (s: number) => Math.min(Math.max(s, 0.5), 4);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setPage(1);
    setPdf(null);
    setScale(1.5);

    pdfjsLib.getDocument(blobUrl).promise.then((doc) => {
      setPdf(doc);
      setNumPages(doc.numPages);
      setLoading(false);
    }).catch((err) => {
      console.error("PDF load error:", err);
      setLoading(false);
    });
  }, [open, blobUrl]);

  // Render page whenever pdf, page, or scale changes
  useEffect(() => {
    if (!pdf || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;

    // Cancel any in-progress render
    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
      renderTaskRef.current = null;
    }

    pdf.getPage(page).then((p) => {
      const viewport = p.getViewport({ scale });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const task = p.render({ canvasContext: ctx, viewport });
      renderTaskRef.current = task;
      task.promise.catch(() => {/* cancelled */});
    });
  }, [pdf, page, scale]);

  // Mouse wheel zoom
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.15 : 0.15;
        setScale((s) => clampScale(s + delta));
      }
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  const zoomPct = Math.round((scale / 1.5) * 100);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Custom DialogContent without the default close button */}
      <DialogContent className="max-w-5xl w-[95vw] h-[90vh] flex flex-col p-0 gap-0 overflow-hidden [&>button.absolute]:hidden">
        {/* Toolbar - centered controls */}
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-border flex-shrink-0 bg-background">
          <span className="font-display text-sm font-medium truncate max-w-[200px]">{candidateName}</span>

          {/* Center: zoom + page nav */}
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setScale(s => clampScale(s - 0.25))} disabled={scale <= 0.5}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <button
              onClick={() => setScale(1.5)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors w-12 text-center tabular-nums"
              title="Zoom zurücksetzen"
            >
              {zoomPct}%
            </button>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setScale(s => clampScale(s + 0.25))} disabled={scale >= 4}>
              <ZoomIn className="h-4 w-4" />
            </Button>

            {numPages > 1 && (
              <>
                <div className="w-px h-5 bg-border mx-2" />
                <Button variant="outline" size="icon" className="h-8 w-8" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-xs text-muted-foreground w-12 text-center tabular-nums">{page}/{numPages}</span>
                <Button variant="outline" size="icon" className="h-8 w-8" disabled={page >= numPages} onClick={() => setPage(p => p + 1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          {/* Right: close */}
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* PDF area */}
        <div ref={scrollRef} className="flex-1 min-h-0 overflow-auto bg-muted/40 p-6 flex justify-center items-start">
          {loading ? (
            <div className="flex items-center justify-center h-full w-full">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <canvas ref={canvasRef} className="shadow-lg rounded max-w-none" />
          )}
        </div>

        {/* Hint */}
        <div className="px-4 py-1.5 text-[10px] text-muted-foreground text-center border-t border-border bg-background">
          Ctrl + Scrollrad zum Zoomen
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CvViewerDialog;
