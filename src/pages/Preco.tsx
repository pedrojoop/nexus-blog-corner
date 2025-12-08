import { Check, Sparkles, Building2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const plans = [
  {
    name: "Starter",
    description: "Para pequenas equipes começando a estruturar a cultura",
    price: "R$ 990",
    period: "/mês",
    icon: Rocket,
    features: [
      "Até 50 colaboradores",
      "Chat interno com IA",
      "Gestão de documentos",
      "Calendário de eventos",
      "Suporte por email",
      "Relatórios básicos",
    ],
    cta: "Começar Agora",
    popular: false,
  },
  {
    name: "Pro",
    description: "Para empresas que querem acelerar o engajamento",
    price: "R$ 2.490",
    period: "/mês",
    icon: Sparkles,
    features: [
      "Até 200 colaboradores",
      "Tudo do Starter +",
      "Diagnóstico de Cultura com IA",
      "LMS completo",
      "Gamificação e reconhecimento",
      "Integrações avançadas",
      "Suporte prioritário",
      "Analytics avançado",
    ],
    cta: "Escolher Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Solução completa para grandes organizações",
    price: "Sob consulta",
    period: "",
    icon: Building2,
    features: [
      "Colaboradores ilimitados",
      "Tudo do Pro +",
      "Culture as a Service (CaaS)",
      "Consultoria especializada",
      "API personalizada",
      "SLA garantido",
      "Gerente de sucesso dedicado",
      "Implementação white-label",
    ],
    cta: "Falar com Vendas",
    popular: false,
  },
];

const Preco = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: plansRef, isVisible: plansVisible } = useScrollAnimation();
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div
          ref={heroRef}
          className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Planos que crescem com sua{" "}
            <span className="text-primary">empresa</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para transformar a cultura da sua organização.
            Todos incluem 14 dias de teste grátis.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4">
        <div
          ref={plansRef}
          className={`max-w-6xl mx-auto transition-all duration-700 ${
            plansVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`relative glass-card p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 ${
                    plan.popular
                      ? "ring-2 ring-primary shadow-xl scale-105 md:scale-110"
                      : ""
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                        Mais Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {plan.description}
                    </p>
                  </div>

                  <div className="text-center mb-8">
                    <span className="font-serif text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground/80 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link to={plan.name === "Enterprise" ? "/contato" : "/dashboard"}>
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-primary hover:bg-primary/90"
                          : "bg-secondary hover:bg-secondary/80"
                      }`}
                      size="lg"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div
          ref={faqRef}
          className={`max-w-3xl mx-auto transition-all duration-700 ${
            faqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Perguntas Frequentes
          </h2>

          <div className="space-y-6">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">
                Posso trocar de plano depois?
              </h3>
              <p className="text-muted-foreground">
                Sim! Você pode fazer upgrade ou downgrade a qualquer momento. As
                mudanças são proporcionais ao período restante.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">
                Preciso de cartão de crédito para testar?
              </h3>
              <p className="text-muted-foreground">
                Não! Oferecemos 14 dias de teste grátis sem necessidade de cartão.
                Você só paga se decidir continuar.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">
                Qual o tempo de implementação?
              </h3>
              <p className="text-muted-foreground">
                A plataforma fica disponível imediatamente. Para Enterprise com
                customizações, o onboarding completo leva de 2 a 4 semanas.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">
                Oferecem desconto para pagamento anual?
              </h3>
              <p className="text-muted-foreground">
                Sim! Pagamentos anuais têm 20% de desconto. Entre em contato para
                mais detalhes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Pronto para transformar sua cultura?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Comece hoje mesmo com 14 dias grátis. Sem compromisso, sem cartão de
            crédito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="btn-gold text-base px-8">
                Testar Grátis por 14 Dias
              </Button>
            </Link>
            <Link to="/contato">
              <Button variant="outline" size="lg" className="text-base px-8">
                Agendar Demonstração
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
          <p>© 2025 Intraliza. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Preco;
