import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send, User, Calendar, Clock, Tag } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type TicketStatus = "aberto" | "em_andamento" | "resolvido" | "fechado";
type TicketPriority = "baixa" | "normal" | "alta" | "urgente";

interface Comment {
  id: string;
  autor: string;
  mensagem: string;
  timestamp: string;
  isStaff: boolean;
}

interface TicketDetalhes {
  id: string;
  titulo: string;
  descricao: string;
  criador: string;
  categoria: string;
  responsavel: string | null;
  prioridade: TicketPriority;
  status: TicketStatus;
  criadoEm: string;
  atualizadoEm: string;
  comentarios: Comment[];
}

const mockTicket: TicketDetalhes = {
  id: "TKT-001",
  titulo: "Problema com acesso ao sistema",
  descricao:
    "Estou tendo dificuldades para acessar o sistema desde esta manhã. Quando tento fazer login, recebo uma mensagem de erro dizendo 'Credenciais inválidas', mesmo tendo certeza que a senha está correta. Já tentei redefinir a senha mas o e-mail de recuperação não está chegando.",
  criador: "João Silva",
  categoria: "TI",
  responsavel: null,
  prioridade: "urgente",
  status: "aberto",
  criadoEm: "2025-01-15T10:30:00",
  atualizadoEm: "2025-01-15T10:30:00",
  comentarios: [
    {
      id: "1",
      autor: "João Silva",
      mensagem: "Já tentei limpar o cache e cookies do navegador, mas o problema persiste.",
      timestamp: "2025-01-15T10:45:00",
      isStaff: false,
    },
  ],
};

const DashboardTicketsDetalhes = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [ticket, setTicket] = useState(mockTicket);
  const [newComment, setNewComment] = useState("");
  const [isSending, setIsSending] = useState(false);

  const getStatusBadge = (status: TicketStatus) => {
    const variants: Record<TicketStatus, { label: string; className: string }> = {
      aberto: { label: "Aberto", className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
      em_andamento: {
        label: "Em Andamento",
        className: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
      },
      resolvido: {
        label: "Resolvido",
        className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
      },
      fechado: { label: "Fechado", className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200" },
    };
    return variants[status];
  };

  const getPriorityBadge = (priority: TicketPriority) => {
    const variants: Record<TicketPriority, { label: string; className: string }> = {
      baixa: { label: "Baixa", className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" },
      normal: { label: "Normal", className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
      alta: { label: "Alta", className: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" },
      urgente: { label: "Urgente", className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" },
    };
    return variants[priority];
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSendComment = async () => {
    if (!newComment.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      const comment: Comment = {
        id: String(ticket.comentarios.length + 1),
        autor: "Você",
        mensagem: newComment,
        timestamp: new Date().toISOString(),
        isStaff: false,
      };

      setTicket({
        ...ticket,
        comentarios: [...ticket.comentarios, comment],
      });

      setNewComment("");
      setIsSending(false);
      toast({
        title: "Comentário enviado",
        description: "Sua mensagem foi adicionada ao ticket.",
      });
    }, 500);
  };

  const handleStatusChange = (newStatus: TicketStatus) => {
    setTicket({ ...ticket, status: newStatus });
    toast({
      title: "Status atualizado",
      description: `O status foi alterado para ${getStatusBadge(newStatus).label}`,
    });
  };

  const handlePriorityChange = (newPriority: TicketPriority) => {
    setTicket({ ...ticket, prioridade: newPriority });
    toast({
      title: "Prioridade atualizada",
      description: `A prioridade foi alterada para ${getPriorityBadge(newPriority).label}`,
    });
  };

  const statusBadge = getStatusBadge(ticket.status);
  const priorityBadge = getPriorityBadge(ticket.prioridade);

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/tickets")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-mono text-muted-foreground">{ticket.id}</span>
              <Badge className={priorityBadge.className}>{priorityBadge.label}</Badge>
              <Badge className={statusBadge.className}>{statusBadge.label}</Badge>
            </div>
            <h1 className="text-3xl font-bold text-foreground">{ticket.titulo}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Esquerda - Detalhes e Workflow */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Ticket</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Criador</span>
                  </div>
                  <p className="font-medium">{ticket.criador}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Tag className="h-4 w-4" />
                    <span>Categoria</span>
                  </div>
                  <Badge variant="outline">{ticket.categoria}</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Criado em</span>
                  </div>
                  <p className="text-sm">{formatDateTime(ticket.criadoEm)}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Última atualização</span>
                  </div>
                  <p className="text-sm">{formatDateTime(ticket.atualizadoEm)}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Ticket</CardTitle>
                <CardDescription>Atualize o status e atribuições</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={ticket.status} onValueChange={(value) => handleStatusChange(value as TicketStatus)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="aberto">Aberto</SelectItem>
                      <SelectItem value="em_andamento">Em Andamento</SelectItem>
                      <SelectItem value="resolvido">Resolvido</SelectItem>
                      <SelectItem value="fechado">Fechado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Prioridade</label>
                  <Select
                    value={ticket.prioridade}
                    onValueChange={(value) => handlePriorityChange(value as TicketPriority)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="baixa">Baixa</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="urgente">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Atribuir para</label>
                  <Select value={ticket.responsavel || "nao_atribuido"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um responsável" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="nao_atribuido">Não atribuído</SelectItem>
                      <SelectItem value="ana_costa">Ana Costa</SelectItem>
                      <SelectItem value="roberto_silva">Roberto Silva</SelectItem>
                      <SelectItem value="carlos_santos">Carlos Santos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Descrição</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{ticket.descricao}</p>
              </CardContent>
            </Card>
          </div>

          {/* Coluna Direita - Comunicação */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>Comunicação</CardTitle>
                <CardDescription>Histórico de mensagens e atualizações</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 space-y-4 mb-4 max-h-[500px] overflow-y-auto">
                  {ticket.comentarios.map((comment) => (
                    <div
                      key={comment.id}
                      className={`p-4 rounded-lg ${
                        comment.isStaff
                          ? "bg-primary/5 border-l-4 border-primary"
                          : "bg-muted/50 border-l-4 border-muted"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{comment.autor}</p>
                            {comment.isStaff && (
                              <Badge variant="outline" className="text-xs">
                                Equipe
                              </Badge>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{formatDateTime(comment.timestamp)}</span>
                      </div>
                      <p className="text-sm leading-relaxed">{comment.mensagem}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 border-t pt-4">
                  <Textarea
                    placeholder="Digite sua mensagem..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleSendComment} disabled={isSending || !newComment.trim()} className="gap-2">
                      <Send className="h-4 w-4" />
                      {isSending ? "Enviando..." : "Enviar Mensagem"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardTicketsDetalhes;
