import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Clock, Zap, Users, Shield } from "lucide-react";

interface MeetingHUDProps {
  meetingTitle: string;
  participantCount: number;
  startTime: Date;
  xpGained: number;
  isRecording?: boolean;
}

const MeetingHUD = ({
  meetingTitle,
  participantCount,
  startTime,
  xpGained,
  isRecording = false,
}: MeetingHUDProps) => {
  const [elapsed, setElapsed] = useState("00:00");
  const [xpAnimating, setXpAnimating] = useState(false);
  const [displayedXP, setDisplayedXP] = useState(xpGained);

  useEffect(() => {
    const updateElapsed = () => {
      const diff = Date.now() - startTime.getTime();
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setElapsed(
        `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      );
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    if (xpGained !== displayedXP) {
      setXpAnimating(true);
      setDisplayedXP(xpGained);
      const timeout = setTimeout(() => setXpAnimating(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [xpGained, displayedXP]);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-4 px-5 py-2.5 rounded-full bg-slate-900/70 backdrop-blur-xl border border-white/10 shadow-lg">
        {/* Recording Indicator */}
        {isRecording && (
          <div className="flex items-center gap-2 pr-3 border-r border-white/20">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-xs font-medium">REC</span>
          </div>
        )}

        {/* Meeting Title */}
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span className="text-white/90 text-sm font-medium">
            {meetingTitle}
          </span>
        </div>

        <div className="w-px h-4 bg-white/20" />

        {/* Timer */}
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-white/60" />
          <span className="text-white/80 text-sm font-mono">{elapsed}</span>
        </div>

        <div className="w-px h-4 bg-white/20" />

        {/* Participants */}
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-white/60" />
          <span className="text-white/80 text-sm">{participantCount}</span>
        </div>

        <div className="w-px h-4 bg-white/20" />

        {/* XP Counter */}
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-300",
            xpAnimating
              ? "bg-yellow-500/30 scale-105"
              : "bg-yellow-500/10"
          )}
        >
          <Zap
            className={cn(
              "w-4 h-4 transition-all duration-300",
              xpAnimating ? "text-yellow-300 animate-pulse" : "text-yellow-400"
            )}
          />
          <span
            className={cn(
              "text-sm font-semibold transition-all duration-300",
              xpAnimating ? "text-yellow-200" : "text-yellow-400"
            )}
          >
            +{displayedXP} XP
          </span>
        </div>
      </div>
    </div>
  );
};

export default MeetingHUD;
