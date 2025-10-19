import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GraduationCap, Plus, BarChart3, Users, Clock, TrendingDown, Award, PlayCircle } from "lucide-react";

const DashboardRHLMS = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: coursesRef, isVisible: coursesVisible } = useScrollAnimation();

  const courses = [
    { 
      id: 1, 
      title: "Liderança Transformadora", 
      students: 24, 
      completion: 75, 
      abandonment: 15, 
      avgTime: "8h",
      status: "active" 
    },
    { 
      id: 2, 
      title: "Comunicação Não-Violenta", 
      students: 18, 
      completion: 82, 
      abandonment: 8, 
      avgTime: "6h",
      status: "active" 
    },
    { 
      id: 3, 
      title: "Gestão de Tempo", 
      students: 32, 
      completion: 45, 
      abandonment: 35, 
      avgTime: "4h",
      status: "alert" 
    },
    { 
      id: 4, 
      title: "Inteligência Emocional", 
      students: 15, 
      completion: 90, 
      abandonment: 5, 
      avgTime: "10h",
      status: "active" 
    },
  ];

  const totalStudents = courses.reduce((acc, c) => acc + c.students, 0);
  const avgCompletion = courses.reduce((acc, c) => acc + c.completion, 0) / courses.length;
  const avgAbandonment = courses.reduce((acc, c) => acc + c.abandonment, 0) / courses.length;

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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Treinamentos (LMS)
                </h1>
                <p className="text-muted-foreground">Sistema de Gestão de Aprendizagem</p>
              </div>
              <Button size="lg" className="gap-2 shadow-lg">
                <Plus className="h-5 w-5" />
                Criar Novo Curso
              </Button>
            </div>
          </div>

          {/* Métricas Principais */}
          <div
            ref={statsRef}
            className={`grid md:grid-cols-4 gap-6 transition-all duration-700 delay-100 ${
              statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Card className="hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total de Alunos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-primary">{totalStudents}</p>
                  <Users className="h-8 w-8 text-primary/40" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Conclusão Média</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-green-600">{avgCompletion.toFixed(0)}%</p>
                  <Award className="h-8 w-8 text-green-600/40" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all border-red-200 bg-red-50/50 dark:bg-red-950/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-red-600 dark:text-red-400">
                  Taxa de Abandono Média
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">{avgAbandonment.toFixed(0)}%</p>
                  <TrendingDown className="h-8 w-8 text-red-600/40" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Cursos Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-primary">{courses.length}</p>
                  <GraduationCap className="h-8 w-8 text-primary/40" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerta Principal - Taxa de Abandono */}
          <Card className="border-red-500/50 bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <TrendingDown className="h-6 w-6" />
                Alerta: Alta Taxa de Abandono Detectada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                A IA identificou que o curso <strong>"Gestão de Tempo"</strong> possui uma taxa de abandono crítica de <strong>35%</strong>.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Ver Análise Completa
                </Button>
                <Button className="gap-2">
                  Ações Recomendadas
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Gerenciamento de Cursos */}
          <div
            ref={coursesRef}
            className={`transition-all duration-700 delay-200 ${
              coursesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              Cursos Disponíveis
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Card 
                  key={course.id} 
                  className={`hover:shadow-lg transition-all hover:-translate-y-1 ${
                    course.status === 'alert' ? 'border-red-300 bg-red-50/30 dark:bg-red-950/10' : ''
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      {course.status === 'alert' && (
                        <Badge variant="destructive" className="gap-1">
                          <TrendingDown className="h-3 w-3" />
                          Atenção
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Alunos</p>
                        <p className="font-semibold flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {course.students}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Conclusão</p>
                        <p className="font-semibold text-green-600">{course.completion}%</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Abandono</p>
                        <p className={`font-semibold ${course.abandonment > 20 ? 'text-red-600' : 'text-muted-foreground'}`}>
                          {course.abandonment}%
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Progresso Médio</span>
                        <span className="font-medium">{course.completion}%</span>
                      </div>
                      <Progress value={course.completion} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{course.avgTime} duração média</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <BarChart3 className="h-3 w-3" />
                          Relatório
                        </Button>
                        <Button size="sm" className="gap-1">
                          <PlayCircle className="h-3 w-3" />
                          Gerenciar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Ações Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Plus className="h-6 w-6" />
                <span>Criar Novo Curso</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <BarChart3 className="h-6 w-6" />
                <span>Relatório de Engajamento</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Users className="h-6 w-6" />
                <span>Gerenciar Alunos</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardRHLMS;