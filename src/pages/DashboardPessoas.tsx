import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MessageCircle, Award } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const DashboardPessoas = () => {
  const headerSection = useScrollAnimation();
  const peopleSection = useScrollAnimation();

  const people = [
    { name: "Pedro Lima", role: "Super Admin", department: "TI", initials: "PL" },
    { name: "Lucas", role: "CTO", department: "TI", initials: "L" },
  ];

  return (
    <DashboardLayout>
      <div ref={headerSection.ref} className={`transition-all duration-700 ${headerSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Pessoas</h1>
          <p className="text-muted-foreground">Conheça seus colegas de trabalho</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Buscar por nome, cargo ou habilidades..." 
              className="pl-10 bg-card border-border focus-visible:ring-primary/30 transition-all duration-300"
            />
          </div>
          <select className="px-4 py-2 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-300">
            <option>Todos os Departamentos</option>
            <option>Geral</option>
            <option>RH</option>
            <option>TI</option>
          </select>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-primary">
            <Avatar className="h-6 w-6 bg-primary">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">2</AvatarFallback>
            </Avatar>
            <span className="font-semibold">2 colaboradores</span>
          </div>
        </div>
      </div>

      <div ref={peopleSection.ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {people.map((person, index) => (
          <Card 
            key={index}
            className="border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            style={{
              animation: peopleSection.isVisible ? `slide-up 0.6s ease-out ${index * 0.1}s both` : 'none'
            }}
          >
            <CardContent className="p-6 text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4 bg-primary">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                  {person.initials}
                </AvatarFallback>
              </Avatar>
              
              <h3 className="font-bold text-lg text-foreground mb-1">{person.name}</h3>
              <p className="text-sm text-primary font-medium mb-1">{person.role}</p>
              <p className="text-sm text-muted-foreground mb-4">{person.department}</p>
              
              <div className="flex items-center justify-center gap-2 mb-4 text-sm text-muted-foreground">
                <span>Desde 31/12/1969</span>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">Habilidades</p>
                {/* Placeholder for skills */}
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button className="flex-1 bg-primary hover:bg-primary/90 transition-all duration-300">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Conversar
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-accent transition-colors">
                  <Award className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPessoas;
