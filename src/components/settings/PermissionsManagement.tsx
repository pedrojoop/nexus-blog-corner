import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface Permission {
  module: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

const MODULES = [
  "Dashboard",
  "Chat",
  "Documentos",
  "Pessoas",
  "Projetos",
  "Kanban",
  "Tickets",
  "Eventos",
  "RH - Onboarding/Offboarding",
  "RH - Ponto",
  "RH - Recrutamento",
  "RH - Gamificação",
  "Configurações",
];

const PermissionsManagement = () => {
  const [selectedRole, setSelectedRole] = useState("Desenvolvedor");
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isDepartmentAdmin, setIsDepartmentAdmin] = useState(false);
  
  const [permissions, setPermissions] = useState<Record<string, Permission>>(
    MODULES.reduce((acc, module) => ({
      ...acc,
      [module]: { module, view: true, create: false, edit: false, delete: false }
    }), {})
  );

  const handlePermissionChange = (module: string, action: keyof Omit<Permission, 'module'>, value: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [module]: { ...prev[module], [action]: value }
    }));
    toast({ title: "Permissão atualizada" });
  };

  const handleSuperAdminToggle = (checked: boolean) => {
    setIsSuperAdmin(checked);
    if (checked) {
      setIsDepartmentAdmin(false);
      const allPermissions = MODULES.reduce((acc, module) => ({
        ...acc,
        [module]: { module, view: true, create: true, edit: true, delete: true }
      }), {});
      setPermissions(allPermissions);
    }
    toast({ title: checked ? "SuperAdmin ativado" : "SuperAdmin desativado" });
  };

  const handleDepartmentAdminToggle = (checked: boolean) => {
    setIsDepartmentAdmin(checked);
    if (checked) {
      setIsSuperAdmin(false);
    }
    toast({ title: checked ? "Admin de Departamento ativado" : "Admin de Departamento desativado" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Permissões por Cargo</h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Selecione o Cargo</Label>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Desenvolvedor">Desenvolvedor</SelectItem>
              <SelectItem value="Analista de RH">Analista de RH</SelectItem>
              <SelectItem value="Gerente">Gerente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-4 p-4 border rounded-lg bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-semibold">SuperAdmin</Label>
              <p className="text-sm text-muted-foreground">
                Acesso total a todas as funcionalidades do sistema
              </p>
            </div>
            <Switch
              checked={isSuperAdmin}
              onCheckedChange={handleSuperAdminToggle}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-semibold">Admin de Departamento</Label>
              <p className="text-sm text-muted-foreground">
                Acesso administrativo ao departamento específico
              </p>
            </div>
            <Switch
              checked={isDepartmentAdmin}
              onCheckedChange={handleDepartmentAdminToggle}
            />
          </div>
        </div>

        {isSuperAdmin && (
          <Badge className="w-full justify-center py-2">
            Este cargo possui acesso total (SuperAdmin)
          </Badge>
        )}

        {isDepartmentAdmin && (
          <Badge variant="secondary" className="w-full justify-center py-2">
            Este cargo é Admin do Departamento
          </Badge>
        )}
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted p-4">
          <div className="grid grid-cols-5 gap-4 font-semibold text-sm">
            <div>Módulo</div>
            <div className="text-center">Visualizar</div>
            <div className="text-center">Criar</div>
            <div className="text-center">Editar</div>
            <div className="text-center">Excluir</div>
          </div>
        </div>
        
        <div className="divide-y">
          {MODULES.map((module) => (
            <div key={module} className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-muted/50 transition-colors">
              <div className="font-medium text-sm">{module}</div>
              <div className="flex justify-center">
                <Switch
                  checked={permissions[module].view}
                  onCheckedChange={(checked) => handlePermissionChange(module, 'view', checked)}
                  disabled={isSuperAdmin}
                />
              </div>
              <div className="flex justify-center">
                <Switch
                  checked={permissions[module].create}
                  onCheckedChange={(checked) => handlePermissionChange(module, 'create', checked)}
                  disabled={isSuperAdmin}
                />
              </div>
              <div className="flex justify-center">
                <Switch
                  checked={permissions[module].edit}
                  onCheckedChange={(checked) => handlePermissionChange(module, 'edit', checked)}
                  disabled={isSuperAdmin}
                />
              </div>
              <div className="flex justify-center">
                <Switch
                  checked={permissions[module].delete}
                  onCheckedChange={(checked) => handlePermissionChange(module, 'delete', checked)}
                  disabled={isSuperAdmin}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PermissionsManagement;
