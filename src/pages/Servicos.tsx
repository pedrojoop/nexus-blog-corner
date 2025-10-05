import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Brain, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Servicos = () => {
  const heroSection = useScrollAnimation();
  const servicesSection = useScrollAnimation();

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
            Nossos Serviços: O Hub de Cultura<br />e o Futuro da Gestão
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            A Nexus Community oferece uma suíte de soluções projetada para elevar o desempenho da sua empresa 
            através da gestão estratégica do capital humano.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesSection.ref} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-16 max-w-6xl mx-auto">
            
            {/* Service 1 */}
            <Card 
              className="border-2 border-nexus-green bg-white hover:shadow-xl transition-all duration-300"
              style={{
                animation: servicesSection.isVisible ? 'slide-up 0.6s ease-out 0.1s both' : 'none'
              }}>
              <CardContent className="p-8 md:p-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-nexus-green rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-nexus-green mb-2">
                      1. Nexus Community: Plataforma de Engajamento e Cultura
                    </h2>
                    <p className="text-nexus-accent font-semibold">O Serviço Imediato</p>
                  </div>
                </div>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Este é o nosso principal serviço SaaS, entregue por assinatura recorrente. 
                  Ele atua diretamente na raiz do problema de turnover e burnout em equipes distribuídas.
                </p>

                <div className="bg-nexus-green-lighter/20 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-nexus-green mb-3">Função</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Atuar como o Hub Central para a cultura da empresa, substituindo a comunicação dispersa e fria por conexão real.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-nexus-green mb-4">Valor Entregue</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-nexus-accent rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold text-nexus-green">Prevenção Proativa</p>
                        <p className="text-gray-600">Ferramentas de reconhecimento e comunidades de interesse que combatem o isolamento.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-nexus-accent rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold text-nexus-green">Unificação de Engajamento</p>
                        <p className="text-gray-600">Centralização de todas as atividades de cultura e celebração em um só lugar.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-nexus-accent rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold text-nexus-green">Visão em Dados</p>
                        <p className="text-gray-600">Analytics para medir o pulso da equipe e o Retorno sobre Investimento (ROI) em cultura.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service 2 */}
            <Card 
              className="border-2 border-nexus-green bg-white hover:shadow-xl transition-all duration-300"
              style={{
                animation: servicesSection.isVisible ? 'slide-up 0.6s ease-out 0.2s both' : 'none'
              }}>
              <CardContent className="p-8 md:p-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-nexus-green rounded-full flex items-center justify-center flex-shrink-0">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-nexus-green mb-2">
                      2. Serviços de Valor Agregado e Inovação (P&D&I)
                    </h2>
                    <p className="text-nexus-accent font-semibold">Inovação Contínua</p>
                  </div>
                </div>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Nosso serviço inclui o compromisso com a inovação contínua, garantindo que sua empresa 
                  esteja sempre na vanguarda da gestão de pessoas.
                </p>

                <div className="space-y-6">
                  <div className="bg-nexus-green-lighter/20 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-nexus-green mb-3">Análise Preditiva com IA</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Desenvolvimento de um módulo de Inteligência Artificial para fornecer insights preditivos. 
                      O serviço irá identificar e alertar o RH sobre grupos ou indivíduos com alto risco de burnout 
                      antes que ele afete a operação.
                    </p>
                  </div>

                  <div className="bg-nexus-green-lighter/20 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-nexus-green mb-3">Consultoria Estratégica de Cultura</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Fornecida através do nosso time de Customer Success, ajudamos nossos clientes a transformar 
                      os dados da plataforma em planos de ação concretos para fortalecer a cultura da empresa.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service 3 */}
            <Card 
              className="border-2 border-nexus-green bg-white hover:shadow-xl transition-all duration-300"
              style={{
                animation: servicesSection.isVisible ? 'slide-up 0.6s ease-out 0.3s both' : 'none'
              }}>
              <CardContent className="p-8 md:p-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-nexus-green rounded-full flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-nexus-green mb-2">
                      3. O Ecossistema Nexus
                    </h2>
                    <p className="text-nexus-accent font-semibold">Visão de Longo Prazo</p>
                  </div>
                </div>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Sua empresa não está apenas comprando um software; está investindo em uma solução de gestão completa.
                </p>

                <div className="space-y-6">
                  <div className="bg-nexus-green-lighter/20 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-nexus-green mb-3">O Que É</h3>
                    <p className="text-gray-700 leading-relaxed">
                      O Nexus será uma suíte de ferramentas (Nexus Sales, Nexus Finances, etc.) que funcionam 
                      de forma independente, mas se integram perfeitamente.
                    </p>
                  </div>

                  <div className="bg-nexus-green-lighter/20 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-nexus-green mb-3">O Valor Estratégico</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Garantia de que todos os seus futuros desafios de gestão — de RH às Vendas — poderão ser 
                      resolvidos sob a mesma interface e com dados unificados, aumentando a eficiência e o valor 
                      de cada ferramenta para o seu negócio.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-nexus-green">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Pronto para Transformar sua Cultura?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Comece hoje mesmo com 14 dias grátis e veja o impacto na sua equipe.
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

export default Servicos;
