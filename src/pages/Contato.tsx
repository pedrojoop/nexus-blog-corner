import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Header from "@/components/Header";

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }).max(100, { message: "Nome deve ter menos de 100 caracteres" }),
  email: z.string().trim().email({ message: "Email inválido" }).max(255, { message: "Email deve ter menos de 255 caracteres" }),
  phone: z.string().trim().max(20, { message: "Telefone deve ter menos de 20 caracteres" }).optional(),
  subject: z.string().trim().min(1, { message: "Assunto é obrigatório" }).max(150, { message: "Assunto deve ter menos de 150 caracteres" }),
  message: z.string().trim().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres" }).max(1000, { message: "Mensagem deve ter menos de 1000 caracteres" })
});

type ContactForm = z.infer<typeof contactSchema>;

const Contato = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    
    try {
      // Simula envio do formulário
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      reset();
    } catch (error) {
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-nexus-green to-nexus-accent bg-clip-text text-transparent">
              Entre em Contato
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estamos aqui para ajudar. Envie sua mensagem e retornaremos o mais breve possível.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold mb-6">Informações de Contato</h2>
                <p className="text-muted-foreground mb-8">
                  Fale conosco através dos canais abaixo ou preencha o formulário ao lado.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border hover:border-nexus-green/50 transition-colors">
                  <div className="p-3 rounded-full bg-nexus-green/10">
                    <Mail className="w-6 h-6 text-nexus-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">contato@nexuscommunity.com.br</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border hover:border-nexus-green/50 transition-colors">
                  <div className="p-3 rounded-full bg-nexus-green/10">
                    <Phone className="w-6 h-6 text-nexus-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telefone</h3>
                    <p className="text-muted-foreground">+55 (11) 3000-0000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border hover:border-nexus-green/50 transition-colors">
                  <div className="p-3 rounded-full bg-nexus-green/10">
                    <MapPin className="w-6 h-6 text-nexus-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Endereço</h3>
                    <p className="text-muted-foreground">
                      São Paulo, SP<br />
                      Brasil
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-lg bg-gradient-to-br from-nexus-green/10 to-nexus-accent/10 border border-nexus-green/20">
                <h3 className="font-semibold mb-2">Horário de Atendimento</h3>
                <p className="text-sm text-muted-foreground">
                  Segunda a Sexta: 9h às 18h<br />
                  Sábado: 9h às 13h
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8 rounded-lg bg-card border border-border">
                <div>
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Seu nome completo"
                    className="mt-2"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="seu@email.com"
                    className="mt-2"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="(11) 99999-9999"
                    className="mt-2"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="subject">Assunto *</Label>
                  <Input
                    id="subject"
                    {...register("subject")}
                    placeholder="Como podemos ajudar?"
                    className="mt-2"
                  />
                  {errors.subject && (
                    <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">Mensagem *</Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Descreva sua dúvida ou necessidade..."
                    className="mt-2 min-h-[150px]"
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-nexus-green to-nexus-accent hover:opacity-90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contato;
