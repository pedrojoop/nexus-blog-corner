import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, GripVertical, Copy, Pencil, Award, Layers } from "lucide-react";
import { toast } from "sonner";

interface TemplateTask {
  id: string;
  text: string;
  xp: number;
}

interface TemplateStep {
  id: string;
  day: string;
  title: string;
  tasks: TemplateTask[];
}

interface JourneyTemplate {
  id: string;
  name: string;
  department: string;
  steps: TemplateStep[];
}

const departmentOptions = [
  { value: "tecnologia", label: "Tecnologia", color: "bg-violet-100 text-violet-700" },
  { value: "rh", label: "Recursos Humanos", color: "bg-sky-100 text-sky-700" },
  { value: "vendas", label: "Vendas", color: "bg-emerald-100 text-emerald-700" },
  { value: "marketing", label: "Marketing", color: "bg-pink-100 text-pink-700" },
  { value: "financeiro", label: "Financeiro", color: "bg-amber-100 text-amber-700" },
  { value: "geral", label: "Geral (Todos)", color: "bg-slate-100 text-slate-700" },
];

const defaultTemplates: JourneyTemplate[] = [
  {
    id: "tpl-1",
    name: "Onboarding Tecnologia",
    department: "tecnologia",
    steps: [
      { id: "s1", day: "Dia 1", title: "Bem-vindo & Setup", tasks: [
        { id: "t1", text: "Configurar ambiente de desenvolvimento", xp: 20 },
        { id: "t2", text: "Acessar repositórios no GitHub", xp: 10 },
      ]},
      { id: "s2", day: "Dia 3", title: "Cultura & Compliance", tasks: [
        { id: "t3", text: "Curso de Segurança da Informação", xp: 50 },
      ]},
      { id: "s3", day: "Dia 7", title: "Integração com o Time", tasks: [
        { id: "t4", text: "Pair programming com mentor", xp: 30 },
        { id: "t5", text: "1:1 com Tech Lead", xp: 20 },
      ]},
    ],
  },
  {
    id: "tpl-2",
    name: "Onboarding Vendas",
    department: "vendas",
    steps: [
      { id: "s4", day: "Dia 1", title: "Bem-vindo & CRM", tasks: [
        { id: "t6", text: "Acessar CRM e aprender pipeline", xp: 20 },
      ]},
      { id: "s5", day: "Dia 5", title: "Produto & Pitch", tasks: [
        { id: "t7", text: "Estudar materiais de produto", xp: 30 },
        { id: "t8", text: "Simular pitch com gestor", xp: 40 },
      ]},
    ],
  },
];

let idCounter = 100;
const genId = () => `gen-${++idCounter}`;

interface TemplateManagerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TemplateManagerModal = ({ open, onOpenChange }: TemplateManagerModalProps) => {
  const [templates, setTemplates] = useState<JourneyTemplate[]>(defaultTemplates);
  const [editingTemplate, setEditingTemplate] = useState<JourneyTemplate | null>(null);
  const [view, setView] = useState<"list" | "edit">("list");

  // Edit form state
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("geral");
  const [steps, setSteps] = useState<TemplateStep[]>([]);

  const openEditor = (template?: JourneyTemplate) => {
    if (template) {
      setEditingTemplate(template);
      setName(template.name);
      setDepartment(template.department);
      setSteps(JSON.parse(JSON.stringify(template.steps)));
    } else {
      setEditingTemplate(null);
      setName("");
      setDepartment("geral");
      setSteps([{ id: genId(), day: "Dia 1", title: "", tasks: [{ id: genId(), text: "", xp: 10 }] }]);
    }
    setView("edit");
  };

  const addStep = () => {
    const nextDay = steps.length + 1;
    setSteps([...steps, { id: genId(), day: `Dia ${nextDay}`, title: "", tasks: [{ id: genId(), text: "", xp: 10 }] }]);
  };

  const removeStep = (stepId: string) => {
    setSteps(steps.filter(s => s.id !== stepId));
  };

  const updateStep = (stepId: string, field: "day" | "title", value: string) => {
    setSteps(steps.map(s => s.id === stepId ? { ...s, [field]: value } : s));
  };

  const addTask = (stepId: string) => {
    setSteps(steps.map(s => s.id === stepId ? { ...s, tasks: [...s.tasks, { id: genId(), text: "", xp: 10 }] } : s));
  };

  const removeTask = (stepId: string, taskId: string) => {
    setSteps(steps.map(s => s.id === stepId ? { ...s, tasks: s.tasks.filter(t => t.id !== taskId) } : s));
  };

  const updateTask = (stepId: string, taskId: string, field: "text" | "xp", value: string | number) => {
    setSteps(steps.map(s => s.id === stepId
      ? { ...s, tasks: s.tasks.map(t => t.id === taskId ? { ...t, [field]: value } : t) }
      : s
    ));
  };

  const saveTemplate = () => {
    if (!name.trim()) { toast.error("Dê um nome ao template."); return; }
    const hasEmptyStep = steps.some(s => !s.title.trim() || s.tasks.some(t => !t.text.trim()));
    if (hasEmptyStep) { toast.error("Preencha todos os campos de etapas e tarefas."); return; }

    if (editingTemplate) {
      setTemplates(templates.map(t => t.id === editingTemplate.id ? { ...editingTemplate, name, department, steps } : t));
      toast.success("Template atualizado com sucesso!");
    } else {
      setTemplates([...templates, { id: genId(), name, department, steps }]);
      toast.success("Novo template criado com sucesso!");
    }
    setView("list");
  };

  const duplicateTemplate = (template: JourneyTemplate) => {
    const dup: JourneyTemplate = {
      ...JSON.parse(JSON.stringify(template)),
      id: genId(),
      name: `${template.name} (Cópia)`,
    };
    setTemplates([...templates, dup]);
    toast.success("Template duplicado!");
  };

  const deleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    toast.success("Template removido.");
  };

  const getDeptBadge = (dept: string) => {
    const d = departmentOptions.find(o => o.value === dept);
    return d ? <Badge variant="secondary" className={`${d.color} border-0 text-xs`}>{d.label}</Badge> : null;
  };

  const totalXp = (tpl: JourneyTemplate) => tpl.steps.reduce((acc, s) => acc + s.tasks.reduce((a, t) => a + t.xp, 0), 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        {view === "list" ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Layers className="h-5 w-5 text-primary" />
                Templates de Jornadas
              </DialogTitle>
              <DialogDescription>
                Crie e gerencie modelos de onboarding por departamento.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 mt-2">
              {templates.map(tpl => (
                <Card key={tpl.id} className="border">
                  <CardContent className="p-4 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm text-foreground truncate">{tpl.name}</p>
                        {getDeptBadge(tpl.department)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {tpl.steps.length} etapas · {tpl.steps.reduce((a, s) => a + s.tasks.length, 0)} tarefas · <Award className="inline h-3 w-3 text-amber-500" /> {totalXp(tpl)} XP
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditor(tpl)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => duplicateTemplate(tpl)}>
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => deleteTemplate(tpl.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Fechar</Button>
              <Button onClick={() => openEditor()} className="gap-2">
                <Plus className="h-4 w-4" /> Novo Template
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg">
                {editingTemplate ? "Editar Template" : "Novo Template de Jornada"}
              </DialogTitle>
              <DialogDescription>Defina etapas, tarefas e XP para o onboarding.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-2">
              {/* Name & Department */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Nome do Template</Label>
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Onboarding Design" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Departamento</Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {departmentOptions.map(d => (
                        <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              {/* Steps */}
              <div className="space-y-4">
                {steps.map((step, stepIdx) => (
                  <div key={step.id} className="border rounded-lg p-4 bg-muted/30 space-y-3">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground/50" />
                      <Input
                        value={step.day}
                        onChange={e => updateStep(step.id, "day", e.target.value)}
                        className="h-8 w-24 text-xs font-semibold"
                        placeholder="Dia X"
                      />
                      <Input
                        value={step.title}
                        onChange={e => updateStep(step.id, "title", e.target.value)}
                        className="h-8 flex-1 text-xs"
                        placeholder="Título da etapa..."
                      />
                      {steps.length > 1 && (
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeStep(step.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>

                    {/* Tasks */}
                    <div className="space-y-2 ml-6">
                      {step.tasks.map(task => (
                        <div key={task.id} className="flex items-center gap-2">
                          <Input
                            value={task.text}
                            onChange={e => updateTask(step.id, task.id, "text", e.target.value)}
                            className="h-8 flex-1 text-xs"
                            placeholder="Descrição da tarefa..."
                          />
                          <div className="flex items-center gap-1">
                            <Input
                              type="number"
                              value={task.xp}
                              onChange={e => updateTask(step.id, task.id, "xp", parseInt(e.target.value) || 0)}
                              className="h-8 w-16 text-xs text-center"
                              min={0}
                            />
                            <span className="text-xs font-bold text-amber-600 whitespace-nowrap">XP</span>
                          </div>
                          {step.tasks.length > 1 && (
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={() => removeTask(step.id, task.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-muted-foreground" onClick={() => addTask(step.id)}>
                        <Plus className="h-3 w-3" /> Tarefa
                      </Button>
                    </div>
                  </div>
                ))}

                <Button variant="outline" size="sm" className="gap-1.5 text-xs w-full" onClick={addStep}>
                  <Plus className="h-3.5 w-3.5" /> Adicionar Etapa
                </Button>
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setView("list")}>Voltar</Button>
              <Button onClick={saveTemplate}>
                {editingTemplate ? "Salvar Alterações" : "Criar Template"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TemplateManagerModal;
