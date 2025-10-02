import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Users, Code } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const DashboardProjetos = () => {
  const headerSection = useScrollAnimation();
  const projectsSection = useScrollAnimation();

  return (
    <DashboardLayout>
      <div ref={headerSection.ref} className={`transition-all duration-700 ${headerSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Projetos</h1>
            <p className="text-muted-foreground">Gerencie seus projetos</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            + Criar Projeto
          </Button>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Buscar projetos..." 
            className="pl-10 bg-card border-border focus-visible:ring-primary/30 transition-all duration-300"
          />
        </div>
      </div>

      <div ref={projectsSection.ref} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card 
          className="border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
          style={{
            animation: projectsSection.isVisible ? 'slide-up 0.6s ease-out 0.1s both' : 'none'
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">asfasf</h3>
                <span className="inline-block px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                  Não Iniciado
                </span>
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm mb-4">sadfdsafas</p>
            
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                <span>Início: 10/10/2026</span>
                <span className="mx-2">•</span>
                <span>Fim: 10/12/2026</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-primary">Prazo: em cerca de 1 ano</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                <span>1 participante</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Code className="h-4 w-4 text-primary" />
                <span className="px-2 py-1 bg-accent rounded text-xs">react</span>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              Criado em 10/10/2026
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1 hover:bg-accent transition-colors">
                Abrir Kanban
              </Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90 transition-colors">
                Ver detalhes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardProjetos;
