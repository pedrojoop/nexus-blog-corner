import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, MoreVertical, User } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Task {
  id: string;
  title: string;
  description: string;
  assignee?: string;
  priority: "low" | "medium" | "high";
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const DashboardKanban = () => {
  const [searchParams] = useSearchParams();
  const projectName = searchParams.get("project") || "Projeto";
  const kanbanSection = useScrollAnimation();
  
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "A Fazer",
      tasks: [
        { id: "1", title: "Design da interface", description: "Criar mockups do sistema", priority: "high" },
        { id: "2", title: "Configurar ambiente", description: "Setup inicial do projeto", priority: "medium" },
      ]
    },
    {
      id: "inprogress",
      title: "Em Progresso",
      tasks: [
        { id: "3", title: "Desenvolver API", description: "Endpoints de autenticação", assignee: "PL", priority: "high" },
      ]
    },
    {
      id: "review",
      title: "Em Revisão",
      tasks: []
    },
    {
      id: "done",
      title: "Concluído",
      tasks: [
        { id: "4", title: "Documentação inicial", description: "README e guia básico", assignee: "JS", priority: "low" },
      ]
    }
  ]);

  const [draggedTask, setDraggedTask] = useState<{ task: Task; fromColumn: string } | null>(null);
  const [newTaskColumn, setNewTaskColumn] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleDragStart = (task: Task, columnId: string) => {
    setDraggedTask({ task, fromColumn: columnId });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetColumnId: string) => {
    if (!draggedTask) return;

    setColumns(prevColumns => {
      const newColumns = prevColumns.map(col => {
        if (col.id === draggedTask.fromColumn) {
          return {
            ...col,
            tasks: col.tasks.filter(t => t.id !== draggedTask.task.id)
          };
        }
        if (col.id === targetColumnId) {
          return {
            ...col,
            tasks: [...col.tasks, draggedTask.task]
          };
        }
        return col;
      });
      return newColumns;
    });

    setDraggedTask(null);
  };

  const handleAddTask = (columnId: string) => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: "",
      priority: "medium"
    };

    setColumns(prevColumns =>
      prevColumns.map(col =>
        col.id === columnId
          ? { ...col, tasks: [...col.tasks, newTask] }
          : col
      )
    );

    setNewTaskTitle("");
    setNewTaskColumn(null);
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high": return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium": return "bg-nexus-accent/10 text-nexus-accent border-nexus-accent/20";
      case "low": return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Link to="/dashboard/projetos">
          <Button variant="ghost" className="gap-2 mb-4 hover:bg-accent transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Voltar para Projetos
          </Button>
        </Link>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Quadro Kanban</h1>
            <p className="text-muted-foreground">{projectName}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <Avatar className="h-8 w-8 border-2 border-background bg-primary">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">PL</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 border-2 border-background bg-nexus-accent">
                <AvatarFallback className="bg-nexus-accent text-primary-foreground text-xs">JS</AvatarFallback>
              </Avatar>
            </div>
            <Button className="bg-primary hover:bg-primary/90 transition-all duration-300">
              <User className="h-4 w-4 mr-2" />
              Convidar
            </Button>
          </div>
        </div>
      </div>

      <div 
        ref={kanbanSection.ref}
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 ${kanbanSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {columns.map((column, columnIndex) => (
          <div
            key={column.id}
            className="flex flex-col h-fit min-h-[400px]"
            style={{
              animation: kanbanSection.isVisible ? `slide-up 0.6s ease-out ${columnIndex * 0.1}s both` : 'none'
            }}
          >
            <Card className="border-0 shadow-md flex-1">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <h3 className="font-semibold text-foreground">{column.title}</h3>
                    <span className="text-xs bg-accent text-muted-foreground px-2 py-1 rounded-full">
                      {column.tasks.length}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>

                <div
                  className="space-y-3 min-h-[300px]"
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(column.id)}
                >
                  {column.tasks.map(task => (
                    <Card
                      key={task.id}
                      draggable
                      onDragStart={() => handleDragStart(task, column.id)}
                      className="border-0 shadow-sm cursor-move hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 bg-background"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-foreground text-sm">{task.title}</h4>
                          <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-1">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        {task.description && (
                          <p className="text-xs text-muted-foreground mb-3">{task.description}</p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                            {task.priority === "high" && "Alta"}
                            {task.priority === "medium" && "Média"}
                            {task.priority === "low" && "Baixa"}
                          </span>
                          
                          {task.assignee && (
                            <Avatar className="h-6 w-6 bg-primary">
                              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                {task.assignee}
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {newTaskColumn === column.id ? (
                    <Card className="border-2 border-primary/30 bg-background">
                      <CardContent className="p-3">
                        <Input
                          autoFocus
                          placeholder="Título da tarefa..."
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleAddTask(column.id);
                            if (e.key === "Escape") setNewTaskColumn(null);
                          }}
                          className="mb-2 border-0 focus-visible:ring-0 px-0"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleAddTask(column.id)}
                            className="bg-primary hover:bg-primary/90"
                          >
                            Adicionar
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setNewTaskColumn(null)}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                      onClick={() => setNewTaskColumn(column.id)}
                    >
                      <Plus className="h-4 w-4" />
                      Adicionar tarefa
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardKanban;
