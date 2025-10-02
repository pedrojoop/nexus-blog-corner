import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, Shield, Bell, Palette } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const DashboardConfiguracoes = () => {
  const headerSection = useScrollAnimation();
  const categoriesSection = useScrollAnimation();

  const categories = [
    {
      icon: Building2,
      title: "Departamentos & Cargos",
      description: "Gerencie departamentos e cargos",
      color: "bg-primary",
    },
    {
      icon: Users,
      title: "Usuários",
      description: "Gerencie colaboradores",
      color: "bg-nexus-accent",
    },
    {
      icon: Shield,
      title: "Permissões",
      description: "Configure permissões por cargo",
      color: "bg-primary",
    },
    {
      icon: Bell,
      title: "Notificações",
      description: "Configurações de notificações",
      color: "bg-nexus-accent",
    },
    {
      icon: Palette,
      title: "Aparência",
      description: "Personalize a interface",
      color: "bg-primary",
    },
  ];

  return (
    <DashboardLayout>
      <div ref={headerSection.ref} className={`mb-8 transition-all duration-700 ${headerSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h1 className="text-3xl font-bold text-foreground mb-2">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações da plataforma</p>
      </div>

      <div ref={categoriesSection.ref}>
        <h2 className="text-xl font-semibold text-foreground mb-6">Categorias</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={index}
                className="border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group"
                style={{
                  animation: categoriesSection.isVisible ? `slide-up 0.6s ease-out ${index * 0.1}s both` : 'none'
                }}
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardConfiguracoes;
