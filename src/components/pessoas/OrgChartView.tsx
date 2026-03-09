import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface OrgPerson {
  name: string;
  role: string;
  department: string;
  initials: string;
  status: "online" | "meeting" | "offline";
  avatar?: string;
  children?: OrgPerson[];
}

const statusColors: Record<string, string> = {
  online: "bg-green-500",
  meeting: "bg-amber-500",
  offline: "bg-muted-foreground/40",
};

const deptColors: Record<string, { bg: string; text: string }> = {
  Diretoria: { bg: "bg-blue-100 dark:bg-blue-900/40", text: "text-blue-700 dark:text-blue-300" },
  Tecnologia: { bg: "bg-violet-100 dark:bg-violet-900/40", text: "text-violet-700 dark:text-violet-300" },
  RH: { bg: "bg-emerald-100 dark:bg-emerald-900/40", text: "text-emerald-700 dark:text-emerald-300" },
  Vendas: { bg: "bg-orange-100 dark:bg-orange-900/40", text: "text-orange-700 dark:text-orange-300" },
  TI: { bg: "bg-violet-100 dark:bg-violet-900/40", text: "text-violet-700 dark:text-violet-300" },
};

const getDeptStyle = (dept: string) =>
  deptColors[dept] || { bg: "bg-muted", text: "text-muted-foreground" };

interface OrgNodeProps {
  person: OrgPerson;
  isRoot?: boolean;
}

const OrgNode = ({ person, isRoot }: OrgNodeProps) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = person.children && person.children.length > 0;
  const dept = getDeptStyle(person.department);

  return (
    <div className="flex flex-col items-center">
      {/* Card */}
      <div
        className={cn(
          "relative bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 w-56 cursor-default select-none",
          isRoot && "ring-2 ring-primary/20 shadow-md"
        )}
      >
        <div className="flex items-center gap-3 p-3.5">
          {/* Avatar with status dot */}
          <div className="relative shrink-0">
            <Avatar className={cn("ring-2 ring-background shadow", isRoot ? "h-12 w-12" : "h-10 w-10")}>
              {person.avatar ? (
                <AvatarImage src={person.avatar} alt={person.name} />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-bold text-xs">
                  {person.initials}
                </AvatarFallback>
              )}
            </Avatar>
            <div
              className={cn(
                "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card",
                statusColors[person.status]
              )}
            />
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <p className={cn("font-semibold text-foreground truncate", isRoot ? "text-sm" : "text-xs")}>
              {person.name}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">{person.role}</p>
            <span
              className={cn(
                "inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-medium leading-none",
                dept.bg,
                dept.text
              )}
            >
              {person.department}
            </span>
          </div>
        </div>

        {/* Expand/Collapse button */}
        {hasChildren && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-card border border-border shadow-sm hover:bg-muted transition-colors text-[10px] text-muted-foreground"
          >
            {expanded ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <>
                <ChevronDown className="h-3 w-3" />
                <span>{person.children!.length}</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Connector line down from card */}
      {hasChildren && expanded && (
        <>
          <div className="w-px h-6 bg-border" />

          {/* Horizontal line spanning children */}
          {person.children!.length > 1 && (
            <div className="relative w-full flex justify-center">
              <div
                className="absolute top-0 h-px bg-border"
                style={{
                  left: `calc(50% / ${person.children!.length} * ${person.children!.length - 1})`,
                  right: `calc(50% / ${person.children!.length} * ${person.children!.length - 1})`,
                }}
              />
            </div>
          )}

          {/* Children row */}
          <div className="flex items-start gap-8">
            {person.children!.map((child, i) => (
              <div key={child.name} className="flex flex-col items-center">
                {/* Vertical connector into child */}
                {person.children!.length > 1 && (
                  <div className="w-px h-6 bg-border" />
                )}
                <OrgNode person={child} />
              </div>
            ))}
          </div>

          {/* Horizontal bar across children tops */}
          {person.children!.length > 1 && (
            <style>{`/* connector handled inline */`}</style>
          )}
        </>
      )}
    </div>
  );
};

/* We need a wrapper that draws the horizontal connector bar properly */
const OrgBranch = ({ person, isRoot }: { person: OrgPerson; isRoot?: boolean }) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = person.children && person.children.length > 0;
  const dept = getDeptStyle(person.department);

  return (
    <div className="flex flex-col items-center">
      {/* Card */}
      <div
        className={cn(
          "relative bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-default select-none",
          isRoot ? "w-60 ring-2 ring-primary/20 shadow-md" : "w-52"
        )}
      >
        <div className={cn("flex items-center gap-3", isRoot ? "p-4" : "p-3")}>
          <div className="relative shrink-0">
            <Avatar className={cn("ring-2 ring-background shadow", isRoot ? "h-12 w-12" : "h-10 w-10")}>
              {person.avatar ? (
                <AvatarImage src={person.avatar} alt={person.name} />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-bold text-xs">
                  {person.initials}
                </AvatarFallback>
              )}
            </Avatar>
            <div
              className={cn(
                "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card",
                statusColors[person.status]
              )}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className={cn("font-semibold text-foreground truncate", isRoot ? "text-sm" : "text-xs")}>
              {person.name}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">{person.role}</p>
            <span
              className={cn(
                "inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-medium leading-none",
                dept.bg,
                dept.text
              )}
            >
              {person.department}
            </span>
          </div>
        </div>
        {hasChildren && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-card border border-border shadow-sm hover:bg-muted transition-colors text-[10px] text-muted-foreground"
          >
            {expanded ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <>
                <ChevronDown className="h-3 w-3" />
                <span>{person.children!.length}</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Connectors + Children */}
      {hasChildren && expanded && (
        <div className="flex flex-col items-center">
          {/* Vertical line down */}
          <div className="w-px h-8 bg-border" />

          {person.children!.length === 1 ? (
            <OrgBranch person={person.children![0]} />
          ) : (
            <div className="relative flex gap-10">
              {/* Horizontal bar connecting children */}
              <div className="absolute top-0 left-[calc(50%_-_50%_+_50%/var(--child-count))] right-[calc(50%_-_50%_+_50%/var(--child-count))] h-px bg-border" />
              
              {person.children!.map((child, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === person.children!.length - 1;
                return (
                  <div key={child.name} className="relative flex flex-col items-center">
                    {/* Vertical stub from horizontal bar to child */}
                    <div className="w-px h-8 bg-border" />
                    <OrgBranch person={child} />
                  </div>
                );
              })}

              {/* Draw horizontal connector overlay */}
              <div
                className="absolute top-0 h-px bg-border pointer-events-none"
                style={{
                  left: "calc(50% / var(--cols))",
                  right: "calc(50% / var(--cols))",
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* Final clean implementation with proper connectors */
const TreeNode = ({ person, isRoot }: { person: OrgPerson; isRoot?: boolean }) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = person.children && person.children.length > 0;
  const dept = getDeptStyle(person.department);

  return (
    <div className="flex flex-col items-center">
      {/* Card */}
      <div
        className={cn(
          "relative bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-default select-none",
          isRoot ? "w-60 ring-2 ring-primary/20 shadow-md" : "w-52"
        )}
      >
        <div className={cn("flex items-center gap-3", isRoot ? "p-4" : "p-3")}>
          <div className="relative shrink-0">
            <Avatar className={cn("ring-2 ring-background shadow", isRoot ? "h-12 w-12" : "h-10 w-10")}>
              {person.avatar ? (
                <AvatarImage src={person.avatar} alt={person.name} />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-bold text-xs">
                  {person.initials}
                </AvatarFallback>
              )}
            </Avatar>
            <div
              className={cn(
                "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card",
                statusColors[person.status]
              )}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className={cn("font-semibold text-foreground truncate", isRoot ? "text-sm" : "text-xs")}>
              {person.name}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">{person.role}</p>
            <span
              className={cn(
                "inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-medium leading-none",
                dept.bg,
                dept.text
              )}
            >
              {person.department}
            </span>
          </div>
        </div>
        {hasChildren && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-card border border-border shadow-sm hover:bg-muted transition-colors text-[10px] text-muted-foreground"
          >
            {expanded ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <>
                <ChevronDown className="h-3 w-3" />
                <span>{person.children!.length}</span>
              </>
            )}
          </button>
        )}
      </div>

      {hasChildren && expanded && <ChildrenConnector children={person.children!} />}
    </div>
  );
};

const ChildrenConnector = ({ children }: { children: OrgPerson[] }) => {
  if (children.length === 0) return null;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Vertical stem down from parent */}
      <div className="w-px h-8 bg-border" />

      {children.length === 1 ? (
        <TreeNode person={children[0]} />
      ) : (
        <div className="relative">
          {/* Children row */}
          <div className="flex gap-6 relative">
            {children.map((child, idx) => (
              <div key={child.name} className="flex flex-col items-center">
                {/* Vertical stub down to child card */}
                <div className="w-px h-6 bg-border" />
                <TreeNode person={child} />
              </div>
            ))}
          </div>

          {/* Horizontal connector bar across the top of children stubs */}
          {children.length > 1 && (
            <div
              className="absolute top-0 h-px bg-border"
              style={{
                left: `calc(50% / ${children.length})`,
                right: `calc(50% / ${children.length})`,
              }}
            />
          )}
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
      <div className="flex items-center gap-5 mb-8 text-xs text-muted-foreground">
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

      {/* Tree Canvas */}
      <div className="overflow-auto pb-8">
        <div className="flex justify-center min-w-max">
          <TreeNode person={data} isRoot />
        </div>
      </div>
    </div>
  );
};

export default OrgChartView;
