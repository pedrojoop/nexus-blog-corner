import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Users,
  FileText,
  Pin,
  Settings,
  Hash,
  Folder,
  Ticket,
} from "lucide-react";

interface Member {
  id: string;
  name: string;
  role: string;
  isOnline: boolean;
}

interface File {
  id: string;
  name: string;
  uploadedBy: string;
  uploadedAt: Date;
  type: string;
}

interface ChatInfoPanelProps {
  channelName: string;
  channelType: "channel" | "dm" | "project" | "ticket";
  description?: string;
  members?: Member[];
  files?: File[];
  pinnedMessages?: number;
  open: boolean;
  onClose: () => void;
}

export const ChatInfoPanel = ({
  channelName,
  channelType,
  description,
  members = [],
  files = [],
  pinnedMessages = 0,
  open,
  onClose,
}: ChatInfoPanelProps) => {
  const getIcon = () => {
    switch (channelType) {
      case "project":
        return <Folder className="h-5 w-5" />;
      case "ticket":
        return <Ticket className="h-5 w-5" />;
      case "channel":
        return <Hash className="h-5 w-5" />;
      default:
        return <Users className="h-5 w-5" />;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>
            Detalhes do {channelType === "channel" ? "Canal" : channelType === "dm" ? "Chat" : channelType === "project" ? "Projeto" : "Ticket"}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-80px)] mt-6">
          <div className="pr-4 space-y-6">
            {/* Cabeçalho */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                {getIcon()}
              </div>
              <h2 className="text-xl font-bold">{channelName}</h2>
              {description && (
                <p className="text-sm text-muted-foreground mt-2">{description}</p>
              )}
            </div>

            <Separator />

            {/* Mensagens Fixadas */}
            {pinnedMessages > 0 && (
              <>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Pin className="h-4 w-4" />
                      <span className="font-semibold text-sm">Mensagens Fixadas</span>
                    </div>
                    <Badge variant="secondary">{pinnedMessages}</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Ver todas
                  </Button>
                </div>
                <Separator />
              </>
            )}

            {/* Membros */}
            {members.length > 0 && (
              <>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="font-semibold text-sm">Membros</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{members.length}</span>
                  </div>
                  <div className="space-y-2">
                    {members.map((member) => (
                      <div key={member.id} className="flex items-center gap-2 p-2 hover:bg-muted rounded">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">{member.name[0]}</AvatarFallback>
                          </Avatar>
                          {member.isOnline && (
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-background" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Arquivos Compartilhados */}
            {files.length > 0 && (
              <>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="font-semibold text-sm">Arquivos</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{files.length}</span>
                  </div>
                  <div className="space-y-2">
                    {files.slice(0, 5).map((file) => (
                      <div
                        key={file.id}
                        className="p-2 hover:bg-muted rounded cursor-pointer"
                      >
                        <div className="text-sm font-medium truncate">{file.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Por {file.uploadedBy} • {file.uploadedAt.toLocaleDateString("pt-BR")}
                        </div>
                      </div>
                    ))}
                  </div>
                  {files.length > 5 && (
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      Ver todos os arquivos
                    </Button>
                  )}
                </div>
                <Separator />
              </>
            )}

            {/* Configurações */}
            <div>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configurações do {channelType === "channel" ? "Canal" : "Chat"}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};