import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, TrendingUp, Users, Send, BarChart3, ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const pesquisas = [
  { titulo: "eNPS Q1 2026", tipo: "eNPS", respostas: 38, total: 42, score: 72, status: "Concluída", data: "Mar/2026" },
  { titulo: "Clima Organizacional", tipo: "Clima", respostas: 25, total: 42, score: null, status: "Em Andamento", data: "Abr/2026" },
  { titulo: "Pesquisa de Pulso - Semanal", tipo: "Pulso", respostas: 30, total: 42, score: 65, status: "Concluída", data: "Sem 14/2026" },
  { titulo: "Satisfação com Benefícios", tipo: "Satisfação", respostas: 0, total: 42, score: null, status: "Agendada", data: "Mai/2026" },
];

const DashboardRHPesquisas = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <ClipboardList className="h-8 w-8 text-[hsl(243,75%,59%)]" />
              <h1 className="text-3xl font-bold text-foreground">Pesquisas (eNPS)</h1>
            </div>
            <p className="text-muted-foreground ml-11">Meça o pulso da organização com pesquisas de engajamento e satisfação.</p>
          </div>
          <Button className="gap-2 bg-[hsl(243,75%,59%)] hover:bg-[hsl(243,75%,50%)]">
            <Plus className="h-4 w-4" /> Nova Pesquisa
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "eNPS Atual", value: "72", icon: TrendingUp, color: "text-emerald-600" },
          { label: "Pesquisas Ativas", value: "1", icon: Send, color: "text-blue-600" },
          { label: "Taxa de Resposta", value: "90%", icon: Users, color: "text-purple-600" },
          { label: "Total Realizadas", value: "12", icon: BarChart3, color: "text-amber-600" },
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

      <div className="space-y-4">
        {pesquisas.map((p) => (
          <Card key={p.titulo} className="hover:shadow-md transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{p.titulo}</h3>
                    <Badge variant="secondary" className="text-xs">{p.tipo}</Badge>
                    <Badge className={`border-0 text-xs ${p.status === "Concluída" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : p.status === "Em Andamento" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" : "bg-muted text-muted-foreground"}`}>
                      {p.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{p.data}</span>
                    <span>{p.respostas}/{p.total} respostas</span>
                    {p.score !== null && (
                      <span className={`font-semibold ${p.score >= 70 ? "text-emerald-600" : p.score >= 50 ? "text-amber-600" : "text-red-600"}`}>
                        Score: {p.score}
                      </span>
                    )}
                  </div>
                  {p.status === "Em Andamento" && (
                    <Progress value={(p.respostas / p.total) * 100} className="h-2 max-w-xs mt-2" />
                  )}
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  {p.status === "Concluída" ? "Ver Resultados" : p.status === "Em Andamento" ? "Acompanhar" : "Configurar"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardRHPesquisas;
