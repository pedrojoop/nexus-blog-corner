import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Rocket, Users, Clock, AlertTriangle, CheckCircle2, Circle,
  Sparkles, BookOpen, ShieldCheck, CalendarDays, MessageSquare,
  Lock, ExternalLink, Award, Layers,
} from "lucide-react";
import TemplateManagerModal from "@/components/jornadas/TemplateManagerModal";

const newHires = [
  { id: 1, name: "Mariana Silva", role: "UX Designer", progress: 45, avatar: "Mariana", initials: "MS" },
  { id: 2, name: "Carlos Dev", role: "Frontend Dev", progress: 10, avatar: "CarlosD", initials: "CD" },
  { id: 3, name: "Julia Sales", role: "Account Executive", progress: 90, avatar: "Julia", initials: "JS" },
];

type TaskStatus = "completed" | "active" | "pending";

interface JourneyTask {
  id: string;
  text: string;
  checked: boolean;
  xp: number;
  icon?: React.ReactNode;
  action?: { label: string; icon: React.ReactNode };
}

interface JourneyStep {
  day: string;
  title: string;
  status: TaskStatus;
  tasks: JourneyTask[];
}

const journeySteps: JourneyStep[] = [
  {
    day: "Dia 1",
    title: "Bem-vindo à Nexus!",
    status: "completed",
    tasks: [
      { id: "1a", text: "Preencher perfil completo", checked: true, xp: 10 },
      { id: "1b", text: "Ler manual de cultura no Nexus Brain", checked: true, xp: 20, icon: <Sparkles className="h-3.5 w-3.5" /> },
    ],
  },
  {
    day: "Dia 3",
    title: "Compliance & Segurança",
    status: "active",
    tasks: [
      {
        id: "2a",
        text: "Fazer o curso de Segurança da Informação no LMS",
        checked: false,
        xp: 50,
        icon: <ShieldCheck className="h-3.5 w-3.5" />,
        action: { label: "Ir para o Curso", icon: <BookOpen className="h-3.5 w-3.5" /> },
      },
      { id: "2b", text: "Assinar política de confidencialidade (NDA)", checked: false, xp: 15 },
    ],
  },
  {
    day: "Dia 7",
    title: "Alinhamento Estratégico",
    status: "pending",
    tasks: [
      {
        id: "3a",
        text: "Agendar primeira reunião de 1:1 com o Gestor",
        checked: false,
        xp: 30,
        action: { label: "Agendar 1:1", icon: <CalendarDays className="h-3.5 w-3.5" /> },
      },
    ],
  },
  {
    day: "Dia 30",
    title: "Check-in de 1 Mês",
    status: "pending",
    tasks: [
      { id: "4a", text: "Responder pesquisa de pulso (eNPS) sobre o onboarding", checked: false, xp: 100 },
    ],
  },
];

const StepIcon = ({ status }: { status: TaskStatus }) => {
  if (status === "completed") return <CheckCircle2 className="h-6 w-6 text-emerald-500" />;
  if (status === "active") return <Circle className="h-6 w-6 text-primary fill-primary/20" />;
  return <Lock className="h-6 w-6 text-muted-foreground/40" />;
};

const DashboardRHJornadas = () => {
  const [selectedHire, setSelectedHire] = useState(1);
  const [steps, setSteps] = useState(journeySteps);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);

  const toggleTask = (stepIdx: number, taskId: string) => {
    setSteps(prev =>
      prev.map((step, i) =>
        i === stepIdx
          ? { ...step, tasks: step.tasks.map(t => t.id === taskId ? { ...t, checked: !t.checked } : t) }
          : step
      )
    );
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Rocket className="h-8 w-8 text-primary" />
            Jornadas de Onboarding
          </h1>
          <p className="text-muted-foreground mt-1">
            Automatize o ramp-up de novos colaboradores com trilhas gamificadas.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setTemplateModalOpen(true)}>
            <Layers className="h-4 w-4" />
            Templates
          </Button>
          <Button className="gap-2">
            + Iniciar Nova Jornada
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Onboardings Ativos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="h-11 w-11 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">85%</p>
              <p className="text-sm text-muted-foreground">Média de Conclusão</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="h-11 w-11 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-destructive">4</p>
              <p className="text-sm text-muted-foreground">Tarefas Atrasadas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Roster */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Novos Colaboradores</CardTitle>
            <CardDescription>Primeiros 30 dias</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {newHires.map((hire) => (
              <button
                key={hire.id}
                onClick={() => setSelectedHire(hire.id)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedHire === hire.id
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${hire.avatar}`} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{hire.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{hire.name}</p>
                    <p className="text-xs text-muted-foreground">{hire.role}</p>
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground">{hire.progress}%</span>
                </div>
                <Progress value={hire.progress} className="h-1.5 mt-2" />
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Right: Timeline */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Jornada de Mariana Silva: Primeiros 30 Dias</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Award className="h-4 w-4 text-amber-500" />
                    <span className="font-semibold text-amber-600">30 XP acumulados</span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-0">
                {steps.map((step, stepIdx) => (
                  <div key={step.day} className="relative flex gap-4">
                    {/* Vertical line */}
                    <div className="flex flex-col items-center">
                      <StepIcon status={step.status} />
                      {stepIdx < steps.length - 1 && (
                        <div className={`w-0.5 flex-1 my-1 ${
                          step.status === "completed" ? "bg-emerald-500" : "bg-border"
                        }`} />
                      )}
                    </div>

                    {/* Content */}
                    <div className={`flex-1 pb-8 ${step.status === "pending" ? "opacity-50" : ""}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={step.status === "active" ? "default" : "secondary"} className="text-xs">
                          {step.day}
                        </Badge>
                        <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                      </div>

                      <div className="space-y-2.5 ml-1">
                        {step.tasks.map((task) => (
                          <div
                            key={task.id}
                            className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                              step.status === "active" ? "bg-card border-border" : "bg-muted/30 border-transparent"
                            }`}
                          >
                            <Checkbox
                              checked={task.checked}
                              disabled={step.status === "pending"}
                              onCheckedChange={() => toggleTask(stepIdx, task.id)}
                              className="mt-0.5"
                            />
                            <div className="flex-1 min-w-0">
                              <span className={`text-sm ${task.checked ? "line-through text-muted-foreground" : "text-foreground"}`}>
                                {task.text}
                              </span>
                              {task.action && step.status !== "pending" && (
                                <Button variant="outline" size="sm" className="mt-2 gap-1.5 h-7 text-xs">
                                  {task.action.icon}
                                  {task.action.label}
                                  <ExternalLink className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                            <Badge className="shrink-0 bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 font-bold text-xs px-2">
                              +{task.xp} XP
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardRHJornadas;
