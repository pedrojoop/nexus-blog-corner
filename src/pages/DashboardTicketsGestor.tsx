import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, AlertCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

type TicketStatus = "aberto" | "em_andamento" | "resolvido" | "fechado";
type TicketPriority = "baixa" | "normal" | "alta" | "urgente";

interface TicketGestor {
  id: string;
  titulo: string;
  criador: string;
  categoria: string;
  responsavel: string | null;
  prioridade: TicketPriority;
  status: TicketStatus;
  criadoEm: string;
  tempoDecorrido: string;
}

const mockTicketsGestor: TicketGestor[] = [
  {
    id: "TKT-001",
    titulo: "Problema com acesso ao sistema",
    criador: "João Silva",
    categoria: "TI",
    responsavel: null,
    prioridade: "urgente",
    status: "aberto",
    criadoEm: "2025-01-15T10:30:00",
    tempoDecorrido: "2h 15min",
  },
  {
    id: "TKT-002",
    titulo: "Solicitação de férias",
    criador: "Maria Santos",
    categoria: "RH",
    responsavel: "Ana Costa",
    prioridade: "normal",
    status: "em_andamento",
    criadoEm: "2025-01-14T14:20:00",
    tempoDecorrido: "1d 4h",
  },
  {
    id: "TKT-003",
    titulo: "Atualização de dados cadastrais",
    criador: "Pedro Oliveira",
    categoria: "RH",
    responsavel: "Ana Costa",
    prioridade: "baixa",
    status: "resolvido",
    criadoEm: "2025-01-13T11:00:00",
    tempoDecorrido: "2d 8h",
  },
  {
    id: "TKT-004",
    titulo: "Falha no sistema de ponto",
    criador: "Carlos Mendes",
    categoria: "TI",
    responsavel: null,
    prioridade: "alta",
    status: "aberto",
    criadoEm: "2025-01-15T08:00:00",
    tempoDecorrido: "4h 45min",
  },
  {
    id: "TKT-005",
    titulo: "Solicitação de material de escritório",
    criador: "Juliana Lima",
    categoria: "Administrativo",
    responsavel: "Roberto Silva",
    prioridade: "baixa",
    status: "em_andamento",
    criadoEm: "2025-01-14T10:00:00",
    tempoDecorrido: "1d 2h",
  },
];

const DashboardTicketsGestor = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState<TicketPriority | "todos">("todos");
  const [filterStatus, setFilterStatus] = useState<TicketStatus | "todos">("todos");

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

  const filteredTickets = mockTicketsGestor.filter((ticket) => {
    const matchesSearch =
      ticket.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.criador.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === "todos" || ticket.prioridade === filterPriority;
    const matchesStatus = filterStatus === "todos" || ticket.status === filterStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  // Ordenar por prioridade (urgente primeiro) e depois por tempo decorrido
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    const priorityOrder = { urgente: 0, alta: 1, normal: 2, baixa: 3 };
    return priorityOrder[a.prioridade] - priorityOrder[b.prioridade];
  });

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Tickets</h1>
            <p className="text-muted-foreground mt-1">Triagem e gerenciamento de todas as solicitações</p>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Aguardando Triagem</p>
                <p className="text-3xl font-bold text-blue-600">
                  {mockTicketsGestor.filter((t) => t.status === "aberto" && !t.responsavel).length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Em Andamento</p>
                <p className="text-3xl font-bold text-amber-600">
                  {mockTicketsGestor.filter((t) => t.status === "em_andamento").length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 dark:border-red-900">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Urgentes</p>
                <p className="text-3xl font-bold text-red-600">
                  {mockTicketsGestor.filter((t) => t.prioridade === "urgente").length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Resolvidos Hoje</p>
                <p className="text-3xl font-bold text-emerald-600">
                  {mockTicketsGestor.filter((t) => t.status === "resolvido").length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Ativo</p>
                <p className="text-3xl font-bold text-foreground">
                  {mockTicketsGestor.filter((t) => t.status !== "fechado").length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por ID, título ou criador..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 items-center">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <div className="flex gap-2">
                  <Button
                    variant={filterPriority === "todos" ? "default" : "outline"}
                    onClick={() => setFilterPriority("todos")}
                    size="sm"
                  >
                    Todas
                  </Button>
                  <Button
                    variant={filterPriority === "urgente" ? "destructive" : "outline"}
                    onClick={() => setFilterPriority("urgente")}
                    size="sm"
                  >
                    Urgente
                  </Button>
                  <Button
                    variant={filterPriority === "alta" ? "default" : "outline"}
                    onClick={() => setFilterPriority("alta")}
                    size="sm"
                  >
                    Alta
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Tickets */}
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Criador</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tempo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedTickets.map((ticket) => {
                  const statusBadge = getStatusBadge(ticket.status);
                  const priorityBadge = getPriorityBadge(ticket.prioridade);
                  const isUrgent = ticket.prioridade === "urgente";

                  return (
                    <TableRow
                      key={ticket.id}
                      className={`cursor-pointer hover:bg-muted/50 ${
                        isUrgent ? "bg-red-50 dark:bg-red-950/20" : ""
                      }`}
                      onClick={() => navigate(`/dashboard/tickets/${ticket.id}`)}
                    >
                      <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {isUrgent && <AlertCircle className="h-4 w-4 text-red-600" />}
                          {ticket.titulo}
                        </div>
                      </TableCell>
                      <TableCell>{ticket.criador}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{ticket.categoria}</Badge>
                      </TableCell>
                      <TableCell>
                        {ticket.responsavel ? (
                          <span className="text-sm">{ticket.responsavel}</span>
                        ) : (
                          <span className="text-sm text-muted-foreground italic">Não atribuído</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={priorityBadge.className}>{priorityBadge.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusBadge.className}>{statusBadge.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {ticket.tempoDecorrido}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {sortedTickets.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">Nenhum ticket encontrado</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardTicketsGestor;
