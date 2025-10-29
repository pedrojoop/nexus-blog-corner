import { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Phone, Video, Info, Pin, Search as SearchIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatInfoPanel } from "@/components/chat/ChatInfoPanel";
import { MessageThread } from "@/components/chat/MessageThread";

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  reactions?: { emoji: string; users: string[] }[];
  threadCount?: number;
  isPinned?: boolean;
  quotedMessage?: {
    id: string;
    senderName: string;
    text: string;
  };
}

const DashboardChat = () => {
  const { toast } = useToast();
  const [selectedId, setSelectedId] = useState<string | null>("general");
  const [selectedType, setSelectedType] = useState<"channel" | "dm" | "project" | "ticket">("channel");
  const [selectedName, setSelectedName] = useState("geral");
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [showThread, setShowThread] = useState(false);
  const [threadMessage, setThreadMessage] = useState<Message | null>(null);
  const [quotedMessage, setQuotedMessage] = useState<Message | null>(null);
  
  // Mock data for different chat types
  const initialChatData: Record<string, Message[]> = {
    // Canais
    general: [
      {
        id: "1",
        text: "Bem-vindos ao canal #geral! 🎉",
        senderId: "system",
        senderName: "Sistema",
        timestamp: new Date(Date.now() - 3600000),
        isPinned: true,
      },
      {
        id: "2",
        text: "Alguém pode me ajudar com o novo projeto?",
        senderId: "other",
        senderName: "João Silva",
        timestamp: new Date(Date.now() - 1800000),
        reactions: [
          { emoji: "👍", users: ["Maria Santos", "Carlos Souza"] },
          { emoji: "👀", users: ["Ana Oliveira"] },
        ],
        threadCount: 3,
      },
    ],
    announcements: [
      {
        id: "a1",
        text: "📢 Importante: Reunião geral amanhã às 10h",
        senderId: "admin",
        senderName: "Admin",
        timestamp: new Date(Date.now() - 7200000),
        isPinned: true,
      },
      {
        id: "a2",
        text: "Novos benefícios para a equipe foram aprovados!",
        senderId: "rh",
        senderName: "RH",
        timestamp: new Date(Date.now() - 3600000),
        reactions: [{ emoji: "🎉", users: ["João Silva", "Maria Santos", "Ana Oliveira"] }],
      },
    ],
    marketing: [
      {
        id: "m1",
        text: "Vamos discutir as estratégias para o Q1",
        senderId: "other",
        senderName: "Maria Santos",
        timestamp: new Date(Date.now() - 5400000),
      },
      {
        id: "m2",
        text: "Já tenho algumas ideias preparadas!",
        senderId: "other2",
        senderName: "Carlos Souza",
        timestamp: new Date(Date.now() - 4800000),
      },
    ],
    dev: [
      {
        id: "d1",
        text: "Alguém pode revisar o PR #245?",
        senderId: "other",
        senderName: "João Silva",
        timestamp: new Date(Date.now() - 900000),
        threadCount: 5,
      },
      {
        id: "d2",
        text: "Já estou olhando, João!",
        senderId: "other2",
        senderName: "Ana Oliveira",
        timestamp: new Date(Date.now() - 600000),
      },
    ],
    // Mensagens Diretas
    dm1: [
      {
        id: "dm1-1",
        text: "Oi! Tudo bem?",
        senderId: "other",
        senderName: "João Silva",
        timestamp: new Date(Date.now() - 1800000),
      },
      {
        id: "dm1-2",
        text: "Oi João! Tudo ótimo, e você?",
        senderId: "me",
        senderName: "Você",
        timestamp: new Date(Date.now() - 1500000),
      },
      {
        id: "dm1-3",
        text: "Também! Podemos conversar sobre aquele projeto?",
        senderId: "other",
        senderName: "João Silva",
        timestamp: new Date(Date.now() - 1200000),
      },
    ],
    dm2: [
      {
        id: "dm2-1",
        text: "Maria, você tem os arquivos do design?",
        senderId: "me",
        senderName: "Você",
        timestamp: new Date(Date.now() - 7200000),
      },
      {
        id: "dm2-2",
        text: "Sim! Vou te enviar agora.",
        senderId: "other",
        senderName: "Maria Santos",
        timestamp: new Date(Date.now() - 7000000),
      },
    ],
    dm3: [
      {
        id: "dm3-1",
        text: "Carlos, preciso da sua aprovação no relatório",
        senderId: "me",
        senderName: "Você",
        timestamp: new Date(Date.now() - 3600000),
      },
    ],
    // Projetos
    proj1: [
      {
        id: "p1-1",
        text: "🚀 Projeto 'Redesign do Site' iniciado!",
        senderId: "system",
        senderName: "Sistema Nexus",
        timestamp: new Date(Date.now() - 86400000),
        isPinned: true,
      },
      {
        id: "p1-2",
        text: "João moveu 'Criar mockups' para 'Em Andamento'",
        senderId: "system",
        senderName: "Sistema Nexus",
        timestamp: new Date(Date.now() - 43200000),
      },
      {
        id: "p1-3",
        text: "Os mockups estão ficando ótimos! Vejam anexo.",
        senderId: "other",
        senderName: "Maria Santos",
        timestamp: new Date(Date.now() - 21600000),
        reactions: [{ emoji: "🔥", users: ["João Silva", "Ana Oliveira"] }],
      },
      {
        id: "p1-4",
        text: "Ótimo trabalho Maria! Quando podemos revisar juntos?",
        senderId: "other2",
        senderName: "Carlos Souza",
        timestamp: new Date(Date.now() - 18000000),
      },
    ],
    proj2: [
      {
        id: "p2-1",
        text: "🚀 Projeto 'App Mobile' iniciado!",
        senderId: "system",
        senderName: "Sistema Nexus",
        timestamp: new Date(Date.now() - 172800000),
        isPinned: true,
      },
      {
        id: "p2-2",
        text: "Vamos começar pelo planejamento da arquitetura",
        senderId: "other",
        senderName: "João Silva",
        timestamp: new Date(Date.now() - 86400000),
      },
    ],
    proj3: [
      {
        id: "p3-1",
        text: "🚀 Projeto 'Campanha Q1' iniciado!",
        senderId: "system",
        senderName: "Sistema Nexus",
        timestamp: new Date(Date.now() - 259200000),
        isPinned: true,
      },
      {
        id: "p3-2",
        text: "Ana moveu 'Definir público-alvo' para 'Concluído'",
        senderId: "system",
        senderName: "Sistema Nexus",
        timestamp: new Date(Date.now() - 172800000),
      },
      {
        id: "p3-3",
        text: "Público-alvo definido! Vamos para a criação de conteúdo.",
        senderId: "other",
        senderName: "Ana Oliveira",
        timestamp: new Date(Date.now() - 86400000),
        reactions: [{ emoji: "✅", users: ["Maria Santos", "Carlos Souza"] }],
      },
    ],
    // Tickets
    ticket1: [
      {
        id: "t1-1",
        text: "🎫 Ticket #1234: Bug no Login",
        senderId: "system",
        senderName: "Sistema Nexus",
        timestamp: new Date(Date.now() - 14400000),
        isPinned: true,
      },
      {
        id: "t1-2",
        text: "Usuários relatam que não conseguem fazer login com Google OAuth",
        senderId: "other",
        senderName: "João Silva",
        timestamp: new Date(Date.now() - 14100000),
      },
      {
        id: "t1-3",
        text: "Estou investigando. Parece ser um problema de configuração.",
        senderId: "other2",
        senderName: "Ana Oliveira",
        timestamp: new Date(Date.now() - 10800000),
      },
      {
        id: "t1-4",
        text: "Status atualizado: Em Andamento → Aguardando Correção",
        senderId: "system",
        senderName: "Sistema Nexus",
        timestamp: new Date(Date.now() - 7200000),
      },
    ],
    ticket2: [
      {
        id: "t2-1",
        text: "🎫 Ticket #1235: Requisição de Acesso",
        senderId: "system",
        senderName: "Sistema Nexus",
        timestamp: new Date(Date.now() - 10800000),
        isPinned: true,
      },
      {
        id: "t2-2",
        text: "Preciso de acesso ao módulo de relatórios",
        senderId: "other",
        senderName: "Maria Santos",
        timestamp: new Date(Date.now() - 10500000),
      },
      {
        id: "t2-3",
        text: "Maria, qual seu departamento? Vou providenciar.",
        senderId: "other2",
        senderName: "Carlos Souza",
        timestamp: new Date(Date.now() - 9000000),
      },
    ],
    ticket3: [
      {
        id: "t3-1",
        text: "🎫 Ticket #1236: Dúvida sobre Relatório",
        senderId: "system",
        senderName: "Sistema Nexus",
        timestamp: new Date(Date.now() - 7200000),
        isPinned: true,
      },
      {
        id: "t3-2",
        text: "Como exporto os dados para Excel?",
        senderId: "other",
        senderName: "João Silva",
        timestamp: new Date(Date.now() - 7000000),
      },
    ],
  };
  
  const [allChats, setAllChats] = useState<Record<string, Message[]>>(initialChatData);
  const [messages, setMessages] = useState<Message[]>(initialChatData.general || []);

  const [threadReplies] = useState([
    {
      id: "r1",
      text: "Posso te passar mais detalhes amanhã!",
      senderId: "other2",
      senderName: "Maria Santos",
      timestamp: new Date(Date.now() - 1000000),
    },
    {
      id: "r2",
      text: "Obrigado! Fico no aguardo.",
      senderId: "other",
      senderName: "João Silva",
      timestamp: new Date(Date.now() - 900000),
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSelectChannel = (id: string, type: "channel" | "dm" | "project" | "ticket") => {
    setSelectedId(id);
    setSelectedType(type);
    
    // Nomes dos chats
    const names: Record<string, string> = {
      general: "geral",
      announcements: "anuncios",
      marketing: "projetos-marketing",
      dev: "desenvolvimento",
      dm1: "João Silva",
      dm2: "Maria Santos",
      dm3: "Carlos Souza",
      proj1: "Redesign do Site",
      proj2: "App Mobile",
      proj3: "Campanha Q1",
      ticket1: "Bug no Login",
      ticket2: "Requisição de Acesso",
      ticket3: "Dúvida sobre Relatório",
    };
    
    setSelectedName(names[id] || id);
    
    // Carregar mensagens específicas do chat selecionado
    setMessages(allChats[id] || []);
    
    setShowInfoPanel(false);
    setShowThread(false);
    setQuotedMessage(null);
  };

  const handleSendMessage = (text: string, quotedMessageId?: string) => {
    if (!selectedId) return;
    
    // Processar comandos
    if (text.startsWith("/tarefa")) {
      const taskName = text.replace("/tarefa", "").trim();
      toast({
        title: "Tarefa criada",
        description: `"${taskName}" foi adicionada ao Kanban`,
      });
      
      const systemMessage: Message = {
        id: Date.now().toString(),
        text: `✅ Tarefa criada no Kanban: "${taskName}"`,
        senderId: "system",
        senderName: "Sistema",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, systemMessage]);
      setAllChats((prev) => ({
        ...prev,
        [selectedId]: [...(prev[selectedId] || []), systemMessage],
      }));
      return;
    }

    if (text.startsWith("/ticket")) {
      const ticketTitle = text.replace("/ticket", "").trim();
      toast({
        title: "Ticket aberto",
        description: `"${ticketTitle}" foi criado`,
      });
      
      const systemMessage: Message = {
        id: Date.now().toString(),
        text: `🎫 Ticket criado: "${ticketTitle}"`,
        senderId: "system",
        senderName: "Sistema",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, systemMessage]);
      setAllChats((prev) => ({
        ...prev,
        [selectedId]: [...(prev[selectedId] || []), systemMessage],
      }));
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      senderId: "me",
      senderName: "Você",
      timestamp: new Date(),
      quotedMessage: quotedMessageId
        ? messages.find((m) => m.id === quotedMessageId)
        : undefined,
    };

    setMessages((prev) => [...prev, newMessage]);
    setAllChats((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), newMessage],
    }));
    setQuotedMessage(null);
    scrollToBottom();
  };

  const handleEditMessage = (id: string, newText: string) => {
    if (!selectedId) return;
    
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, text: newText } : msg))
    );
    setAllChats((prev) => ({
      ...prev,
      [selectedId]: (prev[selectedId] || []).map((msg) =>
        msg.id === id ? { ...msg, text: newText } : msg
      ),
    }));
    toast({ title: "Mensagem editada" });
  };

  const handleDeleteMessage = (id: string) => {
    if (!selectedId) return;
    
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
    setAllChats((prev) => ({
      ...prev,
      [selectedId]: (prev[selectedId] || []).filter((msg) => msg.id !== id),
    }));
    toast({ title: "Mensagem excluída" });
  };

  const handleReact = (id: string, emoji: string) => {
    if (!selectedId) return;
    
    const updateReactions = (messages: Message[]) =>
      messages.map((msg) => {
        if (msg.id !== id) return msg;
        
        const reactions = msg.reactions || [];
        const existingReaction = reactions.find((r) => r.emoji === emoji);
        
        if (existingReaction) {
          if (existingReaction.users.includes("Você")) {
            return {
              ...msg,
              reactions: reactions
                .map((r) =>
                  r.emoji === emoji
                    ? { ...r, users: r.users.filter((u) => u !== "Você") }
                    : r
                )
                .filter((r) => r.users.length > 0),
            };
          } else {
            return {
              ...msg,
              reactions: reactions.map((r) =>
                r.emoji === emoji ? { ...r, users: [...r.users, "Você"] } : r
              ),
            };
          }
        } else {
          return {
            ...msg,
            reactions: [...reactions, { emoji, users: ["Você"] }],
          };
        }
      });
    
    setMessages((prev) => updateReactions(prev));
    setAllChats((prev) => ({
      ...prev,
      [selectedId]: updateReactions(prev[selectedId] || []),
    }));
  };

  const handleThread = (id: string) => {
    const message = messages.find((m) => m.id === id);
    if (message) {
      setThreadMessage(message);
      setShowThread(true);
    }
  };

  const handleQuote = (message: Message) => {
    setQuotedMessage(message);
  };

  const handleSendThreadReply = (text: string) => {
    toast({
      title: "Resposta enviada",
      description: "Sua resposta foi adicionada à thread",
    });
  };

  const handleVoiceCall = () => {
    toast({
      title: "Chamada de voz",
      description: `Iniciando chamada de voz...`,
    });
  };

  const handleVideoCall = () => {
    toast({
      title: "Chamada de vídeo",
      description: `Iniciando chamada de vídeo...`,
    });
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex">
        {/* Sidebar de Navegação */}
        <ChatSidebar onSelectChannel={handleSelectChannel} selectedId={selectedId} />

        {/* Área Central de Chat */}
        <Card className="flex-1 border-0 shadow-md flex flex-col">
          {selectedId ? (
            <>
              {/* Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <h2 className="font-semibold text-foreground flex items-center gap-2">
                      {selectedType === "channel" && "#"}
                      {selectedName}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {selectedType === "channel" && "Canal público"}
                      {selectedType === "dm" && "Mensagem direta"}
                      {selectedType === "project" && "Canal de projeto"}
                      {selectedType === "ticket" && "Discussão de ticket"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost">
                    <SearchIcon className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Pin className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={handleVoiceCall}>
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={handleVideoCall}>
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setShowInfoPanel(!showInfoPanel)}
                  >
                    <Info className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Mensagens */}
              <ScrollArea className="flex-1">
                <div>
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      isOwn={message.senderId === "me"}
                      onEdit={handleEditMessage}
                      onDelete={handleDeleteMessage}
                      onReact={handleReact}
                      onThread={handleThread}
                      onQuote={handleQuote}
                    />
                  ))}
                  <div ref={scrollRef} />
                </div>
              </ScrollArea>

              {/* Input */}
              <ChatInput
                onSendMessage={handleSendMessage}
                quotedMessage={quotedMessage}
                onClearQuote={() => setQuotedMessage(null)}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Bem-vindo ao Nexus Chat
                </h3>
                <p className="text-muted-foreground">
                  Selecione um canal ou conversa para começar
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Painel de Informações */}
        <ChatInfoPanel
          channelName={selectedName}
          channelType={selectedType}
          description="Canal para discussões gerais da equipe"
          members={[
            { id: "1", name: "João Silva", role: "Desenvolvedor", isOnline: true },
            { id: "2", name: "Maria Santos", role: "Designer", isOnline: false },
            { id: "3", name: "Carlos Souza", role: "Gerente", isOnline: true },
          ]}
          files={[
            {
              id: "f1",
              name: "documento.pdf",
              uploadedBy: "João Silva",
              uploadedAt: new Date(),
              type: "pdf",
            },
          ]}
          pinnedMessages={2}
          open={showInfoPanel && !!selectedId}
          onClose={() => setShowInfoPanel(false)}
        />

        {/* Thread */}
        <MessageThread
          originalMessage={{
            id: threadMessage?.id || "",
            text: threadMessage?.text || "",
            senderName: threadMessage?.senderName || "",
            timestamp: threadMessage?.timestamp || new Date(),
          }}
          replies={threadReplies}
          open={showThread && !!threadMessage}
          onClose={() => setShowThread(false)}
          onSendReply={handleSendThreadReply}
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardChat;
