import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import DepartmentManagement from "@/components/settings/DepartmentManagement";
import UserManagement from "@/components/settings/UserManagement";
import PermissionsManagement from "@/components/settings/PermissionsManagement";
import ThemeCustomization from "@/components/settings/ThemeCustomization";
import { Building2, Users, Shield, Palette } from "lucide-react";

const DashboardConfiguracoes = () => {
  const headerSection = useScrollAnimation();

  return (
    <DashboardLayout>
      <div ref={headerSection.ref} className={`mb-8 transition-all duration-700 ${headerSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h1 className="text-3xl font-bold text-foreground mb-2">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações da plataforma</p>
      </div>

      <Tabs defaultValue="departments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-secondary/30 p-1 rounded-xl">
          <TabsTrigger value="departments" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all">
            <Building2 className="w-4 h-4" />
            <span className="hidden sm:inline">Departamentos</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Usuários</span>
          </TabsTrigger>
          <TabsTrigger value="permissions" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Cargos e Permissões</span>
          </TabsTrigger>
          <TabsTrigger value="customization" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Personalização</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="departments" className="space-y-4">
          <DepartmentManagement />
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <UserManagement />
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <PermissionsManagement />
        </TabsContent>

        <TabsContent value="customization" className="space-y-4">
          <ThemeCustomization />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default DashboardConfiguracoes;
