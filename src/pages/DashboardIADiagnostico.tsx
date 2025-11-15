import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  TrendingDown, 
  TrendingUp,
  AlertTriangle,
  Users,
  Target,
  Shield,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useNavigate } from "react-router-dom";

const DashboardIADiagnostico = () => {
  const headerSection = useScrollAnimation();
  const alertsSection = useScrollAnimation();
  const navigate = useNavigate();

  const systemAlerts = [
    {
      id: 1,
      severity: "high" as const,
      title: "Queda de Engajamento no Departamento de TI",
      description: "O engajamento do time de TI caiu 30% nas últimas 2 semanas após o último sprint.",
      affectedCount: 12,
      department: "TI",
      change: -30,
      timestamp: "Há 2 horas",
      action: {
        title: "Agendar Retrospectiva de Sprint",
        description: "Configure um ritual de 'Retrospectiva de Sprint' no CaaS para o time de TI e garanta pausas obrigatórias pós-sprint.",
        link: "/dashboard/rh/caas",
        linkText: "Configurar no CaaS"
      }
    },
    {
      id: 2,
      severity: "medium" as const,
      title: "Baixa Participação em Rituais de 1:1",
      description: "Apenas 45% dos 1:1s agendados foram completados no departamento de Vendas.",
      affectedCount: 8,
      department: "Vendas",
      change: -55,
      timestamp: "Há 5 horas",
      action: {
        title: "Criar Treinamento sobre 1:1s",
        description: "Crie um micro-treinamento no LMS sobre 'A Importância do 1:1 para o Desenvolvimento de Carreira' e configure lembretes automáticos de agendamento.",
        link: "/dashboard/rh/lms",
        linkText: "Criar no LMS"
      }
    },
    {
      id: 3,
      severity: "low" as const,
      title: "Oportunidade: Alta Adoção de Treinamentos",
      description: "O departamento de Marketing teve 85% de conclusão de cursos LMS este mês.",
      affectedCount: 15,
      department: "Marketing",
      change: 25,
      timestamp: "Há 1 dia",
      action: {
        title: "Replicar Boas Práticas",
        description: "Identifique e replique as estratégias de engajamento do Marketing nos outros departamentos.",
        link: "/dashboard/rh/caas",
        linkText: "Ver Estratégias no CaaS"
      }
    }
  ];

  const getSeverityBadge = (severity: string) => {
    if (severity === "high") return <Badge className="bg-red-500">Alta Prioridade</Badge>;
    if (severity === "medium") return <Badge className="bg-yellow-500">Atenção</Badge>;
    return <Badge className="bg-blue-500">Oportunidade</Badge>;
  };

  return (
    <DashboardLayout>
      <div ref={headerSection.ref} className={`transition-all duration-700 ${headerSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">IA de Cultura e Engajamento</h1>
          </div>
          <p className="text-muted-foreground">
            Insights sistêmicos e sugestões de ação para melhorar a saúde cultural da empresa
          </p>
        </div>

        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <Shield className="h-4 w-4 text-primary" />
          <AlertDescription>
            <strong>Privacidade e Ética:</strong> Todos os dados exibidos aqui são agregados e anônimos (mínimo de 5 pessoas). 
            Nenhum gestor tem acesso a dados individuais ou riscos de colaboradores específicos.
          </AlertDescription>
        </Alert>
      </div>

      <div ref={alertsSection.ref} className={`transition-all duration-700 ${alertsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Alertas e Sugestões de Ação
            </CardTitle>
            <CardDescription>
              Análise agregada e anônima com recomendações específicas e acionáveis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemAlerts.map((alert) => (
              <Card key={alert.id} className={`border-l-4 ${
                alert.severity === 'high' ? 'border-l-red-500' : 
                alert.severity === 'medium' ? 'border-l-yellow-500' : 
                'border-l-green-500'
              }`}>
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
                          <span className="text-foreground">{alert.affectedCount} colaboradores (agregado)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground">{alert.department}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {alert.change > 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                          <span className={alert.change > 0 ? 'text-green-600' : 'text-red-600'}>
                            {alert.change > 0 ? '+' : ''}{alert.change}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-3" />

                  <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Sparkles className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground mb-1">{alert.action.title}</p>
                        <p className="text-sm text-muted-foreground">{alert.action.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="default" className="gap-2" onClick={() => navigate(alert.action.link)}>
                        {alert.action.linkText}
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">Marcar como Concluído</Button>
                      <Button size="sm" variant="ghost">Dispensar</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardIADiagnostico;
