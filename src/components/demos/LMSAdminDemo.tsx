import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Plus, Users, BarChart3, Edit, Trash2, Eye, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Course {
  id: number;
  title: string;
  students: number;
  completion: number;
  status: 'published' | 'draft';
  lessons: number;
  rating: number;
}

const LMSAdminDemo = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, title: "Liderança e Gestão de Equipes", students: 145, completion: 78, status: 'published', lessons: 12, rating: 4.8 },
    { id: 2, title: "Comunicação Assertiva", students: 98, completion: 65, status: 'published', lessons: 8, rating: 4.5 },
    { id: 3, title: "Excel Avançado", students: 210, completion: 82, status: 'published', lessons: 15, rating: 4.9 },
    { id: 4, title: "Gestão de Projetos", students: 67, completion: 45, status: 'draft', lessons: 10, rating: 0 },
  ]);

  const stats = {
    totalStudents: 520,
    totalCourses: 4,
    avgCompletion: 68,
    activeNow: 23
  };

  const handleCreateCourse = () => {
    const newCourse: Course = {
      id: Date.now(),
      title: "Novo Curso",
      students: 0,
      completion: 0,
      status: 'draft',
      lessons: 0,
      rating: 0
    };
    setCourses([newCourse, ...courses]);
    toast({
      title: "Curso criado!",
      description: "Novo curso criado como rascunho.",
    });
  };

  const handlePublish = (courseId: number) => {
    setCourses(courses.map(c => 
      c.id === courseId ? { ...c, status: 'published' as const } : c
    ));
    toast({
      title: "Curso publicado!",
      description: "O curso está disponível para os colaboradores.",
    });
  };

  const handleDelete = (courseId: number) => {
    setCourses(courses.filter(c => c.id !== courseId));
    toast({
      title: "Curso excluído",
      description: "O curso foi removido com sucesso.",
    });
  };

  const handleEdit = (course: Course) => {
    toast({
      title: "Editando curso",
      description: `Abrindo editor para "${course.title}"`,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[500px] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground text-sm">LMS Administrativo</h3>
          </div>
          <Button size="sm" className="h-7 text-xs" onClick={handleCreateCourse}>
            <Plus className="h-3 w-3 mr-1" />
            Novo Curso
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-3 grid grid-cols-3 h-8">
          <TabsTrigger value="overview" className="text-xs">Visão Geral</TabsTrigger>
          <TabsTrigger value="courses" className="text-xs">Cursos</TabsTrigger>
          <TabsTrigger value="reports" className="text-xs">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="flex-1 overflow-hidden m-0">
          <ScrollArea className="h-full p-4">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Alunos</span>
                </div>
                <p className="text-xl font-bold text-foreground">{stats.totalStudents}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-xs text-muted-foreground">Conclusão Média</span>
                </div>
                <p className="text-xl font-bold text-green-600">{stats.avgCompletion}%</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <span className="text-xs text-muted-foreground">Total Cursos</span>
                </div>
                <p className="text-xl font-bold text-blue-600">{stats.totalCourses}</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                <div className="flex items-center gap-2 mb-1">
                  <BarChart3 className="h-4 w-4 text-amber-600" />
                  <span className="text-xs text-muted-foreground">Ativos Agora</span>
                </div>
                <p className="text-xl font-bold text-amber-600">{stats.activeNow}</p>
              </div>
            </div>

            {/* Top Courses */}
            <h4 className="text-sm font-medium mb-3">Cursos Mais Populares</h4>
            <div className="space-y-2">
              {courses.filter(c => c.status === 'published').slice(0, 3).map((course, index) => (
                <div key={course.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{course.title}</p>
                    <p className="text-[10px] text-muted-foreground">{course.students} alunos</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-primary">{course.completion}%</p>
                    <p className="text-[10px] text-muted-foreground">conclusão</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="courses" className="flex-1 overflow-hidden m-0">
          <ScrollArea className="h-full p-4">
            <div className="space-y-3">
              {courses.map((course) => (
                <div key={course.id} className="p-3 rounded-lg border border-muted hover:border-primary/50 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium">{course.title}</h4>
                        <Badge 
                          variant={course.status === 'published' ? 'default' : 'secondary'}
                          className="text-[9px] px-1.5 py-0"
                        >
                          {course.status === 'published' ? 'Publicado' : 'Rascunho'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                        <span>{course.lessons} aulas</span>
                        <span>{course.students} alunos</span>
                        {course.rating > 0 && <span>⭐ {course.rating}</span>}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => handleEdit(course)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => handleDelete(course.id)}>
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  
                  {course.status === 'published' && (
                    <div className="flex items-center gap-2">
                      <Progress value={course.completion} className="flex-1 h-1.5" />
                      <span className="text-[10px] text-muted-foreground">{course.completion}% conclusão</span>
                    </div>
                  )}
                  
                  {course.status === 'draft' && (
                    <Button 
                      size="sm" 
                      className="h-6 text-[10px] mt-2"
                      onClick={() => handlePublish(course.id)}
                    >
                      Publicar Curso
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="reports" className="flex-1 overflow-hidden m-0">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border">
                <h4 className="text-sm font-medium mb-3">Engajamento Semanal</h4>
                <div className="space-y-2">
                  {['Seg', 'Ter', 'Qua', 'Qui', 'Sex'].map((day, i) => (
                    <div key={day} className="flex items-center gap-2">
                      <span className="w-8 text-[10px] text-muted-foreground">{day}</span>
                      <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${[78, 65, 92, 88, 45][i]}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground w-8">{[78, 65, 92, 88, 45][i]}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-lg border">
                <h4 className="text-sm font-medium mb-3">Top Departamentos</h4>
                <div className="space-y-2">
                  {[
                    { name: 'Comercial', value: 92 },
                    { name: 'Tecnologia', value: 88 },
                    { name: 'RH', value: 85 },
                    { name: 'Financeiro', value: 72 },
                  ].map((dept) => (
                    <div key={dept.name} className="flex items-center justify-between">
                      <span className="text-xs">{dept.name}</span>
                      <Badge variant="outline" className="text-[10px]">{dept.value}%</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LMSAdminDemo;
