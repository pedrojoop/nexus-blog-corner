import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, MessageSquare, KanbanSquare, Clock, Ticket, Users, Trophy, Target, Zap, Brain, BarChart3, TrendingUp, Award, Rocket, Shield, Heart, Sparkles, Check, GitBranch, LineChart } from "lucide-react";
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
    { icon: Brain, title: "IA para Predição de Risco de Turnover", description: "Identificação precoce de colaboradores em risco de saída" },
    { icon: BarChart3, title: "Analytics Avançado", description: "Dashboard com métricas de engajamento em tempo real" },
    { icon: TrendingUp, title: "Insights Preditivos", description: "Análises inteligentes para otimização da retenção" },
    { icon: Award, title: "Leaderboard de Engajamento", description: "Ranking de colaboradores mais engajados" },
    { icon: Shield, title: "Prevenção Proativa", description: "Alertas automáticos para RH sobre riscos de rotatividade" },
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
      <section ref={section1.ref} className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
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

            {/* Split Layout */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Feature List */}
              <div 
                className="space-y-6"
                style={{
                  animation: section1.isVisible ? 'slide-up 0.6s ease-out both' : 'none'
                }}
              >
                {productivityFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className="group flex items-start gap-4 p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-nexus-accent hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-nexus-green to-nexus-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Check className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-nexus-green mb-2 group-hover:text-nexus-accent transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Visual Mockup */}
              <div 
                className="relative"
                style={{
                  animation: section1.isVisible ? 'fade-in 0.8s ease-out 0.3s both' : 'none'
                }}
              >
                <div className="relative bg-gradient-to-br from-nexus-green to-nexus-accent rounded-3xl p-8 shadow-2xl">
                  {/* Mockup: Kanban + Chat */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-nexus-green">Hub de Produtividade</h3>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                    </div>
                    
                    {/* Mini Kanban */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {['A Fazer', 'Em Progresso', 'Concluído'].map((col, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs font-semibold text-gray-600 mb-2">{col}</p>
                          <div className="space-y-2">
                            <div className="bg-white rounded p-2 shadow-sm">
                              <div className="w-full h-2 bg-nexus-green-lighter rounded"></div>
                            </div>
                            {idx < 2 && (
                              <div className="bg-white rounded p-2 shadow-sm">
                                <div className="w-2/3 h-2 bg-nexus-green-lighter rounded"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat Preview */}
                    <div className="flex items-center gap-3 p-3 bg-nexus-green-lighter rounded-lg">
                      <MessageSquare className="h-5 w-5 text-nexus-accent" />
                      <div className="flex-1">
                        <div className="w-24 h-2 bg-nexus-accent/30 rounded mb-1"></div>
                        <div className="w-32 h-2 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Icons */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center animate-float">
                    <KanbanSquare className="h-8 w-8 text-nexus-accent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Engajamento */}
      <section ref={section2.ref} className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-nexus-accent/10 border-2 border-nexus-accent rounded-full px-4 py-2 mb-4">
                <Heart className="h-5 w-5 text-nexus-accent" />
                <span className="text-nexus-accent font-semibold">Módulo 02</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-nexus-green mb-4">
                Engajamento e RH Estratégico
              </h2>
              <p className="text-xl text-gray-600">
                O coração da prevenção ao turnover - cultura que retém talentos
              </p>
            </div>

            {/* Split Layout - Reversed */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Visual Mockup (Gamification) */}
              <div 
                className="relative order-2 lg:order-1"
                style={{
                  animation: section2.isVisible ? 'fade-in 0.8s ease-out 0.3s both' : 'none'
                }}
              >
                <div className="relative bg-gradient-to-br from-nexus-accent to-nexus-green rounded-3xl p-8 shadow-2xl">
                  {/* Mockup: Gamification System */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg mb-3">
                        <Trophy className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-nexus-green mb-1">Nível 12</h3>
                      <p className="text-sm text-gray-600">Expert em Engajamento</p>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-xs text-gray-600 mb-2">
                        <span>3,250 XP</span>
                        <span>4,000 XP</span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-nexus-accent to-nexus-green rounded-full"></div>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="grid grid-cols-4 gap-3">
                      {[Trophy, Award, Target, Heart].map((Icon, idx) => (
                        <div 
                          key={idx} 
                          className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-nexus-green-lighter to-white rounded-xl border-2 border-nexus-green-lighter"
                        >
                          <Icon className="h-6 w-6 text-nexus-accent mb-1" />
                          <div className="w-full h-1 bg-nexus-accent rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Floating Icon */}
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center animate-float">
                    <Sparkles className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>
              </div>

              {/* Right: Feature List */}
              <div 
                className="space-y-6 order-1 lg:order-2"
                style={{
                  animation: section2.isVisible ? 'slide-up 0.6s ease-out both' : 'none'
                }}
              >
                {engagementFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className="group flex items-start gap-4 p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-nexus-accent hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-nexus-accent to-nexus-green rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-nexus-green mb-2 group-hover:text-nexus-accent transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}

                {/* CaaS Highlight */}
                <div className="p-6 bg-gradient-to-br from-nexus-green-lighter to-white rounded-2xl border-2 border-nexus-accent shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-nexus-accent rounded-xl flex items-center justify-center">
                      <GitBranch className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-nexus-green mb-2">CaaS - Construtor de Rituais</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Crie e automatize rituais culturais personalizados que fortalecem sua cultura organizacional
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Inteligência */}
      <section ref={section3.ref} className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232e4f4f' fill-opacity='1'%3E%3Cpath d='M0 20L20 0L40 20L20 40Z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-nexus-green-lighter border-2 border-nexus-accent rounded-full px-4 py-2 mb-4 shadow-lg shadow-nexus-accent/20">
                <Brain className="h-5 w-5 text-nexus-accent" />
                <span className="text-nexus-green font-semibold">Módulo 03 - O Diferencial</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-nexus-green mb-4">
                Inteligência e Prevenção
              </h2>
              <p className="text-xl text-gray-600">
                IA Preditiva que antecipa riscos e protege seu maior ativo: os talentos
              </p>
            </div>

            {/* Split Layout */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Feature Cards with Glow */}
              <div 
                className="space-y-6"
                style={{
                  animation: section3.isVisible ? 'slide-up 0.6s ease-out both' : 'none'
                }}
              >
                {intelligenceFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className="group relative p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-nexus-accent hover:shadow-2xl hover:shadow-nexus-accent/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
                  >
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-nexus-green-lighter to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-nexus-green to-nexus-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-nexus-accent/30">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-nexus-green mb-2 group-hover:text-nexus-accent transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Data Graph Visualization */}
              <div 
                className="relative"
                style={{
                  animation: section3.isVisible ? 'fade-in 0.8s ease-out 0.3s both' : 'none'
                }}
              >
                <div className="relative bg-gradient-to-br from-nexus-green to-nexus-accent rounded-3xl p-8 shadow-2xl shadow-nexus-accent/30">
                  {/* Mockup: Predictive Analytics */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-nexus-green">Predição de Turnover</h3>
                      <div className="flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-semibold text-red-700">3 Alertas</span>
                      </div>
                    </div>
                    
                    {/* Simplified Graph */}
                    <div className="relative h-48 mb-6">
                      {/* Grid Lines */}
                      <div className="absolute inset-0 flex flex-col justify-between">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="border-t border-gray-200"></div>
                        ))}
                      </div>
                      
                      {/* Trend Line with Arrow */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
                        {/* Background area */}
                        <path
                          d="M 0 180 Q 100 150, 200 120 T 400 60 L 400 200 L 0 200 Z"
                          fill="url(#gradient1)"
                          opacity="0.2"
                        />
                        {/* Main line */}
                        <path
                          d="M 0 180 Q 100 150, 200 120 T 400 60"
                          stroke="hsl(155, 85%, 35%)"
                          strokeWidth="3"
                          fill="none"
                          className="drop-shadow-lg"
                        />
                        {/* Data points */}
                        <circle cx="100" cy="150" r="6" fill="hsl(155, 70%, 15%)" />
                        <circle cx="200" cy="120" r="6" fill="hsl(155, 70%, 15%)" />
                        <circle cx="300" cy="90" r="6" fill="hsl(155, 70%, 15%)" />
                        <circle cx="400" cy="60" r="6" fill="#dc2626" className="animate-pulse" />
                        
                        {/* Gradient definition */}
                        <defs>
                          <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="hsl(155, 85%, 35%)" />
                            <stop offset="100%" stopColor="hsl(155, 70%, 15%)" />
                          </linearGradient>
                        </defs>
                      </svg>
                      
                      {/* Risk Alert Arrow */}
                      <div className="absolute top-8 right-12 flex flex-col items-center animate-bounce">
                        <div className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg mb-1">
                          Risco Alto
                        </div>
                        <div className="w-0.5 h-8 bg-red-500"></div>
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-red-500"></div>
                      </div>
                    </div>

                    {/* Risk Indicators */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-2xl font-bold text-green-600">82%</div>
                        <div className="text-xs text-gray-600 mt-1">Retenção</div>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="text-2xl font-bold text-yellow-600">5</div>
                        <div className="text-xs text-gray-600 mt-1">Médio</div>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="text-2xl font-bold text-red-600">3</div>
                        <div className="text-xs text-gray-600 mt-1">Alto Risco</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Icon */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center animate-float">
                    <LineChart className="h-8 w-8 text-nexus-accent" />
                  </div>
                </div>

                {/* Accent decoration */}
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-nexus-accent/20 rounded-full blur-3xl opacity-50"></div>
              </div>
            </div>
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
