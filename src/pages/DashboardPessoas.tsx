import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MessageCircle, Award, Users, Filter } from "lucide-react";
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
        {/* Header */}
        <div 
          ref={headerSection.ref} 
          className={`transition-all duration-700 ${headerSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-2xl font-semibold text-foreground tracking-tight">Pessoas</h1>
            </div>
            <p className="text-muted-foreground text-sm ml-12">Conheça seus colegas de trabalho</p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <Input 
                placeholder="Buscar por nome, cargo ou habilidades..." 
                className="pl-11 h-11 bg-card/50 border-border/50 rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20 focus-visible:border-primary/30 transition-all duration-300 placeholder:text-muted-foreground/60"
              />
            </div>
            <Button variant="outline" className="h-11 px-4 rounded-xl border-border/50 hover:bg-accent/50 gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filtrar</span>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border/30">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-light text-foreground">{people.length}</span>
              <span className="text-sm text-muted-foreground">colaboradores</span>
            </div>
            <div className="h-8 w-px bg-border/50" />
            <div className="flex items-center gap-2">
              <span className="text-3xl font-light text-foreground">1</span>
              <span className="text-sm text-muted-foreground">departamento</span>
            </div>
          </div>
        </div>

        {/* People Grid */}
        <div 
          ref={peopleSection.ref} 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {people.map((person, index) => (
            <Card 
              key={index}
              className="group border-border/30 bg-card/30 backdrop-blur-sm hover:bg-card/60 hover:border-border/50 transition-all duration-500 overflow-hidden"
              style={{
                animation: peopleSection.isVisible ? `fade-in 0.5s ease-out ${index * 0.1}s both` : 'none'
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-5">
                  {/* Avatar */}
                  <Avatar className="h-16 w-16 ring-2 ring-border/30 group-hover:ring-primary/20 transition-all duration-300">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-medium text-lg">
                      {person.initials}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-medium text-foreground truncate">{person.name}</h3>
                      <span className="text-xs text-muted-foreground/70 whitespace-nowrap">{person.joinedDate}</span>
                    </div>
                    
                    <p className="text-sm text-primary/80 font-medium mb-1">{person.role}</p>
                    <p className="text-xs text-muted-foreground mb-4">{person.department}</p>
                    
                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {person.skills.map((skill, skillIndex) => (
                        <Badge 
                          key={skillIndex} 
                          variant="secondary" 
                          className="text-xs font-normal bg-secondary/50 hover:bg-secondary/70 border-0 px-2.5 py-0.5"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="h-8 px-4 rounded-lg bg-primary/90 hover:bg-primary text-primary-foreground text-xs font-medium transition-all duration-300"
                      >
                        <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                        Conversar
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 rounded-lg hover:bg-accent/50"
                      >
                        <Award className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State Hint */}
        {people.length === 0 && (
          <div className="text-center py-20">
            <Users className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum colaborador encontrado</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPessoas;
