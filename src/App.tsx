import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import Servicos from "./pages/Servicos";
import Sobre from "./pages/Sobre";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
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
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/sobre" element={<Sobre />} />
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
