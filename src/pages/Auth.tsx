import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Users, Network, Sparkles } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#2E4F4F' }}>
      {/* Left Side - Visual Elements */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12">
        {/* Abstract connection pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 400 400">
            {/* Connection nodes and lines */}
            <circle cx="100" cy="100" r="4" fill="#D3C4B6" />
            <circle cx="300" cy="150" r="4" fill="#D3C4B6" />
            <circle cx="200" cy="250" r="4" fill="#D3C4B6" />
            <circle cx="150" cy="300" r="4" fill="#D3C4B6" />
            <circle cx="320" cy="280" r="4" fill="#D3C4B6" />
            <line x1="100" y1="100" x2="300" y2="150" stroke="#D3C4B6" strokeWidth="1" />
            <line x1="300" y1="150" x2="200" y2="250" stroke="#D3C4B6" strokeWidth="1" />
            <line x1="200" y1="250" x2="150" y2="300" stroke="#D3C4B6" strokeWidth="1" />
            <line x1="200" y1="250" x2="320" y2="280" stroke="#D3C4B6" strokeWidth="1" />
            <line x1="100" y1="100" x2="150" y2="300" stroke="#D3C4B6" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-md">
          <div className="flex justify-center mb-8 space-x-4">
            <div className="animate-float">
              <Users className="w-16 h-16 text-[#D3C4B6]" />
            </div>
            <div className="animate-float" style={{ animationDelay: '0.2s' }}>
              <Network className="w-16 h-16 text-[#D3C4B6]" />
            </div>
            <div className="animate-float" style={{ animationDelay: '0.4s' }}>
              <Sparkles className="w-16 h-16 text-[#D3C4B6]" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-[#D3C4B6] mb-4">
            Nexus Community
          </h2>
          <p className="text-xl text-[#D3C4B6]/80">
            Conecte sua equipe. Fortaleça sua cultura. Transforme seu negócio.
          </p>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Card style={{ backgroundColor: '#D3C4B6' }} className="border-none shadow-2xl">
            <CardHeader className="space-y-1">
              <Link to="/" className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2E4F4F' }}>
                  <Network className="w-6 h-6 text-[#D3C4B6]" />
                </div>
              </Link>
              <CardTitle className="text-2xl font-bold text-center" style={{ color: '#2E4F4F' }}>
                {isLogin ? 'Acesso à Plataforma' : 'Criar Conta'}
              </CardTitle>
              <CardDescription className="text-center" style={{ color: '#2E4F4F', opacity: 0.7 }}>
                {isLogin 
                  ? 'Acesso rápido e seguro para a sua comunidade'
                  : 'Comece a transformar sua cultura organizacional'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name" style={{ color: '#2E4F4F' }}>Nome Completo</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome"
                      className="bg-white/50 border-[#2E4F4F]/20 focus:border-[#2E4F4F] text-[#2E4F4F]"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" style={{ color: '#2E4F4F' }}>E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="bg-white/50 border-[#2E4F4F]/20 focus:border-[#2E4F4F] text-[#2E4F4F]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" style={{ color: '#2E4F4F' }}>Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-white/50 border-[#2E4F4F]/20 focus:border-[#2E4F4F] text-[#2E4F4F]"
                  />
                </div>

                {isLogin && (
                  <div className="flex items-center justify-end">
                    <a href="#" className="text-sm hover:underline" style={{ color: '#2E4F4F' }}>
                      Esqueceu a senha?
                    </a>
                  </div>
                )}

                <Button 
                  type="submit"
                  className="w-full font-semibold"
                  style={{ backgroundColor: '#2E4F4F', color: '#D3C4B6' }}
                >
                  {isLogin ? 'Entrar' : 'Criar Conta'}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" style={{ borderColor: '#2E4F4F', opacity: 0.2 }} />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-2 text-[#2E4F4F]/60" style={{ backgroundColor: '#D3C4B6' }}>
                    ou
                  </span>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm hover:underline font-medium"
                  style={{ color: '#2E4F4F' }}
                >
                  {isLogin 
                    ? 'Não tem uma conta? Cadastre-se'
                    : 'Já tem uma conta? Faça login'}
                </button>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-sm mt-6 text-[#D3C4B6]/60">
            Ao continuar, você concorda com nossos{' '}
            <a href="#" className="underline hover:text-[#D3C4B6]">Termos de Uso</a>
            {' '}e{' '}
            <a href="#" className="underline hover:text-[#D3C4B6]">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;