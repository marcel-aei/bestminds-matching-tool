import { CandidateWithMatches } from "@/data/candidates";
import { Vacancy } from "@/data/vacancies";
import { User, ChevronDown, ChevronUp, ExternalLink, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface CandidateCardProps {
  candidate: CandidateWithMatches;
  vacancies: Vacancy[];
}

function getScoreColor(score: number) {
  if (score >= 70) return "bg-match-high text-white";
  if (score >= 40) return "bg-match-medium text-white";
  return "bg-match-low text-white";
}

function getScoreLabel(score: number) {
  if (score >= 70) return "Stark";
  if (score >= 40) return "Mittel";
  return "Gering";
}

const CandidateCard = ({ candidate, vacancies }: CandidateCardProps) => {
  const [expanded, setExpanded] = useState(true);
  const topMatches = candidate.matches.filter((m) => m.score >= 40);

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
          {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
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
                  <div key={match.vacancyId} className="flex items-start gap-4 p-5">
                    {/* Score */}
                    <div className={`flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-lg text-sm font-bold ${getScoreColor(match.score)}`}>
                      {match.score}%
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-display font-semibold text-sm truncate">{vacancy.title}</h4>
                        <Badge variant="outline" className="text-xs font-normal flex-shrink-0">
                          {vacancy.location}
                        </Badge>
                        {vacancy.url && (
                          <a href={vacancy.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{match.reasoning}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {match.matchedSkills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs font-normal bg-accent text-accent-foreground">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Score label */}
                    <div className="flex-shrink-0">
                      <span className="text-xs text-muted-foreground">{getScoreLabel(match.score)}</span>
                    </div>
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
