import { CandidateWithMatches, MatchResult } from "@/data/candidates";
import { Vacancy } from "@/data/vacancies";
import { User, ChevronDown, ChevronUp, ExternalLink, Star, Check, X, MapPin, HelpCircle, Minus, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import CvViewerDialog from "@/components/CvViewerDialog";

interface CandidateCardProps {
  candidate: CandidateWithMatches;
  vacancies: Vacancy[];
}

function getScoreColor(score: number) {
  if (score >= 60) return "bg-match-high text-white";
  if (score >= 35) return "bg-match-medium text-white";
  return "bg-match-low text-white";
}

function getScoreLabel(score: number) {
  if (score >= 60) return "Stark";
  if (score >= 35) return "Mittel";
  return "Gering";
}

function DotRating({ value }: { value: number | null }) {
  if (value === null) {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Minus key={i} className="h-2 w-2 text-border" />
        ))}
      </div>
    );
  }
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className={`h-2 w-2 rounded-full ${
            i < value
              ? value >= 4 ? "bg-match-high" : value >= 3 ? "bg-match-medium" : "bg-match-low"
              : "bg-border"
          }`}
        />
      ))}
    </div>
  );
}

function FitItem({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] text-muted-foreground leading-none w-[72px] flex-shrink-0">{label}-Fit</span>
      <DotRating value={value} />
    </div>
  );
}

function LanguageBadge({ value }: { value: boolean | null }) {
  if (value === null) return (
    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
      <HelpCircle className="h-3 w-3" /> Sprache unklar
    </span>
  );
  return value ? (
    <span className="inline-flex items-center gap-1 text-[11px] text-success">
      <Check className="h-3 w-3" /> Sprache
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-[11px] text-destructive">
      <X className="h-3 w-3" /> Sprache
    </span>
  );
}

function LocationBadge({ status }: { status: "ok" | "commutable" | "relocation_needed" | "remote_only" | "mismatch" | null }) {
  const config: Record<string, { icon: typeof Check; label: string; cls: string }> = {
    ok:                 { icon: Check,      label: "Standort passt",       cls: "text-success" },
    commutable:         { icon: MapPin,     label: "Pendelbar",            cls: "text-warning" },
    relocation_needed:  { icon: HelpCircle, label: "Umzug nötig",         cls: "text-warning" },
    remote_only:        { icon: Check,      label: "Remote",              cls: "text-success" },
    mismatch:           { icon: X,          label: "Standort passt nicht", cls: "text-destructive" },
  };

  if (!status) return (
    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
      <MapPin className="h-3 w-3" /> Keine Angabe
    </span>
  );

  const c = config[status];
  const Icon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] ${c.cls}`}>
      <Icon className="h-3 w-3" /> {c.label}
    </span>
  );
}

const CandidateCard = ({ candidate, vacancies }: CandidateCardProps) => {
  const [expanded, setExpanded] = useState(true);
  const [cvOpen, setCvOpen] = useState(false);
  const topMatches = candidate.matches.filter((m) => m.totalScore >= 60);

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 mt-0.5">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display font-semibold text-base">{candidate.name}</h3>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {candidate.cvBlobUrl && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCvOpen(true);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors bg-muted rounded px-2 py-1"
                      title="CV anzeigen"
                    >
                      <FileText className="h-3 w-3" />
                      CV
                    </button>
                  )}
                  <Badge variant="secondary" className="font-normal">
                  {candidate.matches.length} {candidate.matches.length === 1 ? "Match" : "Matches"}
                </Badge>
                {topMatches.length > 0 && (
                  <Badge className="bg-success/10 text-success border-0 font-normal">
                    <Star className="h-3 w-3 mr-1" />
                    {topMatches.length} stark
                  </Badge>
                )}
                {expanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>
            {candidate.summary && (
              <p className="text-[11px] text-muted-foreground leading-relaxed mt-1.5 flex flex-wrap gap-1">
                {candidate.summary.split(",").map((tag, i) => (
                  <span key={i} className="inline-block bg-muted rounded px-1.5 py-0.5">{tag.trim()}</span>
                ))}
              </p>
            )}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border">

          {candidate.matches.length === 0 ? (
            <div className="p-5 text-sm text-muted-foreground text-center">
              Keine passenden Vakanzen gefunden.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {candidate.matches.map((match, idx) => {
                const vacancy = vacancies.find((v) => v.id === match.vacancyId);
                const title = vacancy?.title ?? match.vacancyTitle ?? match.vacancyId;
                const ort = vacancy?.ort ?? "";
                const url = vacancy?.url ?? match.vacancyUrl ?? "";
                return (
                  <div key={`${match.vacancyId}-${idx}`} className="p-5 space-y-2.5">
                    {/* Header row */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg text-xs font-bold ${getScoreColor(match.totalScore)}`}
                      >
                        {match.totalScore}%
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-semibold text-sm truncate">{title}</h4>
                          {ort && (
                            <Badge variant="outline" className="text-[10px] font-normal flex-shrink-0 py-0 px-1.5">
                              {ort}
                            </Badge>
                          )}
                          {url && (
                            <a href={url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0">
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                        <span className="text-[10px] text-muted-foreground">{getScoreLabel(match.totalScore)}</span>
                      </div>
                    </div>

                    {/* Fits – 2×2 grid */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 pl-[52px]">
                      <FitItem label="Tech" value={match.techFit} />
                      <FitItem label="Role" value={match.roleFit} />
                      <FitItem label="Domain" value={match.domainFit} />
                      <FitItem label="Level" value={match.levelFit} />
                    </div>

                    {/* Flags */}
                    <div className="flex items-center gap-4 pl-[52px]">
                      <LanguageBadge value={match.languageMatch} />
                      <LocationBadge status={match.locationStatus} />
                    </div>

                    {/* Comment */}
                    {match.comment && (
                      <p className="text-xs text-muted-foreground leading-relaxed pl-[52px]">
                        {match.comment}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CandidateCard;
