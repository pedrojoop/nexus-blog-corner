import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const DashboardChat = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
        <Card className="border-0 shadow-md max-w-md w-full">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Chat em Desenvolvimento</h2>
            <p className="text-muted-foreground">
              A funcionalidade de chat estará disponível em breve.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardChat;
