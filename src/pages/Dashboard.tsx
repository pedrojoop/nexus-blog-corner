import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Calendar, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Dashboard = () => {
  const feedSection = useScrollAnimation();
  const sidebarSection = useScrollAnimation();

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feed Principal */}
        <div ref={feedSection.ref} className="lg:col-span-2 space-y-6">
          {/* Create Post Card */}
          <Card className={`border-0 shadow-md transition-all duration-700 hover:shadow-lg ${feedSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar className="h-12 w-12 bg-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">PL</AvatarFallback>
                </Avatar>
                <Input 
                  placeholder="O que você gostaria de compartilhar?" 
                  className="flex-1 bg-accent/50 border-0 focus-visible:ring-primary/30 transition-all duration-300"
                />
              </div>
            </CardContent>
          </Card>

          {/* Example Posts */}
          {[
            {
              author: "Pedro Lima",
              role: "Super Admin",
              time: "3 dias",
              content: "Oi",
              likes: 1,
              comments: 0
            },
            {
              author: "João Santos",
              role: "Desenvolvedor",
              time: "1 semana",
              content: "Acabamos de lançar a nova funcionalidade de gestão de projetos! 🚀 Agora ficou ainda mais fácil acompanhar o progresso da equipe.",
              likes: 12,
              comments: 5
            }
          ].map((post, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{
                animation: feedSection.isVisible ? `slide-up 0.6s ease-out ${index * 0.1 + 0.1}s both` : 'none'
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-12 w-12 bg-primary">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{post.author}</h3>
                        <p className="text-sm text-muted-foreground">{post.role}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{post.time}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>
                
                <div className="flex items-center gap-6 pt-4 border-t border-border">
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Sidebar */}
        <div ref={sidebarSection.ref} className="space-y-6">
          {/* Online Now */}
          <Card className={`border-0 shadow-md transition-all duration-700 ${sidebarSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-nexus-accent" />
                <h3 className="font-semibold text-foreground">Online Agora</h3>
                <span className="ml-auto text-sm text-primary font-medium">1 pessoa</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                  <Avatar className="h-10 w-10 bg-primary">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">PL</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">Pedro Lima</p>
                    <p className="text-xs text-nexus-accent">Online</p>
                  </div>
                  <div className="w-2 h-2 bg-nexus-accent rounded-full animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Próximos Eventos */}
          <Card className="border-0 shadow-md transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-nexus-accent" />
                <h3 className="font-semibold text-foreground">Próximos Eventos</h3>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-accent/50 border border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center justify-center bg-primary text-primary-foreground rounded-lg w-12 h-12 flex-shrink-0">
                      <span className="text-lg font-bold">21</span>
                      <span className="text-xs">FEV</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-foreground mb-1">jkasdhnfoasjknao</h4>
                      <p className="text-xs text-muted-foreground">sábado às 17:00</p>
                      <p className="text-xs text-primary font-medium mt-1">1/50 participantes</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
