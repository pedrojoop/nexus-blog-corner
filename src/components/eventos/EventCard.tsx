import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Video, Zap, ExternalLink } from "lucide-react";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    day: number;
    month: string;
    time: string;
    type: 'ritual' | 'social' | 'treinamento';
    attendees: { initials: string }[];
    totalAttendees: number;
    xpReward: number;
    isOnline: boolean;
    platform?: 'meet' | 'teams';
    isConfirmed?: boolean;
    isLive?: boolean;
  };
  index: number;
  isVisible: boolean;
  onJoin?: () => void;
  onRSVP?: () => void;
}

const typeColors = {
  ritual: 'bg-primary/10 text-primary',
  social: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  treinamento: 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
};

const typeLabels = {
  ritual: 'Ritual Oficial',
  social: 'Social',
  treinamento: 'Treinamento'
};

const platformColors = {
  meet: 'bg-green-500 hover:bg-green-600',
  teams: 'bg-purple-600 hover:bg-purple-700'
};

const platformLabels = {
  meet: 'Google Meet',
  teams: 'Microsoft Teams'
};

const EventCard = ({ event, index, isVisible, onJoin, onRSVP }: EventCardProps) => {
  return (
    <div
      className="group relative"
      style={{
        animation: isVisible ? `fade-in 0.5s ease-out ${index * 0.08}s both` : 'none'
      }}
    >
      {/* Card */}
      <div className="relative bg-card/60 dark:bg-card/40 backdrop-blur-xl border border-border/40 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-primary/10 hover:-translate-y-1">
        {/* XP Badge - floating top right */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 bg-amber-400 text-amber-950 rounded-full text-xs font-bold shadow-lg">
          <Zap className="h-3 w-3" />
          +{event.xpReward} XP
        </div>

        {/* Live indicator */}
        {event.isLive && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-red-500 text-white rounded-full text-xs font-bold shadow-lg animate-pulse">
            <span className="h-2 w-2 bg-white rounded-full" />
            AO VIVO
          </div>
        )}

        <div className="flex">
          {/* Date block */}
          <div className="flex flex-col items-center justify-center w-20 bg-primary/10 dark:bg-primary/20 py-6 shrink-0">
            <span className="text-3xl font-bold text-primary">{event.day}</span>
            <span className="text-xs font-medium text-primary/80 uppercase tracking-wider">{event.month}</span>
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            {/* Type badge */}
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium mb-2 ${typeColors[event.type]}`}>
              {typeLabels[event.type]}
            </span>

            {/* Title */}
            <h3 className="font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
              {event.title}
            </h3>

            {/* Time and platform */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <span>{event.time}</span>
              {event.isOnline && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Video className="h-3 w-3" />
                    <span>{event.platform ? platformLabels[event.platform] : 'Online'}</span>
                  </div>
                </>
              )}
            </div>

            {/* Attendees */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex -space-x-1.5">
                {event.attendees.slice(0, 4).map((attendee, i) => (
                  <Avatar key={i} className="h-6 w-6 border-2 border-card">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-[9px] font-medium">
                      {attendee.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              {event.totalAttendees > 4 && (
                <span className="text-xs text-muted-foreground">
                  +{event.totalAttendees - 4} confirmados
                </span>
              )}
            </div>

            {/* Action button */}
            {event.isOnline && event.platform && (event.isConfirmed || event.isLive) ? (
              <Button
                size="sm"
                onClick={onJoin}
                className={`w-full ${platformColors[event.platform]} text-white font-medium shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5`}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Entrar Agora
              </Button>
            ) : (
              <Button
                size="sm"
                variant={event.isConfirmed ? "secondary" : "default"}
                onClick={onRSVP}
                className={`w-full ${event.isConfirmed ? '' : 'shadow-lg shadow-primary/20'} transition-all duration-300`}
              >
                {event.isConfirmed ? 'Confirmado ✓' : 'Confirmar Presença'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
