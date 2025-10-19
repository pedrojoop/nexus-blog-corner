import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calendar, Plus, TrendingUp, TrendingDown, Users, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const DashboardRHCaaS = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: ritualsRef, isVisible: ritualsVisible } = useScrollAnimation();

  const rituals = [
    { 
      id: 1, 
      name: "Weekly Team Sync", 
      frequency: "Toda segunda, 10h", 
      participants: 8, 
      successRate: 95,
      nextDate: "Amanhã",
      status: "active",
      department: "Tecnologia"
    },
    { 
      id: 2, 
      name: "1:1 com Gestor", 
      frequency: "Quinzenal", 
      participants: 2, 
      successRate: 85,
      nextDate: "Em 3 dias",
      status: "active",
      department: "Geral"
    },
    { 
      id: 3, 
      name: "Ritual de Reconhecimento", 
      frequency: "Mensal", 
      participants: 45, 
      successRate: 60,
      nextDate: "Sexta-feira",
      status: "alert",
      department: "Comercial"
    },
    { 
      id: 4, 
      name: "All-Hands Meeting", 
      frequency: "Mensal", 
      participants: 120, 
      successRate: 92,
      nextDate: "Sexta-feira",
      status: "active",
      department: "Toda empresa"
    },
    { 
      id: 5, 
      name: "Feedback 360°", 
      frequency: "Trimestral", 
      participants: 35, 
      successRate: 78,
      nextDate: "Em 12 dias",
      status: "scheduled",
      department: "Liderança"
    },
  ];

  const totalRituals = rituals.length;
  const activeRituals = rituals.filter(r => r.status === 'active').length;
  const avgSuccessRate = rituals.reduce((acc, r) => acc + r.successRate, 0) / rituals.length;
  const totalParticipants = rituals.reduce((acc, r) => acc + r.participants, 0);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto p-6 space-y-8">
          {/* Header */}
          <div
            ref={headerRef}
            className={`transition-all duration-700 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Culture-as-a-Service
                </h1>
                <p className="text-muted-foreground">Construtor de Rituais Automatizados</p>
              </div>
              <Button size="lg" className="gap-2 shadow-lg">
                <Plus className="h-5 w-5" />
                Criar Novo Ritual
              </Button>
            </div>
          </div>

          {/* Métricas Principais */}
          <div
            ref={statsRef}
            className={`grid md:grid-cols-4 gap-6 transition-all duration-700 delay-100 ${
              statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Card className="hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Rituais Totais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-primary">{totalRituals}</p>
                  <Calendar className="h-8 w-8 text-primary/40" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all border-green-200 bg-green-50/50 dark:bg-green-950/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-green-600 dark:text-green-400">
                  Rituais Ativos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{activeRituals}</p>
                  <CheckCircle className="h-8 w-8 text-green-600/40" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Sucesso Média</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-primary">{avgSuccessRate.toFixed(0)}%</p>
                  <TrendingUp className="h-8 w-8 text-primary/40" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Participantes Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-primary">{totalParticipants}</p>
                  <Users className="h-8 w-8 text-primary/40" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerta de Falha Cultural */}
          <Card className="border-orange-500/50 bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/50 dark:to-orange-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                <AlertTriangle className="h-6 w-6" />
                Alerta: Falha em Ritual Cultural
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                O <strong>"Ritual de Reconhecimento"</strong> no departamento <strong>Comercial</strong> está com apenas <strong>60% de taxa de sucesso</strong>.
                A IA recomenda intervenção imediata para evitar impacto no engajamento.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2">
                  Ver Detalhes
                </Button>
                <Button className="gap-2">
                  Ações Corretivas
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Rituais Culturais */}
          <div
            ref={ritualsRef}
            className={`transition-all duration-700 delay-200 ${
              ritualsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              Rituais Configurados
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {rituals.map((ritual) => (
                <Card 
                  key={ritual.id} 
                  className={`hover:shadow-lg transition-all hover:-translate-y-1 ${
                    ritual.status === 'alert' ? 'border-orange-300 bg-orange-50/30 dark:bg-orange-950/10' : ''
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{ritual.name}</CardTitle>
                      <Badge 
                        variant={
                          ritual.status === 'active' ? 'default' : 
                          ritual.status === 'alert' ? 'destructive' : 
                          'secondary'
                        }
                        className="gap-1"
                      >
                        {ritual.status === 'active' && <CheckCircle className="h-3 w-3" />}
                        {ritual.status === 'alert' && <AlertTriangle className="h-3 w-3" />}
                        {ritual.status === 'scheduled' && <Clock className="h-3 w-3" />}
                        {ritual.status === 'active' ? 'Ativo' : ritual.status === 'alert' ? 'Atenção' : 'Agendado'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Frequência</p>
                        <p className="font-medium">{ritual.frequency}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Departamento</p>
                        <p className="font-medium">{ritual.department}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Taxa de Sucesso</span>
                        <span className={`font-semibold ${
                          ritual.successRate >= 80 ? 'text-green-600' : 
                          ritual.successRate >= 60 ? 'text-orange-600' : 
                          'text-red-600'
                        }`}>
                          {ritual.successRate}%
                        </span>
                      </div>
                      <Progress 
                        value={ritual.successRate} 
                        className={`h-2 ${
                          ritual.successRate >= 80 ? '[&>div]:bg-green-600' : 
                          ritual.successRate >= 60 ? '[&>div]:bg-orange-600' : 
                          '[&>div]:bg-red-600'
                        }`}
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="space-y-1 text-sm">
                        <p className="text-muted-foreground">Participantes</p>
                        <p className="font-semibold flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {ritual.participants} pessoas
                        </p>
                      </div>
                      <div className="space-y-1 text-sm text-right">
                        <p className="text-muted-foreground">Próximo</p>
                        <p className="font-semibold text-primary">{ritual.nextDate}</p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full gap-2">
                      Gerenciar Ritual
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Impacto Medido */}
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-600" />
                Impacto Medido dos Rituais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-600 mb-2">+42%</p>
                  <p className="text-sm text-muted-foreground">Aumento no Engajamento</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600 mb-2">-28%</p>
                  <p className="text-sm text-muted-foreground">Redução no Risco de Turnover</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary mb-2">+35%</p>
                  <p className="text-sm text-muted-foreground">Melhoria na Comunicação</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardRHCaaS;