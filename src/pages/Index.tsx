import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Users, TrendingUp, Zap, Heart, AlertTriangle, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-primary-foreground/20 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
            Nexus Community
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Conecte. Inove. <span className="text-nexus-accent">Transforme.</span>
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
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Sua equipe está mais distante do que nunca?
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Em um mundo de trabalho remoto e híbrido, a desconexão é real. O distanciamento 
              leva ao burnout, à falta de engajamento e a um turnover que custa caro. Mas existe uma 
              forma melhor.
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
              <Card key={index} className="text-center border-0 shadow-md">
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
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
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
                <Card key={index} className="text-center border-0 shadow-md bg-background">
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
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
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
            <Card className="border-2 border-border">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">Starter</h3>
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
            <Card className="border-2 border-primary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                  ★ Mais Popular
                </div>
              </div>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">Profissional</h3>
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
            <Card className="border-2 border-border">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">Enterprise</h3>
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
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
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