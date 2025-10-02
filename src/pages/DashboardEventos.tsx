import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, MapPin, Users, Clock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const DashboardEventos = () => {
  const headerSection = useScrollAnimation();
  const eventsSection = useScrollAnimation();

  return (
    <DashboardLayout>
      <div ref={headerSection.ref} className={`transition-all duration-700 ${headerSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Eventos</h1>
            <p className="text-muted-foreground">Participe dos eventos da empresa</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            + Criar Evento
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Buscar eventos..." 
              className="pl-10 bg-card border-border focus-visible:ring-primary/30 transition-all duration-300"
            />
          </div>
          <select className="px-4 py-2 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-300">
            <option>Todos os Tipos</option>
            <option>Social</option>
            <option>Reunião</option>
            <option>Treinamento</option>
          </select>
        </div>
      </div>

      <div ref={eventsSection.ref} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card 
          className="border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          style={{
            animation: eventsSection.isVisible ? 'slide-up 0.6s ease-out 0.1s both' : 'none'
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex flex-col items-center justify-center bg-primary text-primary-foreground rounded-lg w-16 h-16 flex-shrink-0">
                <span className="text-2xl font-bold">21</span>
                <span className="text-xs">FEV</span>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium mb-2">
                      Social
                    </span>
                    <h3 className="text-xl font-bold text-foreground">jkasdhnfoasjknao</h3>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">osdfinsojkn</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                <span>21/02/2026</span>
                <Clock className="h-4 w-4 text-primary ml-2" />
                <span>17:00 até</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>meet</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <div className="flex-1">
                  <div className="w-full bg-accent rounded-full h-2 mb-1">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '2%' }}></div>
                  </div>
                  <span className="text-xs text-muted-foreground">1/50 participantes</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground">49 vagas restantes</span>
              <Button variant="destructive" size="sm" className="transition-all duration-300">
                Sair
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardEventos;
