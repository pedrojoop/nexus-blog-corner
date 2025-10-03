import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

type TicketStatus = "aberto" | "em_andamento" | "resolvido" | "fechado";
type TicketPriority = "baixa" | "normal" | "alta" | "urgente";

interface Ticket {
  id: string;
  titulo: string;
  categoria: string;
  prioridade: TicketPriority;
  status: TicketStatus;
  criadoEm: string;
  atualizadoEm: string;
}

const mockTickets: Ticket[] = [
  {
    id: "TKT-001",
    titulo: "Problema com acesso ao sistema",
    categoria: "TI",
    prioridade: "urgente",
    status: "aberto",
    criadoEm: "2025-01-15T10:30:00",
    atualizadoEm: "2025-01-15T10:30:00",
  },
  {
    id: "TKT-002",
    titulo: "Solicitação de férias",
    categoria: "RH",
    prioridade: "normal",
    status: "em_andamento",
    criadoEm: "2025-01-14T14:20:00",
    atualizadoEm: "2025-01-15T09:15:00",
  },
  {
    id: "TKT-003",
    titulo: "Atualização de dados cadastrais",
    categoria: "RH",
    prioridade: "baixa",
    status: "resolvido",
    criadoEm: "2025-01-13T11:00:00",
    atualizadoEm: "2025-01-14T16:30:00",
  },
];

const DashboardTickets = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<TicketStatus | "todos">("todos");

  const getStatusBadge = (status: TicketStatus) => {
    const variants: Record<TicketStatus, { label: string; className: string }> = {
      aberto: { label: "Aberto", className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
      em_andamento: { label: "Em Andamento", className: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200" },
      resolvido: { label: "Resolvido", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200" },
      fechado: { label: "Fechado", className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200" },
    };
    return variants[status];
  };

  const getPriorityBadge = (priority: TicketPriority) => {
    const variants: Record<TicketPriority, { label: string; className: string; icon?: any }> = {
      baixa: { label: "Baixa", className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" },
      normal: { label: "Normal", className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
      alta: { label: "Alta", className: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" },
      urgente: { label: "Urgente", className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300", icon: AlertCircle },
    };
    return variants[priority];
  };

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch = ticket.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "todos" || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Meus Tickets</h1>
            <p className="text-muted-foreground mt-1">Gerencie suas solicitações e acompanhe o status</p>
          </div>
          <Button onClick={() => navigate("/dashboard/tickets/novo")} className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Ticket
          </Button>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Abertos</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {mockTickets.filter((t) => t.status === "aberto").length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Em Andamento</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {mockTickets.filter((t) => t.status === "em_andamento").length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolvidos</p>
                  <p className="text-2xl font-bold text-emerald-600">
                    {mockTickets.filter((t) => t.status === "resolvido").length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold text-foreground">{mockTickets.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e Busca */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "todos" ? "default" : "outline"}
                  onClick={() => setFilterStatus("todos")}
                  size="sm"
                >
                  Todos
                </Button>
                <Button
                  variant={filterStatus === "aberto" ? "default" : "outline"}
                  onClick={() => setFilterStatus("aberto")}
                  size="sm"
                >
                  Abertos
                </Button>
                <Button
                  variant={filterStatus === "em_andamento" ? "default" : "outline"}
                  onClick={() => setFilterStatus("em_andamento")}
                  size="sm"
                >
                  Em Andamento
                </Button>
                <Button
                  variant={filterStatus === "resolvido" ? "default" : "outline"}
                  onClick={() => setFilterStatus("resolvido")}
                  size="sm"
                >
                  Resolvidos
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Tickets */}
        <div className="space-y-4">
          {filteredTickets.map((ticket) => {
            const statusBadge = getStatusBadge(ticket.status);
            const priorityBadge = getPriorityBadge(ticket.prioridade);
            const PriorityIcon = priorityBadge.icon;

            return (
              <Card
                key={ticket.id}
                className="cursor-pointer hover:shadow-lg transition-all"
                onClick={() => navigate(`/dashboard/tickets/${ticket.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-mono text-muted-foreground">{ticket.id}</span>
                        <Badge className={priorityBadge.className}>
                          {PriorityIcon && <PriorityIcon className="h-3 w-3 mr-1" />}
                          {priorityBadge.label}
                        </Badge>
                        <Badge className={statusBadge.className}>{statusBadge.label}</Badge>
                      </div>
                      <CardTitle className="text-xl">{ticket.titulo}</CardTitle>
                      <CardDescription className="mt-2">
                        <span className="inline-flex items-center gap-1">
                          Categoria: <span className="font-medium">{ticket.categoria}</span>
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Criado em: {formatDate(ticket.criadoEm)}</span>
                    <span>Atualizado em: {formatDate(ticket.atualizadoEm)}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {filteredTickets.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Nenhum ticket encontrado</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardTickets;
