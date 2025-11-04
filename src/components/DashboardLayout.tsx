import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, MessageSquare, Calendar, FileText, FolderKanban, Users, Settings, Menu, Briefcase, ChevronDown, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { icon: Home, label: "Feed Principal", path: "/dashboard" },
  { icon: MessageSquare, label: "Chat", path: "/dashboard/chat" },
  { icon: Calendar, label: "Eventos", path: "/dashboard/eventos" },
  { icon: FileText, label: "Documentos", path: "/dashboard/documentos" },
  { icon: FolderKanban, label: "Projetos", path: "/dashboard/projetos" },
  { icon: Users, label: "Pessoas", path: "/dashboard/pessoas" },
  { icon: BookOpen, label: "Treinamento", path: "/dashboard/treinamento" },
  { 
    icon: Sparkles, 
    label: "Jornada do Colaborador", 
    path: "/dashboard/onboarding",
    submenu: [
      { label: "Meu Onboarding & PDI", path: "/dashboard/onboarding" },
      { label: "Gestão (Admin)", path: "/dashboard/onboarding/admin" },
    ]
  },
  { 
    icon: Briefcase, 
    label: "RH", 
    path: "/dashboard/rh",
    submenu: [
      { label: "Inteligência Preditiva", path: "/dashboard/rh" },
      { label: "Gestão de Ponto", path: "/dashboard/rh/ponto" },
      { label: "Cultura e Engajamento", path: "/dashboard/rh/gamificacao" },
      { label: "Gestão de Talentos", path: "/dashboard/rh/recrutamento" },
      { label: "Treinamentos (LMS)", path: "/dashboard/rh/lms" },
      { label: "Culture-as-a-Service", path: "/dashboard/rh/caas" },
    ]
  },
  { 
    icon: MessageSquare, 
    label: "Tickets", 
    path: "/dashboard/tickets",
    submenu: [
      { label: "Meus Tickets", path: "/dashboard/tickets" },
      { label: "Novo Ticket", path: "/dashboard/tickets/novo" },
      { label: "Gestão (Admin)", path: "/dashboard/tickets/gestor" },
    ]
  },
  { icon: Settings, label: "Configurações", path: "/dashboard/configuracoes" },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Auto-open submenus based on current route
  const getInitialOpenSubmenus = () => {
    const openMenus: string[] = [];
    if (location.pathname.startsWith("/dashboard/rh")) openMenus.push("/dashboard/rh");
    if (location.pathname.startsWith("/dashboard/tickets")) openMenus.push("/dashboard/tickets");
    if (location.pathname.startsWith("/dashboard/onboarding")) openMenus.push("/dashboard/onboarding");
    return openMenus;
  };
  
  const [openSubmenus, setOpenSubmenus] = useState<string[]>(getInitialOpenSubmenus());

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary border-b border-primary-foreground/10 h-16">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-nexus-accent rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">N</span>
              </div>
              <div>
                <span className="text-xl font-bold text-primary-foreground">Nexus Community</span>
                <p className="text-xs text-primary-foreground/70">Rede Social Corporativa</p>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <Button className="bg-nexus-accent hover:bg-nexus-accent/90 text-primary-foreground transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              + Nova Postagem
            </Button>
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <div className="w-2 h-2 bg-nexus-accent rounded-full animate-pulse"></div>
              <span className="text-sm">Online</span>
            </div>
            <div className="w-10 h-10 bg-nexus-accent rounded-full flex items-center justify-center text-primary-foreground font-semibold">
              PL
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-16 bottom-0 bg-card border-r border-border z-40 transition-all duration-300",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <nav className="p-4">
          <div className="space-y-2">
            <p className={cn(
              "text-xs font-semibold text-muted-foreground mb-4 transition-opacity",
              !isSidebarOpen && "opacity-0"
            )}>
              MENU PRINCIPAL
            </p>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const hasSubmenu = 'submenu' in item && item.submenu;
              const isSubmenuOpen = hasSubmenu && openSubmenus.includes(item.path);
              const Icon = item.icon;
              
              return (
                <div key={item.path}>
                  {hasSubmenu ? (
                    <>
                      <button
                        onClick={() => {
                          setOpenSubmenus(prev => 
                            prev.includes(item.path) 
                              ? prev.filter(p => p !== item.path)
                              : [...prev, item.path]
                          );
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 group",
                          location.pathname.startsWith(item.path)
                            ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]" 
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-sm hover:scale-[1.01]"
                        )}
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        {isSidebarOpen && (
                          <>
                            <span className="font-medium flex-1 text-left">{item.label}</span>
                            <ChevronDown className={cn(
                              "h-4 w-4 transition-transform",
                              isSubmenuOpen && "rotate-180"
                            )} />
                          </>
                        )}
                      </button>
                      {isSidebarOpen && isSubmenuOpen && item.submenu && (
                        <div className="ml-8 mt-1 space-y-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className={cn(
                                "block px-3 py-2 text-sm rounded-md transition-all duration-300",
                                location.pathname === subItem.path
                                  ? "bg-gradient-to-r from-nexus-accent to-nexus-accent/90 text-primary-foreground font-semibold shadow-md scale-[1.02] border-l-2 border-primary"
                                  : "text-muted-foreground hover:bg-accent/50 hover:scale-[1.01] hover:translate-x-1"
                              )}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 group",
                        isActive 
                          ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]" 
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-sm hover:scale-[1.01] hover:-translate-y-0.5"
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {isSidebarOpen && (
                        <span className="font-medium">{item.label}</span>
                      )}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main 
        className={cn(
          "pt-16 transition-all duration-300 animate-fade-in",
          isSidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
