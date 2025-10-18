import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, LayoutDashboard, Kanban, Brain, GraduationCap, Trophy, Calendar, ArrowRight } from "lucide-react";

interface ProductTourProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const tourSteps = [
  {
    id: 1,
    title: "Bem-vindo ao Hub Central",
    subtitle: "Todos os seus módulos em um só lugar",
    description: "Bem-vindo ao Hub Central. Todos os seus módulos (RH, Produtividade, Cultura) em um só lugar. Comunicação e projetos coexistem.",
    icon: LayoutDashboard,
    mockupElements: [
      { type: "sidebar", items: ["Dashboard", "Chat", "Documentos", "Pessoas", "Projetos", "Eventos", "RH", "Configurações"] },
      { type: "feed", posts: 3 },
      { type: "events", count: 2 }
    ]
  },
  {
    id: 2,
    title: "Gestão Operacional",
    subtitle: "Eficiência sem trocar de plataforma",
    description: "Comece pelo básico: gerencie tarefas (Kanban), registre ponto e tickets. Sua equipe foca em produzir sem trocar de plataforma.",
    icon: Kanban,
    mockupElements: [
      { type: "kanban", columns: ["A Fazer", "Em Progresso", "Concluído"] },
      { type: "tickets", count: 5 },
      { type: "timeTracking" }
    ]
  },
  {
    id: 3,
    title: "O Problema Crítico: IA Preditiva",
    subtitle: "Identifique riscos antes que seja tarde",
    description: "Mas o problema real é o turnover. Veja como a IA identifica em tempo real quem está em Risco Alto e sugere a Prescrição de Ação.",
    icon: Brain,
    mockupElements: [
      { type: "aiDashboard", alerts: ["Risco Alto: 3 colaboradores", "Risco Médio: 7 colaboradores"] },
      { type: "predictions", insights: 4 },
      { type: "actionPlan" }
    ]
  },
  {
    id: 4,
    title: "Prevenção Proativa",
    subtitle: "Corrija o curso com dados",
    description: "Corrija o curso com os dados! O sistema automatiza a cultura (CaaS) e rastreia o conhecimento (LMS) para desenvolver o talento antes que ele decida sair.",
    icon: GraduationCap,
    mockupElements: [
      { type: "lms", courses: ["Liderança", "Comunicação", "Gestão de Tempo"] },
      { type: "caas", rituals: 3 },
      { type: "development" }
    ]
  },
  {
    id: 5,
    title: "Engajamento e Recompensa",
    subtitle: "Transforme rotina em motivação",
    description: "Finalmente, transforme a rotina em motivação. O sistema de Níveis e Metas garante que o esforço seja recompensado, fortalecendo a lealdade à sua marca.",
    icon: Trophy,
    mockupElements: [
      { type: "gamification", level: 5, xp: 2450 },
      { type: "rewards", available: 8 },
      { type: "leaderboard", top: 5 }
    ]
  }
];

export const ProductTour = ({ open, onOpenChange }: ProductTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const step = tourSteps[currentStep];

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    onOpenChange(false);
  };

  const renderMockup = () => {
    const StepIcon = step.icon;
    
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-nexus-green-lighter to-white rounded-lg border-2 border-nexus-green/20 overflow-hidden">
        {/* Mockup Header */}
        <div className="bg-nexus-green text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StepIcon className="h-6 w-6" />
            <span className="font-semibold">Nexus Community</span>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-white/30"></div>
            <div className="w-3 h-3 rounded-full bg-white/30"></div>
            <div className="w-3 h-3 rounded-full bg-white/30"></div>
          </div>
        </div>

        {/* Mockup Content */}
        <div className="p-6 h-[500px] overflow-auto">
          {currentStep === 0 && (
            <div className="grid grid-cols-12 gap-4 h-full">
              <div className="col-span-3 bg-white rounded-lg p-4 shadow-md">
                <div className="space-y-2">
                  {step.mockupElements[0].type === "sidebar" && "items" in step.mockupElements[0] && step.mockupElements[0].items?.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded hover:bg-nexus-green-lighter transition-colors">
                      <div className="w-2 h-2 rounded-full bg-nexus-green"></div>
                      <span className="text-sm text-nexus-green">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-9 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg p-4 shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-nexus-accent/20"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-nexus-green-lighter rounded w-1/3"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="grid grid-cols-3 gap-4 h-full">
              {["A Fazer", "Em Progresso", "Concluído"].map((col, i) => (
                <div key={i} className="bg-white rounded-lg p-4 shadow-md">
                  <h3 className="font-semibold text-nexus-green mb-3">{col}</h3>
                  <div className="space-y-3">
                    {[1, 2].map((card) => (
                      <div key={card} className="bg-nexus-green-lighter rounded-lg p-3 border-l-4 border-nexus-accent">
                        <div className="h-3 bg-nexus-green/30 rounded w-3/4 mb-2"></div>
                        <div className="h-2 bg-gray-300 rounded w-full"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="h-8 w-8 text-red-600" />
                  <div>
                    <h3 className="font-bold text-red-700 text-lg">Alerta de Risco Alto</h3>
                    <p className="text-red-600 text-sm">3 colaboradores identificados</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {["Colaborador A", "Colaborador B", "Colaborador C"].map((name, i) => (
                    <div key={i} className="bg-white rounded-lg p-3 border border-red-200">
                      <div className="w-12 h-12 rounded-full bg-red-100 mx-auto mb-2"></div>
                      <p className="text-sm text-center text-gray-700">{name}</p>
                      <p className="text-xs text-center text-red-600 font-semibold mt-1">Risco: 87%</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <h4 className="font-semibold text-nexus-green mb-2">Insights Preditivos</h4>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-nexus-green-lighter rounded">
                        <div className="w-2 h-2 rounded-full bg-nexus-accent"></div>
                        <div className="h-2 bg-nexus-green/30 rounded flex-1"></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <h4 className="font-semibold text-nexus-green mb-2">Prescrição de Ação</h4>
                  <div className="space-y-2">
                    {["1:1 Meeting", "Treinamento", "Reconhecimento"].map((action, i) => (
                      <div key={i} className="p-2 bg-blue-50 rounded border border-blue-200">
                        <p className="text-sm text-blue-800">{action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="h-6 w-6 text-nexus-accent" />
                  <h3 className="font-semibold text-nexus-green">Sistema LMS</h3>
                </div>
                <div className="space-y-3">
                  {["Liderança Efetiva", "Comunicação Assertiva", "Gestão de Tempo"].map((course, i) => (
                    <div key={i} className="bg-nexus-green-lighter rounded-lg p-4 border border-nexus-accent/30">
                      <p className="font-medium text-nexus-green mb-2">{course}</p>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-nexus-accent rounded-full" style={{ width: `${(i + 1) * 30}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-6 w-6 text-nexus-accent" />
                  <h3 className="font-semibold text-nexus-green">Culture as a Service</h3>
                </div>
                <div className="space-y-3">
                  {["Rituais Semanais", "Check-ins 1:1", "Feedback 360°"].map((ritual, i) => (
                    <div key={i} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="font-medium text-blue-800 mb-1">{ritual}</p>
                      <p className="text-xs text-blue-600">Automação ativa</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-nexus-green to-nexus-accent rounded-lg p-6 shadow-lg text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Seu Nível</p>
                    <h3 className="text-4xl font-bold">Nível 5</h3>
                  </div>
                  <Trophy className="h-16 w-16 opacity-80" />
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>2450 XP</span>
                    <span>3000 XP</span>
                  </div>
                  <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: "82%" }}></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <h4 className="font-semibold text-nexus-green mb-3">Recompensas Disponíveis</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-nexus-green-lighter rounded-lg p-3 text-center">
                        <div className="w-8 h-8 rounded-full bg-nexus-accent mx-auto mb-1"></div>
                        <p className="text-xs text-nexus-green">Badge {i}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <h4 className="font-semibold text-nexus-green mb-3">Leaderboard</h4>
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                        <span className="font-bold text-nexus-accent">#{i}</span>
                        <div className="w-6 h-6 rounded-full bg-nexus-green-lighter"></div>
                        <div className="flex-1 h-2 bg-nexus-green-lighter rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl h-[90vh] p-0 gap-0">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-5 w-5 text-white" />
          <span className="sr-only">Close</span>
        </button>

        {/* Content */}
        <div className="flex flex-col h-full">
          {/* Header with narration */}
          <div className="bg-nexus-green text-white p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <step.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-1">{step.title}</h2>
                <p className="text-white/80 text-lg">{step.subtitle}</p>
              </div>
              <div className="text-right">
                <span className="text-sm opacity-80">Passo {currentStep + 1} de {tourSteps.length}</span>
              </div>
            </div>
            <p className="text-white/90 text-lg leading-relaxed max-w-4xl">
              {step.description}
            </p>
          </div>

          {/* Mockup Display */}
          <div className="flex-1 p-8 bg-gray-50 overflow-auto">
            {renderMockup()}
          </div>

          {/* Navigation Footer */}
          <div className="bg-white border-t p-6 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>

            {/* Progress Dots */}
            <div className="flex gap-2">
              {tourSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentStep ? "w-8 bg-nexus-accent" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            {currentStep < tourSteps.length - 1 ? (
              <Button
                onClick={handleNext}
                className="gap-2 bg-nexus-green hover:bg-nexus-green-light"
              >
                Próximo
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleClose}
                className="gap-2 bg-nexus-accent hover:bg-nexus-accent/90"
              >
                Agendar Demonstração Completa
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
