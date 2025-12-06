import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingDown, Users, DollarSign, Heart, AlertTriangle, BarChart3, Brain, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Problema = () => {
  const statsSection = useScrollAnimation();
  const costSection = useScrollAnimation();
  const cultureSection = useScrollAnimation();
  const solutionSection = useScrollAnimation();

  const mainStats = [
    {
      value: "31%",
      label: "dos funcionários estão engajados no trabalho",
      source: "Gallup, 2024",
      sourceUrl: "https://www.gallup.com/workplace/654911/employee-engagement-sinks-year-low.aspx",
      icon: TrendingDown,
      highlight: "Menor nível em 10 anos"
    },
    {
      value: "20%",
      label: "dos trabalhadores sentem solidão diariamente",
      source: "Gallup State of Global Workplace, 2024",
      sourceUrl: "https://www.gallup.com/workplace/645758/state-of-the-global-workplace-2024-press-release.aspx",
      icon: Heart,
      highlight: "1 em cada 5 funcionários"
    },
    {
      value: "$8.9T",
      label: "em perdas de produtividade global por desengajamento",
      source: "Gallup, 2024",
      sourceUrl: "https://www.gallup.com/workplace/349484/state-of-the-global-workplace.aspx",
      icon: DollarSign,
      highlight: "9% do PIB mundial"
    },
    {
      value: "52%",
      label: "dos funcionários estão procurando ou observando novas vagas",
      source: "Gallup, 2024",
      sourceUrl: "https://www.gallup.com/workplace/349484/state-of-the-global-workplace.aspx",
      icon: Users,
      highlight: "Mais da metade da força de trabalho"
    }
  ];

  const remoteStats = [
    {
      title: "O Paradoxo do Trabalho Remoto",
      description: "Trabalhadores remotos têm 31% de engajamento (8 pontos acima do presencial), mas menor bem-estar geral e maior solidão.",
      source: "Gallup, 2024",
      sourceUrl: "https://www.gallup.com/workplace/660236/remote-work-paradox-engaged-distressed.aspx"
    },
    {
      title: "Turnover em Empresas 100% Remotas",
      description: "Empresas totalmente remotas apresentam taxas de rotatividade maiores do que empresas híbridas ou presenciais.",
      source: "GlobeSt Research, 2024",
      sourceUrl: "https://www.globest.com/2024/07/05/fully-remote-companies-have-higher-turnover-rates/"
    },
    {
      title: "Flexibilidade Reduz 'Quiet Quitting'",
      description: "Funcionários que podem escolher entre remoto, híbrido ou presencial são 14x menos propensos a 'desistir silenciosamente'.",
      source: "Great Place to Work, 2024",
      sourceUrl: "https://www.greatplacetowork.com/press-releases/research-employees-who-can-choose-between-onsite,-remote,-or-hybrid-work-are-14x-less-likely-to-%E2%80%98quit-and-stay%E2%80%99"
    }
  ];

  const costData = [
    { label: "Custo de substituição por funcionário", value: "50-200%", sublabel: "do salário anual" },
    { label: "Tempo médio para produtividade plena", value: "8-12", sublabel: "meses" },
    { label: "Queda na produtividade da equipe", value: "25-50%", sublabel: "durante transição" },
    { label: "Perda de conhecimento institucional", value: "Incalculável", sublabel: "" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden">
        <div className="glow-orb glow-orb-gold w-96 h-96 -top-48 -right-48" />
        <div className="glow-orb glow-orb-green w-72 h-72 -bottom-36 -left-36" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-destructive/10 dark:bg-destructive/20 text-destructive rounded-full px-4 py-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">dados que preocupam</span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] text-foreground">
              A Crise Silenciosa do Turnover e Desengajamento
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              O trabalho remoto e híbrido trouxe flexibilidade, mas também criou uma 
              <strong className="text-foreground"> epidemia de desconexão</strong>. 
              Veja os dados que comprovam a urgência de agir.
            </p>
          </div>
        </div>
      </section>

      {/* Main Stats Section */}
      <section ref={statsSection.ref} className="py-20 md:py-32 border-t border-border">
        <div className="container mx-auto px-4">
          <div className={`max-w-6xl mx-auto transition-all duration-700 ${statsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-16">
              <span className="text-accent font-medium">estatísticas globais</span>
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-foreground mt-2">
                O Estado do Engajamento em 2024
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {mainStats.map((stat, index) => (
                <div 
                  key={index}
                  className="glass-card p-8 space-y-4 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center">
                      <stat.icon className="h-7 w-7 text-accent" />
                    </div>
                    <span className="text-xs font-medium text-destructive bg-destructive/10 px-3 py-1 rounded-full">
                      {stat.highlight}
                    </span>
                  </div>
                  
                  <div>
                    <p className="font-serif text-5xl md:text-6xl font-normal text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-muted-foreground mt-2 leading-relaxed">
                      {stat.label}
                    </p>
                  </div>
                  
                  <a 
                    href={stat.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
                  >
                    <span>Fonte: {stat.source}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Remote/Hybrid Work Section */}
      <section ref={cultureSection.ref} className="py-20 md:py-32 bg-secondary/30 dark:bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className={`max-w-6xl mx-auto transition-all duration-700 ${cultureSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-16">
              <span className="text-accent font-medium">trabalho remoto e híbrido</span>
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-foreground mt-2">
                O Custo Oculto da Flexibilidade
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
                A transição para modelos flexíveis trouxe benefícios, mas também desafios que 
                muitas empresas ainda não conseguiram resolver.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {remoteStats.map((item, index) => (
                <div 
                  key={index}
                  className="glass-card p-8 space-y-4 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <h3 className="font-serif text-xl font-medium text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                  <a 
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
                  >
                    <span>Fonte: {item.source}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cost of Turnover Section */}
      <section ref={costSection.ref} className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className={`max-w-6xl mx-auto transition-all duration-700 ${costSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-accent font-medium">impacto financeiro</span>
                <h2 className="font-serif text-3xl md:text-4xl font-normal text-foreground leading-tight">
                  O Verdadeiro Custo do Turnover
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cada funcionário que deixa sua empresa representa muito mais do que o custo de 
                  recrutamento. Considere o impacto real nos seus resultados.
                </p>
                
                <div className="space-y-4 pt-4">
                  {costData.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 dark:bg-secondary/30"
                    >
                      <span className="text-muted-foreground">{item.label}</span>
                      <div className="text-right">
                        <span className="font-serif text-2xl font-medium text-foreground">{item.value}</span>
                        {item.sublabel && (
                          <span className="text-sm text-muted-foreground ml-1">{item.sublabel}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Fonte: <a href="https://info.workinstitute.com/hubfs/2024%20Retention%20Report/Work%20Institute%202024%20Retention%20Report.pdf" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 inline-flex items-center gap-1">
                    Work Institute 2024 Retention Report <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-destructive/10 to-accent/10 dark:from-destructive/20 dark:to-accent/20 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent dark:from-destructive/10" />
                <div className="relative space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-destructive/20 flex items-center justify-center">
                      <BarChart3 className="w-8 h-8 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Custo médio por saída</p>
                      <p className="font-serif text-3xl font-medium text-foreground">R$ 45.000+</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Recrutamento</span>
                      <div className="flex-1 mx-4 h-3 bg-secondary rounded-full overflow-hidden">
                        <div className="w-1/4 h-full bg-destructive/60 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium text-foreground">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Treinamento</span>
                      <div className="flex-1 mx-4 h-3 bg-secondary rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-destructive/70 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium text-foreground">35%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Produtividade perdida</span>
                      <div className="flex-1 mx-4 h-3 bg-secondary rounded-full overflow-hidden">
                        <div className="w-2/5 h-full bg-destructive/80 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium text-foreground">40%</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground pt-4 border-t border-border">
                    *Baseado em salário médio de R$ 5.000/mês para cargos operacionais
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Teaser */}
      <section ref={solutionSection.ref} className="py-20 md:py-32 bg-primary dark:bg-card">
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto text-center space-y-8 transition-all duration-700 ${solutionSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 dark:bg-accent/10 rounded-full px-4 py-2">
              <Brain className="w-5 h-5 text-primary-foreground dark:text-accent" />
              <span className="text-primary-foreground dark:text-accent font-medium">existe uma solução</span>
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-primary-foreground dark:text-foreground leading-tight">
              Prevenir é melhor (e mais barato) do que remediar
            </h2>
            
            <p className="text-primary-foreground/80 dark:text-muted-foreground text-lg max-w-2xl mx-auto">
              A Nexus usa inteligência artificial e ferramentas de engajamento para identificar 
              riscos de turnover <strong className="text-primary-foreground dark:text-foreground">antes que aconteçam</strong>, 
              permitindo ações preventivas que protegem seu investimento em talentos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/dashboard">
                <Button 
                  size="lg" 
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 dark:bg-accent dark:text-accent-foreground dark:hover:bg-accent/90 rounded-full text-base px-8 py-6 font-medium transition-all duration-300 hover:shadow-lg"
                >
                  Acessar Demo Grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/servicos">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent text-primary-foreground border-2 border-primary-foreground/30 hover:border-primary-foreground/60 hover:bg-primary-foreground/5 dark:text-foreground dark:border-foreground/30 dark:hover:border-foreground/60 dark:hover:bg-foreground/5 rounded-full text-base font-medium px-8 py-6 transition-all duration-300"
                >
                  Ver Funcionalidades
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-primary-foreground/60 dark:text-muted-foreground">
              Sem necessidade de cartão de crédito • Acesso instantâneo
            </p>
          </div>
        </div>
      </section>

      {/* Sources Section */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Fontes e Referências</h3>
            <div className="grid md:grid-cols-2 gap-4 text-xs text-muted-foreground">
              <a href="https://www.gallup.com/workplace/349484/state-of-the-global-workplace.aspx" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-1">
                Gallup State of the Global Workplace 2024 <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://www.gallup.com/workplace/654911/employee-engagement-sinks-year-low.aspx" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-1">
                Gallup U.S. Employee Engagement 2024 <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://info.workinstitute.com/hubfs/2024%20Retention%20Report/Work%20Institute%202024%20Retention%20Report.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-1">
                Work Institute 2024 Retention Report <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://www.greatplacetowork.com/press-releases/research-employees-who-can-choose-between-onsite,-remote,-or-hybrid-work-are-14x-less-likely-to-%E2%80%98quit-and-stay%E2%80%99" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-1">
                Great Place to Work Research 2024 <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://owllabs.com/state-of-hybrid-work/2024" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-1">
                Owl Labs State of Hybrid Work 2024 <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://www.globest.com/2024/07/05/fully-remote-companies-have-higher-turnover-rates/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-1">
                GlobeSt Remote Work Turnover Analysis <ExternalLink className="w-3 h-3" />
              </a>
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

export default Problema;
