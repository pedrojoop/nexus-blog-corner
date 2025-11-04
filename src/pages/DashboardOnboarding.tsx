import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { 
  CheckCircle2, Circle, Trophy, GraduationCap, Target, 
  Calendar, Users, MessageSquare, FileText, Sparkles 
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  xp: number;
  linkedModule?: string;
  linkedPath?: string;
}

interface PDIGoal {
  id: string;
  title: string;
  description: string;
  progress: number;
  xp: number;
  deadline: string;
  category: "skill" | "course" | "mentorship" | "project";
}

interface SuggestedCourse {
  id: string;
  title: string;
  duration: string;
  xp: number;
  progress: number;
}

const DashboardOnboarding = () => {
  const headerSection = useScrollAnimation();
  
  const [onboardingTasks, setOnboardingTasks] = useState<OnboardingTask[]>([
    {
      id: "1",
      title: "Complete seu perfil",
      description: "Adicione foto, bio e informações de contato",
      completed: true,
      xp: 100,
    },
    {
      id: "2",
      title: "Ativar Chat e enviar primeira mensagem",
      description: "Conecte-se com sua equipe no chat corporativo",
      completed: true,
      xp: 50,
      linkedModule: "Chat",
      linkedPath: "/dashboard/chat",
    },
    {
      id: "3",
      title: "Completar Módulo: Valores da Empresa",
      description: "Aprenda sobre nossa cultura e valores fundamentais",
      completed: false,
      xp: 200,
      linkedModule: "LMS",
      linkedPath: "/dashboard/rh/lms",
    },
    {
      id: "4",
      title: "Agendar 1:1 com o Gestor",
      description: "Marque sua primeira reunião individual",
      completed: false,
      xp: 150,
      linkedModule: "Eventos",
      linkedPath: "/dashboard/eventos",
    },
    {
      id: "5",
      title: "Participar do primeiro Evento",
      description: "Junte-se a um dos nossos eventos da comunidade",
      completed: false,
      xp: 100,
      linkedModule: "Eventos",
      linkedPath: "/dashboard/eventos",
    },
    {
      id: "6",
      title: "Explorar Documentos da Empresa",
      description: "Familiarize-se com políticas e procedimentos",
      completed: false,
      xp: 75,
      linkedModule: "Documentos",
      linkedPath: "/dashboard/documentos",
    },
  ]);

  const [pdiGoals] = useState<PDIGoal[]>([
    {
      id: "1",
      title: "Dominar React Avançado",
      description: "Completar curso de React e criar 2 projetos práticos",
      progress: 35,
      xp: 500,
      deadline: "31/03/2025",
      category: "course",
    },
    {
      id: "2",
      title: "Mentorar Junior Developer",
      description: "Orientar e apoiar o desenvolvimento de um colega",
      progress: 60,
      xp: 400,
      deadline: "28/02/2025",
      category: "mentorship",
    },
    {
      id: "3",
      title: "Liderar Projeto Estratégico",
      description: "Assumir liderança de projeto cross-funcional",
      progress: 20,
      xp: 800,
      deadline: "30/06/2025",
      category: "project",
    },
  ]);

  const [suggestedCourses] = useState<SuggestedCourse[]>([
    {
      id: "1",
      title: "Liderança Transformadora",
      duration: "8h",
      xp: 500,
      progress: 0,
    },
    {
      id: "2",
      title: "Comunicação Não-Violenta",
      duration: "6h",
      xp: 400,
      progress: 0,
    },
    {
      id: "3",
      title: "Gestão de Tempo",
      duration: "4h",
      xp: 300,
      progress: 0,
    },
  ]);

  const completedTasksCount = onboardingTasks.filter(t => t.completed).length;
  const onboardingProgress = (completedTasksCount / onboardingTasks.length) * 100;
  const totalXpEarned = onboardingTasks.filter(t => t.completed).reduce((acc, t) => acc + t.xp, 0);
  const totalXpAvailable = onboardingTasks.reduce((acc, t) => acc + t.xp, 0);

  const toggleTaskCompletion = (taskId: string) => {
    setOnboardingTasks(tasks =>
      tasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
    
    const task = onboardingTasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      toast.success(`Parabéns! +${task.xp} XP ganhos!`, {
        description: task.title,
      });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "skill": return Target;
      case "course": return GraduationCap;
      case "mentorship": return Users;
      case "project": return FileText;
      default: return Target;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "skill": return "Habilidade";
      case "course": return "Curso";
      case "mentorship": return "Mentoria";
      case "project": return "Projeto";
      default: return "Meta";
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto p-6 space-y-8">
          {/* Header */}
          <div
            ref={headerSection.ref}
            className={`transition-all duration-700 ${
              headerSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Bem-vindo(a), Paula Lima! 🎉
                </h1>
                <p className="text-muted-foreground text-lg">
                  Sua jornada de desenvolvimento está apenas começando
                </p>
              </div>
              <Card className="bg-gradient-to-br from-accent/20 to-primary/10 border-accent/30">
                <CardContent className="p-4 flex items-center gap-4">
                  <Trophy className="h-10 w-10 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total de XP</p>
                    <p className="text-2xl font-bold text-accent">{totalXpEarned} XP</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Progresso do Onboarding */}
          <Card className="shadow-lg border-l-4 border-l-accent">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-accent" />
                    Seu Onboarding
                  </CardTitle>
                  <CardDescription>
                    Complete as tarefas para ganhar XP e conhecer a empresa
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Progresso</p>
                  <p className="text-3xl font-bold text-primary">
                    {completedTasksCount}/{onboardingTasks.length}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Conclusão do Onboarding</span>
                  <span className="font-semibold">{Math.round(onboardingProgress)}%</span>
                </div>
                <Progress value={onboardingProgress} className="h-3" />
                <p className="text-xs text-muted-foreground">
                  {totalXpEarned} / {totalXpAvailable} XP conquistados
                </p>
              </div>

              {/* Timeline de Tarefas */}
              <div className="space-y-3">
                {onboardingTasks.map((task, index) => (
                  <Card
                    key={task.id}
                    className={`transition-all hover:shadow-md ${
                      task.completed ? "bg-accent/5 border-accent/30" : "hover:-translate-y-0.5"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => toggleTaskCompletion(task.id)}
                          className="mt-1 transition-transform hover:scale-110"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="h-6 w-6 text-accent" />
                          ) : (
                            <Circle className="h-6 w-6 text-muted-foreground" />
                          )}
                        </button>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3
                                className={`font-semibold mb-1 ${
                                  task.completed ? "line-through text-muted-foreground" : ""
                                }`}
                              >
                                {task.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">{task.description}</p>
                            </div>
                            <Badge variant={task.completed ? "secondary" : "default"} className="gap-1 whitespace-nowrap">
                              <Trophy className="h-3 w-3" />
                              +{task.xp} XP
                            </Badge>
                          </div>
                          
                          {task.linkedModule && task.linkedPath && !task.completed && (
                            <Link to={task.linkedPath}>
                              <Button variant="outline" size="sm" className="mt-3">
                                Ir para {task.linkedModule}
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* PDI - Plano de Desenvolvimento Individual */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Seu Plano de Desenvolvimento Individual (PDI)
              </CardTitle>
              <CardDescription>
                Metas personalizadas para seu crescimento profissional
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pdiGoals.map((goal) => {
                  const CategoryIcon = getCategoryIcon(goal.category);
                  
                  return (
                    <Card key={goal.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <CategoryIcon className="h-6 w-6 text-primary" />
                          <Badge variant="outline">{getCategoryLabel(goal.category)}</Badge>
                        </div>
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                        <CardDescription>{goal.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progresso</span>
                            <span className="font-semibold">{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{goal.deadline}</span>
                          </div>
                          <Badge variant="secondary" className="gap-1">
                            <Trophy className="h-3 w-3" />
                            {goal.xp} XP
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Cursos Sugeridos */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    Cursos Recomendados para Você
                  </CardTitle>
                  <CardDescription>
                    Baseado no seu cargo e metas de desenvolvimento
                  </CardDescription>
                </div>
                <Link to="/dashboard/rh/lms">
                  <Button variant="outline">Ver Todos os Cursos</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {suggestedCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="default" className="gap-1">
                          <Trophy className="h-3 w-3" />
                          +{course.xp} XP
                        </Badge>
                        <span className="text-sm text-muted-foreground">{course.duration}</span>
                      </div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {course.progress > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Seu progresso</span>
                            <span className="font-semibold">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      )}
                      <Link to="/dashboard/rh/lms">
                        <Button className="w-full" variant={course.progress > 0 ? "default" : "outline"}>
                          {course.progress > 0 ? "Continuar" : "Começar Curso"}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardOnboarding;
