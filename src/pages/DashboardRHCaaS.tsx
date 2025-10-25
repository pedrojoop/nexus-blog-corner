import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calendar, Plus, TrendingUp, Users, Clock, CheckCircle, AlertTriangle, Edit, Trash2, Target, MessageSquare, Send } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface Ritual {
  id: number;
  name: string;
  frequency: string;
  participants: number;
  successRate: number;
  nextDate: string;
  status: 'active' | 'alert' | 'scheduled';
  department: string;
  description?: string;
  category?: string;
}

interface CorrectiveAction {
  id: number;
  action: string;
  responsible: string;
  deadline: string;
  status: 'pending' | 'in_progress' | 'completed';
}

const DashboardRHCaaS = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: ritualsRef, isVisible: ritualsVisible } = useScrollAnimation();
  const { toast } = useToast();

  const [rituals, setRituals] = useState<Ritual[]>([
    { 
      id: 1, 
      name: "Weekly Team Sync", 
      frequency: "Toda segunda, 10h", 
      participants: 8, 
      successRate: 95,
      nextDate: "Amanhã",
      status: "active" as const,
      department: "Tecnologia",
      description: "Reunião semanal de alinhamento da equipe",
      category: "Comunicação"
    },
    { 
      id: 2, 
      name: "1:1 com Gestor", 
      frequency: "Quinzenal", 
      participants: 2, 
      successRate: 85,
      nextDate: "Em 3 dias",
      status: "active" as const,
      department: "Geral",
      description: "Conversas individuais de desenvolvimento",
      category: "Desenvolvimento"
    },
    { 
      id: 3, 
      name: "Ritual de Reconhecimento", 
      frequency: "Mensal", 
      participants: 45, 
      successRate: 60,
      nextDate: "Sexta-feira",
      status: "alert" as const,
      department: "Comercial",
      description: "Celebração de conquistas e reconhecimento",
      category: "Engajamento"
    },
    { 
      id: 4, 
      name: "All-Hands Meeting", 
      frequency: "Mensal", 
      participants: 120, 
      successRate: 92,
      nextDate: "Sexta-feira",
      status: "active" as const,
      department: "Toda empresa",
      description: "Reunião geral com toda a empresa",
      category: "Comunicação"
    },
    { 
      id: 5, 
      name: "Feedback 360°", 
      frequency: "Trimestral", 
      participants: 35, 
      successRate: 78,
      nextDate: "Em 12 dias",
      status: "scheduled" as const,
      department: "Liderança",
      description: "Avaliação 360 graus de feedback",
      category: "Desenvolvimento"
    },
  ]);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [manageDialogOpen, setManageDialogOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [correctiveDialogOpen, setCorrectiveDialogOpen] = useState(false);
  const [selectedRitual, setSelectedRitual] = useState<Ritual | null>(null);
  const [correctiveActions, setCorrectiveActions] = useState<CorrectiveAction[]>([
    { id: 1, action: "Enviar pesquisa de engajamento ao time", responsible: "Ana Silva", deadline: "Em 2 dias", status: "pending" },
    { id: 2, action: "Agendar reunião com gestor do departamento", responsible: "Carlos Santos", deadline: "Amanhã", status: "in_progress" },
    { id: 3, action: "Revisar formato do ritual", responsible: "Maria Costa", deadline: "Esta semana", status: "pending" },
  ]);

  const [newRitual, setNewRitual] = useState({
    name: "",
    frequency: "",
    department: "",
    participants: "",
    category: "",
    description: ""
  });

  const [newAction, setNewAction] = useState({
    action: "",
    responsible: "",
    deadline: ""
  });

  const totalRituals = rituals.length;
  const activeRituals = rituals.filter(r => r.status === 'active').length;
  const avgSuccessRate = rituals.reduce((acc, r) => acc + r.successRate, 0) / rituals.length;
  const totalParticipants = rituals.reduce((acc, r) => acc + r.participants, 0);
  const alertRitual = rituals.find(r => r.status === 'alert');

  const handleCreateRitual = () => {
    if (!newRitual.name || !newRitual.frequency || !newRitual.department) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const ritual: Ritual = {
      id: rituals.length + 1,
      name: newRitual.name,
      frequency: newRitual.frequency,
      department: newRitual.department,
      participants: parseInt(newRitual.participants) || 0,
      category: newRitual.category,
      description: newRitual.description,
      successRate: 100,
      nextDate: "A agendar",
      status: "scheduled"
    };

    setRituals([...rituals, ritual]);
    setCreateDialogOpen(false);
    setNewRitual({ name: "", frequency: "", department: "", participants: "", category: "", description: "" });
    
    toast({
      title: "Ritual criado!",
      description: `${ritual.name} foi adicionado com sucesso.`
    });
  };

  const handleUpdateRitual = () => {
    if (!selectedRitual) return;

    const updatedRituals = rituals.map(r => 
      r.id === selectedRitual.id ? selectedRitual : r
    );
    
    setRituals(updatedRituals);
    setManageDialogOpen(false);
    
    toast({
      title: "Ritual atualizado!",
      description: `${selectedRitual.name} foi atualizado com sucesso.`
    });
  };

  const handleDeleteRitual = (id: number) => {
    setRituals(rituals.filter(r => r.id !== id));
    setManageDialogOpen(false);
    
    toast({
      title: "Ritual removido",
      description: "O ritual foi excluído com sucesso."
    });
  };

  const handleAddCorrectiveAction = () => {
    if (!newAction.action || !newAction.responsible) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive"
      });
      return;
    }

    const action: CorrectiveAction = {
      id: correctiveActions.length + 1,
      action: newAction.action,
      responsible: newAction.responsible,
      deadline: newAction.deadline,
      status: "pending"
    };

    setCorrectiveActions([...correctiveActions, action]);
    setNewAction({ action: "", responsible: "", deadline: "" });
    
    toast({
      title: "Ação adicionada!",
      description: "Ação corretiva criada com sucesso."
    });
  };

  const handleUpdateActionStatus = (id: number, status: CorrectiveAction['status']) => {
    setCorrectiveActions(correctiveActions.map(a =>
      a.id === id ? { ...a, status } : a
    ));
  };

  const openManageDialog = (ritual: Ritual) => {
    setSelectedRitual(ritual);
    setManageDialogOpen(true);
  };

  const openAlertDetails = () => {
    if (alertRitual) {
      setSelectedRitual(alertRitual);
      setAlertDialogOpen(true);
    }
  };

  const openCorrectiveActions = () => {
    setAlertDialogOpen(false);
    setCorrectiveDialogOpen(true);
  };

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
                  Culture-as-a-Service
                </h1>
                <p className="text-muted-foreground">Construtor de Rituais Automatizados</p>
              </div>
              <Button size="lg" className="gap-2 shadow-lg" onClick={() => setCreateDialogOpen(true)}>
                <Plus className="h-5 w-5" />
                Criar Novo Ritual
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
                <CardTitle className="text-sm font-medium text-muted-foreground">Rituais Totais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-primary">{totalRituals}</p>
                  <Calendar className="h-8 w-8 text-primary/40" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all border-green-200 bg-green-50/50 dark:bg-green-950/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-green-600 dark:text-green-400">
                  Rituais Ativos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{activeRituals}</p>
                  <CheckCircle className="h-8 w-8 text-green-600/40" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Sucesso Média</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-primary">{avgSuccessRate.toFixed(0)}%</p>
                  <TrendingUp className="h-8 w-8 text-primary/40" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Participantes Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-primary">{totalParticipants}</p>
                  <Users className="h-8 w-8 text-primary/40" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerta de Falha Cultural */}
          {alertRitual && (
            <Card className="border-orange-500/50 bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/50 dark:to-orange-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                  <AlertTriangle className="h-6 w-6" />
                  Alerta: Falha em Ritual Cultural
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  O <strong>"{alertRitual.name}"</strong> no departamento <strong>{alertRitual.department}</strong> está com apenas <strong>{alertRitual.successRate}% de taxa de sucesso</strong>.
                  A IA recomenda intervenção imediata para evitar impacto no engajamento.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" className="gap-2" onClick={openAlertDetails}>
                    Ver Detalhes
                  </Button>
                  <Button className="gap-2" onClick={openCorrectiveActions}>
                    Ações Corretivas
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Rituais Culturais */}
          <div
            ref={ritualsRef}
            className={`transition-all duration-700 delay-200 ${
              ritualsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              Rituais Configurados
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {rituals.map((ritual) => (
                <Card 
                  key={ritual.id} 
                  className={`hover:shadow-lg transition-all hover:-translate-y-1 ${
                    ritual.status === 'alert' ? 'border-orange-300 bg-orange-50/30 dark:bg-orange-950/10' : ''
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{ritual.name}</CardTitle>
                      <Badge 
                        variant={
                          ritual.status === 'active' ? 'default' : 
                          ritual.status === 'alert' ? 'destructive' : 
                          'secondary'
                        }
                        className="gap-1"
                      >
                        {ritual.status === 'active' && <CheckCircle className="h-3 w-3" />}
                        {ritual.status === 'alert' && <AlertTriangle className="h-3 w-3" />}
                        {ritual.status === 'scheduled' && <Clock className="h-3 w-3" />}
                        {ritual.status === 'active' ? 'Ativo' : ritual.status === 'alert' ? 'Atenção' : 'Agendado'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Frequência</p>
                        <p className="font-medium">{ritual.frequency}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Departamento</p>
                        <p className="font-medium">{ritual.department}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Taxa de Sucesso</span>
                        <span className={`font-semibold ${
                          ritual.successRate >= 80 ? 'text-green-600' : 
                          ritual.successRate >= 60 ? 'text-orange-600' : 
                          'text-red-600'
                        }`}>
                          {ritual.successRate}%
                        </span>
                      </div>
                      <Progress 
                        value={ritual.successRate} 
                        className={`h-2 ${
                          ritual.successRate >= 80 ? '[&>div]:bg-green-600' : 
                          ritual.successRate >= 60 ? '[&>div]:bg-orange-600' : 
                          '[&>div]:bg-red-600'
                        }`}
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="space-y-1 text-sm">
                        <p className="text-muted-foreground">Participantes</p>
                        <p className="font-semibold flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {ritual.participants} pessoas
                        </p>
                      </div>
                      <div className="space-y-1 text-sm text-right">
                        <p className="text-muted-foreground">Próximo</p>
                        <p className="font-semibold text-primary">{ritual.nextDate}</p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full gap-2" onClick={() => openManageDialog(ritual)}>
                      <Edit className="h-4 w-4" />
                      Gerenciar Ritual
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Impacto Medido */}
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-600" />
                Impacto Medido dos Rituais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-600 mb-2">+42%</p>
                  <p className="text-sm text-muted-foreground">Aumento no Engajamento</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600 mb-2">-28%</p>
                  <p className="text-sm text-muted-foreground">Redução no Risco de Turnover</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary mb-2">+35%</p>
                  <p className="text-sm text-muted-foreground">Melhoria na Comunicação</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog: Criar Ritual */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Criar Novo Ritual Cultural</DialogTitle>
            <DialogDescription>
              Configure um novo ritual automatizado para fortalecer a cultura da sua empresa
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Ritual *</Label>
              <Input
                id="name"
                placeholder="Ex: Weekly Team Sync"
                value={newRitual.name}
                onChange={(e) => setNewRitual({ ...newRitual, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequência *</Label>
                <Select value={newRitual.frequency} onValueChange={(value) => setNewRitual({ ...newRitual, frequency: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Diária">Diária</SelectItem>
                    <SelectItem value="Semanal">Semanal</SelectItem>
                    <SelectItem value="Quinzenal">Quinzenal</SelectItem>
                    <SelectItem value="Mensal">Mensal</SelectItem>
                    <SelectItem value="Trimestral">Trimestral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Departamento *</Label>
                <Select value={newRitual.department} onValueChange={(value) => setNewRitual({ ...newRitual, department: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="Comercial">Comercial</SelectItem>
                    <SelectItem value="Operações">Operações</SelectItem>
                    <SelectItem value="Liderança">Liderança</SelectItem>
                    <SelectItem value="Toda empresa">Toda empresa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select value={newRitual.category} onValueChange={(value) => setNewRitual({ ...newRitual, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Comunicação">Comunicação</SelectItem>
                    <SelectItem value="Desenvolvimento">Desenvolvimento</SelectItem>
                    <SelectItem value="Engajamento">Engajamento</SelectItem>
                    <SelectItem value="Reconhecimento">Reconhecimento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="participants">Nº de Participantes</Label>
                <Input
                  id="participants"
                  type="number"
                  placeholder="Ex: 10"
                  value={newRitual.participants}
                  onChange={(e) => setNewRitual({ ...newRitual, participants: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descreva o objetivo e formato do ritual..."
                value={newRitual.description}
                onChange={(e) => setNewRitual({ ...newRitual, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateRitual}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Ritual
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog: Gerenciar Ritual */}
      <Dialog open={manageDialogOpen} onOpenChange={setManageDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Gerenciar Ritual</DialogTitle>
            <DialogDescription>
              Edite as configurações do ritual ou remova-o se necessário
            </DialogDescription>
          </DialogHeader>
          {selectedRitual && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nome do Ritual</Label>
                <Input
                  id="edit-name"
                  value={selectedRitual.name}
                  onChange={(e) => setSelectedRitual({ ...selectedRitual, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-frequency">Frequência</Label>
                  <Input
                    id="edit-frequency"
                    value={selectedRitual.frequency}
                    onChange={(e) => setSelectedRitual({ ...selectedRitual, frequency: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-department">Departamento</Label>
                  <Input
                    id="edit-department"
                    value={selectedRitual.department}
                    onChange={(e) => setSelectedRitual({ ...selectedRitual, department: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-participants">Participantes</Label>
                  <Input
                    id="edit-participants"
                    type="number"
                    value={selectedRitual.participants}
                    onChange={(e) => setSelectedRitual({ ...selectedRitual, participants: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-success">Taxa de Sucesso</Label>
                  <Input
                    id="edit-success"
                    type="number"
                    value={selectedRitual.successRate}
                    onChange={(e) => setSelectedRitual({ ...selectedRitual, successRate: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Descrição</Label>
                <Textarea
                  id="edit-description"
                  value={selectedRitual.description || ""}
                  onChange={(e) => setSelectedRitual({ ...selectedRitual, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                <Badge variant={selectedRitual.status === 'active' ? 'default' : selectedRitual.status === 'alert' ? 'destructive' : 'secondary'}>
                  {selectedRitual.status === 'active' ? 'Ativo' : selectedRitual.status === 'alert' ? 'Atenção' : 'Agendado'}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Próximo: {selectedRitual.nextDate}
                </span>
              </div>
            </div>
          )}
          <div className="flex justify-between">
            <Button variant="destructive" onClick={() => selectedRitual && handleDeleteRitual(selectedRitual.id)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir Ritual
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setManageDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleUpdateRitual}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog: Detalhes do Alerta */}
      <Dialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="h-6 w-6" />
              Detalhes do Alerta
            </DialogTitle>
          </DialogHeader>
          {selectedRitual && (
            <div className="space-y-4 py-4">
              <Card className="border-orange-200 bg-orange-50/50 dark:bg-orange-950/20">
                <CardHeader>
                  <CardTitle className="text-lg">{selectedRitual.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Departamento</p>
                      <p className="font-semibold">{selectedRitual.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Frequência</p>
                      <p className="font-semibold">{selectedRitual.frequency}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Participantes</p>
                      <p className="font-semibold">{selectedRitual.participants} pessoas</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Taxa de Sucesso</p>
                      <p className="font-semibold text-orange-600">{selectedRitual.successRate}%</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Análise da IA:</p>
                    <div className="bg-background p-4 rounded-lg border space-y-2">
                      <p className="text-sm">• Baixa participação nas últimas 3 ocorrências</p>
                      <p className="text-sm">• Feedback indica falta de relevância percebida</p>
                      <p className="text-sm">• Horário pode estar conflitando com outras prioridades</p>
                      <p className="text-sm">• Recomendação: Revisar formato e envolver participantes no redesign</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setAlertDialogOpen(false)}>
                  Fechar
                </Button>
                <Button onClick={openCorrectiveActions}>
                  <Target className="h-4 w-4 mr-2" />
                  Ver Ações Corretivas
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog: Ações Corretivas */}
      <Dialog open={correctiveDialogOpen} onOpenChange={setCorrectiveDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Ações Corretivas
            </DialogTitle>
            <DialogDescription>
              Gerencie ações para melhorar a taxa de sucesso do ritual
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Adicionar Nova Ação */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Nova Ação Corretiva</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="action">Ação</Label>
                  <Textarea
                    id="action"
                    placeholder="Descreva a ação corretiva..."
                    value={newAction.action}
                    onChange={(e) => setNewAction({ ...newAction, action: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="responsible">Responsável</Label>
                    <Input
                      id="responsible"
                      placeholder="Nome do responsável"
                      value={newAction.responsible}
                      onChange={(e) => setNewAction({ ...newAction, responsible: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Prazo</Label>
                    <Input
                      id="deadline"
                      placeholder="Ex: Em 3 dias"
                      value={newAction.deadline}
                      onChange={(e) => setNewAction({ ...newAction, deadline: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={handleAddCorrectiveAction} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Ação
                </Button>
              </CardContent>
            </Card>

            {/* Lista de Ações */}
            <div className="space-y-3">
              <h3 className="font-semibold">Ações em Andamento</h3>
              {correctiveActions.map((action) => (
                <Card key={action.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm font-medium">{action.action}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>👤 {action.responsible}</span>
                          <span>⏰ {action.deadline}</span>
                        </div>
                      </div>
                      <Select
                        value={action.status}
                        onValueChange={(value) => handleUpdateActionStatus(action.id, value as CorrectiveAction['status'])}
                      >
                        <SelectTrigger className="w-36">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="in_progress">Em Progresso</SelectItem>
                          <SelectItem value="completed">Concluída</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setCorrectiveDialogOpen(false)}>
              Fechar
            </Button>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Notificar Responsáveis
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default DashboardRHCaaS;