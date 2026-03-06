import { CandidateWithMatches, MatchResult } from "@/data/candidates";
import { Vacancy } from "@/data/vacancies";
import { User, ChevronDown, ChevronUp, ExternalLink, Star, Check, X, MapPin } from "lucide-react";
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

/** Renders 1–5 dots for a dimension */
function DotRating({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          className={`h-2.5 w-2.5 rounded-full transition-colors ${
            i < value
              ? value >= 4
                ? "bg-match-high"
                : value >= 3
                ? "bg-match-medium"
                : "bg-match-low"
              : "bg-border"
          }`}
        />
      ))}
    </div>
  );
}

function DimensionRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-muted-foreground whitespace-nowrap">{label}</span>
      <DotRating value={value} />
    </div>
  );
}

const CandidateCard = ({ candidate, vacancies }: CandidateCardProps) => {
  const [expanded, setExpanded] = useState(true);
  const topMatches = candidate.matches.filter((m) => m.totalScore >= 60);

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      {/* Candidate header */}
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
          {/* Candidate summary */}
          <div className="px-5 py-3 bg-muted/30 text-sm text-muted-foreground">
            {candidate.summary} · {candidate.experience} · {candidate.education}
          </div>

          {/* Matches */}
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
                  <div key={match.vacancyId} className="p-5">
                    {/* Top row: score + vacancy title */}
                    <div className="flex items-start gap-4 mb-3">
                      {/* Total Score */}
                      <div
                        className={`flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-lg text-sm font-bold ${getScoreColor(match.totalScore)}`}
                      >
                        {match.totalScore}%
                      </div>

                      {/* Vacancy info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-display font-semibold text-sm truncate">
                            {vacancy.title}
                          </h4>
                          <Badge variant="outline" className="text-xs font-normal flex-shrink-0">
                            {vacancy.ort}
                          </Badge>
                          {vacancy.url && (
                            <a
                              href={vacancy.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {getScoreLabel(match.totalScore)}
                        </span>
                      </div>
                    </div>

                    {/* Dimension grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2 mb-3 pl-16">
                      <DimensionRow label="Tech Fit" value={match.techFit} />
                      <DimensionRow label="Role Fit" value={match.roleFit} />
                      <DimensionRow label="Domain Fit" value={match.domainFit} />
                      <DimensionRow label="Level Fit" value={match.levelFit} />
                    </div>

                    {/* Flags row */}
                    <div className="flex items-center gap-4 mb-3 pl-16">
                      <div className="flex items-center gap-1.5 text-xs">
                        {match.languageMatch ? (
                          <Check className="h-3.5 w-3.5 text-success" />
                        ) : (
                          <X className="h-3.5 w-3.5 text-destructive" />
                        )}
                        <span className="text-muted-foreground">Sprache</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        <span
                          className={
                            match.locationStatus === "ok"
                              ? "text-success"
                              : "text-warning"
                          }
                        >
                          {match.locationStatus === "ok"
                            ? "Standort passt"
                            : match.locationStatus === "relocation"
                            ? "Umzug nötig"
                            : match.locationStatus}
                        </span>
                      </div>
                    </div>

                    {/* Comment */}
                    {match.comment && (
                      <div className="pl-16 text-xs text-muted-foreground leading-relaxed bg-muted/30 rounded-md p-3">
                        {match.comment}
                      </div>
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
