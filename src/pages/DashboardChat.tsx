import { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Send, 
  Search, 
  Phone, 
  Video, 
  MoreVertical, 
  Users, 
  Plus,
  UserPlus,
  Image as ImageIcon,
  Paperclip
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  type: "text" | "image" | "file";
}

interface Conversation {
  id: string;
  name: string;
  type: "direct" | "group";
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline?: boolean;
  participants?: string[];
  avatar?: string;
}

const DashboardChat = () => {
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      name: "João Silva",
      type: "direct",
      lastMessage: "Oi, tudo bem?",
      lastMessageTime: new Date(Date.now() - 300000),
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: "2",
      name: "Maria Santos",
      type: "direct",
      lastMessage: "Vamos discutir o projeto amanhã",
      lastMessageTime: new Date(Date.now() - 3600000),
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: "3",
      name: "Equipe de Desenvolvimento",
      type: "group",
      lastMessage: "Carlos: A build está pronta",
      lastMessageTime: new Date(Date.now() - 7200000),
      unreadCount: 5,
      participants: ["Carlos", "Ana", "Pedro", "Você"],
    },
    {
      id: "4",
      name: "RH - Recursos Humanos",
      type: "group",
      lastMessage: "Reunião marcada para 15h",
      lastMessageTime: new Date(Date.now() - 86400000),
      unreadCount: 0,
      participants: ["Julia", "Roberto", "Você"],
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Oi, tudo bem?",
      senderId: "other",
      senderName: "João Silva",
      timestamp: new Date(Date.now() - 300000),
      type: "text",
    },
    {
      id: "2",
      text: "Tudo sim! E você?",
      senderId: "me",
      senderName: "Você",
      timestamp: new Date(Date.now() - 240000),
      type: "text",
    },
    {
      id: "3",
      text: "Podemos conversar sobre o projeto?",
      senderId: "other",
      senderName: "João Silva",
      timestamp: new Date(Date.now() - 180000),
      type: "text",
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [createGroupOpen, setCreateGroupOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
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

  const handleSendMessage = () => {
    if (!inputText.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      senderId: "me",
      senderName: "Você",
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    // Atualizar última mensagem na conversa
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConversation.id
          ? { ...conv, lastMessage: inputText, lastMessageTime: new Date() }
          : conv
      )
    );

    scrollToBottom();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelectConversation = (conv: Conversation) => {
    setSelectedConversation(conv);
    // Marcar mensagens como lidas
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, unreadCount: 0 } : c))
    );
    
    // Carregar mensagens da conversa (simulado)
    if (conv.type === "group") {
      setMessages([
        {
          id: "1",
          text: "Olá pessoal!",
          senderId: "other1",
          senderName: "Carlos",
          timestamp: new Date(Date.now() - 3600000),
          type: "text",
        },
        {
          id: "2",
          text: "A build está pronta",
          senderId: "other1",
          senderName: "Carlos",
          timestamp: new Date(Date.now() - 7200000),
          type: "text",
        },
      ]);
    } else {
      setMessages([
        {
          id: "1",
          text: conv.lastMessage,
          senderId: "other",
          senderName: conv.name,
          timestamp: conv.lastMessageTime,
          type: "text",
        },
      ]);
    }
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira um nome para o grupo",
        variant: "destructive",
      });
      return;
    }

    const newGroup: Conversation = {
      id: Date.now().toString(),
      name: newGroupName,
      type: "group",
      lastMessage: "Grupo criado",
      lastMessageTime: new Date(),
      unreadCount: 0,
      participants: ["Você"],
    };

    setConversations((prev) => [newGroup, ...prev]);
    setCreateGroupOpen(false);
    setNewGroupName("");
    setNewGroupDescription("");

    toast({
      title: "Grupo criado",
      description: `O grupo "${newGroupName}" foi criado com sucesso`,
    });
  };

  const handleVoiceCall = () => {
    toast({
      title: "Chamada de voz",
      description: `Iniciando chamada de voz com ${selectedConversation?.name}...`,
    });
  };

  const handleVideoCall = () => {
    toast({
      title: "Chamada de vídeo",
      description: `Iniciando chamada de vídeo com ${selectedConversation?.name}...`,
    });
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex gap-4">
        {/* Sidebar de Conversas */}
        <Card className="w-80 border-0 shadow-md flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">Conversas</h2>
              <Dialog open={createGroupOpen} onOpenChange={setCreateGroupOpen}>
                <DialogTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <Plus className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Criar Novo Grupo</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="groupName">Nome do Grupo</Label>
                      <Input
                        id="groupName"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        placeholder="Ex: Equipe de Marketing"
                      />
                    </div>
                    <div>
                      <Label htmlFor="groupDescription">Descrição (opcional)</Label>
                      <Textarea
                        id="groupDescription"
                        value={newGroupDescription}
                        onChange={(e) => setNewGroupDescription(e.target.value)}
                        placeholder="Descreva o objetivo do grupo..."
                        rows={3}
                      />
                    </div>
                    <Button onClick={handleCreateGroup} className="w-full">
                      <Users className="h-4 w-4 mr-2" />
                      Criar Grupo
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar conversas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv)}
                  className={`w-full p-3 rounded-lg mb-2 text-left transition-colors ${
                    selectedConversation?.id === conv.id
                      ? "bg-primary/10"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>
                          {conv.type === "group" ? (
                            <Users className="h-5 w-5" />
                          ) : (
                            conv.name[0]
                          )}
                        </AvatarFallback>
                      </Avatar>
                      {conv.type === "direct" && conv.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-sm truncate">
                          {conv.name}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {conv.lastMessageTime.toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground truncate">
                          {conv.lastMessage}
                        </p>
                        {conv.unreadCount > 0 && (
                          <Badge variant="default" className="ml-2 h-5 min-w-5 px-1.5">
                            {conv.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Área de Chat */}
        <Card className="flex-1 border-0 shadow-md flex flex-col">
          {selectedConversation ? (
            <>
              {/* Header do Chat */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {selectedConversation.type === "group" ? (
                        <Users className="h-5 w-5" />
                      ) : (
                        selectedConversation.name[0]
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold text-foreground">
                      {selectedConversation.name}
                    </h2>
                    {selectedConversation.type === "group" ? (
                      <p className="text-xs text-muted-foreground">
                        {selectedConversation.participants?.length} participantes
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        {selectedConversation.isOnline ? "Online" : "Offline"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost" onClick={handleVoiceCall}>
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={handleVideoCall}>
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Mensagens */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.senderId === "me" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {message.senderName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`flex flex-col max-w-[70%] ${
                          message.senderId === "me" ? "items-end" : "items-start"
                        }`}
                      >
                        {selectedConversation.type === "group" && message.senderId !== "me" && (
                          <span className="text-xs font-semibold text-muted-foreground mb-1">
                            {message.senderName}
                          </span>
                        )}
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            message.senderId === "me"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">
                          {message.timestamp.toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div ref={scrollRef} />
                </div>
              </ScrollArea>

              {/* Input de Mensagem */}
              <div className="border-t p-4">
                <div className="flex gap-2 items-end">
                  <Button size="icon" variant="ghost">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite sua mensagem..."
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Selecione uma conversa
                </h3>
                <p className="text-muted-foreground">
                  Escolha uma conversa para começar a enviar mensagens
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardChat;
