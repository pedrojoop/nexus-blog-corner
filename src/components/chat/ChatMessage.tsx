import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  MessageSquare,
  Edit,
  Trash2,
  Smile,
  Quote,
} from "lucide-react";

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

interface ChatMessageProps {
  message: Message;
  isOwn: boolean;
  onEdit: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
  onReact: (id: string, emoji: string) => void;
  onThread: (id: string) => void;
  onQuote: (message: Message) => void;
}

export const ChatMessage = ({
  message,
  isOwn,
  onEdit,
  onDelete,
  onReact,
  onThread,
  onQuote,
}: ChatMessageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(message.text);
  const [showReactions, setShowReactions] = useState(false);

  const emojis = ["👍", "❤️", "😂", "😮", "😢", "🎉", "🚀", "👀"];

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(message.id, editText);
      setIsEditing(false);
    }
  };

  const handleReaction = (emoji: string) => {
    onReact(message.id, emoji);
    setShowReactions(false);
  };

  return (
    <div
      className={`group flex gap-3 hover:bg-muted/50 px-4 py-2 ${
        isOwn ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarFallback>{message.senderName[0]}</AvatarFallback>
      </Avatar>

      <div className={`flex-1 min-w-0 ${isOwn ? "items-end" : "items-start"} flex flex-col`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm">{message.senderName}</span>
          <span className="text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {message.isPinned && (
            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
              Fixada
            </span>
          )}
        </div>

        {isEditing ? (
          <div className="w-full">
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleEdit();
                if (e.key === "Escape") setIsEditing(false);
              }}
              className="mb-2"
              autoFocus
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleEdit}>
                Salvar
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-[70%]">
            {message.quotedMessage && (
              <div className="mb-2 p-2 bg-muted/50 border-l-2 border-primary rounded text-xs">
                <div className="font-semibold text-muted-foreground mb-1">
                  {message.quotedMessage.senderName}
                </div>
                <div className="truncate">{message.quotedMessage.text}</div>
              </div>
            )}
            <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
            
            {message.reactions && message.reactions.length > 0 && (
              <div className="flex gap-1 mt-2 flex-wrap">
                {message.reactions.map((reaction, idx) => (
                  <button
                    key={idx}
                    onClick={() => onReact(message.id, reaction.emoji)}
                    className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full hover:bg-muted/80 text-xs"
                  >
                    <span>{reaction.emoji}</span>
                    <span>{reaction.users.length}</span>
                  </button>
                ))}
              </div>
            )}

            {message.threadCount && message.threadCount > 0 && (
              <button
                onClick={() => onThread(message.id)}
                className="flex items-center gap-1 mt-2 text-xs text-primary hover:underline"
              >
                <MessageSquare className="h-3 w-3" />
                {message.threadCount} {message.threadCount === 1 ? "resposta" : "respostas"}
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="relative">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={() => setShowReactions(!showReactions)}
          >
            <Smile className="h-4 w-4" />
          </Button>
          
          {showReactions && (
            <div className="absolute top-full mt-1 bg-popover border rounded-lg shadow-lg p-2 flex gap-1 z-10">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleReaction(emoji)}
                  className="hover:bg-muted rounded p-1 text-lg"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={() => onThread(message.id)}
        >
          <MessageSquare className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={() => onQuote(message)}
        >
          <Quote className="h-4 w-4" />
        </Button>

        {isOwn && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(message.id)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};
