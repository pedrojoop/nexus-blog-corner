import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Users, Lightbulb, Target } from "lucide-react";
import { useState } from "react";
import culturaForteImage from "@/assets/blog-cultura-forte.jpg";
import engajamentoImage from "@/assets/blog-engajamento.jpg";
import futuroTrabalhoImage from "@/assets/blog-futuro-trabalho.jpg";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = [
    { name: "Todos", icon: null },
    { name: "Liderança", icon: Target },
    { name: "Produtividade", icon: TrendingUp },
    { name: "Cultura", icon: Users },
    { name: "Inovação", icon: Lightbulb },
  ];

  const blogPosts = [
    {
      title: "Como Construir uma Cultura Forte em Equipes Remotas",
      excerpt: "Descubra estratégias práticas para manter sua equipe conectada e engajada, mesmo trabalhando à distância. Aprenda sobre ferramentas e metodologias que transformam desafios em oportunidades.",
      category: "Cultura",
      author: "Maria Silva",
      date: "15 de Janeiro, 2024",
      readTime: "5 min",
      image: culturaForteImage,
      slug: "cultura-forte-equipes-remotas"
    },
    {
      title: "5 Estratégias para Aumentar o Engajamento da Equipe",
      excerpt: "Explore métodos comprovados para motivar colaboradores e criar um ambiente de trabalho mais produtivo. Baseado em pesquisas recentes sobre comportamento organizacional.",
      category: "Liderança",
      author: "João Santos",
      date: "12 de Janeiro, 2024",
      readTime: "7 min",
      image: engajamentoImage,
      slug: "estrategias-engajamento-equipe"
    },
    {
      title: "O Futuro do Trabalho: Tendências para 2024",
      excerpt: "Análise das principais tendências que moldarão o ambiente corporativo nos próximos anos, incluindo IA, trabalho híbrido e novas expectativas dos colaboradores.",
      category: "Inovação",
      author: "Ana Costa",
      date: "10 de Janeiro, 2024",
      readTime: "6 min",
      image: futuroTrabalhoImage,
      slug: "futuro-trabalho-tendencias-2024"
    },
    {
      title: "Ferramentas Essenciais para Produtividade em 2024",
      excerpt: "Um guia completo das melhores ferramentas e aplicativos que podem revolucionar a produtividade da sua equipe e otimizar processos internos.",
      category: "Produtividade",
      author: "Carlos Rodrigues",
      date: "8 de Janeiro, 2024",
      readTime: "4 min",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80",
      slug: "ferramentas-produtividade-2024"
    },
    {
      title: "Como Medir o Sucesso da Cultura Organizacional",
      excerpt: "Métricas e indicadores essenciais para avaliar a saúde da cultura da sua empresa e implementar melhorias baseadas em dados concretos.",
      category: "Cultura",
      author: "Fernanda Lima",
      date: "5 de Janeiro, 2024",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      slug: "medir-sucesso-cultura-organizacional"
    },
    {
      title: "Liderança Transformacional na Era Digital",
      excerpt: "Como adaptar estilos de liderança para o mundo digital e inspirar equipes em um ambiente de constante mudança tecnológica.",
      category: "Liderança",
      author: "Roberto Oliveira",
      date: "3 de Janeiro, 2024",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
      slug: "lideranca-transformacional-era-digital"
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-primary-foreground/20 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
            Nexus Blog
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Insights que <span className="text-nexus-accent">Transformam</span>
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Descubra estratégias, tendências e insights para revolucionar sua cultura organizacional e potencializar sua equipe.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Pesquisar artigos..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.name)}
                    className="flex items-center space-x-2"
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{category.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={index} {...post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Nenhum artigo encontrado para os filtros selecionados.
              </p>
            </div>
          )}

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Carregar Mais Artigos
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-accent py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-accent-foreground mb-4">
            Não Perca Nenhuma Novidade
          </h2>
          <p className="text-accent-foreground/80 mb-8 max-w-2xl mx-auto">
            Receba insights exclusivos, tendências e estratégias diretamente na sua caixa de entrada. 
            Junte-se a milhares de líderes que já transformaram suas equipes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              className="bg-background"
            />
            <Button className="bg-primary hover:bg-primary/90">
              Inscrever-se
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;