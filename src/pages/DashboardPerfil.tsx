import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, Target, Award, Sparkles, TrendingUp, 
  Calendar, MapPin, Briefcase, Save, Lock, Unlock, User
} from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";

interface Goal {
  id: string;
  title: string;
  progress: number;
  xp: number;
  deadline: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  xp: number;
  progress: number;
  total: number;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  requiredLevel: number;
  unlocked: boolean;
  icon: string;
}

const DashboardPerfil = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") === "info" ? "info" : "dashboard");
  
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "info") {
      setActiveTab("info");
    }
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "info") {
      setSearchParams({ tab: "info" });
    } else {
      setSearchParams({});
    }
  };

  const [formData, setFormData] = useState({
    nomeCompleto: "Pedro Lima",
    cargo: "Super Admin",
    setor: "",
    localidade: "",
    dataEntrada: "31/12/1969",
    dataAniversario: "1969-12-30",
    descricao: "",
    habilidades: "",
  });

  // Dados de gamificação
  const currentLevel = 7;
  const currentXP = 2850;
  const nextLevelXP = 3000;
  const xpProgress = (currentXP / nextLevelXP) * 100;

  const [goals] = useState<Goal[]>([
    {
      id: "1",
      title: "Completar 5 cursos de liderança",
      progress: 60,
      xp: 500,
      deadline: "31/03/2025",
    },
    {
      id: "2",
      title: "Mentorar 3 novos colaboradores",
      progress: 33,
      xp: 400,
      deadline: "30/06/2025",
    },
    {
      id: "3",
      title: "Participar de 10 eventos da empresa",
      progress: 70,
      xp: 300,
      deadline: "31/12/2025",
    },
  ]);

  const [challenges] = useState<Challenge[]>([
    {
      id: "1",
      title: "Engajamento Semanal",
      description: "Interagir no feed 5 vezes esta semana",
      xp: 100,
      progress: 3,
      total: 5,
    },
    {
      id: "2",
      title: "Colaborador do Mês",
      description: "Receber 10 reconhecimentos",
      xp: 500,
      progress: 7,
      total: 10,
    },
    {
      id: "3",
      title: "Aprendiz Dedicado",
      description: "Completar 3 cursos este mês",
      xp: 300,
      progress: 1,
      total: 3,
    },
  ]);

  const [rewards] = useState<Reward[]>([
    {
      id: "1",
      title: "Badge Pioneiro",
      description: "Primeiros 100 colaboradores",
      requiredLevel: 5,
      unlocked: true,
      icon: "🏆",
    },
    {
      id: "2",
      title: "Mestre da Cultura",
      description: "Alcançar nível 10",
      requiredLevel: 10,
      unlocked: false,
      icon: "👑",
    },
    {
      id: "3",
      title: "Mentor Especialista",
      description: "Mentorar 10 pessoas",
      requiredLevel: 8,
      unlocked: true,
      icon: "🎓",
    },
    {
      id: "4",
      title: "Inovador",
      description: "Completar 20 cursos",
      requiredLevel: 12,
      unlocked: false,
      icon: "💡",
    },
    {
      id: "5",
      title: "Líder Comunitário",
      description: "Organizar 5 eventos",
      requiredLevel: 15,
      unlocked: false,
      icon: "⭐",
    },
    {
      id: "6",
      title: "Influenciador",
      description: "100 posts com engajamento alto",
      requiredLevel: 20,
      unlocked: false,
      icon: "🚀",
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    toast.success("Perfil atualizado com sucesso!");
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto p-6 space-y-8">
          {/* Header com Avatar e Stats */}
          <Card className="shadow-lg border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro" />
                  <AvatarFallback>PL</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-1">{formData.nomeCompleto}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      <span>{formData.cargo}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>São Paulo, Brasil</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Na empresa desde 1969</span>
                    </div>
                  </div>
                  
                  {/* XP e Nível */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-accent" />
                        <span className="font-semibold">Nível {currentLevel}</span>
                        <Badge variant="secondary" className="gap-1">
                          <Sparkles className="h-3 w-3" />
                          {currentXP} XP
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {nextLevelXP - currentXP} XP para o próximo nível
                      </span>
                    </div>
                    <Progress value={xpProgress} className="h-3" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="dashboard" className="gap-2">
                <Trophy className="h-4 w-4" />
                Meu Dashboard
              </TabsTrigger>
              <TabsTrigger value="info" className="gap-2">
                <User className="h-4 w-4" />
                Informações Pessoais
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="mt-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Coluna Principal - Metas e Desafios */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Metas Ativas */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        Minhas Metas
                      </CardTitle>
                      <CardDescription>
                        Acompanhe seu progresso nas metas de desenvolvimento
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {goals.map((goal) => (
                        <Card key={goal.id} className="hover:shadow-md transition-all">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="font-semibold mb-1">{goal.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  <span>Prazo: {goal.deadline}</span>
                                </div>
                              </div>
                              <Badge variant="secondary" className="gap-1">
                                <Trophy className="h-3 w-3" />
                                {goal.xp} XP
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Progresso</span>
                                <span className="font-semibold">{goal.progress}%</span>
                              </div>
                              <Progress value={goal.progress} className="h-2" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Desafios Ativos */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Desafios Ativos
                      </CardTitle>
                      <CardDescription>
                        Complete desafios para ganhar XP extra
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {challenges.map((challenge) => (
                        <Card key={challenge.id} className="hover:shadow-md transition-all">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-semibold mb-1">{challenge.title}</h3>
                                <p className="text-sm text-muted-foreground">{challenge.description}</p>
                              </div>
                              <Badge className="gap-1">
                                <Trophy className="h-3 w-3" />
                                +{challenge.xp} XP
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  {challenge.progress} de {challenge.total}
                                </span>
                                <span className="font-semibold">
                                  {Math.round((challenge.progress / challenge.total) * 100)}%
                                </span>
                              </div>
                              <Progress 
                                value={(challenge.progress / challenge.total) * 100} 
                                className="h-2" 
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar - Recompensas */}
                <div className="space-y-6">
                  <Card className="shadow-lg border-l-4 border-l-accent">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-accent" />
                        Conquistas & Recompensas
                      </CardTitle>
                      <CardDescription>
                        Desbloqueie conquistas conforme você evolui
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {rewards.map((reward) => (
                        <div
                          key={reward.id}
                          className={`p-4 rounded-lg border transition-all ${
                            reward.unlocked
                              ? "bg-accent/5 border-accent/30 hover:shadow-md"
                              : "bg-muted/30 border-muted opacity-60"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="text-3xl">{reward.icon}</div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-1">
                                <h4 className="font-semibold text-sm">{reward.title}</h4>
                                {reward.unlocked ? (
                                  <Unlock className="h-4 w-4 text-accent" />
                                ) : (
                                  <Lock className="h-4 w-4 text-muted-foreground" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">
                                {reward.description}
                              </p>
                              <Badge 
                                variant={reward.unlocked ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {reward.unlocked ? "Desbloqueado" : `Nível ${reward.requiredLevel}`}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Stats Card */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg">Estatísticas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Conquistas</span>
                        <span className="font-bold">
                          {rewards.filter(r => r.unlocked).length}/{rewards.length}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Metas Ativas</span>
                        <span className="font-bold">{goals.length}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Desafios em Andamento</span>
                        <span className="font-bold">{challenges.length}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Total de XP</span>
                        <span className="font-bold text-accent">{currentXP} XP</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Informações Pessoais Tab */}
            <TabsContent value="info" className="mt-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>
                    Mantenha suas informações atualizadas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nomeCompleto">Nome completo *</Label>
                      <Input
                        id="nomeCompleto"
                        name="nomeCompleto"
                        value={formData.nomeCompleto}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cargo">Cargo *</Label>
                      <Input
                        id="cargo"
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="setor">Setor *</Label>
                      <Input
                        id="setor"
                        name="setor"
                        value={formData.setor}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="localidade">Localidade *</Label>
                      <Input
                        id="localidade"
                        name="localidade"
                        value={formData.localidade}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dataEntrada">Data de entrada na empresa</Label>
                      <Input
                        id="dataEntrada"
                        name="dataEntrada"
                        value={formData.dataEntrada}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dataAniversario">Data de aniversário</Label>
                      <Input
                        id="dataAniversario"
                        name="dataAniversario"
                        type="date"
                        value={formData.dataAniversario}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea
                      id="descricao"
                      name="descricao"
                      placeholder="Descreva sua experiência e especialidades..."
                      value={formData.descricao}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="habilidades">Habilidades</Label>
                    <Textarea
                      id="habilidades"
                      name="habilidades"
                      placeholder="Separe as habilidades por vírgula"
                      value={formData.habilidades}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={handleSave} className="gap-2">
                      <Save className="h-4 w-4" />
                      Salvar Alterações
                    </Button>
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

export default DashboardPerfil;
