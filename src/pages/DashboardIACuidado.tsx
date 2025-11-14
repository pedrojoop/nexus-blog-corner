import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  Users, 
  BookOpen, 
  Coffee, 
  TrendingUp, 
  Award,
  Calendar,
  MessageCircle,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const DashboardIACuidado = () => {
  const headerSection = useScrollAnimation();
  const insightsSection = useScrollAnimation();
  const connectionsSection = useScrollAnimation();
  const coursesSection = useScrollAnimation();

  // Mock data - In production, this would come from the AI analysis
  const wellnessInsights = {
    ritualParticipation: 3,
    xpGained: 450,
    coursesCompleted: 2,
    engagementTrend: "up" as const,
    burnoutRisk: "low" as const
  };

  const connectionSuggestions = [
    {
      id: 1,
      name: "Ana Silva",
      department: "Marketing",
      role: "Designer",
      commonInterests: ["React", "UI/UX", "Fotografia"],
      reason: "Você está focado apenas no time de Dev. Ana tem interesses em comum e pode trazer perspectivas diferentes.",
      avatar: "AS"
    },
    {
      id: 2,
      name: "Carlos Mendes",
      department: "Produto",
      role: "Product Manager",
      commonInterests: ["Metodologias Ágeis", "Gaming"],
      reason: "Carlos está trabalhando em features que impactam seu trabalho. Um café virtual pode alinhar expectativas.",
      avatar: "CM"
    },
    {
      id: 3,
      name: "Beatriz Costa",
      department: "RH",
      role: "People Analytics",
      commonInterests: ["Dados", "Python"],
      reason: "Beatriz está explorando IA para análise de dados culturais. Vocês podem trocar ideias técnicas.",
      avatar: "BC"
    }
  ];

  const courseRecommendations = [
    {
      id: 1,
      title: "Comunicação Efetiva em Equipes Remotas",
      category: "Soft Skills",
      duration: "2h 30min",
      reason: "Baseado no seu padrão de interação, este curso pode ajudar a expandir sua rede.",
      progress: 0
    },
    {
      id: 2,
      title: "Advanced React Patterns",
      category: "Técnico",
      duration: "4h",
      reason: "Você demonstrou interesse em React. Este curso aprofunda conceitos avançados.",
      progress: 0
    },
    {
      id: 3,
      title: "Mindfulness para Profissionais de Tecnologia",
      category: "Bem-estar",
      duration: "1h 45min",
      reason: "Para manter o equilíbrio entre produtividade e saúde mental.",
      progress: 0
    }
  ];

  const getBurnoutRiskBadge = (risk: string) => {
    if (risk === "low") return <Badge className="bg-green-500">Baixo Risco</Badge>;
    if (risk === "medium") return <Badge className="bg-yellow-500">Atenção</Badge>;
    return <Badge className="bg-red-500">Alto Risco</Badge>;
  };

  return (
    <DashboardLayout>
      <div ref={headerSection.ref} className={`transition-all duration-700 ${headerSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">IA de Cuidado</h1>
            </div>
            <p className="text-muted-foreground">
              Insights personalizados para seu bem-estar e conexão
            </p>
          </div>
        </div>

        {/* Wellness Overview */}
        <Card className="mb-6 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Seu Bem-Estar Este Mês
            </CardTitle>
            <CardDescription>
              Análise privada e personalizada baseada na sua atividade
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="h-4 w-4" />
                  Rituais Participados
                </div>
                <p className="text-2xl font-bold">{wellnessInsights.ritualParticipation}</p>
                <p className="text-xs text-green-600">+1 vs. mês anterior 🎉</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  XP Conquistado
                </div>
                <p className="text-2xl font-bold">{wellnessInsights.xpGained}</p>
                <p className="text-xs text-muted-foreground">Você está crescendo!</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  Cursos Concluídos
                </div>
                <p className="text-2xl font-bold">{wellnessInsights.coursesCompleted}</p>
                <p className="text-xs text-muted-foreground">Continue aprendendo!</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                  Risco de Burnout
                </div>
                <div className="mt-2">
                  {getBurnoutRiskBadge(wellnessInsights.burnoutRisk)}
                </div>
                <p className="text-xs text-muted-foreground">Continue assim! 💪</p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Tendência de Engajamento</span>
                <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/20">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Crescendo
                </Badge>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Seu engajamento aumentou 25% nas últimas 2 semanas. Ótimo trabalho!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connection Suggestions */}
      <div ref={connectionsSection.ref} className={`transition-all duration-700 ${connectionsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} mb-6`}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Sugestões de Conexão
            </CardTitle>
            <CardDescription>
              Notamos que você está focado apenas no seu time. Que tal conhecer pessoas de outras áreas?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {connectionSuggestions.map((person) => (
              <Card key={person.id} className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                      {person.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-foreground">{person.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {person.role} • {person.department}
                          </p>
                        </div>
                        <Button size="sm" className="gap-2">
                          <Coffee className="h-4 w-4" />
                          Agendar Café Virtual
                        </Button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {person.commonInterests.map((interest, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>

                      <div className="bg-accent/50 p-3 rounded-lg">
                        <p className="text-sm text-foreground">
                          <Sparkles className="h-4 w-4 inline mr-1 text-primary" />
                          <strong>Por que conectar:</strong> {person.reason}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="text-center pt-2">
              <Button variant="outline" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                Ver Mais Sugestões
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Recommendations */}
      <div ref={coursesSection.ref} className={`transition-all duration-700 ${coursesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Cursos Recomendados para Você
            </CardTitle>
            <CardDescription>
              Baseado no seu perfil, engajamento e objetivos de carreira
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {courseRecommendations.map((course) => (
              <Card key={course.id} className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{course.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Badge variant="outline">{course.category}</Badge>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {course.duration}
                        </span>
                      </div>
                    </div>
                    <Button size="sm">Iniciar Curso</Button>
                  </div>

                  <div className="bg-accent/50 p-3 rounded-lg">
                    <p className="text-sm text-foreground">
                      <Sparkles className="h-4 w-4 inline mr-1 text-primary" />
                      <strong>Por que recomendamos:</strong> {course.reason}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Privacy Notice */}
      <Card className="mt-6 border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Heart className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                Seus dados são 100% privados
              </p>
              <p className="text-xs text-muted-foreground">
                Todos os insights e sugestões são gerados exclusivamente para você. 
                Nenhum gestor ou colega tem acesso às suas informações individuais. 
                A IA de Cuidado existe para apoiar seu bem-estar, não para monitorar.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DashboardIACuidado;
