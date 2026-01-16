import { useState, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { toast } from "sonner";
import EventHero from "@/components/eventos/EventHero";
import EventCard from "@/components/eventos/EventCard";
import EventFilters from "@/components/eventos/EventFilters";
import CalendarView from "@/components/eventos/CalendarView";
import CreateEventModal from "@/components/eventos/CreateEventModal";

type EventType = 'all' | 'ritual' | 'social' | 'treinamento';
type ViewMode = 'grid' | 'calendar';

const DashboardEventos = () => {
  const headerSection = useScrollAnimation();
  const eventsSection = useScrollAnimation();

  const [selectedType, setSelectedType] = useState<EventType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [confirmedEvents, setConfirmedEvents] = useState<string[]>(['1']);

  // Hero event (next big event)
  const heroEvent = {
    title: "All-Hands Q1 2026",
    description: "Reunião geral trimestral para alinhamento de metas e celebração de conquistas da equipe.",
    date: "21 de Fevereiro",
    time: "14:00 - 16:00",
    type: "Ritual Oficial",
    attendees: 38,
    maxAttendees: 50,
    xpReward: 100,
    isOnline: true,
    platform: 'meet' as const
  };

  // Events list
  const events = [
    {
      id: '1',
      title: "Weekly Team Sync",
      description: "Sincronização semanal do time de produto",
      day: 21,
      month: "FEV",
      time: "10:00 - 11:00",
      type: 'ritual' as const,
      attendees: [{ initials: 'PL' }, { initials: 'LM' }, { initials: 'AS' }, { initials: 'CO' }, { initials: 'MC' }],
      totalAttendees: 12,
      xpReward: 25,
      isOnline: true,
      platform: 'meet' as const,
      isLive: true
    },
    {
      id: '2',
      title: "Happy Hour Virtual",
      description: "Momento de descontração com o time",
      day: 23,
      month: "FEV",
      time: "17:00 - 18:30",
      type: 'social' as const,
      attendees: [{ initials: 'AS' }, { initials: 'JF' }, { initials: 'BA' }],
      totalAttendees: 28,
      xpReward: 50,
      isOnline: true,
      platform: 'teams' as const,
      isLive: false
    },
    {
      id: '3',
      title: "Workshop: React Avançado",
      description: "Treinamento sobre patterns avançados de React",
      day: 25,
      month: "FEV",
      time: "14:00 - 17:00",
      type: 'treinamento' as const,
      attendees: [{ initials: 'CO' }, { initials: 'RS' }, { initials: 'LM' }],
      totalAttendees: 15,
      xpReward: 150,
      isOnline: true,
      platform: 'meet' as const,
      isLive: false
    },
    {
      id: '4',
      title: "1:1 Feedback Session",
      description: "Sessão de feedback trimestral",
      day: 26,
      month: "FEV",
      time: "09:00 - 10:00",
      type: 'ritual' as const,
      attendees: [{ initials: 'PL' }, { initials: 'AS' }],
      totalAttendees: 8,
      xpReward: 30,
      isOnline: true,
      platform: 'teams' as const,
      isLive: false
    },
    {
      id: '5',
      title: "Design Sprint Review",
      description: "Review do design sprint semanal",
      day: 27,
      month: "FEV",
      time: "11:00 - 12:00",
      type: 'ritual' as const,
      attendees: [{ initials: 'JF' }, { initials: 'MC' }, { initials: 'CO' }],
      totalAttendees: 6,
      xpReward: 25,
      isOnline: true,
      platform: 'meet' as const,
      isLive: false
    },
    {
      id: '6',
      title: "Tech Talk: AI & Machine Learning",
      description: "Palestra sobre tendências de IA",
      day: 28,
      month: "FEV",
      time: "15:00 - 16:30",
      type: 'treinamento' as const,
      attendees: [{ initials: 'LM' }, { initials: 'RS' }, { initials: 'CO' }, { initials: 'MC' }],
      totalAttendees: 22,
      xpReward: 75,
      isOnline: true,
      platform: 'teams' as const,
      isLive: false
    },
  ];

  const filteredEvents = useMemo(() => {
    if (selectedType === 'all') return events;
    return events.filter(event => event.type === selectedType);
  }, [selectedType]);

  const handleRSVP = (eventId: string) => {
    if (confirmedEvents.includes(eventId)) {
      setConfirmedEvents(prev => prev.filter(id => id !== eventId));
      toast.info('Presença cancelada');
    } else {
      setConfirmedEvents(prev => [...prev, eventId]);
      toast.success('Presença confirmada! +XP será adicionado após o evento.');
    }
  };

  const handleJoinEvent = (eventId: string) => {
    toast.success('Abrindo link da reunião...');
  };

  const handleHeroRSVP = () => {
    toast.success('Presença confirmada no All-Hands! +100 XP reservado.');
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div 
          ref={headerSection.ref} 
          className={`transition-all duration-700 ${headerSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Title and Create button */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">Eventos</h1>
              <p className="text-muted-foreground mt-1">Participe e ganhe recompensas</p>
            </div>
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              <Plus className="h-4 w-4 mr-2" />
              Criar Evento
            </Button>
          </div>

          {/* Hero Event */}
          <EventHero event={heroEvent} onRSVP={handleHeroRSVP} />

          {/* Filters */}
          <EventFilters
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>

        {/* Content */}
        <div ref={eventsSection.ref}>
          {viewMode === 'grid' ? (
            /* Events Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={{
                    ...event,
                    isConfirmed: confirmedEvents.includes(event.id)
                  }}
                  index={index}
                  isVisible={eventsSection.isVisible}
                  onRSVP={() => handleRSVP(event.id)}
                  onJoin={() => handleJoinEvent(event.id)}
                />
              ))}
            </div>
          ) : (
            /* Calendar View */
            <CalendarView
              events={filteredEvents.map(e => ({
                id: e.id,
                title: e.title,
                day: e.day,
                time: e.time,
                type: e.type,
                xpReward: e.xpReward,
                isOnline: e.isOnline
              }))}
            />
          )}

          {/* Empty state */}
          {filteredEvents.length === 0 && viewMode === 'grid' && (
            <div className="text-center py-16">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
                <Plus className="relative h-14 w-14 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground text-lg mb-2">Nenhum evento encontrado</p>
              <p className="text-sm text-muted-foreground/70">Tente outro filtro ou crie um novo evento</p>
            </div>
          )}
        </div>

        {/* Create Event Modal */}
        <CreateEventModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardEventos;
