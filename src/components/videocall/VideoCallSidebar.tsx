import { useState } from "react";
import { cn } from "@/lib/utils";
import { X, Send, Users, MessageCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  isMe?: boolean;
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isMuted: boolean;
  isHost?: boolean;
  isSpeaking?: boolean;
}

interface VideoCallSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  participants: Participant[];
  onSendMessage: (text: string) => void;
}

const VideoCallSidebar = ({
  isOpen,
  onClose,
  messages,
  participants,
  onSendMessage,
}: VideoCallSidebarProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("chat");

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={cn(
        "fixed right-0 top-0 h-full w-80 bg-slate-900/95 backdrop-blur-xl border-l border-white/10 z-40 transition-transform duration-300 ease-out flex flex-col",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/5">
            <TabsTrigger
              value="chat"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger
              value="people"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/60"
            >
              <Users className="w-4 h-4 mr-2" />
              Pessoas ({participants.length})
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors ml-2"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <Tabs value={activeTab} className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Tab */}
        <TabsContent value="chat" className="flex-1 flex flex-col m-0 overflow-hidden">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col",
                    msg.isMe ? "items-end" : "items-start"
                  )}
                >
                  {!msg.isMe && (
                    <span className="text-xs text-white/40 mb-1 ml-1">
                      {msg.sender}
                    </span>
                  )}
                  <div
                    className={cn(
                      "max-w-[85%] px-4 py-2.5 rounded-2xl text-sm",
                      msg.isMe
                        ? "bg-cyan-500 text-white rounded-br-sm"
                        : "bg-white/10 text-white/90 rounded-bl-sm"
                    )}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-white/30 mt-1 mx-1">
                    {msg.time}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite uma mensagem..."
                className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-full"
              />
              <Button
                size="icon"
                onClick={handleSend}
                disabled={!newMessage.trim()}
                className="rounded-full bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* People Tab */}
        <TabsContent value="people" className="flex-1 m-0 overflow-hidden">
          <ScrollArea className="h-full p-4">
            <div className="space-y-2">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl transition-colors",
                    participant.isSpeaking
                      ? "bg-cyan-500/20 ring-1 ring-cyan-400/50"
                      : "hover:bg-white/5"
                  )}
                >
                  <div className="relative">
                    <img
                      src={participant.avatar}
                      alt={participant.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {participant.isSpeaking && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium truncate">
                        {participant.name}
                      </span>
                      {participant.isHost && (
                        <span className="px-1.5 py-0.5 text-[10px] bg-yellow-500/20 text-yellow-400 rounded">
                          Host
                        </span>
                      )}
                    </div>
                    <span className="text-white/40 text-xs">
                      {participant.isMuted ? "Mudo" : "Microfone ativo"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VideoCallSidebar;
