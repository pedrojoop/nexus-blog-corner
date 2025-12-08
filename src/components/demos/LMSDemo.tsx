import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Settings } from "lucide-react";
import LMSStudentDemo from "./LMSStudentDemo";
import LMSAdminDemo from "./LMSAdminDemo";

const LMSDemo = () => {
  const [activeTab, setActiveTab] = useState("student");

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4 h-10">
          <TabsTrigger value="student" className="flex items-center gap-2 text-xs">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Acessar Cursos</span>
          </TabsTrigger>
          <TabsTrigger value="admin" className="flex items-center gap-2 text-xs">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Administração</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="student" className="mt-0">
          <LMSStudentDemo />
        </TabsContent>

        <TabsContent value="admin" className="mt-0">
          <LMSAdminDemo />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LMSDemo;
