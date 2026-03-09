import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ModernChatSidebar } from "@/components/chat/ModernChatSidebar";
import { ModernChatMessage } from "@/components/chat/ModernChatMessage";
import { ModernChatInput } from "@/components/chat/ModernChatInput";
import { ModernChatHeader } from "@/components/chat/ModernChatHeader";
import { ChatInfoPanel } from "@/components/chat/ChatInfoPanel";

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
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState("");
  const [selectedOnline, setSelectedOnline] = useState<boolean | undefined>(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [quotedMessage, setQuotedMessage] = useState<Message | null>(null);
  
  // Mock data for conversations
  const initialChatData: Record<string, Message[]> = {
    dm1: [
      {
        id: "dm1-1",
        text: "Oi! Tudo bem? 👋",
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
    dm4: [
      {
        id: "dm4-1",
        text: "O bug foi identificado no módulo de autenticação",
        senderId: "other",
        senderName: "Ana Oliveira",
        timestamp: new Date(Date.now() - 14100000),
      },
      {
        id: "dm4-2",
        text: "Estou investigando o problema...",
        senderId: "other",
        senderName: "Ana Oliveira",
        timestamp: new Date(Date.now() - 10800000),
      },
    ],
    proj1: [
      {
        id: "p1-1",
        text: "🚀 Projeto 'Redesign do Site' iniciado!",
        senderId: "system",
        senderName: "Sistema",
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: "p1-2",
        text: "Pessoal, comecei os mockups da home",
        senderId: "other",
        senderName: "Maria Santos",
        timestamp: new Date(Date.now() - 43200000),
      },
      {
        id: "p1-3",
        text: "Ficou incrível, Maria! 👏",
        senderId: "other2",
        senderName: "João Silva",
        timestamp: new Date(Date.now() - 40000000),
      },
      {
        id: "p1-4",
        text: "Os mockups estão ficando ótimos! 🔥",
        senderId: "other",
        senderName: "Maria Santos",
        timestamp: new Date(Date.now() - 21600000),
        reactions: [{ emoji: "🔥", users: ["João Silva", "Ana Oliveira"] }],
      },
    ],
    proj2: [
      {
        id: "p2-1",
        text: "🚀 Projeto 'App Mobile' iniciado!",
        senderId: "system",
        senderName: "Sistema",
        timestamp: new Date(Date.now() - 172800000),
      },
      {
        id: "p2-2",
        text: "Vamos começar pelo planejamento da arquitetura",
        senderId: "other",
        senderName: "João Silva",
        timestamp: new Date(Date.now() - 86400000),
      },
    ],
    general: [
      {
        id: "1",
        text: "Bem-vindos à equipe! 🎉",
        senderId: "system",
        senderName: "Sistema",
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: "2",
        text: "Alguém pode me ajudar com o novo projeto?",
        senderId: "other",
        senderName: "João Silva",
        timestamp: new Date(Date.now() - 1800000),
        reactions: [
          { emoji: "👍", users: ["Maria Santos", "Carlos Souza"] },
        ],
      },
    ],
  };
  
  const [allChats, setAllChats] = useState<Record<string, Message[]>>(initialChatData);
  const [messages, setMessages] = useState<Message[]>([]);

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

  const handleSelectConversation = (id: string, name: string, isOnline?: boolean) => {
    setSelectedId(id);
    setSelectedName(name);
    setSelectedOnline(isOnline);
    setMessages(allChats[id] || []);
    setShowInfoPanel(false);
    setQuotedMessage(null);
  };

  const handleSendMessage = (text: string, quotedMessageId?: string) => {
    if (!selectedId) return;
    
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

  const handleReact = (id: string, emoji: string) => {
    if (!selectedId) return;
    
    const updateReactions = (msgs: Message[]) =>
      msgs.map((msg) => {
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

  const handleVoiceCall = () => {
    toast({
      title: "Chamada de voz",
      description: `Iniciando chamada com ${selectedName}...`,
    });
  };

  const handleVideoCall = () => {
    toast({
      title: "Chamada de vídeo",
      description: `Iniciando chamada com ${selectedName}...`,
    });
  };

  const isGroup = selectedId?.startsWith("proj") || selectedId === "general";

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex bg-background rounded-xl overflow-hidden shadow-sm border border-border/50">
        {/* Modern Sidebar */}
        <ModernChatSidebar 
          onSelectConversation={handleSelectConversation} 
          selectedId={selectedId} 
        />

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-background">
          {selectedId ? (
            <>
              {/* Glassmorphism Header */}
              <ModernChatHeader
                name={selectedName}
                isOnline={selectedOnline}
                isGroup={isGroup}
                memberCount={isGroup ? 5 : undefined}
                onVoiceCall={handleVoiceCall}
                onVideoCall={handleVideoCall}
                onInfo={() => setShowInfoPanel(!showInfoPanel)}
              />

              {/* Messages Area */}
              <ScrollArea className="flex-1 bg-gradient-to-b from-muted/20 to-background">
                <div className="py-4 space-y-1">
                  {messages.map((message, index) => {
                    const prevMessage = messages[index - 1];
                    const showAvatar = !prevMessage || prevMessage.senderId !== message.senderId;
                    const nextMessage = messages[index + 1];
                    const isLastInGroup = !nextMessage || nextMessage.senderId !== message.senderId;

                    return (
                      <ModernChatMessage
                        key={message.id}
                        message={message}
                        isOwn={message.senderId === "me"}
                        showAvatar={showAvatar}
                        isLastInGroup={isLastInGroup}
                        onReact={handleReact}
                      />
                    );
                  })}
                  <div ref={scrollRef} />
                </div>
              </ScrollArea>

              {/* Modern Input */}
              <ModernChatInput
                onSendMessage={handleSendMessage}
                quotedMessage={quotedMessage}
                onClearQuote={() => setQuotedMessage(null)}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-muted/20 to-background">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Suas mensagens
                </h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                  Selecione uma conversa para começar a enviar mensagens
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Info Panel */}
        <ChatInfoPanel
          channelName={selectedName}
          channelType={isGroup ? "channel" : "dm"}
          description={isGroup ? "Grupo de discussão" : "Conversa direta"}
          members={[
            { id: "1", name: "João Silva", role: "Desenvolvedor", isOnline: true },
            { id: "2", name: "Maria Santos", role: "Designer", isOnline: false },
            { id: "3", name: "Carlos Souza", role: "Gerente", isOnline: true },
          ]}
          files={[]}
          pinnedMessages={0}
          open={showInfoPanel && !!selectedId}
          onClose={() => setShowInfoPanel(false)}
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardChat;
