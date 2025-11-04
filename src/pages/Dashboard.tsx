import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, Calendar, Users, Image, FileText, Trophy, Smile, ThumbsUp, PartyPopper, Sparkles, Send, Pin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";

const Dashboard = () => {
  const feedSection = useScrollAnimation();
  const sidebarSection = useScrollAnimation();
  const [postContent, setPostContent] = useState("");
  const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({});
  const [commentText, setCommentText] = useState<{ [key: number]: string }>({});

  const reactions = [
    { icon: ThumbsUp, label: "Apoio", color: "text-blue-500" },
    { icon: Heart, label: "Gostei", color: "text-red-500" },
    { icon: PartyPopper, label: "Parabéns", color: "text-yellow-500" },
    { icon: Sparkles, label: "Inspirador", color: "text-purple-500" },
  ];

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feed Principal */}
        <div ref={feedSection.ref} className="lg:col-span-2 space-y-6">
          {/* Posts Fixados */}
          <Card className={`border-0 shadow-md transition-all duration-700 bg-primary/5 border-l-4 border-l-primary ${feedSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Pin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-primary text-primary-foreground">
                      Anúncio Fixado
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Bem-vindo à Nexus Community! 🚀</h3>
                  <p className="text-muted-foreground text-sm">
                    Este é o seu centro de comunicação e colaboração. Compartilhe conquistas, inicie discussões e conecte-se com toda a equipe!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Create Post Card */}
          <Card className={`border-0 shadow-md transition-all duration-700 hover:shadow-lg ${feedSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <CardContent className="p-6">
              <div className="flex gap-4 mb-4">
                <Avatar className="h-12 w-12 bg-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">PL</AvatarFallback>
                </Avatar>
                <Textarea 
                  placeholder="O que você gostaria de compartilhar?" 
                  className="flex-1 bg-accent/50 border-0 focus-visible:ring-primary/30 transition-all duration-300 min-h-[80px] resize-none"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
              </div>
              <Separator className="mb-4" />
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                    <Image className="h-4 w-4" />
                    <span className="hidden sm:inline">Foto/Vídeo</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                    <Calendar className="h-4 w-4" />
                    <span className="hidden sm:inline">Evento</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Documento</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                    <Trophy className="h-4 w-4" />
                    <span className="hidden sm:inline">Reconhecimento</span>
                  </Button>
                </div>
                <Button className="gap-2">
                  <Send className="h-4 w-4" />
                  Publicar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Example Posts */}
          {[
            {
              author: "Pedro Lima",
              role: "Super Admin",
              time: "há 3 dias",
              content: "Parabéns à equipe de Marketing pela campanha incrível! Os resultados superaram todas as expectativas. Continue assim! 🎉",
              reactions: { apoio: 8, gostei: 15, parabens: 12, inspirador: 5 },
              comments: [
                { author: "Maria Silva", role: "Marketing", content: "Obrigada pelo reconhecimento! Foi um trabalho em equipe incrível." },
                { author: "Carlos Mendes", role: "Diretor", content: "Muito orgulhoso do time! 💪" }
              ],
              hasImage: true
            },
            {
              author: "João Santos",
              role: "Desenvolvedor",
              time: "há 1 semana",
              content: "Acabamos de lançar a nova funcionalidade de gestão de projetos! 🚀 Agora ficou ainda mais fácil acompanhar o progresso da equipe. Confira o documento completo com todas as novidades.",
              reactions: { apoio: 18, gostei: 25, parabens: 8, inspirador: 12 },
              comments: [
                { author: "Ana Costa", role: "Product Owner", content: "Excelente trabalho! A interface ficou muito intuitiva." },
                { author: "Rafael Torres", role: "Designer", content: "Adorei a experiência do usuário!" },
                { author: "Juliana Lima", role: "QA", content: "Testei tudo e está funcionando perfeitamente! 👏" }
              ],
              isDocument: true
            }
          ].map((post, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{
                animation: feedSection.isVisible ? `slide-up 0.6s ease-out ${index * 0.1 + 0.3}s both` : 'none'
              }}
            >
              <CardContent className="p-6">
                {/* Header do Post */}
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-14 w-14 bg-primary ring-2 ring-primary/20">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-lg">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{post.author}</h3>
                        <p className="text-sm text-muted-foreground">{post.role} • {post.time}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Conteúdo do Post */}
                <p className="text-foreground mb-4 leading-relaxed text-base">{post.content}</p>
                
                {/* Preview Visual - Documento */}
                {post.isDocument && (
                  <div className="mb-4 p-4 bg-accent/50 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Nova Funcionalidade - Gestão de Projetos</h4>
                        <p className="text-sm text-muted-foreground">Documento completo com todas as features e guia de uso</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Preview Visual - Imagem */}
                {post.hasImage && (
                  <div className="mb-4 rounded-lg overflow-hidden bg-accent/30 h-64 flex items-center justify-center border border-border">
                    <div className="text-center text-muted-foreground">
                      <Image className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Imagem da campanha</p>
                    </div>
                  </div>
                )}
                
                <Separator className="my-4" />

                {/* Reações */}
                <div className="flex items-center gap-2 mb-4">
                  {reactions.map((reaction, idx) => {
                    const count = post.reactions[reaction.label.toLowerCase() as keyof typeof post.reactions] || 0;
                    if (count === 0) return null;
                    return (
                      <Badge key={idx} variant="secondary" className="gap-1 px-2 py-1 hover:bg-accent cursor-pointer transition-colors">
                        <reaction.icon className={`h-3 w-3 ${reaction.color}`} />
                        <span className="text-xs">{count}</span>
                      </Badge>
                    );
                  })}
                </div>

                {/* Botões de Ação */}
                <div className="flex items-center gap-2 pb-4">
                  {reactions.map((reaction, idx) => (
                    <Button 
                      key={idx}
                      variant="ghost" 
                      size="sm" 
                      className="gap-2 text-muted-foreground hover:text-primary transition-colors flex-1"
                    >
                      <reaction.icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{reaction.label}</span>
                    </Button>
                  ))}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2 text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setShowComments({ ...showComments, [index]: !showComments[index] })}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments.length}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Seção de Comentários */}
                {showComments[index] && (
                  <>
                    <Separator className="mb-4" />
                    <div className="space-y-4">
                      {post.comments.map((comment, commentIdx) => (
                        <div key={commentIdx} className="flex gap-3 pl-4 border-l-2 border-primary/20">
                          <Avatar className="h-8 w-8 bg-primary/70 flex-shrink-0">
                            <AvatarFallback className="bg-primary/70 text-primary-foreground text-xs">
                              {comment.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-accent/50 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm text-foreground">{comment.author}</span>
                                <span className="text-xs text-muted-foreground">• {comment.role}</span>
                              </div>
                              <p className="text-sm text-foreground">{comment.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Campo de Novo Comentário */}
                      <div className="flex gap-3 pl-4">
                        <Avatar className="h-8 w-8 bg-primary flex-shrink-0">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">PL</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex gap-2">
                          <Input 
                            placeholder="Escreva um comentário..."
                            className="flex-1 bg-accent/50 border-0"
                            value={commentText[index] || ""}
                            onChange={(e) => setCommentText({ ...commentText, [index]: e.target.value })}
                          />
                          <Button size="sm" className="gap-2">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Sidebar */}
        <div ref={sidebarSection.ref} className="space-y-6">
          {/* Eventos em Destaque */}
          <Card className={`border-0 shadow-md transition-all duration-700 ${sidebarSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Próximos Eventos</h3>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer group">
                  <div className="flex gap-3 mb-3">
                    <div className="flex flex-col items-center justify-center bg-primary text-primary-foreground rounded-lg w-14 h-14 flex-shrink-0 shadow-sm">
                      <span className="text-xl font-bold">15</span>
                      <span className="text-xs uppercase">Mar</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-foreground mb-1 group-hover:text-primary transition-colors">Happy Hour da Equipe</h4>
                      <p className="text-xs text-muted-foreground">Sexta-feira às 18:00</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Users className="h-3 w-3 text-primary" />
                        <p className="text-xs text-primary font-medium">23/50 confirmados</p>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="w-full gap-2" variant="default">
                    <PartyPopper className="h-3 w-3" />
                    Confirmar Presença
                  </Button>
                </div>

                <div className="p-3 rounded-lg bg-accent/50 border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center justify-center bg-muted text-muted-foreground rounded-lg w-12 h-12 flex-shrink-0">
                      <span className="text-lg font-bold">22</span>
                      <span className="text-xs">Mar</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-foreground mb-1">Workshop de Inovação</h4>
                      <p className="text-xs text-muted-foreground">Segunda às 14:00</p>
                      <p className="text-xs text-muted-foreground mt-1">8/30 confirmados</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Termômetro de Engajamento */}
          <Card className="border-0 shadow-md transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-primary/5 to-background">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Seu Progresso</h3>
              </div>
              
              <div className="space-y-4">
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border-4 border-primary/30 mb-3">
                    <span className="text-2xl font-bold text-primary">7</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">Nível 7 - Colaborador Ativo</p>
                  <p className="text-xs text-muted-foreground mt-1">Faltam 230 XP para o Nível 8</p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Ritual Semanal</span>
                    <span className="font-medium text-primary">3/5 dias</span>
                  </div>
                  <div className="w-full bg-accent rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>

                <Button variant="outline" className="w-full gap-2" size="sm">
                  <Sparkles className="h-4 w-4" />
                  Ver Missões
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Online Now */}
          <Card className="border-0 shadow-md transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Online Agora</h3>
                <span className="ml-auto text-sm text-primary font-medium">5 pessoas</span>
              </div>
              
              <div className="space-y-2">
                {[
                  { name: "Pedro Lima", role: "Super Admin" },
                  { name: "Maria Silva", role: "Marketing" },
                  { name: "João Santos", role: "Desenvolvedor" },
                  { name: "Ana Costa", role: "Product Owner" },
                  { name: "Carlos Mendes", role: "Diretor" },
                ].map((user, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                    <Avatar className="h-9 w-9 bg-primary ring-2 ring-primary/20">
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-xs">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.role}</p>
                    </div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse flex-shrink-0"></div>
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

export default Dashboard;
