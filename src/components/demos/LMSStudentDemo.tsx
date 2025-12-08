import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Play, Clock, Award, CheckCircle, Lock, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
  duration: string;
  lessons: number;
  completed: number;
  category: string;
  instructor: string;
  enrolled: boolean;
}

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
}

const LMSStudentDemo = () => {
  const { toast } = useToast();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses] = useState<Course[]>([
    {
      id: 1,
      title: "Liderança e Gestão de Equipes",
      description: "Desenvolva habilidades de liderança eficaz",
      progress: 75,
      duration: "8h",
      lessons: 12,
      completed: 9,
      category: "Liderança",
      instructor: "Maria Santos",
      enrolled: true
    },
    {
      id: 2,
      title: "Comunicação Assertiva",
      description: "Melhore sua comunicação interpessoal",
      progress: 40,
      duration: "5h",
      lessons: 8,
      completed: 3,
      category: "Soft Skills",
      instructor: "João Silva",
      enrolled: true
    },
    {
      id: 3,
      title: "Excel Avançado",
      description: "Domine fórmulas e análise de dados",
      progress: 0,
      duration: "10h",
      lessons: 15,
      completed: 0,
      category: "Técnico",
      instructor: "Ana Costa",
      enrolled: false
    },
    {
      id: 4,
      title: "Gestão de Projetos",
      description: "Metodologias ágeis e tradicionais",
      progress: 100,
      duration: "6h",
      lessons: 10,
      completed: 10,
      category: "Gestão",
      instructor: "Pedro Lima",
      enrolled: true
    }
  ]);

  const [lessons] = useState<Lesson[]>([
    { id: 1, title: "Introdução à Liderança", duration: "15min", completed: true, locked: false },
    { id: 2, title: "Estilos de Liderança", duration: "25min", completed: true, locked: false },
    { id: 3, title: "Motivação de Equipes", duration: "30min", completed: true, locked: false },
    { id: 4, title: "Feedback Efetivo", duration: "20min", completed: false, locked: false },
    { id: 5, title: "Gestão de Conflitos", duration: "25min", completed: false, locked: true },
    { id: 6, title: "Delegação de Tarefas", duration: "20min", completed: false, locked: true },
  ]);

  const handleEnroll = (course: Course) => {
    toast({
      title: "Matriculado com sucesso!",
      description: `Você foi matriculado no curso "${course.title}".`,
    });
  };

  const handleStartLesson = (lesson: Lesson) => {
    if (lesson.locked) {
      toast({
        title: "Aula bloqueada",
        description: "Complete as aulas anteriores para desbloquear.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Iniciando aula",
      description: `Reproduzindo: ${lesson.title}`,
    });
  };

  const handleOpenCourse = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleBack = () => {
    setSelectedCourse(null);
  };

  if (selectedCourse) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[500px] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-7 px-2" onClick={handleBack}>
              ← Voltar
            </Button>
            <h3 className="font-semibold text-foreground text-sm">{selectedCourse.title}</h3>
          </div>
        </div>

        {/* Course Info */}
        <div className="p-4 border-b bg-muted/20">
          <div className="flex items-center justify-between mb-3">
            <div>
              <Badge variant="secondary" className="mb-2">{selectedCourse.category}</Badge>
              <p className="text-xs text-muted-foreground">Instrutor: {selectedCourse.instructor}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-primary">{selectedCourse.progress}%</p>
              <p className="text-[10px] text-muted-foreground">Progresso</p>
            </div>
          </div>
          <Progress value={selectedCourse.progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {selectedCourse.completed} de {selectedCourse.lessons} aulas concluídas
          </p>
        </div>

        {/* Lessons */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            <h4 className="text-sm font-medium text-foreground mb-3">Conteúdo do Curso</h4>
            {lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                onClick={() => handleStartLesson(lesson)}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                  lesson.locked 
                    ? 'bg-muted/50 border-muted opacity-60' 
                    : lesson.completed 
                      ? 'bg-green-50 border-green-200 hover:bg-green-100' 
                      : 'bg-white border-muted hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  lesson.completed ? 'bg-green-500' : lesson.locked ? 'bg-muted' : 'bg-primary/10'
                }`}>
                  {lesson.completed ? (
                    <CheckCircle className="h-4 w-4 text-white" />
                  ) : lesson.locked ? (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Play className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{lesson.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {lesson.duration}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">Aula {index + 1}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[500px] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground text-sm">Meus Cursos</h3>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-medium">3 Certificados</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 p-3 bg-muted/20 border-b">
        <div className="text-center">
          <p className="text-lg font-bold text-primary">4</p>
          <p className="text-[10px] text-muted-foreground">Cursos</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-green-600">22</p>
          <p className="text-[10px] text-muted-foreground">Aulas Completas</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-amber-500">1.250</p>
          <p className="text-[10px] text-muted-foreground">XP Ganhos</p>
        </div>
      </div>

      {/* Courses */}
      <ScrollArea className="flex-1 p-3">
        <div className="space-y-3">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => course.enrolled && handleOpenCourse(course)}
              className="p-3 rounded-lg border border-muted hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  course.progress === 100 ? 'bg-green-100' : 'bg-primary/10'
                }`}>
                  {course.progress === 100 ? (
                    <Award className="h-5 w-5 text-green-600" />
                  ) : (
                    <BookOpen className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-medium text-foreground truncate">{course.title}</h4>
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0">{course.category}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{course.description}</p>
                  
                  {course.enrolled ? (
                    <>
                      <div className="flex items-center gap-2 mb-1">
                        <Progress value={course.progress} className="flex-1 h-1.5" />
                        <span className="text-xs font-medium text-primary">{course.progress}%</span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {course.duration}
                        </span>
                        <span>{course.completed}/{course.lessons} aulas</span>
                      </div>
                    </>
                  ) : (
                    <Button 
                      size="sm" 
                      className="h-7 text-xs mt-1"
                      onClick={(e) => { e.stopPropagation(); handleEnroll(course); }}
                    >
                      Matricular-se
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default LMSStudentDemo;
