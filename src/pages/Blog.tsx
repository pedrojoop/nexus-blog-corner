import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Users, Lightbulb, Target } from "lucide-react";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import culturaForteImage from "@/assets/blog-cultura-forte.jpg";
import engajamentoImage from "@/assets/blog-engajamento.jpg";
import futuroTrabalhoImage from "@/assets/blog-futuro-trabalho.jpg";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const heroAnimation = useScrollAnimation();

  const categories = [
    { name: "Todos", icon: null },
    { name: "Liderança", icon: Target },
    { name: "Estratégia", icon: TrendingUp },
    { name: "Cultura", icon: Users },
    { name: "Inovação", icon: Lightbulb },
  ];

  const blogPosts = [
    {
      title: "Estratégias de RH: O Plano de 3 Passos para Reduzir o Turnover em 2025",
      excerpt: "Descubra o método comprovado que reduziu a rotatividade em 47% nas empresas líderes do Brasil. Dados atualizados sobre o custo real da perda de talentos e como evitá-lo com gestão preditiva.",
      category: "Estratégia",
      author: "Maria Silva",
      date: "15 de Janeiro, 2025",
      readTime: "8 min",
      image: culturaForteImage,
      slug: "estrategias-rh-reduzir-turnover-2025"
    },
    {
      title: "O Custo Oculto da Cultura Fraca: 4 Métricas de RH para Liderar em 2025",
      excerpt: "Empresas com cultura forte têm 72% mais retenção. Descubra as 4 métricas essenciais de ROI que transformam cultura organizacional em vantagem competitiva e protegem seu investimento em talentos.",
      category: "Cultura",
      author: "João Santos",
      date: "12 de Janeiro, 2025",
      readTime: "7 min",
      image: engajamentoImage,
      slug: "custo-cultura-fraca-metricas-rh-2025"
    },
    {
      title: "IA Preditiva no RH: A Revolução que Acaba com o Turnover Inesperado (2025)",
      excerpt: "Como a inteligência artificial está transformando o RH estratégico. Preveja riscos de saída com 85% de precisão e tome decisões baseadas em dados reais antes de perder seus melhores talentos.",
      category: "Inovação",
      author: "Ana Costa",
      date: "10 de Janeiro, 2025",
      readTime: "9 min",
      image: futuroTrabalhoImage,
      slug: "ia-preditiva-rh-turnover-2025"
    },
    {
      title: "O Novo Liderado: Como a Liderança Deve Evitar o Desengajamento em 2025",
      excerpt: "As expectativas dos colaboradores mudaram. 68% dos profissionais consideram trocar de emprego por falta de conexão com a liderança. Aprenda as novas competências essenciais para reter talentos.",
      category: "Liderança",
      author: "Carlos Rodrigues",
      date: "8 de Janeiro, 2025",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
      slug: "nova-lideranca-desengajamento-2025"
    },
    {
      title: "Retenção de Talentos: O Que Funcionou em 2024 e o Que Mudou para 2025",
      excerpt: "Análise completa das estratégias de retenção que geraram resultados reais. Benchmarking atualizado com dados de empresas brasileiras e tendências globais para o próximo ciclo de RH estratégico.",
      category: "Estratégia",
      author: "Fernanda Lima",
      date: "5 de Janeiro, 2025",
      readTime: "10 min",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      slug: "retencao-talentos-estrategias-2025"
    },
    {
      title: "Cultura Organizacional como Ativo Financeiro: ROI de Engajamento em 2025",
      excerpt: "Cultura forte não é apenas um diferencial — é um ativo mensurável. Empresas com alta cultura registram 33% mais lucratividade. Aprenda a calcular e otimizar o ROI da sua cultura organizacional.",
      category: "Cultura",
      author: "Roberto Oliveira",
      date: "3 de Janeiro, 2025",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      slug: "cultura-organizacional-roi-2025"
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
            Descubra estratégias e tendências baseadas em dados reais de 2025 para revolucionar a retenção e a cultura organizacional.
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
              <BlogCard key={index} {...post} index={index} />
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