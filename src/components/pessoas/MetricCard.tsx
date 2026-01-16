import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  iconColor: string;
  iconBgColor: string;
}

const MetricCard = ({ icon: Icon, label, value, iconColor, iconBgColor }: MetricCardProps) => {
  return (
    <div className="group relative bg-card/60 dark:bg-card/40 backdrop-blur-xl border border-border/40 dark:border-white/10 rounded-2xl p-4 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl ${iconBgColor} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
