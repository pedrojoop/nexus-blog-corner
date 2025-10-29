import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Send,
  Paperclip,
  Image as ImageIcon,
  Smile,
  AtSign,
  Bold,
  Italic,
  List,
  Code,
  X,
} from "lucide-react";

interface QuotedMessage {
  id: string;
  senderName: string;
  text: string;
}

interface ChatInputProps {
  onSendMessage: (text: string, quotedMessageId?: string) => void;
  quotedMessage?: QuotedMessage | null;
  onClearQuote?: () => void;
}

export const ChatInput = ({ onSendMessage, quotedMessage, onClearQuote }: ChatInputProps) => {
  const [inputText, setInputText] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const users = [
    { id: "1", name: "João Silva" },
    { id: "2", name: "Maria Santos" },
    { id: "3", name: "Carlos Souza" },
    { id: "4", name: "Ana Oliveira" },
  ];

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText, quotedMessage?.id);
    setInputText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMention = (userName: string) => {
    const cursorPosition = textareaRef.current?.selectionStart || 0;
    const textBefore = inputText.substring(0, cursorPosition);
    const textAfter = inputText.substring(cursorPosition);
    const lastAtIndex = textBefore.lastIndexOf("@");
    
    if (lastAtIndex !== -1) {
      const newText = textBefore.substring(0, lastAtIndex) + `@${userName} ` + textAfter;
      setInputText(newText);
    } else {
      setInputText(inputText + `@${userName} `);
    }
    
    setShowMentions(false);
    textareaRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputText(value);

    const cursorPosition = e.target.selectionStart;
    const textBeforeCursor = value.substring(0, cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf("@");
    
    if (lastAtIndex !== -1 && lastAtIndex === cursorPosition - 1) {
      setShowMentions(true);
    } else if (lastAtIndex !== -1) {
      const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1);
      if (textAfterAt.includes(" ") || textAfterAt.length === 0) {
        setShowMentions(false);
      }
    } else {
      setShowMentions(false);
    }
  };

  const insertFormatting = (before: string, after: string = before) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = inputText.substring(start, end);
    const newText = inputText.substring(0, start) + before + selectedText + after + inputText.substring(end);
    
    setInputText(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  return (
    <div className="border-t p-4">
      {quotedMessage && (
        <div className="mb-2 p-2 bg-muted rounded flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="text-xs text-muted-foreground mb-1">
              Respondendo a {quotedMessage.senderName}
            </div>
            <div className="text-sm truncate">{quotedMessage.text}</div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 ml-2"
            onClick={onClearQuote}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="flex gap-2 mb-2">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={() => insertFormatting("**")}
          title="Negrito"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={() => insertFormatting("*")}
          title="Itálico"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={() => insertFormatting("`")}
          title="Código"
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={() => insertFormatting("\n- ", "")}
          title="Lista"
        >
          <List className="h-4 w-4" />
        </Button>
        <div className="flex-1" />
        <Button size="icon" variant="ghost" className="h-8 w-8">
          <Paperclip className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" className="h-8 w-8">
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" className="h-8 w-8">
          <Smile className="h-4 w-4" />
        </Button>
      </div>

      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua mensagem... (@ para mencionar)"
          className="min-h-[80px] resize-none pr-12"
        />
        
        {showMentions && (
          <div className="absolute bottom-full mb-2 left-0 bg-popover border rounded-lg shadow-lg p-2 w-64 z-10">
            <div className="text-xs text-muted-foreground mb-2 px-2">Mencionar usuário</div>
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => handleMention(user.name)}
                className="w-full text-left px-2 py-1 hover:bg-muted rounded text-sm"
              >
                <AtSign className="h-3 w-3 inline mr-1" />
                {user.name}
              </button>
            ))}
          </div>
        )}

        <Button
          onClick={handleSend}
          size="icon"
          className="absolute bottom-2 right-2 h-8 w-8"
          disabled={!inputText.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-2 text-xs text-muted-foreground">
        <span className="font-semibold">Dica:</span> Use /tarefa para criar tarefas, /ticket
        para abrir tickets
      </div>
    </div>
  );
};
