import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Smile } from "lucide-react";

interface Reaction {
  emoji: string;
  users: string[];
}

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  reactions?: Reaction[];
  threadCount?: number;
  isPinned?: boolean;
  quotedMessage?: {
    id: string;
    senderName: string;
    text: string;
  };
}

interface ModernChatMessageProps {
  message: Message;
  isOwn: boolean;
  showAvatar?: boolean;
  isLastInGroup?: boolean;
  onReact: (id: string, emoji: string) => void;
}

export const ModernChatMessage = ({
  message,
  isOwn,
  showAvatar = true,
  isLastInGroup = true,
  onReact,
}: ModernChatMessageProps) => {
  const [showReactions, setShowReactions] = useState(false);

  const emojis = ["❤️", "👍", "😂", "😮", "😢", "🔥"];

  const handleReaction = (emoji: string) => {
    onReact(message.id, emoji);
    setShowReactions(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`group flex gap-2 px-4 py-0.5 ${
        isOwn ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar placeholder for alignment */}
      <div className="w-8 flex-shrink-0">
        {showAvatar && !isOwn && isLastInGroup && (
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs bg-muted text-muted-foreground">
              {message.senderName[0]}
            </AvatarFallback>
          </Avatar>
        )}
      </div>

      {/* Message Bubble */}
      <div className={`max-w-[70%] relative ${isOwn ? "items-end" : "items-start"}`}>
        {/* Quoted Message */}
        {message.quotedMessage && (
          <div 
            className={`mb-1 px-3 py-2 rounded-xl text-xs ${
              isOwn 
                ? "bg-primary/20 text-primary-foreground/80" 
                : "bg-muted/80 text-muted-foreground"
            }`}
          >
            <span className="font-medium">{message.quotedMessage.senderName}</span>
            <p className="truncate opacity-80">{message.quotedMessage.text}</p>
          </div>
        )}

        {/* Main Bubble */}
        <div
          className={`relative px-4 py-2.5 transition-shadow duration-200 ${
            isOwn
              ? "bg-primary text-primary-foreground rounded-[20px] rounded-br-md shadow-sm"
              : "bg-muted/70 text-foreground rounded-[20px] rounded-bl-md shadow-sm"
          }`}
          onMouseEnter={() => setShowReactions(true)}
          onMouseLeave={() => setShowReactions(false)}
        >
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
            {message.text}
          </p>

          {/* Timestamp */}
          <span 
            className={`text-[10px] mt-1 block ${
              isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
            }`}
          >
            {formatTime(message.timestamp)}
          </span>

          {/* Reaction Picker - appears on hover */}
          {showReactions && (
            <div
              className={`absolute ${
                isOwn ? "right-0" : "left-0"
              } -top-10 bg-card border border-border rounded-full shadow-lg px-1.5 py-1 flex gap-0.5 z-20 animate-scale-in`}
            >
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleReaction(emoji)}
                  className="hover:scale-125 transition-transform p-1 text-base"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Reactions Display */}
        {message.reactions && message.reactions.length > 0 && (
          <div 
            className={`flex gap-1 mt-1 flex-wrap ${
              isOwn ? "justify-end" : "justify-start"
            }`}
          >
            {message.reactions.map((reaction, idx) => (
              <button
                key={idx}
                onClick={() => onReact(message.id, reaction.emoji)}
                className="flex items-center gap-0.5 px-2 py-0.5 bg-muted/80 rounded-full hover:bg-muted text-xs shadow-sm transition-colors"
              >
                <span>{reaction.emoji}</span>
                <span className="text-muted-foreground">{reaction.users.length}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
