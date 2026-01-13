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
import { Target, Globe, Building2 } from "lucide-react";

export interface Meta {
  id: number;
  titulo: string;
  descricao: string;
  escopo: "GLOBAL" | "DEPARTAMENTO";
  xp: number;
  prazo: string;
  progresso: number;
}

interface MissaoModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (meta: Meta) => void;
  meta: Meta | null;
  isEditing: boolean;
  nextId?: number;
}

export const MissaoModal = ({ open, onClose, onSave, meta, isEditing, nextId = 1 }: MissaoModalProps) => {
  const [form, setForm] = useState<Meta>({
    id: nextId,
    titulo: "",
    descricao: "",
    escopo: "GLOBAL",
    xp: 100,
    prazo: "",
    progresso: 0,
  });

  useEffect(() => {
    if (meta && isEditing) {
      setForm(meta);
    } else {
      setForm({
        id: nextId,
        titulo: "",
        descricao: "",
        escopo: "GLOBAL",
        xp: 100,
        prazo: "",
        progresso: 0,
      });
    }
  }, [meta, isEditing, nextId, open]);

  const handleSubmit = () => {
    if (form.titulo.trim() && form.prazo.trim()) {
      onSave(form);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] glass-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            {isEditing ? "Editar Missão" : "Nova Missão"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título da Missão</Label>
            <Input
              id="titulo"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              placeholder="Ex: Completar 5 projetos, Mentorar colaboradores..."
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              placeholder="Descreva os detalhes e requisitos da missão..."
              className="bg-background/50 resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Escopo</Label>
            <Select
              value={form.escopo}
              onValueChange={(value: Meta["escopo"]) => setForm({ ...form, escopo: value })}
            >
              <SelectTrigger className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GLOBAL">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <span>Global - Para toda a empresa</span>
                  </div>
                </SelectItem>
                <SelectItem value="DEPARTAMENTO">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-accent" />
                    <span>Departamento - Específico por área</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="xp">Recompensa em XP</Label>
              <Input
                id="xp"
                type="number"
                value={form.xp}
                onChange={(e) => setForm({ ...form, xp: parseInt(e.target.value) || 0 })}
                placeholder="500"
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prazo">Prazo</Label>
              <Input
                id="prazo"
                value={form.prazo}
                onChange={(e) => setForm({ ...form, prazo: e.target.value })}
                placeholder="DD/MM/AAAA"
                className="bg-background/50"
              />
            </div>
          </div>

          {isEditing && (
            <div className="space-y-2">
              <Label htmlFor="progresso">Progresso Atual (%)</Label>
              <Input
                id="progresso"
                type="number"
                min={0}
                max={100}
                value={form.progresso}
                onChange={(e) => setForm({ ...form, progresso: parseInt(e.target.value) || 0 })}
                className="bg-background/50"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="btn-tech">
            {isEditing ? "Salvar Alterações" : "Criar Missão"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
