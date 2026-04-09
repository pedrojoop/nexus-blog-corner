import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home, MessageSquare, Calendar, FileText, Users, Settings, Menu,
  Briefcase, ChevronDown, BookOpen, Sparkles, User, BarChart3, LogOut,
  Target, Brain, UserPlus, FileCheck, Grid3X3, Flag, GraduationCap,
  DollarSign, Clock, Palmtree, Receipt, Route, UserMinus, ClipboardList,
  Megaphone, ShieldCheck, Stethoscope, Trophy, Coffee, Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggle from "@/components/ThemeToggle";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DashboardLayoutProps {
  children: ReactNode;
}

const menuSections = [
  {
    label: "MENU PRINCIPAL",
    items: [
      { icon: Briefcase, label: "Visão Geral do RH", path: "/dashboard/rh" },
      { icon: Home, label: "Feed Principal", path: "/dashboard" },
      { icon: MessageSquare, label: "Chat", path: "/dashboard/chat" },
      { icon: Calendar, label: "Eventos", path: "/dashboard/eventos" },
      { icon: Brain, label: "Documentos (Nexus Brain)", path: "/dashboard/documentos" },
      { icon: Users, label: "Pessoas", path: "/dashboard/pessoas" },
      { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
    ],
  },
  {
    label: "AQUISIÇÃO DE TALENTOS",
    items: [
      { icon: Briefcase, label: "ATS & Vagas", path: "/dashboard/rh/ats" },
      { icon: FileCheck, label: "Admissão Digital", path: "/dashboard/rh/admissao" },
    ],
  },
  {
    label: "GESTÃO DE TALENTOS",
    items: [
      { icon: Grid3X3, label: "Performance (9-Box)", path: "/dashboard/performance" },
      { icon: Target, label: "Metas & 1:1s", path: "/dashboard/performance" },
      { icon: GraduationCap, label: "Treinamentos (LMS)", path: "/dashboard/rh/lms" },
      { icon: DollarSign, label: "Cargos e Salários", path: "/dashboard/rh/cargos-salarios" },
    ],
  },
  {
    label: "CORE HR (DP)",
    items: [
      { icon: Clock, label: "Ponto & Escalas", path: "/dashboard/rh/ponto" },
      { icon: Palmtree, label: "Férias & Ausências", path: "/dashboard/rh/ferias" },
      { icon: Receipt, label: "Holerites & Folha", path: "/dashboard/rh/folha" },
    ],
  },
  {
    label: "JORNADAS",
    items: [
      { icon: Route, label: "Onboarding", path: "/dashboard/rh/jornadas" },
      { icon: UserMinus, label: "Offboarding Estratégico", path: "/dashboard/rh/offboarding" },
    ],
  },
  {
    label: "SAÚDE & COMPLIANCE",
    items: [
      { icon: ClipboardList, label: "Pesquisas (eNPS)", path: "/dashboard/rh/pesquisas" },
      { icon: Megaphone, label: "Canal de Denúncias", path: "/dashboard/rh/denuncias" },
      { icon: Stethoscope, label: "SST & Atestados", path: "/dashboard/rh/sst" },
    ],
  },
  {
    label: "OUTROS",
    items: [
      { icon: Sparkles, label: "IA de Cultura", path: "/dashboard/rh/ia-cultura" },
      { icon: Trophy, label: "Gamificação", path: "/dashboard/rh/gamificacao" },
      { icon: Coffee, label: "Culture-as-a-Service", path: "/dashboard/rh/caas" },
      { icon: Settings, label: "Configurações", path: "/dashboard/configuracoes" },
    ],
  },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const getInitialCollapsed = () => {
    const collapsed: string[] = [];
    // All sections start expanded; collapse none by default
    return collapsed;
  };
  const [collapsedSections, setCollapsedSections] = useState<string[]>(getInitialCollapsed());

  const toggleSection = (label: string) => {
    setCollapsedSections(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

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
                <p className="text-xs text-primary-foreground/70">Suíte RH End-to-End</p>
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
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none focus:ring-2 focus:ring-nexus-accent focus:ring-offset-2 rounded-full">
                  <Avatar className="h-10 w-10 cursor-pointer hover:opacity-90 transition-opacity border-2 border-nexus-accent">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro" />
                    <AvatarFallback className="bg-nexus-accent text-primary-foreground font-semibold">PL</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-card border-border z-[100]" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Pedro Lima</p>
                    <p className="text-xs leading-none text-muted-foreground">diretoria@nexuscommunity.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard/perfil?tab=info")} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" /><span>Meu Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/dashboard/perfil")} className="cursor-pointer">
                  <BarChart3 className="mr-2 h-4 w-4" /><span>Meu Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/auth")} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" /><span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 bottom-0 bg-card border-r border-border z-40 transition-all duration-300",
          isSidebarOpen ? "w-72" : "w-20"
        )}
      >
        <ScrollArea className="h-full">
          <nav className="p-3">
            {menuSections.map((section) => {
              const isCollapsed = collapsedSections.includes(section.label);
              return (
                <div key={section.label} className="mb-1">
                  {isSidebarOpen ? (
                    <button
                      onClick={() => toggleSection(section.label)}
                      className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold tracking-wider text-muted-foreground/70 hover:text-muted-foreground transition-colors uppercase"
                    >
                      <span>{section.label}</span>
                      <ChevronDown className={cn("h-3 w-3 transition-transform", isCollapsed && "-rotate-90")} />
                    </button>
                  ) : (
                    <div className="h-px bg-border mx-2 my-2" />
                  )}

                  {!isCollapsed && (
                    <div className="space-y-0.5">
                      {section.items.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;
                        const isRHOverview = item.path === "/dashboard/rh";
                        return (
                          <Link
                            key={item.path + item.label}
                            to={item.path}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group text-sm",
                              isActive
                                ? isRHOverview
                                  ? "bg-[hsl(243,75%,59%)]/10 text-[hsl(243,75%,59%)] font-semibold border border-[hsl(243,75%,59%)]/20"
                                  : "bg-primary/10 text-primary font-semibold"
                                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                            )}
                          >
                            <Icon className={cn("h-4 w-4 flex-shrink-0", isActive && isRHOverview && "text-[hsl(243,75%,59%)]")} />
                            {isSidebarOpen && <span className="truncate">{item.label}</span>}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "pt-16 transition-all duration-300 animate-fade-in",
          isSidebarOpen ? "ml-72" : "ml-20"
        )}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
