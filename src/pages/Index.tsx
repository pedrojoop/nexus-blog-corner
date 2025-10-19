import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Users, TrendingUp, Zap, Heart, AlertTriangle, BarChart3, Target, Linkedin, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ProductTour } from "@/components/ProductTour";

const Index = () => {
  const [showTour, setShowTour] = useState(false);
  const problemsSection = useScrollAnimation();
  const solutionSection = useScrollAnimation();
  const pricingSection = useScrollAnimation();
  const aboutSection = useScrollAnimation();
  const ctaSection = useScrollAnimation();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProductTour open={showTour} onOpenChange={setShowTour} />
      
      {/* Hero Section */}
      <section className="relative bg-nexus-green py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            Plataforma SaaS B2B de Engajamento
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Conecte sua Equipe.<br />Acabe com o <span className="text-nexus-accent">Turnover.</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            A Nexus Community é a plataforma SaaS B2B que resolve o alto turnover e burnout em equipes remotas e híbridas. 
            Construa uma cultura forte baseada em dados, engajamento e conexão real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => setShowTour(true)}
              className="bg-nexus-accent text-white hover:bg-nexus-accent/90 shadow-xl border-2 border-white/20 gap-2"
            >
              <Play className="h-5 w-5" />
              Explore a Plataforma
            </Button>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="bg-white text-nexus-green hover:bg-white/90 shadow-lg">
                Começar Gratuitamente <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-white/90 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-nexus-accent" />
              <span>14 dias grátis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-nexus-accent" />
              <span>Setup em minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-nexus-accent" />
              <span>Suporte dedicado</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section ref={problemsSection.ref} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-700 ${problemsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-nexus-green mb-6">
              Sua equipe está mais distante do que nunca?
            </h2>
            <p className="sr-only">Soluções para Reduzir o Turnover em Equipes Híbridas e Remotas</p>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Em um mundo de trabalho remoto e híbrido, o distanciamento não é apenas físico. 
              Ele impacta o bem-estar, destrói o engajamento e gera um <strong>turnover que custa caro</strong>. 
              Gestores de RH enfrentam desafios sem precedentes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: AlertTriangle,
                title: "Burnout Crescente",
                description: "Colaboradores sobrecarregados, desconectados da missão e à beira do esgotamento emocional."
              },
              {
                icon: BarChart3,
                title: "Alto Turnover",
                description: "Perda constante de talentos-chave e custos elevados de recontratação que drenam o orçamento."
              },
              {
                icon: Users,
                title: "Equipes Fragmentadas",
                description: "Falta de coesão, comunicação falha e colaboradores que se sentem isolados e desmotivados."
              }
            ].map((problem, index) => (
              <Card 
                key={index} 
                className="text-center border border-gray-200 bg-white hover:shadow-xl transition-all duration-300"
                style={{
                  animation: problemsSection.isVisible ? `slide-up 0.6s ease-out ${index * 0.15}s both` : 'none'
                }}>
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-nexus-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <problem.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-nexus-green mb-4">{problem.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{problem.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section ref={solutionSection.ref} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-700 ${solutionSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-3xl md:text-5xl font-bold text-nexus-green mb-6">
                A Solução: Um Hub<br />Central de Cultura
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                <strong>Nexus Community</strong> é a plataforma SaaS B2B que unifica comunicação, reconhecimento e gestão de cultura em um só lugar. 
                Oferecemos ferramentas baseadas em dados para <strong>medir e melhorar o engajamento</strong>, 
                prevenir turnover e criar equipes mais felizes e produtivas.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-nexus-green flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Hub central para comunicação e eventos</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-nexus-green flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Sistema de reconhecimento entre pares</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-nexus-green flex-shrink-0" />
                  <span className="text-gray-700 font-medium">IA preditiva para detectar risco de turnover</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-nexus-green flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Analytics avançado de engajamento</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: Heart,
                  title: "Cultura Forte",
                  description: "Valores e missão vivos no dia a dia."
                },
                {
                  icon: Zap,
                  title: "Alto Engajamento",
                  description: "Equipes motivadas e felizes no trabalho."
                },
                {
                  icon: TrendingUp,
                  title: "Redução de Turnover",
                  description: "Retenção de talentos baseada em dados."
                },
                {
                  icon: Target,
                  title: "Decisões Inteligentes",
                  description: "Analytics para RH e liderança proativa."
                }
              ].map((feature, index) => (
                <Card 
                  key={index} 
                  className="text-center border border-gray-200 bg-white hover:shadow-xl transition-all duration-300"
                  style={{
                    animation: solutionSection.isVisible ? `slide-up 0.6s ease-out ${index * 0.15 + 0.3}s both` : 'none'
                  }}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-nexus-green-lighter rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-6 w-6 text-nexus-green" />
                    </div>
                    <h3 className="font-semibold text-nexus-green mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutSection.ref} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-700 ${aboutSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-nexus-green mb-6">
              Quem Está Por Trás da Nexus
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Somos uma <strong>startup digital-native</strong> focada em resolver o maior desafio do futuro do trabalho: 
              manter equipes remotas e híbridas engajadas, conectadas e produtivas. Nosso time fundador combina <strong>expertise 
              em negócios, tecnologia e inovação</strong> para entregar uma plataforma escalável e baseada em dados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {[
              {
                name: "Pedro Matheus Lima da Cruz",
                role: "CEO",
                description: "Estratégia de Negócios e Vendas B2B",
                linkedin: "#"
              },
              {
                name: "João Lucas Cordeiro Santana",
                role: "CTO",
                description: "Arquitetura de Software e Escalabilidade",
                linkedin: "#"
              },
              {
                name: "Lucas Rodrigues de Azevedo",
                role: "CIO",
                description: "Inovação e Integração de Sistemas",
                linkedin: "#"
              }
            ].map((member, index) => (
              <Card 
                key={index} 
                className="text-center border border-gray-200 bg-white hover:shadow-xl transition-all duration-300"
                style={{
                  animation: aboutSection.isVisible ? `slide-up 0.6s ease-out ${index * 0.15}s both` : 'none'
                }}>
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-nexus-green-lighter rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-nexus-green" />
                  </div>
                  <h3 className="text-xl font-bold text-nexus-green mb-1">{member.name}</h3>
                  <p className="text-sm font-semibold text-nexus-accent mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{member.description}</p>
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-nexus-green hover:text-nexus-accent transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className={`max-w-4xl mx-auto transition-all duration-700 ${aboutSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="border-2 border-nexus-green bg-nexus-green-lighter/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-nexus-green mb-4 text-center">Nossa Missão</h3>
                <p className="text-gray-700 leading-relaxed text-center">
                  Criamos a <strong>Nexus Community</strong> porque acreditamos que o futuro do trabalho exige mais do que ferramentas — 
                  exige <strong>conexão humana, cultura intencional e dados acionáveis</strong>. Nosso objetivo é empoderar gestores de RH e 
                  líderes a construir organizações onde as pessoas se sintam parte de algo maior, reduzindo turnover e criando ambientes de 
                  trabalho mais saudáveis e produtivos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingSection.ref} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-700 ${pricingSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block bg-nexus-green text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Planos Escaláveis
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-nexus-green mb-6">
              Planos que Crescem com Você
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Modelo de <strong>assinatura recorrente por usuário</strong>. Escolha o plano ideal para sua equipe. 
              Todos incluem suporte especializado e atualizações gratuitas.
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-12">
              <Button variant="outline" size="sm" className="border-nexus-green text-nexus-green">Mensal</Button>
              <Button size="sm" className="bg-nexus-green text-white hover:bg-nexus-green-light">Anual (2 meses grátis)</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Starter Plan */}
            <Card 
              className="border-2 border-gray-200 bg-white hover:shadow-xl transition-all duration-300"
              style={{
                animation: pricingSection.isVisible ? 'slide-up 0.6s ease-out 0.1s both' : 'none'
              }}>
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold text-nexus-green mb-2">Starter</h3>
                <p className="text-sm text-nexus-accent font-medium mb-2">Para Equipes em Construção</p>
                <div className="bg-nexus-green/10 py-2 px-3 rounded-lg mb-4">
                  <p className="text-lg font-bold text-nexus-green">Até 25 Usuários</p>
                </div>
                
                <div className="mb-6">
                  <span className="text-3xl font-bold text-nexus-green">R$ 699</span>
                  <span className="text-gray-600 text-sm block">/mês (fixo)</span>
                  <p className="text-xs text-nexus-accent mt-2">R$ 7.500 anual (10% OFF)</p>
                </div>

                <div className="space-y-3 mb-6 text-left">
                  {[
                    "Gestão de documentos: 10 GB",
                    "Feed social da empresa",
                    "Gestão de eventos e calendário",
                    "Diretório de pessoas",
                    "Chat integrado",
                    "Permissões básicas"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-nexus-green flex-shrink-0" />
                      <span className="text-xs text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to="/auth">
                  <Button variant="outline" className="w-full border-nexus-green text-nexus-green hover:bg-nexus-green hover:text-white">
                    Começar Agora
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Growth Plan */}
            <Card 
              className="border-2 border-nexus-accent bg-white relative hover:shadow-2xl transition-all duration-300"
              style={{
                animation: pricingSection.isVisible ? 'slide-up 0.6s ease-out 0.2s both' : 'none'
              }}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-nexus-accent text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  ★ Mais Popular
                </div>
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold text-nexus-green mb-2">Growth</h3>
                <p className="text-sm text-nexus-accent font-medium mb-2">Para Escalabilidade e Retenção</p>
                <div className="bg-nexus-accent/10 py-2 px-3 rounded-lg mb-4">
                  <p className="text-lg font-bold text-nexus-accent">Até 100 Usuários</p>
                </div>
                
                <div className="mb-6">
                  <span className="text-3xl font-bold text-nexus-green">R$ 1.999</span>
                  <span className="text-gray-600 text-sm block">/mês (fixo)</span>
                  <p className="text-xs text-nexus-accent mt-2">R$ 21.600 anual (10% OFF)</p>
                </div>

                <div className="space-y-3 mb-6 text-left">
                  {[
                    "Tudo do Starter, mais:",
                    "Gestão de documentos: 100 GB",
                    "Chat de voz e vídeo",
                    "Time tracking e gestão de ponto",
                    "Quadro Kanban de projetos",
                    "Analytics avançado de engajamento",
                    "Sistema de gamificação e recompensas",
                    "IA preditiva de turnover"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-nexus-accent flex-shrink-0" />
                      <span className={`text-xs ${index === 0 ? 'font-bold text-nexus-green' : 'text-gray-700'}`}>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to="/auth">
                  <Button className="w-full bg-nexus-green text-white hover:bg-nexus-green-light shadow-lg">
                    Começar Agora
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card 
              className="border-2 border-gray-200 bg-white hover:shadow-xl transition-all duration-300"
              style={{
                animation: pricingSection.isVisible ? 'slide-up 0.6s ease-out 0.3s both' : 'none'
              }}>
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold text-nexus-green mb-2">Enterprise</h3>
                <p className="text-sm text-nexus-accent font-medium mb-2">Para Grandes Corporações e Customização</p>
                <div className="bg-gray-100 py-2 px-3 rounded-lg mb-4">
                  <p className="text-lg font-bold text-gray-700">Mais de 101 Usuários</p>
                </div>
                
                <div className="mb-6">
                  <span className="text-3xl font-bold text-nexus-green">Personalizado</span>
                  <span className="text-gray-600 text-sm block mt-1">Consulte-nos</span>
                </div>

                <div className="space-y-3 mb-6 text-left">
                  {[
                    "Tudo do Growth, mais:",
                    "Armazenamento personalizado",
                    "Personalização total da plataforma",
                    "Suporte 24/7 dedicado",
                    "Integrações customizadas",
                    "SLA garantido",
                    "Consultoria de cultura organizacional"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-nexus-green flex-shrink-0" />
                      <span className={`text-xs ${index === 0 ? 'font-bold text-nexus-green' : 'text-gray-700'}`}>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to="/auth">
                  <Button variant="outline" className="w-full border-nexus-green text-nexus-green hover:bg-nexus-green hover:text-white">
                    Falar com Vendas
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* White-Label Licensing Plan */}
            <Card 
              className="border-2 border-nexus-accent bg-gradient-to-br from-nexus-green/10 to-nexus-accent/10 hover:shadow-2xl transition-all duration-300 relative"
              style={{
                animation: pricingSection.isVisible ? 'slide-up 0.6s ease-out 0.4s both' : 'none'
              }}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-nexus-green to-nexus-accent text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                  LICENCIAMENTO PREMIUM
                </div>
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold text-nexus-green mb-2">White-Label</h3>
                <p className="text-sm text-nexus-accent font-medium mb-2">A Solução Estratégica para Consultorias</p>
                <div className="bg-gradient-to-r from-nexus-green/20 to-nexus-accent/20 py-2 px-3 rounded-lg mb-4">
                  <p className="text-sm font-bold text-nexus-green">Grandes Ecossistemas</p>
                </div>
                
                <div className="mb-6">
                  <span className="text-2xl font-bold text-nexus-green">Sob Medida</span>
                  <span className="text-gray-600 text-xs block mt-1">Modelo de parceria estratégica</span>
                </div>

                <div className="space-y-3 mb-6 text-left">
                  {[
                    "Branding Total e Personalização (Sua marca, nossa tecnologia)",
                    "Fee Fixo Inicial (Inclui Setup e Onboarding de Parceria)",
                    "Suporte Nível 3 Dedicado ao Parceiro",
                    "Treinamento e Implantação (Opcional)",
                    "Manutenção e Atualizações (Taxa Recorrente Opcional)"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-nexus-accent flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-700 leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to="/auth">
                  <Button className="w-full bg-gradient-to-r from-nexus-green to-nexus-accent text-white hover:opacity-90 shadow-lg">
                    Solicitar Proposta de Parceria
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section ref={ctaSection.ref} className="py-24 bg-nexus-green relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        <div className={`container mx-auto px-4 text-center relative z-10 transition-all duration-700 ${ctaSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Pronto para Reduzir o <span className="text-nexus-accent">Turnover</span>?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Junte-se às empresas que transformaram sua cultura organizacional e reduziram custos com 
            <strong> rotatividade de funcionários</strong> usando a Nexus Community.
          </p>
          
          <Link to="/auth">
            <Button size="lg" className="bg-white text-nexus-green hover:bg-white/90 shadow-xl mb-12">
              Começar Teste Gratuito de 14 Dias <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          
          <div className="flex flex-wrap justify-center gap-8 text-white/90 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-nexus-accent" />
              <span className="font-medium">Sem cartão de crédito</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-nexus-accent" />
              <span className="font-medium">Setup em 5 minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-nexus-accent" />
              <span className="font-medium">Suporte dedicado em português</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-nexus-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-2xl font-bold text-nexus-green">Nexus Community</span>
            </div>
            
            {/* Fundadores */}
            <div className="text-sm text-gray-600">
              <p className="mb-2 font-medium text-nexus-green">Fundado por</p>
              <p>Pedro Matheus Lima da Cruz (CEO) • João Lucas Cordeiro Santana (CTO) • Lucas Rodrigues de Azevedo (CIO)</p>
            </div>

            {/* Links Legais */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <Link to="/termos" className="hover:text-nexus-green transition-colors">Termos de Uso</Link>
              <span className="text-gray-300">|</span>
              <Link to="/privacidade" className="hover:text-nexus-green transition-colors">Política de Privacidade</Link>
              <span className="text-gray-300">|</span>
              <Link to="/contato" className="hover:text-nexus-green transition-colors">Contato</Link>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-200 pt-6 w-full">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Nexus Community. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;