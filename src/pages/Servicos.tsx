import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, FileText, MessageSquare, KanbanSquare, Clock, Ticket, Users, Trophy, Target, Zap, Brain, BarChart3, TrendingUp, Award, Rocket, Shield, Heart, GitBranch, BookOpen, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Servicos = () => {
  const section1 = useScrollAnimation();
  const section2 = useScrollAnimation();
  const section3 = useScrollAnimation();
  const section4 = useScrollAnimation();

  const productivityFeatures = [
    "Gestão de Documentos",
    "Chat de Voz e Vídeo",
    "Quadro Kanban",
    "Time Tracking Avançado",
    "Sistema de Tickets",
    "Calendário Compartilhado"
  ];

  const engagementFeatures = [
    "Sistema Completo de RH",
    "Onboarding Automatizado",
    "Offboarding",
    "Registro de Ponto",
    "Banco de Horas",
    "2ª Via do Holerite"
  ];

  const learningFeatures = [
    "Cursos Personalizados",
    "Trilhas de Aprendizagem",
    "Biblioteca de Cursos",
    "Quizzes Interativos",
    "Certificações",
    "Gamificação de Cursos"
  ];

  const cultureFeatures = [
    "Gamificação Completa",
    "PDI (Plano de Desenvolvimento)",
    "Ranking de Engajamento",
    "Lojinha de Recompensas",
    "Reuniões 1:1",
    "Jornada do Colaborador"
  ];

  return (
    <div className="min-h-screen bg-warm-cream">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
            <span className="inline-block text-warm-terracotta font-medium tracking-wide">
              nossos serviços
            </span>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] text-warm-brown">
              O Hub Completo para Pessoas e Produtividade
            </h1>
            
            <p className="text-lg text-warm-brown/70 leading-relaxed max-w-2xl mx-auto">
              Conheça a suíte de soluções que unifica gestão e engajamento em uma única plataforma, 
              transformando a experiência dos seus colaboradores.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/contato">
                <Button 
                  size="lg" 
                  className="bg-warm-brown hover:bg-warm-brown/90 text-warm-cream rounded-full text-base px-8 py-6 font-medium transition-all duration-300 hover:shadow-lg"
                >
                  Agendar demonstração
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent text-warm-brown border-2 border-warm-brown/30 hover:border-warm-brown/60 hover:bg-warm-brown/5 rounded-full text-base font-medium px-8 py-6 transition-all duration-300"
                >
                  Começar Grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Comunicação e Produtividade */}
      <section ref={section1.ref} className="py-20 md:py-32 border-t border-warm-brown/10">
        <div className="container mx-auto px-4">
          <div className={`max-w-6xl mx-auto transition-all duration-700 ${section1.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-warm-terracotta font-medium">Comunicação Interna</span>
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-warm-brown leading-tight">
                  Transforme a comunicação com ferramentas integradas
                </h2>
                <p className="text-warm-brown/70 leading-relaxed">
                  Centralize toda a comunicação da sua empresa em um único lugar, 
                  aumentando a produtividade e colaboração entre equipes.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {productivityFeatures.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-warm-brown/70">
                      <CheckCircle className="w-4 h-4 text-warm-terracotta flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 pt-6">
                  <Link to="/contato">
                    <Button className="rounded-full bg-warm-brown text-warm-cream hover:bg-warm-brown/90">
                      agendar demonstração
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="bg-gradient-to-br from-warm-terracotta/10 to-warm-gold/10 rounded-3xl p-8 aspect-square flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-warm-terracotta/5 to-transparent" />
                <div className="relative space-y-4 w-full max-w-xs">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-warm-terracotta/20 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-warm-terracotta" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-warm-brown">Chat em tempo real</p>
                        <p className="text-[10px] text-warm-brown/60">3 mensagens novas</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float animation-delay-200 ml-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-warm-gold/20 flex items-center justify-center">
                        <KanbanSquare className="w-5 h-5 text-warm-gold" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-warm-brown">Quadro Kanban</p>
                        <p className="text-[10px] text-warm-brown/60">5 tarefas pendentes</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float animation-delay-400">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-warm-brown">Documentos</p>
                        <p className="text-[10px] text-warm-brown/60">Armazenamento ilimitado</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: RH Digital */}
      <section ref={section2.ref} className="py-20 md:py-32 bg-warm-brown/5">
        <div className="container mx-auto px-4">
          <div className={`max-w-6xl mx-auto transition-all duration-700 ${section2.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 bg-gradient-to-br from-emerald-100/50 to-green-100/50 rounded-3xl p-8 aspect-square flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/30 to-transparent" />
                <div className="relative space-y-4 w-full max-w-xs">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Users className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-warm-brown">Onboarding</p>
                        <p className="text-[10px] text-warm-brown/60">Novo colaborador: João Silva</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float animation-delay-200 ml-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-warm-brown">Registro de Ponto</p>
                        <p className="text-[10px] text-warm-brown/60">Entrada: 08:00 • Saída: 17:00</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float animation-delay-400">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Ticket className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-warm-brown">Holerite</p>
                        <p className="text-[10px] text-warm-brown/60">Disponível para download</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <span className="text-emerald-600 font-medium">RH Digital</span>
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-warm-brown leading-tight">
                  Eleve a gestão de pessoas com jornadas mais simples
                </h2>
                <p className="text-warm-brown/70 leading-relaxed">
                  Automatize processos de RH e ofereça uma experiência moderna para seus colaboradores, 
                  desde o primeiro dia até o desligamento.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {engagementFeatures.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-warm-brown/70">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 pt-6">
                  <Link to="/contato">
                    <Button className="rounded-full bg-warm-brown text-warm-cream hover:bg-warm-brown/90">
                      agendar demonstração
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Capacitação */}
      <section ref={section3.ref} className="py-20 md:py-32 border-t border-warm-brown/10">
        <div className="container mx-auto px-4">
          <div className={`max-w-6xl mx-auto transition-all duration-700 ${section3.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-blue-600 font-medium">Capacitação Corporativa</span>
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-warm-brown leading-tight">
                  Transforme o aprendizado com trilhas personalizadas
                </h2>
                <p className="text-warm-brown/70 leading-relaxed">
                  Crie uma universidade corporativa completa, com cursos, trilhas de aprendizagem 
                  e certificações para desenvolver seu time.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {learningFeatures.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-warm-brown/70">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 pt-6">
                  <Link to="/contato">
                    <Button className="rounded-full bg-warm-brown text-warm-cream hover:bg-warm-brown/90">
                      agendar demonstração
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-100/50 to-indigo-100/50 rounded-3xl p-8 aspect-square flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-transparent" />
                <div className="relative space-y-4 w-full max-w-xs">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-warm-brown">Trilha de Liderança</p>
                        <p className="text-[10px] text-warm-brown/60">75% concluído</p>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
                          <div className="w-3/4 h-full bg-blue-600 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float animation-delay-200 ml-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Award className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-warm-brown">Certificação</p>
                        <p className="text-[10px] text-warm-brown/60">3 certificados obtidos</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float animation-delay-400">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Gamepad2 className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-warm-brown">Quiz Semanal</p>
                        <p className="text-[10px] text-warm-brown/60">+150 XP ganhos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Cultura e Engajamento */}
      <section ref={section4.ref} className="py-20 md:py-32 bg-warm-brown/5">
        <div className="container mx-auto px-4">
          <div className={`max-w-6xl mx-auto transition-all duration-700 ${section4.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 bg-gradient-to-br from-amber-100/50 to-orange-100/50 rounded-3xl p-8 aspect-square flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 to-transparent" />
                <div className="relative space-y-4 w-full max-w-xs">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-warm-brown">Nível 12</p>
                        <p className="text-[10px] text-warm-brown/60">Expert em Engajamento</p>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
                          <div className="w-4/5 h-full bg-amber-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float animation-delay-200 ml-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <Target className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-warm-brown">Meta do Mês</p>
                        <p className="text-[10px] text-warm-brown/60">90% atingido • +500 XP</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float animation-delay-400">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-red-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-warm-brown">Reconhecimento</p>
                        <p className="text-[10px] text-warm-brown/60">12 kudos recebidos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <span className="text-amber-600 font-medium">Cultura & Engajamento</span>
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-warm-brown leading-tight">
                  Fortaleça a cultura e engaje seu time
                </h2>
                <p className="text-warm-brown/70 leading-relaxed">
                  Utilize gamificação, reconhecimento e ferramentas de desenvolvimento para criar 
                  um ambiente de trabalho engajador e reter seus melhores talentos.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {cultureFeatures.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-warm-brown/70">
                      <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 pt-6">
                  <Link to="/contato">
                    <Button className="rounded-full bg-warm-brown text-warm-cream hover:bg-warm-brown/90">
                      agendar demonstração
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Section Highlight */}
      <section className="py-20 md:py-32 bg-warm-brown text-warm-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-warm-cream/10 rounded-full px-4 py-2">
              <Brain className="w-5 h-5 text-warm-gold" />
              <span className="text-warm-gold font-medium">Inteligência Artificial</span>
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal leading-tight">
              IA Preditiva para Prevenção de Turnover
            </h2>
            
            <p className="text-warm-cream/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Nossa inteligência artificial analisa dados de engajamento e comportamento para prever 
              riscos de saída, permitindo ações preventivas antes que seja tarde demais.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 pt-8">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-warm-cream/10 flex items-center justify-center mx-auto">
                  <TrendingUp className="w-7 h-7 text-warm-gold" />
                </div>
                <h3 className="font-serif text-xl font-medium">Análise Preditiva</h3>
                <p className="text-warm-cream/60 text-sm">
                  Identificação precoce de colaboradores em risco de desligamento
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-warm-cream/10 flex items-center justify-center mx-auto">
                  <BarChart3 className="w-7 h-7 text-warm-gold" />
                </div>
                <h3 className="font-serif text-xl font-medium">Dashboard Inteligente</h3>
                <p className="text-warm-cream/60 text-sm">
                  Métricas de engajamento e insights em tempo real
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-warm-cream/10 flex items-center justify-center mx-auto">
                  <Shield className="w-7 h-7 text-warm-gold" />
                </div>
                <h3 className="font-serif text-xl font-medium">Alertas Proativos</h3>
                <p className="text-warm-cream/60 text-sm">
                  Notificações automáticas para o RH sobre riscos identificados
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-warm-brown leading-tight">
              Pronto para transformar sua empresa?
            </h2>
            
            <p className="text-warm-brown/70 text-lg max-w-2xl mx-auto">
              Junte-se a milhares de empresas que já utilizam nossa plataforma para 
              engajar colaboradores e reter talentos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/contato">
                <Button 
                  size="lg" 
                  className="bg-warm-brown hover:bg-warm-brown/90 text-warm-cream rounded-full text-base px-8 py-6 font-medium transition-all duration-300 hover:shadow-lg"
                >
                  Agendar demonstração
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent text-warm-brown border-2 border-warm-brown/30 hover:border-warm-brown/60 hover:bg-warm-brown/5 rounded-full text-base font-medium px-8 py-6 transition-all duration-300"
                >
                  Começar Grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-warm-brown/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-medium text-warm-brown">Nexus</span>
            </div>
            <p className="text-sm text-warm-brown/60">
              © 2024 Nexus. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Servicos;
