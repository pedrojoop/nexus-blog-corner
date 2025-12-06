import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Heart, Linkedin, Sparkles, Shield, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Sobre = () => {
  const missionSection = useScrollAnimation();
  const valuesSection = useScrollAnimation();
  const teamSection = useScrollAnimation();

  const teamMembers = [
    {
      name: "Pedro Matheus Lima da Cruz",
      role: "CEO",
      description: "Visão Estratégica e Liderança Comercial",
      fullDescription: "Responsável pela estratégia de negócios e vendas B2B, garantindo que a Nexus alcance seu potencial máximo no mercado.",
      linkedin: "#"
    },
    {
      name: "João Lucas Cordeiro Santana",
      role: "CTO",
      description: "Arquitetura Técnica e Garantia de Escalabilidade",
      fullDescription: "Lidera a arquitetura de software e escalabilidade da plataforma, assegurando uma base técnica sólida e preparada para crescimento.",
      linkedin: "#"
    },
    {
      name: "Lucas Rodrigues de Azevedo",
      role: "CIO",
      description: "Inovação e Pesquisa",
      fullDescription: "Responsável pela inovação e pesquisa para integração de futuros sistemas e módulos de IA, mantendo a Nexus na vanguarda tecnológica.",
      linkedin: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden">
        {/* Background Glow */}
        <div className="glow-orb glow-orb-gold w-96 h-96 -top-48 -right-48" />
        <div className="glow-orb glow-orb-green w-72 h-72 -bottom-36 -left-36" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 text-accent font-medium tracking-wide">
              <Sparkles className="w-4 h-4" />
              sobre nós
            </span>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] text-foreground">
              Conectando o Futuro do Trabalho
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Nós fundamos a Nexus com uma convicção: o futuro do trabalho exige 
              <strong className="text-foreground"> conexão humana</strong>, 
              <strong className="text-foreground"> cultura forte</strong> e 
              <strong className="text-foreground"> retenção estratégica</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionSection.ref} className="py-20 md:py-32 border-t border-border">
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto transition-all duration-700 ${missionSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="glass-card p-8 md:p-12 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Target className="h-7 w-7 text-accent" />
                </div>
                <div>
                  <span className="text-accent font-medium text-sm">nossa missão</span>
                  <h2 className="font-serif text-2xl md:text-3xl font-normal text-foreground mt-1">
                    A Crise da Conexão
                  </h2>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Acreditamos que, embora o trabalho remoto e híbrido tenha trazido liberdade, 
                  ele não pode custar a <strong className="text-foreground">conexão humana e a cultura da empresa</strong>. 
                  Vimos as taxas de turnover e desengajamento aumentarem e entendemos que as ferramentas 
                  tradicionais de comunicação não estavam preparadas para resolver o custo humano dessa equação.
                </p>
                
                <p>
                  Nossa missão é usar a tecnologia para resolver essa <strong className="text-foreground">crise de conexão</strong>, 
                  transformando o distanciamento físico em uma oportunidade de construir uma cultura forte e coesa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesSection.ref} className="py-20 md:py-32 bg-secondary/30 dark:bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto text-center space-y-6 mb-16 transition-all duration-700 ${valuesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-accent font-medium">nossos valores</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-foreground leading-tight">
              Tecnologia a Serviço das Pessoas
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A Nexus é mais do que um software; é uma <strong className="text-foreground">filosofia de trabalho</strong>. 
              Nosso compromisso é com a prevenção e com a humanização.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto transition-all duration-700 delay-200 ${valuesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="glass-card p-8 space-y-4 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center">
                <Heart className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-medium text-foreground">
                Abordagem Proativa
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Nossa plataforma é construída para <strong className="text-foreground">prevenir o turnover antes que aconteça</strong>. 
                Atuamos como o Hub Central que, de forma contínua, fortalece os laços sociais, o reconhecimento 
                e o senso de pertencimento de cada colaborador.
              </p>
            </div>

            <div className="glass-card p-8 space-y-4 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center">
                <Rocket className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-medium text-foreground">
                Visão de Ecossistema
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Entregamos valor com uma plataforma modular, mas pensada para ser o único parceiro estratégico 
                de gestão da sua empresa. Nossa visão é expandir para um <strong className="text-foreground">ecossistema completo</strong>, 
                garantindo eficiência operacional e valorização do capital humano.
              </p>
            </div>
          </div>

          <div className={`text-center mt-12 transition-all duration-700 delay-300 ${valuesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="font-serif text-xl md:text-2xl text-foreground">
              Acreditamos que uma empresa só prospera quando as pessoas prosperam.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamSection.ref} className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto text-center space-y-6 mb-16 transition-all duration-700 ${teamSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-accent font-medium">nossa equipe</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-foreground leading-tight">
              Paixão e Execução
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A Nexus é liderada por um time com a <strong className="text-foreground">paixão necessária para a missão</strong> e a 
              <strong className="text-foreground"> experiência técnica para a execução</strong>.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto transition-all duration-700 delay-200 ${teamSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="glass-card p-8 text-center space-y-4 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 dark:from-accent/30 dark:to-primary/30 flex items-center justify-center mx-auto">
                  <Users className="h-10 w-10 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-foreground">{member.name}</h3>
                  <p className="text-sm font-semibold text-accent mt-1">{member.role}</p>
                </div>
                <p className="text-sm text-foreground font-medium leading-relaxed">{member.description}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.fullDescription}</p>
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors pt-2"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="text-sm font-medium">Ver perfil no LinkedIn</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary dark:bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 dark:bg-accent/10 rounded-full px-4 py-2">
              <Shield className="w-5 h-5 text-primary-foreground dark:text-accent" />
              <span className="text-primary-foreground dark:text-accent font-medium">junte-se a nós</span>
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-primary-foreground dark:text-foreground leading-tight">
              Transforme a cultura da sua empresa
            </h2>
            
            <p className="text-primary-foreground/80 dark:text-muted-foreground text-lg max-w-2xl mx-auto">
              Construa um futuro onde tecnologia e humanidade andam juntas, 
              criando ambientes de trabalho engajadores e produtivos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/contato">
                <Button 
                  size="lg" 
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 dark:bg-accent dark:text-accent-foreground dark:hover:bg-accent/90 rounded-full text-base px-8 py-6 font-medium transition-all duration-300 hover:shadow-lg"
                >
                  Agendar demonstração
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent text-primary-foreground border-2 border-primary-foreground/30 hover:border-primary-foreground/60 hover:bg-primary-foreground/5 dark:text-foreground dark:border-foreground/30 dark:hover:border-foreground/60 dark:hover:bg-foreground/5 rounded-full text-base font-medium px-8 py-6 transition-all duration-300"
                >
                  Começar Grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-medium text-foreground">Nexus</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Nexus. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Sobre;
