import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palmtree, Users, Clock, CheckCircle2, AlertTriangle, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const solicitacoes = [
  { nome: "Maria QA", dept: "Tecnologia", periodo: "01/05 - 15/05/2026", dias: 15, status: "Aprovada", foto: "Maria" },
  { nome: "Carlos Dev", dept: "Tecnologia", periodo: "10/06 - 25/06/2026", dias: 15, status: "Pendente", foto: "Carlos" },
  { nome: "Ana Costa", dept: "Marketing", periodo: "01/07 - 30/07/2026", dias: 30, status: "Pendente", foto: "AnaC" },
  { nome: "Rafael Oliveira", dept: "Vendas", periodo: "15/04 - 17/04/2026", dias: 3, status: "Ausência", foto: "Rafael" },
];

const DashboardRHFerias = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Palmtree className="h-8 w-8 text-[hsl(243,75%,59%)]" />
          <h1 className="text-3xl font-bold text-foreground">Férias & Ausências</h1>
        </div>
        <p className="text-muted-foreground ml-11">Gestão centralizada de férias, licenças e ausências da equipe.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "De Férias Agora", value: "2", icon: Palmtree, color: "text-emerald-600" },
          { label: "Solicitações Pendentes", value: "3", icon: Clock, color: "text-amber-600" },
          { label: "Férias Vencendo", value: "5", icon: AlertTriangle, color: "text-red-600" },
          { label: "Ausências (mês)", value: "8", icon: Calendar, color: "text-blue-600" },
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
        {solicitacoes.map((s) => (
          <Card key={s.nome + s.periodo} className="hover:shadow-md transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <Avatar className="h-11 w-11">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s.foto}`} />
                    <AvatarFallback>{s.nome.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{s.nome}</h3>
                    <p className="text-sm text-muted-foreground">{s.dept} · {s.periodo} · {s.dias} dias</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={`border-0 text-xs ${s.status === "Aprovada" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : s.status === "Pendente" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"}`}>
                    {s.status}
                  </Badge>
                  {s.status === "Pendente" && (
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">Aprovar</Button>
                      <Button size="sm" variant="outline">Recusar</Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardRHFerias;
