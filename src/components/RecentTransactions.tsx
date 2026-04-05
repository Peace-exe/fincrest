import { useState, useMemo } from "react";
import { ArrowUpRight, ArrowDownLeft, Search, SlidersHorizontal, Plus, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import useRoleStore from "@/store/roleStore";

export interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  type: "income" | "expense";
}

const defaultTransactions: Transaction[] = [
  { id: "1", name: "Claridge's Hotel", category: "Hospitality", amount: -1240, date: "Mar 28", type: "expense" },
  { id: "2", name: "Quarterly Dividend", category: "Investment Income", amount: 8400, date: "Mar 27", type: "income" },
  { id: "3", name: "Savile Row Tailors", category: "Personal", amount: -3800, date: "Mar 25", type: "expense" },
  { id: "4", name: "Property Rental", category: "Real Estate", amount: 12000, date: "Mar 24", type: "income" },
  { id: "5", name: "Christie's Auction", category: "Art & Antiques", amount: -24500, date: "Mar 22", type: "expense" },
  { id: "6", name: "Bond Coupon Payment", category: "Fixed Income", amount: 2150, date: "Mar 20", type: "income" },
  { id: "7", name: "Wine Cellar Society", category: "Membership", amount: -850, date: "Mar 18", type: "expense" },
];

const categoryOptions = ["Hospitality", "Investment Income", "Personal", "Real Estate", "Art & Antiques", "Fixed Income", "Membership", "Food & Dining", "Transport", "Utilities", "Entertainment", "Other"];

const RecentTransactions = () => {
  const isAdmin = useRoleStore((state) => state.role) === "admin";

  const [transactions, setTransactions] = useState<Transaction[]>(defaultTransactions);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Transaction | null>(null);

  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("Other");
  const [formAmount, setFormAmount] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formType, setFormType] = useState<"income" | "expense">("expense");

  const { toast } = useToast();

  const categories = useMemo(() => [...new Set(transactions.map((t) => t.category))], [transactions]);

  const filtered = useMemo(() => {
    let result = [...transactions];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((t) => t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
    }
    if (filterType !== "all") result = result.filter((t) => t.type === filterType);
    if (filterCategory !== "all") result = result.filter((t) => t.category === filterCategory);
    result.sort((a, b) => {
      if (sortBy === "amount-asc") return a.amount - b.amount;
      if (sortBy === "amount-desc") return b.amount - a.amount;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
    return result;
  }, [search, sortBy, filterType, filterCategory, transactions]);

  const openAdd = () => {
    setEditingTx(null);
    setFormName("");
    setFormCategory("Other");
    setFormAmount("");
    setFormDate("");
    setFormType("expense");
    setIsFormOpen(true);
  };

  const openEdit = (tx: Transaction) => {
    setEditingTx(tx);
    setFormName(tx.name);
    setFormCategory(tx.category);
    setFormAmount(String(Math.abs(tx.amount)));
    setFormDate(tx.date);
    setFormType(tx.type);
    setIsFormOpen(true);
  };

  const handleSave = () => {
    const trimmedName = formName.trim();
    const parsedAmount = parseFloat(formAmount);
    if (!trimmedName || isNaN(parsedAmount) || parsedAmount <= 0 || !formDate.trim()) {
      toast({ title: "Validation Error", description: "Please fill all fields with valid values.", variant: "destructive" });
      return;
    }
    const amount = formType === "expense" ? -parsedAmount : parsedAmount;
    if (editingTx) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editingTx.id
            ? { ...t, name: trimmedName, category: formCategory, amount, date: formDate.trim(), type: formType }
            : t
        )
      );
      toast({ title: "Transaction Updated", description: `"${trimmedName}" has been updated.` });
    } else {
      const newTx: Transaction = {
        id: crypto.randomUUID(),
        name: trimmedName,
        category: formCategory,
        amount,
        date: formDate.trim(),
        type: formType,
      };
      setTransactions((prev) => [newTx, ...prev]);
      toast({ title: "Transaction Added", description: `"${trimmedName}" has been added.` });
    }
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setTransactions((prev) => prev.filter((t) => t.id !== deleteTarget.id));
    toast({ title: "Transaction Deleted", description: `"${deleteTarget.name}" has been removed.` });
    setDeleteTarget(null);
  };

  return (
    <>
      <div className="bg-card rounded-lg border border-border vintage-shadow">
        <div className="p-5 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-lg text-foreground">Recent Transactions</h3>
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Button size="sm" onClick={openAdd} className="gap-1.5">
                  <Plus size={14} /> Add
                </Button>
              )}
              <button className="text-xs text-muted-foreground font-body tracking-widest uppercase hover:text-foreground transition-colors">
                View All
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-sm bg-secondary/50 border-border"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[130px] h-9 text-sm bg-secondary/50">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[160px] h-9 text-sm bg-secondary/50">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px] h-9 text-sm bg-secondary/50">
                <SlidersHorizontal size={14} className="mr-1" />
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="amount-desc">Amount (High)</SelectItem>
                <SelectItem value="amount-asc">Amount (Low)</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="divide-y divide-border">
          {filtered.length === 0 && (
            <div className="px-5 py-8 text-center text-sm text-muted-foreground font-body">
              No transactions found.
            </div>
          )}
          {filtered.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between px-5 py-4 hover:bg-secondary/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    tx.type === "income"
                      ? "bg-primary/10 text-primary"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {tx.type === "income" ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                </div>
                <div>
                  <p className="text-sm font-body text-foreground">{tx.name}</p>
                  <p className="text-xs text-muted-foreground">{tx.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={`text-sm font-body ${tx.type === "income" ? "text-primary" : "text-foreground"}`}>
                    {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
                {isAdmin && (
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(tx)}>
                      <Pencil size={13} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setDeleteTarget(tx)}>
                      <Trash2 size={13} />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingTx ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
            <DialogDescription>
              {editingTx ? "Update the transaction details below." : "Fill in the details to add a new transaction."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="tx-name">Name</Label>
              <Input id="tx-name" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Transaction name" maxLength={100} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Type</Label>
                <Select value={formType} onValueChange={(v) => setFormType(v as "income" | "expense")}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tx-amount">Amount ($)</Label>
                <Input id="tx-amount" type="number" min="0" value={formAmount} onChange={(e) => setFormAmount(e.target.value)} placeholder="0.00" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Category</Label>
                <Select value={formCategory} onValueChange={setFormCategory}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tx-date">Date</Label>
                <Input id="tx-date" value={formDate} onChange={(e) => setFormDate(e.target.value)} placeholder="e.g. Mar 28" maxLength={20} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingTx ? "Update" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteTarget?.name}"? This action cannot be undone.
            </AlertDialogDescription>
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

export default RecentTransactions;