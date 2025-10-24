import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import Servicos from "./pages/Servicos";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import EstrategiasRHTurnover2025 from "./pages/blog/EstrategiasRHTurnover2025";
import CustoCulturaFraca2025 from "./pages/blog/CustoCulturaFraca2025";
import IAPreditivaRH2025 from "./pages/blog/IAPreditivaRH2025";
import NovaLiderancaDesengajamento2025 from "./pages/blog/NovaLiderancaDesengajamento2025";
import RetencaoTalentosEstrategias2025 from "./pages/blog/RetencaoTalentosEstrategias2025";
import CulturaOrganizacionalROI2025 from "./pages/blog/CulturaOrganizacionalROI2025";
import Dashboard from "./pages/Dashboard";
import DashboardChat from "./pages/DashboardChat";
import DashboardEventos from "./pages/DashboardEventos";
import DashboardDocumentos from "./pages/DashboardDocumentos";
import DashboardProjetos from "./pages/DashboardProjetos";
import DashboardPessoas from "./pages/DashboardPessoas";
import DashboardConfiguracoes from "./pages/DashboardConfiguracoes";
import DashboardKanban from "./pages/DashboardKanban";
import DashboardRH from "./pages/DashboardRH";
import DashboardRHPonto from "./pages/DashboardRHPonto";
import DashboardRHGamificacao from "./pages/DashboardRHGamificacao";
import DashboardRHRecrutamento from "./pages/DashboardRHRecrutamento";
import DashboardRHLMS from "./pages/DashboardRHLMS";
import DashboardRHCaaS from "./pages/DashboardRHCaaS";
import DashboardTickets from "./pages/DashboardTickets";
import DashboardTicketsNovo from "./pages/DashboardTicketsNovo";
import DashboardTicketsGestor from "./pages/DashboardTicketsGestor";
import DashboardTicketsDetalhes from "./pages/DashboardTicketsDetalhes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/estrategias-rh-reduzir-turnover-2025" element={<EstrategiasRHTurnover2025 />} />
          <Route path="/blog/custo-cultura-fraca-metricas-rh-2025" element={<CustoCulturaFraca2025 />} />
          <Route path="/blog/ia-preditiva-rh-turnover-2025" element={<IAPreditivaRH2025 />} />
          <Route path="/blog/nova-lideranca-desengajamento-2025" element={<NovaLiderancaDesengajamento2025 />} />
          <Route path="/blog/retencao-talentos-estrategias-2025" element={<RetencaoTalentosEstrategias2025 />} />
          <Route path="/blog/cultura-organizacional-roi-2025" element={<CulturaOrganizacionalROI2025 />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/chat" element={<DashboardChat />} />
          <Route path="/dashboard/eventos" element={<DashboardEventos />} />
          <Route path="/dashboard/documentos" element={<DashboardDocumentos />} />
          <Route path="/dashboard/projetos" element={<DashboardProjetos />} />
          <Route path="/dashboard/projetos/kanban" element={<DashboardKanban />} />
          <Route path="/dashboard/pessoas" element={<DashboardPessoas />} />
          <Route path="/dashboard/rh" element={<DashboardRH />} />
          <Route path="/dashboard/rh/ponto" element={<DashboardRHPonto />} />
          <Route path="/dashboard/rh/gamificacao" element={<DashboardRHGamificacao />} />
          <Route path="/dashboard/rh/recrutamento" element={<DashboardRHRecrutamento />} />
          <Route path="/dashboard/rh/lms" element={<DashboardRHLMS />} />
          <Route path="/dashboard/rh/caas" element={<DashboardRHCaaS />} />
          <Route path="/dashboard/tickets" element={<DashboardTickets />} />
          <Route path="/dashboard/tickets/novo" element={<DashboardTicketsNovo />} />
          <Route path="/dashboard/tickets/gestor" element={<DashboardTicketsGestor />} />
          <Route path="/dashboard/tickets/:id" element={<DashboardTicketsDetalhes />} />
          <Route path="/dashboard/configuracoes" element={<DashboardConfiguracoes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
