import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Users, Zap, Video, Check } from "lucide-react";
import { toast } from "sonner";

interface CreateEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateEventModal = ({ open, onOpenChange }: CreateEventModalProps) => {
  const [platform, setPlatform] = useState<'meet' | 'teams' | null>(null);
  const [eventType, setEventType] = useState<'ritual' | 'social' | 'treinamento'>('social');
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);

  const handleGenerateLink = async (selectedPlatform: 'meet' | 'teams') => {
    setPlatform(selectedPlatform);
    setIsGeneratingLink(true);
    
    // Simulate link generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsGeneratingLink(false);
    toast.success(`Link do ${selectedPlatform === 'meet' ? 'Google Meet' : 'Microsoft Teams'} gerado!`);
  };

  const handleCreate = () => {
    toast.success('Evento criado com sucesso!');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">Criar Novo Evento</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Título do Evento</Label>
            <Input
              id="title"
              placeholder="Ex: Weekly Team Sync"
              className="bg-background/50 border-border/50"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva o objetivo do evento..."
              className="bg-background/50 border-border/50 min-h-[80px]"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Data
              </Label>
              <Input
                id="date"
                type="date"
                className="bg-background/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Horário
              </Label>
              <Input
                id="time"
                type="time"
                className="bg-background/50 border-border/50"
              />
            </div>
          </div>

          {/* Event Type */}
          <div className="space-y-2">
            <Label>Tipo de Evento</Label>
            <div className="grid grid-cols-3 gap-2">
              {(['ritual', 'social', 'treinamento'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setEventType(type)}
                  className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                    eventType === type
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border/50 bg-background/50 text-muted-foreground hover:border-primary/30'
                  }`}
                >
                  {type === 'ritual' ? 'Ritual' : type === 'social' ? 'Social' : 'Treinamento'}
                </button>
              ))}
            </div>
          </div>

          {/* Platform Selection */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Video className="h-4 w-4 text-muted-foreground" />
              Onde vai ser? (Online)
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {/* Google Meet */}
              <button
                onClick={() => handleGenerateLink('meet')}
                disabled={isGeneratingLink}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                  platform === 'meet'
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-border/50 bg-background/50 hover:border-green-500/50'
                }`}
              >
                {platform === 'meet' && (
                  <div className="absolute top-2 right-2 h-5 w-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
                <div className="flex flex-col items-center gap-2">
                  {/* Google Meet Logo placeholder */}
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Video className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Google Meet</span>
                  <span className="text-[10px] text-muted-foreground">Gerar link automaticamente</span>
                </div>
              </button>

              {/* Microsoft Teams */}
              <button
                onClick={() => handleGenerateLink('teams')}
                disabled={isGeneratingLink}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                  platform === 'teams'
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-border/50 bg-background/50 hover:border-purple-500/50'
                }`}
              >
                {platform === 'teams' && (
                  <div className="absolute top-2 right-2 h-5 w-5 bg-purple-500 rounded-full flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
                <div className="flex flex-col items-center gap-2">
                  {/* MS Teams Logo placeholder */}
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-foreground">MS Teams</span>
                  <span className="text-[10px] text-muted-foreground">Gerar link automaticamente</span>
                </div>
              </button>
            </div>
            {isGeneratingLink && (
              <p className="text-sm text-muted-foreground text-center animate-pulse">
                Gerando link da reunião...
              </p>
            )}
          </div>

          {/* XP Reward */}
          <div className="space-y-2">
            <Label htmlFor="xp" className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              Recompensa de XP
            </Label>
            <div className="flex items-center gap-3">
              <Input
                id="xp"
                type="number"
                defaultValue={50}
                min={0}
                max={500}
                className="bg-background/50 border-border/50 w-24"
              />
              <span className="text-sm text-muted-foreground">XP para quem participar</span>
            </div>
          </div>

          {/* Max Attendees */}
          <div className="space-y-2">
            <Label htmlFor="maxAttendees" className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              Limite de Participantes
            </Label>
            <Input
              id="maxAttendees"
              type="number"
              defaultValue={50}
              className="bg-background/50 border-border/50 w-24"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              className="flex-1 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
              onClick={handleCreate}
            >
              Criar Evento
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventModal;
