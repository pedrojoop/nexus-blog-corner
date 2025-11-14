import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingDown, 
  TrendingUp,
  AlertTriangle,
  Users,
  Award,
  MessageSquare,
  Target,
  Shield,
  Calendar,
  Download
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";

const DashboardIADiagnostico = () => {
  const headerSection = useScrollAnimation();
  const alertsSection = useScrollAnimation();
  const metricsSection = useScrollAnimation();
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // Mock data - In production, this would come from AI analysis with proper aggregation (min 5 people)
  const systemAlerts = [
    {
      id: 1,
      severity: "high" as const,
      title: "Queda de Engajamento no Departamento de TI",
      description: "O engajamento do time de TI caiu 30% nas últimas 2 semanas após o último sprint.",
      affectedCount: 12,
      recommendation: "Recomendamos implementar um ritual de retrospectiva e pausas entre sprints.",
      actionPath: "/dashboard/rh/caas"
    },
    {
      id: 2,
      severity: "medium" as const,
      title: "Baixa Participação em Rituais de 1:1",
      description: "Apenas 45% dos 1:1s agendados foram completados no departamento de Vendas.",
      affectedCount: 8,
      recommendation: "Considere um treinamento de liderança sobre a importância dos 1:1s.",
      actionPath: "/dashboard/rh/lms"
    },
    {
      id: 3,
      severity: "low" as const,
      title: "Oportunidade: Alta Adoção de Treinamentos",
      description: "O departamento de Marketing teve 85% de conclusão de cursos LMS este mês.",
      affectedCount: 15,
      recommendation: "Considere replicar as práticas do time de Marketing para outros departamentos.",
      actionPath: "/dashboard/rh/lms"
    }
  ];

  const departmentMetrics = {
    all: {
      name: "Toda a Empresa",
      totalEmployees: 120,
      engagementIndex: 72,
      engagementTrend: "stable" as const,
      ritualParticipation: 68,
      interTeamConnections: 45,
      lmsCompletion: 62
    },
    ti: {
      name: "TI",
      totalEmployees: 25,
      engagementIndex: 58,
      engagementTrend: "down" as const,
      ritualParticipation: 52,
      interTeamConnections: 35,
      lmsCompletion: 70
    },
    marketing: {
      name: "Marketing",
      totalEmployees: 18,
      engagementIndex: 85,
      engagementTrend: "up" as const,
      ritualParticipation: 88,
      interTeamConnections: 62,
      lmsCompletion: 85
    },
    vendas: {
      name: "Vendas",
      totalEmployees: 22,
      engagementIndex: 70,
      engagementTrend: "stable" as const,
      ritualParticipation: 45,
      interTeamConnections: 50,
      lmsCompletion: 55
    }
  };

  const currentMetrics = departmentMetrics[selectedDepartment as keyof typeof departmentMetrics] || departmentMetrics.all;

  const getSeverityBadge = (severity: string) => {
    if (severity === "high") return <Badge className="bg-red-500">Alta Prioridade</Badge>;
    if (severity === "medium") return <Badge className="bg-yellow-500">Atenção</Badge>;
    return <Badge className="bg-blue-500">Oportunidade</Badge>;
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <div className="h-4 w-4" />;
  };

  const getMetricColor = (value: number, threshold: number = 70) => {
    if (value >= threshold) return "text-green-600";
    if (value >= threshold - 20) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <DashboardLayout>
      <div ref={headerSection.ref} className={`transition-all duration-700 ${headerSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">IA de Diagnóstico</h1>
            </div>
            <p className="text-muted-foreground">
              Análise sistêmica da saúde cultural da organização
            </p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>

        {/* Department Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Filtrar por Departamento:</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toda a Empresa</SelectItem>
                  <SelectItem value="ti">TI (25 pessoas)</SelectItem>
                  <SelectItem value="marketing">Marketing (18 pessoas)</SelectItem>
                  <SelectItem value="vendas">Vendas (22 pessoas)</SelectItem>
                </SelectContent>
              </Select>
              <Badge variant="outline" className="ml-auto">
                {currentMetrics.totalEmployees} colaboradores
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Alerts */}
      <div ref={alertsSection.ref} className={`transition-all duration-700 ${alertsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} mb-6`}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Alertas Sistêmicos
            </CardTitle>
            <CardDescription>
              Insights sobre processos e dinâmicas organizacionais
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemAlerts.map((alert) => (
              <Alert key={alert.id} className="border-l-4" style={{
                borderLeftColor: alert.severity === 'high' ? 'rgb(239 68 68)' : 
                                alert.severity === 'medium' ? 'rgb(234 179 8)' : 
                                'rgb(59 130 246)'
              }}>
                <AlertDescription>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getSeverityBadge(alert.severity)}
                        <span className="text-xs text-muted-foreground">
                          Afeta {alert.affectedCount} colaboradores (agregado)
                        </span>
                      </div>
                      <h4 className="font-semibold text-foreground mb-1">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
                      
                      <div className="bg-accent/50 p-3 rounded-lg mb-3">
                        <p className="text-sm">
                          <strong className="text-foreground">Ação Recomendada:</strong>{" "}
                          <span className="text-muted-foreground">{alert.recommendation}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Target className="h-4 w-4" />
                    Implementar Ação
                  </Button>
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics Dashboard */}
      <div ref={metricsSection.ref} className={`transition-all duration-700 ${metricsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} mb-6`}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Índices de Saúde Cultural - {currentMetrics.name}
            </CardTitle>
            <CardDescription>
              Dados agregados (mínimo 5 pessoas por métrica)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Engagement Index */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Índice de Engajamento</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(currentMetrics.engagementTrend)}
                    <span className={`text-2xl font-bold ${getMetricColor(currentMetrics.engagementIndex)}`}>
                      {currentMetrics.engagementIndex}%
                    </span>
                  </div>
                </div>
                <Progress value={currentMetrics.engagementIndex} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Baseado em participação em eventos, interações no feed e conclusão de rituais
                </p>
              </div>

              {/* Ritual Participation */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Participação em Rituais CaaS</span>
                  </div>
                  <span className={`text-2xl font-bold ${getMetricColor(currentMetrics.ritualParticipation)}`}>
                    {currentMetrics.ritualParticipation}%
                  </span>
                </div>
                <Progress value={currentMetrics.ritualParticipation} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Taxa de conclusão de 1:1s, reconhecimentos e outros rituais culturais
                </p>
              </div>

              {/* Inter-team Connections */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Conexões Inter-times</span>
                  </div>
                  <span className={`text-2xl font-bold ${getMetricColor(currentMetrics.interTeamConnections, 50)}`}>
                    {currentMetrics.interTeamConnections}%
                  </span>
                </div>
                <Progress value={currentMetrics.interTeamConnections} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Percentual de interações com colaboradores fora do próprio departamento
                </p>
              </div>

              {/* LMS Completion */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Conclusão de Treinamentos</span>
                  </div>
                  <span className={`text-2xl font-bold ${getMetricColor(currentMetrics.lmsCompletion)}`}>
                    {currentMetrics.lmsCompletion}%
                  </span>
                </div>
                <Progress value={currentMetrics.lmsCompletion} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Taxa de conclusão de cursos iniciados no LMS
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Comparison with Company Average */}
            {selectedDepartment !== "all" && (
              <div className="bg-accent/50 p-4 rounded-lg">
                <h4 className="font-semibold text-sm mb-3">Comparação com a Média da Empresa</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Engajamento:</span>
                    <span className={`ml-2 font-semibold ${currentMetrics.engagementIndex > departmentMetrics.all.engagementIndex ? 'text-green-600' : 'text-red-600'}`}>
                      {currentMetrics.engagementIndex > departmentMetrics.all.engagementIndex ? '+' : ''}
                      {currentMetrics.engagementIndex - departmentMetrics.all.engagementIndex}%
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rituais:</span>
                    <span className={`ml-2 font-semibold ${currentMetrics.ritualParticipation > departmentMetrics.all.ritualParticipation ? 'text-green-600' : 'text-red-600'}`}>
                      {currentMetrics.ritualParticipation > departmentMetrics.all.ritualParticipation ? '+' : ''}
                      {currentMetrics.ritualParticipation - departmentMetrics.all.ritualParticipation}%
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Conexões:</span>
                    <span className={`ml-2 font-semibold ${currentMetrics.interTeamConnections > departmentMetrics.all.interTeamConnections ? 'text-green-600' : 'text-red-600'}`}>
                      {currentMetrics.interTeamConnections > departmentMetrics.all.interTeamConnections ? '+' : ''}
                      {currentMetrics.interTeamConnections - departmentMetrics.all.interTeamConnections}%
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">LMS:</span>
                    <span className={`ml-2 font-semibold ${currentMetrics.lmsCompletion > departmentMetrics.all.lmsCompletion ? 'text-green-600' : 'text-red-600'}`}>
                      {currentMetrics.lmsCompletion > departmentMetrics.all.lmsCompletion ? '+' : ''}
                      {currentMetrics.lmsCompletion - departmentMetrics.all.lmsCompletion}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Privacy & Ethics Notice */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                Privacidade e Agregação de Dados
              </p>
              <p className="text-xs text-muted-foreground">
                Todos os dados exibidos são agregados (mínimo de 5 pessoas por métrica) e anônimos. 
                Esta IA analisa processos e sistemas, não pessoas. Nenhum dado individual está 
                disponível para gestores. O foco é sempre em melhorar processos, não em monitorar indivíduos.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DashboardIADiagnostico;
