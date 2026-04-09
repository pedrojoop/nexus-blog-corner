import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, FileText, AlertTriangle, CheckCircle2, Brain, Activity, Upload, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const atestados = [
  { nome: "João Silva", dept: "Vendas", cid: "J01", dias: 3, data: "07/04/2026", status: "Processado (OCR)", medico: "Dr. Santos" },
  { nome: "Ana Costa", dept: "Marketing", cid: "M54", dias: 5, data: "03/04/2026", status: "Processado (OCR)", medico: "Dra. Lima" },
  { nome: "Carlos Dev", dept: "Tecnologia", cid: "F41", dias: 15, data: "20/03/2026", status: "Revisão Médica", medico: "Dr. Oliveira" },
  { nome: "Maria QA", dept: "Tecnologia", cid: "S62", dias: 7, data: "15/03/2026", status: "Concluído", medico: "Dr. Ferreira" },
];

const DashboardRHSST = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Stethoscope className="h-8 w-8 text-[hsl(243,75%,59%)]" />
              <h1 className="text-3xl font-bold text-foreground">SST & Atestados</h1>
            </div>
            <p className="text-muted-foreground ml-11">Saúde e Segurança do Trabalho com leitura inteligente de atestados (OCR + IA).</p>
          </div>
          <Button className="gap-2 bg-[hsl(243,75%,59%)] hover:bg-[hsl(243,75%,50%)]">
            <Upload className="h-4 w-4" /> Enviar Atestado
          </Button>
        </div>
      </div>

      {/* AI Insight */}
      <Card className="mb-6 bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-800/40">
        <CardContent className="p-4 flex items-start gap-3">
          <Brain className="h-5 w-5 text-emerald-600 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">IA: Análise de Padrões de Saúde</p>
            <p className="text-sm text-muted-foreground mt-1">Aumento de 40% em atestados CID F (transtornos mentais) no departamento de Tecnologia nos últimos 3 meses. Recomendação: ativar programa de bem-estar e revisar carga de trabalho.</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Atestados (mês)", value: "8", icon: FileText, color: "text-blue-600" },
          { label: "Dias Abatidos", value: "30", icon: Calendar, color: "text-amber-600" },
          { label: "Processados (OCR)", value: "6", icon: CheckCircle2, color: "text-emerald-600" },
          { label: "Alerta CID F", value: "3", icon: AlertTriangle, color: "text-red-600" },
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

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Colaborador</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>CID</TableHead>
              <TableHead>Dias</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Médico</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {atestados.map((a) => (
              <TableRow key={a.nome + a.data}>
                <TableCell className="font-medium">{a.nome}</TableCell>
                <TableCell className="text-muted-foreground">{a.dept}</TableCell>
                <TableCell><Badge variant="outline" className="font-mono text-xs">{a.cid}</Badge></TableCell>
                <TableCell>{a.dias}</TableCell>
                <TableCell>{a.data}</TableCell>
                <TableCell className="text-muted-foreground">{a.medico}</TableCell>
                <TableCell>
                  <Badge className={`border-0 text-xs ${a.status.includes("OCR") ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" : a.status === "Concluído" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"}`}>
                    {a.status}
                  </Badge>
                </TableCell>
                <TableCell><Button variant="ghost" size="sm"><ArrowRight className="h-4 w-4" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </DashboardLayout>
  );
};

export default DashboardRHSST;
