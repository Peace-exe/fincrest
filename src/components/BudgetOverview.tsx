import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useRoleStore from "@/store/roleStore";

interface Budget { id: string; category: string; spent: number; budget: number; }

const initialBudgets: Budget[] = [
  { id: "1", category: "Hospitality & Dining", spent: 4200, budget: 6000 },
  { id: "2", category: "Personal & Fashion", spent: 8500, budget: 10000 },
  { id: "3", category: "Art & Collectibles", spent: 24500, budget: 30000 },
  { id: "4", category: "Travel & Leisure", spent: 12800, budget: 15000 },
  { id: "5", category: "Memberships & Clubs", spent: 3200, budget: 5000 },
];

const BudgetOverview = () => {
  const isAdmin = useRoleStore((state) => state.role) === "admin";

  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<Budget | null>(null);
  const [form, setForm] = useState({ category: "", spent: "", budget: "" });

  const openAdd = () => { setEditItem(null); setForm({ category: "", spent: "", budget: "" }); setDialogOpen(true); };
  const openEdit = (b: Budget) => { setEditItem(b); setForm({ category: b.category, spent: String(b.spent), budget: String(b.budget) }); setDialogOpen(true); };

  const handleSave = () => {
    if (!form.category || !form.budget) { toast.error("Category and budget are required"); return; }
    const entry = { category: form.category, spent: Number(form.spent) || 0, budget: Number(form.budget) };
    if (editItem) {
      setBudgets(budgets.map(b => b.id === editItem.id ? { ...b, ...entry } : b));
      toast.success("Budget updated");
    } else {
      setBudgets([...budgets, { id: crypto.randomUUID(), ...entry }]);
      toast.success("Budget added");
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) { setBudgets(budgets.filter(b => b.id !== deleteId)); toast.success("Budget deleted"); setDeleteId(null); }
  };

  return (
    <div className="bg-card rounded-lg border border-border vintage-shadow">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-heading text-lg text-foreground">Monthly Budget</h3>
          <p className="text-xs text-muted-foreground mt-1 font-body">March 2024</p>
        </div>
        {isAdmin && (
          <Button variant="outline" size="sm" onClick={openAdd}><Plus size={14} className="mr-1" /> Add</Button>
        )}
      </div>
      <div className="p-5 space-y-5">
        {budgets.map((b) => {
          const pct = Math.round((b.spent / b.budget) * 100);
          const isOver = pct > 90;
          return (
            <div key={b.id} className="group">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-body text-foreground">{b.category}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground font-body">${b.spent.toLocaleString()} / ${b.budget.toLocaleString()}</p>
                  {isAdmin && (
                    <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                      <button onClick={() => openEdit(b)} className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"><Pencil size={12} /></button>
                      <button onClick={() => setDeleteId(b.id)} className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-destructive"><Trash2 size={12} /></button>
                    </div>
                  )}
                </div>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-700 ${isOver ? "bg-burgundy" : "bg-primary"}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editItem ? "Edit Budget" : "Add Budget"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
            <Input placeholder="Spent" type="number" value={form.spent} onChange={e => setForm({ ...form, spent: e.target.value })} />
            <Input placeholder="Budget" type="number" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} />
            <Button className="w-full" onClick={handleSave}>{editItem ? "Update" : "Add"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete this budget?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BudgetOverview;