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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Medal, Crown, Star, Gem, Zap } from "lucide-react";

export interface Nivel {
  nivel: number;
  xpNecessario: number;
  nome: string;
  icone: "bronze" | "silver" | "gold" | "platinum" | "diamond";
}

interface NivelModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (nivel: Nivel) => void;
  nivel: Nivel | null;
  isEditing: boolean;
  nextNivelNumber?: number;
}

const iconeOptions = [
  { value: "bronze", label: "Bronze", icon: <Medal className="h-5 w-5 text-amber-600" /> },
  { value: "silver", label: "Prata", icon: <Medal className="h-5 w-5 text-slate-400" /> },
  { value: "gold", label: "Ouro", icon: <Crown className="h-5 w-5 text-yellow-500" /> },
  { value: "platinum", label: "Platina", icon: <Star className="h-5 w-5 text-cyan-400" /> },
  { value: "diamond", label: "Diamante", icon: <Gem className="h-5 w-5 text-violet-400" /> },
];

export const NivelModal = ({ open, onClose, onSave, nivel, isEditing, nextNivelNumber = 1 }: NivelModalProps) => {
  const [form, setForm] = useState<Nivel>({
    nivel: nextNivelNumber,
    xpNecessario: 0,
    nome: "",
    icone: "bronze",
  });

  useEffect(() => {
    if (nivel && isEditing) {
      setForm(nivel);
    } else {
      setForm({
        nivel: nextNivelNumber,
        xpNecessario: 0,
        nome: "",
        icone: "bronze",
      });
    }
  }, [nivel, isEditing, nextNivelNumber, open]);

  const handleSubmit = () => {
    if (form.nome.trim()) {
      onSave(form);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] glass-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            {isEditing ? "Editar Nível" : "Novo Nível"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="nivel">Número do Nível</Label>
            <Input
              id="nivel"
              type="number"
              value={form.nivel}
              onChange={(e) => setForm({ ...form, nivel: parseInt(e.target.value) || 1 })}
              className="bg-background/50"
              disabled={isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nome">Nome do Nível</Label>
            <Input
              id="nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              placeholder="Ex: Iniciante, Mestre, Lendário..."
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="xp">XP Necessário</Label>
            <Input
              id="xp"
              type="number"
              value={form.xpNecessario}
              onChange={(e) => setForm({ ...form, xpNecessario: parseInt(e.target.value) || 0 })}
              placeholder="0"
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label>Ícone do Nível</Label>
            <Select
              value={form.icone}
              onValueChange={(value: Nivel["icone"]) => setForm({ ...form, icone: value })}
            >
              <SelectTrigger className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {iconeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    <div className="flex items-center gap-2">
                      {opt.icon}
                      <span>{opt.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="btn-tech">
            {isEditing ? "Salvar Alterações" : "Criar Nível"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
