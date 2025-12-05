import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MessageCircle, Award, Users, Sparkles, MapPin, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Badge } from "@/components/ui/badge";

const DashboardPessoas = () => {
  const headerSection = useScrollAnimation();
  const peopleSection = useScrollAnimation();

  const people = [
    { 
      name: "Pedro Lima", 
      role: "Super Admin", 
      department: "TI", 
      initials: "PL",
      skills: ["React", "TypeScript", "Node.js"],
      joinedDate: "Jan 2023"
    },
    { 
      name: "Lucas", 
      role: "CTO", 
      department: "TI", 
      initials: "L",
      skills: ["Arquitetura", "Cloud", "DevOps"],
      joinedDate: "Mar 2022"
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header with gradient accent */}
        <div 
          ref={headerSection.ref} 
          className={`transition-all duration-700 ${headerSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Hero Section */}
          <div className="relative mb-8 p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/10 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 rounded-2xl bg-primary/20 backdrop-blur-sm border border-primary/20 shadow-lg shadow-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground tracking-tight">Pessoas</h1>
                  <p className="text-muted-foreground">Conheça seus colegas de trabalho</p>
                </div>
              </div>
              
              {/* Stats Row */}
              <div className="flex gap-6 mt-6">
                <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-foreground">{people.length}</span>
                    <p className="text-xs text-muted-foreground">Colaboradores</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <MapPin className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-foreground">1</span>
                    <p className="text-xs text-muted-foreground">Departamento</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-xl opacity-50" />
            <div className="relative flex gap-3">
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-all duration-300 group-focus-within:text-primary group-focus-within:scale-110" />
                <Input 
                  placeholder="Buscar por nome, cargo ou habilidades..." 
                  className="pl-12 h-14 bg-card/80 backdrop-blur-sm border-border/50 rounded-2xl text-base focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all duration-300 shadow-lg shadow-black/5"
                />
              </div>
            </div>
          </div>
        </div>

        {/* People Grid */}
        <div 
          ref={peopleSection.ref} 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {people.map((person, index) => (
            <div 
              key={index}
              className="group relative"
              style={{
                animation: peopleSection.isVisible ? `fade-in 0.6s ease-out ${index * 0.15}s both` : 'none'
              }}
            >
              {/* Card glow effect */}
              <div className="absolute -inset-1 bg-primary/40 rounded-3xl blur-lg opacity-0 group-hover:opacity-20 transition-all duration-500" />
              
              {/* Card */}
              <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-6 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
                {/* Top gradient line */}
                <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-primary/80 to-primary/40 rounded-full" />
                
                <div className="flex gap-5 pt-2">
                  {/* Avatar with ring effect */}
                  <div className="relative">
                    <div className="absolute -inset-1 bg-primary/50 rounded-full blur-sm opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
                    <Avatar className="relative h-20 w-20 ring-4 ring-background">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-bold text-xl">
                        {person.initials}
                      </AvatarFallback>
                    </Avatar>
                    {/* Online indicator */}
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 rounded-full border-4 border-card shadow-lg" />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-xl text-foreground mb-1 group-hover:text-primary transition-colors duration-300">{person.name}</h3>
                    <p className="text-sm font-semibold text-primary mb-0.5">{person.role}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {person.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {person.joinedDate}
                      </span>
                    </div>
                    
                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {person.skills.map((skill, skillIndex) => (
                        <Badge 
                          key={skillIndex} 
                          className="text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 border-0 px-3 py-1 rounded-full transition-all duration-300 hover:scale-105"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Conversar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-11 w-11 rounded-xl border-border/50 hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-500 transition-all duration-300"
                      >
                        <Award className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {people.length === 0 && (
          <div className="text-center py-20">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
              <Users className="relative h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            </div>
            <p className="text-muted-foreground text-lg">Nenhum colaborador encontrado</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPessoas;
