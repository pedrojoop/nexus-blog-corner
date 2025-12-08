import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, FileText, Users } from "lucide-react";
import SocialFeedDemo from "./SocialFeedDemo";
import ChatDemo from "./ChatDemo";
import DocumentsDemo from "./DocumentsDemo";

const CommunicationDemo = () => {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4 h-10">
          <TabsTrigger value="feed" className="flex items-center gap-2 text-xs">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Feed Social</span>
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2 text-xs">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Chat</span>
          </TabsTrigger>
          <TabsTrigger value="docs" className="flex items-center gap-2 text-xs">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Documentos</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="mt-0">
          <SocialFeedDemo />
        </TabsContent>

        <TabsContent value="chat" className="mt-0">
          <ChatDemo />
        </TabsContent>

        <TabsContent value="docs" className="mt-0">
          <DocumentsDemo />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunicationDemo;
