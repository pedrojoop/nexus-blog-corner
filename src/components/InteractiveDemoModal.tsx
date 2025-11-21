import { useState } from "react";
import { X, AlertTriangle, TrendingDown, Calendar, Users, Zap, CheckCircle } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InteractiveDemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InteractiveDemoModal = ({ open, onOpenChange }: InteractiveDemoModalProps) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNextStep = () => {
    if (step === 2) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(3);
      }, 2000);
    } else {
      setStep(step + 1);
    }
  };

  const handleClose = () => {
    setStep(1);
    setIsProcessing(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-7xl h-[90vh] p-0 gap-0 bg-background overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-50 rounded-full bg-background/80 backdrop-blur-sm p-2 hover:bg-background/90 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dashboard Simulation */}
        <div className="flex h-full w-full">
          {/* Sidebar */}
          <div className="w-64 bg-nexus-green text-white p-6 flex flex-col">
            <div className="mb-8">
              <h2 className="text-2xl font-bold">Nexus</h2>
              <p className="text-sm text-white/70">Demo Interativa</p>
            </div>
            
            <nav className="space-y-2 flex-1">
              <div className={`px-4 py-2 rounded-lg ${step === 1 ? 'bg-white/20' : 'bg-white/5'}`}>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">Alertas</span>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-lg ${step === 2 ? 'bg-white/20' : 'bg-white/5'}`}>
                <div className="flex items-center gap-3">
                  <TrendingDown className="w-5 h-5" />
                  <span className="font-medium">Diagnóstico</span>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-lg ${step === 3 ? 'bg-white/20' : 'bg-white/5'}`}>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5" />
                  <span className="font-medium">Ações</span>
                </div>
              </div>
            </nav>

            {/* Step Indicator */}
            <div className="mt-auto">
              <div className="text-xs text-white/60 mb-2">Passo {step} de 3</div>
              <div className="flex gap-1">
                <div className={`h-1 flex-1 rounded ${step >= 1 ? 'bg-nexus-accent' : 'bg-white/20'}`} />
                <div className={`h-1 flex-1 rounded ${step >= 2 ? 'bg-nexus-accent' : 'bg-white/20'}`} />
                <div className={`h-1 flex-1 rounded ${step >= 3 ? 'bg-nexus-accent' : 'bg-white/20'}`} />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col bg-muted/30">
            {/* Header */}
            <div className="h-16 bg-background border-b px-8 flex items-center">
              <h3 className="text-lg font-semibold">
                {step === 1 && "Dashboard - Alertas em Tempo Real"}
                {step === 2 && "Análise Detalhada - Time de Engenharia"}
                {step === 3 && "Ação Executada com Sucesso"}
              </h3>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 overflow-auto">
              {/* Step 1: Alert */}
              {step === 1 && (
                <div className="animate-fade-in">
                  <div className="mb-6">
                    <h4 className="text-2xl font-bold mb-2">Alertas Críticos</h4>
                    <p className="text-muted-foreground">
                      Nossa IA identificou padrões de risco em tempo real
                    </p>
                  </div>

                  <div 
                    onClick={handleNextStep}
                    className="max-w-2xl bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-2 border-red-500/50 rounded-xl p-8 cursor-pointer hover:scale-[1.02] transition-transform shadow-xl relative overflow-hidden group"
                  >
                    {/* Pulsing indicator */}
                    <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 animate-pulse" />
                      </div>
                      <div>
                        <div className="text-sm text-red-600 dark:text-red-400 font-semibold mb-1">
                          ALERTA DE RISCO CRÍTICO
                        </div>
                        <h5 className="text-xl font-bold text-foreground mb-2">
                          Time de Engenharia
                        </h5>
                        <p className="text-muted-foreground">
                          Detectamos sinais precoces de sobrecarga e desengajamento
                        </p>
                      </div>
                    </div>

                    {/* Mini Chart */}
                    <div className="bg-background/50 rounded-lg p-4 mb-4">
                      <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-red-500" />
                        Engajamento (Últimos 30 dias)
                      </div>
                      <svg viewBox="0 0 200 60" className="w-full h-16">
                        <polyline
                          points="0,15 40,20 80,10 120,25 160,40 200,50"
                          fill="none"
                          stroke="rgb(239, 68, 68)"
                          strokeWidth="2"
                        />
                        <circle cx="200" cy="50" r="3" fill="rgb(239, 68, 68)" />
                      </svg>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-red-500" />
                        <span className="text-foreground">8 membros em risco</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-red-500" />
                        <span className="text-foreground">Rituais: 40% adesão</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-center gap-2 text-foreground font-semibold group-hover:text-nexus-green transition-colors">
                      <span>Clique para Investigar</span>
                      <span className="text-2xl animate-pulse">→</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Diagnosis */}
              {step === 2 && (
                <div className="animate-fade-in">
                  <div className="mb-6">
                    <h4 className="text-2xl font-bold mb-2">Diagnóstico da IA</h4>
                    <p className="text-muted-foreground">
                      Análise profunda dos dados de cultura e comportamento
                    </p>
                  </div>

                  <div className="max-w-3xl space-y-6">
                    {/* AI Analysis Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-300 dark:border-blue-800 rounded-xl p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-lg mb-2 text-foreground">Causa Raiz Identificada</h5>
                          <p className="text-foreground/90 leading-relaxed">
                            O time está <strong>sobrecarregado</strong> após o último sprint. 
                            A análise mostra <strong>baixa adesão aos rituais de 1:1</strong> e 
                            ausência de pausas estruturadas nos últimos 14 dias.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Insights */}
                    <div className="bg-background border rounded-xl p-6 space-y-4">
                      <h6 className="font-semibold text-foreground mb-3">Insights Detalhados:</h6>
                      
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                        <div>
                          <div className="font-medium text-foreground">3 Desenvolvedores Sêniores</div>
                          <div className="text-sm text-muted-foreground">Sem interação social há 5 dias consecutivos</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 pb-3 border-b">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                        <div>
                          <div className="font-medium text-foreground">Rituais de 1:1</div>
                          <div className="text-sm text-muted-foreground">Apenas 40% de adesão (meta: 85%)</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                        <div>
                          <div className="font-medium text-foreground">Horas Extras</div>
                          <div className="text-sm text-muted-foreground">Aumento de 35% nas últimas 2 semanas</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="bg-gradient-to-r from-nexus-green to-nexus-green-light rounded-xl p-8 text-center">
                      <h5 className="text-white font-bold text-xl mb-3">
                        Ação Recomendada pela IA
                      </h5>
                      <p className="text-white/90 mb-6">
                        Implementar ritual de descompressão e reforçar conexões 1:1
                      </p>
                      <Button
                        onClick={handleNextStep}
                        disabled={isProcessing}
                        className="bg-white text-nexus-green hover:bg-white/90 font-semibold px-8 py-6 text-lg shadow-xl"
                      >
                        {isProcessing ? (
                          <span className="flex items-center gap-2">
                            <span className="w-5 h-5 border-2 border-nexus-green border-t-transparent rounded-full animate-spin" />
                            Processando...
                          </span>
                        ) : (
                          "Gerar Ação de Correção (CaaS)"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Success */}
              {step === 3 && (
                <div className="animate-fade-in flex items-center justify-center h-full">
                  <div className="max-w-2xl text-center">
                    {/* Success Animation */}
                    <div className="mb-8 flex justify-center">
                      <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center animate-scale-in">
                        <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
                      </div>
                    </div>

                    <h4 className="text-3xl font-bold text-foreground mb-4">
                      Ação Executada com Sucesso! 🎉
                    </h4>
                    
                    <p className="text-xl text-muted-foreground mb-8">
                      Ritual de <strong className="text-foreground">"Descompressão em Equipe"</strong> agendado 
                      e alertas de prioridade enviados para os gestores.
                    </p>

                    {/* Results */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-300 dark:border-green-800 rounded-xl p-6 mb-8">
                      <h5 className="font-semibold text-foreground mb-4">O que foi feito:</h5>
                      <div className="space-y-3 text-left">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">
                            Ritual de "Team Recharge Day" agendado para quinta-feira
                          </span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">
                            Notificações enviadas aos 3 desenvolvedores para 1:1s
                          </span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">
                            Alerta de carga de trabalho enviado aos gestores
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="space-y-4">
                      <Button
                        onClick={() => {
                          handleClose();
                          // Scroll to contact section
                          const contactSection = document.getElementById('contato');
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="bg-nexus-green hover:bg-nexus-green/90 text-white font-semibold px-8 py-6 text-lg shadow-xl"
                      >
                        Quero isso na minha empresa
                      </Button>
                      
                      <div>
                        <button
                          onClick={() => setStep(1)}
                          className="text-muted-foreground hover:text-foreground text-sm underline"
                        >
                          Ver novamente
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
