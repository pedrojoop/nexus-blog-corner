import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, LayoutDashboard, Kanban, Brain, GraduationCap, Trophy, Calendar, ArrowRight, Users, Heart, BarChart3, Target, MousePointerClick, TrendingDown, Plus } from "lucide-react";

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
    title: "Inteligência Preditiva: O Centro de Comando",
    subtitle: "Identifique riscos antes que seja tarde",
    description: "O problema real é o turnover. A IA identifica em tempo real quem está em Risco Alto, falhas culturais e gaps críticos de sucessão - tudo em um só dashboard.",
    icon: Brain,
    mockupElements: [
      { type: "aiDashboard", alerts: ["Risco Alto: 3 colaboradores", "Falhas Culturais: 2 departamentos", "Gaps de Sucessão: 4 skills"] },
      { type: "predictions", insights: 4 },
      { type: "actionPlan" },
      { type: "succession", criticalSkills: 4 }
    ]
  },
  {
    id: 4,
    title: "LMS + CaaS: Prevenção Automatizada",
    subtitle: "Desenvolva talentos e automatize cultura",
    description: "Previna turnover com dados! O LMS rastreia treinamentos e detecta abandono. O CaaS automatiza rituais culturais e mede impacto real no engajamento.",
    icon: GraduationCap,
    mockupElements: [
      { type: "lms", courses: ["Liderança", "Comunicação", "Gestão de Tempo"], abandonmentAlert: true },
      { type: "caas", rituals: 3, builder: true },
      { type: "cultureImpact" }
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
  const [subStep, setSubStep] = useState(0);
  const [clickedHotspots, setClickedHotspots] = useState<string[]>([]);
  const step = tourSteps[currentStep];

  const handleHotspotClick = (hotspotId: string) => {
    if (!clickedHotspots.includes(hotspotId)) {
      setClickedHotspots([...clickedHotspots, hotspotId]);
    }
    setSubStep(subStep + 1);
  };

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setSubStep(0);
      setClickedHotspots([]);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSubStep(0);
      setClickedHotspots([]);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    setSubStep(0);
    setClickedHotspots([]);
    onOpenChange(false);
  };

  const Hotspot = ({ id, className, children, tooltip }: { id: string; className?: string; children?: React.ReactNode; tooltip?: string }) => {
    const isClicked = clickedHotspots.includes(id);
    return (
      <div 
        className={`absolute cursor-pointer group ${className}`}
        onClick={() => handleHotspotClick(id)}
      >
        {!isClicked && (
          <>
            <div className="absolute inset-0 bg-nexus-accent/10 border-2 border-nexus-accent rounded-lg animate-pulse hover:bg-nexus-accent/20 transition-all"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-nexus-accent rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <MousePointerClick className="h-3 w-3 text-white" />
            </div>
          </>
        )}
        {tooltip && !isClicked && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-nexus-green text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl pointer-events-none z-10">
            {tooltip}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-nexus-green rotate-45"></div>
          </div>
        )}
        {children}
      </div>
    );
  };

  const renderMockup = () => {
    const StepIcon = step.icon;
    
    return (
      <div className="relative w-full h-full bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-2xl">
        {/* Browser Chrome */}
        <div className="bg-gray-100 px-4 py-2 flex items-center gap-3 border-b border-gray-300">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-gray-600 border border-gray-300">
            app.nexuscommunity.com
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <StepIcon className="h-4 w-4" />
          </div>
        </div>

        {/* Mockup Content */}
        <div className="h-[500px] overflow-auto bg-gray-50">
          {currentStep === 0 && (
            <div className="grid grid-cols-12 gap-0 h-full">
              {/* Sidebar */}
              <div className="col-span-3 bg-nexus-green text-white p-6 h-full border-r border-nexus-green-light">
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-1">Nexus Community</h2>
                  <p className="text-xs text-white/70">Sua Empresa S.A.</p>
                </div>
                <div className="space-y-1 relative">
                  {step.mockupElements[0].type === "sidebar" && "items" in step.mockupElements[0] && step.mockupElements[0].items?.map((item, i) => (
                    <div 
                      key={i} 
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer ${
                        i === 0 ? 'bg-nexus-accent text-white' : 'hover:bg-white/10'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/50'}`}></div>
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                  {subStep === 0 && (
                    <Hotspot 
                      id="step0-menu-projetos" 
                      className="top-24 left-0 right-0 h-10"
                      tooltip="Clique para explorar Projetos"
                    />
                  )}
                </div>
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-3 px-3">
                    <div className="w-8 h-8 rounded-full bg-nexus-accent"></div>
                    <div>
                      <p className="text-sm font-medium">Você</p>
                      <p className="text-xs text-white/70">Online</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="col-span-9 p-6 bg-white">
                {/* Header */}
                <div className="mb-6 pb-4 border-b">
                  <h1 className="text-2xl font-bold text-nexus-green mb-1">Feed Principal</h1>
                  <p className="text-sm text-gray-600">Todas as atualizações da sua empresa em um só lugar</p>
                </div>

                {/* Create Post */}
                <div className="bg-white border-2 border-nexus-accent/30 rounded-xl p-4 mb-4 shadow-sm relative">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-nexus-accent to-nexus-green"></div>
                    <input 
                      type="text" 
                      placeholder="Compartilhe algo com a equipe..."
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm"
                      disabled
                    />
                  </div>
                  {subStep === 1 && (
                    <Hotspot 
                      id="step0-create-post" 
                      className="inset-0"
                      tooltip="Compartilhe atualizações com a equipe"
                    />
                  )}
                </div>

                {/* Posts */}
                <div className="space-y-4 relative">
                  {[
                    { user: "Maria Silva", role: "Product Manager", content: "Ótima reunião hoje! Vamos focar nas melhorias do Q2 🚀", time: "há 2h", likes: 12, comments: 5 },
                    { user: "João Santos", role: "Tech Lead", content: "Deploy da nova feature foi um sucesso! Parabéns ao time 🎉", time: "há 5h", likes: 24, comments: 8 },
                    { user: "Ana Costa", role: "HR Manager", content: "Lembrete: Evento de team building na sexta-feira às 15h", time: "há 1d", likes: 18, comments: 12 }
                  ].map((post, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-nexus-accent to-nexus-green flex items-center justify-center text-white font-bold">
                          {post.user[0]}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-nexus-green">{post.user}</h3>
                          <p className="text-xs text-gray-500">{post.role} · {post.time}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{post.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <button className="flex items-center gap-1 hover:text-nexus-accent transition-colors">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-nexus-accent transition-colors">
                          <span>💬 {post.comments}</span>
                        </button>
                      </div>
                      {i === 0 && subStep === 2 && (
                        <Hotspot 
                          id="step0-like-post" 
                          className="inset-0"
                          tooltip="Interaja com publicações da equipe"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="p-6 h-full bg-gradient-to-br from-gray-50 to-white">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-nexus-green mb-2">Projeto: Redesign da Plataforma</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    5 membros
                  </span>
                  <span>Sprint 12</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    No Prazo
                  </span>
                </div>
              </div>

              {/* Kanban Board */}
              <div className="grid grid-cols-3 gap-4 h-[400px] relative">
                {[
                  { title: "A Fazer", count: 8, color: "gray", tasks: [
                    { title: "Pesquisa de UX", assignee: "MS", priority: "high", tags: ["Research", "UX"] },
                    { title: "Definir paleta de cores", assignee: "AC", priority: "medium", tags: ["Design"] }
                  ]},
                  { title: "Em Progresso", count: 5, color: "blue", tasks: [
                    { title: "Implementar novo header", assignee: "JS", priority: "high", tags: ["Frontend", "React"] },
                    { title: "API de notificações", assignee: "PL", priority: "high", tags: ["Backend"] }
                  ]},
                  { title: "Concluído", count: 12, color: "green", tasks: [
                    { title: "Setup do ambiente", assignee: "JS", priority: "medium", tags: ["DevOps"] },
                    { title: "Wireframes aprovados", assignee: "MS", priority: "low", tags: ["Design"] }
                  ]}
                ].map((col, i) => (
                  <div key={i} className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm flex flex-col relative">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b">
                      <h3 className="font-bold text-gray-700 flex items-center gap-2">
                        {col.title}
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{col.count}</span>
                      </h3>
                      <button className="text-gray-400 hover:text-nexus-accent">+</button>
                    </div>
                    <div className="space-y-3 flex-1 overflow-auto">
                      {col.tasks.map((task, j) => (
                        <div 
                          key={j} 
                          className="bg-white border-2 border-gray-200 rounded-lg p-3 hover:border-nexus-accent hover:shadow-md transition-all cursor-pointer group relative"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-sm text-gray-800 flex-1">{task.title}</h4>
                            <div className={`w-2 h-2 rounded-full ${
                              task.priority === 'high' ? 'bg-red-500' : 
                              task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}></div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-1">
                              {task.tags.map((tag, k) => (
                                <span key={k} className="text-xs bg-nexus-green-lighter text-nexus-green px-2 py-0.5 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-nexus-accent to-nexus-green flex items-center justify-center text-white text-xs font-bold">
                              {task.assignee}
                            </div>
                          </div>
                          {i === 0 && j === 0 && subStep === 0 && (
                            <Hotspot 
                              id="step1-task-drag" 
                              className="inset-0"
                              tooltip="Arraste tarefas entre colunas"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-4 relative">
                <div className="bg-white border border-gray-200 rounded-lg p-3 relative">
                  <p className="text-xs text-gray-500 mb-1">Tickets Abertos</p>
                  <p className="text-2xl font-bold text-nexus-green">23</p>
                  {subStep === 1 && (
                    <Hotspot 
                      id="step1-tickets" 
                      className="inset-0"
                      tooltip="Acompanhe métricas em tempo real"
                    />
                  )}
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Tempo Médio</p>
                  <p className="text-2xl font-bold text-nexus-green">4.2h</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Taxa de Conclusão</p>
                  <p className="text-2xl font-bold text-nexus-accent">87%</p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="p-6 h-full bg-gradient-to-br from-gray-50 to-white">
              {/* Critical Alert Banner */}
              <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl p-6 mb-6 shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Brain className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-1">Alerta Crítico: Risco de Turnover</h2>
                    <p className="text-white/90">IA identificou 3 colaboradores em risco alto de desligamento</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">87%</div>
                    <div className="text-sm text-white/80">Acurácia</div>
                  </div>
                </div>
              </div>

              {/* At-Risk Employees Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6 relative">
                {[
                  { name: "Carlos Mendes", role: "Desenvolvedor Sr.", risk: 92, factors: ["Horas extras", "Baixo engajamento", "Sem 1:1s"] },
                  { name: "Patrícia Lima", role: "Designer UX", risk: 85, factors: ["Feedback negativo", "Ausências", "Baixa produção"] },
                  { name: "Roberto Silva", role: "Analista QA", risk: 78, factors: ["Isolamento", "Sem reconhecimento", "Metas atrasadas"] }
                ].map((person, i) => (
                  <div key={i} className="bg-white border-2 border-red-200 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow relative">
                    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-red-100">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{person.name}</h3>
                        <p className="text-xs text-gray-500">{person.role}</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-gray-600">Risco de Saída</span>
                        <span className="text-lg font-bold text-red-600">{person.risk}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                          style={{ width: `${person.risk}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-gray-700 mb-1">Fatores Identificados:</p>
                      {person.factors.map((factor, j) => (
                        <div key={j} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">
                          • {factor}
                        </div>
                      ))}
                    </div>
                    {i === 0 && subStep === 0 && (
                      <Hotspot 
                        id="step2-risk-employee" 
                        className="inset-0"
                        tooltip="Veja detalhes dos colaboradores em risco"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* AI Insights & Actions */}
              <div className="grid grid-cols-2 gap-4 mb-4 relative">
                <div className="bg-white border-2 border-nexus-accent rounded-xl p-5 shadow-md relative">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-nexus-accent/20 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-nexus-accent" />
                    </div>
                    <h3 className="font-bold text-nexus-green text-lg">Insights da IA</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { insight: "Aumento de 35% nas horas extras nas últimas 4 semanas", severity: "high" },
                      { insight: "Queda de 42% na participação em eventos da empresa", severity: "high" },
                      { insight: "Ausência de 1:1s com gestores por mais de 60 dias", severity: "critical" },
                      { insight: "Redução de 28% nas interações no feed social", severity: "medium" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className={`w-2 h-2 rounded-full mt-1 ${
                          item.severity === 'critical' ? 'bg-red-500' :
                          item.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                        }`}></div>
                        <p className="text-sm text-gray-700 flex-1">{item.insight}</p>
                      </div>
                    ))}
                  </div>
                  {subStep === 1 && (
                    <Hotspot 
                      id="step2-insights" 
                      className="inset-0"
                      tooltip="Analise insights detalhados da IA"
                    />
                  )}
                </div>

                <div className="bg-gradient-to-br from-nexus-green to-nexus-accent text-white rounded-xl p-5 shadow-md relative">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <Target className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-lg">Plano de Ação Recomendado</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { action: "Agendar 1:1 com gestor imediato", priority: "Urgente", days: "Hoje" },
                      { action: "Oferecer treinamento em gestão de tempo", priority: "Alta", days: "Esta semana" },
                      { action: "Reconhecimento público no próximo All-Hands", priority: "Alta", days: "Próxima semana" },
                      { action: "Revisar carga de trabalho e redistribuir tarefas", priority: "Média", days: "15 dias" }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold">{item.priority}</span>
                          <span className="text-xs bg-white/20 px-2 py-0.5 rounded">{item.days}</span>
                        </div>
                        <p className="text-sm">{item.action}</p>
                      </div>
                    ))}
                  </div>
                  {subStep === 2 && (
                    <Hotspot 
                      id="step2-action-plan" 
                      className="inset-0"
                      tooltip="Execute o plano de ação recomendado"
                    />
                  )}
                </div>
              </div>

              {/* Succession Planning Alert */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-xl p-5 shadow-md relative">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-orange-900 mb-1">Alerta: Gap Crítico no Talent-Grid</h3>
                    <p className="text-sm text-orange-700">4 skills críticas em risco de perda. Plano de sucessão necessário.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    {[
                      { skill: "React/TS", risk: "Alto" },
                      { skill: "DevOps", risk: "Crítico" }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/60 rounded-lg p-2 border border-orange-200">
                        <p className="text-xs font-semibold text-orange-900">{item.skill}</p>
                        <p className={`text-xs ${item.risk === 'Crítico' ? 'text-red-600' : 'text-orange-600'} font-bold`}>
                          {item.risk}
                        </p>
                      </div>
                    ))}
                  </div>
                  {subStep === 3 && (
                    <Hotspot 
                      id="step2-succession" 
                      className="inset-0"
                      tooltip="Visualize gaps de sucessão"
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="p-6 h-full bg-gradient-to-br from-gray-50 to-white">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-nexus-green mb-2">LMS + CaaS: Prevenção Automatizada</h1>
                <p className="text-gray-600">Desenvolva talentos e automatize cultura para prevenir turnover</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* LMS Section */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-nexus-accent to-nexus-green text-white rounded-xl p-5 shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h2 className="font-bold text-lg">Learning Management</h2>
                        <p className="text-white/80 text-xs">Treinamentos com IA</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                      <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                        <p className="text-2xl font-bold">89</p>
                        <p className="text-xs text-white/80">Alunos</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                        <p className="text-2xl font-bold">73%</p>
                        <p className="text-xs text-white/80">Conclusão</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                        <p className="text-2xl font-bold text-red-200">16%</p>
                        <p className="text-xs text-white/80">Abandono</p>
                      </div>
                    </div>
                  </div>

                  {/* Critical Alert - Abandonment */}
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 rounded-xl p-4 shadow-md relative">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      </div>
                      <h3 className="font-bold text-red-900 text-sm">Alerta: Alta Taxa de Abandono</h3>
                    </div>
                    <p className="text-xs text-red-700 mb-3">
                      Curso "Gestão de Tempo" com <strong>35% de abandono</strong> detectado pela IA
                    </p>
                    <div className="flex gap-2">
                      <button className="text-xs bg-white border border-red-300 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 font-medium">
                        Ver Análise
                      </button>
                      <button className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 font-medium">
                        Ações Recomendadas
                      </button>
                    </div>
                    {subStep === 0 && (
                      <Hotspot 
                        id="step3-lms-alert" 
                        className="inset-0"
                        tooltip="IA detecta problemas em treinamentos"
                      />
                    )}
                  </div>

                  {/* Course Cards */}
                  <div className="space-y-2">
                    {[
                      { title: "Liderança Transformadora", completion: 75, students: 24, abandonment: 15, status: "active" },
                      { title: "Gestão de Tempo", completion: 45, students: 32, abandonment: 35, status: "alert" }
                    ].map((course, i) => (
                      <div key={i} className={`bg-white border-2 rounded-lg p-3 shadow-sm transition-all ${
                        course.status === 'alert' ? 'border-red-300 bg-red-50/30' : 'border-gray-200'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-sm text-gray-800">{course.title}</h3>
                          {course.status === 'alert' && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                              ⚠️ Atenção
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <p className="text-gray-500">Alunos</p>
                            <p className="font-bold text-nexus-green">{course.students}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Conclusão</p>
                            <p className="font-bold text-green-600">{course.completion}%</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Abandono</p>
                            <p className={`font-bold ${course.abandonment > 20 ? 'text-red-600' : 'text-gray-600'}`}>
                              {course.abandonment}%
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CaaS Section */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl p-5 shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h2 className="font-bold text-lg">Culture as a Service</h2>
                        <p className="text-white/80 text-xs">Rituais Automatizados</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm text-center">
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-xs text-white/80">Rituais Ativos</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm text-center">
                        <p className="text-2xl font-bold">94%</p>
                        <p className="text-xs text-white/80">Taxa de Sucesso</p>
                      </div>
                    </div>
                  </div>

                  {/* Ritual Builder Card */}
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-300 rounded-xl p-4 shadow-md relative">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Plus className="h-4 w-4 text-purple-600" />
                      </div>
                      <h3 className="font-bold text-purple-900 text-sm">Construtor de Rituais</h3>
                    </div>
                    <p className="text-xs text-purple-700 mb-3">
                      Crie e automatize rotinas culturais personalizadas
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-4 h-4 bg-purple-200 rounded flex items-center justify-center text-purple-700 font-bold">1</div>
                        <span className="text-purple-800">Escolha tipo: 1:1, Feedback, Reconhecimento...</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-4 h-4 bg-purple-200 rounded flex items-center justify-center text-purple-700 font-bold">2</div>
                        <span className="text-purple-800">Defina frequência e público</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-4 h-4 bg-purple-200 rounded flex items-center justify-center text-purple-700 font-bold">3</div>
                        <span className="text-purple-800">Automação ativa + métricas em tempo real</span>
                      </div>
                    </div>
                    <button className="w-full mt-3 text-xs bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 font-medium">
                      Criar Novo Ritual
                    </button>
                    {subStep === 1 && (
                      <Hotspot 
                        id="step3-caas-builder" 
                        className="inset-0"
                        tooltip="Construtor de rituais culturais"
                      />
                    )}
                  </div>

                  {/* Active Rituals */}
                  <div className="space-y-2">
                    {[
                      { ritual: "1:1 com Gestor", frequency: "Quinzenal", success: 96, nextDate: "Em 3 dias" },
                      { ritual: "Weekly Team Sync", frequency: "Toda segunda", success: 89, nextDate: "Amanhã" }
                    ].map((item, i) => (
                      <div key={i} className="bg-white border-2 border-blue-200 rounded-lg p-3 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-sm text-gray-800">{item.ritual}</h3>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                            🟢 Ativo
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <p className="text-gray-500">Frequência</p>
                            <p className="font-medium text-gray-700">{item.frequency}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Taxa Sucesso</p>
                            <p className="font-bold text-green-600">{item.success}%</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Próximo</p>
                            <p className="font-medium text-blue-600">{item.nextDate}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cultural Impact */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-xl p-4 shadow-md relative">
                    <p className="text-xs font-bold text-gray-700 mb-3">Impacto Cultural Medido pela IA</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-3xl font-bold text-green-600">+42%</p>
                        <p className="text-xs text-gray-600">Engajamento</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-blue-600">-28%</p>
                        <p className="text-xs text-gray-600">Risco Turnover</p>
                      </div>
                    </div>
                    {subStep === 2 && (
                      <Hotspot 
                        id="step3-impact" 
                        className="inset-0"
                        tooltip="Impacto real medido pela IA"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="p-6 h-full bg-gradient-to-br from-gray-50 to-white">
              {/* User Level Card */}
              <div className="bg-gradient-to-r from-nexus-green via-nexus-accent to-nexus-green-light rounded-2xl p-8 mb-6 shadow-2xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                  <Trophy className="h-48 w-48" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-white/80 text-sm mb-1">Seu Nível Atual</p>
                      <h2 className="text-5xl font-bold mb-2">Nível 5</h2>
                      <p className="text-white/90">🏆 Colaborador Engajado</p>
                    </div>
                    <div className="text-right">
                      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white/30">
                        <Trophy className="h-12 w-12" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>2,450 XP</span>
                      <span>3,000 XP para Nível 6</span>
                    </div>
                    <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                      <div 
                        className="h-full bg-white rounded-full shadow-lg transition-all duration-500"
                        style={{ width: "82%" }}
                      ></div>
                    </div>
                    <p className="text-white/80 text-xs">Faltam apenas 550 XP! Continue assim! 🚀</p>
                  </div>
                </div>
                {subStep === 0 && (
                  <Hotspot 
                    id="step4-level-card" 
                    className="inset-0"
                    tooltip="Veja seu progresso e nível atual"
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Rewards Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-nexus-green text-lg">Recompensas Disponíveis</h3>
                    <span className="text-sm bg-nexus-accent/20 text-nexus-accent px-3 py-1 rounded-full font-semibold">
                      8 novas
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 relative">
                    {[
                      { icon: "🏆", title: "Colaborador do Mês", xp: 500, available: true },
                      { icon: "🎯", title: "Meta Batida", xp: 300, available: true },
                      { icon: "🌟", title: "Inovador", xp: 400, available: true },
                      { icon: "🤝", title: "Team Player", xp: 250, available: true },
                      { icon: "📚", title: "Aprendiz", xp: 350, available: false },
                      { icon: "💡", title: "Criativo", xp: 300, available: false }
                    ].map((reward, i) => (
                      <div 
                        key={i} 
                        className={`rounded-xl p-4 text-center transition-all relative ${
                          reward.available 
                            ? 'bg-gradient-to-br from-nexus-accent to-nexus-green text-white shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer' 
                            : 'bg-white border-2 border-gray-200 opacity-60'
                        }`}
                      >
                        <div className="text-4xl mb-2">{reward.icon}</div>
                        <p className={`text-sm font-semibold mb-1 ${reward.available ? 'text-white' : 'text-gray-600'}`}>
                          {reward.title}
                        </p>
                        <p className={`text-xs ${reward.available ? 'text-white/80' : 'text-gray-400'}`}>
                          +{reward.xp} XP
                        </p>
                        {reward.available && (
                          <button className="mt-2 bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm transition-all">
                            Resgatar
                          </button>
                        )}
                        {i === 0 && subStep === 1 && (
                          <Hotspot 
                            id="step4-reward" 
                            className="inset-0"
                            tooltip="Resgate recompensas por suas conquistas"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Recent Achievements */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-700 text-sm mb-3">Conquistas Recentes</h4>
                    <div className="space-y-2">
                      {[
                        { text: "Completou 5 treinamentos", time: "Há 2 dias", xp: 250 },
                        { text: "100% de participação em eventos", time: "Há 5 dias", xp: 200 }
                      ].map((ach, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 bg-green-50 rounded-lg border border-green-200">
                          <div className="text-xl">✅</div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-700 font-medium">{ach.text}</p>
                            <p className="text-xs text-gray-500">{ach.time}</p>
                          </div>
                          <span className="text-xs font-bold text-green-600">+{ach.xp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Leaderboard Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-nexus-green text-lg">Ranking Geral</h3>
                    <select className="text-sm border-2 border-gray-200 rounded-lg px-3 py-1">
                      <option>Este mês</option>
                      <option>Esta semana</option>
                      <option>Todo tempo</option>
                    </select>
                  </div>

                  {/* Top 3 Podium */}
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200 relative">
                    <div className="flex items-end justify-center gap-4">
                      {/* 2nd Place */}
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white font-bold text-xl mb-2 border-4 border-white shadow-lg">
                          MS
                        </div>
                        <div className="bg-gray-200 rounded-t-lg p-3 h-20 flex flex-col justify-between">
                          <p className="text-2xl font-bold">🥈</p>
                          <p className="text-xs font-semibold text-gray-700">2,890 XP</p>
                        </div>
                      </div>
                      {/* 1st Place */}
                      <div className="text-center -mt-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-2xl mb-2 border-4 border-white shadow-xl">
                          JS
                        </div>
                        <div className="bg-yellow-400 rounded-t-lg p-3 h-28 flex flex-col justify-between">
                          <p className="text-3xl font-bold">🥇</p>
                          <p className="text-xs font-semibold text-yellow-900">3,245 XP</p>
                        </div>
                      </div>
                      {/* 3rd Place */}
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center text-white font-bold text-xl mb-2 border-4 border-white shadow-lg">
                          AC
                        </div>
                        <div className="bg-orange-200 rounded-t-lg p-3 h-16 flex flex-col justify-between">
                          <p className="text-2xl font-bold">🥉</p>
                          <p className="text-xs font-semibold text-orange-900">2,567 XP</p>
                        </div>
                      </div>
                    </div>
                    {subStep === 2 && (
                      <Hotspot 
                        id="step4-leaderboard" 
                        className="inset-0"
                        tooltip="Confira sua posição no ranking"
                      />
                    )}
                  </div>

                  {/* Rest of Leaderboard */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-4 shadow-sm">
                    <div className="space-y-2">
                      {[
                        { rank: 4, name: "Pedro Lima", xp: 2450, avatar: "PL", trend: "up" },
                        { rank: 5, name: "Carla Santos", xp: 2280, avatar: "CS", trend: "same" },
                        { rank: 6, name: "Roberto Silva", xp: 2150, avatar: "RS", trend: "down" },
                        { rank: 7, name: "Fernanda Costa", xp: 2050, avatar: "FC", trend: "up" }
                      ].map((user, i) => (
                        <div 
                          key={i} 
                          className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                            user.rank === 4 ? 'bg-nexus-accent/10 border-2 border-nexus-accent' : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                        >
                          <span className={`font-bold text-lg w-8 text-center ${
                            user.rank === 4 ? 'text-nexus-accent' : 'text-gray-400'
                          }`}>
                            #{user.rank}
                          </span>
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${
                            user.rank === 4 
                              ? 'from-nexus-accent to-nexus-green' 
                              : 'from-gray-400 to-gray-500'
                          } flex items-center justify-center text-white font-bold`}>
                            {user.avatar}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.xp.toLocaleString()} XP</p>
                          </div>
                          <div className="text-lg">
                            {user.trend === 'up' && '📈'}
                            {user.trend === 'down' && '📉'}
                            {user.trend === 'same' && '➡️'}
                          </div>
                        </div>
                      ))}
                    </div>
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
