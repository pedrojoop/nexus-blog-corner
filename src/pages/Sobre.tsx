import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Heart, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Sobre = () => {
  const heroSection = useScrollAnimation();
  const missionSection = useScrollAnimation();
  const valuesSection = useScrollAnimation();
  const teamSection = useScrollAnimation();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-nexus-green py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Nossa Missão:<br />Conectando o Futuro do Trabalho
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Nós fundamos a Nexus Community com uma convicção: o futuro do trabalho 
            não precisa ser sinônimo de burnout e isolamento.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionSection.ref} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card 
              className="border-2 border-nexus-green bg-white hover:shadow-xl transition-all duration-300"
              style={{
                animation: missionSection.isVisible ? 'slide-up 0.6s ease-out 0.1s both' : 'none'
              }}>
              <CardContent className="p-8 md:p-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-nexus-green rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-nexus-green mb-4">
                      A Crise da Conexão
                    </h2>
                  </div>
                </div>
                
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                  <p>
                    Acreditamos que, embora o trabalho remoto e híbrido tenha trazido liberdade, 
                    ele não pode custar a <strong className="text-nexus-green">conexão humana e a cultura da empresa</strong>. 
                    Vimos as taxas de turnover e desengajamento aumentarem e entendemos que as ferramentas 
                    tradicionais de comunicação não estavam preparadas para resolver o custo humano dessa equação.
                  </p>
                  
                  <p>
                    Nossa missão é usar a tecnologia para resolver essa <strong className="text-nexus-green">crise de conexão</strong>, 
                    transformando o distanciamento físico em uma oportunidade de construir uma cultura forte e coesa.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesSection.ref} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-nexus-green mb-6">
              O Que Nos Move: Tecnologia a Serviço das Pessoas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A Nexus Community é mais do que um software; é uma <strong>filosofia de trabalho</strong>. 
              Nosso compromisso é com a prevenção e com a humanização.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card 
              className="border-2 border-nexus-green bg-white hover:shadow-xl transition-all duration-300"
              style={{
                animation: valuesSection.isVisible ? 'slide-up 0.6s ease-out 0.1s both' : 'none'
              }}>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-nexus-green rounded-full flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-nexus-green mb-4">
                  Abordagem Proativa
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Ao contrário das soluções que reagem a problemas (como o burnout), nossa plataforma é 
                  construída para <strong>preveni-los</strong>. Atuamos como o Hub Central que, de forma contínua, 
                  fortalece os laços sociais, o reconhecimento e o senso de pertencimento de cada colaborador.
                </p>
              </CardContent>
            </Card>

            <Card 
              className="border-2 border-nexus-green bg-white hover:shadow-xl transition-all duration-300"
              style={{
                animation: valuesSection.isVisible ? 'slide-up 0.6s ease-out 0.2s both' : 'none'
              }}>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-nexus-green rounded-full flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-nexus-green mb-4">
                  Visão de Ecossistema
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Entregamos valor com uma plataforma modular, mas pensada para ser o único parceiro estratégico 
                  de gestão da sua empresa. Nossa visão é expandir para um <strong>ecossistema completo</strong> (RH, Vendas, Finanças), 
                  garantindo que a sua operação seja eficiente e o seu capital humano, valorizado.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-2xl font-bold text-nexus-green">
              Acreditamos que uma empresa só prospera quando as pessoas prosperam.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamSection.ref} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-nexus-green mb-6">
              A Equipe Fundadora: Paixão e Execução
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A Nexus é liderada por um time com a <strong>paixão necessária para a missão</strong> e a 
              <strong> experiência técnica para a execução</strong>. Nossos papéis são complementares, 
              garantindo que o produto e a estratégia sejam construídos em conjunto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
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
            ].map((member, index) => (
              <Card 
                key={index} 
                className="text-center border-2 border-gray-200 bg-white hover:shadow-xl transition-all duration-300"
                style={{
                  animation: teamSection.isVisible ? `slide-up 0.6s ease-out ${index * 0.15}s both` : 'none'
                }}>
                <CardContent className="p-8">
                  <div className="w-24 h-24 bg-nexus-green-lighter rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-12 w-12 text-nexus-green" />
                  </div>
                  <h3 className="text-xl font-bold text-nexus-green mb-2">{member.name}</h3>
                  <p className="text-sm font-semibold text-nexus-accent mb-4">{member.role}</p>
                  <p className="text-sm text-gray-600 mb-2 leading-relaxed font-medium">{member.description}</p>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">{member.fullDescription}</p>
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-nexus-green hover:text-nexus-accent transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="text-sm font-medium">Ver perfil no LinkedIn</span>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-nexus-green">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Junte-se a Nós nesta Missão
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Transforme a cultura da sua empresa e construa um futuro onde tecnologia e humanidade andam juntas.
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-white text-nexus-green hover:bg-white/90 shadow-lg">
              Começar Gratuitamente <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-nexus-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-semibold text-nexus-green">Nexus Community</span>
            </div>
            
            <p className="text-sm text-gray-600">
              © 2025 Nexus Community. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Sobre;
