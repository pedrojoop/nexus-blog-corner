import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Users, Network, Sparkles, ArrowLeft, Mail, Lock, User } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="glow-orb glow-orb-gold w-96 h-96 -top-48 -left-48 animate-pulse-glow" />
      <div className="glow-orb glow-orb-green w-[500px] h-[500px] bottom-0 right-0 translate-x-1/2 translate-y-1/2 animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="glow-orb glow-orb-gold w-64 h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow opacity-20" style={{ animationDelay: '3s' }} />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(150_25%_18%)_0%,_transparent_70%)]" />

      <div className="min-h-screen flex relative z-10">
        {/* Left Side - Visual Brand Elements */}
        <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
          {/* Abstract connection pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 400 400">
              {/* Connection nodes and lines with gold color */}
              <circle cx="100" cy="100" r="4" fill="hsl(43 25% 68%)" />
              <circle cx="300" cy="150" r="4" fill="hsl(43 25% 68%)" />
              <circle cx="200" cy="250" r="4" fill="hsl(43 25% 68%)" />
              <circle cx="150" cy="300" r="4" fill="hsl(43 25% 68%)" />
              <circle cx="320" cy="280" r="4" fill="hsl(43 25% 68%)" />
              <circle cx="80" cy="200" r="3" fill="hsl(43 25% 68%)" />
              <circle cx="350" cy="80" r="3" fill="hsl(43 25% 68%)" />
              <line x1="100" y1="100" x2="300" y2="150" stroke="hsl(43 25% 68%)" strokeWidth="1" />
              <line x1="300" y1="150" x2="200" y2="250" stroke="hsl(43 25% 68%)" strokeWidth="1" />
              <line x1="200" y1="250" x2="150" y2="300" stroke="hsl(43 25% 68%)" strokeWidth="1" />
              <line x1="200" y1="250" x2="320" y2="280" stroke="hsl(43 25% 68%)" strokeWidth="1" />
              <line x1="100" y1="100" x2="150" y2="300" stroke="hsl(43 25% 68%)" strokeWidth="1" opacity="0.5" />
              <line x1="80" y1="200" x2="100" y2="100" stroke="hsl(43 25% 68%)" strokeWidth="1" opacity="0.5" />
              <line x1="350" y1="80" x2="300" y2="150" stroke="hsl(43 25% 68%)" strokeWidth="1" opacity="0.5" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-md animate-fade-in-up">
            <div className="flex justify-center mb-8 space-x-6">
              <div className="w-16 h-16 glass-card flex items-center justify-center animate-float">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="w-16 h-16 glass-card flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
                <Network className="w-8 h-8 text-primary" />
              </div>
              <div className="w-16 h-16 glass-card flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <h2 className="font-space text-5xl font-bold text-white mb-6">
              Nexus Community
            </h2>
            
            <p className="text-xl text-white/60 leading-relaxed">
              Conecte sua equipe. Fortaleça sua cultura. Transforme seu negócio.
            </p>

            {/* Stats or social proof */}
            <div className="flex justify-center gap-8 mt-12">
              <div className="text-center">
                <p className="font-space text-3xl font-bold text-primary">500+</p>
                <p className="text-sm text-white/50">Empresas</p>
              </div>
              <div className="text-center">
                <p className="font-space text-3xl font-bold text-primary">50k+</p>
                <p className="text-sm text-white/50">Usuários</p>
              </div>
              <div className="text-center">
                <p className="font-space text-3xl font-bold text-primary">98%</p>
                <p className="text-sm text-white/50">Satisfação</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md animate-fade-in-up animation-delay-200">
            {/* Back to home link */}
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white/60 hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">Voltar para o início</span>
            </Link>

            {/* Glass Card Form */}
            <div className="glass-card-gold p-8 space-y-6">
              {/* Logo */}
              <div className="flex justify-center mb-2">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-nexus-gold-dark flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-2xl font-space">N</span>
                </div>
              </div>

              {/* Header */}
              <div className="text-center space-y-2">
                <h1 className="font-space text-2xl font-bold text-white">
                  {isLogin ? 'Bem-vindo de volta' : 'Criar sua conta'}
                </h1>
                <p className="text-white/60 text-sm">
                  {isLogin 
                    ? 'Acesse sua plataforma de cultura organizacional'
                    : 'Comece a transformar sua cultura hoje'}
                </p>
              </div>

              {/* Form */}
              <form className="space-y-5" onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white/80 text-sm font-medium">
                      Nome Completo
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Seu nome"
                        className="pl-10 bg-white/5 border-white/10 focus:border-primary text-white placeholder:text-white/30 h-12 rounded-xl"
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80 text-sm font-medium">
                    E-mail
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10 bg-white/5 border-white/10 focus:border-primary text-white placeholder:text-white/30 h-12 rounded-xl"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/80 text-sm font-medium">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 bg-white/5 border-white/10 focus:border-primary text-white placeholder:text-white/30 h-12 rounded-xl"
                    />
                  </div>
                </div>

                {isLogin && (
                  <div className="flex items-center justify-end">
                    <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">
                      Esqueceu a senha?
                    </a>
                  </div>
                )}

                <Button 
                  type="submit"
                  className="w-full btn-gold h-12 text-base"
                >
                  {isLogin ? 'Entrar' : 'Criar Conta'}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-4 bg-transparent text-white/40">
                    ou continue com
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 h-11"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 h-11"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </Button>
              </div>

              {/* Toggle Login/Signup */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {isLogin 
                    ? <>Não tem uma conta? <span className="text-primary font-medium">Cadastre-se</span></>
                    : <>Já tem uma conta? <span className="text-primary font-medium">Faça login</span></>}
                </button>
              </div>
            </div>

            {/* Terms */}
            <p className="text-center text-xs mt-6 text-white/40">
              Ao continuar, você concorda com nossos{' '}
              <a href="#" className="text-white/60 hover:text-primary transition-colors">Termos de Uso</a>
              {' '}e{' '}
              <a href="#" className="text-white/60 hover:text-primary transition-colors">Política de Privacidade</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
