import { useState } from "react";
import { Lightbulb, TrendingUp, AlertTriangle, Pencil, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useRoleStore from "@/store/roleStore";

interface Insight { id: string; icon: React.ElementType; title: string; description: string; type: "warning" | "positive" | "info"; }

const initialInsights: Insight[] = [
  { id: "1", icon: AlertTriangle, title: "Highest Spending Category", description: "Art & Antiques accounts for 41% of your spending this month at $24,500 — significantly above your 3-month average of $12,000.", type: "warning" },
  { id: "2", icon: TrendingUp, title: "Monthly Comparison", description: "Your income increased 24% compared to February ($50,000 → $62,000), while expenses grew only 12% ($34,000 → $38,000). Net savings improved by $14,000.", type: "positive" },
  { id: "3", icon: Lightbulb, title: "Savings Observation", description: "You're saving 39% of your income this month — your best ratio in 6 months. At this rate, your projected annual savings would exceed $288,000.", type: "info" },
];

const typeStyles = {
  warning: "bg-destructive/10 text-destructive",
  positive: "bg-primary/10 text-primary",
  info: "bg-accent/20 text-accent-foreground",
};

const iconMap = { warning: AlertTriangle, positive: TrendingUp, info: Lightbulb };
const emptyForm = { title: "", description: "", type: "info" as Insight["type"] };

const InsightsSection = () => {
  const isAdmin = useRoleStore((state) => state.role) === "admin";

  const [insights, setInsights] = useState<Insight[]>(initialInsights);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingInsight, setEditingInsight] = useState<Insight | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openAdd = () => {
    setEditingInsight(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (insight: Insight) => {
    setEditingInsight(insight);
    setForm({ title: insight.title, description: insight.description, type: insight.type });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.title || !form.description) { toast.error("Title and description are required"); return; }
    const icon = iconMap[form.type];
    if (editingInsight) {
      setInsights(prev => prev.map(i => i.id === editingInsight.id ? { ...i, ...form, icon } : i));
      toast.success("Insight updated");
    } else {
      setInsights(prev => [...prev, { id: crypto.randomUUID(), ...form, icon }]);
      toast.success("Insight added");
    }
    setDialogOpen(false);
    setEditingInsight(null);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setInsights(prev => prev.filter(i => i.id !== deleteId));
    toast.success("Insight deleted");
    setDeleteId(null);
  };

  return (
    <>
      <div className="bg-card rounded-lg border border-border vintage-shadow">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-heading text-lg text-foreground">Insights</h3>
            <p className="text-xs text-muted-foreground mt-1 font-body">Key observations from your financial data</p>
          </div>
          {isAdmin && (
            <Button size="sm" onClick={openAdd} className="gap-1.5">
              <Plus size={14} /> Add
            </Button>
          )}
        </div>
        <div className="divide-y divide-border">
          {insights.map((insight) => (
            <div key={insight.id} className="p-5 flex items-start gap-4 group">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${typeStyles[insight.type]}`}>
                <insight.icon size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-heading text-foreground mb-1">{insight.title}</p>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{insight.description}</p>
              </div>
              {isAdmin && (
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button onClick={() => openEdit(insight)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"><Pencil size={13} /></button>
                  <button onClick={() => setDeleteId(insight.id)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-destructive"><Trash2 size={13} /></button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingInsight ? "Edit Insight" : "Add Insight"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-body resize-none focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <select
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value as Insight["type"] })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-body focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="info">Info</option>
              <option value="positive">Positive</option>
              <option value="warning">Warning</option>
            </select>
            <Button className="w-full" onClick={handleSave}>{editingInsight ? "Update" : "Add"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Insight?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default InsightsSection;