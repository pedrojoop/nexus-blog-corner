import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Brain, AlertTriangle, TrendingDown, Target, BarChart3, Users, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const DashboardRH = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: alertRef, isVisible: alertVisible } = useScrollAnimation();
  const { ref: employeesRef, isVisible: employeesVisible } = useScrollAnimation();

  const atRiskEmployees = [
    { 
      name: "Carlos Mendes", 
      role: "Desenvolvedor Sr.", 
      risk: 92, 
      factors: ["Horas extras excessivas", "Baixo engajamento", "Sem 1:1s há 60 dias"],
      department: "Tecnologia"
    },
    { 
      name: "Patrícia Lima", 
      role: "Designer UX", 
      risk: 85, 
      factors: ["Feedback negativo recorrente", "Ausências", "Baixa produtividade"],
      department: "Produto"
    },
    { 
      name: "Roberto Silva", 
      role: "Analista QA", 
      risk: 78, 
      factors: ["Isolamento social", "Sem reconhecimento", "Metas atrasadas"],
      department: "Tecnologia"
    },
  ];

  const culturalFailures = [
    { ritual: "Ritual de Reconhecimento", department: "Comercial", successRate: 60, status: "critical" },
    { ritual: "1:1 com Gestor", department: "Tecnologia", successRate: 72, status: "warning" },
  ];

  const criticalSkills = [
    { skill: "Backend Python", currentExperts: 3, atRisk: 2, inTraining: 1 },
    { skill: "Liderança de Squad", currentExperts: 5, atRisk: 1, inTraining: 2 },
    { skill: "Gestão de Vendas", currentExperts: 4, atRisk: 2, inTraining: 0 },
  ];

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
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Inteligência Preditiva
            </h1>
            <p className="text-muted-foreground">Dashboard de Alertas e Prescrição de Ações</p>
          </div>

          {/* Alerta Crítico Principal */}
          <div
            ref={alertRef}
            className={`transition-all duration-700 delay-100 ${
              alertVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Card className="bg-gradient-to-r from-red-600 to-orange-600 text-white border-none shadow-2xl">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Brain className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-1">Alerta Crítico: Risco de Turnover</CardTitle>
                    <p className="text-white/90">IA identificou 3 colaboradores em risco alto de desligamento</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">87%</div>
                    <div className="text-sm text-white/80">Acurácia</div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Colaboradores em Risco Alto */}
          <div
            ref={employeesRef}
            className={`transition-all duration-700 delay-200 ${
              employeesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              Colaboradores em Risco Alto
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {atRiskEmployees.map((person, i) => (
                <Card key={i} className="border-red-200 bg-red-50/50 dark:bg-red-950/20 hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{person.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">{person.role}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Risco de Saída</span>
                        <span className="text-xl font-bold text-red-600">{person.risk}%</span>
                      </div>
                      <Progress 
                        value={person.risk} 
                        className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-red-500 [&>div]:to-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground">Fatores Identificados:</p>
                      {person.factors.map((factor, j) => (
                        <div key={j} className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-1.5 rounded">
                          • {factor}
                        </div>
                      ))}
                    </div>
                    <Button className="w-full gap-2 mt-2">
                      <Target className="h-4 w-4" />
                      Ver Plano de Ação
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Falhas Culturais (CaaS) */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <TrendingDown className="h-6 w-6 text-orange-600" />
              Falhas em Rituais Culturais (CaaS)
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {culturalFailures.map((failure, i) => (
                <Card 
                  key={i} 
                  className={`border-orange-300 bg-orange-50/30 dark:bg-orange-950/10 hover:shadow-lg transition-all`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{failure.ritual}</CardTitle>
                      <Badge variant="destructive" className="gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {failure.status === 'critical' ? 'Crítico' : 'Atenção'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Departamento</p>
                        <p className="font-semibold">{failure.department}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Taxa de Sucesso</p>
                        <p className="font-semibold text-orange-600">{failure.successRate}%</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Ritual falhou em {100 - failure.successRate}% das execuções previstas. 
                      Necessita intervenção para restaurar engajamento.
                    </p>
                    <Button variant="outline" className="w-full gap-2">
                      Ações Corretivas
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Plano de Sucessão - Skills em Risco */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Plano de Sucessão: Skills em Risco Crítico
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {criticalSkills.map((skill, i) => (
                    <div key={i} className="space-y-3 pb-6 border-b last:border-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{skill.skill}</h3>
                          <p className="text-sm text-muted-foreground">
                            {skill.currentExperts} especialistas ativos • {skill.atRisk} em risco de saída
                          </p>
                        </div>
                        <Badge variant={skill.inTraining > 0 ? 'default' : 'destructive'}>
                          {skill.inTraining > 0 ? `${skill.inTraining} em treinamento` : 'Sem sucessores'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <p className="text-2xl font-bold text-primary">{skill.currentExperts}</p>
                          <p className="text-xs text-muted-foreground">Especialistas</p>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                          <p className="text-2xl font-bold text-red-600">{skill.atRisk}</p>
                          <p className="text-xs text-muted-foreground">Em Risco</p>
                        </div>
                        <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{skill.inTraining}</p>
                          <p className="text-xs text-muted-foreground">Sucessores</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ações Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <BarChart3 className="h-6 w-6" />
                <span>Relatório Completo</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Target className="h-6 w-6" />
                <span>Planos de Ação</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Clock className="h-6 w-6" />
                <span>Histórico de Alertas</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardRH;
