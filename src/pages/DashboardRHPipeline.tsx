import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Sparkles, ChevronDown, Star, Mail, Phone, CheckCircle2, Clock,
  AlertCircle, FileText, Send, Calendar, Brain, Trophy, Zap,
  User, XCircle, ArrowRight, Shield, Eye, Upload, MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from "recharts";

const radarData = [
  { subject: "React", A: 95 },
  { subject: "TypeScript", A: 90 },
  { subject: "Node.js", A: 75 },
  { subject: "Liderança", A: 80 },
  { subject: "Comunicação", A: 85 },
  { subject: "Fit Cultural", A: 92 },
];

const pipelineGroups = [
  {
    label: "Triagem IA",
    count: 45,
    defaultOpen: false,
    candidates: [
      { id: "t1", name: "Ana Beatriz Costa", match: 94, time: "Há 1h", avatar: "Ana" },
      { id: "t2", name: "Carlos Eduardo Mendes", match: 91, time: "Há 3h", avatar: "Carlos" },
      { id: "t3", name: "Fernanda Oliveira", match: 88, time: "Há 5h", avatar: "Fernanda" },
    ],
  },
  {
    label: "Entrevistas",
    count: 8,
    defaultOpen: false,
    candidates: [
      { id: "e1", name: "Rafael Souza", match: 90, time: "Há 1d", avatar: "Rafael" },
      { id: "e2", name: "Juliana Martins", match: 87, time: "Há 2d", avatar: "Juliana" },
    ],
  },
  {
    label: "Fase de Proposta",
    count: 1,
    defaultOpen: true,
    candidates: [
      { id: "p1", name: "Lucas Silva", match: 98, time: "Há 2h", avatar: "Lucas" },
    ],
  },
  {
    label: "Admissão & Onboarding",
    count: 2,
    defaultOpen: true,
    candidates: [
      { id: "a1", name: "Mariana Alves", match: 95, time: "Há 4h", avatar: "Mariana" },
      { id: "a2", name: "Pedro Henrique Lima", match: 93, time: "Há 6h", avatar: "PedroH" },
    ],
  },
];

const journeySteps = [
  { label: "Inscrito", done: true },
  { label: "Triado por IA", done: true },
  { label: "Entrevistado", done: true },
  { label: "Proposta", done: true, current: true },
  { label: "Admitido", done: false, current: true },
  { label: "Em Onboarding", done: false },
];

const interviews = [
  { type: "Entrevista RH", interviewer: "Ana Paula (HRBP)", date: "02/04/2026", nota: 9.2, status: "Aprovado" },
  { type: "Entrevista Técnica", interviewer: "Diego Martins (Tech Lead)", date: "05/04/2026", nota: 9.5, status: "Aprovado" },
  { type: "Desafio Técnico", interviewer: "CTO - Ricardo Almeida", date: "Amanhã 14:00", nota: null, status: "Agendado" },
];

const documents = [
  { name: "CNH / RG", status: "validated", label: "Validado pela IA" },
  { name: "Comprovante de Residência", status: "validated", label: "Validado pela IA" },
  { name: "Exame Admissional (ASO)", status: "pending", label: "Pendente" },
  { name: "Certificado de Reservista", status: "validated", label: "Validado pela IA" },
  { name: "Carteira de Trabalho Digital", status: "pending", label: "Pendente" },
];

const onboardingChecklist = [
  { day: "Dia 1", task: "Integração de Cultura — Welcome Kit + Tour Virtual", xp: 50, done: false },
  { day: "Dia 3", task: "Acesso ao GitHub, Slack e Ferramentas Internas", xp: 30, done: false },
  { day: "Dia 7", task: "Curso Obrigatório: Segurança da Informação (LMS)", xp: 80, done: false },
  { day: "Dia 14", task: "1:1 com o Gestor Direto", xp: 40, done: false },
  { day: "Dia 30", task: "Pesquisa de Pulso (eNPS) sobre o Onboarding", xp: 100, done: false },
];

const DashboardRHPipeline = () => {
  const [selectedCandidate, setSelectedCandidate] = useState("p1");
  const [activeTab, setActiveTab] = useState("admissao");
  const [autoOnboarding, setAutoOnboarding] = useState(true);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Pipeline de Talentos</h1>
            <p className="text-sm text-muted-foreground">ATS + Admissão Digital + Onboarding — Tudo em uma tela.</p>
          </div>
          <Badge className="bg-[#4f46e5]/10 text-[#4f46e5] border-[#4f46e5]/20 gap-1.5 px-3 py-1.5 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" /> AI Pipeline Ativo
          </Badge>
        </div>

        {/* Master-Detail Layout */}
        <div className="flex gap-4 h-[calc(100vh-11rem)]">
          {/* Master - Left Panel */}
          <Card className="w-[30%] flex flex-col hover:shadow-sm hover:translate-y-0">
            <CardHeader className="pb-3 pt-4 px-4 space-y-2">
              <Select defaultValue="frontend-sr">
                <SelectTrigger className="w-full text-sm">
                  <SelectValue placeholder="Selecione a vaga" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend-sr">Desenvolvedor Front-end Sênior</SelectItem>
                  <SelectItem value="backend-pl">Desenvolvedor Back-end Pleno</SelectItem>
                  <SelectItem value="design-sr">Product Designer Sênior</SelectItem>
                  <SelectItem value="pm-sr">Product Manager Sênior</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="secondary" className="text-[10px]">56 candidatos</Badge>
                <span>•</span>
                <span>Aberta há 12 dias</span>
              </div>
            </CardHeader>
            <ScrollArea className="flex-1">
              <div className="px-3 pb-3 space-y-1">
                {pipelineGroups.map((group) => (
                  <Collapsible key={group.label} defaultOpen={group.defaultOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors group">
                      <span>{group.label} ({group.count})</span>
                      <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-1 mt-1">
                        {group.candidates.map((c) => {
                          const isActive = c.id === selectedCandidate;
                          return (
                            <button
                              key={c.id}
                              onClick={() => setSelectedCandidate(c.id)}
                              className={cn(
                                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150",
                                isActive
                                  ? "bg-[#4f46e5]/5 border border-[#4f46e5]/20 shadow-sm"
                                  : "hover:bg-muted/50 border border-transparent"
                              )}
                            >
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.avatar}`} />
                                <AvatarFallback className="text-xs">{c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className={cn("text-sm truncate", isActive ? "font-semibold text-foreground" : "text-foreground/80")}>{c.name}</p>
                                <p className="text-[11px] text-muted-foreground">{c.time}</p>
                              </div>
                              <Badge className={cn(
                                "text-[10px] px-1.5 py-0.5 font-bold gap-0.5 shrink-0",
                                c.match >= 95
                                  ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                  : c.match >= 85
                                  ? "bg-blue-100 text-blue-700 border-blue-200"
                                  : "bg-muted text-muted-foreground"
                              )}>
                                <Star className="h-2.5 w-2.5" /> {c.match}%
                              </Badge>
                            </button>
                          );
                        })}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Detail - Right Panel */}
          <Card className="flex-1 flex flex-col hover:shadow-sm hover:translate-y-0 overflow-hidden">
            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                {/* Profile Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-2 border-[#4f46e5]/20">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas" />
                      <AvatarFallback className="text-lg font-bold">LS</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Lucas Silva</h2>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> lucas.silva@email.com</span>
                        <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> (11) 98765-4321</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-[10px] gap-0.5 font-bold">
                          <Star className="h-3 w-3" /> 98% Fit Cultural
                        </Badge>
                        <Badge className="bg-[#4f46e5]/10 text-[#4f46e5] border-[#4f46e5]/20 text-[10px]">
                          Dev Front-end Sênior
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/5">
                      <XCircle className="h-4 w-4 mr-1" /> Rejeitar
                    </Button>
                    <Button size="sm" className="bg-[#4f46e5] hover:bg-[#4338ca]">
                      <ArrowRight className="h-4 w-4 mr-1" /> Mover de Fase
                    </Button>
                  </div>
                </div>

                {/* Journey Stepper */}
                <div className="flex items-center gap-1">
                  {journeySteps.map((step, i) => {
                    const isTransition = step.current;
                    return (
                      <div key={step.label} className="flex items-center flex-1">
                        <div className="flex flex-col items-center flex-1">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all",
                            step.done && !step.current
                              ? "bg-[#4f46e5] border-[#4f46e5] text-white"
                              : isTransition
                              ? "bg-[#4f46e5]/10 border-[#4f46e5] text-[#4f46e5] ring-4 ring-[#4f46e5]/10"
                              : "bg-muted border-border text-muted-foreground"
                          )}>
                            {step.done && !step.current ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                          </div>
                          <span className={cn(
                            "text-[10px] mt-1 text-center leading-tight",
                            step.done || isTransition ? "text-[#4f46e5] font-semibold" : "text-muted-foreground"
                          )}>{step.label}</span>
                        </div>
                        {i < journeySteps.length - 1 && (
                          <div className={cn(
                            "h-0.5 flex-1 -mt-4 mx-1",
                            step.done ? "bg-[#4f46e5]" : "bg-border"
                          )} />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full grid grid-cols-4 h-10">
                    <TabsTrigger value="ia" className="text-xs gap-1"><Brain className="h-3.5 w-3.5" /> Análise de IA</TabsTrigger>
                    <TabsTrigger value="entrevistas" className="text-xs gap-1"><MessageSquare className="h-3.5 w-3.5" /> Entrevistas</TabsTrigger>
                    <TabsTrigger value="admissao" className="text-xs gap-1"><FileText className="h-3.5 w-3.5" /> Admissão Digital</TabsTrigger>
                    <TabsTrigger value="onboarding" className="text-xs gap-1"><Trophy className="h-3.5 w-3.5" /> Onboarding</TabsTrigger>
                  </TabsList>

                  {/* Tab 1: AI Analysis */}
                  <TabsContent value="ia" className="space-y-4 mt-4">
                    <Card className="hover:shadow-sm hover:translate-y-0 border-[#4f46e5]/10 bg-[#4f46e5]/[0.02]">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-[#4f46e5]" /> Resumo Executivo da IA
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Lucas tem <span className="font-semibold text-foreground">8 anos de experiência com React</span> e forte fit cultural baseado em suas passagens por startups anteriores. Seu perfil demonstra consistência em projetos de alta complexidade, com destaque para arquitetura de design systems e liderança técnica. A IA identificou <span className="font-semibold text-foreground">92% de compatibilidade</span> com os valores e práticas do time de Engenharia.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="hover:shadow-sm hover:translate-y-0">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Match de Habilidades</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                              <PolarGrid stroke="hsl(var(--border))" />
                              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                              <Radar name="Lucas" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.15} strokeWidth={2} />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Tab 2: Interviews */}
                  <TabsContent value="entrevistas" className="space-y-4 mt-4">
                    <Card className="hover:shadow-sm hover:translate-y-0">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Scorecard de Entrevistas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b text-left text-muted-foreground">
                                <th className="pb-2 font-medium">Tipo</th>
                                <th className="pb-2 font-medium">Entrevistador</th>
                                <th className="pb-2 font-medium">Data</th>
                                <th className="pb-2 font-medium">Nota</th>
                                <th className="pb-2 font-medium">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {interviews.map((iv, i) => (
                                <tr key={i} className="border-b last:border-0">
                                  <td className="py-3 font-medium">{iv.type}</td>
                                  <td className="py-3 text-muted-foreground">{iv.interviewer}</td>
                                  <td className="py-3 text-muted-foreground">{iv.date}</td>
                                  <td className="py-3">{iv.nota ? <span className="font-bold text-[#4f46e5]">{iv.nota}</span> : "—"}</td>
                                  <td className="py-3">
                                    <Badge className={cn(
                                      "text-[10px]",
                                      iv.status === "Aprovado" ? "bg-emerald-100 text-emerald-700" :
                                      "bg-amber-100 text-amber-700"
                                    )}>{iv.status}</Badge>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="hover:shadow-sm hover:translate-y-0 border-amber-200 bg-amber-50/50 dark:bg-amber-950/10 dark:border-amber-900/30">
                      <CardContent className="flex items-center gap-3 py-4">
                        <Calendar className="h-5 w-5 text-amber-600" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">Próximo: Revisão de Desafio Técnico com CTO</p>
                          <p className="text-xs text-muted-foreground">Amanhã, 14:00 — Ricardo Almeida • Google Meet</p>
                        </div>
                        <Button size="sm" variant="outline" className="ml-auto text-xs">Ver no Calendário</Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Tab 3: Admissão Digital */}
                  <TabsContent value="admissao" className="space-y-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">Coleta de Documentos (OCR Inteligente)</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">3 de 5 documentos validados automaticamente pela IA</p>
                      </div>
                      <Badge className="bg-[#4f46e5]/10 text-[#4f46e5] text-[10px] gap-1">
                        <Eye className="h-3 w-3" /> OCR Ativo
                      </Badge>
                    </div>
                    <Progress value={60} className="h-2" />
                    <div className="space-y-2">
                      {documents.map((doc, i) => (
                        <Card key={i} className="hover:shadow-sm hover:translate-y-0">
                          <CardContent className="flex items-center gap-3 py-3 px-4">
                            <div className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center",
                              doc.status === "validated" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                            )}>
                              {doc.status === "validated" ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{doc.name}</p>
                            </div>
                            <Badge className={cn(
                              "text-[10px] gap-1",
                              doc.status === "validated"
                                ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                : "bg-amber-100 text-amber-700 border-amber-200"
                            )}>
                              {doc.status === "validated" ? <Shield className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                              {doc.label}
                            </Badge>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Send className="h-3.5 w-3.5" /> Reenviar lembrete via WhatsApp
                    </Button>
                  </TabsContent>

                  {/* Tab 4: Onboarding */}
                  <TabsContent value="onboarding" className="space-y-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold">Trilha dos Primeiros 30 Dias</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">Template: Engenharia de Software — 300 XP total</p>
                      </div>
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-[10px] gap-1 font-bold">
                        <Trophy className="h-3 w-3" /> Gamificado
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {onboardingChecklist.map((item, i) => (
                        <Card key={i} className="hover:shadow-sm hover:translate-y-0">
                          <CardContent className="flex items-center gap-3 py-3 px-4">
                            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                              <span className="text-[10px] font-bold text-muted-foreground">{i + 1}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{item.day}: {item.task}</p>
                            </div>
                            <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-[10px] font-bold gap-0.5 shrink-0">
                              <Zap className="h-3 w-3" /> +{item.xp} XP
                            </Badge>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <Card className="hover:shadow-sm hover:translate-y-0 border-[#4f46e5]/10 bg-[#4f46e5]/[0.02]">
                      <CardContent className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-3">
                          <Zap className="h-5 w-5 text-[#4f46e5]" />
                          <div>
                            <p className="text-sm font-semibold">Auto-iniciar Onboarding no Dia 1</p>
                            <p className="text-xs text-muted-foreground">A trilha será ativada automaticamente na data de admissão</p>
                          </div>
                        </div>
                        <Switch checked={autoOnboarding} onCheckedChange={setAutoOnboarding} />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardRHPipeline;
