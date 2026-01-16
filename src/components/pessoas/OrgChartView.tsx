import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, ChevronRight, Users } from "lucide-react";
import { useState } from "react";

interface OrgPerson {
  name: string;
  role: string;
  department: string;
  initials: string;
  status: 'online' | 'meeting' | 'offline';
  avatar?: string;
  children?: OrgPerson[];
}

interface OrgNodeProps {
  person: OrgPerson;
  level: number;
  isLast?: boolean;
}

const statusColors = {
  online: 'bg-green-500',
  meeting: 'bg-amber-500',
  offline: 'bg-muted-foreground/40'
};

const OrgNode = ({ person, level, isLast }: OrgNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = person.children && person.children.length > 0;

  return (
    <div className="relative">
      {/* Connector line from parent */}
      {level > 0 && (
        <>
          <div className="absolute -left-8 top-0 w-8 h-8 border-l-2 border-b-2 border-border/50 rounded-bl-xl" />
          {!isLast && (
            <div className="absolute -left-8 top-8 w-0.5 h-full bg-border/50" />
          )}
        </>
      )}

      {/* Node card */}
      <div
        className={`group relative bg-card/60 dark:bg-card/40 backdrop-blur-xl border border-border/40 dark:border-white/10 rounded-2xl p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-lg cursor-pointer ${level === 0 ? 'bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20' : ''}`}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <Avatar className={`${level === 0 ? 'h-14 w-14' : 'h-11 w-11'} ring-2 ring-background shadow-md`}>
              {person.avatar ? (
                <AvatarImage src={person.avatar} alt={person.name} />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-bold text-sm">
                  {person.initials}
                </AvatarFallback>
              )}
            </Avatar>
            <div className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 ${statusColors[person.status]} rounded-full border-2 border-card`} />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h4 className={`font-semibold text-foreground truncate ${level === 0 ? 'text-base' : 'text-sm'}`}>
              {person.name}
            </h4>
            <p className="text-xs text-muted-foreground truncate">{person.role}</p>
          </div>

          {/* Expand/collapse */}
          {hasChildren && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                {person.children?.length}
              </span>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="ml-8 mt-3 space-y-3">
          {person.children?.map((child, index) => (
            <OrgNode
              key={child.name}
              person={child}
              level={level + 1}
              isLast={index === (person.children?.length || 0) - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface OrgChartViewProps {
  data: OrgPerson;
}

const OrgChartView = ({ data }: OrgChartViewProps) => {
  return (
    <div className="p-6">
      {/* Legend */}
      <div className="flex items-center gap-4 mb-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
          Online
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          Em Reunião
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
          Offline
        </div>
      </div>

      {/* Tree */}
      <div className="space-y-4">
        <OrgNode person={data} level={0} />
      </div>
    </div>
  );
};

export default OrgChartView;
