import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, Users, Award, PlayCircle, FileText, CheckCircle, Lock } from "lucide-react";
import { toast } from "sonner";

interface Material {
  id: string;
  tipo: "video" | "pdf" | "artigo";
  titulo: string;
  duracao?: string;
  concluido: boolean;
}

interface Aula {
  id: string;
  titulo: string;
  duracao: string;
  materiais: Material[];
  concluida: boolean;
  bloqueada: boolean;
}

interface Modulo {
  id: string;
  titulo: string;
  descricao: string;
  aulas: Aula[];
  progresso: number;
}

interface Curso {
  id: string;
  titulo: string;
  descricao: string;
  instrutor: string;
  duracao: string;
  alunos: number;
  categoria: string;
  nivel: "Básico" | "Intermediário" | "Avançado";
  capa: string;
  inscrito: boolean;
  progresso: number;
  modulos: Modulo[];
}

const DashboardTreinamento = () => {
  const [cursos, setCursos] = useState<Curso[]>([
    {
      id: "1",
      titulo: "Liderança e Gestão de Equipes",
      descricao: "Aprenda técnicas modernas de liderança e como construir equipes de alto desempenho",
      instrutor: "Ana Silva",
      duracao: "8 horas",
      alunos: 234,
      categoria: "Liderança",
      nivel: "Intermediário",
      capa: "🎯",
      inscrito: true,
      progresso: 45,
      modulos: [
        {
          id: "m1",
          titulo: "Fundamentos da Liderança",
          descricao: "Conceitos básicos e princípios de liderança",
          progresso: 100,
          aulas: [
            {
              id: "a1",
              titulo: "O que é Liderança?",
              duracao: "15 min",
              concluida: true,
              bloqueada: false,
              materiais: [
                { id: "mat1", tipo: "video", titulo: "Vídeo: Introdução à Liderança", duracao: "15 min", concluido: true },
                { id: "mat2", tipo: "pdf", titulo: "E-book: Princípios de Liderança", concluido: true }
              ]
            },
            {
              id: "a2",
              titulo: "Estilos de Liderança",
              duracao: "20 min",
              concluida: true,
              bloqueada: false,
              materiais: [
                { id: "mat3", tipo: "video", titulo: "Vídeo: Tipos de Líder", duracao: "20 min", concluido: true },
                { id: "mat4", tipo: "artigo", titulo: "Artigo: Liderança Situacional", concluido: true }
              ]
            }
          ]
        },
        {
          id: "m2",
          titulo: "Comunicação Eficaz",
          descricao: "Como se comunicar com sua equipe",
          progresso: 50,
          aulas: [
            {
              id: "a3",
              titulo: "Comunicação Assertiva",
              duracao: "18 min",
              concluida: true,
              bloqueada: false,
              materiais: [
                { id: "mat5", tipo: "video", titulo: "Vídeo: Técnicas de Comunicação", duracao: "18 min", concluido: true }
              ]
            },
            {
              id: "a4",
              titulo: "Feedback Construtivo",
              duracao: "22 min",
              concluida: false,
              bloqueada: false,
              materiais: [
                { id: "mat6", tipo: "video", titulo: "Vídeo: Como dar Feedback", duracao: "22 min", concluido: false },
                { id: "mat7", tipo: "pdf", titulo: "Template de Feedback", concluido: false }
              ]
            }
          ]
        },
        {
          id: "m3",
          titulo: "Gestão de Conflitos",
          descricao: "Resolvendo problemas na equipe",
          progresso: 0,
          aulas: [
            {
              id: "a5",
              titulo: "Identificando Conflitos",
              duracao: "16 min",
              concluida: false,
              bloqueada: false,
              materiais: [
                { id: "mat8", tipo: "video", titulo: "Vídeo: Tipos de Conflito", duracao: "16 min", concluido: false }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "2",
      titulo: "Excel Avançado para Negócios",
      descricao: "Domine fórmulas, tabelas dinâmicas e análise de dados",
      instrutor: "Carlos Mendes",
      duracao: "12 horas",
      alunos: 456,
      categoria: "Produtividade",
      nivel: "Avançado",
      capa: "📊",
      inscrito: false,
      progresso: 0,
      modulos: []
    },
    {
      id: "3",
      titulo: "Gestão do Tempo e Produtividade",
      descricao: "Técnicas para otimizar seu tempo e aumentar produtividade",
      instrutor: "Marina Costa",
      duracao: "6 horas",
      alunos: 789,
      categoria: "Desenvolvimento Pessoal",
      nivel: "Básico",
      capa: "⏰",
      inscrito: true,
      progresso: 10,
      modulos: []
    },
    {
      id: "4",
      titulo: "Inteligência Emocional no Trabalho",
      descricao: "Desenvolva sua IE para melhorar relacionamentos profissionais",
      instrutor: "Roberto Alves",
      duracao: "10 horas",
      alunos: 567,
      categoria: "Soft Skills",
      nivel: "Intermediário",
      capa: "🧠",
      inscrito: false,
      progresso: 0,
      modulos: []
    }
  ]);

  const [cursoSelecionado, setCursoSelecionado] = useState<Curso | null>(null);
  const [moduloSelecionado, setModuloSelecionado] = useState<Modulo | null>(null);
  const [aulaSelecionada, setAulaSelecionada] = useState<Aula | null>(null);

  const inscreverCurso = (cursoId: string) => {
    setCursos(cursos.map(c => 
      c.id === cursoId ? { ...c, inscrito: true } : c
    ));
    toast.success("Inscrição realizada com sucesso!");
  };

  const concluirMaterial = (materialId: string) => {
    if (!cursoSelecionado || !moduloSelecionado || !aulaSelecionada) return;

    const materialIndex = aulaSelecionada.materiais.findIndex(m => m.id === materialId);
    if (materialIndex === -1) return;

    const materiaisAtualizados = [...aulaSelecionada.materiais];
    materiaisAtualizados[materialIndex] = { ...materiaisAtualizados[materialIndex], concluido: true };

    const todosMateriaisConcluidos = materiaisAtualizados.every(m => m.concluido);

    setAulaSelecionada({ ...aulaSelecionada, materiais: materiaisAtualizados, concluida: todosMateriaisConcluidos });
    
    toast.success("Material concluído!");
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case "Básico": return "bg-green-500";
      case "Intermediário": return "bg-yellow-500";
      case "Avançado": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const cursosInscritos = cursos.filter(c => c.inscrito);
  const cursosDisponiveis = cursos.filter(c => !c.inscrito);

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Treinamento e Desenvolvimento</h1>
            <p className="text-muted-foreground">Desenvolva suas habilidades profissionais</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Award className="h-4 w-4" />
            Meus Certificados
          </Button>
        </div>

        {!cursoSelecionado ? (
          <Tabs defaultValue="meus-cursos">
            <TabsList>
              <TabsTrigger value="meus-cursos">Meus Cursos</TabsTrigger>
              <TabsTrigger value="disponiveis">Cursos Disponíveis</TabsTrigger>
            </TabsList>

            <TabsContent value="meus-cursos" className="space-y-4">
              {cursosInscritos.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Você ainda não está inscrito em nenhum curso</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {cursosInscritos.map((curso) => (
                    <Card key={curso.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="text-4xl mb-2">{curso.capa}</div>
                          <Badge className={getNivelColor(curso.nivel)}>{curso.nivel}</Badge>
                        </div>
                        <CardTitle className="text-lg">{curso.titulo}</CardTitle>
                        <CardDescription className="line-clamp-2">{curso.descricao}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {curso.duracao}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {curso.alunos}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progresso</span>
                            <span className="font-medium">{curso.progresso}%</span>
                          </div>
                          <Progress value={curso.progresso} />
                        </div>
                        <Button className="w-full" onClick={() => setCursoSelecionado(curso)}>
                          Continuar Curso
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="disponiveis" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cursosDisponiveis.map((curso) => (
                  <Card key={curso.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="text-4xl mb-2">{curso.capa}</div>
                        <Badge className={getNivelColor(curso.nivel)}>{curso.nivel}</Badge>
                      </div>
                      <CardTitle className="text-lg">{curso.titulo}</CardTitle>
                      <CardDescription className="line-clamp-2">{curso.descricao}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Instrutor</span>
                          <span className="font-medium">{curso.instrutor}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {curso.duracao}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {curso.alunos} alunos
                          </div>
                        </div>
                      </div>
                      <Button className="w-full" onClick={() => inscreverCurso(curso.id)}>
                        Inscrever-se
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        ) : !moduloSelecionado ? (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setCursoSelecionado(null)}>
              ← Voltar aos cursos
            </Button>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="text-4xl">{cursoSelecionado.capa}</div>
                    <CardTitle className="text-2xl">{cursoSelecionado.titulo}</CardTitle>
                    <CardDescription>{cursoSelecionado.descricao}</CardDescription>
                  </div>
                  <Badge className={getNivelColor(cursoSelecionado.nivel)}>{cursoSelecionado.nivel}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>Instrutor: {cursoSelecionado.instrutor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{cursoSelecionado.duracao}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{cursoSelecionado.alunos} alunos</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Seu Progresso</span>
                    <span className="text-sm font-medium">{cursoSelecionado.progresso}%</span>
                  </div>
                  <Progress value={cursoSelecionado.progresso} />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Módulos do Curso</h2>
              {cursoSelecionado.modulos.map((modulo, index) => (
                <Card key={modulo.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">
                          Módulo {index + 1}: {modulo.titulo}
                        </CardTitle>
                        <CardDescription>{modulo.descricao}</CardDescription>
                      </div>
                      <Button onClick={() => setModuloSelecionado(modulo)}>
                        {modulo.progresso === 100 ? "Revisar" : "Continuar"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{modulo.aulas.length} aulas</span>
                        <span className="font-medium">{modulo.progresso}% concluído</span>
                      </div>
                      <Progress value={modulo.progresso} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : !aulaSelecionada ? (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setModuloSelecionado(null)}>
              ← Voltar aos módulos
            </Button>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{moduloSelecionado.titulo}</CardTitle>
                <CardDescription>{moduloSelecionado.descricao}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progresso do Módulo</span>
                    <span className="text-sm font-medium">{moduloSelecionado.progresso}%</span>
                  </div>
                  <Progress value={moduloSelecionado.progresso} />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Aulas</h2>
              {moduloSelecionado.aulas.map((aula, index) => (
                <Card key={aula.id} className={aula.bloqueada ? "opacity-60" : "hover:shadow-md transition-shadow"}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {aula.concluida ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                        ) : aula.bloqueada ? (
                          <Lock className="h-5 w-5 text-muted-foreground mt-1" />
                        ) : (
                          <PlayCircle className="h-5 w-5 text-primary mt-1" />
                        )}
                        <div className="flex-1">
                          <CardTitle className="text-lg">
                            Aula {index + 1}: {aula.titulo}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Clock className="h-3 w-3" />
                            {aula.duracao}
                          </CardDescription>
                        </div>
                      </div>
                      <Button 
                        onClick={() => setAulaSelecionada(aula)}
                        disabled={aula.bloqueada}
                      >
                        {aula.concluida ? "Revisar" : "Iniciar"}
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setAulaSelecionada(null)}>
              ← Voltar às aulas
            </Button>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{aulaSelecionada.titulo}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {aulaSelecionada.duracao}
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Materiais da Aula</h2>
              {aulaSelecionada.materiais.map((material) => (
                <Card key={material.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {material.tipo === "video" && <PlayCircle className="h-5 w-5 text-primary mt-1" />}
                        {material.tipo === "pdf" && <FileText className="h-5 w-5 text-primary mt-1" />}
                        {material.tipo === "artigo" && <BookOpen className="h-5 w-5 text-primary mt-1" />}
                        <div className="flex-1">
                          <CardTitle className="text-lg">{material.titulo}</CardTitle>
                          {material.duracao && (
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <Clock className="h-3 w-3" />
                              {material.duracao}
                            </CardDescription>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {material.concluido && <CheckCircle className="h-5 w-5 text-green-500" />}
                        <Button 
                          variant={material.concluido ? "outline" : "default"}
                          onClick={() => concluirMaterial(material.id)}
                        >
                          {material.concluido ? "Concluído" : "Marcar como Concluído"}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardTreinamento;