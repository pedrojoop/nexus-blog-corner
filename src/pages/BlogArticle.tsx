import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface BlogArticleProps {
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  content: {
    introduction: string;
    sections: {
      title: string;
      content: string;
      subsections?: {
        subtitle: string;
        text: string;
      }[];
    }[];
    conclusion: string;
    references?: string[];
  };
}

const BlogArticle = ({ title, category, author, date, readTime, image, content }: BlogArticleProps) => {
  const heroAnimation = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 py-12">
        <div className="container mx-auto px-4">
          <Link to="/blog">
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Blog
            </Button>
          </Link>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Article Header */}
          <div className="mb-8">
            <Badge className="mb-4">{category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readTime} de leitura</span>
              </div>
            </div>

            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" />
              Compartilhar
            </Button>
          </div>

          {/* Featured Image */}
          <div className="mb-12 rounded-lg overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-[400px] object-cover"
            />
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-muted-foreground leading-relaxed">
              {content.introduction}
            </p>
          </div>

          {/* Main Content Sections */}
          {content.sections.map((section, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {section.title}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {section.content}
                </p>
                
                {section.subsections && section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex} className="mb-6 pl-6 border-l-4 border-primary/30">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">
                      {subsection.subtitle}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {subsection.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Conclusion */}
          <div className="mb-12 bg-accent/50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Conclusão
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {content.conclusion}
            </p>
          </div>

          {/* References */}
          {content.references && content.references.length > 0 && (
            <div className="mb-12 border-t border-border pt-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Referências
              </h3>
              <ul className="space-y-2">
                {content.references.map((reference, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {index + 1}. {reference}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Author Card */}
          <div className="border-t border-border pt-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{author}</p>
                <p className="text-sm text-muted-foreground">
                  Especialista em Gestão de Pessoas e Cultura Organizacional
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="bg-accent py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-accent-foreground mb-4">
            Transforme a Gestão de Pessoas da Sua Empresa
          </h2>
          <p className="text-accent-foreground/80 mb-8 max-w-2xl mx-auto">
            Descubra como a Nexus Community pode ajudar sua empresa a reduzir o turnover e construir uma cultura de alta performance.
          </p>
          <Link to="/">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Conheça a Plataforma
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogArticle;
