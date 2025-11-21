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
  const [selectedRitual, setSelectedRitual] = useState<string | null>(null);

  const handleNextStep = () => {
    if (step === 3) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(4);
      }, 2000);
    } else {
      setStep(step + 1);
    }
  };

  const handleRitualSelect = (ritual: string) => {
    setSelectedRitual(ritual);
    setStep(3);
  };

  const handleClose = () => {
    setStep(1);
    setIsProcessing(false);
    setSelectedRitual(null);
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
                  <span className="font-medium">Dashboard</span>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-lg ${step === 2 ? 'bg-white/20' : 'bg-white/5'}`}>
                <div className="flex items-center gap-3">
                  <TrendingDown className="w-5 h-5" />
                  <span className="font-medium">CaaS Library</span>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-lg ${step === 3 ? 'bg-white/20' : 'bg-white/5'}`}>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5" />
                  <span className="font-medium">Configuração</span>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-lg ${step === 4 ? 'bg-white/20' : 'bg-white/5'}`}>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Impacto</span>
                </div>
              </div>
            </nav>

            {/* Step Indicator */}
            <div className="mt-auto">
              <div className="text-xs text-white/60 mb-2">Passo {step} de 4</div>
              <div className="flex gap-1">
                <div className={`h-1 flex-1 rounded ${step >= 1 ? 'bg-nexus-accent' : 'bg-white/20'}`} />
                <div className={`h-1 flex-1 rounded ${step >= 2 ? 'bg-nexus-accent' : 'bg-white/20'}`} />
                <div className={`h-1 flex-1 rounded ${step >= 3 ? 'bg-nexus-accent' : 'bg-white/20'}`} />
                <div className={`h-1 flex-1 rounded ${step >= 4 ? 'bg-nexus-accent' : 'bg-white/20'}`} />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col bg-muted/30">
            {/* Header */}
            <div className="h-16 bg-background border-b px-8 flex items-center">
              <h3 className="text-lg font-semibold">
                {step === 1 && "Dashboard - Diagnóstico Rico"}
                {step === 2 && "Biblioteca de Rituais (CaaS)"}
                {step === 3 && "Configuração de Ritual"}
                {step === 4 && "Impacto Projetado"}
              </h3>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 overflow-auto">
              {/* Step 1: Dashboard Rico */}
              {step === 1 && (
                <div className="animate-fade-in">
                  <div className="mb-6">
                    <h4 className="text-2xl font-bold mb-2">Dashboard - Diagnóstico em Tempo Real</h4>
                    <p className="text-muted-foreground">
                      Visão completa da saúde cultural da sua organização
                    </p>
                  </div>

                  {/* Context Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-background border rounded-lg p-4">
                      <div className="text-sm text-muted-foreground mb-1">eNPS Geral</div>
                      <div className="text-2xl font-bold text-foreground">+42</div>
                      <div className="text-xs text-green-600 dark:text-green-400">+5 vs mês anterior</div>
                    </div>
                    <div className="bg-background border rounded-lg p-4">
                      <div className="text-sm text-muted-foreground mb-1">Taxa de Turnover</div>
                      <div className="text-2xl font-bold text-foreground">8.2%</div>
                      <div className="text-xs text-green-600 dark:text-green-400">-2.1% vs mês anterior</div>
                    </div>
                    <div className="bg-background border rounded-lg p-4">
                      <div className="text-sm text-muted-foreground mb-1">Engajamento Médio</div>
                      <div className="text-2xl font-bold text-foreground">78%</div>
                      <div className="text-xs text-muted-foreground">Estável</div>
                    </div>
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
                      <span>Analisar Causa Raiz & Agir</span>
                      <span className="text-2xl animate-pulse">→</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: CaaS Library */}
              {step === 2 && (
                <div className="animate-fade-in">
                  <div className="mb-6">
                    <h4 className="text-2xl font-bold mb-2">Biblioteca de Rituais (CaaS)</h4>
                    <p className="text-muted-foreground">
                      Recomendação da IA: Selecione uma Intervenção Cultural
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-6 max-w-5xl">
                    {/* Card A - Recommended */}
                    <div
                      onClick={() => handleRitualSelect('decompression')}
                      className="group relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-2 border-green-500 rounded-xl p-6 cursor-pointer hover:scale-105 hover:shadow-2xl hover:border-nexus-green transition-all"
                    >
                      <div className="absolute -top-3 right-4 bg-nexus-green text-white text-xs font-bold px-3 py-1 rounded-full">
                        RECOMENDADO
                      </div>
                      
                      <div className="text-4xl mb-4">🧊</div>
                      <h5 className="font-bold text-lg mb-3 text-foreground">
                        Quebra-Gelo de Descompressão
                      </h5>
                      <p className="text-sm text-muted-foreground mb-4">
                        Ritual estruturado para aliviar sobrecarga e reconectar o time.
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                          Rápido
                        </span>
                        <span className="text-xs bg-orange-200 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded">
                          Anti-Burnout
                        </span>
                      </div>

                      <div className="text-center font-semibold text-nexus-green group-hover:text-nexus-green-light">
                        Clique para Configurar →
                      </div>
                    </div>

                    {/* Card B */}
                    <div className="bg-background border-2 border-border rounded-xl p-6 hover:border-nexus-green/50 hover:scale-105 transition-all cursor-pointer opacity-80">
                      <div className="text-4xl mb-4">🗣️</div>
                      <h5 className="font-bold text-lg mb-3 text-foreground">
                        Roda de Feedback 1:1
                      </h5>
                      <p className="text-sm text-muted-foreground mb-4">
                        Conversas estruturadas de alinhamento profundo.
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                          Profundo
                        </span>
                        <span className="text-xs bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">
                          Alinhamento
                        </span>
                      </div>
                    </div>

                    {/* Card C */}
                    <div className="bg-background border-2 border-border rounded-xl p-6 hover:border-nexus-green/50 hover:scale-105 transition-all cursor-pointer opacity-80">
                      <div className="text-4xl mb-4">🏆</div>
                      <h5 className="font-bold text-lg mb-3 text-foreground">
                        Kudos Session
                      </h5>
                      <p className="text-sm text-muted-foreground mb-4">
                        Momento dedicado ao reconhecimento público.
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-yellow-200 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
                          Reconhecimento
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <p className="text-sm text-muted-foreground">
                      💡 Cada ritual é baseado em ciências comportamentais e customizado para seu contexto
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Configuration */}
              {step === 3 && (
                <div className="animate-fade-in">
                  <div className="mb-6">
                    <h4 className="text-2xl font-bold mb-2">Configurar Ritual: Quebra-Gelo de Descompressão</h4>
                    <p className="text-muted-foreground">
                      Configure o ritual sem escrever código - tudo no-code
                    </p>
                  </div>

                  <div className="max-w-2xl bg-background border rounded-xl p-8 space-y-6">
                    {/* Config Fields */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Público Alvo
                      </label>
                      <div className="bg-muted/50 border rounded-lg px-4 py-3 text-foreground">
                        Time de Engenharia (8 pessoas)
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Canal de Integração
                      </label>
                      <div className="bg-muted/50 border rounded-lg px-4 py-3 text-foreground flex items-center gap-3">
                        <span className="text-2xl">💬</span>
                        <span>Slack - #engineering-team</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Frequência & Horário
                      </label>
                      <div className="bg-muted/50 border rounded-lg px-4 py-3 text-foreground flex items-center gap-3">
                        <Calendar className="w-5 h-5" />
                        <span>Semanal - Sexta-feira às 16h</span>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-300 dark:border-blue-800 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-foreground">
                            <strong>Preview do Ritual:</strong> O Nexus enviará uma mensagem no Slack toda sexta às 16h com 3 perguntas leves de quebra-gelo para o time responder de forma assíncrona.
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleNextStep}
                        disabled={isProcessing}
                        className="w-full bg-nexus-green hover:bg-nexus-green/90 text-white font-semibold py-6 text-lg shadow-xl animate-pulse"
                      >
                        {isProcessing ? (
                          <span className="flex items-center gap-2">
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Ativando Ritual...
                          </span>
                        ) : (
                          "Disparar Ritual Agora ⚡"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Impact */}
              {step === 4 && (
                <div className="animate-fade-in flex items-center justify-center h-full">
                  <div className="max-w-2xl text-center">
                    {/* Success Animation */}
                    <div className="mb-8 flex justify-center">
                      <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center animate-scale-in">
                        <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
                      </div>
                    </div>

                    <h4 className="text-3xl font-bold text-foreground mb-4">
                      Ritual Ativado com Sucesso! 🎉
                    </h4>
                    
                    <p className="text-xl text-muted-foreground mb-8">
                      O ritual <strong className="text-foreground">"Quebra-Gelo de Descompressão"</strong> está configurado e pronto para rodar automaticamente.
                    </p>

                    {/* Impact Projection */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-300 dark:border-green-800 rounded-xl p-6 mb-8">
                      <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                        Impacto Projetado pela IA
                      </h5>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-background/50 rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-1">Redução de Risco de Burnout</div>
                          <div className="text-3xl font-bold text-green-600 dark:text-green-400">-15%</div>
                          <div className="text-xs text-muted-foreground mt-1">Esperado em 2 semanas</div>
                        </div>
                        <div className="bg-background/50 rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-1">Aumento de Engajamento</div>
                          <div className="text-3xl font-bold text-green-600 dark:text-green-400">+10%</div>
                          <div className="text-xs text-muted-foreground mt-1">Esperado em 3 semanas</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        * Projeções baseadas em dados históricos de +500 times similares
                      </p>
                    </div>

                    {/* Confirmation */}
                    <div className="bg-background border rounded-xl p-6 mb-8">
                      <h5 className="font-semibold text-foreground mb-4">✅ Ritual Configurado:</h5>
                      <div className="space-y-3 text-left">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">
                            Mensagem agendada no Slack #engineering-team para sexta, 16h
                          </span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">
                            Notificações de 1:1 enviadas aos 3 desenvolvedores sêniores
                          </span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">
                            Dashboard de acompanhamento ativado para monitorar evolução
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
                        Começar Teste Grátis
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
