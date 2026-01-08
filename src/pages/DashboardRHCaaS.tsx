import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { 
  Calendar, Plus, TrendingUp, Users, Clock, CheckCircle, AlertTriangle, 
  Edit, Trash2, Target, MessageSquare, Send, Sparkles, Zap, Trophy,
  TrendingDown, DollarSign, Shield, ExternalLink, RotateCcw, Bell,
  Slack, Video, Settings2, CalendarClock, Brain, ChevronRight,
  Award, Star, Flame
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Ritual {
  id: number;
  name: string;
  frequency: string;
  participants: number;
  successRate: number;
  nextDate: string;
  status: 'active' | 'alert' | 'scheduled';
  department: string;
  description?: string;
  category?: string;
  triggerType: 'manual' | 'auto';
  integration?: 'slack' | 'teams' | 'meet' | null;
  xpReward: number;
}

interface CorrectiveAction {
  id: number;
  action: string;
  responsible: string;
  deadline: string;
  status: 'pending' | 'in_progress' | 'completed';
}

interface AIAlert {
  id: number;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  department: string;
  affectedCount: number;
  change: number;
  timestamp: string;
  suggestedRitual: string;
  suggestedAction: string;
}

const DashboardRHCaaS = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: alertsRef, isVisible: alertsVisible } = useScrollAnimation();
  const { ref: ritualsRef, isVisible: ritualsVisible } = useScrollAnimation();
  const { ref: impactRef, isVisible: impactVisible } = useScrollAnimation();
  const { toast } = useToast();

  const [rituals, setRituals] = useState<Ritual[]>([
    { 
      id: 1, 
      name: "Weekly Team Sync", 
      frequency: "Toda segunda, 10h", 
      participants: 8, 
      successRate: 95,
      nextDate: "Amanhã, 10:00",
      status: "active",
      department: "Tecnologia",
      description: "Reunião semanal de alinhamento da equipe",
      category: "Comunicação",
      triggerType: "manual",
      integration: "meet",
      xpReward: 50
    },
    { 
      id: 2, 
      name: "1:1 com Gestor", 
      frequency: "Quinzenal", 
      participants: 45, 
      successRate: 78,
      nextDate: "Em 3 dias",
      status: "active",
      department: "Geral",
      description: "Conversas individuais de desenvolvimento",
      category: "Desenvolvimento",
      triggerType: "auto",
      integration: "teams",
      xpReward: 100
    },
    { 
      id: 3, 
      name: "Happy Hour Digital", 
      frequency: "Mensal", 
      participants: 65, 
      successRate: 55,
      nextDate: "Sexta-feira, 18:00",
      status: "alert",
      department: "Toda Empresa",
      description: "Momento de descontração e networking virtual",
      category: "Engajamento",
      triggerType: "manual",
      integration: "meet",
      xpReward: 75
    },
    { 
      id: 4, 
      name: "Retrospectiva de Sprint", 
      frequency: "Quinzenal", 
      participants: 12, 
      successRate: 92,
      nextDate: "Próxima quinta",
      status: "active",
      department: "Tecnologia",
      description: "Análise do sprint e melhoria contínua",
      category: "Desenvolvimento",
      triggerType: "auto",
      integration: "slack",
      xpReward: 80
    },
    { 
      id: 5, 
      name: "All-Hands Meeting", 
      frequency: "Mensal", 
      participants: 120, 
      successRate: 88,
      nextDate: "Dia 28",
      status: "active",
      department: "Toda Empresa",
      description: "Reunião geral com toda a empresa",
      category: "Comunicação",
      triggerType: "manual",
      integration: "meet",
      xpReward: 60
    },
  ]);

  const [aiAlerts, setAiAlerts] = useState<AIAlert[]>([
    {
      id: 1,
      severity: "high",
      title: "Queda de Engajamento no Time de TI",
      description: "O engajamento do time de TI caiu 30% nas últimas 2 semanas após o sprint intensivo. Risco elevado de burnout detectado.",
      department: "TI",
      affectedCount: 12,
      change: -30,
      timestamp: "Há 2 horas",
      suggestedRitual: "Retrospectiva de Sprint",
      suggestedAction: "Agende uma retrospectiva focada em bem-estar e carga de trabalho"
    },
    {
      id: 2,
      severity: "medium",
      title: "Baixa Participação nos 1:1s - Vendas",
      description: "Apenas 45% dos 1:1s foram completados no departamento de Vendas. Colaboradores podem estar sobrecarregados.",
      department: "Vendas",
      affectedCount: 8,
      change: -55,
      timestamp: "Há 5 horas",
      suggestedRitual: "1:1 com Gestor",
      suggestedAction: "Envie lembretes automáticos e reduza a duração para 20 minutos"
    },
    {
      id: 3,
      severity: "low",
      title: "Alta Adoção de Treinamentos - Marketing",
      description: "O departamento de Marketing teve 85% de conclusão de cursos LMS este mês. Oportunidade de replicar boas práticas.",
      department: "Marketing",
      affectedCount: 15,
      change: 25,
      timestamp: "Há 1 dia",
      suggestedRitual: "Compartilhamento de Conhecimento",
      suggestedAction: "Crie um ritual de compartilhamento onde Marketing ensina outros times"
    }
  ]);

  const [correctiveActions, setCorrectiveActions] = useState<CorrectiveAction[]>([
    { id: 1, action: "Enviar pesquisa de engajamento ao time", responsible: "Ana Silva", deadline: "Em 2 dias", status: "pending" },
    { id: 2, action: "Agendar reunião com gestor do departamento", responsible: "Carlos Santos", deadline: "Amanhã", status: "in_progress" },
    { id: 3, action: "Revisar formato do ritual", responsible: "Maria Costa", deadline: "Esta semana", status: "pending" },
  ]);

  // Weekly ritual progress
  const [weeklyProgress] = useState({
    completed: 3,
    total: 5,
    streak: 4,
    xpEarned: 230,
    xpTarget: 500
  });

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [manageDialogOpen, setManageDialogOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [correctiveDialogOpen, setCorrectiveDialogOpen] = useState(false);
  const [selectedRitual, setSelectedRitual] = useState<Ritual | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<AIAlert | null>(null);

  const [newRitual, setNewRitual] = useState({
    name: "",
    frequency: "",
    department: "",
    participants: "",
    category: "",
    description: "",
    triggerType: "manual" as "manual" | "auto",
    triggerCondition: "",
    integration: "" as string,
    xpReward: "50"
  });

  const [newAction, setNewAction] = useState({
    action: "",
    responsible: "",
    deadline: ""
  });

  const totalRituals = rituals.length;
  const activeRituals = rituals.filter(r => r.status === 'active').length;
  const avgSuccessRate = Math.round(rituals.reduce((acc, r) => acc + r.successRate, 0) / rituals.length);
  const totalParticipants = rituals.reduce((acc, r) => acc + r.participants, 0);
  const alertsCount = rituals.filter(r => r.successRate < 70).length;

  const handleCreateRitual = () => {
    if (!newRitual.name || !newRitual.frequency || !newRitual.department) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const ritual: Ritual = {
      id: Date.now(),
      name: newRitual.name,
      frequency: newRitual.frequency,
      department: newRitual.department,
      participants: parseInt(newRitual.participants) || 0,
      category: newRitual.category,
      description: newRitual.description,
      successRate: 100,
      nextDate: "A agendar",
      status: "scheduled",
      triggerType: newRitual.triggerType,
      integration: newRitual.integration as 'slack' | 'teams' | 'meet' | null,
      xpReward: parseInt(newRitual.xpReward) || 50
    };

    setRituals([...rituals, ritual]);
    setCreateDialogOpen(false);
    setNewRitual({ 
      name: "", frequency: "", department: "", participants: "", 
      category: "", description: "", triggerType: "manual", 
      triggerCondition: "", integration: "", xpReward: "50" 
    });
    
    toast({
      title: "Ritual criado! 🎉",
      description: `${ritual.name} foi adicionado com sucesso.`
    });
  };

  const handleUpdateRitual = () => {
    if (!selectedRitual) return;

    const updatedRituals = rituals.map(r => 
      r.id === selectedRitual.id ? selectedRitual : r
    );
    
    setRituals(updatedRituals);
    setManageDialogOpen(false);
    
    toast({
      title: "Ritual atualizado!",
      description: `${selectedRitual.name} foi atualizado com sucesso.`
    });
  };

  const handleDeleteRitual = (id: number) => {
    setRituals(rituals.filter(r => r.id !== id));
    setManageDialogOpen(false);
    
    toast({
      title: "Ritual removido",
      description: "O ritual foi excluído com sucesso."
    });
  };

  const handleAddCorrectiveAction = () => {
    if (!newAction.action || !newAction.responsible) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive"
      });
      return;
    }

    const action: CorrectiveAction = {
      id: Date.now(),
      action: newAction.action,
      responsible: newAction.responsible,
      deadline: newAction.deadline,
      status: "pending"
    };

    setCorrectiveActions([...correctiveActions, action]);
    setNewAction({ action: "", responsible: "", deadline: "" });
    
    toast({
      title: "Ação adicionada!",
      description: "Ação corretiva criada com sucesso."
    });
  };

  const handleUpdateActionStatus = (id: number, status: CorrectiveAction['status']) => {
    setCorrectiveActions(correctiveActions.map(a =>
      a.id === id ? { ...a, status } : a
    ));
  };

  const handleConfigureRitual = (alert: AIAlert) => {
    setNewRitual({
      ...newRitual,
      name: alert.suggestedRitual,
      department: alert.department,
      description: alert.suggestedAction,
      triggerType: "auto"
    });
    setCreateDialogOpen(true);
    toast({
      title: "Configurando ritual sugerido",
      description: `Preencha os detalhes para ${alert.suggestedRitual}`
    });
  };

  const handleDismissAlert = (alertId: number) => {
    setAiAlerts(aiAlerts.filter(a => a.id !== alertId));
    toast({
      title: "Alerta dispensado",
      description: "O alerta foi removido da lista."
    });
  };

  const handleMarkAlertComplete = (alertId: number) => {
    setAiAlerts(aiAlerts.filter(a => a.id !== alertId));
    toast({
      title: "Marcado como concluído! ✓",
      description: "Ação registrada com sucesso."
    });
  };

  const openManageDialog = (ritual: Ritual) => {
    setSelectedRitual(ritual);
    setManageDialogOpen(true);
  };

  const openCorrectiveActions = (ritual: Ritual) => {
    setSelectedRitual(ritual);
    setCorrectiveDialogOpen(true);
  };

  const getIntegrationIcon = (integration: string | null | undefined) => {
    switch (integration) {
      case 'slack': return <Slack className="h-4 w-4" />;
      case 'teams': return <Video className="h-4 w-4" />;
      case 'meet': return <Video className="h-4 w-4" />;
      default: return null;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high': return <Badge className="bg-red-500 hover:bg-red-600">Alta Prioridade</Badge>;
      case 'medium': return <Badge className="bg-amber-500 hover:bg-amber-600">Atenção</Badge>;
      default: return <Badge className="bg-emerald-500 hover:bg-emerald-600">Oportunidade</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Header */}
            <div
              ref={headerRef}
              className={`transition-all duration-700 ${
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-xl">
                      <Target className="h-7 w-7 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Culture-as-a-Service
                    </h1>
                  </div>
                  <p className="text-muted-foreground">
                    Automatize rituais culturais baseados em sinais de People Analytics para reduzir turnover
                  </p>
                </div>
                <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-all" onClick={() => setCreateDialogOpen(true)}>
                  <Plus className="h-5 w-5" />
                  Criar Novo Ritual
                </Button>
              </div>
            </div>

            {/* Métricas Principais */}
            <div
              ref={statsRef}
              className={`grid md:grid-cols-4 gap-4 transition-all duration-700 delay-100 ${
                statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Card className="hover:shadow-lg transition-all border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Rituais Ativos</p>
                      <p className="text-3xl font-bold text-primary">{activeRituals}/{totalRituals}</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all border-l-4 border-l-emerald-500">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Taxa de Sucesso</p>
                      <p className="text-3xl font-bold text-emerald-600">{avgSuccessRate}%</p>
                    </div>
                    <div className="p-3 bg-emerald-500/10 rounded-xl">
                      <TrendingUp className="h-6 w-6 text-emerald-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all border-l-4 border-l-blue-500">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Participantes</p>
                      <p className="text-3xl font-bold text-blue-600">{totalParticipants}</p>
                    </div>
                    <div className="p-3 bg-blue-500/10 rounded-xl">
                      <Users className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`hover:shadow-lg transition-all border-l-4 ${alertsCount > 0 ? 'border-l-amber-500' : 'border-l-emerald-500'}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Alertas IA</p>
                      <p className={`text-3xl font-bold ${alertsCount > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {aiAlerts.length}
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl ${alertsCount > 0 ? 'bg-amber-500/10' : 'bg-emerald-500/10'}`}>
                      <Brain className={`h-6 w-6 ${alertsCount > 0 ? 'text-amber-500' : 'text-emerald-500'}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Motor de Sugestão Inteligente - Alertas de Alta Prioridade */}
            <div
              ref={alertsRef}
              className={`transition-all duration-700 delay-150 ${
                alertsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg animate-pulse">
                        <Sparkles className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Motor de Sugestão Inteligente</CardTitle>
                        <CardDescription>Alertas baseados em People Analytics preditivo</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="gap-1">
                      <Zap className="h-3 w-3" />
                      Trigger-based
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiAlerts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="h-12 w-12 mx-auto mb-3 text-emerald-500" />
                      <p>Nenhum alerta pendente. Cultura saudável! 🎉</p>
                    </div>
                  ) : (
                    aiAlerts.map((alert) => (
                      <Card 
                        key={alert.id} 
                        className={`border-l-4 transition-all hover:shadow-md ${
                          alert.severity === 'high' ? 'border-l-red-500 bg-red-50/50 dark:bg-red-950/10' : 
                          alert.severity === 'medium' ? 'border-l-amber-500 bg-amber-50/50 dark:bg-amber-950/10' : 
                          'border-l-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/10'
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {getSeverityBadge(alert.severity)}
                                <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                              </div>
                              <h4 className="font-semibold text-foreground mb-1">{alert.title}</h4>
                              <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
                              
                              <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <span>{alert.affectedCount} colaboradores</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Target className="h-4 w-4 text-muted-foreground" />
                                  <span>{alert.department}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {alert.change > 0 ? (
                                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                                  ) : (
                                    <TrendingDown className="h-4 w-4 text-red-600" />
                                  )}
                                  <span className={alert.change > 0 ? 'text-emerald-600' : 'text-red-600'}>
                                    {alert.change > 0 ? '+' : ''}{alert.change}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <Separator className="my-3" />

                          <div className="bg-background/80 border border-primary/20 p-4 rounded-lg">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <Brain className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-foreground mb-1">
                                  Sugestão: {alert.suggestedRitual}
                                </p>
                                <p className="text-sm text-muted-foreground">{alert.suggestedAction}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" className="gap-2" onClick={() => handleConfigureRitual(alert)}>
                                <Settings2 className="h-4 w-4" />
                                Configurar no CaaS
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleMarkAlertComplete(alert.id)}>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Concluído
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => handleDismissAlert(alert.id)}>
                                Dispensar
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Dashboard de Controle de Rituais */}
            <div
              ref={ritualsRef}
              className={`transition-all duration-700 delay-200 ${
                ritualsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-primary" />
                  Dashboard de Rituais
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rituals.map((ritual) => (
                  <Card 
                    key={ritual.id} 
                    className={`hover:shadow-lg transition-all hover:-translate-y-1 relative overflow-hidden ${
                      ritual.status === 'alert' ? 'border-amber-300 bg-amber-50/30 dark:bg-amber-950/10' : ''
                    }`}
                  >
                    {/* Glowing effect for low success rate */}
                    {ritual.successRate < 70 && (
                      <div className="absolute top-0 right-0 p-2">
                        <div className="relative">
                          <AlertTriangle className="h-5 w-5 text-amber-500 animate-pulse" />
                          <div className="absolute inset-0 h-5 w-5 bg-amber-500 rounded-full blur-md opacity-50 animate-pulse" />
                        </div>
                      </div>
                    )}
                    
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base mb-1">{ritual.name}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {ritual.category}
                            </Badge>
                            {ritual.integration && (
                              <Badge variant="secondary" className="text-xs gap-1">
                                {getIntegrationIcon(ritual.integration)}
                                {ritual.integration}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Badge 
                          variant={
                            ritual.status === 'active' ? 'default' : 
                            ritual.status === 'alert' ? 'destructive' : 
                            'secondary'
                          }
                          className="text-xs"
                        >
                          {ritual.status === 'active' ? 'Ativo' : ritual.status === 'alert' ? 'Atenção' : 'Agendado'}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{ritual.frequency}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{ritual.participants}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{ritual.department}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarClock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{ritual.nextDate}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Taxa de Sucesso</span>
                          <span className={`font-semibold ${
                            ritual.successRate >= 80 ? 'text-emerald-600' : 
                            ritual.successRate >= 60 ? 'text-amber-600' : 
                            'text-red-600'
                          }`}>
                            {ritual.successRate}%
                          </span>
                        </div>
                        <Progress 
                          value={ritual.successRate} 
                          className={`h-2 ${
                            ritual.successRate >= 80 ? '[&>div]:bg-emerald-600' : 
                            ritual.successRate >= 60 ? '[&>div]:bg-amber-600' : 
                            '[&>div]:bg-red-600'
                          }`}
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-1 text-sm">
                          <Trophy className="h-4 w-4 text-amber-500" />
                          <span className="font-medium text-amber-600">+{ritual.xpReward} XP</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {ritual.triggerType === 'auto' ? '🤖 Auto' : '👤 Manual'}
                        </Badge>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => openManageDialog(ritual)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Gerenciar
                        </Button>
                        {ritual.successRate < 70 && (
                          <Button 
                            size="sm" 
                            className="flex-1 gap-1 animate-pulse"
                            onClick={() => openCorrectiveActions(ritual)}
                          >
                            <Zap className="h-4 w-4" />
                            Ações
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Relatório de Impacto - ROI */}
            <div
              ref={impactRef}
              className={`transition-all duration-700 delay-300 ${
                impactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 border-emerald-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <DollarSign className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-emerald-700 dark:text-emerald-400">
                          Relatório de Impacto (ROI)
                        </CardTitle>
                        <CardDescription>Linguagem do CFO - Resultados mensuráveis</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-emerald-500">Atualizado hoje</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6 mb-6">
                    <div className="text-center p-4 bg-white/50 dark:bg-background/50 rounded-xl">
                      <p className="text-4xl font-bold text-emerald-600 mb-2">-28%</p>
                      <p className="text-sm text-muted-foreground">Redução no Turnover</p>
                      <p className="text-xs text-emerald-600 mt-1">↓ de 57% para 41%</p>
                    </div>
                    <div className="text-center p-4 bg-white/50 dark:bg-background/50 rounded-xl">
                      <p className="text-4xl font-bold text-blue-600 mb-2">+42%</p>
                      <p className="text-sm text-muted-foreground">Aumento no Engajamento</p>
                      <p className="text-xs text-blue-600 mt-1">eNPS: 32 → 46</p>
                    </div>
                    <div className="text-center p-4 bg-white/50 dark:bg-background/50 rounded-xl">
                      <p className="text-4xl font-bold text-primary mb-2">R$ 847k</p>
                      <p className="text-sm text-muted-foreground">Economia Estimada</p>
                      <p className="text-xs text-primary mt-1">Em custos de reposição</p>
                    </div>
                    <div className="text-center p-4 bg-white/50 dark:bg-background/50 rounded-xl">
                      <p className="text-4xl font-bold text-amber-600 mb-2">4.2x</p>
                      <p className="text-sm text-muted-foreground">ROI do Programa</p>
                      <p className="text-xs text-amber-600 mt-1">Para cada R$1 investido</p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="bg-white/60 dark:bg-background/60 rounded-xl p-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Brain className="h-5 w-5 text-primary" />
                      Insights de Impacto por Ritual
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-500" />
                          <span className="font-medium">1:1 com Gestor</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-emerald-600">+23% retenção</p>
                          <p className="text-xs text-muted-foreground">Para cada ritual realizado</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-500" />
                          <span className="font-medium">Weekly Team Sync</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-blue-600">+35% comunicação</p>
                          <p className="text-xs text-muted-foreground">Melhoria em colaboração</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-500" />
                          <span className="font-medium">Retrospectiva de Sprint</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-primary">-18% burnout</p>
                          <p className="text-xs text-muted-foreground">Quando realizada pós-sprint</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar - Gamificação XP */}
          <div className="w-80 space-y-4">
            {/* Weekly Ritual Progress */}
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 sticky top-20">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  <CardTitle className="text-lg">Ritual Semanal</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white mb-3 shadow-lg">
                    <span className="text-3xl font-bold">{weeklyProgress.completed}</span>
                  </div>
                  <p className="font-medium">de {weeklyProgress.total} rituais</p>
                  <p className="text-sm text-muted-foreground">completados esta semana</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progresso Semanal</span>
                    <span className="font-medium">{Math.round((weeklyProgress.completed / weeklyProgress.total) * 100)}%</span>
                  </div>
                  <Progress 
                    value={(weeklyProgress.completed / weeklyProgress.total) * 100} 
                    className="h-3 [&>div]:bg-gradient-to-r [&>div]:from-amber-400 [&>div]:to-orange-500"
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-500" />
                    <span className="font-medium">Streak</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold text-orange-600">{weeklyProgress.streak}</span>
                    <span className="text-sm text-muted-foreground">semanas</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-500" />
                      XP Ganho
                    </span>
                    <span className="font-medium text-amber-600">{weeklyProgress.xpEarned} / {weeklyProgress.xpTarget}</span>
                  </div>
                  <Progress 
                    value={(weeklyProgress.xpEarned / weeklyProgress.xpTarget) * 100} 
                    className="h-2 [&>div]:bg-amber-500"
                  />
                  <p className="text-xs text-center text-muted-foreground">
                    Faltam {weeklyProgress.xpTarget - weeklyProgress.xpEarned} XP para o próximo nível
                  </p>
                </div>

                <Button className="w-full gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                  <Award className="h-4 w-4" />
                  Ver Conquistas
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Próximos Rituais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {rituals.slice(0, 3).map((ritual) => (
                  <div key={ritual.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={`p-2 rounded-lg ${
                      ritual.successRate >= 80 ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                      ritual.successRate >= 60 ? 'bg-amber-100 dark:bg-amber-900/30' :
                      'bg-red-100 dark:bg-red-900/30'
                    }`}>
                      <Calendar className={`h-4 w-4 ${
                        ritual.successRate >= 80 ? 'text-emerald-600' :
                        ritual.successRate >= 60 ? 'text-amber-600' :
                        'text-red-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{ritual.name}</p>
                      <p className="text-xs text-muted-foreground">{ritual.nextDate}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialog: Criar Ritual */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Criar Novo Ritual Cultural
            </DialogTitle>
            <DialogDescription>
              Configure um ritual automatizado para fortalecer a cultura da empresa
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Básico</TabsTrigger>
              <TabsTrigger value="trigger">Gatilho</TabsTrigger>
              <TabsTrigger value="integration">Integração</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Ritual *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Weekly Team Sync"
                  value={newRitual.name}
                  onChange={(e) => setNewRitual({ ...newRitual, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequência *</Label>
                  <Select value={newRitual.frequency} onValueChange={(value) => setNewRitual({ ...newRitual, frequency: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Diária">Diária</SelectItem>
                      <SelectItem value="Semanal">Semanal</SelectItem>
                      <SelectItem value="Quinzenal">Quinzenal</SelectItem>
                      <SelectItem value="Mensal">Mensal</SelectItem>
                      <SelectItem value="Trimestral">Trimestral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Departamento *</Label>
                  <Select value={newRitual.department} onValueChange={(value) => setNewRitual({ ...newRitual, department: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="Comercial">Comercial</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Operações">Operações</SelectItem>
                      <SelectItem value="RH">RH</SelectItem>
                      <SelectItem value="Toda Empresa">Toda Empresa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={newRitual.category} onValueChange={(value) => setNewRitual({ ...newRitual, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Comunicação">Comunicação</SelectItem>
                      <SelectItem value="Desenvolvimento">Desenvolvimento</SelectItem>
                      <SelectItem value="Engajamento">Engajamento</SelectItem>
                      <SelectItem value="Reconhecimento">Reconhecimento</SelectItem>
                      <SelectItem value="Bem-estar">Bem-estar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="participants">Nº de Participantes</Label>
                  <Input
                    id="participants"
                    type="number"
                    placeholder="Ex: 10"
                    value={newRitual.participants}
                    onChange={(e) => setNewRitual({ ...newRitual, participants: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o objetivo e formato do ritual..."
                  value={newRitual.description}
                  onChange={(e) => setNewRitual({ ...newRitual, description: e.target.value })}
                  rows={3}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="trigger" className="space-y-4 pt-4">
              <div className="space-y-4">
                <Label>Tipo de Gatilho</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Card 
                    className={`cursor-pointer transition-all ${
                      newRitual.triggerType === 'manual' ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setNewRitual({ ...newRitual, triggerType: 'manual' })}
                  >
                    <CardContent className="pt-4 text-center">
                      <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="font-medium">Manual</p>
                      <p className="text-xs text-muted-foreground">Agendado pelo gestor</p>
                    </CardContent>
                  </Card>
                  <Card 
                    className={`cursor-pointer transition-all ${
                      newRitual.triggerType === 'auto' ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setNewRitual({ ...newRitual, triggerType: 'auto' })}
                  >
                    <CardContent className="pt-4 text-center">
                      <Brain className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="font-medium">Automático (IA)</p>
                      <p className="text-xs text-muted-foreground">Baseado em sinais</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {newRitual.triggerType === 'auto' && (
                <div className="space-y-2">
                  <Label htmlFor="trigger">Condição de Ativação</Label>
                  <Select 
                    value={newRitual.triggerCondition} 
                    onValueChange={(value) => setNewRitual({ ...newRitual, triggerCondition: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Quando ativar automaticamente?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engagement_drop">Queda de engajamento {'>'} 20%</SelectItem>
                      <SelectItem value="sprint_end">Após finalização de sprint</SelectItem>
                      <SelectItem value="new_hire">Novo colaborador no time</SelectItem>
                      <SelectItem value="low_participation">Participação {'<'} 60%</SelectItem>
                      <SelectItem value="quarterly">Início de trimestre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="xp">Recompensa XP</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="xp"
                    type="number"
                    placeholder="50"
                    value={newRitual.xpReward}
                    onChange={(e) => setNewRitual({ ...newRitual, xpReward: e.target.value })}
                    className="w-24"
                  />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    XP por participação
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="integration" className="space-y-4 pt-4">
              <Label>Integração com Ferramentas</Label>
              <div className="grid grid-cols-3 gap-4">
                <Card 
                  className={`cursor-pointer transition-all ${
                    newRitual.integration === 'slack' ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setNewRitual({ ...newRitual, integration: 'slack' })}
                >
                  <CardContent className="pt-4 text-center">
                    <Slack className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-medium">Slack</p>
                  </CardContent>
                </Card>
                <Card 
                  className={`cursor-pointer transition-all ${
                    newRitual.integration === 'teams' ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setNewRitual({ ...newRitual, integration: 'teams' })}
                >
                  <CardContent className="pt-4 text-center">
                    <Video className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-medium">Teams</p>
                  </CardContent>
                </Card>
                <Card 
                  className={`cursor-pointer transition-all ${
                    newRitual.integration === 'meet' ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setNewRitual({ ...newRitual, integration: 'meet' })}
                >
                  <CardContent className="pt-4 text-center">
                    <Video className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-medium">Google Meet</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Lembretes Automáticos</p>
                  <p className="text-sm text-muted-foreground">Enviar notificações antes do ritual</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Criar Sala Automaticamente</p>
                  <p className="text-sm text-muted-foreground">Gerar link de reunião ao iniciar</p>
                </div>
                <Switch defaultChecked />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateRitual}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Ritual
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog: Gerenciar Ritual */}
      <Dialog open={manageDialogOpen} onOpenChange={setManageDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Gerenciar Ritual</DialogTitle>
            <DialogDescription>
              Edite as configurações do ritual ou remova-o se necessário
            </DialogDescription>
          </DialogHeader>
          {selectedRitual && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nome do Ritual</Label>
                <Input
                  id="edit-name"
                  value={selectedRitual.name}
                  onChange={(e) => setSelectedRitual({ ...selectedRitual, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-frequency">Frequência</Label>
                  <Input
                    id="edit-frequency"
                    value={selectedRitual.frequency}
                    onChange={(e) => setSelectedRitual({ ...selectedRitual, frequency: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-department">Departamento</Label>
                  <Input
                    id="edit-department"
                    value={selectedRitual.department}
                    onChange={(e) => setSelectedRitual({ ...selectedRitual, department: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-participants">Participantes</Label>
                  <Input
                    id="edit-participants"
                    type="number"
                    value={selectedRitual.participants}
                    onChange={(e) => setSelectedRitual({ ...selectedRitual, participants: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-xp">XP por Participação</Label>
                  <Input
                    id="edit-xp"
                    type="number"
                    value={selectedRitual.xpReward}
                    onChange={(e) => setSelectedRitual({ ...selectedRitual, xpReward: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Descrição</Label>
                <Textarea
                  id="edit-description"
                  value={selectedRitual.description || ""}
                  onChange={(e) => setSelectedRitual({ ...selectedRitual, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <Badge variant={selectedRitual.status === 'active' ? 'default' : selectedRitual.status === 'alert' ? 'destructive' : 'secondary'}>
                  {selectedRitual.status === 'active' ? 'Ativo' : selectedRitual.status === 'alert' ? 'Atenção' : 'Agendado'}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Próximo: {selectedRitual.nextDate}
                </span>
                <span className="text-sm text-muted-foreground">
                  Taxa: {selectedRitual.successRate}%
                </span>
              </div>
            </div>
          )}
          <div className="flex justify-between">
            <Button variant="destructive" onClick={() => selectedRitual && handleDeleteRitual(selectedRitual.id)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir Ritual
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setManageDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleUpdateRitual}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog: Ações Corretivas */}
      <Dialog open={correctiveDialogOpen} onOpenChange={setCorrectiveDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-amber-500" />
              Ações Corretivas
              {selectedRitual && (
                <Badge variant="outline" className="ml-2">{selectedRitual.name}</Badge>
              )}
            </DialogTitle>
            <DialogDescription>
              Gerencie ações para melhorar a taxa de sucesso do ritual
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Adicionar Nova Ação */}
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-base">Nova Ação Corretiva</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="action">Ação</Label>
                  <Textarea
                    id="action"
                    placeholder="Descreva a ação corretiva..."
                    value={newAction.action}
                    onChange={(e) => setNewAction({ ...newAction, action: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="responsible">Responsável</Label>
                    <Input
                      id="responsible"
                      placeholder="Nome do responsável"
                      value={newAction.responsible}
                      onChange={(e) => setNewAction({ ...newAction, responsible: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Prazo</Label>
                    <Input
                      id="deadline"
                      placeholder="Ex: Em 3 dias"
                      value={newAction.deadline}
                      onChange={(e) => setNewAction({ ...newAction, deadline: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={handleAddCorrectiveAction} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Ação
                </Button>
              </CardContent>
            </Card>

            {/* Lista de Ações */}
            <div className="space-y-3">
              <h3 className="font-semibold">Ações em Andamento</h3>
              {correctiveActions.map((action) => (
                <Card key={action.id} className={`${
                  action.status === 'completed' ? 'bg-emerald-50/50 dark:bg-emerald-950/10' : ''
                }`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm font-medium">{action.action}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>👤 {action.responsible}</span>
                          <span>⏰ {action.deadline}</span>
                        </div>
                      </div>
                      <Select
                        value={action.status}
                        onValueChange={(value) => handleUpdateActionStatus(action.id, value as CorrectiveAction['status'])}
                      >
                        <SelectTrigger className="w-36">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="in_progress">Em Progresso</SelectItem>
                          <SelectItem value="completed">Concluída</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setCorrectiveDialogOpen(false)}>
              Fechar
            </Button>
            <Button>
              <Bell className="h-4 w-4 mr-2" />
              Notificar Responsáveis
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default DashboardRHCaaS;
