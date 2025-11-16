import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Sparkles, AlertTriangle, BarChart3, Users, TrendingUp, Activity, Shield, BookOpen, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Index = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);
  
  const problemSection = useScrollAnimation();
  const solutionSection = useScrollAnimation();
  const howItWorksSection = useScrollAnimation();
  const pricingSection = useScrollAnimation();
  const visionSection = useScrollAnimation();
  const ctaSection = useScrollAnimation();

  const pricing = {
    engage: {
      monthly: 1290,
      annual: 12900,
    },
    diagnose: {
      monthly: 4790,
      annual: 47900,
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - Split Layout */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-nexus-green via-nexus-green-light to-nexus-green">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-white space-y-8 animate-fade-in">
              <Badge className="bg-nexus-accent/20 text-white border-nexus-accent/40 backdrop-blur-sm text-sm px-4 py-2">
                Plataforma de Diagnóstico de Cultura para Empresas Híbridas e Remotas
              </Badge>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Sua cultura remota é uma <br />
                <span className="text-nexus-accent">
                  'caixa-preta'
                </span>?
              </h1>
              
              <h2 className="text-xl md:text-2xl text-white/95 leading-relaxed font-medium max-w-2xl">
                O Nexus é o primeiro <strong>Diagnóstico de Cultura</strong> para empresas híbridas. 
                Nossa IA identifica o risco de burnout a nível de time — sem vigiar pessoas — e lhe dá as ações para resolver.
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/contato">
                  <Button 
                    size="lg" 
                    className="group bg-nexus-accent text-white hover:bg-nexus-accent/90 shadow-2xl text-lg px-8 py-6 transition-all duration-300 hover:shadow-[0_0_40px_rgba(45,212,191,0.4)] hover:scale-105"
                  >
                    Agende seu Diagnóstico 
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-white/10 text-white hover:bg-white/20 border-2 border-white/30 backdrop-blur-sm text-lg px-8 py-6 transition-all duration-300"
                  >
                    Começar Gratuitamente
                  </Button>
                </Link>
              </div>
              
              <div className="flex flex-wrap gap-6 text-white/90 text-sm pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-nexus-accent" />
                  <span className="font-medium">14 dias grátis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-nexus-accent" />
                  <span className="font-medium">Setup em minutos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-nexus-accent" />
                  <span className="font-medium">Dados agregados e anônimos</span>
                </div>
              </div>
            </div>
            
            {/* Right Side - Product Mockup */}
            <div className="relative animate-slide-up lg:block hidden">
              <div className="relative">
                {/* Glow effect behind mockup */}
                <div className="absolute inset-0 bg-nexus-accent/20 blur-3xl rounded-full scale-110"></div>
                
                {/* Mockup container with subtle animation */}
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 shadow-2xl hover:scale-[1.02] transition-transform duration-500">
                  <img 
                    src="/mockup-dashboard.png"
                    alt="Nexus Dashboard - IA de Diagnóstico de Cultura"
                    className="rounded-xl shadow-2xl w-full"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const placeholder = document.createElement('div');
                        placeholder.className = 'bg-gradient-to-br from-nexus-green-lighter to-white rounded-xl p-8 aspect-video flex items-center justify-center';
                        placeholder.innerHTML = `
                          <div class="text-center space-y-4">
                            <div class="w-16 h-16 mx-auto text-nexus-accent">
                              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                            </div>
                            <p class="text-foreground font-semibold">Dashboard de Diagnóstico de Cultura</p>
                          </div>
                        `;
                        parent.appendChild(placeholder);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section ref={problemSection.ref} className="py-24 md:py-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto text-center space-y-8 transition-all duration-700 ${problemSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-600 px-5 py-2 rounded-full">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-semibold">A Dor do Trabalho Híbrido</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              No trabalho híbrido, você não vê o burnout chegar.<br />
              <span className="text-muted-foreground">Você só recebe o pedido de demissão.</span>
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              No escritório, você via o isolamento e a sobrecarga. No home-office, você só tem dados de produtividade (Jira) 
              e ignora os dados de cultura. <strong className="text-foreground">Você só descobre o problema na entrevista de desligamento</strong> — e aí, é tarde demais.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <Card className="border-red-200/60 bg-gradient-to-b from-red-50/80 to-red-50/40 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto">
                    <AlertTriangle className="h-7 w-7 text-red-600" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground">Visibilidade Zero</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Você não vê isolamento ou sobrecarga acontecendo</p>
                </CardContent>
              </Card>
              
              <Card className="border-orange-200/60 bg-gradient-to-b from-orange-50/80 to-orange-50/40 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto">
                    <Users className="h-7 w-7 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground">Reação Tardia</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Você só age quando já perdeu o talento</p>
                </CardContent>
              </Card>
              
              <Card className="border-red-200/60 bg-gradient-to-b from-red-50/80 to-red-50/40 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto">
                    <TrendingUp className="h-7 w-7 text-red-600" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground">Custos Ocultos</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Turnover custa 6-9 meses de salário por pessoa</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - Interactive Hotspots */}
      <section ref={solutionSection.ref} className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className={`max-w-6xl mx-auto space-y-12 transition-all duration-700 ${solutionSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center space-y-6">
              <Badge className="bg-nexus-accent/10 text-nexus-accent border-nexus-accent/20 text-sm px-5 py-2">
                A Solução
              </Badge>
              
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                De 'Caixa-Preta' para 'Painel de Ação'
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Apresentamos o <strong className="text-foreground">Nexus Diagnóstico</strong>: a primeira IA que detecta o risco de burnout a nível de time,
                sem vigiar pessoas. Transforme dados brutos em ações de cultura com um clique.
              </p>
            </div>

            {/* Interactive Dashboard Preview with Hotspots */}
            <div className="relative">
              {/* Main dashboard image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-muted/40 bg-gradient-to-br from-nexus-green-lighter/20 to-background">
                <img 
                  src="/mockup-dashboard.png"
                  alt="Dashboard IA de Diagnóstico - Interface Completa"
                  className="w-full"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="bg-gradient-to-br from-nexus-green-lighter to-white p-12 aspect-video flex items-center justify-center">
                          <div class="text-center space-y-6 max-w-2xl">
                            <div class="flex gap-4 justify-center">
                              <div class="w-16 h-16 bg-nexus-accent/20 rounded-xl flex items-center justify-center">
                                <svg class="w-8 h-8 text-nexus-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                              </div>
                              <div class="w-16 h-16 bg-orange-500/20 rounded-xl flex items-center justify-center">
                                <svg class="w-8 h-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                              </div>
                            </div>
                            <div>
                              <h3 class="text-2xl font-bold text-foreground mb-2">Dashboard de IA de Diagnóstico</h3>
                              <p class="text-muted-foreground">Alertas em tempo real e sugestões de ação</p>
                            </div>
                          </div>
                        </div>
                      `;
                    }
                  }}
                />
                
                {/* Hotspot 1 - Top Left (Alerta de TI) */}
                <div 
                  className="absolute top-[25%] left-[15%] cursor-pointer group"
                  onMouseEnter={() => setHoveredHotspot('alert')}
                  onMouseLeave={() => setHoveredHotspot(null)}
                >
                  <div className="relative">
                    {/* Pulsing dot */}
                    <div className="w-6 h-6 bg-orange-500 rounded-full animate-ping absolute"></div>
                    <div className="w-6 h-6 bg-orange-500 rounded-full relative border-4 border-white shadow-lg"></div>
                    
                    {/* Tooltip */}
                    {hoveredHotspot === 'alert' && (
                      <div className="absolute left-8 top-0 w-72 bg-white rounded-xl shadow-2xl p-6 border border-muted z-10 animate-fade-in">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <AlertTriangle className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground mb-1">Alerta Sistêmico</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Identificamos a queda de engajamento <strong>antes</strong> que vire turnover.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Hotspot 2 - Bottom Right (Ação Recomendada) */}
                <div 
                  className="absolute bottom-[30%] right-[15%] cursor-pointer group"
                  onMouseEnter={() => setHoveredHotspot('action')}
                  onMouseLeave={() => setHoveredHotspot(null)}
                >
                  <div className="relative">
                    {/* Pulsing dot */}
                    <div className="w-6 h-6 bg-nexus-accent rounded-full animate-ping absolute"></div>
                    <div className="w-6 h-6 bg-nexus-accent rounded-full relative border-4 border-white shadow-lg"></div>
                    
                    {/* Tooltip */}
                    {hoveredHotspot === 'action' && (
                      <div className="absolute right-8 bottom-0 w-72 bg-white rounded-xl shadow-2xl p-6 border border-muted z-10 animate-fade-in">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-nexus-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-5 h-5 text-nexus-accent" />
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground mb-1">Ação Inteligente</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Nossa IA não aponta só o problema; ela sugere a <strong>ação de cultura (CaaS)</strong> para resolvê-lo.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-8 pt-8">
              <Card className="bg-gradient-to-br from-nexus-green-lighter/30 to-background border-nexus-accent/20 hover:border-nexus-accent/40 transition-all duration-300 hover:shadow-xl">
                <CardContent className="flex items-start gap-4 p-8">
                  <div className="w-14 h-14 rounded-2xl bg-nexus-accent/10 flex items-center justify-center flex-shrink-0">
                    <Activity className="w-7 h-7 text-nexus-accent" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-foreground">O Diagnóstico (O Cérebro)</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Nossa IA analisa dados agregados e anônimos (sem vigiar indivíduos) e identifica padrões sistêmicos de risco.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-nexus-green-lighter/30 to-background border-nexus-accent/20 hover:border-nexus-accent/40 transition-all duration-300 hover:shadow-xl">
                <CardContent className="flex items-start gap-4 p-8">
                  <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-7 h-7 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-foreground">A Ação (Os Botões)</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Um diagnóstico sem ação é inútil. Nossa IA sugere ações de cultura (CaaS) que você pode disparar com um clique.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksSection.ref} className="py-24 md:py-32 bg-gradient-to-b from-muted/50 to-muted/20">
        <div className="container mx-auto px-4">
          <div className={`max-w-6xl mx-auto text-center space-y-12 transition-all duration-700 ${howItWorksSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="space-y-6">
              <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20 text-sm px-5 py-2">
                Como Funciona
              </Badge>
              
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Uma plataforma que seu time ama usar.<br />
                <span className="text-muted-foreground">E que gera os dados que você precisa.</span>
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Descubra como o Nexus transforma o engajamento em dados acionáveis para a sua cultura.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/60 backdrop-blur-sm border-purple-200/40 hover:border-purple-300/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-xl text-foreground">LMS & Gamificação</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Gere crescimento para o time e dados de engajamento para a IA.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-orange-200/40 hover:border-orange-300/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-xl text-foreground">Comunidade (Feed & Eventos)</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Gere conexão para o time e o pulso social para a IA.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-green-200/40 hover:border-green-300/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-xl text-foreground">Rituais (CaaS)</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Gere rituais de cultura para o time e os dados de ação para a IA.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Premium with Toggle */}
      <section ref={pricingSection.ref} className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className={`max-w-6xl mx-auto space-y-12 transition-all duration-700 ${pricingSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center space-y-6">
              <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-sm px-5 py-2">
                Planos & Preços
              </Badge>
              
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Planos que evoluem com a sua cultura.<br />
                <span className="text-muted-foreground">Comece a engajar ou vá direto ao diagnóstico.</span>
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Nossos planos são desenhados para cada fase da sua empresa. Escolha o que melhor se adapta às suas necessidades.
              </p>
              
              {/* Billing Cycle Toggle */}
              <div className="flex items-center justify-center gap-4 pt-4">
                <span className={`text-sm font-medium transition-colors ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Mensal
                </span>
                <button
                  onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                  className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                    billingCycle === 'annual' ? 'bg-nexus-accent' : 'bg-muted'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                      billingCycle === 'annual' ? 'translate-x-8' : 'translate-x-0'
                    }`}
                  />
                </button>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium transition-colors ${billingCycle === 'annual' ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Anual
                  </span>
                  {billingCycle === 'annual' && (
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20 animate-fade-in">
                      Economize 2 meses!
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Engage Plan */}
              <Card className="border-2 border-muted/40 bg-gradient-to-b from-background to-muted/20 hover:border-muted/60 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">Engage</h3>
                    <p className="text-sm text-muted-foreground">A fundação da sua cultura.</p>
                  </div>
                  
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-foreground">
                        R$ {billingCycle === 'monthly' ? '1.290' : '12.900'}
                      </span>
                      <span className="text-muted-foreground">
                        /{billingCycle === 'monthly' ? 'mês' : 'ano'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Para times de até 50 usuários</p>
                  </div>
                  
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">LMS & Gamificação</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Comunidade (Feed & Eventos)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Rituais (CaaS Básico)</span>
                    </li>
                    <li className="flex items-center gap-3 opacity-50">
                      <Shield className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm">Sem a IA de Diagnóstico</span>
                    </li>
                  </ul>
                  
                  <Button className="w-full" variant="outline">Começar Agora</Button>
                </CardContent>
              </Card>

              {/* Diagnose Plan - HIGHLIGHTED */}
              <Card className="relative border-2 border-nexus-accent bg-gradient-to-br from-nexus-green via-nexus-green-light to-nexus-green text-white shadow-2xl hover:shadow-[0_0_60px_rgba(45,212,191,0.3)] transition-all duration-300 scale-105 hover:scale-110">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-nexus-accent text-white border-0 shadow-lg px-4 py-1">
                    Mais Popular
                  </Badge>
                </div>
                
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Diagnose</h3>
                    <p className="text-sm text-white/80">O diagnóstico acionável.</p>
                  </div>
                  
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">
                        R$ {billingCycle === 'monthly' ? '4.790' : '47.900'}
                      </span>
                      <span className="text-white/80">
                        /{billingCycle === 'monthly' ? 'mês' : 'ano'}
                      </span>
                    </div>
                    <p className="text-xs text-white/70 mt-2">Para empresas de até 150 usuários</p>
                  </div>
                  
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-nexus-accent flex-shrink-0" />
                      <span className="text-sm">Tudo do Plano Engage</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-nexus-accent flex-shrink-0" />
                      <span className="text-sm font-bold">✅ A "IA DE DIAGNÓSTICO"</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-nexus-accent flex-shrink-0" />
                      <span className="text-sm">CaaS Avançado</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-nexus-accent flex-shrink-0" />
                      <span className="text-sm">Dashboards de Gestor</span>
                    </li>
                  </ul>
                  
                  <Button className="w-full bg-nexus-accent text-white hover:bg-nexus-accent/90 shadow-lg">
                    Começar Agora
                  </Button>
                </CardContent>
              </Card>

              {/* Enterprise Plan */}
              <Card className="border-2 border-muted/40 bg-gradient-to-b from-background to-muted/20 hover:border-muted/60 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">Enterprise</h3>
                    <p className="text-sm text-muted-foreground">Escala, Inteligência Avançada e Personalização.</p>
                  </div>
                  
                  <div>
                    <span className="text-2xl font-bold text-foreground">Fale Conosco</span>
                    <p className="text-xs text-muted-foreground mt-2">151+ Usuários</p>
                  </div>
                  
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Tudo do Plano Diagnose</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm font-bold">✅ IA Avançada (Benchmarks)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Dashboards C-Level</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Segurança/SSO</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">Opção de White-Label</span>
                    </li>
                  </ul>
                  
                  <Button className="w-full" variant="outline">Fale Conosco</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section ref={visionSection.ref} className="py-24 md:py-32 bg-gradient-to-b from-muted/50 to-muted/20">
        <div className="container mx-auto px-4">
          <div className={`max-w-5xl mx-auto text-center space-y-8 transition-all duration-700 ${visionSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Badge className="bg-sky-500/10 text-sky-600 border-sky-500/20 text-sm px-5 py-2">
              Nossa Visão
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              O benefício que atrai talentos remotos.
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              O Nexus é a prova de que sua empresa investe ativamente em um ambiente de trabalho saudável.
              É a plataforma que você coloca com orgulho na sua página de vagas, mostrando que você não 'adivinha',
              você 'diagnostica' e 'age'.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaSection.ref} className="py-24 md:py-32 bg-gradient-to-br from-nexus-green via-nexus-green-light to-nexus-green text-white">
        <div className="container mx-auto px-4">
          <div className={`max-w-5xl mx-auto text-center space-y-8 transition-all duration-700 ${ctaSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Pare de "voar às cegas". <br className="hidden md:block" />Comece a diagnosticar.
            </h2>
            
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Agende uma conversa de 15 minutos e veja o diagnóstico que podemos gerar para sua cultura.
            </p>
            
            <Link to="/contato">
              <Button 
                size="lg" 
                className="group bg-nexus-accent text-white hover:bg-nexus-accent/90 shadow-2xl text-lg px-10 py-7 transition-all duration-300 hover:shadow-[0_0_50px_rgba(45,212,191,0.5)] hover:scale-105"
              >
                Quero meu Diagnóstico
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div className="md:col-span-2 space-y-4">
                <h3 className="font-bold text-xl text-foreground">Nexus People & Culture</h3>
                <p className="text-muted-foreground leading-relaxed max-w-md">
                  Plataforma de Diagnóstico de Cultura para empresas híbridas e remotas. 
                  Transforme dados de engajamento em ações concretas.
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Produto</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link to="/servicos" className="hover:text-nexus-accent transition-colors">Funcionalidades</Link></li>
                  <li><Link to="/servicos" className="hover:text-nexus-accent transition-colors">Preços</Link></li>
                  <li><Link to="/blog" className="hover:text-nexus-accent transition-colors">Blog</Link></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Empresa</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link to="/sobre" className="hover:text-nexus-accent transition-colors">Sobre</Link></li>
                  <li><Link to="/contato" className="hover:text-nexus-accent transition-colors">Contato</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-border/60 text-center text-sm text-muted-foreground">
              <p>© 2025 Nexus People & Culture. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
