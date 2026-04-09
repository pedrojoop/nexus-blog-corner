import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCheck, Users, Clock, CheckCircle2, AlertTriangle, ArrowRight, FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const admissoes = [
  { nome: "Ana Beatriz Costa", cargo: "Dev Full-Stack", dept: "Tecnologia", inicio: "15/04/2026", progresso: 85, pendencias: 1, foto: "Ana" },
  { nome: "Rafael Oliveira", cargo: "Analista de Marketing", dept: "Marketing", inicio: "20/04/2026", progresso: 60, pendencias: 3, foto: "Rafael" },
  { nome: "Juliana Santos", cargo: "Gerente de Produto", dept: "Produto", inicio: "01/05/2026", progresso: 30, pendencias: 5, foto: "Juliana" },
];

const DashboardRHAdmissao = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <FileCheck className="h-8 w-8 text-[hsl(243,75%,59%)]" />
          <h1 className="text-3xl font-bold text-foreground">Admissão Digital</h1>
        </div>
        <p className="text-muted-foreground ml-11">Processo de admissão 100% digital com coleta automática de documentos.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Admissões em Andamento", value: "3", icon: Users, color: "text-blue-600" },
          { label: "Documentos Pendentes", value: "9", icon: AlertTriangle, color: "text-amber-600" },
          { label: "Concluídas (mês)", value: "7", icon: CheckCircle2, color: "text-emerald-600" },
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
        {admissoes.map((a) => (
          <Card key={a.nome} className="hover:shadow-md transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${a.foto}`} />
                    <AvatarFallback>{a.nome.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{a.nome}</h3>
                    <p className="text-sm text-muted-foreground">{a.cargo} · {a.dept} · Início: {a.inicio}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <Progress value={a.progresso} className="h-2 flex-1 max-w-xs" />
                      <span className="text-xs text-muted-foreground">{a.progresso}%</span>
                      {a.pendencias > 0 && (
                        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-0 text-xs">
                          {a.pendencias} pendência{a.pendencias > 1 ? "s" : ""}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  Gerenciar <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardRHAdmissao;
