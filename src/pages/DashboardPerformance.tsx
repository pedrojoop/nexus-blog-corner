import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Plus, RefreshCw, AlertCircle, Target } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Lucas Mendes",
    initials: "LM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
    nextMeeting: "Hoje, 14:00",
    status: "active" as const,
  },
  {
    id: 2,
    name: "Ana Silva",
    initials: "AS",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    nextMeeting: "12 Mar, 10:00",
    status: "upcoming" as const,
  },
  {
    id: 3,
    name: "Carlos Dev",
    initials: "CD",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    nextMeeting: "Atrasada 2 dias",
    status: "overdue" as const,
  },
];

const agendaItems = [
  { id: 1, text: "Feedback sobre o projeto de reestruturação", checked: true, addedBy: "Pedro" },
  { id: 2, text: "Dúvidas sobre o novo plano de carreira", checked: false, addedBy: "Lucas" },
];

const okrs = [
  { id: 1, title: "Entregar V2 do App", progress: 75, color: "bg-emerald-500" },
  { id: 2, title: "Reduzir bugs em 20%", progress: 40, color: "bg-amber-500" },
];

const actionItems = [
  { id: 1, text: "Lucas: Enviar relatório final até sexta", done: false },
  { id: 2, text: "Pedro: Agendar revisão com stakeholders", done: false },
];

const DashboardPerformance = () => {
  const [selectedMember, setSelectedMember] = useState(1);
  const [agenda, setAgenda] = useState(agendaItems);
  const [newTopic, setNewTopic] = useState("");
  const [actions, setActions] = useState(actionItems);
  const [newAction, setNewAction] = useState("");

  const handleAddTopic = () => {
    if (!newTopic.trim()) return;
    setAgenda(prev => [...prev, { id: Date.now(), text: newTopic, checked: false, addedBy: "Pedro" }]);
    setNewTopic("");
  };

  const handleAddAction = () => {
    if (!newAction.trim()) return;
    setActions(prev => [...prev, { id: Date.now(), text: newAction, done: false }]);
    setNewAction("");
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Target className="h-8 w-8 text-primary" />
            Performance & 1:1s
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie alinhamentos, calendário de feedbacks e metas do trimestre.
          </p>
        </div>
        <Button className="gap-2">
          <CalendarDays className="h-4 w-4" />
          + Agendar Nova 1:1
        </Button>
      </div>

      {/* Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Team Roster */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Meu Time & Calendário</CardTitle>
              <CardDescription>Próximas reuniões 1:1</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {teamMembers.map((member) => (
                <button
                  key={member.id}
                  onClick={() => setSelectedMember(member.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
                    selectedMember === member.id
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {member.status === "overdue" ? (
                        <>
                          <AlertCircle className="h-3.5 w-3.5 text-destructive" />
                          <span className="text-xs text-destructive font-medium">{member.nextMeeting}</span>
                        </>
                      ) : member.status === "active" ? (
                        <>
                          <div className="h-2 w-2 rounded-full bg-emerald-500" />
                          <span className="text-xs text-emerald-600 font-medium">{member.nextMeeting}</span>
                        </>
                      ) : (
                        <span className="text-xs text-muted-foreground">{member.nextMeeting}</span>
                      )}
                    </div>
                  </div>
                </button>
              ))}

              <div className="pt-4">
                <Button variant="outline" size="sm" className="w-full gap-2 text-muted-foreground">
                  <RefreshCw className="h-3.5 w-3.5" />
                  Sincronizar com Google/Outlook Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Column 2: 1:1 Workspace */}
        <div className="lg:col-span-2 space-y-6">
          {/* Workspace Header */}
          <div className="bg-muted/30 rounded-lg border border-border px-5 py-4">
            <h2 className="text-lg font-semibold text-foreground">
              1:1: Lucas Mendes & Pedro Lima
            </h2>
            <p className="text-sm text-muted-foreground">09 Março 2026</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card A: Shared Agenda */}
            <Card className="md:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">📋 Pauta Conjunta</CardTitle>
                <CardDescription>Tópicos adicionados por ambos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {agenda.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 group">
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={(checked) =>
                        setAgenda(prev =>
                          prev.map(a => a.id === item.id ? { ...a, checked: !!checked } : a)
                        )
                      }
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <span className={`text-sm ${item.checked ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {item.text}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        (Adicionado por {item.addedBy})
                      </span>
                    </div>
                  </div>
                ))}
                <div className="flex gap-2 pt-2">
                  <Input
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    placeholder="+ Adicionar tópico na pauta..."
                    className="text-sm"
                    onKeyDown={(e) => e.key === "Enter" && handleAddTopic()}
                  />
                  <Button size="sm" variant="outline" onClick={handleAddTopic}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Card B: OKRs */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">🎯 Metas do Trimestre</CardTitle>
                <CardDescription>Acompanhamento de objetivos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {okrs.map((okr) => (
                  <div key={okr.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{okr.title}</span>
                      <span className="text-xs font-semibold text-muted-foreground">{okr.progress}%</span>
                    </div>
                    <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className={`h-full rounded-full transition-all ${okr.color}`}
                        style={{ width: `${okr.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-2">
                  Atualizar Metas
                </Button>
              </CardContent>
            </Card>

            {/* Card C: Action Items */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">✅ Combinados & Plano de Ação</CardTitle>
                <CardDescription>O que ficou decidido nesta reunião</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {actions.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <Checkbox
                      checked={item.done}
                      onCheckedChange={(checked) =>
                        setActions(prev =>
                          prev.map(a => a.id === item.id ? { ...a, done: !!checked } : a)
                        )
                      }
                      className="mt-0.5"
                    />
                    <span className={`text-sm ${item.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
                <div className="flex gap-2 pt-2">
                  <Input
                    value={newAction}
                    onChange={(e) => setNewAction(e.target.value)}
                    placeholder="Adicionar nova ação..."
                    className="text-sm"
                    onKeyDown={(e) => e.key === "Enter" && handleAddAction()}
                  />
                  <Button size="sm" variant="outline" onClick={handleAddAction}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPerformance;
