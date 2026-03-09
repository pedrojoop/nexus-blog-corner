import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sparkles,
  Search,
  FileText,
  File,
  Folder,
  ArrowRight,
  Upload,
  Bot,
  User,
  ExternalLink,
  Clock,
  BookOpen,
  Shield,
  Code2,
  Briefcase,
  Scale,
} from "lucide-react";

const quickPrompts = [
  { emoji: "✈️", label: "Travel Policy" },
  { emoji: "🏥", label: "Health Insurance Plan" },
  { emoji: "💻", label: "IT Security Guidelines" },
  { emoji: "📋", label: "Onboarding Checklist" },
];

const knowledgeBases = [
  { name: "HR & People", icon: BookOpen, count: 24, color: "text-pink-500 bg-pink-500/10" },
  { name: "Engineering Playbooks", icon: Code2, count: 18, color: "text-blue-500 bg-blue-500/10" },
  { name: "Sales Scripts", icon: Briefcase, count: 12, color: "text-amber-500 bg-amber-500/10" },
  { name: "Legal Templates", icon: Scale, count: 9, color: "text-emerald-500 bg-emerald-500/10" },
];

const recentDocs = [
  { name: "Travel_Policy_2026.pdf", category: "HR & People", updated: "07 Mar 2026", by: "Ana Santos" },
  { name: "API_Style_Guide.md", category: "Engineering", updated: "05 Mar 2026", by: "Lucas Costa" },
  { name: "Sales_Playbook_Q1.docx", category: "Sales", updated: "03 Mar 2026", by: "Maria Oliveira" },
  { name: "NDA_Template_v3.pdf", category: "Legal", updated: "01 Mar 2026", by: "Pedro Lima" },
  { name: "Onboarding_Checklist.pdf", category: "HR & People", updated: "28 Feb 2026", by: "Ana Santos" },
];

const DashboardDocumentos = () => {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(true); // mock active state

  const handleSearch = () => {
    if (query.trim()) setHasSearched(true);
  };

  const handleQuickPrompt = (label: string) => {
    setQuery(label);
    setHasSearched(true);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">Nexus Brain</h1>
              <p className="text-sm text-muted-foreground">Ask anything about company policies, processes, or documents.</p>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
        </div>

        {/* AI Search Center */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="e.g., How do I request a travel refund?"
              className="h-14 pl-12 pr-14 text-base rounded-2xl border-border bg-card shadow-sm focus-visible:ring-primary/30"
            />
            <Button
              size="icon"
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl bg-primary hover:bg-primary/90"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Prompts */}
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((p) => (
              <button
                key={p.label}
                onClick={() => handleQuickPrompt(p.label)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors border border-border/50"
              >
                <span>{p.emoji}</span>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* AI Response (Mock) */}
        {hasSearched && (
          <div className="space-y-3">
            {/* User query */}
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <User className="h-3.5 w-3.5 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground pt-1">How do I request a travel refund?</p>
            </div>

            {/* AI answer */}
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="h-3.5 w-3.5 text-primary" />
              </div>
              <Card className="flex-1 border-border/50 shadow-sm bg-muted/40">
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm text-foreground leading-relaxed">
                    To request a travel refund, you need to fill out the <strong>Expense Form</strong> located in the 
                    Financial Portal and attach your receipts. Approvals take up to <strong>5 business days</strong> and 
                    payments are processed on the <strong>10th of each month</strong>.
                  </p>

                  {/* Sources */}
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-2">Sources:</p>
                    <div className="flex flex-wrap gap-2">
                      <button className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-card border border-border/60 text-foreground hover:bg-secondary transition-colors">
                        <FileText className="h-3.5 w-3.5 text-red-500" />
                        Travel_Policy_2026.pdf
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                      </button>
                      <button className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-card border border-border/60 text-foreground hover:bg-secondary transition-colors">
                        <File className="h-3.5 w-3.5 text-blue-500" />
                        Reimbursement_Steps.docx
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Knowledge Bases */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Knowledge Bases</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {knowledgeBases.map((kb) => (
              <Card
                key={kb.name}
                className="border-border/50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kb.color}`}>
                    <kb.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{kb.name}</span>
                  <span className="text-xs text-muted-foreground">{kb.count} docs</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Documents Table */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Recently Updated Documents</h2>
          <Card className="border-border/50 shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="text-xs font-medium text-muted-foreground">Name</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground">Category</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground">Last Updated</TableHead>
                  <TableHead className="text-xs font-medium text-muted-foreground">Uploaded By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentDocs.map((doc) => (
                  <TableRow key={doc.name} className="cursor-pointer hover:bg-muted/30">
                    <TableCell className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {doc.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs font-normal">{doc.category}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {doc.updated}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{doc.by}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardDocumentos;
