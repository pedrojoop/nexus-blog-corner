import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Users, TrendingUp, Zap, Heart, AlertTriangle, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Index = () => {
  const problemsSection = useScrollAnimation();
  const solutionSection = useScrollAnimation();
  const pricingSection = useScrollAnimation();
  const ctaSection = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 overflow-hidden">
        {/* Organic subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.03),transparent_50%)]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block bg-primary-foreground/20 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
            Nexus Community
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Conecte. Inove. O Hub que Acaba com o <span className="text-nexus-accent">Turnover.</span>
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Construa uma cultura que todos amam. A Nexus Community é a plataforma que conecta sua equipe, 
            fortalece a união e transforma o trabalho em um lugar mais feliz e produtivo.
          </p>
          <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            Começar Gratuitamente <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-primary-foreground/80 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-nexus-accent" />
              <span>Teste gratuito de 14 dias</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-nexus-accent" />
              <span>Configuração em minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-nexus-accent" />
              <span>Suporte especializado</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section ref={problemsSection.ref} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-700 ${problemsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Sua equipe está mais distante do que nunca?
            </h2>
            <p className="sr-only">Soluções para Reduzir o Turnover em Equipes Híbridas</p>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Seu time sente o isolamento. Em um mundo de trabalho remoto e híbrido, o distanciamento 
              é mais do que físico — ele impacta o bem-estar, o engajamento e gera um turnover que custa 
              caro para sua empresa. Mas existe uma forma melhor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: AlertTriangle,
                title: "Burnout Crescente",
                description: "Colaboradores sobrecarregados e desconectados da missão da empresa."
              },
              {
                icon: BarChart3,
                title: "Alto Turnover",
                description: "Perda constante de talentos e custos elevados de recontratação."
              },
              {
                icon: Users,
                title: "Equipes Fragmentadas",
                description: "Falta de coesão e comunicação eficaz entre membros da equipe."
              }
            ].map((problem, index) => (
              <Card 
                key={index} 
                className="text-center border-0 shadow-md"
                style={{
                  animation: problemsSection.isVisible ? `slide-up 0.6s ease-out ${index * 0.1}s both` : 'none'
                }}>
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <problem.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{problem.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section ref={solutionSection.ref} className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-700 ${solutionSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Conecte o<br />que importa
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Nexus Community é a sua plataforma completa para construir e gerenciar uma cultura de empresa forte. 
                Oferecemos um espaço unificado para comunicação, colaboração e reconhecimento, transformando desafios 
                em oportunidades de união.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">Plataforma unificada para toda a empresa</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">Ferramentas de engajamento e reconhecimento</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">Analytics para medir o bem-estar da equipe</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: Heart,
                  title: "Cultura Forte",
                  description: "Valores compartilhados em toda organização."
                },
                {
                  icon: Zap,
                  title: "Engajamento",
                  description: "Colaboradores motivados e conectados."
                },
                {
                  icon: TrendingUp,
                  title: "Resultados",
                  description: "Métricas claras de sucesso e crescimento."
                },
                {
                  icon: Users,
                  title: "União",
                  description: "Equipes conectadas independentemente da localização."
                }
              ].map((feature, index) => (
                <Card 
                  key={index} 
                  className="text-center border-0 shadow-md bg-background"
                  style={{
                    animation: solutionSection.isVisible ? `slide-up 0.6s ease-out ${index * 0.1 + 0.2}s both` : 'none'
                  }}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingSection.ref} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-700 ${pricingSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
              Planos que Crescem com Você
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Planos que Crescem com Você
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Escolha o plano perfeito para sua equipe. Todos incluem suporte premium e 
              atualizações gratuitas
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-12">
              <Button variant="outline" size="sm">Mensal</Button>
              <Button variant="default" size="sm">Anual</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <Card 
              className="border-2 border-border"
              style={{
                animation: pricingSection.isVisible ? 'slide-up 0.6s ease-out 0.1s both' : 'none'
              }}>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">Starter</h3>
                <p className="text-sm text-primary font-medium mb-2">Para times que estão começando a construir sua cultura</p>
                <p className="text-muted-foreground mb-6">Perfeito para pequenas equipes começando</p>
                
                <div className="mb-8">
                  <span className="text-4xl font-bold text-foreground">R$ 24,99</span>
                  <span className="text-muted-foreground">/mês por usuário</span>
                </div>

                <div className="space-y-4 mb-8 text-left">
                  {[
                    "Gestão de documentos: 10 GB",
                    "Feed social",
                    "Gestão de eventos",
                    "Gestão de pessoas",
                    "Chat integrado",
                    "Permissões granulares"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  Começar Agora
                </Button>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card 
              className="border-2 border-primary relative"
              style={{
                animation: pricingSection.isVisible ? 'slide-up 0.6s ease-out 0.2s both' : 'none'
              }}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                  ★ Mais Popular
                </div>
              </div>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">Profissional</h3>
                <p className="text-sm text-primary font-medium mb-2">Para times que querem fortalecer engajamento e produtividade</p>
                <p className="text-muted-foreground mb-6">Ideal para equipes em crescimento</p>
                
                <div className="mb-8">
                  <span className="text-4xl font-bold text-foreground">R$ 39,99</span>
                  <span className="text-muted-foreground">/mês por usuário</span>
                </div>

                <div className="space-y-4 mb-8 text-left">
                  {[
                    "Gestão de documentos: 100 GB",
                    "Chat de voz e vídeo",
                    "Time tracking avançado",
                    "Quadro Kanban",
                    "Analytics avançado",
                    "Sistema de recompensas",
                    "Sistema de níveis"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  Começar Agora
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card 
              className="border-2 border-border"
              style={{
                animation: pricingSection.isVisible ? 'slide-up 0.6s ease-out 0.3s both' : 'none'
              }}>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">Enterprise</h3>
                <p className="text-sm text-primary font-medium mb-2">Para organizações que lideram a transformação cultural</p>
                <p className="text-muted-foreground mb-6">Solução completa e personalizável para grandes organizações</p>
                
                <div className="mb-8">
                  <span className="text-4xl font-bold text-foreground">Personalizado</span>
                </div>

                <div className="space-y-4 mb-8 text-left">
                  {[
                    "Gestão de documentos: Personalizada",
                    "Personalização total",
                    "Suporte 24/7",
                    "Integrações Poderosas"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  Começar Agora
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section ref={ctaSection.ref} className="py-20 bg-primary">
        <div className={`container mx-auto px-4 text-center transition-all duration-700 ${ctaSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            Pronto para Revolucionar sua <span className="text-nexus-accent">Empresa?</span>
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de empresas que já transformaram sua 
            produtividade com o Nexus Community
          </p>
          
          <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 mb-12">
            Começar Gratuitamente <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <div className="flex flex-wrap justify-center gap-6 text-primary-foreground/80 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-nexus-accent" />
              <span>Teste gratuito de 14 dias</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-nexus-accent" />
              <span>Configuração em minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-nexus-accent" />
              <span>Suporte especializado</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">N</span>
                </div>
                <span className="text-2xl font-bold text-primary-foreground">Nexus</span>
              </div>
              
              <div className="space-y-2 text-primary-foreground/80">
                <div className="text-sm">Fundadores</div>
                <div className="flex items-center gap-2">
                  <span className="text-nexus-accent font-medium">CEO -</span>
                  <span>Pedro Matheus Lima da Cruz</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-nexus-accent font-medium">CTO -</span>
                  <span>João Lucas Cordeiro Santana</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-nexus-accent font-medium">CIO -</span>
                  <span>Lucas Rodrigues de Azevedo</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end space-x-2 mb-4">
                <span className="text-2xl font-bold text-primary-foreground">TeamConnect</span>
                <div className="w-8 h-8 bg-primary-foreground rounded-lg"></div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
            <p className="text-primary-foreground/60 text-sm">
              © 2025 Nexus Community. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;