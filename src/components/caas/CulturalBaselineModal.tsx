import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  MessageSquare,
  Heart,
  Sparkles,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Clock,
  Trophy,
  Users,
  Target,
  Brain,
  Zap,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface CulturalBaseline {
  // Step 1: Ritmos e Rituais
  oneOnOneFrequency: "weekly" | "biweekly" | "monthly" | "";
  deepWorkDays: string[];
  
  // Step 2: Valores e Reconhecimento
  celebrationMethods: string[];
  coreValues: string[];
  
  // Step 3: Limites e Saúde
  communicationLimit: string;
  feedbackStyle: number;
  
  // Step 4: Valores da Empresa
  companyValues: string;
}

interface CulturalBaselineModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (baseline: CulturalBaseline) => void;
  existingBaseline?: CulturalBaseline | null;
}

const DAYS_OF_WEEK = [
  { id: "seg", label: "Seg" },
  { id: "ter", label: "Ter" },
  { id: "qua", label: "Qua" },
  { id: "qui", label: "Qui" },
  { id: "sex", label: "Sex" },
];

const CELEBRATION_METHODS = [
  { id: "feed", label: "Post no Feed Principal", icon: MessageSquare },
  { id: "happyhour", label: "Happy Hour Digital", icon: Users },
  { id: "private", label: "Mensagem Privada", icon: Heart },
];

const CORE_VALUES = [
  { id: "colaboracao", label: "Colaboração", color: "bg-blue-500" },
  { id: "inovacao", label: "Inovação", color: "bg-purple-500" },
  { id: "agilidade", label: "Agilidade", color: "bg-emerald-500" },
  { id: "empatia", label: "Empatia", color: "bg-pink-500" },
  { id: "foco_resultados", label: "Foco em Resultados", color: "bg-amber-500" },
  { id: "transparencia", label: "Transparência", color: "bg-cyan-500" },
  { id: "excelencia", label: "Excelência", color: "bg-indigo-500" },
  { id: "diversidade", label: "Diversidade", color: "bg-orange-500" },
];

const STEPS = [
  { id: 1, title: "Ritmos e Rituais", subtitle: "Operacional", icon: Calendar },
  { id: 2, title: "Valores e Reconhecimento", subtitle: "Social", icon: Trophy },
  { id: 3, title: "Limites e Saúde", subtitle: "Emocional", icon: Heart },
  { id: 4, title: "Valores da Empresa", subtitle: "Identidade", icon: Target },
];

const DEFAULT_BASELINE: CulturalBaseline = {
  oneOnOneFrequency: "",
  deepWorkDays: [],
  celebrationMethods: [],
  coreValues: [],
  communicationLimit: "18:00",
  feedbackStyle: 3,
  companyValues: "",
};

export function CulturalBaselineModal({
  open,
  onOpenChange,
  onComplete,
  existingBaseline,
}: CulturalBaselineModalProps) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleting, setIsCompleting] = useState(false);
  const [baseline, setBaseline] = useState<CulturalBaseline>(
    existingBaseline || DEFAULT_BASELINE
  );

  const progress = (currentStep / STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsCompleting(true);
    
    // Simulate save delay
    setTimeout(() => {
      onComplete(baseline);
      setIsCompleting(false);
      setCurrentStep(1);
      toast({
        title: "Baseline Cultural Configurada! ✨",
        description: "O Nexus Copilot agora está calibrado para sua equipe.",
      });
      onOpenChange(false);
    }, 1500);
  };

  const toggleDeepWorkDay = (dayId: string) => {
    setBaseline((prev) => ({
      ...prev,
      deepWorkDays: prev.deepWorkDays.includes(dayId)
        ? prev.deepWorkDays.filter((d) => d !== dayId)
        : [...prev.deepWorkDays, dayId],
    }));
  };

  const toggleCelebrationMethod = (methodId: string) => {
    setBaseline((prev) => ({
      ...prev,
      celebrationMethods: prev.celebrationMethods.includes(methodId)
        ? prev.celebrationMethods.filter((m) => m !== methodId)
        : [...prev.celebrationMethods, methodId],
    }));
  };

  const toggleCoreValue = (valueId: string) => {
    setBaseline((prev) => {
      const current = prev.coreValues;
      if (current.includes(valueId)) {
        return { ...prev, coreValues: current.filter((v) => v !== valueId) };
      }
      if (current.length >= 3) {
        toast({
          title: "Limite atingido",
          description: "Selecione no máximo 3 valores core.",
          variant: "destructive",
        });
        return prev;
      }
      return { ...prev, coreValues: [...current, valueId] };
    });
  };

  const getFeedbackStyleLabel = (value: number) => {
    const labels = [
      "Muito Direto",
      "Direto",
      "Equilibrado",
      "Empático",
      "Muito Empático",
    ];
    return labels[value - 1] || "Equilibrado";
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return baseline.oneOnOneFrequency !== "";
      case 2:
        return baseline.celebrationMethods.length > 0 && baseline.coreValues.length === 3;
      case 3:
        return baseline.communicationLimit !== "";
      case 4:
        return baseline.companyValues.trim() !== "";
      default:
        return true;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">
                Configuração de Baseline Cultural
              </DialogTitle>
              <DialogDescription>
                Configure as regras que a IA usará para identificar desvios e sugerir rituais
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Passo {currentStep} de {STEPS.length}</span>
            <span>{Math.round(progress)}% concluído</span>
          </div>
          <Progress value={progress} className="h-2" />
          
          {/* Step Indicators */}
          <div className="flex justify-between">
            {STEPS.map((step) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center gap-1 transition-all ${
                    isActive
                      ? "text-primary"
                      : isCompleted
                      ? "text-emerald-600"
                      : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full transition-all ${
                      isActive
                        ? "bg-primary/10 ring-2 ring-primary"
                        : isCompleted
                        ? "bg-emerald-500/10"
                        : "bg-muted"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <StepIcon className="h-4 w-4" />
                    )}
                  </div>
                  <span className="text-xs font-medium hidden sm:block">
                    {step.subtitle}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Step Content */}
        <div className="py-4 min-h-[300px]">
          {/* Step 1: Ritmos e Rituais */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in-50 duration-300">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary mb-3">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">Ritmos e Rituais</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Defina a cadência operacional ideal para sua organização
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-base font-semibold">
                    Qual é a frequência ideal para reuniões 1:1 nesta organização?
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    A IA disparará alertas se a frequência cair abaixo do definido
                  </p>
                  <Select
                    value={baseline.oneOnOneFrequency}
                    onValueChange={(value: "weekly" | "biweekly" | "monthly") =>
                      setBaseline({ ...baseline, oneOnOneFrequency: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione a frequência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-emerald-500" />
                          Semanal (Recomendado para equipes remotas)
                        </div>
                      </SelectItem>
                      <SelectItem value="biweekly">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-500" />
                          Quinzenal
                        </div>
                      </SelectItem>
                      <SelectItem value="monthly">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          Mensal
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    Existem janelas de "Deep Work" ou dias sem reuniões?
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Selecione os dias dedicados ao trabalho focado
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {DAYS_OF_WEEK.map((day) => {
                      const isSelected = baseline.deepWorkDays.includes(day.id);
                      return (
                        <Button
                          key={day.id}
                          type="button"
                          variant={isSelected ? "default" : "outline"}
                          className={`px-4 py-2 transition-all ${
                            isSelected
                              ? "bg-primary text-primary-foreground shadow-lg"
                              : "hover:bg-primary/10"
                          }`}
                          onClick={() => toggleDeepWorkDay(day.id)}
                        >
                          {day.label}
                          {isSelected && (
                            <CheckCircle className="ml-2 h-4 w-4" />
                          )}
                        </Button>
                      );
                    })}
                  </div>
                  {baseline.deepWorkDays.length > 0 && (
                    <p className="text-sm text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      {baseline.deepWorkDays.length} dia(s) de Deep Work configurado(s)
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Valores e Reconhecimento */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in-50 duration-300">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full text-amber-600 mb-3">
                  <Trophy className="h-4 w-4" />
                  <span className="font-medium">Valores e Reconhecimento</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Configure como sua organização celebra conquistas
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    Como vocês preferem celebrar vitórias e marcos?
                  </Label>
                  <div className="grid gap-3">
                    {CELEBRATION_METHODS.map((method) => {
                      const Icon = method.icon;
                      const isSelected = baseline.celebrationMethods.includes(method.id);
                      return (
                        <div
                          key={method.id}
                          className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            isSelected
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => toggleCelebrationMethod(method.id)}
                        >
                          <Checkbox
                            checked={isSelected}
                            className="pointer-events-none"
                          />
                          <Icon className={`h-5 w-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                          <span className={isSelected ? "font-medium" : ""}>
                            {method.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    Selecione os 3 valores core que devem ser mais incentivados na Gamificação
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Estes valores definirão as recompensas e badges disponíveis
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {CORE_VALUES.map((value) => {
                      const isSelected = baseline.coreValues.includes(value.id);
                      return (
                        <Badge
                          key={value.id}
                          variant={isSelected ? "default" : "outline"}
                          className={`px-4 py-2 cursor-pointer transition-all text-sm ${
                            isSelected
                              ? `${value.color} text-white hover:opacity-90`
                              : "hover:bg-muted"
                          }`}
                          onClick={() => toggleCoreValue(value.id)}
                        >
                          {value.label}
                          {isSelected && (
                            <CheckCircle className="ml-1 h-3 w-3" />
                          )}
                        </Badge>
                      );
                    })}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Selecionados: {baseline.coreValues.length}/3
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Limites e Saúde */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in-50 duration-300">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 rounded-full text-pink-600 mb-3">
                  <Heart className="h-4 w-4" />
                  <span className="font-medium">Limites e Saúde</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Proteja o bem-estar da sua equipe com limites saudáveis
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    Qual é o horário limite esperado para comunicações digitais sem urgência?
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    A IA monitorará padrões de comunicação fora deste horário para detectar sinais de burnout
                  </p>
                  <div className="flex items-center gap-4">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <Input
                      type="time"
                      value={baseline.communicationLimit}
                      onChange={(e) =>
                        setBaseline({ ...baseline, communicationLimit: e.target.value })
                      }
                      className="w-32"
                    />
                    <span className="text-sm text-muted-foreground">
                      Mensagens após este horário serão sinalizadas
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label className="text-base font-semibold">
                    Estilo de Feedback predominante na organização:
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Isso ajuda a IA a calibrar sugestões de comunicação e rituais de feedback
                  </p>
                  
                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-amber-500" />
                        Direto / Radical
                      </span>
                      <span className="flex items-center gap-2">
                        Empático / Suave
                        <Heart className="h-4 w-4 text-pink-500" />
                      </span>
                    </div>
                    
                    <Slider
                      value={[baseline.feedbackStyle]}
                      onValueChange={(value) =>
                        setBaseline({ ...baseline, feedbackStyle: value[0] })
                      }
                      min={1}
                      max={5}
                      step={1}
                      className="py-4"
                    />
                    
                    <div className="text-center">
                      <Badge variant="secondary" className="text-base px-4 py-1">
                        {getFeedbackStyleLabel(baseline.feedbackStyle)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Valores da Empresa */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in-50 duration-300">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-indigo-600 mb-3">
                  <Target className="h-4 w-4" />
                  <span className="font-medium">Valores da Empresa</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Descreva os valores que definem a identidade da sua organização
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    Quais são os valores pregados pela empresa?
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Descreva os valores, missão e princípios que guiam sua organização.
                    A IA usará essas informações para personalizar sugestões e detectar desvios culturais.
                  </p>
                  <Textarea
                    value={baseline.companyValues}
                    onChange={(e) =>
                      setBaseline({ ...baseline, companyValues: e.target.value })
                    }
                    placeholder="Ex: Nossa empresa valoriza a transparência em todas as comunicações, o respeito mútuo entre colaboradores, a busca constante por inovação, e o compromisso com resultados sustentáveis..."
                    className="min-h-[180px] resize-none"
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {baseline.companyValues.length} caracteres
                  </p>
                </div>

                {baseline.companyValues.length > 50 && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-emerald-700 dark:text-emerald-400">
                          Excelente descrição!
                        </p>
                        <p className="text-sm text-emerald-600 dark:text-emerald-500">
                          A IA terá contexto suficiente para fazer sugestões personalizadas.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-2">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar
          </Button>

          {currentStep < STEPS.length ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="gap-2"
            >
              Próximo
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={!canProceed() || isCompleting}
              className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              {isCompleting ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Concluir Configuração
                </>
              )}
            </Button>
          )}
        </div>

        {/* Completion Preview */}
        {isCompleting && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-card p-8 rounded-2xl shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-300">
              <div className="relative">
                <div className="h-20 w-20 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Brain className="h-10 w-10 text-white" />
                </div>
                <div className="absolute inset-0 h-20 w-20 mx-auto bg-primary rounded-full blur-xl opacity-30 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold">Calibrando Nexus Copilot...</h3>
              <p className="text-muted-foreground">
                Aplicando suas preferências culturais à IA
              </p>
              <Progress value={75} className="h-2 w-48 mx-auto" />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
