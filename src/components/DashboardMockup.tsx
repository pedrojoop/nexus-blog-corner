import { AlertTriangle, TrendingDown, Users, Calendar } from "lucide-react";

interface DashboardMockupProps {
  variant?: 'hero' | 'solution';
}

export const DashboardMockup = ({ variant = 'hero' }: DashboardMockupProps) => {
  if (variant === 'hero') {
    return (
      <div className="bg-gradient-to-br from-nexus-green to-nexus-green-light rounded-2xl p-8 aspect-[4/3] flex items-center justify-center shadow-2xl relative overflow-hidden">
        {/* Glassmorphism Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-2xl w-full max-w-md animate-fade-in">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-white font-semibold text-lg mb-1">
              Diagnóstico de Time: Engenharia & Produto
            </h3>
            <div className="flex items-center gap-2 mt-3">
              <AlertTriangle className="w-6 h-6 text-orange-500 animate-pulse" />
              <span className="text-orange-500 font-bold text-xl">
                Risco de Burnout: ALTO
              </span>
            </div>
          </div>

          {/* Chart */}
          <div className="mb-4 bg-white/5 rounded-lg p-4">
            <div className="text-white/70 text-sm mb-2 flex items-center gap-2">
              <TrendingDown className="w-4 h-4" />
              Engajamento (Last 30 days)
            </div>
            <svg viewBox="0 0 200 60" className="w-full h-16">
              <polyline
                points="0,20 40,25 80,15 120,30 160,45 200,55"
                fill="none"
                stroke="rgb(239, 68, 68)"
                strokeWidth="2"
                className="drop-shadow-lg"
              />
              <circle cx="200" cy="55" r="3" fill="rgb(239, 68, 68)" />
            </svg>
          </div>

          {/* Alerts List */}
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-white/90 text-sm bg-white/5 rounded p-2">
              <Users className="w-4 h-4 mt-0.5 text-orange-400 flex-shrink-0" />
              <span>3 Desenvolvedores Sêniores sem interação há 5 dias.</span>
            </div>
            <div className="flex items-start gap-2 text-white/90 text-sm bg-white/5 rounded p-2">
              <Calendar className="w-4 h-4 mt-0.5 text-orange-400 flex-shrink-0" />
              <span>Adesão aos rituais de 1:1 caiu para 40%.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-2xl p-12 flex items-center justify-center shadow-xl border border-muted/40 min-h-[400px]">
      <div className="flex items-center gap-8 max-w-4xl w-full animate-fade-in">
        {/* Card 1 - Alert */}
        <div className="flex-1 bg-background border-2 border-red-500/30 rounded-xl p-6 shadow-lg">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Detecção de IA</div>
              <div className="font-semibold text-foreground">
                O Time de Vendas está sobrecarregado.
              </div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center">
          <svg width="60" height="20" viewBox="0 0 60 20" className="text-nexus-accent">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="currentColor" />
              </marker>
            </defs>
            <line
              x1="0"
              y1="10"
              x2="50"
              y2="10"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead)"
            />
          </svg>
        </div>

        {/* Card 2 - Action */}
        <div className="flex-1 bg-background border-2 border-nexus-accent/50 rounded-xl p-6 shadow-lg relative">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-nexus-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-nexus-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Ação Sugerida</div>
              <div className="font-semibold text-foreground">
                Agendar 'Day Off' e Ritual de Reconhecimento.
              </div>
            </div>
          </div>
          <button className="w-full bg-nexus-accent hover:bg-nexus-accent/90 text-white font-semibold py-2.5 px-4 rounded-lg transition-all shadow-md hover:shadow-lg">
            Disparar Ação
          </button>
          {/* Simulated Cursor */}
          <div className="absolute -right-2 top-1/2 animate-pulse">
            <svg width="20" height="20" viewBox="0 0 20 20" className="text-foreground">
              <path
                d="M0 0 L0 16 L6 11 L9 18 L11 17 L8 10 L15 10 Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
