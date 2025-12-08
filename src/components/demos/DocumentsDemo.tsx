import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Folder, FolderOpen, Upload, Download, Trash2, Search, Plus, MoreVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FileItem {
  id: number;
  name: string;
  type: 'folder' | 'file';
  size?: string;
  modified: string;
  icon: 'folder' | 'pdf' | 'doc' | 'xls' | 'img';
}

const DocumentsDemo = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPath, setCurrentPath] = useState<string[]>(["Documentos"]);
  const [files, setFiles] = useState<FileItem[]>([
    { id: 1, name: "RH", type: "folder", modified: "Hoje", icon: "folder" },
    { id: 2, name: "Projetos", type: "folder", modified: "Ontem", icon: "folder" },
    { id: 3, name: "Relatórios", type: "folder", modified: "3 dias atrás", icon: "folder" },
    { id: 4, name: "Contrato_2024.pdf", type: "file", size: "2.4 MB", modified: "Hoje", icon: "pdf" },
    { id: 5, name: "Planilha_Metas.xlsx", type: "file", size: "1.2 MB", modified: "Ontem", icon: "xls" },
    { id: 6, name: "Apresentacao_Q1.docx", type: "file", size: "5.8 MB", modified: "2 dias atrás", icon: "doc" },
  ]);

  const getFileIcon = (icon: string) => {
    switch (icon) {
      case 'folder':
        return <Folder className="h-8 w-8 text-amber-500" />;
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />;
      case 'doc':
        return <FileText className="h-8 w-8 text-blue-500" />;
      case 'xls':
        return <FileText className="h-8 w-8 text-green-500" />;
      default:
        return <FileText className="h-8 w-8 text-muted-foreground" />;
    }
  };

  const handleOpenFolder = (folder: FileItem) => {
    if (folder.type === 'folder') {
      setCurrentPath([...currentPath, folder.name]);
      // Simulate folder contents
      setFiles([
        { id: 10, name: "Documento_Exemplo.pdf", type: "file", size: "1.5 MB", modified: "Hoje", icon: "pdf" },
        { id: 11, name: "Planilha_Dados.xlsx", type: "file", size: "800 KB", modified: "Ontem", icon: "xls" },
      ]);
      toast({
        title: `Pasta "${folder.name}" aberta`,
        description: "Navegando para a pasta selecionada.",
      });
    }
  };

  const handleUpload = () => {
    const newFile: FileItem = {
      id: Date.now(),
      name: "Novo_Arquivo.pdf",
      type: "file",
      size: "1.0 MB",
      modified: "Agora",
      icon: "pdf"
    };
    setFiles([...files, newFile]);
    toast({
      title: "Arquivo enviado!",
      description: "O arquivo foi carregado com sucesso.",
    });
  };

  const handleDelete = (fileId: number) => {
    setFiles(files.filter(f => f.id !== fileId));
    toast({
      title: "Arquivo excluído",
      description: "O arquivo foi removido com sucesso.",
    });
  };

  const handleDownload = (file: FileItem) => {
    toast({
      title: "Download iniciado",
      description: `Baixando ${file.name}...`,
    });
  };

  const handleCreateFolder = () => {
    const newFolder: FileItem = {
      id: Date.now(),
      name: "Nova Pasta",
      type: "folder",
      modified: "Agora",
      icon: "folder"
    };
    setFiles([newFolder, ...files]);
    toast({
      title: "Pasta criada!",
      description: "Nova pasta criada com sucesso.",
    });
  };

  const handleBack = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
      // Reset to root files
      setFiles([
        { id: 1, name: "RH", type: "folder", modified: "Hoje", icon: "folder" },
        { id: 2, name: "Projetos", type: "folder", modified: "Ontem", icon: "folder" },
        { id: 3, name: "Relatórios", type: "folder", modified: "3 dias atrás", icon: "folder" },
        { id: 4, name: "Contrato_2024.pdf", type: "file", size: "2.4 MB", modified: "Hoje", icon: "pdf" },
        { id: 5, name: "Planilha_Metas.xlsx", type: "file", size: "1.2 MB", modified: "Ontem", icon: "xls" },
        { id: 6, name: "Apresentacao_Q1.docx", type: "file", size: "5.8 MB", modified: "2 dias atrás", icon: "doc" },
      ]);
    }
  };

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[500px] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-3 border-b">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground text-sm">Gestão de Documentos</h3>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-7 text-xs px-2" onClick={handleCreateFolder}>
              <Plus className="h-3 w-3 mr-1" />
              Pasta
            </Button>
            <Button size="sm" className="h-7 text-xs px-2" onClick={handleUpload}>
              <Upload className="h-3 w-3 mr-1" />
              Upload
            </Button>
          </div>
        </div>
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
          {currentPath.map((path, index) => (
            <span key={index} className="flex items-center">
              {index > 0 && <span className="mx-1">/</span>}
              <button 
                onClick={() => index === 0 ? handleBack() : null}
                className="hover:text-primary transition-colors"
              >
                {path}
              </button>
            </span>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Buscar arquivos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-7 h-8 text-xs"
          />
        </div>
      </div>

      {/* Files Grid */}
      <ScrollArea className="flex-1 p-4">
        <div className="grid grid-cols-3 gap-3">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              className="group relative p-3 rounded-lg border border-muted hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
              onDoubleClick={() => handleOpenFolder(file)}
            >
              <div className="flex flex-col items-center text-center">
                {getFileIcon(file.icon)}
                <p className="text-xs font-medium text-foreground mt-2 truncate w-full">{file.name}</p>
                <p className="text-[10px] text-muted-foreground">
                  {file.size || file.modified}
                </p>
              </div>
              
              {/* Actions overlay */}
              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-0.5">
                {file.type === 'file' && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0"
                    onClick={(e) => { e.stopPropagation(); handleDownload(file); }}
                  >
                    <Download className="h-3 w-3 text-muted-foreground" />
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0"
                  onClick={(e) => { e.stopPropagation(); handleDelete(file.id); }}
                >
                  <Trash2 className="h-3 w-3 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredFiles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <FolderOpen className="h-12 w-12 mb-2 opacity-50" />
            <p className="text-sm">Nenhum arquivo encontrado</p>
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className="px-4 py-2 border-t bg-muted/20 text-xs text-muted-foreground">
        {filteredFiles.length} itens • Armazenamento: 12.4 GB de 50 GB
      </div>
    </div>
  );
};

export default DocumentsDemo;
