import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Hash,
  Plus,
  Users,
  MessageSquare,
  Folder,
  Ticket,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Channel {
  id: string;
  name: string;
  type: "public" | "private";
  unreadCount: number;
  isPinned?: boolean;
}

interface DirectMessage {
  id: string;
  name: string;
  isOnline: boolean;
  unreadCount: number;
  lastMessage?: string;
}

interface Project {
  id: string;
  name: string;
  unreadCount: number;
  status: string;
}

interface TicketItem {
  id: string;
  title: string;
  priority: "low" | "medium" | "high" | "urgent";
  unreadCount: number;
}

interface ChatSidebarProps {
  onSelectChannel: (id: string, type: "channel" | "dm" | "project" | "ticket") => void;
  selectedId: string | null;
}

export const ChatSidebar = ({ onSelectChannel, selectedId }: ChatSidebarProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [createChannelOpen, setCreateChannelOpen] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelDescription, setNewChannelDescription] = useState("");
  
  const [channelsExpanded, setChannelsExpanded] = useState(true);
  const [dmsExpanded, setDmsExpanded] = useState(true);
  const [projectsExpanded, setProjectsExpanded] = useState(true);
  const [ticketsExpanded, setTicketsExpanded] = useState(true);

  const [channels] = useState<Channel[]>([
    { id: "general", name: "geral", type: "public", unreadCount: 3, isPinned: true },
    { id: "announcements", name: "anuncios", type: "public", unreadCount: 0, isPinned: true },
    { id: "marketing", name: "projetos-marketing", type: "public", unreadCount: 5 },
    { id: "dev", name: "desenvolvimento", type: "public", unreadCount: 12 },
  ]);

  const [directMessages] = useState<DirectMessage[]>([
    { id: "dm1", name: "João Silva", isOnline: true, unreadCount: 2, lastMessage: "Oi!" },
    { id: "dm2", name: "Maria Santos", isOnline: false, unreadCount: 0 },
    { id: "dm3", name: "Carlos Souza", isOnline: true, unreadCount: 1 },
  ]);

  const [projects] = useState<Project[]>([
    { id: "proj1", name: "Redesign do Site", unreadCount: 4, status: "Em Andamento" },
    { id: "proj2", name: "App Mobile", unreadCount: 0, status: "Planejamento" },
    { id: "proj3", name: "Campanha Q1", unreadCount: 7, status: "Em Andamento" },
  ]);

  const [tickets] = useState<TicketItem[]>([
    { id: "ticket1", title: "Bug no Login", priority: "urgent", unreadCount: 3 },
    { id: "ticket2", title: "Requisição de Acesso", priority: "high", unreadCount: 1 },
    { id: "ticket3", title: "Dúvida sobre Relatório", priority: "medium", unreadCount: 0 },
  ]);

  const handleCreateChannel = () => {
    if (!newChannelName.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira um nome para o canal",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Canal criado",
      description: `O canal #${newChannelName} foi criado com sucesso`,
    });
    setCreateChannelOpen(false);
    setNewChannelName("");
    setNewChannelDescription("");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "text-red-500";
      case "high": return "text-orange-500";
      case "medium": return "text-yellow-500";
      default: return "text-green-500";
    }
  };

  return (
    <div className="w-64 border-r flex flex-col bg-muted/30">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold mb-3 text-foreground">Nexus Chat</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        {/* Canais Públicos */}
        <div className="p-2">
          <button
            onClick={() => setChannelsExpanded(!channelsExpanded)}
            className="w-full flex items-center justify-between p-2 hover:bg-muted rounded text-sm font-semibold"
          >
            <div className="flex items-center gap-2">
              {channelsExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <span>Canais</span>
            </div>
            <Dialog open={createChannelOpen} onOpenChange={setCreateChannelOpen}>
              <DialogTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Novo Canal</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="channelName">Nome do Canal</Label>
                    <Input
                      id="channelName"
                      value={newChannelName}
                      onChange={(e) => setNewChannelName(e.target.value)}
                      placeholder="ex: marketing"
                    />
                  </div>
                  <div>
                    <Label htmlFor="channelDescription">Descrição (opcional)</Label>
                    <Textarea
                      id="channelDescription"
                      value={newChannelDescription}
                      onChange={(e) => setNewChannelDescription(e.target.value)}
                      placeholder="Descreva o propósito do canal..."
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleCreateChannel} className="w-full">
                    <Hash className="h-4 w-4 mr-2" />
                    Criar Canal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </button>

          {channelsExpanded && (
            <div className="ml-2 mt-1">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => onSelectChannel(channel.id, "channel")}
                  className={`w-full flex items-center justify-between p-2 rounded mb-1 text-sm ${
                    selectedId === channel.id ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    <span>{channel.name}</span>
                  </div>
                  {channel.unreadCount > 0 && (
                    <Badge variant="default" className="h-5 min-w-5 px-1.5 text-xs">
                      {channel.unreadCount}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mensagens Diretas */}
        <div className="p-2">
          <button
            onClick={() => setDmsExpanded(!dmsExpanded)}
            className="w-full flex items-center justify-between p-2 hover:bg-muted rounded text-sm font-semibold"
          >
            <div className="flex items-center gap-2">
              {dmsExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <span>Mensagens Diretas</span>
            </div>
            <Button size="icon" variant="ghost" className="h-6 w-6">
              <Plus className="h-4 w-4" />
            </Button>
          </button>

          {dmsExpanded && (
            <div className="ml-2 mt-1">
              {directMessages.map((dm) => (
                <button
                  key={dm.id}
                  onClick={() => onSelectChannel(dm.id, "dm")}
                  className={`w-full flex items-center justify-between p-2 rounded mb-1 text-sm ${
                    selectedId === dm.id ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{dm.name[0]}</AvatarFallback>
                      </Avatar>
                      {dm.isOnline && (
                        <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-background" />
                      )}
                    </div>
                    <span>{dm.name}</span>
                  </div>
                  {dm.unreadCount > 0 && (
                    <Badge variant="default" className="h-5 min-w-5 px-1.5 text-xs">
                      {dm.unreadCount}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Projetos Ativos */}
        <div className="p-2">
          <button
            onClick={() => setProjectsExpanded(!projectsExpanded)}
            className="w-full flex items-center justify-between p-2 hover:bg-muted rounded text-sm font-semibold"
          >
            <div className="flex items-center gap-2">
              {projectsExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <Folder className="h-4 w-4" />
              <span>Projetos Ativos</span>
            </div>
          </button>

          {projectsExpanded && (
            <div className="ml-2 mt-1">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => onSelectChannel(project.id, "project")}
                  className={`w-full flex items-center justify-between p-2 rounded mb-1 text-sm ${
                    selectedId === project.id ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Folder className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{project.name}</span>
                  </div>
                  {project.unreadCount > 0 && (
                    <Badge variant="default" className="h-5 min-w-5 px-1.5 text-xs ml-2">
                      {project.unreadCount}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tickets Abertos */}
        <div className="p-2">
          <button
            onClick={() => setTicketsExpanded(!ticketsExpanded)}
            className="w-full flex items-center justify-between p-2 hover:bg-muted rounded text-sm font-semibold"
          >
            <div className="flex items-center gap-2">
              {ticketsExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <Ticket className="h-4 w-4" />
              <span>Tickets Abertos</span>
            </div>
          </button>

          {ticketsExpanded && (
            <div className="ml-2 mt-1">
              {tickets.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => onSelectChannel(ticket.id, "ticket")}
                  className={`w-full flex items-center justify-between p-2 rounded mb-1 text-sm ${
                    selectedId === ticket.id ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Ticket className={`h-4 w-4 flex-shrink-0 ${getPriorityColor(ticket.priority)}`} />
                    <span className="truncate">{ticket.title}</span>
                  </div>
                  {ticket.unreadCount > 0 && (
                    <Badge variant="default" className="h-5 min-w-5 px-1.5 text-xs ml-2">
                      {ticket.unreadCount}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
