import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone, ShieldAlert, Lock, Clock, CheckCircle2, AlertTriangle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const denuncias = [
  { id: "#DEN-042", tipo: "Assédio Moral", dept: "Vendas", data: "07/04/2026", gravidade: "Crítico", status: "Nova", anonima: true },
  { id: "#DEN-041", tipo: "Discriminação", dept: "Tecnologia", data: "01/04/2026", gravidade: "Alto", status: "Em Investigação", anonima: true },
  { id: "#DEN-040", tipo: "Conflito de Interesse", dept: "Financeiro", data: "25/03/2026", gravidade: "Médio", status: "Em Investigação", anonima: false },
  { id: "#DEN-039", tipo: "Irregularidade Fiscal", dept: "Contabilidade", data: "18/03/2026", gravidade: "Alto", status: "Resolvida", anonima: true },
];

const DashboardRHDenuncias = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Megaphone className="h-8 w-8 text-[hsl(243,75%,59%)]" />
          <h1 className="text-3xl font-bold text-foreground">Canal de Denúncias</h1>
        </div>
        <p className="text-muted-foreground ml-11">Canal seguro e anônimo para relatos de irregularidades. Acesso restrito ao comitê de ética.</p>
      </div>

      <Card className="mb-6 bg-red-50/50 dark:bg-red-950/20 border-red-200/60 dark:border-red-800/40">
        <CardContent className="p-4 flex items-start gap-3">
          <ShieldAlert className="h-5 w-5 text-red-600 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">Ambiente de Cofre Seguro</p>
            <p className="text-sm text-muted-foreground mt-1">Todas as denúncias são criptografadas e o acesso é restrito ao comitê de ética. Os registros de auditoria são imutáveis.</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Novas", value: "1", icon: AlertTriangle, color: "text-red-600" },
          { label: "Em Investigação", value: "2", icon: Clock, color: "text-amber-600" },
          { label: "Resolvidas (trim.)", value: "5", icon: CheckCircle2, color: "text-emerald-600" },
          { label: "Anônimas", value: "75%", icon: Lock, color: "text-purple-600" },
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
        {denuncias.map((d) => (
          <Card key={d.id} className={`hover:shadow-md transition-all duration-300 ${d.gravidade === "Crítico" ? "border-red-200/60 dark:border-red-800/40" : ""}`}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-mono text-muted-foreground">{d.id}</span>
                    <h3 className="font-semibold text-foreground">{d.tipo}</h3>
                    <Badge className={`border-0 text-xs ${d.gravidade === "Crítico" ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" : d.gravidade === "Alto" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"}`}>
                      {d.gravidade}
                    </Badge>
                    <Badge className={`border-0 text-xs ${d.status === "Nova" ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" : d.status === "Resolvida" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"}`}>
                      {d.status}
                    </Badge>
                    {d.anonima && <Badge variant="outline" className="text-xs gap-1"><Lock className="h-3 w-3" /> Anônima</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{d.dept} · Registrada em {d.data}</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Eye className="h-3.5 w-3.5" /> Acessar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardRHDenuncias;
