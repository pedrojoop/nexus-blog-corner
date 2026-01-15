import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, Video, Info, ChevronLeft } from "lucide-react";

interface ModernChatHeaderProps {
  name: string;
  isOnline?: boolean;
  isGroup?: boolean;
  memberCount?: number;
  onBack?: () => void;
  onVoiceCall: () => void;
  onVideoCall: () => void;
  onInfo: () => void;
}

export const ModernChatHeader = ({
  name,
  isOnline,
  isGroup,
  memberCount,
  onBack,
  onVoiceCall,
  onVideoCall,
  onInfo,
}: ModernChatHeaderProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const getStatusText = () => {
    if (isGroup) {
      return `${memberCount || 0} membros`;
    }
    return isOnline ? "Online" : "Visto por último recentemente";
  };

  return (
    <div className="h-[72px] px-4 flex items-center justify-between bg-background/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {onBack && (
          <Button
            size="icon"
            variant="ghost"
            className="h-9 w-9 rounded-full md:hidden"
            onClick={onBack}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}

        {/* Avatar */}
        <div className="relative">
          <Avatar className="h-11 w-11 ring-2 ring-background">
            <AvatarFallback
              className={`text-sm font-medium ${
                isGroup
                  ? "bg-gradient-to-br from-primary to-accent text-white"
                  : "bg-muted text-foreground"
              }`}
            >
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          {isOnline && !isGroup && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
          )}
        </div>

        {/* Name and Status */}
        <div>
          <h2 className="font-semibold text-[15px] text-foreground">{name}</h2>
          <p className={`text-xs ${isOnline ? "text-green-500" : "text-muted-foreground"}`}>
            {getStatusText()}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1">
        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10 rounded-full text-primary hover:bg-primary/10"
          onClick={onVoiceCall}
        >
          <Phone className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10 rounded-full text-primary hover:bg-primary/10"
          onClick={onVideoCall}
        >
          <Video className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10 rounded-full text-primary hover:bg-primary/10"
          onClick={onInfo}
        >
          <Info className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
