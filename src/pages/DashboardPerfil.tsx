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
  Trophy, Target, Sparkles, Coins, ShoppingBag,
  Calendar, MapPin, Briefcase, Save, Lock, Gift, User
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

interface StoreReward {
  id: number;
  nome: string;
  valor: number;
  nivelMinimo: number;
  custoMoedas: number;
  descricao: string;
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

  // Moedas do usuário
  const [userCoins, setUserCoins] = useState(850);

  // Recompensas da loja (mesmas do módulo RH de Gamificação)
  const [storeRewards] = useState<StoreReward[]>([
    { id: 1, nome: "Vale-Presente R$50", valor: 50, nivelMinimo: 3, custoMoedas: 200, descricao: "Vale-presente para uso em lojas parceiras", icon: "🎁" },
    { id: 2, nome: "Dia Extra de Férias", valor: 1, nivelMinimo: 5, custoMoedas: 500, descricao: "Um dia adicional de folga remunerada", icon: "🏖️" },
    { id: 3, nome: "Vale-Presente R$100", valor: 100, nivelMinimo: 7, custoMoedas: 400, descricao: "Vale-presente premium para lojas parceiras", icon: "💳" },
    { id: 4, nome: "Home Office Flexível", valor: 2, nivelMinimo: 8, custoMoedas: 350, descricao: "2 dias extras de home office por mês", icon: "🏠" },
    { id: 5, nome: "Curso Profissional", valor: 500, nivelMinimo: 10, custoMoedas: 600, descricao: "Acesso a curso profissional de sua escolha", icon: "📚" },
    { id: 6, nome: "Mentoria Executiva", valor: 0, nivelMinimo: 6, custoMoedas: 450, descricao: "Sessão de mentoria com executivo sênior", icon: "👔" },
    { id: 7, nome: "Equipamento Premium", valor: 300, nivelMinimo: 9, custoMoedas: 800, descricao: "Upgrade de equipamento de trabalho", icon: "💻" },
    { id: 8, nome: "Experiência Exclusiva", valor: 0, nivelMinimo: 12, custoMoedas: 1000, descricao: "Jantar ou experiência especial para você e acompanhante", icon: "✨" },
  ]);

  const handleRedeemReward = (reward: StoreReward) => {
    if (currentLevel < reward.nivelMinimo) {
      toast.error(`Você precisa ser nível ${reward.nivelMinimo} para resgatar esta recompensa`);
      return;
    }
    if (userCoins < reward.custoMoedas) {
      toast.error(`Você não tem moedas suficientes (necessário: ${reward.custoMoedas})`);
      return;
    }
    setUserCoins(prev => prev - reward.custoMoedas);
    toast.success(`🎉 ${reward.nome} resgatado com sucesso! Você será notificado em breve.`);
  };

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
                {/* Loja de Recompensas */}
                <div className="lg:col-span-3 space-y-6">
                  <Card className="shadow-lg border-l-4 border-l-accent">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <ShoppingBag className="h-5 w-5 text-accent" />
                            Loja de Recompensas
                          </CardTitle>
                          <CardDescription>
                            Troque suas moedas por recompensas exclusivas
                          </CardDescription>
                        </div>
                        <Badge className="gap-2 text-lg px-4 py-2 bg-accent/10 text-accent border-accent/30">
                          <Coins className="h-5 w-5" />
                          {userCoins} moedas
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {storeRewards.map((reward) => {
                          const canAfford = userCoins >= reward.custoMoedas;
                          const meetsLevel = currentLevel >= reward.nivelMinimo;
                          const canRedeem = canAfford && meetsLevel;
                          
                          return (
                            <Card 
                              key={reward.id} 
                              className={`hover:shadow-lg transition-all hover:-translate-y-1 ${
                                !meetsLevel ? "opacity-60" : ""
                              }`}
                            >
                              <CardContent className="p-4">
                                <div className="text-center mb-4">
                                  <span className="text-4xl">{reward.icon}</span>
                                </div>
                                <h3 className="font-bold text-center mb-2">{reward.nome}</h3>
                                <p className="text-xs text-muted-foreground text-center mb-4 line-clamp-2">
                                  {reward.descricao}
                                </p>
                                <div className="space-y-2 mb-4">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Custo:</span>
                                    <Badge variant={canAfford ? "default" : "secondary"} className="gap-1">
                                      <Coins className="h-3 w-3" />
                                      {reward.custoMoedas}
                                    </Badge>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Nível:</span>
                                    <Badge variant={meetsLevel ? "default" : "secondary"} className="gap-1">
                                      {meetsLevel ? (
                                        <Trophy className="h-3 w-3" />
                                      ) : (
                                        <Lock className="h-3 w-3" />
                                      )}
                                      {reward.nivelMinimo}
                                    </Badge>
                                  </div>
                                </div>
                                <Button 
                                  className="w-full gap-2" 
                                  disabled={!canRedeem}
                                  onClick={() => handleRedeemReward(reward)}
                                >
                                  <Gift className="h-4 w-4" />
                                  {!meetsLevel 
                                    ? `Nível ${reward.nivelMinimo}` 
                                    : !canAfford 
                                      ? "Moedas insuficientes" 
                                      : "Resgatar"
                                  }
                                </Button>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Minhas Metas */}
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
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
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
                      </div>
                    </CardContent>
                  </Card>

                  {/* Stats Card */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg">Estatísticas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                          <div className="text-3xl font-bold text-primary">{currentLevel}</div>
                          <div className="text-sm text-muted-foreground">Nível Atual</div>
                        </div>
                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                          <div className="text-3xl font-bold text-accent">{currentXP}</div>
                          <div className="text-sm text-muted-foreground">XP Total</div>
                        </div>
                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                          <div className="text-3xl font-bold text-primary">{userCoins}</div>
                          <div className="text-sm text-muted-foreground">Moedas</div>
                        </div>
                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                          <div className="text-3xl font-bold text-accent">{goals.length}</div>
                          <div className="text-sm text-muted-foreground">Metas Ativas</div>
                        </div>
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
