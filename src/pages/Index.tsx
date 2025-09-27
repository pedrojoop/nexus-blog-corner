import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Users, TrendingUp, Zap, Heart } from "lucide-react";
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

      {/* Features Section */}
      <section className="py-20 bg-accent/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Conecte o que importa
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nexus Community é a sua plataforma completa para construir e gerenciar uma cultura de empresa forte. 
              Oferecemos um espaço unificado para comunicação, colaboração e reconhecimento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Pronto para Revolucionar sua Empresa?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de empresas que já transformaram sua produtividade com o Nexus Community
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Começar Gratuitamente <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/blog">
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Ler Nosso Blog
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
