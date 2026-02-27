import { Vacancy } from "@/data/vacancies";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin } from "lucide-react";

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
          <div key={v.id} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
            <p className="text-sm font-medium truncate">{v.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{v.location}</span>
              <Badge variant="outline" className="text-xs font-normal ml-auto">
                {v.category}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VacancySidebar;
