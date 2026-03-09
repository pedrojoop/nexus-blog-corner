import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Pencil, Trash2, Plus, Shield, Lock, Info, FileText, BookOpen, BarChart3, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Permission {
  key: string;
  label: string;
  enabled: boolean;
}

interface PermissionGroup {
  id: string;
  label: string;
  icon: React.ElementType;
  permissions: Permission[];
}

interface Role {
  id: string;
  name: string;
  scope: string;
  scopeLabel: string;
  activeUsers: number;
  locked: boolean;
  permissionGroups: PermissionGroup[];
}

const createDefaultPermissionGroups = (preset: "superadmin" | "manager" | "collaborator"): PermissionGroup[] => [
  {
    id: "documents",
    label: "Documentos (Nexus Brain)",
    icon: FileText,
    permissions: [
      { key: "doc_view_public", label: "Visualizar documentos públicos", enabled: true },
      { key: "doc_view_dept", label: "Visualizar documentos do departamento", enabled: preset !== "collaborator" || true },
      { key: "doc_upload", label: "Fazer upload de documentos", enabled: preset === "superadmin" || preset === "manager" },
    ],
  },
  {
    id: "training",
    label: "Treinamentos & LMS",
    icon: BookOpen,
    permissions: [
      { key: "lms_access", label: "Acessar trilhas de aprendizado", enabled: true },
      { key: "lms_manage", label: "Criar e gerenciar cursos", enabled: preset === "superadmin" },
      { key: "lms_progress_dept", label: "Ver progresso (Apenas seu departamento)", enabled: preset === "superadmin" || preset === "manager" },
    ],
  },
  {
    id: "analytics",
    label: "Analytics & RH",
    icon: BarChart3,
    permissions: [
      { key: "analytics_global", label: "Acessar People Analytics Global", enabled: preset === "superadmin" },
      { key: "analytics_dept", label: "Acessar Analytics do seu Departamento", enabled: preset === "superadmin" || preset === "manager" },
      { key: "config_gamification", label: "Configurar Gamificação e CaaS", enabled: preset === "superadmin" },
    ],
  },
  {
    id: "social",
    label: "Social (Feed & Eventos)",
    icon: Users,
    permissions: [
      { key: "feed_post", label: "Criar postagens no Feed", enabled: true },
      { key: "events_global", label: "Criar eventos globais", enabled: preset === "superadmin" },
    ],
  },
];

const INITIAL_ROLES: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    scope: "global",
    scopeLabel: "Global",
    activeUsers: 2,
    locked: true,
    permissionGroups: createDefaultPermissionGroups("superadmin"),
  },
  {
    id: "2",
    name: "Gestor de Departamento",
    scope: "department",
    scopeLabel: "Apenas Departamento",
    activeUsers: 15,
    locked: false,
    permissionGroups: createDefaultPermissionGroups("manager"),
  },
  {
    id: "3",
    name: "Colaborador Padrão",
    scope: "personal",
    scopeLabel: "Pessoal / Público",
    activeUsers: 145,
    locked: false,
    permissionGroups: createDefaultPermissionGroups("collaborator"),
  },
];

const SCOPE_OPTIONS = [
  { value: "global", label: "Global (Acesso Total)" },
  { value: "department", label: "Restrito ao Departamento do Usuário" },
  { value: "personal", label: "Pessoal / Público" },
];

const PermissionsManagement = () => {
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES);
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  const [editingRole, setEditingRole] = useState<Role | null>(INITIAL_ROLES[1]);
  const [editForm, setEditForm] = useState<Role | null>(INITIAL_ROLES[1]);

  const handleEdit = (role: Role) => {
    if (role.locked) return;
    setEditingRole(role);
    setEditForm(JSON.parse(JSON.stringify(role)));
    setIsSheetOpen(true);
  };

  const handleDelete = (id: string) => {
    const role = roles.find((r) => r.id === id);
    if (role?.locked) return;
    setRoles(roles.filter((r) => r.id !== id));
    toast({ title: "Cargo excluído com sucesso" });
  };

  const handleNewRole = () => {
    const newRole: Role = {
      id: Date.now().toString(),
      name: "",
      scope: "personal",
      scopeLabel: "Pessoal / Público",
      activeUsers: 0,
      locked: false,
      permissionGroups: createDefaultPermissionGroups("collaborator"),
    };
    setEditingRole(null);
    setEditForm(newRole);
    setIsSheetOpen(true);
  };

  const handleSave = () => {
    if (!editForm || !editForm.name.trim()) {
      toast({ title: "Nome do cargo é obrigatório", variant: "destructive" });
      return;
    }
    const scopeOption = SCOPE_OPTIONS.find((s) => s.value === editForm.scope);
    const updatedRole = { ...editForm, scopeLabel: scopeOption?.label.replace(" (Acesso Total)", "") || editForm.scopeLabel };

    if (editingRole) {
      setRoles(roles.map((r) => (r.id === editingRole.id ? updatedRole : r)));
      toast({ title: "Cargo atualizado com sucesso" });
    } else {
      setRoles([...roles, updatedRole]);
      toast({ title: "Cargo criado com sucesso" });
    }
    setIsSheetOpen(false);
    setEditForm(null);
    setEditingRole(null);
  };

  const togglePermission = (groupId: string, permKey: string) => {
    if (!editForm) return;
    setEditForm({
      ...editForm,
      permissionGroups: editForm.permissionGroups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              permissions: g.permissions.map((p) =>
                p.key === permKey ? { ...p, enabled: !p.enabled } : p
              ),
            }
          : g
      ),
    });
  };

  const getScopeBadgeVariant = (scope: string) => {
    switch (scope) {
      case "global":
        return "destructive";
      case "department":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Cargos e Permissões</h3>
          <p className="text-sm text-muted-foreground">
            Gerencie os cargos e controle o acesso granular por módulo e departamento.
          </p>
        </div>
        <Button onClick={handleNewRole} className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Cargo
        </Button>
      </div>

      <div className="border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="font-semibold">Nome do Cargo</TableHead>
              <TableHead className="font-semibold">Nível de Escopo</TableHead>
              <TableHead className="font-semibold">Usuários Ativos</TableHead>
              <TableHead className="font-semibold w-28">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id} className="hover:bg-muted/20 transition-colors">
                <TableCell className="font-medium text-foreground">
                  <div className="flex items-center gap-2.5">
                    {role.locked ? (
                      <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                        <Shield className="h-4 w-4 text-destructive" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Shield className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    {role.name}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getScopeBadgeVariant(role.scope)}>{role.scopeLabel}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-muted-foreground">{role.activeUsers} usuários</span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {role.locked ? (
                      <Button variant="ghost" size="icon" disabled className="opacity-40">
                        <Lock className="h-4 w-4" />
                      </Button>
                    ) : (
                      <>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(role)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(role.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Role Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={(open) => {
        setIsSheetOpen(open);
        if (!open) { setEditForm(null); setEditingRole(null); }
      }}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {editForm && (
            <div className="space-y-6">
              <SheetHeader>
                <SheetTitle className="text-xl font-bold text-foreground">
                  {editingRole ? `Editar Cargo: ${editingRole.name}` : "Novo Cargo"}
                </SheetTitle>
              </SheetHeader>

              {/* Section 1: Info & Data Scope */}
              <div className="space-y-5 border-b border-border pb-6">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Informações & Escopo de Dados (ABAC)
                </h4>
                <div className="space-y-2">
                  <Label htmlFor="roleName">Nome do Cargo</Label>
                  <Input
                    id="roleName"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="Ex: Gestor de Departamento"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Escopo de Dados</Label>
                  <Select
                    value={editForm.scope}
                    onValueChange={(value) => setEditForm({ ...editForm, scope: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SCOPE_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {editForm.scope === "department" && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <p className="text-xs text-muted-foreground">
                        Usuários com este cargo só poderão ver dados (Analytics, PDI, Documentos Restritos) do seu próprio departamento.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 2: Granular Permissions Matrix */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Matriz de Permissões Granulares (RBAC)
                </h4>
                <Accordion type="multiple" defaultValue={editForm.permissionGroups.map((g) => g.id)} className="space-y-2">
                  {editForm.permissionGroups.map((group) => {
                    const Icon = group.icon;
                    const enabledCount = group.permissions.filter((p) => p.enabled).length;
                    return (
                      <AccordionItem
                        key={group.id}
                        value={group.id}
                        className="border border-border rounded-lg px-4 overflow-hidden"
                      >
                        <AccordionTrigger className="hover:no-underline py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium text-foreground">{group.label}</span>
                            <Badge variant="outline" className="text-xs">
                              {enabledCount}/{group.permissions.length}
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <div className="space-y-3 pt-1">
                            {group.permissions.map((perm) => (
                              <div
                                key={perm.key}
                                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/30 transition-colors"
                              >
                                <span
                                  className={cn(
                                    "text-sm transition-colors",
                                    perm.enabled ? "text-foreground" : "text-muted-foreground"
                                  )}
                                >
                                  {perm.label}
                                </span>
                                <Switch
                                  checked={perm.enabled}
                                  onCheckedChange={() => togglePermission(group.id, perm.key)}
                                />
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>

              {/* Save / Cancel */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setIsSheetOpen(false);
                    setEditForm(null);
                    setEditingRole(null);
                  }}
                >
                  Cancelar
                </Button>
                <Button className="flex-1" onClick={handleSave}>
                  {editingRole ? "Salvar Alterações" : "Criar Cargo"}
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PermissionsManagement;
