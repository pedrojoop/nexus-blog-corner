import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Users, BarChart3, ArrowRight, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const cargos = [
  { cargo: "Desenvolvedor Senior", nivel: "Senior", faixa: "R$ 12.000 - R$ 18.000", mediana: "R$ 15.200", colaboradores: 8, defasagem: "+2%" },
  { cargo: "Analista de Marketing", nivel: "Pleno", faixa: "R$ 6.000 - R$ 9.500", mediana: "R$ 7.800", colaboradores: 5, defasagem: "-8%" },
  { cargo: "Gerente de Produto", nivel: "Gerência", faixa: "R$ 15.000 - R$ 22.000", mediana: "R$ 18.500", colaboradores: 3, defasagem: "+5%" },
  { cargo: "Designer UX/UI", nivel: "Pleno", faixa: "R$ 7.000 - R$ 11.000", mediana: "R$ 9.200", colaboradores: 4, defasagem: "-12%" },
  { cargo: "Analista de Dados", nivel: "Junior", faixa: "R$ 4.500 - R$ 7.000", mediana: "R$ 5.800", colaboradores: 6, defasagem: "+1%" },
];

const DashboardRHCargosSalarios = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <DollarSign className="h-8 w-8 text-[hsl(243,75%,59%)]" />
          <h1 className="text-3xl font-bold text-foreground">Cargos e Salários</h1>
        </div>
        <p className="text-muted-foreground ml-11">Estrutura salarial, faixas de mercado e análise de equidade interna.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Cargos Mapeados", value: "32", icon: Users, color: "text-blue-600" },
          { label: "Mediana Geral", value: "R$ 9.8k", icon: DollarSign, color: "text-emerald-600" },
          { label: "Abaixo do Mercado", value: "4", icon: TrendingUp, color: "text-red-600" },
          { label: "Última Pesquisa", value: "Mar/26", icon: BarChart3, color: "text-purple-600" },
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

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar cargo..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" /> Filtros</Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cargo</TableHead>
              <TableHead>Nível</TableHead>
              <TableHead>Faixa Salarial</TableHead>
              <TableHead>Mediana Mercado</TableHead>
              <TableHead>Colaboradores</TableHead>
              <TableHead>vs. Mercado</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cargos.map((c) => (
              <TableRow key={c.cargo}>
                <TableCell className="font-medium">{c.cargo}</TableCell>
                <TableCell><Badge variant="secondary">{c.nivel}</Badge></TableCell>
                <TableCell className="text-muted-foreground">{c.faixa}</TableCell>
                <TableCell>{c.mediana}</TableCell>
                <TableCell>{c.colaboradores}</TableCell>
                <TableCell>
                  <Badge className={`border-0 text-xs ${c.defasagem.startsWith("-") ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"}`}>
                    {c.defasagem}
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

export default DashboardRHCargosSalarios;
