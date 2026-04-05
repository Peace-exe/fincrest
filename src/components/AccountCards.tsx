import { useState } from "react";
import { Building2, CreditCard, Landmark, BarChart3, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useRoleStore from "@/store/roleStore";

interface Account { id: string; icon: React.ElementType; label: string; balance: string; change: string; positive: boolean; }

const initialAccounts: Account[] = [
  { id: "1", icon: Building2, label: "Checking", balance: "$45,230", change: "+$2,100", positive: true },
  { id: "2", icon: CreditCard, label: "Savings", balance: "$284,500", change: "+$8,400", positive: true },
  { id: "3", icon: Landmark, label: "Trust Fund", balance: "$1,250,000", change: "+$32,000", positive: true },
  { id: "4", icon: BarChart3, label: "Investments", balance: "$1,267,662", change: "-$4,200", positive: false },
];

const AccountCards = () => {
  const isAdmin = useRoleStore((state) => state.role) === "admin";

  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Account | null>(null);
  const [form, setForm] = useState({ label: "", balance: "", change: "", positive: true });

  const openEdit = (acc: Account) => {
    setEditItem(acc);
    setForm({ label: acc.label, balance: acc.balance, change: acc.change, positive: acc.positive });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.label || !form.balance) { toast.error("Label and balance are required"); return; }
    setAccounts(prev => prev.map(a => a.id === editItem!.id ? { ...a, ...form } : a));
    toast.success("Account updated");
    setDialogOpen(false);
    setEditItem(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="bg-card rounded-lg p-5 border border-border vintage-shadow hover:vintage-shadow-md transition-shadow duration-300 group relative"
          >
            {isAdmin && (
              <button
                onClick={() => openEdit(acc)}
                className="absolute top-3 right-3 p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-secondary text-muted-foreground hover:text-foreground"
              >
                <Pencil size={13} />
              </button>
            )}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center text-primary">
                <acc.icon size={18} />
              </div>
              <p className="text-sm text-muted-foreground font-body">{acc.label}</p>
            </div>
            <p className="text-xl font-heading text-foreground">{acc.balance}</p>
            <p className={`text-xs font-body mt-1 ${acc.positive ? "text-primary" : "text-destructive"}`}>
              {acc.change} this month
            </p>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Account</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Label" value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} />
            <Input placeholder="Balance (e.g. $45,230)" value={form.balance} onChange={e => setForm({ ...form, balance: e.target.value })} />
            <Input placeholder="Change (e.g. +$2,100)" value={form.change} onChange={e => setForm({ ...form, change: e.target.value })} />
            <div className="flex items-center gap-2">
              <input type="checkbox" id="positive" checked={form.positive} onChange={e => setForm({ ...form, positive: e.target.checked })} />
              <label htmlFor="positive" className="text-sm font-body text-muted-foreground">Positive change</label>
            </div>
            <Button className="w-full" onClick={handleSave}>Update</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccountCards;