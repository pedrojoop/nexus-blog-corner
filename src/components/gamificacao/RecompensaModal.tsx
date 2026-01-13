import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gift, Star, Award } from "lucide-react";

export interface Recompensa {
  id: number;
  nome: string;
  valor: number;
  xpCusto: number;
  nivelMinimo: number;
  descricao: string;
  tipo: "monetario" | "beneficio" | "experiencia";
}

interface RecompensaModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (recompensa: Recompensa) => void;
  recompensa: Recompensa | null;
  isEditing: boolean;
  nextId?: number;
}

const tipoOptions = [
  { value: "monetario", label: "Monetário", icon: <Gift className="h-5 w-5 text-accent" />, desc: "Vales, créditos, bonificações" },
  { value: "beneficio", label: "Benefício", icon: <Star className="h-5 w-5 text-yellow-500" />, desc: "Dias de folga, flexibilidade" },
  { value: "experiencia", label: "Experiência", icon: <Award className="h-5 w-5 text-primary" />, desc: "Cursos, mentorias, eventos" },
];

export const RecompensaModal = ({ open, onClose, onSave, recompensa, isEditing, nextId = 1 }: RecompensaModalProps) => {
  const [form, setForm] = useState<Recompensa>({
    id: nextId,
    nome: "",
    valor: 0,
    xpCusto: 100,
    nivelMinimo: 1,
    descricao: "",
    tipo: "monetario",
  });

  useEffect(() => {
    if (recompensa && isEditing) {
      setForm(recompensa);
    } else {
      setForm({
        id: nextId,
        nome: "",
        valor: 0,
        xpCusto: 100,
        nivelMinimo: 1,
        descricao: "",
        tipo: "monetario",
      });
    }
  }, [recompensa, isEditing, nextId, open]);

  const handleSubmit = () => {
    if (form.nome.trim()) {
      onSave(form);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] glass-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Gift className="h-6 w-6 text-accent" />
            {isEditing ? "Editar Recompensa" : "Nova Recompensa"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome da Recompensa</Label>
            <Input
              id="nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              placeholder="Ex: Vale-Presente R$50, Dia de Folga..."
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              placeholder="Descreva os detalhes da recompensa..."
              className="bg-background/50 resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Tipo de Recompensa</Label>
            <Select
              value={form.tipo}
              onValueChange={(value: Recompensa["tipo"]) => setForm({ ...form, tipo: value })}
            >
              <SelectTrigger className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tipoOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    <div className="flex items-center gap-2">
                      {opt.icon}
                      <div>
                        <span className="font-medium">{opt.label}</span>
                        <span className="text-muted-foreground ml-2 text-xs">- {opt.desc}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="xpCusto">Custo em XP</Label>
              <Input
                id="xpCusto"
                type="number"
                value={form.xpCusto}
                onChange={(e) => setForm({ ...form, xpCusto: parseInt(e.target.value) || 0 })}
                placeholder="500"
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="valor">Valor (R$ ou dias)</Label>
              <Input
                id="valor"
                type="number"
                value={form.valor}
                onChange={(e) => setForm({ ...form, valor: parseInt(e.target.value) || 0 })}
                placeholder="50"
                className="bg-background/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nivelMinimo">Nível Mínimo Necessário</Label>
            <Input
              id="nivelMinimo"
              type="number"
              min={1}
              max={10}
              value={form.nivelMinimo}
              onChange={(e) => setForm({ ...form, nivelMinimo: parseInt(e.target.value) || 1 })}
              className="bg-background/50"
            />
            <p className="text-xs text-muted-foreground">
              Níveis 1-3: Comum | Níveis 4-7: Raro | Níveis 8+: Lendário
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="btn-tech">
            {isEditing ? "Salvar Alterações" : "Criar Recompensa"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
