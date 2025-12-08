import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Phone, Video, MoreVertical } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  sender: string;
  avatar: string;
  content: string;
  time: string;
  isMe: boolean;
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  online: boolean;
  unread: number;
}

const ChatDemo = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "Maria Silva", avatar: "MS", content: "Oi! Você viu o relatório que enviei?", time: "10:30", isMe: false },
    { id: 2, sender: "Você", avatar: "VC", content: "Sim! Está muito bom, parabéns!", time: "10:32", isMe: true },
    { id: 3, sender: "Maria Silva", avatar: "MS", content: "Obrigada! Podemos agendar uma call para discutir os próximos passos?", time: "10:33", isMe: false },
    { id: 4, sender: "Você", avatar: "VC", content: "Claro! Que tal às 15h?", time: "10:35", isMe: true },
  ]);

  const contacts: Contact[] = [
    { id: 1, name: "Maria Silva", avatar: "MS", lastMessage: "Claro! Que tal às 15h?", online: true, unread: 0 },
    { id: 2, name: "João Santos", avatar: "JS", lastMessage: "Vou verificar e te aviso", online: true, unread: 2 },
    { id: 3, name: "Ana Costa", avatar: "AC", lastMessage: "Perfeito, obrigada!", online: false, unread: 0 },
    { id: 4, name: "Pedro Lima", avatar: "PL", lastMessage: "Documento enviado", online: false, unread: 1 },
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now(),
      sender: "Você",
      avatar: "VC",
      content: newMessage,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    
    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate response
    setTimeout(() => {
      const response: Message = {
        id: Date.now() + 1,
        sender: selectedContact?.name || "Maria Silva",
        avatar: selectedContact?.avatar || "MS",
        content: "Ótimo! Vou marcar na agenda. 👍",
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        isMe: false
      };
      setMessages(prev => [...prev, response]);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[500px] flex">
      {/* Contacts Sidebar */}
      <div className="w-1/3 border-r bg-muted/20 flex flex-col">
        <div className="p-3 border-b bg-gradient-to-r from-primary/10 to-primary/5">
          <h3 className="font-semibold text-foreground text-sm">Conversas</h3>
        </div>
        <ScrollArea className="flex-1">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`p-3 flex items-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors border-b border-muted/30 ${
                selectedContact?.id === contact.id ? 'bg-primary/10' : ''
              }`}
            >
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/20 text-primary text-xs">{contact.avatar}</AvatarFallback>
                </Avatar>
                {contact.online && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-xs text-foreground truncate">{contact.name}</span>
                  {contact.unread > 0 && (
                    <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full">{contact.unread}</span>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground truncate">{contact.lastMessage}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-3 border-b flex items-center justify-between bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/20 text-primary text-xs">
                {selectedContact?.avatar || "MS"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm text-foreground">{selectedContact?.name || "Maria Silva"}</p>
              <p className="text-[10px] text-green-500">Online</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <Phone className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <Video className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <MoreVertical className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-3">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!message.isMe && (
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-primary/20 text-primary text-[10px]">{message.avatar}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] px-3 py-2 rounded-xl ${
                    message.isMe
                      ? 'bg-primary text-white rounded-br-sm'
                      : 'bg-muted rounded-bl-sm'
                  }`}
                >
                  <p className="text-xs leading-relaxed">{message.content}</p>
                  <p className={`text-[9px] mt-1 ${message.isMe ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-3 border-t bg-muted/20">
          <div className="flex gap-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 h-8 text-xs"
            />
            <Button size="sm" className="h-8 px-3" onClick={handleSendMessage}>
              <Send className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDemo;
