import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ReactionBubbleProps {
  emoji: string;
  userName: string;
  onComplete: () => void;
}

const ReactionBubble = ({ emoji, userName, onComplete }: ReactionBubbleProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [onComplete]);

  // Random horizontal position
  const randomLeft = Math.random() * 60 + 20; // 20% to 80%

  return (
    <div
      className={cn(
        "fixed z-50 pointer-events-none transition-all duration-300",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      style={{
        left: `${randomLeft}%`,
        bottom: "180px",
        animation: "float-up 2.5s ease-out forwards",
      }}
    >
      <div className="flex flex-col items-center gap-1">
        <span className="text-5xl animate-bounce">{emoji}</span>
        <span className="px-2 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm text-white text-xs">
          {userName}
        </span>
      </div>

      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 0;
          }
          10% {
            transform: translateY(-20px) scale(1);
            opacity: 1;
          }
          80% {
            transform: translateY(-200px) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-250px) scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ReactionBubble;
