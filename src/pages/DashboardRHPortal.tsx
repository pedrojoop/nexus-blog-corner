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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles, Copy, PlusCircle, MapPin, Clock, Briefcase, DollarSign,
  Globe, Upload, Linkedin, FileText, ExternalLink, Building2, Users,
  Zap, CheckCircle2, ChevronRight, Palette, Save, Eye, Rocket,
  Check, AlertCircle, Settings2
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const DashboardRHPortal = () => {
  const [aiGenerated, setAiGenerated] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [portalPublished, setPortalPublished] = useState(false);

  // Portal customization state
  const [companyName, setCompanyName] = useState("TechCorp");
  const [portalHeadline, setPortalHeadline] = useState("Venha construir o futuro na");
  const [portalSubtitle, setPortalSubtitle] = useState("Junte-se a um time de +200 pessoas apaixonadas por tecnologia e inovação.");
  const [primaryColor, setPrimaryColor] = useState("#4f46e5");
  const [secondaryColor, setSecondaryColor] = useState("#7c3aed");
  const [quickApplyText, setQuickApplyText] = useState("Na {empresa}, não usamos formulários intermináveis. Envie seu currículo em PDF ou link do LinkedIn e nossa IA faz o resto.");

  // Distribution channels state
  const [channels, setChannels] = useState([
    { icon: Globe, label: "Portal de Carreiras", status: "Ativo", active: true },
    { icon: Linkedin, label: "LinkedIn Jobs", status: "Conectar", active: false },
    { icon: FileText, label: "Indeed", status: "Conectar", active: false },
    { icon: Users, label: "Indicação Interna", status: "Ativo", active: true },
  ]);

  const handleGenerate = () => setAiGenerated(true);

  const handlePublishJob = () => {
    setPublishModalOpen(false);
    toast({ title: "✅ Vaga publicada com sucesso!", description: "A vaga foi publicada nos canais selecionados." });
  };

  const handlePublishPortal = () => {
    setPortalPublished(true);
    toast({ title: "🚀 Portal publicado!", description: `O portal de carreiras da ${companyName} está no ar.` });
  };

  const handleSavePortalSettings = () => {
    toast({ title: "💾 Configurações salvas!", description: "As alterações do portal foram salvas com sucesso." });
  };

  const handleCopyLink = () => {
    toast({ title: "🔗 Link copiado!", description: `carreiras.${companyName.toLowerCase().replace(/\s/g, '')}.com.br` });
  };

  const activeChannels = channels.filter(c => c.active);

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
            <Button variant="outline" className="gap-2" onClick={handleCopyLink}>
              <Copy className="h-4 w-4" /> Copiar Link do Portal
            </Button>
            <Button
              className="gap-2 bg-[hsl(243,75%,59%)] hover:bg-[hsl(243,75%,50%)] text-white"
              onClick={() => setPublishModalOpen(true)}
            >
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
            <TabsTrigger value="editar" className="gap-2 data-[state=active]:bg-background">
              <Palette className="h-4 w-4" /> 2. Editar Portal
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2 data-[state=active]:bg-background">
              <Eye className="h-4 w-4" /> 3. Preview do Portal
            </TabsTrigger>
          </TabsList>

          {/* ========== Tab 1: Criar Vaga com IA ========== */}
          <TabsContent value="criar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                    {channels.map((ch, idx) => (
                      <div
                        key={ch.label}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                        onClick={() => {
                          const updated = [...channels];
                          updated[idx] = { ...updated[idx], active: !updated[idx].active, status: !updated[idx].active ? "Ativo" : "Conectar" };
                          setChannels(updated);
                        }}
                      >
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

          {/* ========== Tab 2: Editar Portal ========== */}
          <TabsContent value="editar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card className="hover:shadow-lg hover:-translate-y-0 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-[hsl(243,75%,59%)]" />
                      Identidade da Empresa
                    </CardTitle>
                    <CardDescription>Configure as informações da sua empresa que aparecerão no portal.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="space-y-2">
                      <Label>Nome da Empresa</Label>
                      <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Ex: TechCorp" />
                    </div>
                    <div className="space-y-2">
                      <Label>Título do Portal</Label>
                      <Input value={portalHeadline} onChange={(e) => setPortalHeadline(e.target.value)} placeholder="Ex: Venha construir o futuro na" />
                      <p className="text-xs text-muted-foreground">O nome da empresa será adicionado automaticamente ao final.</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Subtítulo</Label>
                      <Textarea value={portalSubtitle} onChange={(e) => setPortalSubtitle(e.target.value)} className="min-h-[80px]" />
                    </div>
                    <div className="space-y-2">
                      <Label>Texto de Candidatura Rápida</Label>
                      <Textarea
                        value={quickApplyText}
                        onChange={(e) => setQuickApplyText(e.target.value)}
                        className="min-h-[80px]"
                      />
                      <p className="text-xs text-muted-foreground">Use {"{empresa}"} para inserir o nome da empresa automaticamente.</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Logo da Empresa</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-[hsl(243,75%,59%)]/40 transition-colors">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Clique ou arraste para enviar o logo</p>
                        <p className="text-xs text-muted-foreground">PNG, SVG ou JPG (máx. 2MB)</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Banner do Portal</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-[hsl(243,75%,59%)]/40 transition-colors">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Clique ou arraste para enviar o banner</p>
                        <p className="text-xs text-muted-foreground">Recomendado: 1920x400px</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="hover:shadow-lg hover:-translate-y-0 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Palette className="h-5 w-5 text-[hsl(243,75%,59%)]" />
                      Cores do Portal
                    </CardTitle>
                    <CardDescription>Personalize as cores para refletir a identidade visual da sua marca.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="space-y-2">
                      <Label>Cor Primária</Label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="w-12 h-10 rounded-md border border-border cursor-pointer"
                        />
                        <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="flex-1" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Cor Secundária</Label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="w-12 h-10 rounded-md border border-border cursor-pointer"
                        />
                        <Input value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="flex-1" />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Preview das Cores</Label>
                      <div className="rounded-xl overflow-hidden border border-border">
                        <div className="h-20" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}>
                          <div className="h-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">{companyName}</span>
                          </div>
                        </div>
                        <div className="p-4 bg-card space-y-2">
                          <div className="h-3 rounded-full w-3/4" style={{ backgroundColor: primaryColor, opacity: 0.2 }} />
                          <div className="h-3 rounded-full w-1/2" style={{ backgroundColor: primaryColor, opacity: 0.1 }} />
                          <button
                            className="mt-2 px-4 py-1.5 rounded-md text-white text-xs font-medium"
                            style={{ backgroundColor: primaryColor }}
                          >
                            Candidatar-se
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-xs text-muted-foreground">Presets de Cores</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { name: "Índigo", p: "#4f46e5", s: "#7c3aed" },
                          { name: "Azul", p: "#2563eb", s: "#3b82f6" },
                          { name: "Esmeralda", p: "#059669", s: "#10b981" },
                          { name: "Rubi", p: "#dc2626", s: "#f43f5e" },
                          { name: "Laranja", p: "#ea580c", s: "#f97316" },
                          { name: "Rosa", p: "#db2777", s: "#ec4899" },
                          { name: "Cinza", p: "#475569", s: "#64748b" },
                          { name: "Teal", p: "#0d9488", s: "#14b8a6" },
                        ].map((preset) => (
                          <button
                            key={preset.name}
                            onClick={() => { setPrimaryColor(preset.p); setSecondaryColor(preset.s); }}
                            className="rounded-lg border border-border p-2 text-center hover:border-foreground/30 transition-colors"
                          >
                            <div className="flex gap-1 justify-center mb-1">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.p }} />
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.s }} />
                            </div>
                            <span className="text-[10px] text-muted-foreground">{preset.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg hover:-translate-y-0 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Settings2 className="h-5 w-5 text-[hsl(243,75%,59%)]" />
                      Configurações do Portal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Exibir faixa salarial nas vagas</p>
                        <p className="text-xs text-muted-foreground">Transparência salarial atrai mais candidatos.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Página de cultura da empresa</p>
                        <p className="text-xs text-muted-foreground">Adicione uma seção sobre valores e cultura.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Depoimentos de colaboradores</p>
                        <p className="text-xs text-muted-foreground">Exiba depoimentos no portal.</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-3">
                  <Button onClick={handleSavePortalSettings} className="flex-1 gap-2 bg-[hsl(243,75%,59%)] hover:bg-[hsl(243,75%,50%)] text-white">
                    <Save className="h-4 w-4" /> Salvar Alterações
                  </Button>
                  <Button onClick={handlePublishPortal} variant="outline" className="flex-1 gap-2">
                    <Rocket className="h-4 w-4" /> {portalPublished ? "Republicar Portal" : "Publicar Portal"}
                  </Button>
                </div>

                {portalPublished && (
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 flex items-center gap-2 text-sm text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="font-medium">Portal publicado em carreiras.{companyName.toLowerCase().replace(/\s/g, '')}.com.br</span>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* ========== Tab 3: Preview do Portal ========== */}
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
                  carreiras.{companyName.toLowerCase().replace(/\s/g, '')}.com.br
                </div>
              </div>

              <div className="bg-background">
                {/* Hero Banner */}
                <div className="relative text-white px-8 py-16" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}>
                  <div className="max-w-3xl mx-auto text-center space-y-4">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                        <Building2 className="h-7 w-7 text-white" />
                      </div>
                      <span className="text-2xl font-bold">{companyName}</span>
                    </div>
                    <h2 className="text-3xl font-bold">{portalHeadline} {companyName}</h2>
                    <p className="text-white/80 text-lg">{portalSubtitle}</p>
                  </div>
                </div>

                {/* Quick Apply Banner */}
                <div className="border-b px-8 py-4" style={{ backgroundColor: `${primaryColor}08` }}>
                  <div className="max-w-3xl mx-auto flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}15` }}>
                      <Zap className="h-5 w-5" style={{ color: primaryColor }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{quickApplyText.replace("{empresa}", companyName)}</p>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-semibold" style={{ color: primaryColor }}>Tempo médio de candidatura: 30 segundos.</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Job Listings */}
                <div className="max-w-3xl mx-auto px-8 py-8 space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Vagas Abertas (3)</h3>
                  {[
                    { title: "Desenvolvedor Front-end Sênior", dept: "Tecnologia", location: "Remoto", salary: "R$ 12-18k", hot: true },
                    { title: "Analista de Marketing", dept: "Marketing", location: "Híbrido - SP", salary: "R$ 6-9k", hot: false },
                    { title: "Product Designer Pleno", dept: "Design", location: "Remoto", salary: "R$ 10-14k", hot: false },
                  ].map((job) => (
                    <div key={job.title} className="group rounded-xl border border-border/50 p-5 hover:shadow-md transition-all cursor-pointer bg-card" style={{ borderColor: undefined }}>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">{job.title}</h4>
                            {job.hot && <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/10 text-[10px]">🔥 Em Alta</Badge>}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="gap-1 text-xs"><Building2 className="h-3 w-3" /> {job.dept}</Badge>
                            <Badge variant="secondary" className="gap-1 text-xs"><MapPin className="h-3 w-3" /> {job.location}</Badge>
                            <Badge variant="secondary" className="gap-1 text-xs"><DollarSign className="h-3 w-3" /> {job.salary}</Badge>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="gap-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ backgroundColor: primaryColor }}
                        >
                          Candidatar-se <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Apply Section */}
                <div className="max-w-3xl mx-auto px-8 pb-10">
                  <div className="rounded-xl border-2 border-dashed p-8 text-center space-y-4" style={{ borderColor: `${primaryColor}30`, backgroundColor: `${primaryColor}05` }}>
                    <Upload className="h-10 w-10 mx-auto" style={{ color: `${primaryColor}60` }} />
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

      {/* ========== Publish Job Modal ========== */}
      <Dialog open={publishModalOpen} onOpenChange={setPublishModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-[hsl(243,75%,59%)]" />
              Publicar Vaga
            </DialogTitle>
            <DialogDescription>Revise o resumo da vaga e os canais de distribuição antes de publicar.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Job Summary */}
            <div className="rounded-lg border border-border p-4 space-y-3 bg-muted/30">
              <h4 className="font-semibold text-sm text-foreground">Resumo da Vaga</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground text-xs">Cargo</span>
                  <p className="font-medium">Desenvolvedor Front-end Sênior</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">Departamento</span>
                  <p className="font-medium">Tecnologia</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">Modelo</span>
                  <p className="font-medium">Remoto</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">Faixa Salarial</span>
                  <p className="font-medium">R$ 12.000 - R$ 18.000</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Distribution Channels */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                <Globe className="h-4 w-4" /> Canais de Distribuição
              </h4>
              {channels.map((ch) => (
                <div key={ch.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <ch.icon className="h-4 w-4 text-muted-foreground" />
                    <span>{ch.label}</span>
                  </div>
                  {ch.active ? (
                    <div className="flex items-center gap-1 text-emerald-600">
                      <Check className="h-3.5 w-3.5" />
                      <span className="text-xs font-medium">Será publicado</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span className="text-xs">Não conectado</span>
                    </div>
                  )}
                </div>
              ))}
              {activeChannels.length === 0 && (
                <p className="text-xs text-amber-600 bg-amber-500/10 rounded-lg p-2">
                  ⚠️ Nenhum canal ativo. A vaga será salva como rascunho.
                </p>
              )}
            </div>

            <Separator />

            {/* AI Features */}
            <div className="rounded-lg border border-[hsl(243,75%,59%)]/20 bg-[hsl(243,75%,97%)] dark:bg-[hsl(243,75%,59%)]/5 p-3 space-y-1">
              <div className="flex items-center gap-2 text-sm font-medium text-[hsl(243,75%,59%)]">
                <Sparkles className="h-4 w-4" />
                Recursos de IA Ativados
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">✅ Ranqueamento por IA</Badge>
                <Badge variant="secondary" className="text-xs">✅ Candidatura por PDF</Badge>
                <Badge variant="secondary" className="text-xs">❌ Vídeo-apresentação</Badge>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setPublishModalOpen(false)}>Cancelar</Button>
            <Button onClick={handlePublishJob} className="gap-2 bg-[hsl(243,75%,59%)] hover:bg-[hsl(243,75%,50%)] text-white">
              <Rocket className="h-4 w-4" /> Confirmar Publicação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default DashboardRHPortal;
