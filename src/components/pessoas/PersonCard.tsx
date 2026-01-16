import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar, MoreHorizontal } from "lucide-react";

interface PersonCardProps {
  person: {
    name: string;
    role: string;
    department: string;
    initials: string;
    skills: string[];
    status: 'online' | 'meeting' | 'offline';
    avatar?: string;
    location?: string;
  };
  index: number;
  isVisible: boolean;
}

const statusColors = {
  online: 'bg-green-500',
  meeting: 'bg-amber-500',
  offline: 'bg-muted-foreground/40'
};

const statusRingColors = {
  online: 'ring-green-500/30',
  meeting: 'ring-amber-500/30',
  offline: 'ring-muted-foreground/20'
};

const departmentColors: Record<string, string> = {
  'TI': 'bg-primary/15 text-primary',
  'Vendas': 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  'RH': 'bg-pink-500/15 text-pink-600 dark:text-pink-400',
  'Marketing': 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
  'Financeiro': 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  'Operações': 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400',
};

const PersonCard = ({ person, index, isVisible }: PersonCardProps) => {
  return (
    <div
      className="group relative"
      style={{
        animation: isVisible ? `fade-in 0.5s ease-out ${index * 0.08}s both` : 'none'
      }}
    >
      {/* Glass Card */}
      <div className="relative bg-card/60 dark:bg-card/40 backdrop-blur-xl border border-border/40 dark:border-white/10 rounded-3xl p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-primary/10 hover:-translate-y-1">
        {/* Floating gradient orb on hover */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
        
        <div className="relative flex flex-col items-center text-center">
          {/* Avatar with status ring */}
          <div className="relative mb-4">
            <div className={`absolute -inset-1.5 rounded-full ${statusRingColors[person.status]} ring-4 ring-inset`} />
            <Avatar className="h-20 w-20 ring-4 ring-background shadow-lg">
              {person.avatar ? (
                <AvatarImage src={person.avatar} alt={person.name} />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-bold text-xl">
                  {person.initials}
                </AvatarFallback>
              )}
            </Avatar>
            {/* Status dot */}
            <div className={`absolute -bottom-0.5 -right-0.5 h-5 w-5 ${statusColors[person.status]} rounded-full border-4 border-card shadow-md`} />
          </div>
          
          {/* Name */}
          <h3 className="font-bold text-lg text-foreground mb-0.5 group-hover:text-primary transition-colors duration-300">
            {person.name}
          </h3>
          
          {/* Role */}
          <p className="text-sm text-muted-foreground mb-2">{person.role}</p>
          
          {/* Department pill */}
          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium mb-4 ${departmentColors[person.department] || 'bg-secondary text-secondary-foreground'}`}>
            {person.department}
          </span>
          
          {/* Skills as micro-badges */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-5 min-h-[28px]">
            {person.skills.slice(0, 3).map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="px-2.5 py-0.5 bg-muted/80 dark:bg-muted/50 text-muted-foreground text-[10px] font-medium rounded-full border border-border/30"
              >
                {skill}
              </span>
            ))}
            {person.skills.length > 3 && (
              <span className="px-2 py-0.5 bg-muted/50 text-muted-foreground text-[10px] font-medium rounded-full">
                +{person.skills.length - 3}
              </span>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-2 w-full">
            <Button
              size="sm"
              className="flex-1 h-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
            >
              <MessageCircle className="h-4 w-4 mr-1.5" />
              Mensagem
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-xl border-border/50 hover:bg-secondary hover:border-primary/30 transition-all duration-300"
            >
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
