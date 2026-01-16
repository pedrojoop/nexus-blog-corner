import { Button } from "@/components/ui/button";
import { LayoutGrid, Calendar as CalendarIcon } from "lucide-react";

type EventType = 'all' | 'ritual' | 'social' | 'treinamento';
type ViewMode = 'grid' | 'calendar';

interface EventFiltersProps {
  selectedType: EventType;
  onTypeChange: (type: EventType) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const filterOptions: { value: EventType; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'ritual', label: 'Rituais Oficiais' },
  { value: 'social', label: 'Social' },
  { value: 'treinamento', label: 'Treinamentos' },
];

const EventFilters = ({ selectedType, onTypeChange, viewMode, onViewModeChange }: EventFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      {/* Filter chips */}
      <div className="flex items-center gap-2 flex-wrap">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onTypeChange(option.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedType === option.value
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* View toggle */}
      <div className="flex items-center bg-muted/50 rounded-xl p-1 border border-border/30">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewModeChange('grid')}
          className={`rounded-lg px-4 h-9 transition-all ${
            viewMode === 'grid' 
              ? 'bg-background shadow-sm text-foreground' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <LayoutGrid className="h-4 w-4 mr-2" />
          Grade
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewModeChange('calendar')}
          className={`rounded-lg px-4 h-9 transition-all ${
            viewMode === 'calendar' 
              ? 'bg-background shadow-sm text-foreground' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <CalendarIcon className="h-4 w-4 mr-2" />
          Calendário
        </Button>
      </div>
    </div>
  );
};

export default EventFilters;
