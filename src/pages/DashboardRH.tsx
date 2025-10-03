import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Trophy, Target, Clock, Gift, TrendingUp } from "lucide-react";

const DashboardRH = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: metasRef, isVisible: metasVisible } = useScrollAnimation();

  const userLevel = 7;
  const userXP = 3450;
  const nextLevelXP = 4000;
  const progressPercent = (userXP / nextLevelXP) * 100;

  const metas = [
    { id: 1, titulo: "Completar 5 projetos", progresso: 80, xp: 500, prazo: "15/12/2025" },
    { id: 2, titulo: "Participar de 3 eventos", progresso: 66, xp: 300, prazo: "20/12/2025" },
    { id: 3, titulo: "Colaborar com 10 pessoas", progresso: 40, xp: 200, prazo: "31/12/2025" },
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
              Meu Dashboard
            </h1>
            <p className="text-muted-foreground">Acompanhe seu progresso e engajamento</p>
          </div>

          {/* Gamificação Principal */}
          <div
            ref={statsRef}
            className={`transition-all duration-700 delay-100 ${
              statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Trophy className="h-6 w-6 text-primary" />
                  Seu Progresso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <Badge className="text-lg px-4 py-1" variant="default">
                        Nível {userLevel}
                      </Badge>
                      <span className="text-3xl font-bold text-primary">{userXP} XP</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Faltam {nextLevelXP - userXP} XP para o próximo nível
                    </p>
                  </div>
                  <TrendingUp className="h-16 w-16 text-accent opacity-60" />
                </div>
                <div className="space-y-2">
                  <Progress value={progressPercent} className="h-4" />
                  <p className="text-xs text-right text-muted-foreground">{progressPercent.toFixed(1)}% completo</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grid de Ações e Alertas */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Ponto Rápido */}
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Registrar Ponto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground mb-4">Próxima ação:</p>
                  <Button size="lg" className="w-full text-lg py-6 shadow-lg">
                    ENTRADA
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">Última marcação: 08:00</p>
                </div>
              </CardContent>
            </Card>

            {/* Próxima Recompensa */}
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-accent" />
                  Próxima Recompensa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4 space-y-3">
                  <div className="text-4xl">🎁</div>
                  <p className="font-semibold">Dia Extra de Férias</p>
                  <Badge variant="secondary">Nível 10</Badge>
                  <p className="text-xs text-muted-foreground">Desbloqueie ao alcançar o nível 10</p>
                </div>
              </CardContent>
            </Card>

            {/* Alerta Férias */}
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 border-orange-500/20 bg-orange-500/5">
              <CardHeader>
                <CardTitle className="text-orange-600 dark:text-orange-400">⚠️ Atenção</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Período de férias vence em:</p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">90 dias</p>
                  <p className="text-xs text-muted-foreground">
                    Não esqueça de solicitar suas férias antes do prazo
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Metas Ativas */}
          <div
            ref={metasRef}
            className={`transition-all duration-700 delay-200 ${
              metasVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Metas e Desafios Ativos
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {metas.map((meta) => (
                <Card key={meta.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-lg">{meta.titulo}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span className="font-semibold">{meta.progresso}%</span>
                      </div>
                      <Progress value={meta.progresso} className="h-2" />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <Badge variant="secondary" className="gap-1">
                        <Trophy className="h-3 w-3" />
                        +{meta.xp} XP
                      </Badge>
                      <span className="text-muted-foreground">até {meta.prazo}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardRH;
