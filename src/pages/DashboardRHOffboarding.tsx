import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserMinus, AlertTriangle, FileText, CheckCircle2, ArrowRight, Brain, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const desligamentos = [
  { nome: "Fernando Alves", cargo: "Dev Backend", dept: "Tecnologia", tipo: "Voluntário", motivo: "Proposta Externa", progresso: 60, etapa: "Entrevista de Desligamento", foto: "Fernando" },
  { nome: "Camila Rocha", cargo: "Analista Comercial", dept: "Vendas", tipo: "Involuntário", motivo: "Reestruturação", progresso: 30, etapa: "Documentação", foto: "Camila" },
  { nome: "Lucas Neto", cargo: "Designer Jr", dept: "Design", tipo: "Voluntário", motivo: "Carreira", progresso: 90, etapa: "Devolução de Equipamentos", foto: "LucasN" },
];

const DashboardRHOffboarding = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <UserMinus className="h-8 w-8 text-[hsl(243,75%,59%)]" />
          <h1 className="text-3xl font-bold text-foreground">Offboarding Estratégico</h1>
        </div>
        <p className="text-muted-foreground ml-11">Gestão estruturada de desligamentos com entrevistas de saída e insights de retenção.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Em Andamento", value: "3", icon: UserMinus, color: "text-blue-600" },
          { label: "Voluntários (trim.)", value: "5", icon: TrendingDown, color: "text-amber-600" },
          { label: "Entrevistas Pendentes", value: "2", icon: FileText, color: "text-red-600" },
          { label: "Concluídos (trim.)", value: "8", icon: CheckCircle2, color: "text-emerald-600" },
        ].map((s) => (
          <Card key={s.label} className="border-border/50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2.5 rounded-lg bg-muted"><s.icon className={`h-5 w-5 ${s.color}`} /></div>
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Insight */}
      <Card className="mb-6 bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/60 dark:border-amber-800/40">
        <CardContent className="p-4 flex items-start gap-3">
          <Brain className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">Insight da IA: Padrão de Turnover</p>
            <p className="text-sm text-muted-foreground mt-1">70% dos desligamentos voluntários nos últimos 6 meses citam "falta de plano de carreira" como motivo principal. Recomendação: revisar trilhas de crescimento no departamento de Tecnologia.</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {desligamentos.map((d) => (
          <Card key={d.nome} className="hover:shadow-md transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <Avatar className="h-11 w-11">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${d.foto}`} />
                    <AvatarFallback>{d.nome.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{d.nome}</h3>
                      <Badge className={`border-0 text-xs ${d.tipo === "Voluntário" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"}`}>
                        {d.tipo}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{d.cargo} · {d.dept} · Motivo: {d.motivo}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <Progress value={d.progresso} className="h-2 flex-1 max-w-xs" />
                      <span className="text-xs text-muted-foreground">{d.etapa}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2 ml-4">Gerenciar <ArrowRight className="h-3.5 w-3.5" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardRHOffboarding;
