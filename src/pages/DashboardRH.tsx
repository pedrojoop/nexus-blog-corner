import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { 
  Heart, 
  BarChart3, 
  BookOpen, 
  Award, 
  Sparkles,
  Users,
  TrendingUp,
  Target,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const DashboardRH = () => {
  const headerSection = useScrollAnimation();
  const aiSection = useScrollAnimation();
  const modulesSection = useScrollAnimation();

  return (
    <DashboardLayout>
      <div ref={headerSection.ref} className={`transition-all duration-700 ${headerSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Nexus People & Culture
          </h1>
          <p className="text-muted-foreground text-lg">
            Plataforma de Diagnóstico e Ação Cultural para empresas híbridas e remotas
          </p>
        </div>

        {/* Vision Statement */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/20 rounded-lg">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Um Benefício Real, Não uma Ferramenta de Controle
                </h3>
                <p className="text-muted-foreground">
                  O Nexus é posicionado como um diferencial na atração de talentos, 
                  focado em cultura, conexão e bem-estar dos colaboradores em ambientes 
                  híbridos e remotos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Features Section */}
      <div ref={aiSection.ref} className={`transition-all duration-700 ${aiSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} mb-8`}>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-foreground mb-2">IA de Cultura</h2>
          <p className="text-muted-foreground">
            Inteligência artificial focada em cuidado e diagnóstico sistêmico
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* IA de Cuidado */}
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>IA de Cuidado</CardTitle>
              </div>
              <CardDescription>
                Insights personalizados para o bem-estar do colaborador
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Detecta isolamento social e sugere conexões relevantes
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Insights privados sobre bem-estar e engajamento
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Recomendações personalizadas de cursos LMS
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Alertas gentis de prevenção de burnout
                  </p>
                </div>
              </div>

              <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">100% Privado:</strong> Nenhum gestor 
                  tem acesso aos seus dados individuais
                </p>
              </div>

              <Link to="/dashboard/ia-cuidado" className="block">
                <Button className="w-full gap-2 bg-green-600 hover:bg-green-700">
                  Acessar IA de Cuidado
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* IA de Diagnóstico */}
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>IA de Diagnóstico</CardTitle>
              </div>
              <CardDescription>
                Análise sistêmica da saúde cultural organizacional
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Dashboard de engajamento agregado por departamento
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Alertas sistêmicos sobre processos, não pessoas
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Métricas de rituais CaaS e conexões inter-times
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Recomendações de ação para melhorar a cultura
                  </p>
                </div>
              </div>

              <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">Dados Agregados:</strong> Mínimo de 5 
                  pessoas por métrica. Foco em sistemas, não indivíduos
                </p>
              </div>

              <Link to="/dashboard/rh/ia-diagnostico" className="block">
                <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
                  Acessar IA de Diagnóstico
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Core Modules Section */}
      <div ref={modulesSection.ref} className={`transition-all duration-700 ${modulesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-foreground mb-2">Módulos Core</h2>
          <p className="text-muted-foreground">
            Funcionalidades focadas em cultura, crescimento e engajamento
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gamificação */}
          <Link to="/dashboard/rh/gamificacao">
            <Card className="border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-lg cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Award className="h-5 w-5 text-yellow-600" />
                  </div>
                  <CardTitle className="text-lg">Gamificação</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Sistema de XP, níveis, recompensas e desafios para engajar colaboradores
                </CardDescription>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <TrendingUp className="h-4 w-4" />
                  <span>Aumenta engajamento em 40%</span>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* LMS */}
          <Link to="/dashboard/rh/lms">
            <Card className="border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-lg cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Treinamentos (LMS)</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Plataforma de cursos, módulos e trilhas de aprendizagem personalizadas
                </CardDescription>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Target className="h-4 w-4" />
                  <span>Desenvolvimento contínuo</span>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* CaaS */}
          <Link to="/dashboard/rh/caas">
            <Card className="border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-lg cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-pink-500/10 rounded-lg">
                    <Users className="h-5 w-5 text-pink-600" />
                  </div>
                  <CardTitle className="text-lg">Culture-as-a-Service</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Rituais culturais: 1:1s, reconhecimentos, feedback e celebrações
                </CardDescription>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Heart className="h-4 w-4" />
                  <span>Fortalece cultura remota</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Info Card */}
      <Card className="mt-8 bg-accent/50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Sparkles className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Novo Posicionamento: Benefício, Não Controle
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                O Nexus foi redesenhado para ser um diferencial real na atração e retenção 
                de talentos em empresas híbridas e remotas. Removemos funcionalidades de 
                "controle" (como ponto eletrônico) e focamos 100% em cultura, bem-estar e 
                crescimento.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Para Colaboradores:</strong> Ferramentas que ajudam você a se 
                conectar, crescer e se sentir parte da cultura, mesmo remotamente.
                <br />
                <strong>Para Gestores:</strong> Insights agregados sobre a saúde sistêmica 
                da organização, sem invadir privacidade individual.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DashboardRH;
