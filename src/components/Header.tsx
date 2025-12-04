import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full bg-background/80 border-b border-border backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="text-primary-foreground font-bold text-xl font-space">N</span>
          </div>
          <span className="text-xl font-bold text-foreground font-space">Nexus</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-all duration-300 hover:text-primary ${
              isActive('/') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Início
          </Link>
          <Link 
            to="/blog" 
            className={`text-sm font-medium transition-all duration-300 hover:text-primary ${
              isActive('/blog') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Blog
          </Link>
          <Link 
            to="/servicos" 
            className={`text-sm font-medium transition-all duration-300 hover:text-primary ${
              isActive('/servicos') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Serviços
          </Link>
          <Link 
            to="/sobre" 
            className={`text-sm font-medium transition-all duration-300 hover:text-primary ${
              isActive('/sobre') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Sobre
          </Link>
          <Link 
            to="/contato" 
            className={`text-sm font-medium transition-all duration-300 hover:text-primary ${
              isActive('/contato') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Contato
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <ThemeToggle variant="landing" />
          <Link to="/auth">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent/50">
              Entrar
            </Button>
          </Link>
          <Link to="/auth">
            <Button size="sm" className="btn-gold">
              Começar Grátis
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
