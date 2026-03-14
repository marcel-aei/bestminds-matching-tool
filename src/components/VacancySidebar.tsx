import { Vacancy } from "@/data/vacancies";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, ExternalLink, Loader2, User, Mail } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface VacancySidebarProps {
  vacancies: Vacancy[];
  isLoading?: boolean;
}

const VacancySidebar = ({ vacancies, isLoading }: VacancySidebarProps) => {
  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="font-display font-semibold text-sm mb-4 flex items-center gap-2">
        <Briefcase className="h-4 w-4 text-primary" />
        Aktive Vakanzen ({isLoading ? "…" : vacancies.length})
      </h3>

      {isLoading ? (
        <div className="flex items-center justify-center py-8 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
          <span className="text-sm">Vakanzen werden geladen…</span>
        </div>
      ) : vacancies.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          Keine Vakanzen verfügbar.
        </p>
      ) : (
        <div className="space-y-3 max-h-[70vh] overflow-y-auto">
          {vacancies.map((v) => (
            <Popover key={v.id}>
              <PopoverTrigger asChild>
                <button className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                  <p className="text-sm font-medium truncate">{v.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{v.ort}</span>
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent side="left" align="start" className="w-80 max-h-96 overflow-y-auto">
                <div className="space-y-3">
                  <h4 className="font-display font-semibold text-sm">{v.title}</h4>
                  {v.aufgabengebiet && (
                    <div>
                      <p className="text-xs font-medium mb-1">Aufgabengebiet:</p>
                      <p className="text-xs text-muted-foreground whitespace-pre-line line-clamp-6">
                        {v.aufgabengebiet}
                      </p>
                    </div>
                  )}
                  {v.profil && (
                    <div>
                      <p className="text-xs font-medium mb-1">Profil:</p>
                      <p className="text-xs text-muted-foreground whitespace-pre-line line-clamp-6">
                        {v.profil}
                      </p>
                    </div>
                  )}
                  {(v.ansprechpartner_name || v.ansprechpartner_email) && (() => {
                    const names = v.ansprechpartner_name ? v.ansprechpartner_name.split(",").map(s => s.trim()).filter(Boolean) : [];
                    const emails = v.ansprechpartner_email ? v.ansprechpartner_email.split(",").map(s => s.trim()).filter(Boolean) : [];
                    const count = Math.max(names.length, emails.length);
                    return (
                      <div className="border-t border-border pt-2">
                        <p className="text-xs font-medium mb-1">Ansprechpartner:</p>
                        {Array.from({ length: count }).map((_, i) => (
                          <div key={i} className={i > 0 ? "mt-1.5" : ""}>
                            {names[i] && (
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <User className="h-3 w-3" />
                                <span>{names[i]}</span>
                              </div>
                            )}
                            {emails[i] && (
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                                <Mail className="h-3 w-3" />
                                <a href={`mailto:${emails[i]}`} className="hover:text-primary transition-colors underline">
                                  {emails[i]}
                                </a>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                  {v.url && (
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a href={v.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3.5 w-3.5 mr-2" />
                        Auf valentum.de ansehen
                      </a>
                    </Button>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      )}
    </div>
  );
};

export default VacancySidebar;
