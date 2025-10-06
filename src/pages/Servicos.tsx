import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, MessageSquare, KanbanSquare, Clock, Ticket, Users, Trophy, Target, Zap, Brain, BarChart3, TrendingUp, Award, Rocket, Shield, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Servicos = () => {
  const section1 = useScrollAnimation();
  const section2 = useScrollAnimation();
  const section3 = useScrollAnimation();

  const productivityFeatures = [
    { icon: FileText, title: "Gestão de Documentos", description: "Armazenamento seguro e organizado com capacidade ilimitada" },
    { icon: MessageSquare, title: "Chat de Voz e Vídeo", description: "Comunicação em tempo real integrada à plataforma" },
    { icon: KanbanSquare, title: "Quadro Kanban", description: "Gestão visual de tarefas e projetos" },
    { icon: Clock, title: "Time Tracking Avançado", description: "Monitoramento preciso de tempo e produtividade" },
    { icon: Ticket, title: "Sistema de Tickets", description: "Gestão eficiente de solicitações internas" },
  ];

  const engagementFeatures = [
    { icon: Users, title: "Sistema Completo de RH", description: "Onboarding, Offboarding e Sistema de Ponto integrado" },
    { icon: Trophy, title: "Gamificação e Níveis", description: "Sistema de níveis, recompensas e conquistas" },
    { icon: Target, title: "Metas e Desafios", description: "Definição e acompanhamento de objetivos da equipe" },
    { icon: Zap, title: "Reconhecimento Instantâneo", description: "Valorize colaboradores em tempo real" },
    { icon: Rocket, title: "Sistema de Recrutamento", description: "Processo seletivo integrado e automatizado" },
  ];

  const intelligenceFeatures = [
    { icon: Brain, title: "IA para Predição de Risco", description: "Identificação precoce de burnout e turnover" },
    { icon: BarChart3, title: "Analytics Avançado", description: "Dashboard com métricas de engajamento em tempo real" },
    { icon: TrendingUp, title: "Insights Preditivos", description: "Análises inteligentes para tomada de decisão" },
    { icon: Award, title: "Leaderboard de Engajamento", description: "Ranking de colaboradores mais engajados" },
    { icon: Shield, title: "Prevenção Proativa", description: "Alertas automáticos para RH sobre riscos" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-nexus-green-lighter/30">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-nexus-green via-nexus-green-light to-nexus-accent py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-2 mb-8">
            <Sparkles className="h-5 w-5 text-white" />
            <span className="text-white font-medium">Plataforma Completa</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            O Hub Completo para<br />Pessoas e Produtividade
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            Conheça a suíte de soluções que unifica gestão e engajamento em uma única plataforma.
          </p>
          
          <Link to="/auth">
            <Button size="lg" className="bg-white text-nexus-green hover:bg-white/90 shadow-2xl text-lg px-8 py-6 h-auto">
              Começar Gratuitamente <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Section 1: Produtividade */}
      <section ref={section1.ref} className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-nexus-green-lighter rounded-full px-4 py-2 mb-4">
              <Rocket className="h-5 w-5 text-nexus-accent" />
              <span className="text-nexus-green font-semibold">Módulo 01</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-nexus-green mb-4">
              Produtividade e Colaboração
            </h2>
            <p className="text-xl text-gray-600">
              Ferramentas essenciais para o dia a dia da sua equipe
            </p>
          </div>

          <div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            style={{
              animation: section1.isVisible ? 'slide-up 0.6s ease-out both' : 'none'
            }}
          >
            {productivityFeatures.map((feature, index) => (
              <Card 
                key={index}
                className="group border-2 border-nexus-green-lighter hover:border-nexus-accent bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-nexus-green to-nexus-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-nexus-green mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Engajamento */}
      <section ref={section2.ref} className="py-24 bg-gradient-to-br from-nexus-green-lighter/40 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-nexus-accent/10 border-2 border-nexus-accent rounded-full px-4 py-2 mb-4">
              <Heart className="h-5 w-5 text-nexus-accent" />
              <span className="text-nexus-accent font-semibold">Módulo 02</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-nexus-green mb-4">
              Engajamento e RH Estratégico
            </h2>
            <p className="text-xl text-gray-600">
              Soluções que resolvem a dor de burnout e turnover
            </p>
          </div>

          <div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            style={{
              animation: section2.isVisible ? 'slide-up 0.6s ease-out 0.2s both' : 'none'
            }}
          >
            {engagementFeatures.map((feature, index) => (
              <Card 
                key={index}
                className="group border-2 border-nexus-green-lighter hover:border-nexus-accent bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-nexus-accent to-nexus-green rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-nexus-green mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Inteligência */}
      <section ref={section3.ref} className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-nexus-accent/10 border-2 border-nexus-accent rounded-full px-4 py-2 mb-4">
              <Brain className="h-5 w-5 text-nexus-accent" />
              <span className="text-nexus-accent font-semibold">Módulo 03</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-nexus-green mb-4">
              Inteligência e Prevenção
            </h2>
            <p className="text-xl text-gray-600">
              O diferencial de dados e IA para decisões estratégicas
            </p>
          </div>

          <div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            style={{
              animation: section3.isVisible ? 'slide-up 0.6s ease-out 0.3s both' : 'none'
            }}
          >
            {intelligenceFeatures.map((feature, index) => (
              <Card 
                key={index}
                className="group border-2 border-nexus-green-lighter hover:border-nexus-accent bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-nexus-green to-nexus-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-nexus-green mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-br from-nexus-green via-nexus-green-light to-nexus-accent relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Pronto para Transformar<br />sua Cultura Organizacional?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Comece hoje com 14 dias grátis e veja o impacto real na sua equipe.
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-white text-nexus-green hover:bg-white/90 shadow-2xl text-lg px-10 py-7 h-auto">
              Iniciar Gratuitamente <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-nexus-green to-nexus-accent rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-2xl font-bold text-nexus-green">Nexus Community</span>
            </div>
            
            <p className="text-gray-600">
              © 2025 Nexus Community. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Servicos;
