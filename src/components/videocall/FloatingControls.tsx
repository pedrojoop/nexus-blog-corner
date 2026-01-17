import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Smile,
  MessageCircle,
  PhoneOff,
  Hand,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FloatingControlsProps {
  isMuted: boolean;
  isVideoOff: boolean;
  isScreenSharing: boolean;
  isChatOpen: boolean;
  onToggleMute: () => void;
  onToggleVideo: () => void;
  onToggleScreenShare: () => void;
  onToggleChat: () => void;
  onReaction: (emoji: string) => void;
  onLeave: () => void;
  onRaiseHand: () => void;
  isHandRaised: boolean;
}

const FloatingControls = ({
  isMuted,
  isVideoOff,
  isScreenSharing,
  isChatOpen,
  onToggleMute,
  onToggleVideo,
  onToggleScreenShare,
  onToggleChat,
  onReaction,
  onLeave,
  onRaiseHand,
  isHandRaised,
}: FloatingControlsProps) => {
  const [showReactions, setShowReactions] = useState(false);

  const reactions = ["👏", "🎉", "❤️", "😂", "🔥", "👍"];

  const ControlButton = ({
    icon: Icon,
    active,
    danger,
    onClick,
    label,
    highlight,
  }: {
    icon: React.ComponentType<{ className?: string }>;
    active?: boolean;
    danger?: boolean;
    onClick: () => void;
    label: string;
    highlight?: boolean;
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "relative p-4 rounded-full transition-all duration-200 group",
        danger
          ? "bg-red-500 hover:bg-red-600 text-white"
          : active
          ? "bg-white/20 text-white hover:bg-white/30"
          : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white",
        highlight && "ring-2 ring-cyan-400 bg-cyan-500/20"
      )}
      title={label}
    >
      <Icon className="w-5 h-5" />
      {highlight && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
      )}
    </button>
  );

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl">
        {/* Audio Control */}
        <ControlButton
          icon={isMuted ? MicOff : Mic}
          active={!isMuted}
          onClick={onToggleMute}
          label={isMuted ? "Ativar microfone" : "Desativar microfone"}
        />

        {/* Video Control */}
        <ControlButton
          icon={isVideoOff ? VideoOff : Video}
          active={!isVideoOff}
          onClick={onToggleVideo}
          label={isVideoOff ? "Ativar câmera" : "Desativar câmera"}
        />

        {/* Screen Share */}
        <ControlButton
          icon={Monitor}
          active={isScreenSharing}
          onClick={onToggleScreenShare}
          label={isScreenSharing ? "Parar compartilhamento" : "Compartilhar tela"}
          highlight={isScreenSharing}
        />

        {/* Raise Hand */}
        <ControlButton
          icon={Hand}
          active={isHandRaised}
          onClick={onRaiseHand}
          label={isHandRaised ? "Baixar mão" : "Levantar mão"}
          highlight={isHandRaised}
        />

        {/* Reactions */}
        <Popover open={showReactions} onOpenChange={setShowReactions}>
          <PopoverTrigger asChild>
            <button
              className="p-4 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all duration-200"
              title="Reações"
            >
              <Smile className="w-5 h-5" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            className="w-auto p-2 bg-slate-900/95 backdrop-blur-xl border-white/10 rounded-2xl"
          >
            <div className="flex gap-1">
              {reactions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    onReaction(emoji);
                    setShowReactions(false);
                  }}
                  className="p-2 text-2xl hover:scale-125 hover:bg-white/10 rounded-full transition-all duration-200"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Chat Toggle */}
        <ControlButton
          icon={MessageCircle}
          active={isChatOpen}
          onClick={onToggleChat}
          label={isChatOpen ? "Fechar chat" : "Abrir chat"}
          highlight={isChatOpen}
        />

        {/* More Options */}
        <button
          className="p-4 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all duration-200"
          title="Mais opções"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-white/20 mx-2" />

        {/* Leave Call */}
        <ControlButton
          icon={PhoneOff}
          danger
          onClick={onLeave}
          label="Sair da chamada"
        />
      </div>
    </div>
  );
};

export default FloatingControls;
