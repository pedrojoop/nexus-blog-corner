import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Clock, Calendar, Download } from "lucide-react";
import { useState } from "react";

const DashboardRHPonto = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const [currentTime] = useState(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));

  const registrosHoje = [
    { tipo: "ENTRADA", horario: "08:00", status: "confirmado" },
    { tipo: "SAÍDA ALMOÇO", horario: "12:00", status: "confirmado" },
    { tipo: "RETORNO ALMOÇO", horario: "13:30", status: "confirmado" },
  ];

  const semanaAtual = [
    { dia: "Seg", horas: "8h 30min", status: "completo" },
    { dia: "Ter", horas: "8h 15min", status: "completo" },
    { dia: "Qua", horas: "8h 45min", status: "completo" },
    { dia: "Qui", horas: "8h 20min", status: "completo" },
    { dia: "Sex", horas: "6h 00min", status: "em-andamento" },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto p-6 space-y-8">
          {/* Header */}
          <div
            ref={headerRef}
            className={`transition-all duration-700 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Gestão de Ponto
            </h1>
            <p className="text-muted-foreground">Gerencie seus registros de ponto e visualize seu histórico</p>
          </div>

          {/* Registrar Ponto */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Registrar Ponto Agora
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-6">
                  <div className="text-6xl font-bold text-primary mb-4">{currentTime}</div>
                  <p className="text-sm text-muted-foreground mb-6">Próxima ação sugerida:</p>
                  <Button size="lg" className="w-full text-xl py-8 shadow-lg">
                    SAÍDA
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Registros de Hoje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {registrosHoje.map((registro, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{registro.tipo}</p>
                          <p className="text-sm text-muted-foreground">{registro.horario}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">✓ Confirmado</Badge>
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/10 border-2 border-accent/30">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold">SAÍDA</p>
                        <p className="text-sm text-muted-foreground">Aguardando registro</p>
                      </div>
                    </div>
                    <Badge variant="outline">Pendente</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Relatório Semanal */}
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Relatório Semanal</CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {semanaAtual.map((dia, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors">
                    <div className="w-16 text-center">
                      <p className="font-bold text-lg">{dia.dia}</p>
                    </div>
                    <div className="flex-1">
                      <div className="h-8 bg-primary/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            dia.status === "completo" ? "bg-primary" : "bg-accent"
                          } flex items-center justify-center text-white font-semibold text-sm transition-all`}
                          style={{ width: dia.status === "completo" ? "100%" : "70%" }}
                        >
                          {dia.horas}
                        </div>
                      </div>
                    </div>
                    <Badge variant={dia.status === "completo" ? "default" : "secondary"}>
                      {dia.status === "completo" ? "Completo" : "Em andamento"}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total da Semana:</span>
                  <span className="text-2xl font-bold text-primary">39h 50min</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardRHPonto;
