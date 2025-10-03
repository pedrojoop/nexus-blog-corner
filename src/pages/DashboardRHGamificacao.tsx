import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Trophy, Gift, Target, Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DashboardRHGamificacao = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  const [niveis] = useState([
    { nivel: 1, xpNecessario: 0 },
    { nivel: 2, xpNecessario: 100 },
    { nivel: 3, xpNecessario: 250 },
    { nivel: 4, xpNecessario: 500 },
    { nivel: 5, xpNecessario: 1000 },
    { nivel: 6, xpNecessario: 1500 },
    { nivel: 7, xpNecessario: 2500 },
    { nivel: 8, xpNecessario: 3500 },
    { nivel: 9, xpNecessario: 5000 },
    { nivel: 10, xpNecessario: 7000 },
  ]);

  const [recompensas] = useState([
    { id: 1, nome: "Vale-Presente R$50", valor: 50, nivelMinimo: 3 },
    { id: 2, nome: "Dia Extra de Férias", valor: 1, nivelMinimo: 5 },
    { id: 3, nome: "Vale-Presente R$100", valor: 100, nivelMinimo: 7 },
    { id: 4, nome: "Home Office Flexível", valor: 2, nivelMinimo: 8 },
    { id: 5, nome: "Curso Profissional", valor: 500, nivelMinimo: 10 },
  ]);

  const [metas] = useState([
    { id: 1, titulo: "Completar 5 projetos", escopo: "GLOBAL", xp: 500, prazo: "31/12/2025" },
    { id: 2, titulo: "Participar de eventos", escopo: "DEPARTAMENTO", xp: 300, prazo: "20/12/2025" },
    { id: 3, titulo: "Mentorar colaboradores", escopo: "GLOBAL", xp: 400, prazo: "15/01/2026" },
  ]);

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
              Gamificação: Administração
            </h1>
            <p className="text-muted-foreground">Configure níveis, recompensas e metas para engajar sua equipe</p>
          </div>

          <Tabs defaultValue="niveis" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="niveis">Níveis</TabsTrigger>
              <TabsTrigger value="recompensas">Recompensas</TabsTrigger>
              <TabsTrigger value="metas">Metas e Desafios</TabsTrigger>
            </TabsList>

            {/* Níveis */}
            <TabsContent value="niveis" className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Configuração de Níveis
                  </CardTitle>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Novo Nível
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left p-4 font-semibold">Nível</th>
                          <th className="text-left p-4 font-semibold">XP Necessário</th>
                          <th className="text-right p-4 font-semibold">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {niveis.map((nivel, idx) => (
                          <tr key={idx} className="border-t hover:bg-muted/30 transition-colors">
                            <td className="p-4">
                              <Badge variant="default" className="text-lg px-3">
                                Nível {nivel.nivel}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <span className="font-semibold text-primary">{nivel.xpNecessario} XP</span>
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recompensas */}
            <TabsContent value="recompensas" className="space-y-6">
              <div className="flex justify-end">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nova Recompensa
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {recompensas.map((recompensa) => (
                  <Card key={recompensa.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <Gift className="h-8 w-8 text-accent" />
                        <div className="space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-bold text-lg mb-2">{recompensa.nome}</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Valor:</span>
                            <span className="font-semibold">
                              {typeof recompensa.valor === "number" && recompensa.valor > 10
                                ? `R$ ${recompensa.valor}`
                                : `${recompensa.valor} dias`}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Nível Mínimo:</span>
                            <Badge variant="secondary">Nível {recompensa.nivelMinimo}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Metas */}
            <TabsContent value="metas" className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Metas e Desafios
                  </CardTitle>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Nova Meta
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left p-4 font-semibold">Título</th>
                          <th className="text-left p-4 font-semibold">Escopo</th>
                          <th className="text-left p-4 font-semibold">Recompensa XP</th>
                          <th className="text-left p-4 font-semibold">Prazo</th>
                          <th className="text-right p-4 font-semibold">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {metas.map((meta) => (
                          <tr key={meta.id} className="border-t hover:bg-muted/30 transition-colors">
                            <td className="p-4 font-medium">{meta.titulo}</td>
                            <td className="p-4">
                              <Badge variant={meta.escopo === "GLOBAL" ? "default" : "secondary"}>
                                {meta.escopo}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <span className="font-semibold text-accent">+{meta.xp} XP</span>
                            </td>
                            <td className="p-4 text-muted-foreground">{meta.prazo}</td>
                            <td className="p-4 text-right space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardRHGamificacao;
