import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full bg-white/80 backdrop-blur-lg border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-nexus-green to-nexus-green-light rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-nexus-green to-nexus-accent bg-clip-text text-transparent">Nexus</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-all duration-300 hover:text-nexus-accent relative group ${
              isActive('/') ? 'text-nexus-accent' : 'text-muted-foreground'
            }`}
          >
            Início
            {isActive('/') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-nexus-accent"></span>}
          </Link>
          <Link 
            to="/blog" 
            className={`text-sm font-medium transition-all duration-300 hover:text-nexus-accent relative group ${
              isActive('/blog') ? 'text-nexus-accent' : 'text-muted-foreground'
            }`}
          >
            Blog
            {isActive('/blog') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-nexus-accent"></span>}
          </Link>
          <Link 
            to="/servicos" 
            className={`text-sm font-medium transition-all duration-300 hover:text-nexus-accent relative group ${
              isActive('/servicos') ? 'text-nexus-accent' : 'text-muted-foreground'
            }`}
          >
            Serviços
            {isActive('/servicos') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-nexus-accent"></span>}
          </Link>
          <Link 
            to="/sobre" 
            className={`text-sm font-medium transition-all duration-300 hover:text-nexus-accent relative group ${
              isActive('/sobre') ? 'text-nexus-accent' : 'text-muted-foreground'
            }`}
          >
            Sobre
            {isActive('/sobre') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-nexus-accent"></span>}
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/auth">
            <Button variant="ghost" size="sm" className="hover:text-nexus-accent hover:bg-nexus-green-lighter/20 transition-all">
              Entrar
            </Button>
          </Link>
          <Link to="/auth">
            <Button size="sm" className="bg-gradient-to-r from-nexus-green to-nexus-green-light hover:scale-105 transition-all duration-300 shadow-md">
              Começar Grátis
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;