import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Briefcase, Sparkles, AlertTriangle, Plus, Users } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const DashboardRHRecrutamento = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { toast } = useToast();
  const [descricaoVaga, setDescricaoVaga] = useState("");

  const alertasIA = [
    {
      id: 1,
      colaborador: "João Silva",
      departamento: "TI",
      nivel: "alto",
      motivo: "Queda de 40% no engajamento nos últimos 2 meses. Participação em eventos caiu drasticamente.",
    },
    {
      id: 2,
      colaborador: "Maria Santos",
      departamento: "Marketing",
      nivel: "médio",
      motivo: "Baixa interação com colegas e ausência em 3 eventos consecutivos.",
    },
  ];

  const vagas = [
    { id: 1, titulo: "Desenvolvedor Full Stack", departamento: "TI", candidatos: 12, status: "aberta" },
    { id: 2, titulo: "Designer UX/UI", departamento: "Design", candidatos: 8, status: "aberta" },
    { id: 3, titulo: "Gerente de Projetos", departamento: "Gestão", candidatos: 15, status: "em-analise" },
  ];

  const gerarDescricaoIA = () => {
    const descricaoGerada = `Estamos em busca de um profissional talentoso e motivado para integrar nossa equipe dinâmica. 

Responsabilidades:
• Desenvolver e implementar soluções inovadoras
• Colaborar com equipes multidisciplinares
• Contribuir para o crescimento da empresa
• Participar ativamente de projetos estratégicos

Requisitos:
• Experiência comprovada na área
• Excelentes habilidades de comunicação
• Capacidade de trabalhar em equipe
• Proatividade e vontade de aprender

Oferecemos:
• Ambiente de trabalho colaborativo
• Oportunidades de crescimento profissional
• Benefícios competitivos
• Cultura de inovação e aprendizado contínuo`;

    setDescricaoVaga(descricaoGerada);
    toast({
      title: "✨ Descrição gerada!",
      description: "A IA criou uma descrição profissional para sua vaga.",
    });
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto p-6 space-y-8">
          {/* Header */}
          <div
            ref={headerRef}
            className={`transition-all duration-700 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Recrutamento e Alertas IA
            </h1>
            <p className="text-muted-foreground">Gerencie vagas e monitore o engajamento da equipe</p>
          </div>

          {/* Alertas de Turnover */}
          <Card className="border-orange-500/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                <AlertTriangle className="h-5 w-5" />
                Alertas de Predição de Turnover
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {alertasIA.map((alerta) => (
                <div
                  key={alerta.id}
                  className={`p-4 rounded-lg border-2 ${
                    alerta.nivel === "alto"
                      ? "bg-red-500/10 border-red-500/30"
                      : "bg-yellow-500/10 border-yellow-500/30"
                  } hover:shadow-md transition-all`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{alerta.colaborador}</h3>
                      <p className="text-sm text-muted-foreground">{alerta.departamento}</p>
                    </div>
                    <Badge
                      variant={alerta.nivel === "alto" ? "destructive" : "secondary"}
                      className={alerta.nivel === "alto" ? "" : "bg-yellow-500 text-white"}
                    >
                      Risco {alerta.nivel}
                    </Badge>
                  </div>
                  <div className="bg-background/50 p-3 rounded-md mb-3">
                    <p className="text-sm font-medium mb-1">📊 Análise da IA:</p>
                    <p className="text-sm text-muted-foreground">{alerta.motivo}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver Detalhes Completos
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Criar Nova Vaga */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Criar Nova Vaga
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Título da Vaga</label>
                  <Input placeholder="Ex: Desenvolvedor Full Stack" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Departamento</label>
                  <Input placeholder="Ex: Tecnologia da Informação" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Descrição da Vaga</label>
                    <Button variant="outline" size="sm" className="gap-2" onClick={gerarDescricaoIA}>
                      <Sparkles className="h-4 w-4" />
                      Sugestão da IA
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Descreva as responsabilidades, requisitos e benefícios..."
                    rows={8}
                    value={descricaoVaga}
                    onChange={(e) => setDescricaoVaga(e.target.value)}
                  />
                </div>
                <Button className="w-full gap-2">
                  <Plus className="h-4 w-4" />
                  Publicar Vaga
                </Button>
              </CardContent>
            </Card>

            {/* Vagas Ativas */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Vagas Ativas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {vagas.map((vaga) => (
                  <div key={vaga.id} className="p-4 rounded-lg border bg-card hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold">{vaga.titulo}</h3>
                        <p className="text-sm text-muted-foreground">{vaga.departamento}</p>
                      </div>
                      <Badge variant={vaga.status === "aberta" ? "default" : "secondary"}>
                        {vaga.status === "aberta" ? "Aberta" : "Em Análise"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-muted-foreground">{vaga.candidatos} candidatos</span>
                      <Button variant="outline" size="sm">
                        Ver Candidatos
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardRHRecrutamento;
