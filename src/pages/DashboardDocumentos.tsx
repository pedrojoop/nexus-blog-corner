import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Folder, FolderOpen } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const DashboardDocumentos = () => {
  const headerSection = useScrollAnimation();
  const documentsSection = useScrollAnimation();

  return (
    <DashboardLayout>
      <div ref={headerSection.ref} className={`transition-all duration-700 ${headerSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex items-start gap-4 mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-2">Gestão de Documentos</h1>
            <p className="text-muted-foreground">Organize, compartilhe e gerencie documentos da empresa</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            + Nova Pasta
          </Button>
        </div>

        <h2 className="text-xl font-semibold text-foreground mb-4">Documentos</h2>
      </div>

      <div ref={documentsSection.ref} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Card 
          className="border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group"
          style={{
            animation: documentsSection.isVisible ? 'slide-up 0.6s ease-out 0.1s both' : 'none'
          }}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 transition-colors group-hover:bg-primary/20">
              <Folder className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-foreground mb-1">0 B</h3>
            <p className="text-sm text-muted-foreground">Armazenamento</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mb-4">
          <FolderOpen className="h-12 w-12 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground text-lg">Nenhum arquivo encontrado</p>
      </div>
    </DashboardLayout>
  );
};

export default DashboardDocumentos;
