import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, Video, Users, Zap } from "lucide-react";
import { useState, useEffect } from "react";

interface EventHeroProps {
  event: {
    title: string;
    description: string;
    date: string;
    time: string;
    type: string;
    attendees: number;
    maxAttendees: number;
    xpReward: number;
    isOnline: boolean;
    platform?: 'meet' | 'teams';
  };
  onRSVP: () => void;
}

const EventHero = ({ event, onRSVP }: EventHeroProps) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 30, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-8 mb-8">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-4">
          <Zap className="h-4 w-4" />
          Próximo Grande Evento
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          {/* Left content */}
          <div className="flex-1">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">{event.title}</h2>
            <p className="text-white/80 text-lg mb-6 max-w-xl">{event.description}</p>

            {/* Event meta */}
            <div className="flex flex-wrap items-center gap-4 text-white/90 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{event.time}</span>
              </div>
              {event.isOnline && (
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  <span className="text-sm">Online</span>
                </div>
              )}
            </div>

            {/* Attendees */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex -space-x-2">
                {['PL', 'LM', 'AS', 'CO'].map((initials, i) => (
                  <Avatar key={i} className="h-8 w-8 border-2 border-primary ring-0">
                    <AvatarFallback className="bg-white text-primary text-xs font-medium">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-white/80 text-sm">
                +{event.attendees} confirmados
              </span>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                onClick={onRSVP}
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold shadow-xl shadow-black/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5"
              >
                <Users className="h-4 w-4 mr-2" />
                Confirmar Presença
              </Button>
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-400/20 backdrop-blur-sm rounded-full">
                <Zap className="h-4 w-4 text-amber-300" />
                <span className="text-amber-100 font-semibold">+{event.xpReward} XP</span>
              </div>
            </div>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="text-center px-3">
              <div className="text-3xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-xs text-white/60 uppercase tracking-wide">Horas</div>
            </div>
            <div className="text-2xl font-bold text-white/40">:</div>
            <div className="text-center px-3">
              <div className="text-3xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-xs text-white/60 uppercase tracking-wide">Min</div>
            </div>
            <div className="text-2xl font-bold text-white/40">:</div>
            <div className="text-center px-3">
              <div className="text-3xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-xs text-white/60 uppercase tracking-wide">Seg</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventHero;
