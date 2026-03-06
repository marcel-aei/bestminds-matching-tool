import { CandidateWithMatches, MatchResult } from "@/data/candidates";
import { Vacancy } from "@/data/vacancies";
import { User, ChevronDown, ChevronUp, ExternalLink, Star, Check, X, MapPin, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

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
  if (value === null) return <span className="text-[10px] text-muted-foreground">n/a</span>;
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

function LocationBadge({ status }: { status: string | null }) {
  if (!status) return (
    <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
      <HelpCircle className="h-3 w-3" /> unbekannt
    </span>
  );
  const map: Record<string, { label: string; cls: string }> = {
    ok: { label: "Standort ✓", cls: "text-success" },
    remote_unclear: { label: "Remote unklar", cls: "text-warning" },
    mismatch: { label: "Standort ✗", cls: "text-destructive" },
  };
  const info = map[status] ?? { label: status, cls: "text-muted-foreground" };
  return <span className={`text-[10px] font-medium ${info.cls}`}>{info.label}</span>;
}

const CandidateCard = ({ candidate, vacancies }: CandidateCardProps) => {
  const [expanded, setExpanded] = useState(true);
  const topMatches = candidate.matches.filter((m) => m.totalScore >= 60);

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-base">{candidate.name}</h3>
            <p className="text-sm text-muted-foreground">{candidate.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
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
      </button>

      {expanded && (
        <div className="border-t border-border">
          <div className="px-5 py-3 bg-muted/30 text-sm text-muted-foreground">
            {candidate.summary} · {candidate.experience} · {candidate.education}
          </div>

          {candidate.matches.length === 0 ? (
            <div className="p-5 text-sm text-muted-foreground text-center">
              Keine passenden Vakanzen gefunden.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {candidate.matches.map((match) => {
                const vacancy = vacancies.find((v) => v.id === match.vacancyId);
                if (!vacancy) return null;
                return (
                  <div key={match.vacancyId} className="p-5 space-y-3">
                    {/* Header row */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg text-xs font-bold ${getScoreColor(match.totalScore)}`}
                      >
                        {match.totalScore}%
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-semibold text-sm truncate">{vacancy.title}</h4>
                          <Badge variant="outline" className="text-[10px] font-normal flex-shrink-0 py-0 px-1.5">
                            {vacancy.ort}
                          </Badge>
                          {vacancy.url && (
                            <a href={vacancy.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0">
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] text-muted-foreground flex-shrink-0">{getScoreLabel(match.totalScore)}</span>
                    </div>

                    {/* Compact dimensions + flags in one row */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pl-[52px]">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-muted-foreground w-12">Tech</span>
                        <DotRating value={match.techFit} />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-muted-foreground w-12">Role</span>
                        <DotRating value={match.roleFit} />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-muted-foreground w-12">Domain</span>
                        <DotRating value={match.domainFit} />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-muted-foreground w-12">Level</span>
                        <DotRating value={match.levelFit} />
                      </div>
                      <div className="flex items-center gap-1 border-l border-border pl-3">
                        {match.languageMatch === null ? (
                          <HelpCircle className="h-3 w-3 text-muted-foreground" />
                        ) : match.languageMatch ? (
                          <Check className="h-3 w-3 text-success" />
                        ) : (
                          <X className="h-3 w-3 text-destructive" />
                        )}
                        <span className="text-[10px] text-muted-foreground">Sprache</span>
                      </div>
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
