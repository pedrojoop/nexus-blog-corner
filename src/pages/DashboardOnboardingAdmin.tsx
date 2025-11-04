import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { 
  Plus, Edit, Trash2, Users, GraduationCap, Trophy, 
  Target, CheckCircle2, Settings, Briefcase, ArrowRight 
} from "lucide-react";
import { toast } from "sonner";

interface OnboardingTemplate {
  id: string;
  name: string;
  department: string;
  role: string;
  tasksCount: number;
  totalXP: number;
  assignedTo: number;
}

interface TemplateTask {
  id: string;
  title: string;
  description: string;
  xp: number;
  linkedModule?: string;
  order: number;
}

interface PDITemplate {
  id: string;
  name: string;
  department: string;
  role: string;
  goalsCount: number;
  coursesCount: number;
  assignedTo: number;
}

const DashboardOnboardingAdmin = () => {
  const headerSection = useScrollAnimation();
  
  const [templates, setTemplates] = useState<OnboardingTemplate[]>([
    {
      id: "1",
      name: "Onboarding: Desenvolvedor",
      department: "Tecnologia",
      role: "Desenvolvedor",
      tasksCount: 6,
      totalXP: 675,
      assignedTo: 8,
    },
    {
      id: "2",
      name: "Onboarding: Vendas",
      department: "Comercial",
      role: "Vendedor",
      tasksCount: 5,
      totalXP: 550,
      assignedTo: 12,
    },
    {
      id: "3",
      name: "Onboarding: RH",
      department: "Recursos Humanos",
      role: "Analista de RH",
      tasksCount: 7,
      totalXP: 800,
      assignedTo: 3,
    },
  ]);

  const [pdiTemplates, setPdiTemplates] = useState<PDITemplate[]>([
    {
      id: "1",
      name: "PDI: Desenvolvedor Júnior",
      department: "Tecnologia",
      role: "Desenvolvedor Júnior",
      goalsCount: 4,
      coursesCount: 3,
      assignedTo: 5,
    },
    {
      id: "2",
      name: "PDI: Líder de Vendas",
      department: "Comercial",
      role: "Líder de Vendas",
      goalsCount: 5,
      coursesCount: 2,
      assignedTo: 3,
    },
  ]);

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    department: "",
    role: "",
  });

  const [tasks, setTasks] = useState<TemplateTask[]>([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    xp: 100,
    linkedModule: "",
  });

  const criarTemplate = () => {
    if (!newTemplate.name || !newTemplate.department || !newTemplate.role) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    if (tasks.length === 0) {
      toast.error("Adicione pelo menos uma tarefa ao template");
      return;
    }

    const template: OnboardingTemplate = {
      id: (templates.length + 1).toString(),
      name: newTemplate.name,
      department: newTemplate.department,
      role: newTemplate.role,
      tasksCount: tasks.length,
      totalXP: tasks.reduce((acc, t) => acc + t.xp, 0),
      assignedTo: 0,
    };

    setTemplates([...templates, template]);
    setNewTemplate({ name: "", department: "", role: "" });
    setTasks([]);
    toast.success("Template de Onboarding criado com sucesso!");
  };

  const adicionarTarefa = () => {
    if (!newTask.title || !newTask.description) {
      toast.error("Preencha título e descrição da tarefa");
      return;
    }

    const task: TemplateTask = {
      id: (tasks.length + 1).toString(),
      title: newTask.title,
      description: newTask.description,
      xp: newTask.xp,
      linkedModule: newTask.linkedModule || undefined,
      order: tasks.length + 1,
    };

    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "", xp: 100, linkedModule: "" });
    toast.success("Tarefa adicionada ao template");
  };

  const removerTarefa = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    toast.success("Tarefa removida");
  };

  const excluirTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    toast.success("Template excluído com sucesso");
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
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Gestão de Onboarding & PDI
            </h1>
            <p className="text-muted-foreground text-lg">
              Configure jornadas de desenvolvimento para sua equipe
            </p>
          </div>

          <Tabs defaultValue="templates" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="templates">Templates de Onboarding</TabsTrigger>
              <TabsTrigger value="criar">Criar Template</TabsTrigger>
              <TabsTrigger value="pdi">Templates de PDI</TabsTrigger>
            </TabsList>

            {/* Templates de Onboarding */}
            <TabsContent value="templates" className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <Settings className="h-6 w-6 text-primary" />
                        Templates de Onboarding
                      </CardTitle>
                      <CardDescription>
                        Gerencie os templates de onboarding por cargo e departamento
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      {templates.length} Templates
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((template) => (
                      <Card key={template.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-2">
                            <Briefcase className="h-6 w-6 text-primary" />
                            <div className="space-x-1">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => excluirTemplate(template.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <div className="space-y-1">
                            <Badge variant="outline">{template.department}</Badge>
                            <p className="text-sm text-muted-foreground">{template.role}</p>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Tarefas</p>
                              <p className="font-semibold text-lg">{template.tasksCount}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Total XP</p>
                              <p className="font-semibold text-lg flex items-center gap-1">
                                <Trophy className="h-4 w-4 text-accent" />
                                {template.totalXP}
                              </p>
                            </div>
                          </div>
                          
                          <div className="pt-4 border-t flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                {template.assignedTo} colaboradores
                              </span>
                            </div>
                            <Button size="sm" variant="outline">
                              Atribuir
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Criar Template */}
            <TabsContent value="criar" className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Plus className="h-6 w-6 text-primary" />
                    Criar Novo Template de Onboarding
                  </CardTitle>
                  <CardDescription>
                    Configure as informações básicas e tarefas do template
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Informações Básicas */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Informações Básicas</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="templateName">Nome do Template *</Label>
                        <Input
                          id="templateName"
                          placeholder="Ex: Onboarding: Desenvolvedor"
                          value={newTemplate.name}
                          onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Departamento *</Label>
                        <Select 
                          value={newTemplate.department} 
                          onValueChange={(v) => setNewTemplate({ ...newTemplate, department: v })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o departamento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                            <SelectItem value="Comercial">Comercial</SelectItem>
                            <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Financeiro">Financeiro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Cargo *</Label>
                      <Input
                        id="role"
                        placeholder="Ex: Desenvolvedor Júnior"
                        value={newTemplate.role}
                        onChange={(e) => setNewTemplate({ ...newTemplate, role: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Adicionar Tarefas */}
                  <div className="space-y-4 pt-6 border-t">
                    <h3 className="font-semibold text-lg">Tarefas do Onboarding</h3>
                    
                    {/* Lista de Tarefas Adicionadas */}
                    {tasks.length > 0 && (
                      <div className="space-y-3 mb-6">
                        {tasks.map((task, index) => (
                          <Card key={task.id} className="bg-muted/30">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="outline" className="text-xs">
                                      Tarefa {index + 1}
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs gap-1">
                                      <Trophy className="h-3 w-3" />
                                      {task.xp} XP
                                    </Badge>
                                    {task.linkedModule && (
                                      <Badge variant="default" className="text-xs">
                                        {task.linkedModule}
                                      </Badge>
                                    )}
                                  </div>
                                  <h4 className="font-semibold">{task.title}</h4>
                                  <p className="text-sm text-muted-foreground">{task.description}</p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removerTarefa(task.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
                          <span className="font-semibold">Total de XP do Template:</span>
                          <Badge variant="default" className="text-lg px-4 py-2 gap-2">
                            <Trophy className="h-5 w-5" />
                            {tasks.reduce((acc, t) => acc + t.xp, 0)} XP
                          </Badge>
                        </div>
                      </div>
                    )}

                    {/* Formulário de Nova Tarefa */}
                    <Card className="border-dashed border-2">
                      <CardContent className="p-6 space-y-4">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Plus className="h-5 w-5 text-primary" />
                          Adicionar Nova Tarefa
                        </h4>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="taskTitle">Título da Tarefa *</Label>
                            <Input
                              id="taskTitle"
                              placeholder="Ex: Complete seu perfil"
                              value={newTask.title}
                              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="taskDescription">Descrição *</Label>
                            <Textarea
                              id="taskDescription"
                              placeholder="Descreva o que o colaborador precisa fazer"
                              value={newTask.description}
                              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                              rows={2}
                            />
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="taskXP">XP da Tarefa *</Label>
                              <Input
                                id="taskXP"
                                type="number"
                                min="0"
                                step="50"
                                value={newTask.xp}
                                onChange={(e) => setNewTask({ ...newTask, xp: parseInt(e.target.value) || 0 })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="linkedModule">Módulo Vinculado (Opcional)</Label>
                              <Select 
                                value={newTask.linkedModule} 
                                onValueChange={(v) => setNewTask({ ...newTask, linkedModule: v })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione um módulo" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Chat">Chat</SelectItem>
                                  <SelectItem value="LMS">LMS - Treinamentos</SelectItem>
                                  <SelectItem value="Eventos">Eventos</SelectItem>
                                  <SelectItem value="Documentos">Documentos</SelectItem>
                                  <SelectItem value="Gamificação">Gamificação</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <Button onClick={adicionarTarefa} className="w-full gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            Adicionar Tarefa
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Botão Criar Template */}
                  <div className="pt-6 border-t">
                    <Button 
                      onClick={criarTemplate} 
                      size="lg" 
                      className="w-full gap-2"
                      disabled={!newTemplate.name || !newTemplate.department || !newTemplate.role || tasks.length === 0}
                    >
                      <Plus className="h-5 w-5" />
                      Criar Template de Onboarding
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Templates de PDI */}
            <TabsContent value="pdi" className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <Target className="h-6 w-6 text-primary" />
                        Templates de PDI
                      </CardTitle>
                      <CardDescription>
                        Configure planos de desenvolvimento por cargo
                      </CardDescription>
                    </div>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Novo Template PDI
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {pdiTemplates.map((template) => (
                      <Card key={template.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-2">
                            <Target className="h-6 w-6 text-primary" />
                            <div className="space-x-1">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <div className="space-y-1">
                            <Badge variant="outline">{template.department}</Badge>
                            <p className="text-sm text-muted-foreground">{template.role}</p>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Metas</p>
                              <p className="font-semibold text-lg flex items-center gap-1">
                                <Target className="h-4 w-4 text-primary" />
                                {template.goalsCount}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Cursos</p>
                              <p className="font-semibold text-lg flex items-center gap-1">
                                <GraduationCap className="h-4 w-4 text-accent" />
                                {template.coursesCount}
                              </p>
                            </div>
                          </div>
                          
                          <div className="pt-4 border-t flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                {template.assignedTo} colaboradores
                              </span>
                            </div>
                            <Button size="sm" variant="outline" className="gap-2">
                              Vincular <ArrowRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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

export default DashboardOnboardingAdmin;
