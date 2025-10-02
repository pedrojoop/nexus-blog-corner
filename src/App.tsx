import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
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
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/chat" element={<DashboardChat />} />
          <Route path="/dashboard/eventos" element={<DashboardEventos />} />
          <Route path="/dashboard/documentos" element={<DashboardDocumentos />} />
          <Route path="/dashboard/projetos" element={<DashboardProjetos />} />
          <Route path="/dashboard/projetos/kanban" element={<DashboardKanban />} />
          <Route path="/dashboard/pessoas" element={<DashboardPessoas />} />
          <Route path="/dashboard/configuracoes" element={<DashboardConfiguracoes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
