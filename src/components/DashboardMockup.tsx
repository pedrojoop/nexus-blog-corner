import { BarChart3, AlertTriangle } from "lucide-react";

interface DashboardMockupProps {
  variant?: 'hero' | 'solution';
}

export const DashboardMockup = ({ variant = 'hero' }: DashboardMockupProps) => {
  if (variant === 'hero') {
    return (
      <div className="bg-gradient-to-br from-nexus-green to-nexus-green-light rounded-2xl p-12 aspect-[4/3] flex flex-col items-center justify-center shadow-2xl">
        <div className="w-20 h-20 bg-nexus-accent/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
          <BarChart3 className="w-10 h-10 text-nexus-accent" />
        </div>
        <h3 className="text-2xl font-bold text-white text-center">
          Dashboard de Diagnóstico de Cultura
        </h3>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-2xl p-12 aspect-[4/3] flex flex-col items-center justify-center shadow-xl border border-muted/40">
      <div className="flex gap-4 mb-6">
        <div className="w-16 h-16 bg-nexus-accent/20 rounded-xl flex items-center justify-center">
          <BarChart3 className="w-8 h-8 text-nexus-accent" />
        </div>
        <div className="w-16 h-16 bg-orange-500/20 rounded-xl flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-orange-600" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-foreground text-center mb-2">
        Dashboard de IA de Diagnóstico
      </h3>
      <p className="text-muted-foreground text-center">
        Alertas em tempo real e sugestões de ação
      </p>
    </div>
  );
};
