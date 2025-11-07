import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Role {
  id: string;
  name: string;
  department: string;
  description: string;
}

interface PermissionGroup {
  category: string;
  permissions: {
    id: string;
    label: string;
  }[];
}

const PERMISSION_GROUPS: PermissionGroup[] = [
  {
    category: "Sistema e Administração (Geral)",
    permissions: [
      { id: "is_admin", label: "Administrador do Sistema" },
      { id: "view_analytics", label: "Visualizar Analytics" },
      { id: "view_all_permissions", label: "Visualizar Todas as Permissões" },
      { id: "manage_super_admin", label: "Gerenciar Super Admins" },
    ],
  },
  {
    category: "Gestão de Pessoas (Usuários)",
    permissions: [
      { id: "view_users", label: "Visualizar Usuários" },
      { id: "create_user", label: "Criar Usuário" },
      { id: "edit_user", label: "Editar Usuário" },
      { id: "delete_user", label: "Excluir Usuário" },
    ],
  },
  {
    category: "Gestão de Cargos (Roles)",
    permissions: [
      { id: "view_roles", label: "Visualizar Cargos" },
      { id: "create_role", label: "Criar Cargo" },
      { id: "edit_role", label: "Editar Cargo" },
      { id: "delete_role", label: "Excluir Cargo" },
    ],
  },
  {
    category: "Gestão de Setores (Departments)",
    permissions: [
      { id: "view_departments", label: "Visualizar Departamentos" },
      { id: "create_department", label: "Criar Departamento" },
      { id: "edit_department", label: "Editar Departamento" },
      { id: "delete_department", label: "Excluir Departamento" },
    ],
  },
  {
    category: "Feed Social (Posts)",
    permissions: [
      { id: "view_feed", label: "Visualizar Feed" },
      { id: "create_post", label: "Criar Post" },
      { id: "like_post", label: "Curtir Post" },
      { id: "comment_on_post", label: "Comentar em Post" },
      { id: "edit_own_post", label: "Editar Próprios Posts" },
      { id: "delete_own_post", label: "Excluir Próprios Posts" },
      { id: "edit_any_post", label: "Editar Qualquer Post (Moderação)" },
      { id: "delete_any_post", label: "Excluir Qualquer Post (Moderação)" },
    ],
  },
  {
    category: "Chat e Mensagens",
    permissions: [
      { id: "view_chat", label: "Visualizar Chat" },
      { id: "create_group_chat", label: "Criar Grupos de Chat" },
      { id: "create_individual_chat", label: "Iniciar Chats Individuais" },
      { id: "view_messages", label: "Visualizar Histórico de Mensagens" },
      { id: "send_message", label: "Enviar Mensagens" },
      { id: "edit_own_message", label: "Editar Próprias Mensagens" },
      { id: "delete_own_message", label: "Excluir Próprias Mensagens" },
      { id: "edit_any_message", label: "Editar Qualquer Mensagem (Moderação)" },
      { id: "delete_any_message", label: "Excluir Qualquer Mensagem (Moderação)" },
    ],
  },
  {
    category: "Projetos e Tarefas (Kanban)",
    permissions: [
      { id: "view_projects", label: "Visualizar Projetos" },
      { id: "create_project", label: "Criar Projeto" },
      { id: "edit_project", label: "Editar Projeto" },
      { id: "delete_project", label: "Excluir Projeto" },
      { id: "view_kanban_boards", label: "Visualizar Quadros Kanban" },
      { id: "create_department_board", label: "Criar Quadro Kanban (Departamental)" },
      { id: "manage_kanban_structure", label: "Gerenciar Estrutura Kanban (Colunas)" },
      { id: "manage_kanban_cards", label: "Gerenciar Cartões Kanban (Tarefas)" },
    ],
  },
  {
    category: "Tickets (Solicitações)",
    permissions: [
      { id: "view_tickets", label: "Visualizar Tickets" },
      { id: "create_ticket", label: "Criar Ticket" },
      { id: "edit_ticket", label: "Editar Ticket" },
      { id: "delete_ticket", label: "Excluir Ticket" },
      { id: "add_comment_to_ticket", label: "Comentar em Ticket" },
    ],
  },
  {
    category: "RH: Ponto e Folha de Pagamento",
    permissions: [
      { id: "manage_time_settings", label: "Gerenciar Configurações de Ponto" },
      { id: "view_all_payroll_data", label: "Visualizar Dados de Folha (Todos)" },
      { id: "manage_payroll_data", label: "Gerenciar Salários e Benefícios" },
    ],
  },
  {
    category: "RH: Avaliações de Desempenho",
    permissions: [
      { id: "create_evaluation", label: "Criar Ciclo de Avaliação" },
      { id: "edit_evaluation", label: "Editar Ciclo de Avaliação" },
      { id: "delete_evaluation", label: "Excluir Ciclo de Avaliação" },
      { id: "view_evaluations", label: "Visualizar Ciclos de Avaliação" },
      { id: "manage_evaluation_questions", label: "Gerenciar Perguntas da Avaliação" },
      { id: "assign_evaluators", label: "Atribuir Avaliadores 360°" },
      { id: "view_evaluation_results", label: "Ver Resultados Consolidados (Admin)" },
      { id: "export_evaluation_data", label: "Exportar Dados de Avaliação" },
      { id: "view_own_evaluation_results", label: "Ver Próprios Resultados (Colaborador)" },
      { id: "submit_evaluation", label: "Responder/Submeter Avaliação" },
    ],
  },
  {
    category: "RH: Recrutamento (ATS)",
    permissions: [
      { id: "manage_jobs", label: "Gerenciar Vagas de Emprego" },
    ],
  },
  {
    category: "RH: Cultura (CaaS)",
    permissions: [
      { id: "view_rituals", label: "Visualizar Rituais Culturais" },
      { id: "manage_rituals", label: "Gerenciar Rituais Culturais" },
    ],
  },
  {
    category: "RH: Treinamentos (LMS)",
    permissions: [
      { id: "manage_lms", label: "Gerenciar Cursos e Módulos (LMS)" },
      { id: "view_lms_reports", label: "Ver Relatórios Consolidados (LMS)" },
    ],
  },
  {
    category: "Integrações",
    permissions: [
      { id: "manage_integration_settings", label: "Gerenciar Configurações de Integração" },
      { id: "view_integration_settings", label: "Visualizar Configurações de Integração" },
    ],
  },
];

const PermissionsManagement = () => {
  const [roles, setRoles] = useState<Role[]>([
    { id: "1", name: "Desenvolvedor", department: "Tecnologia", description: "Desenvolve soluções" },
    { id: "2", name: "Analista de RH", department: "Recursos Humanos", description: "Gestão de talentos" },
    { id: "3", name: "Gerente", department: "Gestão", description: "Gerencia equipes" },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({ name: "", department: "", description: "" });
  
  const [selectedRole, setSelectedRole] = useState("1");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(new Set());

  const handleRoleSubmit = () => {
    if (!formData.name.trim() || !formData.department.trim()) {
      toast({ title: "Nome e departamento são obrigatórios", variant: "destructive" });
      return;
    }

    if (editingRole) {
      setRoles(roles.map(r => 
        r.id === editingRole.id ? { ...r, ...formData } : r
      ));
      toast({ title: "Cargo atualizado com sucesso" });
    } else {
      setRoles([...roles, { 
        id: Date.now().toString(), 
        ...formData 
      }]);
      toast({ title: "Cargo criado com sucesso" });
    }
    
    handleCloseDialog();
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    setFormData({ name: role.name, department: role.department, description: role.description });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setRoles(roles.filter(r => r.id !== id));
    toast({ title: "Cargo excluído com sucesso" });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingRole(null);
    setFormData({ name: "", department: "", description: "" });
  };

  const handlePermissionToggle = (permissionId: string) => {
    const newPermissions = new Set(selectedPermissions);
    if (newPermissions.has(permissionId)) {
      newPermissions.delete(permissionId);
    } else {
      newPermissions.add(permissionId);
    }
    setSelectedPermissions(newPermissions);
    toast({ title: "Permissão atualizada" });
  };

  const filteredGroups = PERMISSION_GROUPS.map(group => ({
    ...group,
    permissions: group.permissions.filter(perm =>
      perm.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(group => group.permissions.length > 0);

  const currentRole = roles.find(r => r.id === selectedRole);

  return (
    <div className="space-y-6">
      {/* Roles Tab */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Cargos</h3>
          <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Cargo
          </Button>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="w-32">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>{role.department}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(role)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(role.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Permissions Tab */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-semibold">Permissões por Cargo</h3>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Label>Selecione o Cargo</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <Label>Pesquisar Permissões</Label>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Digite para pesquisar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {currentRole && (
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-sm font-medium">
              Editando permissões para: <span className="text-primary">{currentRole.name}</span>
            </p>
          </div>
        )}

        <Accordion type="multiple" className="space-y-2">
          {filteredGroups.map((group, groupIndex) => (
            <AccordionItem
              key={groupIndex}
              value={`item-${groupIndex}`}
              className="border rounded-lg px-4"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{group.category}</span>
                  <span className="text-xs text-muted-foreground">
                    ({group.permissions.length} permissões)
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {group.permissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-md transition-colors"
                    >
                      <Checkbox
                        id={permission.id}
                        checked={selectedPermissions.has(permission.id)}
                        onCheckedChange={() => handlePermissionToggle(permission.id)}
                      />
                      <Label
                        htmlFor={permission.id}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {permission.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {filteredGroups.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Nenhuma permissão encontrada para "{searchTerm}"
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingRole ? "Editar Cargo" : "Novo Cargo"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nome do cargo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Departamento</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="Departamento"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descrição do cargo"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancelar
            </Button>
            <Button onClick={handleRoleSubmit}>
              {editingRole ? "Salvar" : "Criar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PermissionsManagement;
