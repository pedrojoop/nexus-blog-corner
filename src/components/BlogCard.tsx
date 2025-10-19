import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image?: string;
  slug: string;
  index?: number;
}

const BlogCard = ({ title, excerpt, category, author, date, readTime, image, slug, index = 0 }: BlogCardProps) => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ 
        transitionDelay: `${index * 100}ms` 
      }}
    >
      <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:shadow-[var(--shadow-nexus)] h-full">
      <CardHeader className="p-0">
        {image && (
          <div className="aspect-video w-full overflow-hidden rounded-t-lg">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="bg-accent text-accent-foreground">
            {category}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground space-x-2">
            <Clock className="w-3 h-3" />
            <span>{readTime}</span>
          </div>
        </div>

        <Link to={`/blog/${slug}`}>
          <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <User className="w-3 h-3" />
            <span>{author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{date}</span>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

export default BlogCard;