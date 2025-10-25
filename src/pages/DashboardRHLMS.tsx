import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  GraduationCap, Plus, BarChart3, Users, Clock, TrendingDown, Award, 
  PlayCircle, Edit, Trash2, FileText, CheckCircle, XCircle, TrendingUp 
} from "lucide-react";
import { toast } from "sonner";

interface Aula {
  id: string;
  titulo: string;
  duracao: string;
  tipo: "video" | "pdf" | "quiz";
}

interface Modulo {
  id: string;
  titulo: string;
  aulas: Aula[];
}

interface Curso {
  id: number;
  title: string;
  description: string;
  students: number;
  completion: number;
  abandonment: number;
  avgTime: string;
  status: "active" | "alert";
  categoria: string;
  nivel: string;
  modulos: Modulo[];
}

const DashboardRHLMS = () => {
  const [cursos, setCursos] = useState<Curso[]>([
    { 
      id: 1, 
      title: "Liderança Transformadora", 
      description: "Desenvolva habilidades de liderança moderna",
      students: 24, 
      completion: 75, 
      abandonment: 15, 
      avgTime: "8h",
      status: "active",
      categoria: "Liderança",
      nivel: "Intermediário",
      modulos: [
        {
          id: "m1",
          titulo: "Fundamentos da Liderança",
          aulas: [
            { id: "a1", titulo: "O que é Liderança?", duracao: "15 min", tipo: "video" },
            { id: "a2", titulo: "Estilos de Liderança", duracao: "20 min", tipo: "video" }
          ]
        }
      ]
    },
    { 
      id: 2, 
      title: "Comunicação Não-Violenta", 
      description: "Aprenda técnicas de comunicação empática",
      students: 18, 
      completion: 82, 
      abandonment: 8, 
      avgTime: "6h",
      status: "active",
      categoria: "Soft Skills",
      nivel: "Básico",
      modulos: []
    },
    { 
      id: 3, 
      title: "Gestão de Tempo", 
      description: "Otimize sua produtividade",
      students: 32, 
      completion: 45, 
      abandonment: 35, 
      avgTime: "4h",
      status: "alert",
      categoria: "Produtividade",
      nivel: "Básico",
      modulos: []
    }
  ]);

  const [cursoSelecionado, setCursoSelecionado] = useState<Curso | null>(null);
  
  // Estado para criação de curso
  const [novoCurso, setNovoCurso] = useState({
    title: "",
    description: "",
    categoria: "",
    nivel: "",
    duracao: ""
  });

  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [novoModulo, setNovoModulo] = useState({ titulo: "", aulas: [] as Aula[] });
  const [novaAula, setNovaAula] = useState({ titulo: "", duracao: "", tipo: "video" as "video" | "pdf" | "quiz" });

  const totalStudents = cursos.reduce((acc, c) => acc + c.students, 0);
  const avgCompletion = cursos.reduce((acc, c) => acc + c.completion, 0) / cursos.length;
  const avgAbandonment = cursos.reduce((acc, c) => acc + c.abandonment, 0) / cursos.length;

  const criarCurso = () => {
    if (!novoCurso.title || !novoCurso.description || !novoCurso.categoria || !novoCurso.nivel) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const curso: Curso = {
      id: cursos.length + 1,
      title: novoCurso.title,
      description: novoCurso.description,
      categoria: novoCurso.categoria,
      nivel: novoCurso.nivel,
      avgTime: novoCurso.duracao,
      students: 0,
      completion: 0,
      abandonment: 0,
      status: "active",
      modulos: modulos
    };

    setCursos([...cursos, curso]);
    setNovoCurso({ title: "", description: "", categoria: "", nivel: "", duracao: "" });
    setModulos([]);
    toast.success("Curso criado com sucesso!");
  };

  const adicionarAulaAoModulo = () => {
    if (!novaAula.titulo || !novaAula.duracao) {
      toast.error("Preencha todos os campos da aula");
      return;
    }

    const aula: Aula = {
      id: `a${Date.now()}`,
      titulo: novaAula.titulo,
      duracao: novaAula.duracao,
      tipo: novaAula.tipo
    };

    setNovoModulo({
      ...novoModulo,
      aulas: [...novoModulo.aulas, aula]
    });

    setNovaAula({ titulo: "", duracao: "", tipo: "video" });
    toast.success("Aula adicionada ao módulo");
  };

  const adicionarModulo = () => {
    if (!novoModulo.titulo || novoModulo.aulas.length === 0) {
      toast.error("O módulo precisa de título e pelo menos uma aula");
      return;
    }

    const modulo: Modulo = {
      id: `m${Date.now()}`,
      titulo: novoModulo.titulo,
      aulas: novoModulo.aulas
    };

    setModulos([...modulos, modulo]);
    setNovoModulo({ titulo: "", aulas: [] });
    toast.success("Módulo adicionado ao curso");
  };

  const excluirCurso = (id: number) => {
    setCursos(cursos.filter(c => c.id !== id));
    toast.success("Curso excluído com sucesso");
  };

  const editarCurso = (curso: Curso) => {
    setCursoSelecionado(curso);
    toast.info("Editando curso");
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto p-6 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Treinamentos (LMS)
              </h1>
              <p className="text-muted-foreground">Sistema de Gestão de Aprendizagem</p>
            </div>
          </div>

          <Tabs defaultValue="visao-geral" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
              <TabsTrigger value="criar">Criar Curso</TabsTrigger>
              <TabsTrigger value="gerenciar">Gerenciar Cursos</TabsTrigger>
              <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
            </TabsList>

            {/* VISÃO GERAL */}
            <TabsContent value="visao-geral" className="space-y-6">
              {/* Métricas Principais */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="hover:shadow-lg transition-all">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total de Alunos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-3xl font-bold text-primary">{totalStudents}</p>
                      <Users className="h-8 w-8 text-primary/40" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Conclusão Média</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-3xl font-bold text-green-600">{avgCompletion.toFixed(0)}%</p>
                      <Award className="h-8 w-8 text-green-600/40" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all border-red-200 bg-red-50/50 dark:bg-red-950/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-red-600 dark:text-red-400">
                      Taxa de Abandono Média
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-3xl font-bold text-red-600 dark:text-red-400">{avgAbandonment.toFixed(0)}%</p>
                      <TrendingDown className="h-8 w-8 text-red-600/40" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Cursos Ativos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-3xl font-bold text-primary">{cursos.length}</p>
                      <GraduationCap className="h-8 w-8 text-primary/40" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Alerta Principal */}
              {cursos.some(c => c.status === "alert") && (
                <Card className="border-red-500/50 bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                      <TrendingDown className="h-6 w-6" />
                      Alerta: Alta Taxa de Abandono Detectada
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      A IA identificou cursos com taxa de abandono crítica. Recomendamos revisar o conteúdo e estratégia de engajamento.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Cursos Recentes */}
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  Cursos Disponíveis
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {cursos.slice(0, 4).map((curso) => (
                    <Card 
                      key={curso.id} 
                      className={`hover:shadow-lg transition-all hover:-translate-y-1 ${
                        curso.status === 'alert' ? 'border-red-300 bg-red-50/30 dark:bg-red-950/10' : ''
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{curso.title}</CardTitle>
                            <CardDescription>{curso.description}</CardDescription>
                          </div>
                          {curso.status === 'alert' && (
                            <Badge variant="destructive" className="gap-1">
                              <TrendingDown className="h-3 w-3" />
                              Atenção
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="space-y-1">
                            <p className="text-muted-foreground">Alunos</p>
                            <p className="font-semibold flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {curso.students}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-muted-foreground">Conclusão</p>
                            <p className="font-semibold text-green-600">{curso.completion}%</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-muted-foreground">Abandono</p>
                            <p className={`font-semibold ${curso.abandonment > 20 ? 'text-red-600' : 'text-muted-foreground'}`}>
                              {curso.abandonment}%
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Progresso Médio</span>
                            <span className="font-medium">{curso.completion}%</span>
                          </div>
                          <Progress value={curso.completion} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* CRIAR CURSO */}
            <TabsContent value="criar" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Básicas do Curso</CardTitle>
                  <CardDescription>Defina as informações principais do curso</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="titulo">Título do Curso *</Label>
                      <Input
                        id="titulo"
                        placeholder="Ex: Liderança Transformadora"
                        value={novoCurso.title}
                        onChange={(e) => setNovoCurso({ ...novoCurso, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duracao">Duração Estimada *</Label>
                      <Input
                        id="duracao"
                        placeholder="Ex: 8 horas"
                        value={novoCurso.duracao}
                        onChange={(e) => setNovoCurso({ ...novoCurso, duracao: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição do Curso *</Label>
                    <Textarea
                      id="descricao"
                      placeholder="Descreva os objetivos e conteúdo do curso"
                      value={novoCurso.description}
                      onChange={(e) => setNovoCurso({ ...novoCurso, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="categoria">Categoria *</Label>
                      <Select value={novoCurso.categoria} onValueChange={(v) => setNovoCurso({ ...novoCurso, categoria: v })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Liderança">Liderança</SelectItem>
                          <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                          <SelectItem value="Produtividade">Produtividade</SelectItem>
                          <SelectItem value="Técnico">Técnico</SelectItem>
                          <SelectItem value="Compliance">Compliance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nivel">Nível *</Label>
                      <Select value={novoCurso.nivel} onValueChange={(v) => setNovoCurso({ ...novoCurso, nivel: v })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o nível" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Básico">Básico</SelectItem>
                          <SelectItem value="Intermediário">Intermediário</SelectItem>
                          <SelectItem value="Avançado">Avançado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Adicionar Módulos */}
              <Card>
                <CardHeader>
                  <CardTitle>Módulos e Aulas</CardTitle>
                  <CardDescription>Estruture o conteúdo do curso em módulos e aulas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Formulário de Nova Aula */}
                  <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                    <h3 className="font-semibold">Adicionar Aula ao Módulo Atual</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="titulo-aula">Título da Aula</Label>
                        <Input
                          id="titulo-aula"
                          placeholder="Ex: Introdução à Liderança"
                          value={novaAula.titulo}
                          onChange={(e) => setNovaAula({ ...novaAula, titulo: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duracao-aula">Duração</Label>
                        <Input
                          id="duracao-aula"
                          placeholder="Ex: 15 min"
                          value={novaAula.duracao}
                          onChange={(e) => setNovaAula({ ...novaAula, duracao: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tipo-aula">Tipo</Label>
                        <Select value={novaAula.tipo} onValueChange={(v: any) => setNovaAula({ ...novaAula, tipo: v })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="video">Vídeo</SelectItem>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="quiz">Quiz</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button onClick={adicionarAulaAoModulo} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Aula
                    </Button>
                  </div>

                  {/* Módulo Atual */}
                  {novoModulo.aulas.length > 0 && (
                    <div className="space-y-4 p-4 border rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="titulo-modulo">Título do Módulo</Label>
                        <Input
                          id="titulo-modulo"
                          placeholder="Ex: Fundamentos da Liderança"
                          value={novoModulo.titulo}
                          onChange={(e) => setNovoModulo({ ...novoModulo, titulo: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Aulas neste módulo:</p>
                        {novoModulo.aulas.map((aula, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm p-2 bg-muted rounded">
                            <PlayCircle className="h-4 w-4" />
                            <span className="flex-1">{aula.titulo}</span>
                            <Badge variant="outline">{aula.tipo}</Badge>
                            <span className="text-muted-foreground">{aula.duracao}</span>
                          </div>
                        ))}
                      </div>
                      <Button onClick={adicionarModulo} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Finalizar e Adicionar Módulo ao Curso
                      </Button>
                    </div>
                  )}

                  {/* Módulos Adicionados */}
                  {modulos.length > 0 && (
                    <div className="space-y-2">
                      <p className="font-semibold">Módulos do Curso ({modulos.length})</p>
                      {modulos.map((modulo, idx) => (
                        <Card key={idx}>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              {modulo.titulo}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">{modulo.aulas.length} aulas</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button onClick={criarCurso} size="lg" className="w-full">
                <GraduationCap className="h-5 w-5 mr-2" />
                Criar Curso Completo
              </Button>
            </TabsContent>

            {/* GERENCIAR CURSOS */}
            <TabsContent value="gerenciar" className="space-y-6">
              <div className="space-y-4">
                {cursos.map((curso) => (
                  <Card key={curso.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle>{curso.title}</CardTitle>
                          <CardDescription>{curso.description}</CardDescription>
                          <div className="flex gap-2 mt-2">
                            <Badge>{curso.categoria}</Badge>
                            <Badge variant="outline">{curso.nivel}</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => editarCurso(curso)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => excluirCurso(curso.id)}>
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-4 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Alunos Inscritos</p>
                          <p className="text-2xl font-bold">{curso.students}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Taxa de Conclusão</p>
                          <p className="text-2xl font-bold text-green-600">{curso.completion}%</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Taxa de Abandono</p>
                          <p className="text-2xl font-bold text-red-600">{curso.abandonment}%</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Módulos</p>
                          <p className="text-2xl font-bold">{curso.modulos.length}</p>
                        </div>
                      </div>

                      {curso.modulos.length > 0 && (
                        <div className="space-y-2">
                          <p className="font-semibold text-sm">Estrutura do Curso:</p>
                          {curso.modulos.map((modulo) => (
                            <div key={modulo.id} className="p-3 bg-muted rounded-lg">
                              <p className="font-medium text-sm">{modulo.titulo}</p>
                              <p className="text-xs text-muted-foreground">{modulo.aulas.length} aulas</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* RELATÓRIOS */}
            <TabsContent value="relatorios" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Desempenho Geral</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Conclusão Média</span>
                        <span className="font-bold text-green-600">{avgCompletion.toFixed(0)}%</span>
                      </div>
                      <Progress value={avgCompletion} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Abandono Médio</span>
                        <span className="font-bold text-red-600">{avgAbandonment.toFixed(0)}%</span>
                      </div>
                      <Progress value={avgAbandonment} className="h-2 bg-red-100" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Engajamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Cursos Saudáveis</span>
                        </div>
                        <span className="font-bold">{cursos.filter(c => c.status === "active").length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">Necessitam Atenção</span>
                        </div>
                        <span className="font-bold">{cursos.filter(c => c.status === "alert").length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Alcance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-3xl font-bold">{totalStudents}</p>
                        <p className="text-sm text-muted-foreground">Total de Alunos</p>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm font-medium">+12% este mês</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Ranking de Cursos */}
              <Card>
                <CardHeader>
                  <CardTitle>Ranking de Cursos por Conclusão</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...cursos].sort((a, b) => b.completion - a.completion).map((curso, idx) => (
                      <div key={curso.id} className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          idx === 0 ? 'bg-yellow-500 text-white' :
                          idx === 1 ? 'bg-gray-400 text-white' :
                          idx === 2 ? 'bg-orange-600 text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{curso.title}</p>
                          <Progress value={curso.completion} className="h-2 mt-1" />
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">{curso.completion}%</p>
                          <p className="text-xs text-muted-foreground">{curso.students} alunos</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Cursos que Precisam de Atenção */}
              {cursos.some(c => c.abandonment > 20) && (
                <Card className="border-red-300">
                  <CardHeader>
                    <CardTitle className="text-red-600">Cursos que Necessitam Atenção</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {cursos.filter(c => c.abandonment > 20).map((curso) => (
                        <div key={curso.id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                          <div>
                            <p className="font-medium">{curso.title}</p>
                            <p className="text-sm text-muted-foreground">Taxa de abandono: {curso.abandonment}%</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardRHLMS;