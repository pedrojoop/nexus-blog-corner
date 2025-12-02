import { AlertTriangle, TrendingDown, Users, Calendar, Zap } from "lucide-react";

interface DashboardMockupProps {
  variant?: 'hero' | 'solution';
}

export const DashboardMockup = ({ variant = 'hero' }: DashboardMockupProps) => {
  if (variant === 'hero') {
    return (
      <div className="relative perspective-1000">
        {/* 3D Tilt Container */}
        <div className="relative transform-gpu animate-tilt" style={{ transformStyle: 'preserve-3d' }}>
          {/* Glow behind the card */}
          <div className="absolute -inset-4 bg-nexus-alert/20 rounded-3xl blur-2xl opacity-50" />
          
          {/* Glass Card */}
          <div className="relative glass-card-gold p-8 transition-all duration-500 hover:shadow-[0_0_60px_rgba(197,186,153,0.3)]">
            {/* Card Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-space text-2xl font-bold text-white">Diagnóstico de Time</h3>
                <span className="bg-primary/20 text-primary border border-primary/30 font-medium px-3 py-1.5 rounded-full text-sm">
                  Engenharia & Produto
                </span>
              </div>
            </div>

            {/* Main Alert - Neon Red */}
            <div className="bg-nexus-alert/10 border-l-4 border-nexus-alert p-6 rounded-xl mb-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-nexus-alert/20 flex items-center justify-center flex-shrink-0 animate-pulse">
                  <AlertTriangle className="h-6 w-6 text-nexus-alert" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-nexus-alert mb-1">Risco de Burnout: ALTO</h4>
                  <p className="text-sm text-white/60">Detecção: 3 desenvolvedores sêniores apresentam padrões de risco sistêmico</p>
                </div>
              </div>
            </div>

            {/* Engagement Chart */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-sm font-semibold text-primary flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-nexus-alert" />
                  Engajamento (Last 30 days)
                </h5>
              </div>
              
              {/* Neon Line Chart */}
              <svg className="w-full h-24" viewBox="0 0 300 80" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradientDark" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0.02"/>
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Grid lines */}
                <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                <line x1="0" y1="40" x2="300" y2="40" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                
                {/* Area under the line */}
                <path 
                  d="M 0 25 L 50 30 L 100 20 L 150 35 L 200 45 L 250 55 L 300 65 L 300 80 L 0 80 Z" 
                  fill="url(#chartGradientDark)"
                />
                
                {/* The declining line with glow */}
                <path 
                  d="M 0 25 L 50 30 L 100 20 L 150 35 L 200 45 L 250 55 L 300 65" 
                  stroke="#FF6B6B" 
                  strokeWidth="3" 
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#glow)"
                />
              </svg>
            </div>

            {/* Alert List */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <Users className="h-5 w-5 text-nexus-alert flex-shrink-0 mt-0.5" />
                <p className="text-sm text-white/70">
                  <span className="font-semibold text-white">3 Desenvolvedores Sêniores</span> sem interação há 5 dias
                </p>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <Calendar className="h-5 w-5 text-nexus-alert flex-shrink-0 mt-0.5" />
                <p className="text-sm text-white/70">
                  Adesão aos rituais de <span className="font-semibold text-white">1:1 caiu para 40%</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Solution variant
  return (
    <div className="glass-card p-8 flex items-center gap-8 max-w-4xl w-full">
      {/* Card 1 - Alert */}
      <div className="flex-1 glass-card p-6 border-l-4 border-nexus-alert">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 bg-nexus-alert/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-nexus-alert animate-pulse" />
          </div>
          <div>
            <div className="text-xs text-primary mb-1">Detecção de IA</div>
            <div className="font-semibold text-white">
              O Time de Vendas está sobrecarregado.
            </div>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div className="flex flex-col items-center">
        <svg width="60" height="20" viewBox="0 0 60 20" className="text-primary">
          <defs>
            <marker
              id="arrowhead-dark"
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
            markerEnd="url(#arrowhead-dark)"
          />
        </svg>
      </div>

      {/* Card 2 - Action */}
      <div className="flex-1 glass-card-gold p-6 relative">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-xs text-primary mb-1">Ação Sugerida</div>
            <div className="font-semibold text-white">
              Agendar 'Day Off' e Ritual de Reconhecimento.
            </div>
          </div>
        </div>
        <button className="w-full btn-gold text-sm">
          Disparar Ação
        </button>
      </div>
    </div>
  );
};
