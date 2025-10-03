import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DashboardTicketsNovo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio
    setTimeout(() => {
      toast({
        title: "Ticket criado com sucesso!",
        description: "Você receberá atualizações sobre o status do seu ticket.",
      });
      setIsSubmitting(false);
      navigate("/dashboard/tickets");
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6 animate-fade-in max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/tickets")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Novo Ticket</h1>
            <p className="text-muted-foreground mt-1">Preencha as informações abaixo para criar sua solicitação</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Ticket</CardTitle>
            <CardDescription>
              Descreva sua solicitação de forma clara para que possamos atendê-lo rapidamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título *</Label>
                <Input
                  id="titulo"
                  placeholder="Ex: Problema com acesso ao sistema"
                  required
                  className="transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria *</Label>
                  <Select required>
                    <SelectTrigger id="categoria">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="ti">TI - Tecnologia da Informação</SelectItem>
                      <SelectItem value="rh">RH - Recursos Humanos</SelectItem>
                      <SelectItem value="financeiro">Financeiro</SelectItem>
                      <SelectItem value="administrativo">Administrativo</SelectItem>
                      <SelectItem value="operacional">Operacional</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prioridade">Prioridade *</Label>
                  <Select required>
                    <SelectTrigger id="prioridade">
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="baixa">Baixa - Pode aguardar</SelectItem>
                      <SelectItem value="normal">Normal - Atenção regular</SelectItem>
                      <SelectItem value="alta">Alta - Necessita atenção breve</SelectItem>
                      <SelectItem value="urgente">Urgente - Requer ação imediata</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição *</Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva detalhadamente sua solicitação..."
                  className="min-h-[150px]"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Forneça o máximo de detalhes possível para agilizar o atendimento
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-sm mb-2">💡 Dica</h3>
                <p className="text-sm text-muted-foreground">
                  Quanto mais detalhes você fornecer, mais rápido poderemos resolver sua solicitação. Inclua
                  informações como: quando o problema começou, quais ações você já tentou, e qualquer mensagem de
                  erro que tenha visto.
                </p>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <Button type="button" variant="outline" onClick={() => navigate("/dashboard/tickets")}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                  {isSubmitting ? (
                    <>Criando...</>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Criar Ticket
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardTicketsNovo;
