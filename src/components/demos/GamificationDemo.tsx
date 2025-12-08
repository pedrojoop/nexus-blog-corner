import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Gift, Target, Medal, Zap, Crown, TrendingUp, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface User {
  id: number;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNext: number;
  rank: number;
  badges: number;
  coins: number;
}

interface Reward {
  id: number;
  name: string;
  description: string;
  cost: number;
  category: string;
  available: boolean;
}

interface Achievement {
  id: number;
  name: string;
  description: string;
  xp: number;
  completed: boolean;
  progress: number;
}

const GamificationDemo = () => {
  const { toast } = useToast();
  
  const [user] = useState<User>({
    id: 1,
    name: "Você",
    avatar: "VC",
    level: 12,
    xp: 2450,
    xpToNext: 3000,
    rank: 5,
    badges: 8,
    coins: 350
  });

  const [rewards] = useState<Reward[]>([
    { id: 1, name: "Day Off", description: "Um dia de folga extra", cost: 500, category: "Benefício", available: true },
    { id: 2, name: "Vale Presente", description: "R$100 em vale presente", cost: 300, category: "Financeiro", available: true },
    { id: 3, name: "Curso Premium", description: "Acesso a curso externo", cost: 400, category: "Educação", available: true },
    { id: 4, name: "Almoço VIP", description: "Almoço com a diretoria", cost: 200, category: "Experiência", available: true },
  ]);

  const [achievements] = useState<Achievement[]>([
    { id: 1, name: "Primeiro Passo", description: "Complete seu primeiro curso", xp: 100, completed: true, progress: 100 },
    { id: 2, name: "Colaborador Ativo", description: "Faça 10 posts no feed", xp: 150, completed: true, progress: 100 },
    { id: 3, name: "Mentor", description: "Ajude 5 colegas", xp: 200, completed: false, progress: 60 },
    { id: 4, name: "Inovador", description: "Sugira 3 melhorias aprovadas", xp: 300, completed: false, progress: 33 },
  ]);

  const [leaderboard] = useState([
    { rank: 1, name: "Ana Costa", avatar: "AC", xp: 5200, level: 18 },
    { rank: 2, name: "Pedro Lima", avatar: "PL", xp: 4800, level: 16 },
    { rank: 3, name: "Maria Silva", avatar: "MS", xp: 4100, level: 15 },
    { rank: 4, name: "João Santos", avatar: "JS", xp: 3500, level: 13 },
    { rank: 5, name: "Você", avatar: "VC", xp: 2450, level: 12, isUser: true },
  ]);

  const handleRedeemReward = (reward: Reward) => {
    if (reward.cost > user.coins) {
      toast({
        title: "Moedas insuficientes",
        description: `Você precisa de ${reward.cost - user.coins} moedas a mais.`,
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Recompensa resgatada! 🎉",
      description: `Você resgatou: ${reward.name}`,
    });
  };

  const handleClaimAchievement = (achievement: Achievement) => {
    if (!achievement.completed) {
      toast({
        title: "Conquista em progresso",
        description: `Faltam ${100 - achievement.progress}% para completar.`,
      });
      return;
    }
    toast({
      title: "XP Coletado! ⭐",
      description: `+${achievement.xp} XP adicionados!`,
    });
  };

  const progressPercent = (user.xp / user.xpToNext) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[500px] flex flex-col">
      {/* Header - User Stats */}
      <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 px-4 py-3 border-b">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-12 w-12 border-2 border-amber-400">
              <AvatarFallback className="bg-gradient-to-br from-amber-400 to-orange-500 text-white font-bold">
                {user.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-[10px] font-bold px-1.5 rounded-full">
              {user.level}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-foreground">{user.name}</span>
              <Crown className="h-4 w-4 text-amber-500" />
            </div>
            <div className="flex items-center gap-2">
              <Progress value={progressPercent} className="flex-1 h-2" />
              <span className="text-[10px] text-muted-foreground">{user.xp}/{user.xpToNext}</span>
            </div>
          </div>
          <div className="flex gap-3 text-center">
            <div>
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-amber-500" />
                <span className="text-sm font-bold">{user.coins}</span>
              </div>
              <span className="text-[9px] text-muted-foreground">Moedas</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <Medal className="h-3 w-3 text-amber-500" />
                <span className="text-sm font-bold">{user.badges}</span>
              </div>
              <span className="text-[9px] text-muted-foreground">Badges</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="ranking" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-3 grid grid-cols-3 h-8">
          <TabsTrigger value="ranking" className="text-xs">Ranking</TabsTrigger>
          <TabsTrigger value="conquistas" className="text-xs">Conquistas</TabsTrigger>
          <TabsTrigger value="loja" className="text-xs">Loja</TabsTrigger>
        </TabsList>

        <TabsContent value="ranking" className="flex-1 overflow-hidden m-0">
          <ScrollArea className="h-full p-4">
            <div className="space-y-2">
              {leaderboard.map((player: any) => (
                <div 
                  key={player.rank}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    player.isUser 
                      ? 'bg-primary/5 border-primary/30' 
                      : 'border-muted hover:bg-muted/30'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    player.rank === 1 ? 'bg-amber-400 text-white' :
                    player.rank === 2 ? 'bg-gray-300 text-gray-700' :
                    player.rank === 3 ? 'bg-amber-600 text-white' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {player.rank <= 3 ? (
                      <Trophy className="h-4 w-4" />
                    ) : (
                      player.rank
                    )}
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={`text-xs ${player.isUser ? 'bg-primary text-white' : 'bg-primary/20 text-primary'}`}>
                      {player.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${player.isUser ? 'text-primary' : ''}`}>
                      {player.name} {player.isUser && '(Você)'}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Nível {player.level}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">{player.xp.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">XP</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="conquistas" className="flex-1 overflow-hidden m-0">
          <ScrollArea className="h-full p-4">
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  onClick={() => handleClaimAchievement(achievement)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    achievement.completed 
                      ? 'bg-green-50 border-green-200 hover:bg-green-100' 
                      : 'border-muted hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      achievement.completed ? 'bg-green-500' : 'bg-muted'
                    }`}>
                      <Star className={`h-5 w-5 ${achievement.completed ? 'text-white' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">{achievement.name}</h4>
                        <Badge variant="outline" className="text-[9px]">+{achievement.xp} XP</Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground">{achievement.description}</p>
                      {!achievement.completed && (
                        <Progress value={achievement.progress} className="h-1.5 mt-2" />
                      )}
                    </div>
                    {achievement.completed && (
                      <span className="text-green-600 text-xs font-medium">Completado!</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="loja" className="flex-1 overflow-hidden m-0">
          <ScrollArea className="h-full p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Loja de Recompensas</span>
              <Badge className="bg-amber-100 text-amber-700">
                <Zap className="h-3 w-3 mr-1" />
                {user.coins} moedas
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {rewards.map((reward) => (
                <div 
                  key={reward.id}
                  className="p-3 rounded-lg border border-muted hover:border-primary/50 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mb-2">
                    <Gift className="h-5 w-5 text-amber-600" />
                  </div>
                  <h4 className="text-xs font-medium mb-0.5">{reward.name}</h4>
                  <p className="text-[9px] text-muted-foreground mb-2">{reward.description}</p>
                  <Button 
                    size="sm" 
                    className="w-full h-6 text-[10px]"
                    variant={reward.cost <= user.coins ? "default" : "outline"}
                    onClick={() => handleRedeemReward(reward)}
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    {reward.cost}
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GamificationDemo;
