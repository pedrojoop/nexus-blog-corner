import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, AlertTriangle, CheckCircle2, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const registros = [
  { nome: "Carlos Dev", dept: "Tecnologia", entrada: "08:02", saida: "17:05", banco: "+0:07", status: "Regular" },
  { nome: "Maria QA", dept: "Tecnologia", entrada: "09:15", saida: "18:30", banco: "+0:15", status: "Regular" },
  { nome: "João Silva", dept: "Vendas", entrada: "—", saida: "—", banco: "0:00", status: "Atestado" },
  { nome: "Ana Costa", dept: "Marketing", entrada: "08:00", saida: "16:00", banco: "-1:00", status: "Saída Antecipada" },
  { nome: "Pedro Lima", dept: "Diretoria", entrada: "07:45", saida: "19:00", banco: "+2:15", status: "Hora Extra" },
];

const DashboardRHPonto = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Clock className="h-8 w-8 text-[hsl(243,75%,59%)]" />
          <h1 className="text-3xl font-bold text-foreground">Ponto & Escalas</h1>
        </div>
        <p className="text-muted-foreground ml-11">Controle de jornada, banco de horas e gestão de escalas.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Presentes Hoje", value: "38", icon: Users, color: "text-emerald-600" },
          { label: "Ausências", value: "4", icon: AlertTriangle, color: "text-amber-600" },
          { label: "Horas Extras (mês)", value: "124h", icon: Clock, color: "text-blue-600" },
          { label: "Escalas Ativas", value: "6", icon: Calendar, color: "text-purple-600" },
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
              <TableHead>Entrada</TableHead>
              <TableHead>Saída</TableHead>
              <TableHead>Banco de Horas</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registros.map((r) => (
              <TableRow key={r.nome}>
                <TableCell className="font-medium">{r.nome}</TableCell>
                <TableCell className="text-muted-foreground">{r.dept}</TableCell>
                <TableCell>{r.entrada}</TableCell>
                <TableCell>{r.saida}</TableCell>
                <TableCell>
                  <span className={r.banco.startsWith("-") ? "text-red-600" : r.banco.startsWith("+") ? "text-emerald-600" : "text-muted-foreground"}>
                    {r.banco}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge className={`border-0 text-xs ${r.status === "Regular" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : r.status === "Atestado" ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"}`}>
                    {r.status}
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

export default DashboardRHPonto;
