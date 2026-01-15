import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  isOnline?: boolean;
  isGroup?: boolean;
}

interface ModernChatSidebarProps {
  onSelectConversation: (id: string, name: string, isOnline?: boolean) => void;
  selectedId: string | null;
}

export const ModernChatSidebar = ({ onSelectConversation, selectedId }: ModernChatSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const conversations: Conversation[] = [
    {
      id: "dm1",
      name: "João Silva",
      lastMessage: "Podemos conversar sobre aquele projeto?",
      timestamp: new Date(Date.now() - 1200000),
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: "dm2",
      name: "Maria Santos",
      lastMessage: "Sim! Vou te enviar agora.",
      timestamp: new Date(Date.now() - 7000000),
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: "proj1",
      name: "Redesign do Site",
      lastMessage: "Os mockups estão ficando ótimos! 🔥",
      timestamp: new Date(Date.now() - 21600000),
      unreadCount: 4,
      isGroup: true,
    },
    {
      id: "dm3",
      name: "Carlos Souza",
      lastMessage: "Preciso da sua aprovação no relatório",
      timestamp: new Date(Date.now() - 3600000),
      unreadCount: 1,
      isOnline: true,
    },
    {
      id: "general",
      name: "Equipe Geral",
      lastMessage: "Alguém pode me ajudar com o novo projeto?",
      timestamp: new Date(Date.now() - 1800000),
      unreadCount: 3,
      isGroup: true,
    },
    {
      id: "proj2",
      name: "App Mobile",
      lastMessage: "Vamos começar pelo planejamento",
      timestamp: new Date(Date.now() - 86400000),
      unreadCount: 0,
      isGroup: true,
    },
    {
      id: "dm4",
      name: "Ana Oliveira",
      lastMessage: "Estou investigando o problema...",
      timestamp: new Date(Date.now() - 10800000),
      unreadCount: 0,
      isOnline: true,
    },
  ];

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      const minutes = Math.floor(diff / (1000 * 60));
      return minutes > 0 ? `${minutes}m` : "Agora";
    }
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="w-80 bg-background border-r border-border/50 flex flex-col">
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">Mensagens</h1>
          <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full hover:bg-muted">
            <Edit className="h-5 w-5 text-primary" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar conversas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-11 bg-muted/50 border-0 rounded-full text-sm placeholder:text-muted-foreground/70 focus-visible:ring-1 focus-visible:ring-primary/30"
          />
        </div>
      </div>

      {/* Conversation List */}
      <ScrollArea className="flex-1 px-2">
        <div className="py-2 space-y-0.5">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelectConversation(conv.id, conv.name, conv.isOnline)}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 ${
                selectedId === conv.id
                  ? "bg-primary/10"
                  : "hover:bg-muted/70"
              }`}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <Avatar className="h-14 w-14 ring-2 ring-background">
                  <AvatarImage src={conv.avatar} />
                  <AvatarFallback 
                    className={`text-sm font-medium ${
                      conv.isGroup 
                        ? "bg-gradient-to-br from-primary to-accent text-white" 
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {getInitials(conv.name)}
                  </AvatarFallback>
                </Avatar>
                {conv.isOnline && !conv.isGroup && (
                  <span className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 rounded-full border-[3px] border-background" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`font-semibold text-[15px] truncate ${
                    conv.unreadCount > 0 ? "text-foreground" : "text-foreground/90"
                  }`}>
                    {conv.name}
                  </span>
                  <span className={`text-xs flex-shrink-0 ml-2 ${
                    conv.unreadCount > 0 ? "text-primary font-medium" : "text-muted-foreground"
                  }`}>
                    {formatTimestamp(conv.timestamp)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className={`text-sm truncate pr-2 ${
                    conv.unreadCount > 0 
                      ? "text-foreground/80 font-medium" 
                      : "text-muted-foreground"
                  }`}>
                    {conv.lastMessage}
                  </p>
                  {conv.unreadCount > 0 && (
                    <span className="flex-shrink-0 min-w-[22px] h-[22px] flex items-center justify-center bg-primary text-primary-foreground text-xs font-semibold rounded-full px-1.5">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
