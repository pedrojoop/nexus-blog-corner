import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, BarChart3, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import CommunicationDemo from "@/components/demos/CommunicationDemo";
import LMSDemo from "@/components/demos/LMSDemo";
import CultureDemo from "@/components/demos/CultureDemo";

const Servicos = () => {
  const section1 = useScrollAnimation();
  const section2 = useScrollAnimation();
  const section3 = useScrollAnimation();

  return (
    <div className="min-h-screen bg-warm-cream">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
            <span className="inline-block text-warm-terracotta font-medium tracking-wide">
              experimente nossa plataforma
            </span>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] text-warm-brown">
              Teste Cada Funcionalidade em Tempo Real
            </h1>
            
            <p className="text-lg text-warm-brown/70 leading-relaxed max-w-2xl mx-auto">
              Explore nossa suíte completa de soluções. Clique, interaja e descubra como 
              transformar a experiência dos seus colaboradores.
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

      {/* Section 1: Comunicação Interna */}
      <section ref={section1.ref} className="py-20 md:py-32 border-t border-warm-brown/10">
        <div className="container mx-auto px-4">
          <div className={`max-w-6xl mx-auto transition-all duration-700 ${section1.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <span className="text-warm-terracotta font-medium">Comunicação Interna</span>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-warm-brown leading-tight mt-2">
                Transforme a comunicação com ferramentas integradas
              </h2>
              <p className="text-warm-brown/70 leading-relaxed mt-4 max-w-2xl mx-auto">
                Experimente o Feed Social, Chat em tempo real e Gestão de Documentos. Tudo funcional!
              </p>
            </div>
            <CommunicationDemo />
          </div>
        </div>
      </section>

      {/* Section 2: LMS */}
      <section ref={section2.ref} className="py-20 md:py-32 bg-warm-brown/5">
        <div className="container mx-auto px-4">
          <div className={`max-w-6xl mx-auto transition-all duration-700 ${section2.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <span className="text-blue-600 font-medium">Capacitação e LMS</span>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-warm-brown leading-tight mt-2">
                Universidade Corporativa Completa
              </h2>
              <p className="text-warm-brown/70 leading-relaxed mt-4 max-w-2xl mx-auto">
                Acesse cursos como aluno ou gerencie como administrador. Crie, publique e acompanhe o progresso.
              </p>
            </div>
            <LMSDemo />
          </div>
        </div>
      </section>

      {/* Section 3: Cultura e Engajamento */}
      <section ref={section3.ref} className="py-20 md:py-32 border-t border-warm-brown/10">
        <div className="container mx-auto px-4">
          <div className={`max-w-6xl mx-auto transition-all duration-700 ${section3.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <span className="text-amber-600 font-medium">Cultura e Engajamento</span>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-warm-brown leading-tight mt-2">
                Fortaleça a cultura com ferramentas modernas
              </h2>
              <p className="text-warm-brown/70 leading-relaxed mt-4 max-w-2xl mx-auto">
                Gerencie rituais com CaaS e engaje colaboradores com gamificação completa.
              </p>
            </div>
            <CultureDemo />
          </div>
        </div>
      </section>

      {/* AI Highlight */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-warm-brown to-warm-brown/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warm-cream/20 mb-4">
              <Brain className="w-8 h-8 text-warm-cream" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-warm-cream">
              IA Preditiva para Retenção
            </h2>
            <p className="text-warm-cream/80 text-lg max-w-2xl mx-auto">
              Nossa inteligência artificial analisa padrões de engajamento e prevê riscos de turnover, 
              permitindo ações preventivas antes que talentos deixem sua empresa.
            </p>
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-warm-cream mb-2">
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-3xl font-bold">94%</span>
                </div>
                <p className="text-warm-cream/60 text-sm">Precisão nas previsões</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-warm-cream mb-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-3xl font-bold">-32%</span>
                </div>
                <p className="text-warm-cream/60 text-sm">Redução de turnover</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-warm-brown mb-6">
            Pronto para transformar sua empresa?
          </h2>
          <p className="text-warm-brown/70 mb-8 max-w-xl mx-auto">
            Agende uma demonstração personalizada e descubra como podemos ajudar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contato">
              <Button size="lg" className="bg-warm-brown hover:bg-warm-brown/90 text-warm-cream rounded-full px-8 py-6">
                Agendar demonstração
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="rounded-full px-8 py-6 border-warm-brown/30 text-warm-brown hover:bg-warm-brown/5">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-warm-brown/10">
        <div className="container mx-auto px-4 text-center text-warm-brown/60 text-sm">
          © 2024 Plataforma. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Servicos;
