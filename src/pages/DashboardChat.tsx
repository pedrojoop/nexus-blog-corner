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
  
  const [messages, setMessages] = useState<Message[]>([
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
    {
      id: "3",
      text: "Claro! Estou disponível para ajudar.",
      senderId: "me",
      senderName: "Você",
      timestamp: new Date(Date.now() - 1200000),
    },
  ]);

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
    
    // Simulação de carregamento de diferentes tipos de conversas
    const names: Record<string, string> = {
      general: "geral",
      announcements: "anuncios",
      marketing: "projetos-marketing",
      dev: "desenvolvimento",
      dm1: "João Silva",
      proj1: "Redesign do Site",
      ticket1: "Bug no Login",
    };
    
    setSelectedName(names[id] || id);
    setShowInfoPanel(false);
    setShowThread(false);
  };

  const handleSendMessage = (text: string, quotedMessageId?: string) => {
    // Processar comandos
    if (text.startsWith("/tarefa")) {
      const taskName = text.replace("/tarefa", "").trim();
      toast({
        title: "Tarefa criada",
        description: `"${taskName}" foi adicionada ao Kanban`,
      });
      
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: `✅ Tarefa criada no Kanban: "${taskName}"`,
          senderId: "system",
          senderName: "Sistema",
          timestamp: new Date(),
        },
      ]);
      return;
    }

    if (text.startsWith("/ticket")) {
      const ticketTitle = text.replace("/ticket", "").trim();
      toast({
        title: "Ticket aberto",
        description: `"${ticketTitle}" foi criado`,
      });
      
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: `🎫 Ticket criado: "${ticketTitle}"`,
          senderId: "system",
          senderName: "Sistema",
          timestamp: new Date(),
        },
      ]);
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
    setQuotedMessage(null);
    scrollToBottom();
  };

  const handleEditMessage = (id: string, newText: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, text: newText } : msg))
    );
    toast({ title: "Mensagem editada" });
  };

  const handleDeleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
    toast({ title: "Mensagem excluída" });
  };

  const handleReact = (id: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
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
      })
    );
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
        {showInfoPanel && selectedId && (
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
            onClose={() => setShowInfoPanel(false)}
          />
        )}

        {/* Thread */}
        {showThread && threadMessage && (
          <MessageThread
            originalMessage={{
              id: threadMessage.id,
              text: threadMessage.text,
              senderName: threadMessage.senderName,
              timestamp: threadMessage.timestamp,
            }}
            replies={threadReplies}
            onClose={() => setShowThread(false)}
            onSendReply={handleSendThreadReply}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardChat;
