import { AlertTriangle, TrendingDown, Users, Calendar } from "lucide-react";

interface DashboardMockupProps {
  variant?: 'hero' | 'solution';
}

export const DashboardMockup = ({ variant = 'hero' }: DashboardMockupProps) => {
  if (variant === 'hero') {
    return (
      <div className="relative rounded-2xl overflow-hidden shadow-card border border-border bg-nexus-white p-8 transition-all duration-500 hover:shadow-card-hover">
        {/* Card Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-playfair text-2xl font-bold text-nexus-tinta">Diagnóstico de Time</h3>
            <span className="bg-nexus-acento/10 text-nexus-acento border border-nexus-acento/20 font-medium px-3 py-1.5 rounded-full text-sm">
              Engenharia & Produto
            </span>
          </div>
        </div>

        {/* Main Alert */}
        <div className="bg-nexus-alerta/5 border-l-4 border-nexus-alerta p-6 rounded-lg mb-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-nexus-alerta/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-nexus-alerta" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-nexus-alerta mb-1">Risco de Burnout: ALTO</h4>
              <p className="text-sm text-nexus-tinta/70">Detecção: 3 desenvolvedores sêniores apresentam padrões de risco sistêmico</p>
            </div>
          </div>
        </div>

        {/* Engagement Chart */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-sm font-semibold text-nexus-tinta/70 flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-nexus-alerta" />
              Engajamento (Last 30 days)
            </h5>
          </div>
          
          {/* Simple SVG Line Chart */}
          <svg className="w-full h-24" viewBox="0 0 300 80" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D9534F" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#D9534F" stopOpacity="0.02"/>
              </linearGradient>
            </defs>
            
            {/* Grid lines */}
            <line x1="0" y1="20" x2="300" y2="20" stroke="#e5e7eb" strokeWidth="1"/>
            <line x1="0" y1="40" x2="300" y2="40" stroke="#e5e7eb" strokeWidth="1"/>
            <line x1="0" y1="60" x2="300" y2="60" stroke="#e5e7eb" strokeWidth="1"/>
            
            {/* Area under the line */}
            <path 
              d="M 0 25 L 50 30 L 100 20 L 150 35 L 200 45 L 250 55 L 300 65 L 300 80 L 0 80 Z" 
              fill="url(#chartGradient)"
            />
            
            {/* The declining line */}
            <path 
              d="M 0 25 L 50 30 L 100 20 L 150 35 L 200 45 L 250 55 L 300 65" 
              stroke="#D9534F" 
              strokeWidth="2.5" 
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Alert List */}
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-nexus-alerta/5 border border-nexus-alerta/10">
            <Users className="h-5 w-5 text-nexus-alerta flex-shrink-0 mt-0.5" />
            <p className="text-sm text-nexus-tinta/70">
              <span className="font-semibold text-nexus-tinta">3 Desenvolvedores Sêniores</span> sem interação há 5 dias
            </p>
          </div>
          
          <div className="flex items-start gap-3 p-3 rounded-lg bg-nexus-alerta/5 border border-nexus-alerta/10">
            <Calendar className="h-5 w-5 text-nexus-alerta flex-shrink-0 mt-0.5" />
            <p className="text-sm text-nexus-tinta/70">
              Adesão aos rituais de <span className="font-semibold text-nexus-tinta">1:1 caiu para 40%</span>
            </p>
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
