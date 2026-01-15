import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Send,
  Paperclip,
  Image as ImageIcon,
  Smile,
  Mic,
  X,
} from "lucide-react";

interface QuotedMessage {
  id: string;
  senderName: string;
  text: string;
}

interface ModernChatInputProps {
  onSendMessage: (text: string, quotedMessageId?: string) => void;
  quotedMessage?: QuotedMessage | null;
  onClearQuote?: () => void;
}

export const ModernChatInput = ({ 
  onSendMessage, 
  quotedMessage, 
  onClearQuote 
}: ModernChatInputProps) => {
  const [inputText, setInputText] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const emojis = ["😀", "😂", "❤️", "👍", "🔥", "🎉", "👏", "🙌", "💪", "✨", "🚀", "💯"];

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText, quotedMessage?.id);
    setInputText("");
    textareaRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const insertEmoji = (emoji: string) => {
    setInputText(prev => prev + emoji);
    setShowEmojis(false);
    textareaRef.current?.focus();
  };

  return (
    <div className="p-4 pb-6 bg-background/80 backdrop-blur-sm">
      {/* Quoted Message */}
      {quotedMessage && (
        <div className="mb-3 mx-2 p-3 bg-muted/60 rounded-2xl flex items-start justify-between animate-fade-in">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-primary font-medium mb-0.5">
              Respondendo a {quotedMessage.senderName}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {quotedMessage.text}
            </p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 ml-2 rounded-full hover:bg-muted flex-shrink-0"
            onClick={onClearQuote}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Input Container - Floating Pill */}
      <div className="relative flex items-end gap-2">
        {/* Attachment Buttons */}
        <div className="flex gap-1 mb-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
          >
            <ImageIcon className="h-5 w-5" />
          </Button>
        </div>

        {/* Main Input Pill */}
        <div className="flex-1 relative">
          <div className="relative bg-muted/60 rounded-3xl shadow-sm border border-border/50 hover:border-border transition-colors">
            <Textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite uma mensagem..."
              className="min-h-[48px] max-h-[120px] py-3 px-5 pr-12 bg-transparent border-0 rounded-3xl resize-none text-[15px] placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0"
              rows={1}
            />
            
            {/* Emoji Button inside input */}
            <div className="absolute right-3 bottom-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
                onClick={() => setShowEmojis(!showEmojis)}
              >
                <Smile className="h-5 w-5" />
              </Button>
            </div>

            {/* Emoji Picker */}
            {showEmojis && (
              <div className="absolute bottom-full right-0 mb-2 p-2 bg-card border border-border rounded-2xl shadow-lg grid grid-cols-6 gap-1 z-20 animate-scale-in">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => insertEmoji(emoji)}
                    className="p-2 hover:bg-muted rounded-lg text-xl transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Send Button */}
        {inputText.trim() ? (
          <Button
            onClick={handleSend}
            size="icon"
            className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 mb-0.5"
          >
            <Send className="h-5 w-5" />
          </Button>
        ) : (
          <Button
            size="icon"
            variant="ghost"
            className="h-12 w-12 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 mb-0.5"
          >
            <Mic className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};
