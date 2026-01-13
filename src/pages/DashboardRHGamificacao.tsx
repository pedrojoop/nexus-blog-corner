import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { 
  Trophy, 
  Gift, 
  Target, 
  Plus, 
  Edit, 
  Trash2, 
  Medal,
  Crown,
  Star,
  Sparkles,
  Globe,
  Building2,
  Clock,
  Zap,
  Gem,
  Award
} from "lucide-react";
import { useState } from "react";
import { NivelModal, Nivel } from "@/components/gamificacao/NivelModal";
import { RecompensaModal, Recompensa } from "@/components/gamificacao/RecompensaModal";
import { MissaoModal, Meta } from "@/components/gamificacao/MissaoModal";
import { DeleteConfirmModal } from "@/components/gamificacao/DeleteConfirmModal";
import { toast } from "@/hooks/use-toast";

type TabType = "jornada" | "marketplace" | "missoes";
type FilterType = "todas" | "global" | "departamento";

const DashboardRHGamificacao = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const [activeTab, setActiveTab] = useState<TabType>("jornada");
  const [filtroMissao, setFiltroMissao] = useState<FilterType>("todas");

  // Estados para os dados
  const [niveis, setNiveis] = useState<Nivel[]>([
    { nivel: 1, xpNecessario: 0, nome: "Iniciante", icone: "bronze" },
    { nivel: 2, xpNecessario: 100, nome: "Aprendiz", icone: "bronze" },
    { nivel: 3, xpNecessario: 250, nome: "Explorador", icone: "bronze" },
    { nivel: 4, xpNecessario: 500, nome: "Competente", icone: "silver" },
    { nivel: 5, xpNecessario: 1000, nome: "Habilidoso", icone: "silver" },
    { nivel: 6, xpNecessario: 1500, nome: "Especialista", icone: "silver" },
    { nivel: 7, xpNecessario: 2500, nome: "Veterano", icone: "gold" },
    { nivel: 8, xpNecessario: 3500, nome: "Mestre", icone: "gold" },
    { nivel: 9, xpNecessario: 5000, nome: "Lendário", icone: "platinum" },
    { nivel: 10, xpNecessario: 7000, nome: "Supremo", icone: "diamond" },
  ]);

  const [recompensas, setRecompensas] = useState<Recompensa[]>([
    { id: 1, nome: "Vale-Presente R$50", valor: 50, xpCusto: 500, nivelMinimo: 3, descricao: "Crédito para usar em lojas parceiras", tipo: "monetario" },
    { id: 2, nome: "Dia Extra de Férias", valor: 1, xpCusto: 1000, nivelMinimo: 5, descricao: "Um dia adicional de descanso merecido", tipo: "beneficio" },
    { id: 3, nome: "Vale-Presente R$100", valor: 100, xpCusto: 800, nivelMinimo: 7, descricao: "Crédito premium para lojas parceiras", tipo: "monetario" },
    { id: 4, nome: "Home Office Flexível", valor: 2, xpCusto: 1200, nivelMinimo: 8, descricao: "2 dias extras de home office por mês", tipo: "beneficio" },
    { id: 5, nome: "Curso Profissional", valor: 500, xpCusto: 2000, nivelMinimo: 10, descricao: "Acesso a curso de desenvolvimento profissional", tipo: "experiencia" },
    { id: 6, nome: "Mentoria Executiva", valor: 0, xpCusto: 3000, nivelMinimo: 10, descricao: "Sessão de mentoria com liderança executiva", tipo: "experiencia" },
  ]);

  const [metas, setMetas] = useState<Meta[]>([
    { id: 1, titulo: "Completar 5 projetos", descricao: "Finalize 5 projetos com sucesso", escopo: "GLOBAL", xp: 500, prazo: "31/12/2025", progresso: 60 },
    { id: 2, titulo: "Participar de eventos", descricao: "Participe de 3 eventos corporativos", escopo: "DEPARTAMENTO", xp: 300, prazo: "20/12/2025", progresso: 33 },
    { id: 3, titulo: "Mentorar colaboradores", descricao: "Atue como mentor de novos membros", escopo: "GLOBAL", xp: 400, prazo: "15/01/2026", progresso: 0 },
    { id: 4, titulo: "Certificação Técnica", descricao: "Obtenha uma nova certificação", escopo: "DEPARTAMENTO", xp: 600, prazo: "28/02/2026", progresso: 25 },
    { id: 5, titulo: "Inovação do Mês", descricao: "Proponha uma melhoria implementável", escopo: "GLOBAL", xp: 800, prazo: "31/01/2026", progresso: 0 },
  ]);

  // Estados para modais
  const [nivelModalOpen, setNivelModalOpen] = useState(false);
  const [recompensaModalOpen, setRecompensaModalOpen] = useState(false);
  const [missaoModalOpen, setMissaoModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [editingNivel, setEditingNivel] = useState<Nivel | null>(null);
  const [editingRecompensa, setEditingRecompensa] = useState<Recompensa | null>(null);
  const [editingMeta, setEditingMeta] = useState<Meta | null>(null);
  const [deleteItem, setDeleteItem] = useState<{ type: "nível" | "recompensa" | "missão"; name: string; id: number | null } | null>(null);

  // Handlers de Níveis
  const handleSaveNivel = (nivel: Nivel) => {
    if (editingNivel) {
      setNiveis(niveis.map(n => n.nivel === nivel.nivel ? nivel : n));
      toast({ title: "Nível atualizado", description: `"${nivel.nome}" foi salvo com sucesso.` });
    } else {
      setNiveis([...niveis, nivel].sort((a, b) => a.nivel - b.nivel));
      toast({ title: "Nível criado", description: `"${nivel.nome}" foi adicionado com sucesso.` });
    }
    setEditingNivel(null);
  };

  const handleEditNivel = (nivel: Nivel) => {
    setEditingNivel(nivel);
    setNivelModalOpen(true);
  };

  const handleDeleteNivel = (nivel: Nivel) => {
    setDeleteItem({ type: "nível", name: nivel.nome, id: nivel.nivel });
    setDeleteModalOpen(true);
  };

  // Handlers de Recompensas
  const handleSaveRecompensa = (recompensa: Recompensa) => {
    if (editingRecompensa) {
      setRecompensas(recompensas.map(r => r.id === recompensa.id ? recompensa : r));
      toast({ title: "Recompensa atualizada", description: `"${recompensa.nome}" foi salva com sucesso.` });
    } else {
      setRecompensas([...recompensas, recompensa]);
      toast({ title: "Recompensa criada", description: `"${recompensa.nome}" foi adicionada com sucesso.` });
    }
    setEditingRecompensa(null);
  };

  const handleEditRecompensa = (recompensa: Recompensa) => {
    setEditingRecompensa(recompensa);
    setRecompensaModalOpen(true);
  };

  const handleDeleteRecompensa = (recompensa: Recompensa) => {
    setDeleteItem({ type: "recompensa", name: recompensa.nome, id: recompensa.id });
    setDeleteModalOpen(true);
  };

  // Handlers de Missões
  const handleSaveMeta = (meta: Meta) => {
    if (editingMeta) {
      setMetas(metas.map(m => m.id === meta.id ? meta : m));
      toast({ title: "Missão atualizada", description: `"${meta.titulo}" foi salva com sucesso.` });
    } else {
      setMetas([...metas, meta]);
      toast({ title: "Missão criada", description: `"${meta.titulo}" foi adicionada com sucesso.` });
    }
    setEditingMeta(null);
  };

  const handleEditMeta = (meta: Meta) => {
    setEditingMeta(meta);
    setMissaoModalOpen(true);
  };

  const handleDeleteMeta = (meta: Meta) => {
    setDeleteItem({ type: "missão", name: meta.titulo, id: meta.id });
    setDeleteModalOpen(true);
  };

  // Handler de confirmação de exclusão
  const handleConfirmDelete = () => {
    if (!deleteItem) return;

    if (deleteItem.type === "nível" && deleteItem.id !== null) {
      setNiveis(niveis.filter(n => n.nivel !== deleteItem.id));
      toast({ title: "Nível excluído", description: `"${deleteItem.name}" foi removido.`, variant: "destructive" });
    } else if (deleteItem.type === "recompensa" && deleteItem.id !== null) {
      setRecompensas(recompensas.filter(r => r.id !== deleteItem.id));
      toast({ title: "Recompensa excluída", description: `"${deleteItem.name}" foi removida.`, variant: "destructive" });
    } else if (deleteItem.type === "missão" && deleteItem.id !== null) {
      setMetas(metas.filter(m => m.id !== deleteItem.id));
      toast({ title: "Missão excluída", description: `"${deleteItem.name}" foi removida.`, variant: "destructive" });
    }

    setDeleteItem(null);
    setDeleteModalOpen(false);
  };

  const getIconeNivel = (icone: string) => {
    switch (icone) {
      case "bronze": return <Medal className="h-6 w-6 text-amber-600" />;
      case "silver": return <Medal className="h-6 w-6 text-slate-400" />;
      case "gold": return <Crown className="h-6 w-6 text-yellow-500" />;
      case "platinum": return <Star className="h-6 w-6 text-cyan-400" />;
      case "diamond": return <Gem className="h-6 w-6 text-violet-400" />;
      default: return <Medal className="h-6 w-6" />;
    }
  };

  const getCorNivel = (icone: string) => {
    switch (icone) {
      case "bronze": return "from-amber-600/20 to-amber-700/30 border-amber-500/40";
      case "silver": return "from-slate-300/20 to-slate-400/30 border-slate-400/40";
      case "gold": return "from-yellow-400/20 to-yellow-500/30 border-yellow-500/40";
      case "platinum": return "from-cyan-400/20 to-cyan-500/30 border-cyan-500/40";
      case "diamond": return "from-violet-400/20 to-violet-500/30 border-violet-500/40";
      default: return "from-muted/20 to-muted/30 border-border";
    }
  };

  const getRaridadeBadge = (nivelMinimo: number) => {
    if (nivelMinimo >= 8) return { label: "Lendário", cor: "bg-gradient-to-r from-yellow-400 to-amber-500 text-black" };
    if (nivelMinimo >= 4) return { label: "Raro", cor: "bg-gradient-to-r from-primary to-blue-600 text-white" };
    return { label: "Comum", cor: "bg-gradient-to-r from-slate-400 to-slate-500 text-white" };
  };

  const metasFiltradas = metas.filter(meta => {
    if (filtroMissao === "todas") return true;
    if (filtroMissao === "global") return meta.escopo === "GLOBAL";
    return meta.escopo === "DEPARTAMENTO";
  });

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        {/* Glow Effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="glow-orb glow-orb-blue w-96 h-96 -top-48 -left-48" />
          <div className="glow-orb glow-orb-purple w-80 h-80 top-1/2 -right-40" />
        </div>

        <div className="container mx-auto p-6 space-y-8 relative z-10">
          {/* Header */}
          <div
            ref={headerRef}
            className={`transition-all duration-700 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Configuração de Gamificação
                </h1>
                <p className="text-muted-foreground">
                  Crie experiências envolventes para engajar sua equipe
                </p>
              </div>
            </div>
          </div>

          {/* Segmented Control - Menu de Alternância */}
          <div className="glass-card p-2 inline-flex rounded-2xl">
            <button
              onClick={() => setActiveTab("jornada")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "jornada"
                  ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg"
                  : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              <Trophy className="h-5 w-5" />
              Jornada de Níveis
            </button>
            <button
              onClick={() => setActiveTab("marketplace")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "marketplace"
                  ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg"
                  : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              <Gift className="h-5 w-5" />
              Marketplace de Recompensas
            </button>
            <button
              onClick={() => setActiveTab("missoes")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "missoes"
                  ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg"
                  : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              <Target className="h-5 w-5" />
              Quadro de Missões
            </button>
          </div>

          {/* Aba 1: Jornada de Níveis - Timeline Vertical */}
          {activeTab === "jornada" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-primary" />
                  Timeline de Progressão
                </h2>
                <Button 
                  className="btn-tech gap-2"
                  onClick={() => {
                    setEditingNivel(null);
                    setNivelModalOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4" />
                  Adicionar Novo Nível
                </Button>
              </div>

              <div className="glass-card p-8 rounded-3xl">
                <div className="relative">
                  {/* Linha de conexão vertical */}
                  <div className="absolute left-[2.75rem] top-0 bottom-0 w-1 bg-gradient-to-b from-amber-600 via-yellow-500 to-violet-500 rounded-full" />

                  {/* Níveis */}
                  <div className="space-y-4">
                    {niveis.slice().reverse().map((nivel, idx) => (
                      <div
                        key={nivel.nivel}
                        className={`relative flex items-center gap-6 p-4 rounded-2xl border bg-gradient-to-r ${getCorNivel(nivel.icone)} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group`}
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        {/* Nó do nível */}
                        <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-card border-2 border-primary/50 shadow-lg">
                          {getIconeNivel(nivel.icone)}
                        </div>

                        {/* Info do nível */}
                        <div className="flex-1 flex items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl font-bold text-foreground">
                                Nível {nivel.nivel}
                              </span>
                              <Badge variant="outline" className="text-sm font-medium">
                                {nivel.nome}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Zap className="h-4 w-4 text-accent" />
                              <span className="text-muted-foreground">
                                {nivel.xpNecessario.toLocaleString()} XP necessários
                              </span>
                            </div>
                          </div>

                          {/* Progresso até próximo nível */}
                          {idx < niveis.length - 1 && (
                            <div className="hidden md:block w-48">
                              <div className="text-xs text-muted-foreground mb-1">
                                +{(niveis[niveis.length - 1 - idx - 1]?.xpNecessario || 0) - nivel.xpNecessario} XP para próximo
                              </div>
                              <Progress 
                                value={100} 
                                className="h-2 bg-muted" 
                              />
                            </div>
                          )}
                        </div>

                        {/* Ações */}
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-10 w-10 rounded-xl hover:bg-primary/20"
                            onClick={() => handleEditNivel(nivel)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-10 w-10 rounded-xl hover:bg-destructive/20"
                            onClick={() => handleDeleteNivel(nivel)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Aba 2: Marketplace de Recompensas */}
          {activeTab === "marketplace" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Gift className="h-6 w-6 text-accent" />
                  Vitrine de Recompensas
                </h2>
                <Button 
                  className="btn-tech gap-2"
                  onClick={() => {
                    setEditingRecompensa(null);
                    setRecompensaModalOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4" />
                  Nova Recompensa
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recompensas.map((recompensa) => {
                  const raridade = getRaridadeBadge(recompensa.nivelMinimo);
                  return (
                    <div
                      key={recompensa.id}
                      className="group glass-card rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                    >
                      {/* Header com imagem/ícone */}
                      <div className="relative h-36 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 flex items-center justify-center overflow-hidden">
                        {/* Badge de raridade */}
                        <Badge className={`absolute top-4 left-4 ${raridade.cor} px-3 py-1 text-xs font-bold uppercase tracking-wide`}>
                          {raridade.label}
                        </Badge>

                        {/* Ícone 3D */}
                        <div className="relative">
                          <div className="absolute inset-0 blur-2xl opacity-50 bg-accent rounded-full" />
                          {recompensa.tipo === "monetario" && (
                            <Gift className="h-16 w-16 text-accent relative z-10" />
                          )}
                          {recompensa.tipo === "beneficio" && (
                            <Star className="h-16 w-16 text-yellow-500 relative z-10" />
                          )}
                          {recompensa.tipo === "experiencia" && (
                            <Award className="h-16 w-16 text-primary relative z-10" />
                          )}
                        </div>

                        {/* Ações hover */}
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                          <Button 
                            variant="secondary" 
                            size="icon" 
                            className="h-9 w-9 rounded-xl bg-card/80 backdrop-blur-sm hover:bg-card"
                            onClick={() => handleEditRecompensa(recompensa)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="secondary" 
                            size="icon" 
                            className="h-9 w-9 rounded-xl bg-card/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => handleDeleteRecompensa(recompensa)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Conteúdo */}
                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="font-bold text-xl text-foreground mb-1">
                            {recompensa.nome}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {recompensa.descricao}
                          </p>
                        </div>

                        {/* Preço e nível */}
                        <div className="flex items-center justify-between pt-2 border-t border-border/50">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground uppercase tracking-wide">Custo</span>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-accent">
                                {recompensa.xpCusto.toLocaleString()}
                              </span>
                              <span className="text-sm font-medium text-muted-foreground">XP</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-muted-foreground uppercase tracking-wide">Nível Mínimo</span>
                            <div className="flex items-center justify-end gap-1 mt-1">
                              <Medal className="h-4 w-4 text-primary" />
                              <span className="font-bold text-foreground">
                                Nível {recompensa.nivelMinimo}
                              </span>
                            </div>
                          </div>
                        </div>

                        {recompensa.valor > 0 && (
                          <div className="text-center pt-2">
                            <Badge variant="outline" className="text-sm">
                              {recompensa.tipo === "monetario" 
                                ? `Valor: R$ ${recompensa.valor}` 
                                : `${recompensa.valor} ${recompensa.valor === 1 ? 'dia' : 'dias'}`
                              }
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Aba 3: Quadro de Missões */}
          {activeTab === "missoes" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Target className="h-6 w-6 text-primary" />
                  Missões e Desafios
                </h2>
                
                <div className="flex items-center gap-3">
                  {/* Filtros rápidos */}
                  <div className="glass-card p-1 rounded-xl inline-flex">
                    <button
                      onClick={() => setFiltroMissao("todas")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filtroMissao === "todas"
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted/50 text-muted-foreground"
                      }`}
                    >
                      Todas
                    </button>
                    <button
                      onClick={() => setFiltroMissao("global")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                        filtroMissao === "global"
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted/50 text-muted-foreground"
                      }`}
                    >
                      <Globe className="h-4 w-4" />
                      Globais
                    </button>
                    <button
                      onClick={() => setFiltroMissao("departamento")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                        filtroMissao === "departamento"
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted/50 text-muted-foreground"
                      }`}
                    >
                      <Building2 className="h-4 w-4" />
                      Departamento
                    </button>
                  </div>

                  <Button 
                    className="btn-tech gap-2"
                    onClick={() => {
                      setEditingMeta(null);
                      setMissaoModalOpen(true);
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    Nova Missão
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {metasFiltradas.map((meta) => (
                  <div
                    key={meta.id}
                    className="group glass-card rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-transparent hover:border-primary/30 relative"
                  >
                    {/* Ticket Header */}
                    <div className="flex items-start gap-4 mb-4">
                      {/* Ícone de escopo */}
                      <div className={`p-3 rounded-2xl ${
                        meta.escopo === "GLOBAL" 
                          ? "bg-gradient-to-br from-primary/20 to-primary/10" 
                          : "bg-gradient-to-br from-accent/20 to-accent/10"
                      }`}>
                        {meta.escopo === "GLOBAL" 
                          ? <Globe className="h-6 w-6 text-primary" />
                          : <Building2 className="h-6 w-6 text-accent" />
                        }
                      </div>

                      {/* Título e descrição */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-foreground line-clamp-1">
                          {meta.titulo}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {meta.descricao}
                        </p>
                      </div>

                      {/* Recompensa XP */}
                      <div className="flex-shrink-0">
                        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-accent to-accent/80 text-accent-foreground font-bold text-sm shadow-lg">
                          +{meta.xp} XP
                        </div>
                      </div>
                    </div>

                    {/* Barra de progresso */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className="font-medium text-foreground">{meta.progresso}%</span>
                      </div>
                      <Progress value={meta.progresso} className="h-2" />
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      {/* Prazo */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Prazo: {meta.prazo}</span>
                      </div>

                      {/* Ações */}
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-lg hover:bg-primary/20"
                          onClick={() => handleEditMeta(meta)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-lg hover:bg-destructive/20"
                          onClick={() => handleDeleteMeta(meta)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>

                    {/* Badge de escopo */}
                    <Badge 
                      variant={meta.escopo === "GLOBAL" ? "default" : "secondary"}
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {meta.escopo}
                    </Badge>
                  </div>
                ))}
              </div>

              {metasFiltradas.length === 0 && (
                <div className="glass-card rounded-3xl p-12 text-center">
                  <Target className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                    Nenhuma missão encontrada
                  </h3>
                  <p className="text-muted-foreground">
                    Não há missões com o filtro selecionado
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modais */}
      <NivelModal
        open={nivelModalOpen}
        onClose={() => {
          setNivelModalOpen(false);
          setEditingNivel(null);
        }}
        onSave={handleSaveNivel}
        nivel={editingNivel}
        isEditing={!!editingNivel}
        nextNivelNumber={niveis.length > 0 ? Math.max(...niveis.map(n => n.nivel)) + 1 : 1}
      />

      <RecompensaModal
        open={recompensaModalOpen}
        onClose={() => {
          setRecompensaModalOpen(false);
          setEditingRecompensa(null);
        }}
        onSave={handleSaveRecompensa}
        recompensa={editingRecompensa}
        isEditing={!!editingRecompensa}
        nextId={recompensas.length > 0 ? Math.max(...recompensas.map(r => r.id)) + 1 : 1}
      />

      <MissaoModal
        open={missaoModalOpen}
        onClose={() => {
          setMissaoModalOpen(false);
          setEditingMeta(null);
        }}
        onSave={handleSaveMeta}
        meta={editingMeta}
        isEditing={!!editingMeta}
        nextId={metas.length > 0 ? Math.max(...metas.map(m => m.id)) + 1 : 1}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setDeleteItem(null);
        }}
        onConfirm={handleConfirmDelete}
        itemName={deleteItem?.name || ""}
        itemType={deleteItem?.type || "nível"}
      />
    </DashboardLayout>
  );
};

export default DashboardRHGamificacao;
