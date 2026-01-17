import { cn } from "@/lib/utils";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

interface VideoParticipantProps {
  name: string;
  avatar: string;
  isSpeaking?: boolean;
  isMuted?: boolean;
  isVideoOff?: boolean;
  emoji?: string;
  isLarge?: boolean;
}

const VideoParticipant = ({
  name,
  avatar,
  isSpeaking = false,
  isMuted = false,
  isVideoOff = false,
  emoji = "🚀",
  isLarge = false,
}: VideoParticipantProps) => {
  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden bg-slate-800 transition-all duration-300",
        isLarge ? "aspect-video" : "aspect-square",
        isSpeaking && "ring-2 ring-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
      )}
    >
      {/* Video or Avatar */}
      {isVideoOff ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
          <div className="relative">
            <img
              src={avatar}
              alt={name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-slate-600"
            />
            {isSpeaking && (
              <div className="absolute inset-0 rounded-full animate-pulse ring-4 ring-cyan-400/50" />
            )}
          </div>
        </div>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${avatar})`,
            filter: "blur(0px)",
          }}
        >
          {/* Simulated video feed overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      )}

      {/* Name and Status Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium text-sm">{name}</span>
            <span className="text-lg">{emoji}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {isMuted ? (
              <div className="p-1.5 rounded-full bg-red-500/90">
                <MicOff className="w-3 h-3 text-white" />
              </div>
            ) : (
              <div className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                <Mic className="w-3 h-3 text-white" />
              </div>
            )}
            {isVideoOff && (
              <div className="p-1.5 rounded-full bg-red-500/90">
                <VideoOff className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Speaking indicator glow effect */}
      {isSpeaking && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 animate-pulse opacity-30 bg-gradient-to-t from-cyan-400/20 to-transparent" />
        </div>
      )}
    </div>
  );
};

export default VideoParticipant;
