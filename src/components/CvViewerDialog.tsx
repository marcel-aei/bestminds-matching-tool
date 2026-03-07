import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CvViewerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blobUrl: string;
  candidateName: string;
}

const CvViewerDialog = ({ open, onOpenChange, blobUrl, candidateName }: CvViewerDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[90vw] h-[85vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b border-border flex-shrink-0">
          <DialogTitle className="font-display text-base">CV – {candidateName}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 min-h-0">
          <iframe
            src={blobUrl}
            className="w-full h-full border-0 rounded-b-lg"
            title={`CV von ${candidateName}`}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CvViewerDialog;
