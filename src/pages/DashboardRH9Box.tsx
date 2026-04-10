import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Grid3X3, TrendingUp, Award, UserPlus, FileText, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  avatar: string;
  initials: string;
  performance: number; // 0=below, 1=meets, 2=exceeds
  potential: number;   // 0=low, 1=medium, 2=high
  okrScore: number;
  score360: number;
  aiInsight: string;
  tenure: string;
}

const employees: Employee[] = [
  { id: 1, name: "Mariana Alves", role: "Desenvolvedora Sênior", department: "Tecnologia", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana", initials: "MA", performance: 2, potential: 2, okrScore: 120, score360: 95, aiInsight: "A IA sugere preparação para Tech Lead. Mariana superou as metas (OKRs) em 120% e tem 95% de aprovação na avaliação 360º de seus pares.", tenure: "3 anos" },
  { id: 2, name: "Rafael Costa", role: "Tech Lead", department: "Tecnologia", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rafael", initials: "RC", performance: 2, potential: 2, okrScore: 115, score360: 92, aiInsight: "Rafael demonstra forte liderança técnica. Recomendação: considerar para posição de Engineering Manager.", tenure: "5 anos" },
  { id: 3, name: "Juliana Ferreira", role: "UX Designer", department: "Tecnologia", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana", initials: "JF", performance: 2, potential: 2, okrScore: 110, score360: 88, aiInsight: "Juliana tem alto potencial criativo. Sugestão: liderar o novo Design System da empresa.", tenure: "2 anos" },
  { id: 4, name: "Lucas Mendes", role: "Desenvolvedor Pleno", department: "Tecnologia", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LucasM", initials: "LM", performance: 2, potential: 1, okrScore: 105, score360: 82, aiInsight: "Consistente em entregas. Investir em mentoria para desenvolver habilidades de liderança.", tenure: "2 anos" },
  { id: 5, name: "Camila Santos", role: "Product Manager", department: "Produto", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Camila", initials: "CS", performance: 1, potential: 2, okrScore: 95, score360: 90, aiInsight: "Alto potencial não totalmente aproveitado. A IA recomenda projeto desafiador para acelerar desenvolvimento.", tenure: "1 ano" },
  { id: 6, name: "Bruno Oliveira", role: "Analista de Dados", department: "Tecnologia", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bruno", initials: "BO", performance: 1, potential: 1, okrScore: 88, score360: 78, aiInsight: "Desempenho estável. Plano de desenvolvimento focado em comunicação e gestão de stakeholders.", tenure: "3 anos" },
  { id: 7, name: "Fernanda Lima", role: "QA Engineer", department: "Tecnologia", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda", initials: "FL", performance: 1, potential: 0, okrScore: 80, score360: 72, aiInsight: "Boa execução técnica, porém com potencial limitado de crescimento vertical. Considerar especialização.", tenure: "4 anos" },
  { id: 8, name: "Pedro Souza", role: "Estagiário Dev", department: "Tecnologia", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PedroS", initials: "PS", performance: 0, potential: 2, okrScore: 60, score360: 70, aiInsight: "Recém-chegado com alto potencial. A IA recomenda programa de aceleração e mentoria sênior.", tenure: "3 meses" },
  { id: 9, name: "Ana Rodrigues", role: "Desenvolvedora Jr", department: "Tecnologia", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnaR", initials: "AR", performance: 0, potential: 1, okrScore: 55, score360: 65, aiInsight: "Precisa de acompanhamento mais próximo. Sugestão: reuniões 1:1 semanais com gestor direto.", tenure: "6 meses" },
  { id: 10, name: "Thiago Martins", role: "Suporte Técnico", department: "Operações", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thiago", initials: "TM", performance: 0, potential: 0, okrScore: 40, score360: 50, aiInsight: "Risco de desengajamento identificado. Urgente: reunião de feedback e plano de melhoria (PIP).", tenure: "2 anos" },
];

const quadrantConfig: Record<string, { label: string; sublabel: string; bg: string; border: string; textColor: string }> = {
  "2-2": { label: "Talento de Topo", sublabel: "Sucessor", bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-200 dark:border-emerald-800", textColor: "text-emerald-700 dark:text-emerald-300" },
  "2-1": { label: "Alto Desempenho", sublabel: "Potencial Mediano", bg: "bg-emerald-50/50 dark:bg-emerald-950/20", border: "border-emerald-100 dark:border-emerald-900", textColor: "text-emerald-600 dark:text-emerald-400" },
  "2-0": { label: "Especialista", sublabel: "Eficaz, Baixo Pot.", bg: "bg-sky-50 dark:bg-sky-950/20", border: "border-sky-200 dark:border-sky-800", textColor: "text-sky-700 dark:text-sky-300" },
  "1-2": { label: "Alto Potencial", sublabel: "Desenvolver", bg: "bg-amber-50 dark:bg-amber-950/20", border: "border-amber-200 dark:border-amber-800", textColor: "text-amber-700 dark:text-amber-300" },
  "1-1": { label: "Core Player", sublabel: "Mantenedor", bg: "bg-slate-50 dark:bg-slate-800/30", border: "border-slate-200 dark:border-slate-700", textColor: "text-slate-600 dark:text-slate-400" },
  "1-0": { label: "Eficaz", sublabel: "Limitado", bg: "bg-slate-50 dark:bg-slate-800/20", border: "border-slate-200 dark:border-slate-700", textColor: "text-slate-500 dark:text-slate-500" },
  "0-2": { label: "Enigma", sublabel: "Alto Pot., Baixo Desemp.", bg: "bg-violet-50 dark:bg-violet-950/20", border: "border-violet-200 dark:border-violet-800", textColor: "text-violet-700 dark:text-violet-300" },
  "0-1": { label: "Questionável", sublabel: "Atenção Necessária", bg: "bg-orange-50 dark:bg-orange-950/20", border: "border-orange-200 dark:border-orange-800", textColor: "text-orange-600 dark:text-orange-400" },
  "0-0": { label: "Risco", sublabel: "Baixo Desempenho", bg: "bg-rose-50 dark:bg-rose-950/20", border: "border-rose-200 dark:border-rose-800", textColor: "text-rose-700 dark:text-rose-300" },
};

const performanceLabels = ["Abaixo do Esperado", "Atingiu as Metas", "Superou as Metas"];
const potentialLabels = ["Baixo", "Médio", "Alto"];

const badgeForQuadrant = (key: string) => {
  if (key === "2-2") return { variant: "default" as const, className: "bg-emerald-600 hover:bg-emerald-600 text-white" };
  if (key === "0-0") return { variant: "destructive" as const, className: "" };
  if (key.includes("2")) return { variant: "default" as const, className: "bg-primary hover:bg-primary text-primary-foreground" };
  return { variant: "secondary" as const, className: "" };
};

const DashboardRH9Box = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(employees[0]);
  const [department, setDepartment] = useState("all");
  const [level, setLevel] = useState("all");

  const filteredEmployees = employees.filter(e => {
    if (department !== "all" && e.department !== department) return false;
    return true;
  });

  const getEmployeesInQuadrant = (perf: number, pot: number) =>
    filteredEmployees.filter(e => e.performance === perf && e.potential === pot);

  const selectedQuadrantKey = `${selectedEmployee.performance}-${selectedEmployee.potential}`;
  const selectedQuadrant = quadrantConfig[selectedQuadrantKey];
  const selectedBadge = badgeForQuadrant(selectedQuadrantKey);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Grid3X3 className="h-7 w-7 text-primary" />
            Matriz 9-Box de Talentos
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Ciclo de Avaliação: Q1 2026 (Análise de IA Concluída)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-[180px] h-9 text-sm">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Deptos.</SelectItem>
              <SelectItem value="Tecnologia">Tecnologia</SelectItem>
              <SelectItem value="Produto">Produto</SelectItem>
              <SelectItem value="Operações">Operações</SelectItem>
            </SelectContent>
          </Select>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="w-[160px] h-9 text-sm">
              <SelectValue placeholder="Nível de Cargo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Níveis</SelectItem>
              <SelectItem value="junior">Júnior</SelectItem>
              <SelectItem value="pleno">Pleno</SelectItem>
              <SelectItem value="senior">Sênior</SelectItem>
              <SelectItem value="lead">Liderança</SelectItem>
            </SelectContent>
          </Select>
          <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 gap-1.5 h-8 px-3">
            <Sparkles className="h-3.5 w-3.5" />
            IA Ativa
          </Badge>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Colaboradores Avaliados", value: filteredEmployees.length, icon: Users, color: "text-primary" },
          { label: "Talentos de Topo", value: getEmployeesInQuadrant(2, 2).length, icon: Award, color: "text-emerald-600" },
          { label: "Alto Potencial", value: filteredEmployees.filter(e => e.potential === 2).length, icon: TrendingUp, color: "text-amber-600" },
          { label: "Atenção / Risco", value: getEmployeesInQuadrant(0, 0).length, icon: Grid3X3, color: "text-rose-600" },
        ].map((m, i) => (
          <Card key={i} className="hover:shadow-none hover:translate-y-0">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={cn("p-2 rounded-lg bg-muted", m.color)}>
                <m.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content: Matrix + Side Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-10 gap-6">
        {/* 9-Box Matrix */}
        <div className="xl:col-span-7">
          <Card className="hover:shadow-none hover:translate-y-0">
            <CardContent className="p-4 sm:p-6">
              {/* Y-axis label */}
              <div className="flex">
                <div className="flex flex-col items-center justify-center pr-3 -mr-1">
                  <span className="text-xs font-semibold text-muted-foreground tracking-wider [writing-mode:vertical-lr] rotate-180">
                    POTENCIAL →
                  </span>
                </div>

                <div className="flex-1">
                  {/* Grid */}
                  <div className="grid grid-rows-3 gap-2">
                    {[2, 1, 0].map((pot) => (
                      <div key={pot} className="grid grid-cols-[40px_1fr_1fr_1fr] gap-2">
                        {/* Y-axis tick */}
                        <div className="flex items-center justify-end pr-1">
                          <span className="text-[10px] font-medium text-muted-foreground text-right leading-tight">
                            {potentialLabels[pot]}
                          </span>
                        </div>

                        {[0, 1, 2].map((perf) => {
                          const key = `${perf}-${pot}`;
                          const config = quadrantConfig[key];
                          const emps = getEmployeesInQuadrant(perf, pot);
                          return (
                            <div
                              key={key}
                              className={cn(
                                "rounded-xl border p-3 min-h-[120px] transition-all",
                                config.bg, config.border
                              )}
                            >
                              <div className="mb-2">
                                <p className={cn("text-xs font-semibold", config.textColor)}>{config.label}</p>
                                <p className="text-[10px] text-muted-foreground">{config.sublabel}</p>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {emps.map((emp) => (
                                  <button
                                    key={emp.id}
                                    onClick={() => setSelectedEmployee(emp)}
                                    className="focus:outline-none"
                                    title={emp.name}
                                  >
                                    <Avatar
                                      className={cn(
                                        "h-9 w-9 transition-all cursor-pointer hover:scale-110",
                                        selectedEmployee.id === emp.id
                                          ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                                          : "ring-1 ring-border"
                                      )}
                                    >
                                      <AvatarImage src={emp.avatar} />
                                      <AvatarFallback className="text-[10px] font-semibold bg-muted">
                                        {emp.initials}
                                      </AvatarFallback>
                                    </Avatar>
                                  </button>
                                ))}
                                {emps.length === 0 && (
                                  <span className="text-[10px] text-muted-foreground italic">Nenhum</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  {/* X-axis labels */}
                  <div className="grid grid-cols-[40px_1fr_1fr_1fr] gap-2 mt-2">
                    <div />
                    {performanceLabels.map((label) => (
                      <div key={label} className="text-center">
                        <span className="text-[10px] font-medium text-muted-foreground">{label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-muted-foreground text-center mt-1 tracking-wider">
                    DESEMPENHO →
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Side Panel */}
        <div className="xl:col-span-3 space-y-4">
          {/* Selected Profile */}
          <Card className="hover:shadow-none hover:translate-y-0">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-14 w-14 ring-2 ring-primary ring-offset-2 ring-offset-background">
                  <AvatarImage src={selectedEmployee.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {selectedEmployee.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground">{selectedEmployee.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedEmployee.role}</p>
                  <p className="text-xs text-muted-foreground">{selectedEmployee.department} · {selectedEmployee.tenure}</p>
                </div>
              </div>

              <Badge {...selectedBadge} className={cn("mb-4", selectedBadge.className)}>
                {selectedQuadrant.label}
              </Badge>

              {/* Scores */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{selectedEmployee.okrScore}%</p>
                  <p className="text-[10px] text-muted-foreground font-medium">OKR Score</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{selectedEmployee.score360}%</p>
                  <p className="text-[10px] text-muted-foreground font-medium">Avaliação 360º</p>
                </div>
              </div>

              {/* Performance / Potential bars */}
              <div className="space-y-2 mb-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Desempenho</span>
                    <span className="font-medium text-foreground">{performanceLabels[selectedEmployee.performance]}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${((selectedEmployee.performance + 1) / 3) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Potencial</span>
                    <span className="font-medium text-foreground">{potentialLabels[selectedEmployee.potential]}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${((selectedEmployee.potential + 1) / 3) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Insight */}
          <Card className="hover:shadow-none hover:translate-y-0 border-primary/20">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <h4 className="text-sm font-semibold text-foreground">Insights da IA</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedEmployee.aiInsight}
              </p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-2">
            <Button className="w-full gap-2 h-10">
              <Award className="h-4 w-4" />
              Aprovar Promoção
            </Button>
            <Button variant="outline" className="w-full gap-2 h-10">
              <UserPlus className="h-4 w-4" />
              Adicionar ao Plano de Sucessão
            </Button>
            <Button variant="ghost" className="w-full gap-2 h-10 text-muted-foreground">
              <FileText className="h-4 w-4" />
              Ver Relatório Completo
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardRH9Box;
