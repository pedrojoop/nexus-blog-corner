import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { 
  Brain, 
  BookOpen, 
  Trophy, 
  Coffee, 
  ArrowRight, 
  Target, 
  Users, 
  TrendingUp, 
  Sparkles 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardRH = () => {
  const headerSection = useScrollAnimation();
  const aiSection = useScrollAnimation();
  const modulesSection = useScrollAnimation();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div ref={headerSection.ref} className={`transition-all duration-700 ${headerSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Nexus People & Culture</h1>
          <p className="text-muted-foreground">
            Plataforma integrada de diagnóstico e ação cultural para equipes remotas e híbridas
          </p>
        </div>

        <Card className="mb-8 border-primary/20 bg-primary/5">
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

      <div ref={aiSection.ref} className={`transition-all duration-700 ${aiSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} mb-8`}>
        <Card className="border-primary/20 hover:border-primary/40 transition-all cursor-pointer" onClick={() => navigate("/dashboard/rh/ia-cultura")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              IA de Cultura e Engajamento
            </CardTitle>
            <CardDescription>
              Insights sistêmicos com sugestões de ação concretas para gestores e C-levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Alertas sobre saúde organizacional, métricas agregadas e recomendações acionáveis para melhorar a cultura da empresa.
            </p>
            <div className="flex items-center gap-2 mb-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
              <Brain className="h-5 w-5 text-primary" />
              <p className="text-sm text-foreground">
                <strong>Novidade:</strong> Agora com sugestões automáticas de ação vinculadas ao CaaS e LMS
              </p>
            </div>
            <Button className="w-full gap-2">
              Acessar IA de Cultura e Engajamento
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div ref={modulesSection.ref} className={`transition-all duration-700 ${modulesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-foreground">Módulos Core</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:border-primary/40 transition-all" onClick={() => navigate("/dashboard/rh/gamificacao")}>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="h-6 w-6 text-primary" />
                <CardTitle>Gamificação</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full gap-2">
                Acessar <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:border-primary/40 transition-all" onClick={() => navigate("/dashboard/rh/lms")}>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <CardTitle>LMS - Treinamentos</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full gap-2">
                Acessar <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:border-primary/40 transition-all" onClick={() => navigate("/dashboard/rh/caas")}>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Coffee className="h-6 w-6 text-primary" />
                <CardTitle>Culture-as-a-Service</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full gap-2">
                Acessar <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardRH;
