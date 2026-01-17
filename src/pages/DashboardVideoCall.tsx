import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import VideoParticipant from "@/components/videocall/VideoParticipant";
import FloatingControls from "@/components/videocall/FloatingControls";
import MeetingHUD from "@/components/videocall/MeetingHUD";
import VideoCallSidebar from "@/components/videocall/VideoCallSidebar";
import ReactionBubble from "@/components/videocall/ReactionBubble";

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isMuted: boolean;
  isVideoOff: boolean;
  emoji: string;
  isSpeaking?: boolean;
  isHost?: boolean;
}

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  isMe?: boolean;
}

interface Reaction {
  id: string;
  emoji: string;
  userName: string;
}

const DashboardVideoCall = () => {
  const navigate = useNavigate();
  
  // Meeting state
  const [meetingStartTime] = useState(new Date());
  const [xpGained, setXpGained] = useState(10);
  
  // User controls
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Reactions
  const [reactions, setReactions] = useState<Reaction[]>([]);
  
  // Chat messages
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "Lucas Costa",
      text: "Pessoal, vamos começar em 2 minutos!",
      time: "14:28",
    },
    {
      id: "2",
      sender: "Maria Oliveira",
      text: "Perfeito, já estou pronta",
      time: "14:29",
    },
    {
      id: "3",
      sender: "Você",
      text: "Estou aqui também 👋",
      time: "14:29",
      isMe: true,
    },
    {
      id: "4",
      sender: "Pedro Lima",
      text: "Ótimo, vamos lá! Hoje temos bastante coisa para discutir sobre o roadmap do Q1",
      time: "14:30",
    },
  ]);

  // Participants
  const [participants] = useState<Participant[]>([
    {
      id: "1",
      name: "Pedro Lima",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      isMuted: false,
      isVideoOff: false,
      emoji: "🚀",
      isSpeaking: true,
      isHost: true,
    },
    {
      id: "2",
      name: "Maria Oliveira",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
      isMuted: false,
      isVideoOff: false,
      emoji: "💡",
    },
    {
      id: "3",
      name: "Lucas Costa",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
      isMuted: true,
      isVideoOff: false,
      emoji: "🎯",
    },
    {
      id: "4",
      name: "Ana Santos",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
      isMuted: false,
      isVideoOff: true,
      emoji: "✨",
    },
    {
      id: "5",
      name: "Você",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      isMuted: isMuted,
      isVideoOff: isVideoOff,
      emoji: "🔥",
    },
  ]);

  // XP gain simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setXpGained((prev) => prev + 5);
    }, 60000); // +5 XP every minute

    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    toast(isMuted ? "Microfone ativado" : "Microfone desativado", {
      icon: isMuted ? "🎤" : "🔇",
    });
  };

  const handleToggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    toast(isVideoOff ? "Câmera ativada" : "Câmera desativada", {
      icon: isVideoOff ? "📹" : "📷",
    });
  };

  const handleToggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    toast(
      isScreenSharing
        ? "Compartilhamento encerrado"
        : "Você está compartilhando sua tela",
      { icon: "🖥️" }
    );
  };

  const handleRaiseHand = () => {
    setIsHandRaised(!isHandRaised);
    toast(isHandRaised ? "Mão abaixada" : "Você levantou a mão", {
      icon: "✋",
    });
  };

  const handleReaction = useCallback((emoji: string) => {
    const newReaction: Reaction = {
      id: Date.now().toString(),
      emoji,
      userName: "Você",
    };
    setReactions((prev) => [...prev, newReaction]);
  }, []);

  const handleRemoveReaction = useCallback((id: string) => {
    setReactions((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "Você",
      text,
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMe: true,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleLeave = () => {
    toast.success(`Você ganhou ${xpGained} XP nesta reunião! 🎉`);
    navigate("/dashboard/chat");
  };

  // Get participants for sidebar
  const sidebarParticipants = participants.map((p) => ({
    id: p.id,
    name: p.name,
    avatar: p.avatar,
    isMuted: p.isMuted,
    isHost: p.isHost,
    isSpeaking: p.isSpeaking,
  }));

  return (
    <div className="fixed inset-0 bg-slate-950 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.05),transparent_50%)]" />

      {/* HUD */}
      <MeetingHUD
        meetingTitle="Weekly Team Sync"
        participantCount={participants.length}
        startTime={meetingStartTime}
        xpGained={xpGained}
        isRecording={false}
      />

      {/* Video Grid */}
      <div className="relative z-10 h-full p-6 pt-20 pb-32">
        <div
          className={`h-full grid gap-4 ${
            participants.length <= 2
              ? "grid-cols-1 md:grid-cols-2"
              : participants.length <= 4
              ? "grid-cols-2"
              : participants.length <= 6
              ? "grid-cols-2 md:grid-cols-3"
              : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          {participants.map((participant, index) => (
            <VideoParticipant
              key={participant.id}
              name={participant.name}
              avatar={participant.avatar}
              isSpeaking={participant.isSpeaking}
              isMuted={participant.id === "5" ? isMuted : participant.isMuted}
              isVideoOff={
                participant.id === "5" ? isVideoOff : participant.isVideoOff
              }
              emoji={participant.emoji}
              isLarge={participants.length <= 2 || index === 0}
            />
          ))}
        </div>
      </div>

      {/* Floating Controls */}
      <FloatingControls
        isMuted={isMuted}
        isVideoOff={isVideoOff}
        isScreenSharing={isScreenSharing}
        isChatOpen={isChatOpen}
        onToggleMute={handleToggleMute}
        onToggleVideo={handleToggleVideo}
        onToggleScreenShare={handleToggleScreenShare}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        onReaction={handleReaction}
        onLeave={handleLeave}
        onRaiseHand={handleRaiseHand}
        isHandRaised={isHandRaised}
      />

      {/* Sidebar */}
      <VideoCallSidebar
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        messages={messages}
        participants={sidebarParticipants}
        onSendMessage={handleSendMessage}
      />

      {/* Floating Reactions */}
      {reactions.map((reaction) => (
        <ReactionBubble
          key={reaction.id}
          emoji={reaction.emoji}
          userName={reaction.userName}
          onComplete={() => handleRemoveReaction(reaction.id)}
        />
      ))}
    </div>
  );
};

export default DashboardVideoCall;
