import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Users, MessageCircle, BookOpen, Award, Gamepad2, BarChart3, Shield, UserCheck, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { InteractiveDemoModal } from "@/components/InteractiveDemoModal";

const Index = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  
  const featuresSection = useScrollAnimation();
  const modulesSection = useScrollAnimation();
  const ctaSection = useScrollAnimation();

  const trustedLogos = [
    "TechCorp", "InnovateBR", "FutureWork", "SmartHR", "CloudTeam", "DataPulse"
  ];

  return (
    <div className="min-h-screen bg-warm-cream">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
            {/* Left Side - Text Content */}
            <div className="space-y-8 animate-fade-in-up">
              <span className="inline-block text-warm-brown/70 text-sm font-medium tracking-wide">
                sejam bem vindos!
              </span>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] text-warm-brown">
                Empresas fortes começam por dentro.
              </h1>
              
              <p className="text-lg text-warm-brown/70 leading-relaxed max-w-xl">
                Plataforma completa de <strong className="text-warm-brown font-medium">RH Digital</strong>, Comunicação Interna, 
                Universidade Corporativa & Comunidades, para empresas de todos os tamanhos.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link to="/contato">
                  <Button 
                    size="lg" 
                    className="bg-warm-brown hover:bg-warm-brown/90 text-warm-cream rounded-full text-base px-8 py-6 font-medium transition-all duration-300 hover:shadow-lg"
                  >
                    Agendar demonstração
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => setIsDemoModalOpen(true)}
                  className="bg-transparent text-warm-brown border-2 border-warm-brown/30 hover:border-warm-brown/60 hover:bg-warm-brown/5 rounded-full text-base font-medium px-8 py-6 transition-all duration-300"
                >
                  Conhecer a Plataforma
                </Button>
              </div>
              
              {/* Social Proof */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-warm-terracotta to-warm-gold border-2 border-warm-cream flex items-center justify-center"
                    >
                      <Users className="w-4 h-4 text-warm-cream" />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-serif font-medium text-warm-brown">4.9</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-warm-gold text-warm-gold" />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-warm-brown/60"><strong className="text-warm-brown">70k+</strong> usuários engajados</span>
                </div>
              </div>
            </div>
            
            {/* Right Side - Hero Image with Floating Cards */}
            <div className="relative lg:block animate-fade-in-up animation-delay-200">
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-warm-terracotta/20 to-warm-gold/20 aspect-[4/5]">
                  <div className="absolute inset-0 bg-gradient-to-t from-warm-brown/20 to-transparent" />
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=750&fit=crop&crop=face"
                    alt="Profissional sorrindo"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating Card 1 */}
                <div className="absolute top-1/4 -right-4 md:right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-float max-w-[200px]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">JS</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-purple-600 font-medium bg-purple-100 px-2 py-0.5 rounded-full">Universidade</span>
                      <p className="text-xs font-semibold text-warm-brown mt-1">Jéssica Silva</p>
                      <p className="text-[10px] text-warm-brown/60">Concluiu curso: "Inteligência Emocional"</p>
                    </div>
                  </div>
                </div>
                
                {/* Floating Card 2 */}
                <div className="absolute bottom-1/4 -left-4 md:left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-float animation-delay-400 max-w-[200px]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">MP</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded-full">Comunicação</span>
                      <p className="text-xs font-semibold text-warm-brown mt-1">Marcos Paulo</p>
                      <p className="text-[10px] text-warm-brown/60">Fala, amigo! Beleza? Conseguiu terminar?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Logos */}
      <section className="py-12 border-y border-warm-brown/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
            {trustedLogos.map((logo) => (
              <span key={logo} className="text-warm-brown/80 font-serif text-lg font-medium">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresSection.ref} className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto text-center space-y-6 mb-16 transition-all duration-700 ${featuresSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-warm-brown leading-tight">
              Os melhores recursos para um time forte de alta performance
            </h2>
            <Link to="/servicos" className="inline-flex items-center gap-2 text-warm-terracotta hover:text-warm-terracotta/80 font-medium transition-colors">
              mapa de todas as funcionalidades
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section ref={modulesSection.ref} className="pb-20 md:pb-32">
        <div className="container mx-auto px-4">
          <div className={`max-w-6xl mx-auto space-y-24 transition-all duration-700 ${modulesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Module 1 - Comunicação Interna */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-warm-terracotta font-medium">Comunicação Interna</span>
                <h3 className="font-serif text-2xl md:text-3xl font-normal text-warm-brown leading-tight">
                  Transforme a comunicação interna com as funcionalidades que sua empresa precisa!
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Rede Social Corporativa', 'Nuvem de Arquivos', 'Chat', 'Organograma', 'Pop-up', 'Aniversariantes'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-warm-brown/70">
                      <CheckCircle className="w-4 h-4 text-warm-terracotta flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 pt-4">
                  <Link to="/servicos">
                    <Button variant="outline" className="rounded-full border-warm-brown/30 text-warm-brown hover:bg-warm-brown/5">
                      comunicação interna
                    </Button>
                  </Link>
                  <Link to="/contato">
                    <Button className="rounded-full bg-warm-brown text-warm-cream hover:bg-warm-brown/90">
                      agendar demonstração
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="bg-gradient-to-br from-warm-terracotta/10 to-warm-gold/10 rounded-3xl p-8 aspect-square flex items-center justify-center">
                <MessageCircle className="w-32 h-32 text-warm-terracotta/40" />
              </div>
            </div>

            {/* Module 2 - RH Digital */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 bg-gradient-to-br from-green-100/50 to-emerald-100/50 rounded-3xl p-8 aspect-square flex items-center justify-center">
                <Users className="w-32 h-32 text-emerald-600/40" />
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <span className="text-emerald-600 font-medium">RH Digital</span>
                <h3 className="font-serif text-2xl md:text-3xl font-normal text-warm-brown leading-tight">
                  Eleve a gestão de pessoas criando jornadas mais simples e humanas
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {['2ª Via do Holerite', 'Banco de Horas', 'Extrato de Férias', 'Registro de Ponto', 'Onboarding', 'Offboarding'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-warm-brown/70">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 pt-4">
                  <Link to="/servicos">
                    <Button variant="outline" className="rounded-full border-warm-brown/30 text-warm-brown hover:bg-warm-brown/5">
                      rh digital
                    </Button>
                  </Link>
                  <Link to="/contato">
                    <Button className="rounded-full bg-warm-brown text-warm-cream hover:bg-warm-brown/90">
                      agendar demonstração
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Module 3 - Capacitação Corporativa */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-blue-600 font-medium">Capacitação Corporativa</span>
                <h3 className="font-serif text-2xl md:text-3xl font-normal text-warm-brown leading-tight">
                  Transforme o aprendizado com trilhas personalizadas para cada colaborador
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Cursos Personalizados', 'Trilhas de Aprendizagem', 'Biblioteca de Cursos', 'Quizzes'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-warm-brown/70">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 pt-4">
                  <Link to="/servicos">
                    <Button variant="outline" className="rounded-full border-warm-brown/30 text-warm-brown hover:bg-warm-brown/5">
                      capacitação corporativa
                    </Button>
                  </Link>
                  <Link to="/contato">
                    <Button className="rounded-full bg-warm-brown text-warm-cream hover:bg-warm-brown/90">
                      agendar demonstração
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-100/50 to-indigo-100/50 rounded-3xl p-8 aspect-square flex items-center justify-center">
                <BookOpen className="w-32 h-32 text-blue-600/40" />
              </div>
            </div>

            {/* Module 4 - Cultura & Engajamento */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 bg-gradient-to-br from-amber-100/50 to-orange-100/50 rounded-3xl p-8 aspect-square flex items-center justify-center">
                <Award className="w-32 h-32 text-amber-600/40" />
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <span className="text-amber-600 font-medium">Cultura & Engajamento</span>
                <h3 className="font-serif text-2xl md:text-3xl font-normal text-warm-brown leading-tight">
                  Fortaleça a cultura e engaje seu time com ferramentas modernas
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Gamificação', 'PDI', 'Jornada do Colaborador', 'Ranking', 'Reuniões 1:1', 'Lojinha de Recompensas'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-warm-brown/70">
                      <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 pt-4">
                  <Link to="/servicos">
                    <Button variant="outline" className="rounded-full border-warm-brown/30 text-warm-brown hover:bg-warm-brown/5">
                      cultura e engajamento
                    </Button>
                  </Link>
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

      {/* Differentials Section */}
      <section className="py-20 md:py-32 bg-warm-brown/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
            <span className="text-warm-terracotta font-medium">nossos diferenciais</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-warm-brown leading-tight">
              Perfeita para a sua empresa e para os seus colaboradores
            </h2>
            <p className="text-warm-brown/70 text-lg max-w-2xl mx-auto">
              Aproxima, engaja e facilita a vida de todo mundo com soluções que têm a cara do seu time e fazem a cultura acontecer de verdade no dia a dia!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8 space-y-4 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 rounded-2xl bg-warm-terracotta/10 flex items-center justify-center">
                <Shield className="w-7 h-7 text-warm-terracotta" />
              </div>
              <h3 className="font-serif text-xl font-medium text-warm-brown">Inclusão e Acessibilidade</h3>
              <p className="text-warm-brown/60 text-sm leading-relaxed">
                Plataforma acessível para todos os colaboradores, independente de suas necessidades especiais.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 space-y-4 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
                <UserCheck className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="font-serif text-xl font-medium text-warm-brown">Personalização Total</h3>
              <p className="text-warm-brown/60 text-sm leading-relaxed">
                Adapte a plataforma à identidade visual e necessidades únicas da sua empresa.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 space-y-4 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                <BarChart3 className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-serif text-xl font-medium text-warm-brown">Dados e Analytics</h3>
              <p className="text-warm-brown/60 text-sm leading-relaxed">
                Acompanhe métricas de engajamento e cultura em tempo real com dashboards intuitivos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaSection.ref} className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto text-center space-y-8 transition-all duration-700 ${ctaSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-warm-brown leading-tight">
              Pronto para transformar a cultura da sua empresa?
            </h2>
            <p className="text-warm-brown/70 text-lg max-w-2xl mx-auto">
              Agende uma demonstração gratuita e descubra como o Nexus pode ajudar sua empresa a crescer de dentro para fora.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/contato">
                <Button 
                  size="lg" 
                  className="bg-warm-brown hover:bg-warm-brown/90 text-warm-cream rounded-full text-base px-10 py-6 font-medium"
                >
                  Agendar demonstração
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/sobre">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent text-warm-brown border-2 border-warm-brown/30 hover:border-warm-brown/60 hover:bg-warm-brown/5 rounded-full text-base font-medium px-10 py-6"
                >
                  Conhecer mais
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-warm-brown/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-semibold text-warm-brown">Nexus</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-warm-brown/60">
              <Link to="/blog" className="hover:text-warm-brown transition-colors">Blog</Link>
              <Link to="/servicos" className="hover:text-warm-brown transition-colors">Serviços</Link>
              <Link to="/sobre" className="hover:text-warm-brown transition-colors">Sobre</Link>
              <Link to="/contato" className="hover:text-warm-brown transition-colors">Contato</Link>
            </div>
            <p className="text-warm-brown/40 text-sm">
              © 2025 Nexus. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      <InteractiveDemoModal open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen} />
    </div>
  );
};

export default Index;
