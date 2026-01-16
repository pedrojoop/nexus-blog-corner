import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

interface PeopleFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDepartments: string[];
  onDepartmentToggle: (department: string) => void;
  selectedSkills: string[];
  onSkillToggle: (skill: string) => void;
  departments: string[];
  skills: string[];
  onClearFilters: () => void;
}

const PeopleFilters = ({
  searchQuery,
  onSearchChange,
  selectedDepartments,
  onDepartmentToggle,
  selectedSkills,
  onSkillToggle,
  departments,
  skills,
  onClearFilters
}: PeopleFiltersProps) => {
  const hasActiveFilters = selectedDepartments.length > 0 || selectedSkills.length > 0;

  return (
    <div className="relative">
      {/* Floating search bar */}
      <div className="relative bg-card/80 dark:bg-card/60 backdrop-blur-xl rounded-2xl border border-border/40 dark:border-white/10 p-2 shadow-lg shadow-black/5 dark:shadow-black/20">
        <div className="flex items-center gap-2">
          {/* Search input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, cargo ou habilidades..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-11 bg-background/50 border-0 rounded-xl text-sm focus-visible:ring-1 focus-visible:ring-primary/30"
            />
          </div>

          {/* Filter button */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`h-11 px-4 rounded-xl border-border/50 transition-all ${hasActiveFilters ? 'bg-primary/10 border-primary/30 text-primary' : ''}`}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtros
                {hasActiveFilters && (
                  <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px]">
                    {selectedDepartments.length + selectedSkills.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
              <div className="space-y-4">
                {/* Departments */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Departamento</h4>
                  <div className="space-y-2">
                    {departments.map((dept) => (
                      <label
                        key={dept}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <Checkbox
                          checked={selectedDepartments.includes(dept)}
                          onCheckedChange={() => onDepartmentToggle(dept)}
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {dept}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Habilidades</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={selectedSkills.includes(skill) ? "default" : "outline"}
                        className={`cursor-pointer transition-all ${
                          selectedSkills.includes(skill)
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-primary/10 hover:border-primary/30'
                        }`}
                        onClick={() => onSkillToggle(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Clear filters */}
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearFilters}
                    className="w-full text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Limpar filtros
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Active filter tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/30">
            {selectedDepartments.map((dept) => (
              <Badge
                key={dept}
                variant="secondary"
                className="pl-2.5 pr-1.5 py-1 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                onClick={() => onDepartmentToggle(dept)}
              >
                {dept}
                <X className="h-3 w-3 ml-1.5" />
              </Badge>
            ))}
            {selectedSkills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="pl-2.5 pr-1.5 py-1 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                onClick={() => onSkillToggle(skill)}
              >
                {skill}
                <X className="h-3 w-3 ml-1.5" />
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PeopleFilters;
