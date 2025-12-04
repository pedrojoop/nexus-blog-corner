import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Sparkles, AlertTriangle, BarChart3, Users, TrendingUp, Activity, Shield, BookOpen, Award, Play, Eye, Clock, DollarSign, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { DashboardMockup } from "@/components/DashboardMockup";
import { InteractiveDemoModal } from "@/components/InteractiveDemoModal";

const Index = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  
  const problemSection = useScrollAnimation();
  const solutionSection = useScrollAnimation();
  const howItWorksSection = useScrollAnimation();
  const pricingSection = useScrollAnimation();
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
      
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Glow Orbs - Only visible in dark mode */}
        <div className="glow-orb glow-orb-gold w-96 h-96 -top-48 -left-48 animate-pulse-glow" />
        <div className="glow-orb glow-orb-green w-[500px] h-[500px] top-1/2 right-0 translate-x-1/2 -translate-y-1/2 animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="glow-orb glow-orb-gold w-64 h-64 bottom-0 left-1/3 animate-pulse-glow" style={{ animationDelay: '3s' }} />
        
        {/* Radial gradient - theme adaptive */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.1)_0%,_transparent_70%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            {/* Left Side - Text Content */}
            <div className="space-y-8 animate-fade-in-up">
              <Badge className="bg-primary/10 text-primary border border-primary/20 text-sm px-4 py-2 font-medium">
                Plataforma de Diagnóstico de Cultura para Empresas Híbridas
              </Badge>
              
              <h1 className="font-space text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-foreground">
                Sua cultura remota é uma{" "}
                <span className="text-primary relative inline-block">
                  'caixa-preta'
                  <span className="absolute -inset-1 bg-primary/20 blur-lg rounded-lg -z-10" />
                </span>?
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                O Nexus é o primeiro <strong className="text-foreground font-semibold">Diagnóstico de Cultura</strong> para empresas híbridas. 
                Nossa IA identifica o risco de burnout a nível de time — sem vigiar pessoas — e lhe dá as ações para resolver.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link to="/contato">
                  <Button 
                    size="lg" 
                    className="btn-gold group text-base px-10 py-7"
                  >
                    Agende seu Diagnóstico 
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => setIsDemoModalOpen(true)}
                  className="bg-transparent text-foreground hover:text-primary border border-border hover:border-primary/50 hover:bg-primary/5 text-base font-medium px-8 py-7 transition-all duration-300"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Testar Demo
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-6 text-muted-foreground text-sm pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="font-medium">14 dias grátis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="font-medium">Setup em minutos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="font-medium">Dados anônimos</span>
                </div>
              </div>
            </div>
            
            {/* Right Side - Floating 3D Dashboard */}
            <div className="relative lg:block hidden animate-fade-in-up animation-delay-400">
              <DashboardMockup variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Glass Cards */}
      <section ref={problemSection.ref} className="py-24 md:py-32 relative overflow-hidden">
        {/* Background glow */}
        <div className="glow-orb glow-orb-gold w-80 h-80 top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-5xl mx-auto text-center space-y-8 transition-all duration-700 ${problemSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-5 py-2 rounded-full border border-destructive/20">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-semibold">A Dor do Trabalho Híbrido</span>
            </div>
            
            <h2 className="font-space text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              No trabalho híbrido, você não vê o burnout chegar.<br />
              <span className="text-muted-foreground">Você só recebe o pedido de demissão.</span>
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              No escritório, você via o isolamento e a sobrecarga. No home-office, você só tem dados de produtividade 
              e ignora os dados de cultura. <strong className="text-foreground">Você só descobre o problema na entrevista de desligamento</strong> — e aí, é tarde demais.
            </p>
            
            {/* Glass Cards Grid */}
            <div className="grid md:grid-cols-3 gap-6 pt-12">
              <div className="glass-card p-8 text-center space-y-4 hover-lift group">
                <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Eye className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="font-space font-bold text-xl text-foreground">Visibilidade Zero</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Você não vê isolamento ou sobrecarga acontecendo</p>
              </div>
              
              <div className="glass-card p-8 text-center space-y-4 hover-lift group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-space font-bold text-xl text-foreground">Reação Tardia</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Você só age quando já perdeu o talento</p>
              </div>
              
              <div className="glass-card p-8 text-center space-y-4 hover-lift group">
                <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <DollarSign className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="font-space font-bold text-xl text-foreground">Custos Ocultos</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Turnover custa 6-9 meses de salário por pessoa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - HUD Style */}
      <section ref={solutionSection.ref} className="py-24 md:py-32 relative overflow-hidden">
        {/* Connecting line animation placeholder */}
        <div className="absolute left-1/2 top-0 w-px h-32 bg-gradient-to-b from-transparent via-primary to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-6xl mx-auto space-y-12 transition-all duration-700 ${solutionSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center space-y-6">
              <Badge className="bg-primary/10 text-primary border border-primary/20 text-sm px-5 py-2">
                A Solução
              </Badge>
              
              <h2 className="font-space text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                De 'Caixa-Preta' para{" "}
                <span className="text-primary">'Painel de Ação'</span>
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Apresentamos o <strong className="text-foreground">Nexus Diagnóstico</strong>: a primeira IA que detecta o risco de burnout a nível de time,
                sem vigiar pessoas. Transforme dados brutos em ações de cultura com um clique.
              </p>
            </div>

            {/* HUD Dashboard Preview */}
            <div className="relative">
              <div className="glass-card p-8 md:p-12">
                <DashboardMockup variant="solution" />
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 gap-8 pt-8">
              <div className="glass-card-gold p-8 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Activity className="w-7 h-7 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-space font-bold text-xl text-foreground">O Diagnóstico (O Cérebro)</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Nossa IA analisa dados agregados e anônimos (sem vigiar indivíduos) e identifica padrões sistêmicos de risco.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card-gold p-8 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-7 h-7 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-space font-bold text-xl text-foreground">A Ação (Os Botões)</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Um diagnóstico sem ação é inútil. Nossa IA sugere ações de cultura (CaaS) que você pode disparar com um clique.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksSection.ref} className="py-24 md:py-32 relative overflow-hidden">
        <div className="glow-orb glow-orb-green w-96 h-96 top-0 right-0 translate-x-1/2 -translate-y-1/2 opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-6xl mx-auto text-center space-y-12 transition-all duration-700 ${howItWorksSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="space-y-6">
              <Badge className="bg-secondary text-secondary-foreground border border-border text-sm px-5 py-2">
                Como Funciona
              </Badge>
              
              <h2 className="font-space text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Uma plataforma que seu time ama usar.<br />
                <span className="text-muted-foreground">E que gera os dados que você precisa.</span>
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Descubra como o Nexus transforma o engajamento em dados acionáveis para a sua cultura.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card p-8 space-y-4 hover-lift group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-space font-bold text-xl text-foreground">LMS & Gamificação</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Gere crescimento para o time e dados de engajamento para a IA.
                </p>
              </div>

              <div className="glass-card p-8 space-y-4 hover-lift group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-space font-bold text-xl text-foreground">Analytics de Cultura</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Transforme interações em métricas de saúde organizacional.
                </p>
              </div>

              <div className="glass-card p-8 space-y-4 hover-lift group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-space font-bold text-xl text-foreground">Privacidade First</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dados agregados e anônimos. Sem vigilância individual.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Minimalist Glass */}
      <section ref={pricingSection.ref} className="py-24 md:py-32 relative overflow-hidden">
        <div className="glow-orb glow-orb-gold w-80 h-80 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-5xl mx-auto space-y-12 transition-all duration-700 ${pricingSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center space-y-6">
              <Badge className="bg-primary/10 text-primary border border-primary/20 text-sm px-5 py-2">
                Preços
              </Badge>
              
              <h2 className="font-space text-4xl md:text-5xl font-bold text-foreground">
                Escolha seu plano
              </h2>
              
              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-4">
                <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>Mensal</span>
                <button
                  onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                  className="relative w-14 h-7 bg-secondary rounded-full border border-border transition-colors"
                >
                  <span className={`absolute top-1 w-5 h-5 bg-primary rounded-full transition-transform ${billingCycle === 'annual' ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
                <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-foreground' : 'text-muted-foreground'}`}>Anual <span className="text-primary">(2 meses grátis)</span></span>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Engage Plan */}
              <div className="glass-card p-8 space-y-6 hover-lift">
                <div>
                  <h3 className="font-space font-bold text-xl text-foreground mb-2">Engage</h3>
                  <p className="text-muted-foreground text-sm">Para times que querem começar</p>
                </div>
                <div className="space-y-1">
                  <span className="font-space text-4xl font-bold text-foreground">
                    R${billingCycle === 'monthly' ? pricing.engage.monthly : Math.round(pricing.engage.annual / 12)}
                  </span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                <ul className="space-y-3">
                  {['LMS & Gamificação', 'Analytics básico', 'Até 50 usuários', 'Suporte por email'].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-muted-foreground text-sm">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full bg-transparent border-border text-foreground hover:bg-primary/5 hover:border-primary/50">
                  Começar
                </Button>
              </div>

              {/* Diagnose Plan - Featured */}
              <div className="glass-card-gold p-8 space-y-6 hover-lift relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1 font-semibold">
                    Popular
                  </Badge>
                </div>
                <div>
                  <h3 className="font-space font-bold text-xl text-foreground mb-2">Diagnose</h3>
                  <p className="text-muted-foreground text-sm">Diagnóstico completo de cultura</p>
                </div>
                <div className="space-y-1">
                  <span className="font-space text-4xl font-bold text-foreground">
                    R${billingCycle === 'monthly' ? pricing.diagnose.monthly : Math.round(pricing.diagnose.annual / 12)}
                  </span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                <ul className="space-y-3">
                  {['Tudo do Engage', 'IA Diagnóstico de Burnout', 'Ações CaaS integradas', 'Até 200 usuários', 'Suporte prioritário'].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-muted-foreground text-sm">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full btn-gold">
                  Começar Agora
                </Button>
              </div>

              {/* Enterprise Plan */}
              <div className="glass-card p-8 space-y-6 hover-lift">
                <div>
                  <h3 className="font-space font-bold text-xl text-foreground mb-2">Enterprise</h3>
                  <p className="text-muted-foreground text-sm">Para grandes organizações</p>
                </div>
                <div className="space-y-1">
                  <span className="font-space text-4xl font-bold text-foreground">Custom</span>
                </div>
                <ul className="space-y-3">
                  {['Tudo do Diagnose', 'SSO & integrações', 'Usuários ilimitados', 'SLA dedicado', 'Onboarding premium'].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-muted-foreground text-sm">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full bg-transparent border-border text-foreground hover:bg-primary/5 hover:border-primary/50">
                  Falar com Vendas
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaSection.ref} className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.1)_0%,_transparent_70%)]" />
        <div className="glow-orb glow-orb-gold w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-4xl mx-auto text-center space-y-8 transition-all duration-700 ${ctaSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-space text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Pronto para transformar sua{" "}
              <span className="text-primary">cultura organizacional</span>?
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Junte-se a centenas de empresas que já estão usando o Nexus para construir culturas mais saudáveis e produtivas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/contato">
                <Button size="lg" className="btn-gold group text-base px-10 py-7">
                  Agende sua Demo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/sobre">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-transparent text-foreground hover:text-primary border border-border hover:border-primary/50 hover:bg-primary/5 text-base font-medium px-8 py-7"
                >
                  Conheça a Nexus
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl font-space">N</span>
              </div>
              <span className="text-xl font-bold text-foreground font-space">Nexus</span>
            </div>
            
            <nav className="flex flex-wrap items-center justify-center gap-6">
              <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link>
              <Link to="/servicos" className="text-sm text-muted-foreground hover:text-primary transition-colors">Serviços</Link>
              <Link to="/sobre" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sobre</Link>
              <Link to="/contato" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contato</Link>
            </nav>
            
            <p className="text-sm text-muted-foreground/60">
              © 2024 Nexus Community. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      <InteractiveDemoModal open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen} />
    </div>
  );
};

export default Index;
