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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Plus, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Role {
  id: string;
  name: string;
  department: string;
  isAdmin: boolean;
}

const DEPARTMENTS = [
  "Tecnologia",
  "Recursos Humanos",
  "Financeiro",
  "Marketing",
  "Operações",
  "Comercial",
  "Gestão",
];

const PermissionsManagement = () => {
  const [roles, setRoles] = useState<Role[]>([
    { id: "1", name: "Desenvolvedor", department: "Tecnologia", isAdmin: false },
    { id: "2", name: "Analista de RH", department: "Recursos Humanos", isAdmin: true },
    { id: "3", name: "Gerente", department: "Gestão", isAdmin: true },
    { id: "4", name: "Estagiário", department: "Tecnologia", isAdmin: false },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({ name: "", department: "", isAdmin: false });

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
    setFormData({ name: role.name, department: role.department, isAdmin: role.isAdmin });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setRoles(roles.filter(r => r.id !== id));
    toast({ title: "Cargo excluído com sucesso" });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingRole(null);
    setFormData({ name: "", department: "", isAdmin: false });
  };

  return (
    <div className="space-y-6">
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
                <TableHead>Tipo de Acesso</TableHead>
                <TableHead className="w-32">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {role.name}
                      {role.isAdmin && (
                        <Badge variant="destructive" className="gap-1">
                          <Shield className="h-3 w-3" />
                          Admin
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{role.department}</TableCell>
                  <TableCell>
                    <span className={role.isAdmin ? "text-destructive font-medium" : "text-muted-foreground"}>
                      {role.isAdmin ? "Acesso Administrativo" : "Colaborador"}
                    </span>
                  </TableCell>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingRole ? "Editar Cargo" : "Novo Cargo"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Cargo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Analista de Marketing"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Departamento</Label>
              <Select 
                value={formData.department} 
                onValueChange={(value) => setFormData({ ...formData, department: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o departamento" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3 pt-2 border-t">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="isAdmin" className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-destructive" />
                    Acesso Administrativo (Admin)
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Habilite para conceder acesso total ao módulo de RH e gestão da plataforma. Desabilite para colaboradores padrão.
                  </p>
                </div>
                <Switch
                  id="isAdmin"
                  checked={formData.isAdmin}
                  onCheckedChange={(checked) => setFormData({ ...formData, isAdmin: checked })}
                />
              </div>
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
