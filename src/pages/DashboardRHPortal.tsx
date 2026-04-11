import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sparkles, Copy, PlusCircle, MapPin, Clock, Briefcase, DollarSign,
  Globe, Upload, Linkedin, FileText, ExternalLink, Building2, Users,
  Zap, CheckCircle2, ChevronRight
} from "lucide-react";
import { useState } from "react";

const DashboardRHPortal = () => {
  const [aiGenerated, setAiGenerated] = useState(false);

  const handleGenerate = () => setAiGenerated(true);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Portal de Carreiras e Publicação</h1>
            <p className="text-muted-foreground">Atraia talentos com uma página exclusiva e crie vagas em segundos com IA.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Copy className="h-4 w-4" /> Copiar Link do Portal
            </Button>
            <Button className="gap-2 bg-[hsl(243,75%,59%)] hover:bg-[hsl(243,75%,50%)] text-white">
              <PlusCircle className="h-4 w-4" /> Publicar Vaga
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="criar" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="criar" className="gap-2 data-[state=active]:bg-background">
              <Sparkles className="h-4 w-4" /> 1. Criar Vaga com IA
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2 data-[state=active]:bg-background">
              <Globe className="h-4 w-4" /> 2. Preview do Portal (Visão do Candidato)
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Criar Vaga com IA */}
          <TabsContent value="criar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="hover:shadow-lg hover:-translate-y-0 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-[hsl(243,75%,59%)]" />
                      Informações da Vaga
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="cargo">Cargo da Vaga</Label>
                      <Input id="cargo" placeholder="Ex: Desenvolvedor Front-end Sênior" defaultValue="Desenvolvedor Front-end Sênior" />
                    </div>

                    <Button
                      onClick={handleGenerate}
                      className="w-full gap-2 bg-gradient-to-r from-[hsl(243,75%,59%)] to-[hsl(270,70%,60%)] hover:from-[hsl(243,75%,50%)] hover:to-[hsl(270,70%,50%)] text-white h-12 text-base font-semibold"
                    >
                      <Sparkles className="h-5 w-5" />
                      ✨ Gerar Descrição e Requisitos com Nexus Brain
                    </Button>

                    {aiGenerated && (
                      <div className="rounded-lg border border-[hsl(243,75%,59%)]/20 bg-[hsl(243,75%,97%)] dark:bg-[hsl(243,75%,59%)]/5 p-3 flex items-center gap-2 text-sm text-[hsl(243,75%,59%)]">
                        <Zap className="h-4 w-4" />
                        <span className="font-medium">IA preencheu automaticamente os campos abaixo com base no cargo informado.</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Departamento</Label>
                        <Select defaultValue="tech">
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tech">Tecnologia</SelectItem>
                            <SelectItem value="mkt">Marketing</SelectItem>
                            <SelectItem value="rh">Recursos Humanos</SelectItem>
                            <SelectItem value="fin">Financeiro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Modelo de Trabalho</Label>
                        <Select defaultValue="remoto">
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="remoto">Remoto</SelectItem>
                            <SelectItem value="hibrido">Híbrido</SelectItem>
                            <SelectItem value="presencial">Presencial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Faixa Salarial</Label>
                        <Input placeholder="Ex: R$ 12.000 - R$ 18.000" defaultValue="R$ 12.000 - R$ 18.000" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Descrição da Vaga</Label>
                      <Textarea
                        className="min-h-[140px]"
                        defaultValue={aiGenerated ? "Estamos buscando um(a) Desenvolvedor(a) Front-end Sênior apaixonado(a) por criar interfaces modernas, performáticas e acessíveis. Você fará parte de um time multidisciplinar que constrói produtos digitais usados por milhares de pessoas.\n\nNossa stack é baseada em React, TypeScript e Tailwind CSS. Valorizamos código limpo, colaboração assíncrona e ownership dos projetos." : ""}
                        placeholder="Descreva a vaga ou clique no botão acima para gerar automaticamente..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Requisitos Técnicos e Comportamentais</Label>
                      <Textarea
                        className="min-h-[120px]"
                        defaultValue={aiGenerated ? "• 5+ anos de experiência com React e TypeScript\n• Domínio de CSS moderno (Tailwind, CSS Modules)\n• Experiência com testes automatizados (Jest, Cypress)\n• Familiaridade com CI/CD e Git Flow\n• Habilidades de comunicação e trabalho em equipe\n• Mentalidade de produto e foco no usuário final" : ""}
                        placeholder="Liste os requisitos ou deixe a IA gerar para você..."
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Screening Settings */}
                <Card className="hover:shadow-lg hover:-translate-y-0 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="h-5 w-5 text-[hsl(243,75%,59%)]" />
                      Configurações de Triagem Inteligente
                    </CardTitle>
                    <CardDescription>Automatize a triagem e reduza o tempo de contratação em até 70%.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-card">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Ativar Ranqueamento Automático por IA (Match Score)</p>
                        <p className="text-xs text-muted-foreground">A IA analisa cada currículo e atribui uma nota de compatibilidade.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-[hsl(243,75%,59%)]/20 bg-[hsl(243,75%,97%)] dark:bg-[hsl(243,75%,59%)]/5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">Dispensar formulários: Candidatura apenas com PDF do Currículo</p>
                          <Badge className="bg-gradient-to-r from-[hsl(243,75%,59%)] to-[hsl(270,70%,60%)] text-white text-[10px] font-bold border-0">
                            Gupy Killer Feature
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">A IA extrai todas as informações do PDF automaticamente. Zero formulários.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-card">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Adicionar vídeo-apresentação obrigatória (1 min)</p>
                        <p className="text-xs text-muted-foreground">O candidato grava um pitch de 60 segundos sobre si mesmo.</p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-card">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Publicar automaticamente no LinkedIn Jobs</p>
                        <p className="text-xs text-muted-foreground">Sincronize esta vaga com sua conta do LinkedIn Recruiter.</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Side Panel */}
              <div className="space-y-6">
                <Card className="hover:shadow-lg hover:-translate-y-0 border-[hsl(243,75%,59%)]/20 bg-gradient-to-b from-[hsl(243,75%,97%)] to-card dark:from-[hsl(243,75%,59%)]/5">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-[hsl(243,75%,59%)]" />
                      Copiloto de Recrutamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border/50">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Título otimizado</p>
                          <p className="text-xs text-muted-foreground">O cargo está alinhado com as buscas mais comuns do mercado.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border/50">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Linguagem inclusiva</p>
                          <p className="text-xs text-muted-foreground">Nenhum viés de gênero detectado na descrição.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border/50">
                        <Zap className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Salário competitivo</p>
                          <p className="text-xs text-muted-foreground">A faixa está no P75 do mercado. Boa atratividade.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg hover:-translate-y-0 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-base">Prévia da Publicação</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="rounded-lg border border-border/50 p-4 space-y-2 bg-background">
                      <p className="font-semibold text-sm">Desenvolvedor Front-end Sênior</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="gap-1 text-xs"><MapPin className="h-3 w-3" /> Remoto</Badge>
                        <Badge variant="secondary" className="gap-1 text-xs"><Clock className="h-3 w-3" /> CLT</Badge>
                        <Badge variant="secondary" className="gap-1 text-xs"><DollarSign className="h-3 w-3" /> R$ 12-18k</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-3">
                        Estamos buscando um(a) Desenvolvedor(a) Front-end Sênior apaixonado(a) por criar interfaces modernas...
                      </p>
                    </div>
                    <Button variant="outline" className="w-full gap-2 text-sm">
                      <ExternalLink className="h-4 w-4" /> Ver como o candidato vê
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg hover:-translate-y-0 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-base">Canais de Distribuição</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { icon: Globe, label: "Portal de Carreiras", status: "Ativo", active: true },
                      { icon: Linkedin, label: "LinkedIn Jobs", status: "Conectar", active: false },
                      { icon: FileText, label: "Indeed", status: "Conectar", active: false },
                      { icon: Users, label: "Indicação Interna", status: "Ativo", active: true },
                    ].map((ch) => (
                      <div key={ch.label} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="flex items-center gap-2">
                          <ch.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{ch.label}</span>
                        </div>
                        <Badge variant={ch.active ? "default" : "outline"} className={ch.active ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/10" : ""}>
                          {ch.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Tab 2: Preview do Portal */}
          <TabsContent value="preview" className="space-y-6">
            <Card className="hover:shadow-lg hover:-translate-y-0 border-border/50 overflow-hidden">
              {/* Browser Chrome */}
              <div className="bg-muted/50 border-b border-border px-4 py-2 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-background rounded-md px-3 py-1 text-xs text-muted-foreground flex items-center gap-2">
                  <Globe className="h-3 w-3" />
                  carreiras.techcorp.com.br
                </div>
              </div>

              {/* Portal Content */}
              <div className="bg-background">
                {/* Hero Banner */}
                <div className="relative bg-gradient-to-r from-[hsl(243,75%,59%)] to-[hsl(270,70%,55%)] text-white px-8 py-16">
                  <div className="max-w-3xl mx-auto text-center space-y-4">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                        <Building2 className="h-7 w-7 text-white" />
                      </div>
                      <span className="text-2xl font-bold">TechCorp</span>
                    </div>
                    <h2 className="text-3xl font-bold">Venha construir o futuro na TechCorp</h2>
                    <p className="text-white/80 text-lg">Junte-se a um time de +200 pessoas apaixonadas por tecnologia e inovação.</p>
                  </div>
                </div>

                {/* Quick Apply Banner */}
                <div className="bg-[hsl(243,75%,97%)] dark:bg-[hsl(243,75%,59%)]/5 border-b border-[hsl(243,75%,59%)]/10 px-8 py-4">
                  <div className="max-w-3xl mx-auto flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[hsl(243,75%,59%)]/10 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-[hsl(243,75%,59%)]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Na TechCorp, não usamos formulários intermináveis.</p>
                      <p className="text-xs text-muted-foreground">Envie seu currículo em PDF ou link do LinkedIn e nossa IA faz o resto. <span className="font-semibold text-[hsl(243,75%,59%)]">Tempo médio de candidatura: 30 segundos.</span></p>
                    </div>
                  </div>
                </div>

                {/* Job Listings */}
                <div className="max-w-3xl mx-auto px-8 py-8 space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Vagas Abertas ({3})</h3>

                  {[
                    { title: "Desenvolvedor Front-end Sênior", dept: "Tecnologia", location: "Remoto", type: "CLT", salary: "R$ 12-18k", hot: true },
                    { title: "Analista de Marketing", dept: "Marketing", location: "Híbrido - SP", type: "CLT", salary: "R$ 6-9k", hot: false },
                    { title: "Product Designer Pleno", dept: "Design", location: "Remoto", type: "CLT", salary: "R$ 10-14k", hot: false },
                  ].map((job) => (
                    <div key={job.title} className="group rounded-xl border border-border/50 p-5 hover:border-[hsl(243,75%,59%)]/30 hover:shadow-md transition-all cursor-pointer bg-card">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground group-hover:text-[hsl(243,75%,59%)] transition-colors">{job.title}</h4>
                            {job.hot && <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/10 text-[10px]">🔥 Em Alta</Badge>}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="gap-1 text-xs"><Building2 className="h-3 w-3" /> {job.dept}</Badge>
                            <Badge variant="secondary" className="gap-1 text-xs"><MapPin className="h-3 w-3" /> {job.location}</Badge>
                            <Badge variant="secondary" className="gap-1 text-xs"><DollarSign className="h-3 w-3" /> {job.salary}</Badge>
                          </div>
                        </div>
                        <Button size="sm" className="gap-1 bg-[hsl(243,75%,59%)] hover:bg-[hsl(243,75%,50%)] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          Candidatar-se <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Apply Section */}
                <div className="max-w-3xl mx-auto px-8 pb-10">
                  <div className="rounded-xl border-2 border-dashed border-[hsl(243,75%,59%)]/20 p-8 text-center space-y-4 bg-[hsl(243,75%,97%)] dark:bg-[hsl(243,75%,59%)]/5">
                    <Upload className="h-10 w-10 mx-auto text-[hsl(243,75%,59%)]/50" />
                    <div>
                      <p className="font-semibold text-foreground">Candidatura Rápida</p>
                      <p className="text-sm text-muted-foreground">Arraste seu currículo em PDF ou clique para selecionar</p>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <Button variant="outline" className="gap-2">
                        <Upload className="h-4 w-4" /> Enviar PDF
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Linkedin className="h-4 w-4" /> Importar do LinkedIn
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardRHPortal;
