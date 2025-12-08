import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Send, Image, Smile } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  comments: number;
  time: string;
  liked: boolean;
}

const SocialFeedDemo = () => {
  const { toast } = useToast();
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Maria Silva",
      avatar: "MS",
      content: "🎉 Acabamos de bater a meta do trimestre! Parabéns a toda equipe pelo esforço e dedicação. Juntos somos mais fortes! 💪",
      likes: 24,
      comments: 8,
      time: "2h atrás",
      liked: false
    },
    {
      id: 2,
      author: "João Santos",
      avatar: "JS",
      content: "Alguém mais vai participar do workshop de inovação amanhã? Estou muito animado com os temas que serão abordados! 🚀",
      likes: 12,
      comments: 5,
      time: "4h atrás",
      liked: true
    },
    {
      id: 3,
      author: "Ana Costa",
      avatar: "AC",
      content: "Dica do dia: Pequenas pausas durante o trabalho aumentam a produtividade em até 30%! Lembrem-se de cuidar da saúde mental 🧠✨",
      likes: 45,
      comments: 12,
      time: "6h atrás",
      liked: false
    }
  ]);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    
    const post: Post = {
      id: Date.now(),
      author: "Você",
      avatar: "VC",
      content: newPost,
      likes: 0,
      comments: 0,
      time: "Agora",
      liked: false
    };
    
    setPosts([post, ...posts]);
    setNewPost("");
    toast({
      title: "Post publicado!",
      description: "Seu post foi compartilhado com a equipe.",
    });
  };

  const handleComment = (postId: number) => {
    toast({
      title: "Comentários",
      description: "Funcionalidade de comentários disponível na versão completa.",
    });
  };

  const handleShare = (postId: number) => {
    toast({
      title: "Compartilhado!",
      description: "Post compartilhado com sucesso.",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-h-[500px] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-3 border-b">
        <h3 className="font-semibold text-foreground text-sm">Feed Social</h3>
      </div>

      {/* New Post */}
      <div className="p-4 border-b bg-muted/30">
        <div className="flex gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/20 text-primary text-xs">VC</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Input
              placeholder="O que você está pensando?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="bg-white text-sm"
              onKeyPress={(e) => e.key === 'Enter' && handlePost()}
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="h-7 px-2 text-muted-foreground hover:text-primary">
                  <Image className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-muted-foreground hover:text-primary">
                  <Smile className="h-4 w-4" />
                </Button>
              </div>
              <Button size="sm" className="h-7 px-3 text-xs" onClick={handlePost} disabled={!newPost.trim()}>
                <Send className="h-3 w-3 mr-1" />
                Publicar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="flex-1 overflow-y-auto">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border-b hover:bg-muted/20 transition-colors">
            <div className="flex gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/20 text-primary text-xs">{post.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground text-sm">{post.author}</span>
                  <span className="text-xs text-muted-foreground">• {post.time}</span>
                </div>
                <p className="text-sm text-foreground/80 mb-3 leading-relaxed">{post.content}</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 text-xs transition-colors ${
                      post.liked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${post.liked ? 'fill-current' : ''}`} />
                    <span>{post.likes}</span>
                  </button>
                  <button
                    onClick={() => handleComment(post.id)}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </button>
                  <button
                    onClick={() => handleShare(post.id)}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialFeedDemo;
