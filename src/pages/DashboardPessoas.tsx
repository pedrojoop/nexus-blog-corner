import { useState, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, Cake, LayoutGrid, GitBranch } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import PersonCard from "@/components/pessoas/PersonCard";
import OrgChartView from "@/components/pessoas/OrgChartView";
import PeopleFilters from "@/components/pessoas/PeopleFilters";
import MetricCard from "@/components/pessoas/MetricCard";

type ViewMode = 'grid' | 'orgchart';

const DashboardPessoas = () => {
  const headerSection = useScrollAnimation();
  const peopleSection = useScrollAnimation();
  
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const people = [
    { 
      name: "Pedro Lima", 
      role: "CEO & Founder", 
      department: "TI", 
      initials: "PL",
      skills: ["Estratégia", "Liderança", "Inovação"],
      status: 'online' as const,
      location: "São Paulo"
    },
    { 
      name: "Lucas Mendes", 
      role: "CTO", 
      department: "TI", 
      initials: "LM",
      skills: ["Arquitetura", "Cloud", "DevOps"],
      status: 'meeting' as const,
      location: "São Paulo"
    },
    { 
      name: "Ana Silva", 
      role: "Head de RH", 
      department: "RH", 
      initials: "AS",
      skills: ["Gestão de Pessoas", "Cultura", "Recrutamento"],
      status: 'online' as const,
      location: "Rio de Janeiro"
    },
    { 
      name: "Carlos Oliveira", 
      role: "Tech Lead", 
      department: "TI", 
      initials: "CO",
      skills: ["React", "TypeScript", "Node.js"],
      status: 'online' as const,
      location: "São Paulo"
    },
    { 
      name: "Marina Costa", 
      role: "Product Manager", 
      department: "TI", 
      initials: "MC",
      skills: ["Agile", "Scrum", "Product Discovery"],
      status: 'offline' as const,
      location: "Belo Horizonte"
    },
    { 
      name: "Rafael Santos", 
      role: "Desenvolvedor Sr", 
      department: "TI", 
      initials: "RS",
      skills: ["React", "Python", "AWS"],
      status: 'online' as const,
      location: "São Paulo"
    },
    { 
      name: "Juliana Ferreira", 
      role: "UX Designer", 
      department: "TI", 
      initials: "JF",
      skills: ["Figma", "User Research", "Prototyping"],
      status: 'meeting' as const,
      location: "São Paulo"
    },
    { 
      name: "Bruno Almeida", 
      role: "Gerente de Vendas", 
      department: "Vendas", 
      initials: "BA",
      skills: ["Negociação", "CRM", "B2B"],
      status: 'online' as const,
      location: "Rio de Janeiro"
    },
  ];

  // Org chart data structure
  const orgChartData = {
    name: "Pedro Lima",
    role: "CEO & Founder",
    department: "Diretoria",
    initials: "PL",
    status: 'online' as const,
    children: [
      {
        name: "Lucas Mendes",
        role: "CTO",
        department: "Tecnologia",
        initials: "LM",
        status: 'meeting' as const,
        children: [
          { name: "Carlos Dev", role: "Senior Developer", department: "Tecnologia", initials: "CD", status: 'online' as const },
          { name: "Maria QA", role: "QA Engineer", department: "Tecnologia", initials: "MQ", status: 'offline' as const },
        ]
      },
      {
        name: "Ana Silva",
        role: "Head de RH",
        department: "RH",
        initials: "AS",
        status: 'online' as const,
      },
      {
        name: "Bruno Almeida",
        role: "Gerente de Vendas",
        department: "Vendas",
        initials: "BA",
        status: 'online' as const,
      },
    ]
  };

  const departments = [...new Set(people.map(p => p.department))];
  const allSkills = [...new Set(people.flatMap(p => p.skills))];

  const onlineCount = people.filter(p => p.status === 'online').length;
  const birthdaysThisMonth = 3; // Mock data

  // Filter people
  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      const matchesSearch = searchQuery === '' || 
        person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesDepartment = selectedDepartments.length === 0 || 
        selectedDepartments.includes(person.department);
      
      const matchesSkills = selectedSkills.length === 0 || 
        person.skills.some(s => selectedSkills.includes(s));
      
      return matchesSearch && matchesDepartment && matchesSkills;
    });
  }, [searchQuery, selectedDepartments, selectedSkills]);

  const handleDepartmentToggle = (dept: string) => {
    setSelectedDepartments(prev => 
      prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]
    );
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleClearFilters = () => {
    setSelectedDepartments([]);
    setSelectedSkills([]);
    setSearchQuery('');
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div 
          ref={headerSection.ref} 
          className={`transition-all duration-700 ${headerSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Title and View Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">Pessoas</h1>
              <p className="text-muted-foreground mt-1">Centro de conexão da empresa</p>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center bg-muted/50 rounded-xl p-1 border border-border/30">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('grid')}
                className={`rounded-lg px-4 h-9 transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-background shadow-sm text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <LayoutGrid className="h-4 w-4 mr-2" />
                Grade
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('orgchart')}
                className={`rounded-lg px-4 h-9 transition-all ${
                  viewMode === 'orgchart' 
                    ? 'bg-background shadow-sm text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <GitBranch className="h-4 w-4 mr-2" />
                Organograma
              </Button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <MetricCard
              icon={Users}
              label="Colaboradores"
              value={people.length}
              iconColor="text-primary"
              iconBgColor="bg-primary/10"
            />
            <MetricCard
              icon={UserCheck}
              label="Online Agora"
              value={onlineCount}
              iconColor="text-green-600 dark:text-green-400"
              iconBgColor="bg-green-500/10"
            />
            <MetricCard
              icon={Cake}
              label="Aniversariantes do Mês"
              value={birthdaysThisMonth}
              iconColor="text-pink-600 dark:text-pink-400"
              iconBgColor="bg-pink-500/10"
            />
          </div>

          {/* Filters */}
          {viewMode === 'grid' && (
            <PeopleFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedDepartments={selectedDepartments}
              onDepartmentToggle={handleDepartmentToggle}
              selectedSkills={selectedSkills}
              onSkillToggle={handleSkillToggle}
              departments={departments}
              skills={allSkills}
              onClearFilters={handleClearFilters}
            />
          )}
        </div>

        {/* Content Area */}
        <div ref={peopleSection.ref}>
          {viewMode === 'grid' ? (
            <>
              {/* People Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredPeople.map((person, index) => (
                  <PersonCard
                    key={person.name}
                    person={person}
                    index={index}
                    isVisible={peopleSection.isVisible}
                  />
                ))}
              </div>

              {/* Empty State */}
              {filteredPeople.length === 0 && (
                <div className="text-center py-16">
                  <div className="relative inline-block mb-4">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
                    <Users className="relative h-14 w-14 text-muted-foreground/50" />
                  </div>
                  <p className="text-muted-foreground text-lg mb-2">Nenhum colaborador encontrado</p>
                  <p className="text-sm text-muted-foreground/70">Tente ajustar os filtros de busca</p>
                </div>
              )}
            </>
          ) : (
            /* Org Chart View */
            <div className="bg-muted/30 border border-border/40 rounded-2xl overflow-hidden">
              <OrgChartView data={orgChartData} />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPessoas;
