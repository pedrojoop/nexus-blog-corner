import { useState } from "react";
import { ChevronLeft, ChevronRight, Video, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalendarEvent {
  id: string;
  title: string;
  day: number;
  time: string;
  type: 'ritual' | 'social' | 'treinamento';
  xpReward: number;
  isOnline: boolean;
}

interface CalendarViewProps {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
}

const typeColors = {
  ritual: 'bg-primary/20 border-primary/40 text-primary',
  social: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-600 dark:text-emerald-400',
  treinamento: 'bg-purple-500/20 border-purple-500/40 text-purple-600 dark:text-purple-400'
};

const CalendarView = ({ events, onEventClick }: CalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getEventsForDay = (day: number) => {
    return events.filter(event => event.day === day);
  };

  const renderDays = () => {
    const days = [];
    const today = new Date();
    const isCurrentMonth = today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-28" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      const isToday = isCurrentMonth && today.getDate() === day;

      days.push(
        <div
          key={day}
          className={`h-28 border border-border/30 rounded-xl p-2 transition-all hover:border-primary/30 hover:bg-muted/30 ${
            isToday ? 'bg-primary/5 border-primary/40' : ''
          }`}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-primary' : 'text-muted-foreground'}`}>
            {day}
          </div>
          <div className="space-y-1 overflow-hidden">
            {dayEvents.slice(0, 2).map((event) => (
              <button
                key={event.id}
                onClick={() => onEventClick?.(event)}
                className={`w-full text-left px-2 py-1 rounded-md border text-[10px] font-medium truncate transition-all hover:scale-[1.02] ${typeColors[event.type]}`}
              >
                <div className="flex items-center gap-1">
                  {event.isOnline && <Video className="h-2.5 w-2.5 shrink-0" />}
                  <span className="truncate">{event.title}</span>
                </div>
              </button>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-[10px] text-muted-foreground pl-1">
                +{dayEvents.length - 2} mais
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-card/60 dark:bg-card/40 backdrop-blur-xl border border-border/40 dark:border-white/10 rounded-3xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-foreground">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevMonth}
            className="h-8 w-8 rounded-lg"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextMonth}
            className="h-8 w-8 rounded-lg"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {renderDays()}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border/30 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded bg-primary" />
          Rituais
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded bg-emerald-500" />
          Social
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded bg-purple-500" />
          Treinamentos
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
