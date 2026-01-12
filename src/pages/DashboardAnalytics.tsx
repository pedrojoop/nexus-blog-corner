import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HardDrive,
  GraduationCap,
  MessageSquare,
  Heart,
  MessageCircle,
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Trophy,
  Gift,
  Target,
  Calendar,
  DollarSign,
  Smile,
  Meh,
  Frown,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Activity,
  Building2,
  Sparkles,
  Crown
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

// Mock Data
const weeklyMoodData = [
  { day: "Seg", humor: 3.8 },
  { day: "Ter", humor: 4.1 },
  { day: "Qua", humor: 3.6 },
  { day: "Qui", humor: 4.3 },
  { day: "Sex", humor: 4.5 },
];

const departmentMoodData = [
  { department: "TI", humor: 4.2 },
  { department: "RH", humor: 4.5 },
  { department: "Marketing", humor: 3.8 },
  { department: "Vendas", humor: 4.0 },
  { department: "Financeiro", humor: 3.9 },
  { department: "Operações", humor: 4.1 },
];

const lmsData = [
  { name: "Concluídos", value: 68, color: "hsl(var(--primary))" },
  { name: "Em Andamento", value: 22, color: "hsl(var(--accent))" },
  { name: "Abandonados", value: 10, color: "hsl(var(--destructive))" },
];

const turnoverData = [
  { month: "Jul", atual: 12, anterior: 18 },
  { month: "Ago", atual: 10, anterior: 16 },
  { month: "Set", atual: 8, anterior: 15 },
  { month: "Out", atual: 7, anterior: 14 },
  { month: "Nov", atual: 6, anterior: 13 },
  { month: "Dez", atual: 5, anterior: 12 },
];

const topColaboradores = [
  { id: 1, nome: "Ana Silva", avatar: "Ana", nivel: 15, xp: 12450, departamento: "TI" },
  { id: 2, nome: "Carlos Santos", avatar: "Carlos", nivel: 14, xp: 11200, departamento: "Marketing" },
  { id: 3, nome: "Mariana Costa", avatar: "Mariana", nivel: 13, xp: 10800, departamento: "RH" },
  { id: 4, nome: "Pedro Lima", avatar: "Pedro", nivel: 12, xp: 9500, departamento: "Vendas" },
  { id: 5, nome: "Julia Ferreira", avatar: "Julia", nivel: 12, xp: 9200, departamento: "Operações" },
];

const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  trendValue,
  color = "primary"
}: { 
  title: string; 
  value: string | number; 
  subtitle?: string; 
  icon: React.ElementType; 
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: "primary" | "accent" | "destructive" | "success";
}) => {
  const colorClasses = {
    primary: "text-primary",
    accent: "text-accent",
    destructive: "text-destructive",
    success: "text-green-500"
  };

  return (
    <Card className="glass-card hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</span>
              {trendValue && trend && (
                <span className={`text-sm flex items-center ${trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-muted-foreground"}`}>
                  {trend === "up" ? <ArrowUpRight className="h-4 w-4" /> : trend === "down" ? <ArrowDownRight className="h-4 w-4" /> : null}
                  {trendValue}
                </span>
              )}
            </div>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-xl bg-primary/10 ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardAnalytics = () => {
  // Calculated metrics
  const storageUsed = 45.8;
  const storageTotal = 100;
  const storagePercent = (storageUsed / storageTotal) * 100;
  
  const totalCursos = 48;
  const mediaConclusao = 68;
  const mediaAbandono = 10;
  
  const totalPosts = 1247;
  const totalLikes = 8934;
  const totalComentarios = 3521;
  
  const turnoverAtual = 5.2;
  const turnoverAnterior = 7.8;
  
  const humorMedio = 4.2;
  const nps = 72;
  const taxaResposta = 87;
  const totalRespostas = 312;
  
  const alertasAtivos = 3;
  const taxaEngajamento = 78;
  const mediaLevelEmpresa = 8.4;
  const recompensasResgatadas = 156;
  
  const taxaSucessoRituais = 82;
  const totalEventos = 24;
  const taxaParticipacaoEventos = 76;
  
  const economiaEstimada = 847000;
  const roiPrograma = 4.2;
  const reducaoTurnover = 28;

  const getMoodIcon = (value: number) => {
    if (value >= 4) return <Smile className="h-8 w-8 text-green-500" />;
    if (value >= 3) return <Meh className="h-8 w-8 text-yellow-500" />;
    return <Frown className="h-8 w-8 text-red-500" />;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-primary" />
              Central de Analytics
            </h1>
            <p className="text-muted-foreground mt-1">
              Visão unificada de métricas de gestão, pessoas e cultura
            </p>
          </div>
          <Badge variant="outline" className="text-sm">
            Última atualização: há 5 min
          </Badge>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="gestao" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 h-12">
            <TabsTrigger value="gestao" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Analytics de Gestão
            </TabsTrigger>
            <TabsTrigger value="people" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              People Analytics
            </TabsTrigger>
            <TabsTrigger value="engajamento" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Engajamento
            </TabsTrigger>
            <TabsTrigger value="cultura" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Cultura e Eventos
            </TabsTrigger>
            <TabsTrigger value="roi" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Impacto (ROI)
            </TabsTrigger>
          </TabsList>

          {/* Seção 1: Analytics de Gestão */}
          <TabsContent value="gestao" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Armazenamento */}
              <Card className="glass-card col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-primary" />
                    Armazenamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">{storageUsed}</span>
                      <span className="text-muted-foreground">GB de {storageTotal} GB</span>
                    </div>
                    <Progress value={storagePercent} className="h-2" />
                    <p className="text-xs text-muted-foreground">{storagePercent.toFixed(1)}% utilizado</p>
                  </div>
                </CardContent>
              </Card>

              {/* Turnover de Plataforma */}
              <MetricCard
                title="Turnover de Plataforma"
                value={`${turnoverAtual}%`}
                subtitle="Rotatividade mensal"
                icon={Users}
                trend="down"
                trendValue={`-${(turnoverAnterior - turnoverAtual).toFixed(1)}%`}
                color="success"
              />

              {/* Posts */}
              <MetricCard
                title="Total de Posts"
                value={totalPosts.toLocaleString()}
                subtitle="Publicações no feed"
                icon={MessageSquare}
                trend="up"
                trendValue="+12%"
                color="primary"
              />

              {/* Likes */}
              <MetricCard
                title="Total de Likes"
                value={totalLikes.toLocaleString()}
                subtitle="Interações positivas"
                icon={Heart}
                trend="up"
                trendValue="+18%"
                color="accent"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de Rosca - LMS */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Educação (LMS)
                  </CardTitle>
                  <CardDescription>Distribuição de status dos cursos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="h-[200px] w-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={lmsData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {lmsData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-8">
                        <span className="text-sm text-muted-foreground">Total de Cursos</span>
                        <span className="text-2xl font-bold text-primary">{totalCursos}</span>
                      </div>
                      <div className="flex items-center justify-between gap-8">
                        <span className="text-sm text-muted-foreground">Média de Conclusão</span>
                        <span className="text-2xl font-bold text-green-500">{mediaConclusao}%</span>
                      </div>
                      <div className="flex items-center justify-between gap-8">
                        <span className="text-sm text-muted-foreground">Média de Abandono</span>
                        <span className="text-2xl font-bold text-destructive">{mediaAbandono}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comunicação Social */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    Comunicação Social
                  </CardTitle>
                  <CardDescription>Métricas de engajamento no feed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-xl bg-primary/5">
                      <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-primary">{totalPosts.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Posts</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-accent/10">
                      <Heart className="h-8 w-8 text-accent mx-auto mb-2" />
                      <p className="text-2xl font-bold text-accent">{totalLikes.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Likes</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-green-500/10">
                      <MessageCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-500">{totalComentarios.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Comentários</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Seção 2: People Analytics */}
          <TabsContent value="people" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Humor Médio */}
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Humor Médio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    {getMoodIcon(humorMedio)}
                    <div>
                      <span className="text-3xl font-bold text-primary">{humorMedio}</span>
                      <span className="text-muted-foreground">/5</span>
                      <p className="text-xs text-muted-foreground">Pesquisa de sexta-feira</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* NPS Organizacional */}
              <MetricCard
                title="NPS Organizacional"
                value={nps}
                subtitle="Índice de satisfação"
                icon={TrendingUp}
                trend="up"
                trendValue="+8 pts"
                color="success"
              />

              {/* Taxa de Resposta */}
              <MetricCard
                title="Taxa de Resposta"
                value={`${taxaResposta}%`}
                subtitle={`${totalRespostas} respostas`}
                icon={Users}
                trend="up"
                trendValue="+5%"
                color="primary"
              />

              {/* Alertas Ativos */}
              <Card className="glass-card border-destructive/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    Alertas Ativos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-destructive">{alertasAtivos}</span>
                    <div>
                      <p className="text-xs text-muted-foreground">Colaboradores precisando de atenção</p>
                      <Badge variant="destructive" className="mt-1">Prioridade Alta</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de Tendência de Humor */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Tendência de Humor Semanal
                  </CardTitle>
                  <CardDescription>Evolução do humor ao longo da semana</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklyMoodData}>
                        <defs>
                          <linearGradient id="colorHumor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                        <YAxis domain={[1, 5]} stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px"
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="humor"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          fill="url(#colorHumor)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Humor por Departamento */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Humor por Departamento
                  </CardTitle>
                  <CardDescription>Comparativo entre áreas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={departmentMoodData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" domain={[0, 5]} stroke="hsl(var(--muted-foreground))" />
                        <YAxis dataKey="department" type="category" width={80} stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px"
                          }}
                        />
                        <Bar dataKey="humor" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Seção 3: Engajamento e Gamificação */}
          <TabsContent value="engajamento" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Taxa de Engajamento"
                value={`${taxaEngajamento}%`}
                subtitle="Interação ativa na plataforma"
                icon={Sparkles}
                trend="up"
                trendValue="+12%"
                color="primary"
              />

              <MetricCard
                title="Média de Nível"
                value={mediaLevelEmpresa}
                subtitle="Nível médio da empresa"
                icon={Trophy}
                trend="up"
                trendValue="+0.8"
                color="accent"
              />

              <MetricCard
                title="Recompensas Resgatadas"
                value={recompensasResgatadas}
                subtitle="No marketplace"
                icon={Gift}
                trend="up"
                trendValue="+24"
                color="success"
              />

              <MetricCard
                title="XP Total Distribuído"
                value="847K"
                subtitle="Pontos de experiência"
                icon={Target}
                trend="up"
                trendValue="+15%"
                color="primary"
              />
            </div>

            {/* TOP 5 Colaboradores */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-500" />
                  TOP 5 Colaboradores Mais Engajados
                </CardTitle>
                <CardDescription>Ranking baseado em XP e participação</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topColaboradores.map((colab, index) => (
                    <div
                      key={colab.id}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:scale-[1.01] ${
                        index === 0 ? "bg-gradient-to-r from-yellow-500/20 to-transparent border border-yellow-500/30" :
                        index === 1 ? "bg-gradient-to-r from-gray-400/20 to-transparent border border-gray-400/30" :
                        index === 2 ? "bg-gradient-to-r from-amber-600/20 to-transparent border border-amber-600/30" :
                        "bg-muted/30"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-2xl font-bold ${
                          index === 0 ? "text-yellow-500" :
                          index === 1 ? "text-gray-400" :
                          index === 2 ? "text-amber-600" :
                          "text-muted-foreground"
                        }`}>
                          #{index + 1}
                        </span>
                        <Avatar className="h-12 w-12 border-2 border-primary/30">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${colab.avatar}`} />
                          <AvatarFallback>{colab.nome.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-foreground">{colab.nome}</p>
                          <p className="text-sm text-muted-foreground">{colab.departamento}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-lg font-bold text-primary">Nível {colab.nivel}</p>
                          <p className="text-xs text-muted-foreground">Rank</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-accent">{colab.xp.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">XP</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Seção 4: Cultura e Eventos (CaaS) */}
          <TabsContent value="cultura" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Taxa de Sucesso em Rituais"
                value={`${taxaSucessoRituais}%`}
                subtitle="Eficácia na reversão de desengajamento"
                icon={Target}
                trend="up"
                trendValue="+8%"
                color="success"
              />

              <MetricCard
                title="Eventos Agendados"
                value={totalEventos}
                subtitle="Próximos 30 dias"
                icon={Calendar}
                trend="up"
                trendValue="+6"
                color="primary"
              />

              <MetricCard
                title="Taxa de Participação"
                value={`${taxaParticipacaoEventos}%`}
                subtitle="Média em eventos"
                icon={Users}
                trend="up"
                trendValue="+11%"
                color="accent"
              />

              <MetricCard
                title="Rituais Ativos"
                value="12"
                subtitle="Em execução"
                icon={Sparkles}
                color="primary"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Rituais por Tipo */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Rituais Mais Efetivos</CardTitle>
                  <CardDescription>Taxa de sucesso por tipo de ritual</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { nome: "1:1 com Gestor", taxa: 92 },
                      { nome: "Retrospectiva de Sprint", taxa: 88 },
                      { nome: "Weekly Team Sync", taxa: 85 },
                      { nome: "Happy Hour Digital", taxa: 78 },
                      { nome: "Café Virtual", taxa: 72 },
                    ].map((ritual) => (
                      <div key={ritual.nome} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{ritual.nome}</span>
                          <span className={`text-sm font-bold ${
                            ritual.taxa >= 85 ? "text-green-500" :
                            ritual.taxa >= 70 ? "text-yellow-500" :
                            "text-red-500"
                          }`}>
                            {ritual.taxa}%
                          </span>
                        </div>
                        <Progress value={ritual.taxa} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Próximos Eventos */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Próximos Eventos</CardTitle>
                  <CardDescription>Agenda da semana</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { nome: "All Hands Meeting", data: "15 Jan", participantes: 234, tipo: "Geral" },
                      { nome: "Tech Talk: IA Generativa", data: "16 Jan", participantes: 89, tipo: "TI" },
                      { nome: "Workshop de Liderança", data: "17 Jan", participantes: 45, tipo: "RH" },
                      { nome: "Happy Hour de Janeiro", data: "19 Jan", participantes: 156, tipo: "Social" },
                    ].map((evento) => (
                      <div key={evento.nome} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Calendar className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{evento.nome}</p>
                            <p className="text-xs text-muted-foreground">{evento.data}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{evento.tipo}</Badge>
                          <p className="text-xs text-muted-foreground mt-1">{evento.participantes} confirmados</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Seção 5: Relatório de Impacto (ROI) */}
          <TabsContent value="roi" className="space-y-6">
            {/* Cards de Destaque */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="glass-card-tech col-span-1 md:col-span-1 bg-gradient-to-br from-primary/10 to-accent/5">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <DollarSign className="h-10 w-10 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Economia Estimada</p>
                      <p className="text-4xl font-bold text-primary">
                        R$ {(economiaEstimada / 1000).toFixed(0)}k
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Em custos de reposição</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card-tech col-span-1 md:col-span-1 bg-gradient-to-br from-accent/10 to-primary/5">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <TrendingUp className="h-10 w-10 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">ROI do Programa</p>
                      <p className="text-4xl font-bold text-accent">{roiPrograma}x</p>
                      <p className="text-xs text-muted-foreground mt-1">Retorno sobre investimento</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card-tech col-span-1 md:col-span-1 bg-gradient-to-br from-green-500/10 to-primary/5">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <TrendingDown className="h-10 w-10 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Redução de Turnover</p>
                      <p className="text-4xl font-bold text-green-500">-{reducaoTurnover}%</p>
                      <p className="text-xs text-muted-foreground mt-1">Comparado ao período anterior</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráfico Comparativo de Turnover */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Evolução do Turnover
                </CardTitle>
                <CardDescription>Comparativo: Período atual vs. anterior</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={turnoverData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                      />
                      <Legend />
                      <Bar dataKey="anterior" name="Período Anterior" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="atual" name="Período Atual" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Insights de ROI */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Insights de Impacto</CardTitle>
                <CardDescription>Análise detalhada do retorno sobre investimento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      titulo: "Custo Médio de Reposição Evitado",
                      valor: "R$ 45.000",
                      desc: "Por colaborador retido",
                      icon: DollarSign
                    },
                    {
                      titulo: "Colaboradores Retidos",
                      valor: "19",
                      desc: "Que teriam saído sem intervenção",
                      icon: Users
                    },
                    {
                      titulo: "Tempo Médio até Intervenção",
                      valor: "3.2 dias",
                      desc: "Da detecção ao ritual",
                      icon: Activity
                    },
                    {
                      titulo: "Taxa de Sucesso de Intervenções",
                      valor: "82%",
                      desc: "Retenção após ritual CaaS",
                      icon: Target
                    },
                  ].map((insight) => (
                    <div key={insight.titulo} className="p-4 rounded-xl bg-muted/30 space-y-2">
                      <div className="flex items-center gap-2">
                        <insight.icon className="h-5 w-5 text-primary" />
                        <span className="text-sm text-muted-foreground">{insight.titulo}</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground">{insight.valor}</p>
                      <p className="text-xs text-muted-foreground">{insight.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardAnalytics;
