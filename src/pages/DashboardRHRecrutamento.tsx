import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Briefcase, Sparkles, AlertTriangle, Plus, Users, Linkedin, Clock, Trophy, Archive } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Vaga {
  id: number;
  titulo: string;
  departamento: string;
  descricao: string;
  status: "aberta" | "preenchida";
  criadaEm: Date;
  preenchidaEm?: Date;
  candidatos: Candidato[];
}

interface Candidato {
  id: number;
  nome: string;
  pontuacao: number;
  habilidades: string[];
  experiencia: string;
}

const DashboardRHRecrutamento = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { toast } = useToast();
  const [tituloVaga, setTituloVaga] = useState("");
  const [departamentoVaga, setDepartamentoVaga] = useState("");
  const [descricaoVaga, setDescricaoVaga] = useState("");
  const [linkedinIntegrado, setLinkedinIntegrado] = useState(false);
  const [vagaSelecionada, setVagaSelecionada] = useState<number | null>(null);
  
  const [vagas, setVagas] = useState<Vaga[]>([
    {
      id: 1,
      titulo: "Desenvolvedor Full Stack",
      departamento: "TI",
      descricao: "Desenvolvimento de aplicações web",
      status: "aberta",
      criadaEm: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      candidatos: [
        { id: 1, nome: "Carlos Mendes", pontuacao: 95, habilidades: ["React", "Node.js", "TypeScript"], experiencia: "5 anos" },
        { id: 2, nome: "Ana Paula", pontuacao: 88, habilidades: ["Vue", "Python", "Docker"], experiencia: "4 anos" },
        { id: 3, nome: "Roberto Lima", pontuacao: 82, habilidades: ["Angular", "Java", "AWS"], experiencia: "6 anos" },
      ]
    },
    {
      id: 2,
      titulo: "Designer UX/UI",
      departamento: "Design",
      descricao: "Design de interfaces e experiência do usuário",
      status: "aberta",
      criadaEm: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      candidatos: [
        { id: 4, nome: "Marina Costa", pontuacao: 92, habilidades: ["Figma", "Adobe XD", "Prototyping"], experiencia: "3 anos" },
        { id: 5, nome: "Felipe Santos", pontuacao: 85, habilidades: ["Sketch", "InVision", "User Research"], experiencia: "4 anos" },
      ]
    },
  ]);

  const [vagasHistorico] = useState<Vaga[]>([
    {
      id: 100,
      titulo: "Gerente de Projetos",
      departamento: "Gestão",
      descricao: "Gestão de projetos estratégicos",
      status: "preenchida",
      criadaEm: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      preenchidaEm: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      candidatos: []
    },
    {
      id: 101,
      titulo: "Analista de Dados",
      departamento: "BI",
      descricao: "Análise e visualização de dados",
      status: "preenchida",
      criadaEm: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      preenchidaEm: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000),
      candidatos: []
    },
  ]);

  const calcularTempoAberto = (criadaEm: Date, preenchidaEm?: Date) => {
    const fim = preenchidaEm || new Date();
    const diff = fim.getTime() - criadaEm.getTime();
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${dias}d ${horas}h`;
  };

  const integrarLinkedin = () => {
    setLinkedinIntegrado(true);
    toast({
      title: "✅ LinkedIn Integrado!",
      description: "Suas vagas agora serão sincronizadas com o LinkedIn.",
    });
  };

  const criarVaga = () => {
    if (!tituloVaga || !departamentoVaga || !descricaoVaga) {
      toast({
        title: "⚠️ Campos obrigatórios",
        description: "Preencha todos os campos para criar a vaga.",
        variant: "destructive",
      });
      return;
    }

    const novaVaga: Vaga = {
      id: Date.now(),
      titulo: tituloVaga,
      departamento: departamentoVaga,
      descricao: descricaoVaga,
      status: "aberta",
      criadaEm: new Date(),
      candidatos: []
    };

    setVagas([novaVaga, ...vagas]);
    setTituloVaga("");
    setDepartamentoVaga("");
    setDescricaoVaga("");
    
    toast({
      title: "✅ Vaga criada!",
      description: "A vaga foi publicada com sucesso.",
    });
  };

  const preencherVaga = (id: number) => {
    setVagas(vagas.map(v => 
      v.id === id 
        ? { ...v, status: "preenchida" as const, preenchidaEm: new Date() }
        : v
    ));
    toast({
      title: "✅ Vaga preenchida!",
      description: "O contador foi pausado.",
    });
  };

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
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Gestão de Talentos
                </h1>
                <p className="text-muted-foreground">Gerencie vagas, candidatos e integração com LinkedIn</p>
              </div>
              <Button 
                onClick={integrarLinkedin}
                variant={linkedinIntegrado ? "outline" : "default"}
                className="gap-2"
                disabled={linkedinIntegrado}
              >
                <Linkedin className="h-5 w-5" />
                {linkedinIntegrado ? "LinkedIn Integrado" : "Integrar LinkedIn"}
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Criar Nova Vaga */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  Criar Nova Vaga
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Título da Vaga</label>
                  <Input 
                    placeholder="Ex: Desenvolvedor Full Stack" 
                    value={tituloVaga}
                    onChange={(e) => setTituloVaga(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Departamento</label>
                  <Input 
                    placeholder="Ex: Tecnologia da Informação" 
                    value={departamentoVaga}
                    onChange={(e) => setDepartamentoVaga(e.target.value)}
                  />
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
                    rows={6}
                    value={descricaoVaga}
                    onChange={(e) => setDescricaoVaga(e.target.value)}
                  />
                </div>
                <Button className="w-full gap-2" onClick={criarVaga}>
                  <Plus className="h-4 w-4" />
                  Publicar Vaga
                </Button>
              </CardContent>
            </Card>

            {/* Vagas Ativas com Contador */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Vagas Criadas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {vagas.map((vaga) => (
                  <div key={vaga.id} className="p-4 rounded-lg border bg-card hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold">{vaga.titulo}</h3>
                        <p className="text-sm text-muted-foreground">{vaga.departamento}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            {calcularTempoAberto(vaga.criadaEm, vaga.preenchidaEm)}
                            {vaga.status === "preenchida" && " (pausado)"}
                          </span>
                        </div>
                      </div>
                      <Badge variant={vaga.status === "aberta" ? "default" : "secondary"}>
                        {vaga.status === "aberta" ? "Aberta" : "Preenchida"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-3 gap-2">
                      <span className="text-sm text-muted-foreground">
                        {vaga.candidatos.length} candidatos
                      </span>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setVagaSelecionada(vagaSelecionada === vaga.id ? null : vaga.id)}
                        >
                          Ver Leaderboard
                        </Button>
                        {vaga.status === "aberta" && (
                          <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={() => preencherVaga(vaga.id)}
                          >
                            Preencher
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard de Candidatos */}
          {vagaSelecionada && (
            <Card className="shadow-lg border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Leaderboard de Candidatos - {vagas.find(v => v.id === vagaSelecionada)?.titulo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Ranking</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Pontuação IA</TableHead>
                      <TableHead>Habilidades</TableHead>
                      <TableHead>Experiência</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vagas
                      .find(v => v.id === vagaSelecionada)
                      ?.candidatos.sort((a, b) => b.pontuacao - a.pontuacao)
                      .map((candidato, index) => (
                        <TableRow key={candidato.id}>
                          <TableCell className="font-bold">
                            {index === 0 && "🥇"}
                            {index === 1 && "🥈"}
                            {index === 2 && "🥉"}
                            {index > 2 && `#${index + 1}`}
                          </TableCell>
                          <TableCell className="font-medium">{candidato.nome}</TableCell>
                          <TableCell>
                            <Badge variant={candidato.pontuacao >= 90 ? "default" : "secondary"}>
                              {candidato.pontuacao}/100
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {candidato.habilidades.map((hab, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {hab}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {candidato.experiencia}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Histórico de Vagas Antigas */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5 text-muted-foreground" />
                Histórico de Vagas Preenchidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {vagasHistorico.map((vaga) => (
                  <div key={vaga.id} className="p-4 rounded-lg border bg-muted/30">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-muted-foreground">{vaga.titulo}</h3>
                        <p className="text-sm text-muted-foreground">{vaga.departamento}</p>
                      </div>
                      <Badge variant="secondary">Preenchida</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <span>Tempo total: {calcularTempoAberto(vaga.criadaEm, vaga.preenchidaEm)}</span>
                      <span>•</span>
                      <span>Preenchida em: {vaga.preenchidaEm?.toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardRHRecrutamento;
