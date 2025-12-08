import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Users, CheckCircle, AlertTriangle, Plus, TrendingUp, Target, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Ritual {
  id: number;
  name: string;
  frequency: string;
  participants: number;
  successRate: number;
  nextDate: string;
  status: 'active' | 'warning' | 'completed';
  department: string;
}

const CaaSDemo = () => {
  const { toast } = useToast();
  const [rituals, setRituals] = useState<Ritual[]>([
    { id: 1, name: "Daily Standup", frequency: "Diário", participants: 12, successRate: 95, nextDate: "Hoje, 09:00", status: 'active', department: "Tecnologia" },
    { id: 2, name: "Retrospectiva Sprint", frequency: "Quinzenal", participants: 8, successRate: 88, nextDate: "15/01", status: 'active', department: "Produto" },
    { id: 3, name: "1:1 com Gestor", frequency: "Semanal", participants: 45, successRate: 62, nextDate: "Amanhã", status: 'warning', department: "Todos" },
    { id: 4, name: "All Hands", frequency: "Mensal", participants: 150, successRate: 92, nextDate: "28/01", status: 'active', department: "Empresa" },
    { id: 5, name: "Review de Cultura", frequency: "Trimestral", participants: 25, successRate: 78, nextDate: "Março", status: 'active', department: "RH" },
  ]);

  const stats = {
    totalRituals: 5,
    activeParticipants: 240,
    avgSuccessRate: 83,
    ritualsThisWeek: 12
  };

  const handleCreateRitual = () => {
    const newRitual: Ritual = {
      id: Date.now(),
      name: "Novo Ritual",
      frequency: "Semanal",
      participants: 0,
      successRate: 0,
      nextDate: "A definir",
      status: 'active',
      department: "A definir"
    };
    setRituals([newRitual, ...rituals]);
    toast({
      title: "Ritual criado!",
      description: "Configure os detalhes do novo ritual.",
    });
  };

  const handleCheckIn = (ritualId: number) => {
    setRituals(rituals.map(r => 
      r.id === ritualId ? { ...r, successRate: Math.min(100, r.successRate + 2) } : r
    ));
    toast({
      title: "Check-in realizado!",
      description: "Sua participação foi registrada.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'warning': return 'bg-amber-100 text-amber-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSuccessColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[500px] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-600" />
            <h3 className="font-semibold text-foreground text-sm">Culture as a Service</h3>
          </div>
          <Button size="sm" className="h-7 text-xs" onClick={handleCreateRitual}>
            <Plus className="h-3 w-3 mr-1" />
            Novo Ritual
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 p-3 bg-muted/20 border-b">
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">{stats.totalRituals}</p>
          <p className="text-[9px] text-muted-foreground">Rituais</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-primary">{stats.activeParticipants}</p>
          <p className="text-[9px] text-muted-foreground">Participantes</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-green-600">{stats.avgSuccessRate}%</p>
          <p className="text-[9px] text-muted-foreground">Taxa Média</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-amber-600">{stats.ritualsThisWeek}</p>
          <p className="text-[9px] text-muted-foreground">Esta Semana</p>
        </div>
      </div>

      {/* Alerts */}
      {rituals.some(r => r.successRate < 70) && (
        <div className="mx-4 mt-3 p-2 rounded-lg bg-amber-50 border border-amber-200 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <p className="text-xs text-amber-700">
            {rituals.filter(r => r.successRate < 70).length} ritual(is) precisam de atenção
          </p>
        </div>
      )}

      {/* Rituals List */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {rituals.map((ritual) => (
            <div 
              key={ritual.id} 
              className={`p-3 rounded-lg border transition-all hover:shadow-md ${
                ritual.successRate < 70 ? 'border-amber-300 bg-amber-50/50' : 'border-muted hover:border-primary/50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-medium">{ritual.name}</h4>
                    <Badge className={`text-[9px] px-1.5 py-0 ${getStatusColor(ritual.status)}`}>
                      {ritual.frequency}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {ritual.participants} pessoas
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {ritual.nextDate}
                    </span>
                    <span>{ritual.department}</span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="h-7 text-xs"
                  onClick={() => handleCheckIn(ritual.id)}
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Check-in
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground">Taxa de Sucesso:</span>
                <Progress 
                  value={ritual.successRate} 
                  className="flex-1 h-2"
                />
                <span className={`text-xs font-medium ${getSuccessColor(ritual.successRate)}`}>
                  {ritual.successRate}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Impact Section */}
      <div className="p-3 border-t bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-xs font-medium text-green-700">Impacto Medido</span>
          </div>
          <div className="flex gap-4 text-[10px]">
            <span className="text-green-700">+23% Engajamento</span>
            <span className="text-green-700">-15% Turnover</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaaSDemo;
