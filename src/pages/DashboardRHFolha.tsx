import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Receipt, DollarSign, Users, CheckCircle2, Download, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const holerites = [
  { nome: "Carlos Dev", dept: "Tecnologia", bruto: "R$ 15.200", liquido: "R$ 11.400", status: "Processado", mes: "Mar/2026" },
  { nome: "Maria QA", dept: "Tecnologia", bruto: "R$ 9.800", liquido: "R$ 7.350", status: "Processado", mes: "Mar/2026" },
  { nome: "João Silva", dept: "Vendas", bruto: "R$ 8.500", liquido: "R$ 6.375", status: "Processado", mes: "Mar/2026" },
  { nome: "Ana Costa", dept: "Marketing", bruto: "R$ 7.200", liquido: "R$ 5.400", status: "Pendente", mes: "Abr/2026" },
  { nome: "Pedro Lima", dept: "Diretoria", bruto: "R$ 25.000", liquido: "R$ 18.750", status: "Pendente", mes: "Abr/2026" },
];

const DashboardRHFolha = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Receipt className="h-8 w-8 text-[hsl(243,75%,59%)]" />
              <h1 className="text-3xl font-bold text-foreground">Holerites & Folha</h1>
            </div>
            <p className="text-muted-foreground ml-11">Gestão de folha de pagamento e distribuição de holerites.</p>
          </div>
          <Button className="gap-2 bg-[hsl(243,75%,59%)] hover:bg-[hsl(243,75%,50%)]">
            <Calendar className="h-4 w-4" /> Processar Folha Abr/2026
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Folha Total (mês)", value: "R$ 285k", icon: DollarSign, color: "text-blue-600" },
          { label: "Colaboradores", value: "42", icon: Users, color: "text-emerald-600" },
          { label: "Processados", value: "38", icon: CheckCircle2, color: "text-emerald-600" },
          { label: "Pendentes", value: "4", icon: Receipt, color: "text-amber-600" },
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
              <TableHead>Mês Ref.</TableHead>
              <TableHead>Salário Bruto</TableHead>
              <TableHead>Salário Líquido</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holerites.map((h) => (
              <TableRow key={h.nome + h.mes}>
                <TableCell className="font-medium">{h.nome}</TableCell>
                <TableCell className="text-muted-foreground">{h.dept}</TableCell>
                <TableCell>{h.mes}</TableCell>
                <TableCell>{h.bruto}</TableCell>
                <TableCell className="font-semibold">{h.liquido}</TableCell>
                <TableCell>
                  <Badge className={`border-0 text-xs ${h.status === "Processado" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"}`}>
                    {h.status}
                  </Badge>
                </TableCell>
                <TableCell><Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </DashboardLayout>
  );
};

export default DashboardRHFolha;
