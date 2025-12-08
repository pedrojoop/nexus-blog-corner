import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Gamepad2 } from "lucide-react";
import CaaSDemo from "./CaaSDemo";
import GamificationDemo from "./GamificationDemo";

const CultureDemo = () => {
  const [activeTab, setActiveTab] = useState("caas");

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4 h-10">
          <TabsTrigger value="caas" className="flex items-center gap-2 text-xs">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">CaaS - Rituais</span>
          </TabsTrigger>
          <TabsTrigger value="gamification" className="flex items-center gap-2 text-xs">
            <Gamepad2 className="h-4 w-4" />
            <span className="hidden sm:inline">Gamificação</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="caas" className="mt-0">
          <CaaSDemo />
        </TabsContent>

        <TabsContent value="gamification" className="mt-0">
          <GamificationDemo />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CultureDemo;
