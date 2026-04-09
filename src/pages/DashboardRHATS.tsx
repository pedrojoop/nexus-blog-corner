import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Search, Users, FileText, Filter, Plus, ArrowRight, Sparkles, Building2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const vagas = [
  { titulo: "Desenvolvedor Senior Full-Stack", dept: "Tecnologia", candidatos: 142, triados: 5, status: "Ativa", dias: 12, urgencia: "Alta" },
  { titulo: "Analista de Marketing Digital", dept: "Marketing", candidatos: 89, triados: 8, status: "Ativa", dias: 7, urgencia: "Média" },
  { titulo: "Gerente de Produto", dept: "Produto", candidatos: 56, triados: 3, status: "Ativa", dias: 21, urgencia: "Alta" },
  { titulo: "Designer UX/UI Pleno", dept: "Design", candidatos: 67, triados: 6, status: "Pausada", dias: 30, urgencia: "Baixa" },
  { titulo: "Analista de Dados", dept: "BI", candidatos: 34, triados: 0, status: "Nova", dias: 2, urgencia: "Média" },
];

const DashboardRHATS = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Briefcase className="h-8 w-8 text-[hsl(243,75%,59%)]" />
              <h1 className="text-3xl font-bold text-foreground">ATS & Vagas</h1>
            </div>
            <p className="text-muted-foreground ml-11">Gerencie todo o funil de recrutamento com triagem inteligente por IA.</p>
          </div>
          <Button className="gap-2 bg-[hsl(243,75%,59%)] hover:bg-[hsl(243,75%,50%)]">
            <Plus className="h-4 w-4" /> Nova Vaga
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Vagas Ativas", value: "5", icon: Briefcase, color: "text-blue-600" },
          { label: "Total Candidatos", value: "388", icon: Users, color: "text-emerald-600" },
          { label: "Triados pela IA", value: "22", icon: Sparkles, color: "text-amber-600" },
          { label: "Tempo Médio (dias)", value: "14", icon: Clock, color: "text-purple-600" },
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

      {/* Search */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar vagas por título, departamento..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" /> Filtros</Button>
      </div>

      {/* Vagas List */}
      <div className="space-y-4">
        {vagas.map((vaga) => (
          <Card key={vaga.titulo} className="hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{vaga.titulo}</h3>
                    <Badge variant={vaga.status === "Ativa" ? "default" : vaga.status === "Nova" ? "secondary" : "outline"} className="text-xs">
                      {vaga.status}
                    </Badge>
                    <Badge className={`text-xs border-0 ${vaga.urgencia === "Alta" ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" : vaga.urgencia === "Média" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" : "bg-muted text-muted-foreground"}`}>
                      {vaga.urgencia}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> {vaga.dept}</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {vaga.candidatos} candidatos</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {vaga.dias} dias aberta</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={(vaga.triados / Math.max(vaga.candidatos, 1)) * 100} className="h-2 flex-1 max-w-xs" />
                    <span className="text-xs text-muted-foreground">{vaga.triados} triados pela IA</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2 ml-4">
                  Ver Pipeline <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardRHATS;
