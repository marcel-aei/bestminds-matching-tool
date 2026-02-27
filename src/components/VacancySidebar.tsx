import { Vacancy } from "@/data/vacancies";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, ExternalLink } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface VacancySidebarProps {
  vacancies: Vacancy[];
}

const VacancySidebar = ({ vacancies }: VacancySidebarProps) => {
  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="font-display font-semibold text-sm mb-4 flex items-center gap-2">
        <Briefcase className="h-4 w-4 text-primary" />
        Aktive Vakanzen ({vacancies.length})
      </h3>
      <div className="space-y-3">
        {vacancies.map((v) => (
          <Popover key={v.id}>
            <PopoverTrigger asChild>
              <button className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                <p className="text-sm font-medium truncate">{v.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{v.location}</span>
                  <Badge variant="outline" className="text-xs font-normal ml-auto">
                    {v.category}
                  </Badge>
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent side="left" align="start" className="w-80">
              <div className="space-y-3">
                <h4 className="font-display font-semibold text-sm">{v.title}</h4>
                <p className="text-xs text-muted-foreground">{v.description}</p>
                <div>
                  <p className="text-xs font-medium mb-1">Anforderungen:</p>
                  <ul className="text-xs text-muted-foreground space-y-0.5">
                    {v.requirements.slice(0, 3).map((r, i) => (
                      <li key={i}>• {r}</li>
                    ))}
                  </ul>
                </div>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={v.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3.5 w-3.5 mr-2" />
                    Auf valentum.de ansehen
                  </a>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  );
};

export default VacancySidebar;
