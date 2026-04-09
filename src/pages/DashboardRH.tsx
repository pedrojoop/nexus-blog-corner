import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles, Activity, UserMinus, ShieldAlert, TrendingUp,
  Briefcase, CalendarClock, ArrowRight, AlertTriangle, Zap, Brain
} from "lucide-react";

const alertCards = [
  {
    title: "Saúde & Ponto (SST + Ponto)",
    icon: Activity,
    badgeLabel: "Ação da IA",
    badgeVariant: "default" as const,
    badgeClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-0",
    cardBg: "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-800/40",
    iconColor: "text-emerald-600",
    subtitle: "Leitura de Atestado Concluída (OCR)",
    message: "O colaborador João Silva enviou um atestado. A IA identificou o CID J01 e já abateu 3 dias automaticamente no espelho de ponto.",
    button: "Ver Espelho de Ponto",
  },
  {
    title: "Offboarding Estratégico",
    icon: UserMinus,
    badgeLabel: "Insight",
    badgeVariant: "default" as const,
    badgeClass: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-0",
    cardBg: "bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/60 dark:border-amber-800/40",
    iconColor: "text-amber-600",
    subtitle: "Risco de Turnover na Tecnologia",
    message: "A IA cruzou os dados das últimas 5 entrevistas de desligamento: 70% dos desenvolvedores alegam falta de plano de carreira e salários 20% abaixo do mercado.",
    button: "Analisar Relatório",
  },
  {
    title: "Compliance & Denúncias",
    icon: ShieldAlert,
    badgeLabel: "Crítico",
    badgeVariant: "destructive" as const,
    badgeClass: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border-0",
    cardBg: "bg-red-50/50 dark:bg-red-950/20 border-red-200/60 dark:border-red-800/40",
    iconColor: "text-red-600",
    subtitle: "Nova Denúncia Anônima Recebida",
    message: "Uma denúncia de assédio moral no departamento de Vendas foi registrada há 2 horas. Acesso restrito apenas ao comitê de ética.",
    button: "Acessar Cofre Seguro",
  },
  {
    title: "Performance & Talentos (9-Box)",
    icon: TrendingUp,
    badgeLabel: "Aviso da IA",
    badgeVariant: "default" as const,
    badgeClass: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-0",
    cardBg: "bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/60 dark:border-amber-800/40",
    iconColor: "text-amber-600",
    subtitle: "Gargalo de Liderança",
    message: "Fim do ciclo de avaliação: A matriz 9-Box indica que 3 diretorias não possuem sucessores prontos na faixa de 'Alto Potencial/Alto Desempenho'.",
    button: "Abrir Matriz 9-Box",
  },
  {
    title: "Recrutamento (ATS)",
    icon: Briefcase,
    badgeLabel: "Ação da IA",
    badgeVariant: "default" as const,
    badgeClass: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-0",
    cardBg: "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/60 dark:border-blue-800/40",
    iconColor: "text-blue-600",
    subtitle: "Triagem de Currículos",
    message: "A IA analisou 142 currículos para a vaga de Dev Senior e separou os 5 perfis com maior fit cultural baseados no histórico da empresa.",
    button: "Ver Shortlist",
  },
  {
    title: "Força de Trabalho (Escalas)",
    icon: CalendarClock,
    badgeLabel: "Aviso da IA",
    badgeVariant: "default" as const,
    badgeClass: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-0",
    cardBg: "bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/60 dark:border-amber-800/40",
    iconColor: "text-amber-600",
    subtitle: "Conflito de Escala Detectado",
    message: "O turno da noite de sexta-feira está com déficit de 2 pessoas. A IA sugere acionar Maria e Pedro, que têm banco de horas positivo.",
    button: "Ajustar Escala",
  },
];

const DashboardRH = () => {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Brain className="h-8 w-8 text-[hsl(243,75%,59%)]" />
              <h1 className="text-3xl font-bold text-foreground">Centro de Comando RH (AI Co-pilot)</h1>
            </div>
            <p className="text-muted-foreground ml-11">
              Visão unificada e alertas preditivos de toda a jornada do colaborador.
            </p>
          </div>
          <Badge className="bg-[hsl(243,75%,59%)]/10 text-[hsl(243,75%,59%)] border border-[hsl(243,75%,59%)]/20 px-4 py-2 text-sm font-semibold gap-2 hover:bg-[hsl(243,75%,59%)]/15">
            <Sparkles className="h-4 w-4 animate-pulse" />
            AI Insights Ativos
          </Badge>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Alertas Ativos", value: "6", icon: AlertTriangle, color: "text-amber-600" },
          { label: "Ações da IA Hoje", value: "12", icon: Zap, color: "text-blue-600" },
          { label: "Críticos", value: "1", icon: ShieldAlert, color: "text-red-600" },
          { label: "Resolvidos (7d)", value: "34", icon: Activity, color: "text-emerald-600" },
        ].map((stat) => (
          <Card key={stat.label} className="border-border/50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2.5 rounded-lg bg-muted">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Alert Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {alertCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className={`${card.cardBg} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-card/80 shadow-sm">
                      <Icon className={`h-5 w-5 ${card.iconColor}`} />
                    </div>
                    <CardTitle className="text-base font-semibold text-foreground">{card.title}</CardTitle>
                  </div>
                  <Badge className={card.badgeClass + " text-xs font-semibold"}>
                    {card.badgeLabel}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm font-semibold text-foreground/90">{card.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.message}</p>
                <Button variant="outline" size="sm" className="w-full gap-2 mt-2 bg-card/60 hover:bg-card">
                  {card.button}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default DashboardRH;
