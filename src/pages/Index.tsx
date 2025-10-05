import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Users, TrendingUp, Zap, Heart, AlertTriangle, BarChart3, Target, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Index = () => {
  const problemsSection = useScrollAnimation();
  const solutionSection = useScrollAnimation();
  const pricingSection = useScrollAnimation();
  const aboutSection = useScrollAnimation();
  const ctaSection = useScrollAnimation();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-nexus-glow rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-nexus-accent rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 glass px-5 py-2.5 rounded-full text-sm font-medium mb-8 shadow-lg">
            <div className="w-2 h-2 bg-nexus-accent rounded-full animate-pulse"></div>
            <span className="text-nexus-green">Plataforma SaaS B2B de Engajamento</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Conecte sua Equipe.<br />Acabe com o <span className="relative">
              <span className="relative z-10">Turnover.</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-nexus-accent opacity-30 blur-sm"></span>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
            A Nexus Community é a plataforma SaaS B2B que resolve o alto turnover e burnout em equipes remotas e híbridas. 
            Construa uma cultura forte baseada em dados, engajamento e conexão real.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-nexus-green hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-2xl px-8 py-6 text-lg font-semibold">
                Começar Gratuitamente <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-white/90 text-sm">
            <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
              <CheckCircle className="h-4 w-4 text-nexus-accent" />
              <span className="font-medium">14 dias grátis</span>
            </div>
            <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
              <CheckCircle className="h-4 w-4 text-nexus-accent" />
              <span className="font-medium">Setup em minutos</span>
            </div>
            <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
              <CheckCircle className="h-4 w-4 text-nexus-accent" />
              <span className="font-medium">Suporte dedicado</span>
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
                className="group text-center border-0 bg-white hover:bg-gradient-to-br hover:from-white hover:to-nexus-green-lighter/20 card-hover relative overflow-hidden"
                style={{
                  animation: problemsSection.isVisible ? `slide-up 0.6s ease-out ${index * 0.15}s both` : 'none',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                <div className="absolute inset-0 bg-gradient-to-br from-nexus-accent/0 to-nexus-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-nexus-green to-nexus-green-light rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <problem.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-nexus-green mb-4 group-hover:text-nexus-accent transition-colors">{problem.title}</h3>
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
                  className="group text-center border-0 bg-gradient-to-br from-white to-nexus-green-lighter/10 card-hover relative overflow-hidden"
                  style={{
                    animation: solutionSection.isVisible ? `slide-up 0.6s ease-out ${index * 0.15 + 0.3}s both` : 'none',
                    boxShadow: 'var(--shadow-md)'
                  }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-nexus-glow/0 to-nexus-glow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-nexus-green-lighter to-white rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <feature.icon className="h-6 w-6 text-nexus-green" />
                    </div>
                    <h3 className="font-semibold text-nexus-green mb-2 group-hover:text-nexus-accent transition-colors">{feature.title}</h3>
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
                className="group text-center border-0 bg-white card-hover relative overflow-hidden"
                style={{
                  animation: aboutSection.isVisible ? `slide-up 0.6s ease-out ${index * 0.15}s both` : 'none',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                <div className="absolute inset-0 bg-gradient-to-br from-nexus-green/0 to-nexus-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-nexus-green-lighter to-nexus-green-lighter/50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Users className="h-10 w-10 text-nexus-green" />
                  </div>
                  <h3 className="text-xl font-bold text-nexus-green mb-1">{member.name}</h3>
                  <p className="text-sm font-semibold text-nexus-accent mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{member.description}</p>
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-nexus-green hover:text-nexus-accent transition-all hover:gap-3 duration-300"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className={`max-w-4xl mx-auto transition-all duration-700 ${aboutSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="border-0 relative overflow-hidden" style={{ 
              background: 'var(--gradient-premium)',
              boxShadow: 'var(--shadow-xl)'
            }}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-nexus-accent rounded-full blur-3xl opacity-10"></div>
              <CardContent className="p-10 relative z-10">
                <h3 className="text-3xl font-bold text-nexus-green mb-6 text-center">Nossa Missão</h3>
                <p className="text-lg text-gray-700 leading-relaxed text-center">
                  Criamos a <strong className="text-nexus-green">Nexus Community</strong> porque acreditamos que o futuro do trabalho exige mais do que ferramentas — 
                  exige <strong className="text-nexus-green">conexão humana, cultura intencional e dados acionáveis</strong>. Nosso objetivo é empoderar gestores de RH e 
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <Card 
              className="border-0 bg-white card-hover relative overflow-hidden group"
              style={{
                animation: pricingSection.isVisible ? 'slide-up 0.6s ease-out 0.1s both' : 'none',
                boxShadow: 'var(--shadow-lg)'
              }}>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-nexus-green mb-2">Starter</h3>
                <p className="text-sm text-nexus-accent font-medium mb-2">Para times que estão começando a construir sua cultura</p>
                <p className="text-gray-600 mb-6">Ideal para pequenas equipes (5-20 pessoas)</p>
                
                <div className="mb-8">
                  <span className="text-4xl font-bold text-nexus-green">R$ 24,99</span>
                  <span className="text-gray-600">/mês por usuário</span>
                </div>

                <div className="space-y-4 mb-8 text-left">
                  {[
                    "Gestão de documentos: 10 GB",
                    "Feed social da empresa",
                    "Gestão de eventos e calendário",
                    "Diretório de pessoas",
                    "Chat integrado",
                    "Permissões básicas"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-nexus-green flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
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

            {/* Professional Plan */}
            <Card 
              className="border-0 bg-white relative card-hover group scale-105"
              style={{
                animation: pricingSection.isVisible ? 'slide-up 0.6s ease-out 0.2s both' : 'none',
                boxShadow: 'var(--shadow-2xl), var(--shadow-glow)'
              }}>
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-nexus-accent to-nexus-glow text-white px-8 py-3 rounded-full text-sm font-bold shadow-2xl animate-pulse">
                  ★ Mais Popular
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-nexus-accent/5 to-nexus-glow/5"></div>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-nexus-green mb-2">Profissional</h3>
                <p className="text-sm text-nexus-accent font-medium mb-2">Para times que querem fortalecer engajamento e produtividade</p>
                <p className="text-gray-600 mb-6">Ideal para equipes em crescimento (20-100 pessoas)</p>
                
                <div className="mb-8">
                  <span className="text-4xl font-bold text-nexus-green">R$ 39,99</span>
                  <span className="text-gray-600">/mês por usuário</span>
                </div>

                <div className="space-y-4 mb-8 text-left">
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
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-nexus-accent flex-shrink-0" />
                      <span className={`text-sm ${index === 0 ? 'font-bold text-nexus-green' : 'text-gray-700'}`}>{feature}</span>
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
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-nexus-green mb-2">Enterprise</h3>
                <p className="text-sm text-nexus-accent font-medium mb-2">Para organizações que lideram a transformação cultural</p>
                <p className="text-gray-600 mb-6">Solução completa para grandes empresas (100+ pessoas)</p>
                
                <div className="mb-8">
                  <span className="text-4xl font-bold text-nexus-green">Personalizado</span>
                </div>

                <div className="space-y-4 mb-8 text-left">
                  {[
                    "Tudo do Profissional, mais:",
                    "Armazenamento personalizado",
                    "Personalização total da plataforma",
                    "Suporte 24/7 dedicado",
                    "Integrações customizadas",
                    "SLA garantido",
                    "Consultoria de cultura organizacional"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-nexus-green flex-shrink-0" />
                      <span className={`text-sm ${index === 0 ? 'font-bold text-nexus-green' : 'text-gray-700'}`}>{feature}</span>
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