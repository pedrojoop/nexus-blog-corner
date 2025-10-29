import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Send } from "lucide-react";

interface ThreadMessage {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
}

interface MessageThreadProps {
  originalMessage: {
    id: string;
    text: string;
    senderName: string;
    timestamp: Date;
  };
  replies: ThreadMessage[];
  open: boolean;
  onClose: () => void;
  onSendReply: (text: string) => void;
}

export const MessageThread = ({
  originalMessage,
  replies,
  open,
  onClose,
  onSendReply,
}: MessageThreadProps) => {
  const [replyText, setReplyText] = useState("");

  const handleSend = () => {
    if (!replyText.trim()) return;
    onSendReply(replyText);
    setReplyText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0 flex flex-col">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Thread da Conversa</SheetTitle>
          <p className="text-xs text-muted-foreground">
            {replies.length} {replies.length === 1 ? "resposta" : "respostas"}
          </p>
        </SheetHeader>

        {/* Original Message */}
        <div className="p-4 border-b bg-muted/30">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>{originalMessage.senderName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm">{originalMessage.senderName}</span>
                <span className="text-xs text-muted-foreground">
                  {originalMessage.timestamp.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{originalMessage.text}</p>
            </div>
          </div>
        </div>

        {/* Replies */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {replies.map((reply) => (
              <div key={reply.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">{reply.senderName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{reply.senderName}</span>
                    <span className="text-xs text-muted-foreground">
                      {reply.timestamp.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{reply.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Reply Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Responder na thread..."
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon" disabled={!replyText.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};