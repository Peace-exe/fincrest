import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, BarChart3, PieChart, Pencil, Plus, Trash2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell } from "recharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useRoleStore from "@/store/roleStore";

const portfolioHistory = [
  { month: "Oct", value: 1180000 },
  { month: "Nov", value: 1210000 },
  { month: "Dec", value: 1195000 },
  { month: "Jan", value: 1240000 },
  { month: "Feb", value: 1255000 },
  { month: "Mar", value: 1267662 },
];

const allocation = [
  { name: "Equities", value: 45, color: "hsl(152, 32%, 22%)" },
  { name: "Bonds", value: 25, color: "hsl(43, 72%, 52%)" },
  { name: "Real Estate", value: 15, color: "hsl(200, 10%, 46%)" },
  { name: "Commodities", value: 10, color: "hsl(345, 30%, 40%)" },
  { name: "Cash", value: 5, color: "hsl(40, 18%, 74%)" },
];

interface SummaryCard { id: string; label: string; value: string; change: string; positive: boolean; icon: React.ElementType; }
interface Holding { id: string; name: string; ticker: string; shares: number; price: number; change: number; value: number; }

const initialSummaryCards: SummaryCard[] = [
  { id: "1", label: "Portfolio Value", value: "$1,267,662", change: "+$12,662", positive: true, icon: DollarSign },
  { id: "2", label: "Total Return", value: "+$187,662", change: "+17.4%", positive: true, icon: TrendingUp },
  { id: "3", label: "Monthly Change", value: "+$12,662", change: "+1.01%", positive: true, icon: BarChart3 },
  { id: "4", label: "Dividend Income", value: "$3,840/mo", change: "+$240", positive: true, icon: PieChart },
];

const initialHoldings: Holding[] = [
  { id: "1", name: "Berkshire Hathaway B", ticker: "BRK.B", shares: 120, price: 412.50, change: 2.3, value: 49500 },
  { id: "2", name: "Vanguard Total Stock", ticker: "VTI", shares: 450, price: 268.80, change: 1.1, value: 120960 },
  { id: "3", name: "iShares Gold Trust", ticker: "IAU", shares: 800, price: 45.20, change: -0.4, value: 36160 },
  { id: "4", name: "Prologis Inc", ticker: "PLD", shares: 300, price: 128.90, change: 0.8, value: 38670 },
  { id: "5", name: "US Treasury Bond ETF", ticker: "TLT", shares: 500, price: 92.40, change: -0.2, value: 46200 },
  { id: "6", name: "Apple Inc", ticker: "AAPL", shares: 200, price: 178.60, change: 1.5, value: 35720 },
  { id: "7", name: "Johnson & Johnson", ticker: "JNJ", shares: 180, price: 156.30, change: -0.6, value: 28134 },
];

const emptyHoldingForm = { name: "", ticker: "", shares: "", price: "", change: "", value: "" };

const Investments = () => {
  const isAdmin = useRoleStore((state) => state.role) === "admin";

  // Summary cards state
  const [summaryCards, setSummaryCards] = useState<SummaryCard[]>(initialSummaryCards);
  const [cardDialogOpen, setCardDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<SummaryCard | null>(null);
  const [cardForm, setCardForm] = useState({ label: "", value: "", change: "", positive: true });

  // Holdings state
  const [holdings, setHoldings] = useState<Holding[]>(initialHoldings);
  const [holdingDialogOpen, setHoldingDialogOpen] = useState(false);
  const [editingHolding, setEditingHolding] = useState<Holding | null>(null);
  const [holdingForm, setHoldingForm] = useState(emptyHoldingForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Summary card handlers
  const openEditCard = (card: SummaryCard) => {
    setEditingCard(card);
    setCardForm({ label: card.label, value: card.value, change: card.change, positive: card.positive });
    setCardDialogOpen(true);
  };

  const handleSaveCard = () => {
    if (!cardForm.label || !cardForm.value) { toast.error("Label and value are required"); return; }
    setSummaryCards(prev => prev.map(c => c.id === editingCard!.id ? { ...c, ...cardForm } : c));
    toast.success("Card updated");
    setCardDialogOpen(false);
    setEditingCard(null);
  };

  // Holdings handlers
  const openAddHolding = () => {
    setEditingHolding(null);
    setHoldingForm(emptyHoldingForm);
    setHoldingDialogOpen(true);
  };

  const openEditHolding = (h: Holding) => {
    setEditingHolding(h);
    setHoldingForm({ name: h.name, ticker: h.ticker, shares: String(h.shares), price: String(h.price), change: String(h.change), value: String(h.value) });
    setHoldingDialogOpen(true);
  };

  const handleSaveHolding = () => {
    if (!holdingForm.name || !holdingForm.ticker) { toast.error("Name and ticker are required"); return; }
    const entry: Omit<Holding, "id"> = {
      name: holdingForm.name,
      ticker: holdingForm.ticker,
      shares: Number(holdingForm.shares) || 0,
      price: Number(holdingForm.price) || 0,
      change: Number(holdingForm.change) || 0,
      value: Number(holdingForm.value) || 0,
    };
    if (editingHolding) {
      setHoldings(prev => prev.map(h => h.id === editingHolding.id ? { ...h, ...entry } : h));
      toast.success("Holding updated");
    } else {
      setHoldings(prev => [...prev, { id: crypto.randomUUID(), ...entry }]);
      toast.success("Holding added");
    }
    setHoldingDialogOpen(false);
    setEditingHolding(null);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setHoldings(prev => prev.filter(h => h.id !== deleteId));
    toast.success("Holding deleted");
    setDeleteId(null);
  };

  return (
    <main>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryCards.map((card) => (
          <div key={card.id} className="bg-card rounded-lg p-5 border border-border vintage-shadow group relative">
            {isAdmin && (
              <button
                onClick={() => openEditCard(card)}
                className="absolute top-3 right-3 p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-secondary text-muted-foreground hover:text-foreground"
              >
                <Pencil size={13} />
              </button>
            )}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center text-primary">
                <card.icon size={18} />
              </div>
              <p className="text-sm text-muted-foreground font-body">{card.label}</p>
            </div>
            <p className="text-xl font-heading text-foreground">{card.value}</p>
            <p className={`text-xs font-body mt-1 ${card.positive ? "text-primary" : "text-destructive"}`}>
              {card.change}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card rounded-lg border border-border vintage-shadow">
          <div className="p-5 border-b border-border">
            <h3 className="font-heading text-lg text-foreground">Portfolio Performance</h3>
            <p className="text-xs text-muted-foreground mt-1 font-body">6-month trend</p>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={portfolioHistory}>
                <defs>
                  <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(152, 32%, 22%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(152, 32%, 22%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 18%, 84%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(200, 10%, 46%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(200, 10%, 46%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000000).toFixed(2)}M`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(40, 40%, 98%)", border: "1px solid hsl(40, 18%, 84%)", borderRadius: "6px", fontSize: "12px" }}
                  formatter={(value) => typeof value !== "number" ? ["", ""] : [`$${value.toLocaleString()}`, "Value"]}
                />
                <Area type="monotone" dataKey="value" stroke="hsl(152, 32%, 22%)" fill="url(#portfolioGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border vintage-shadow">
          <div className="p-5 border-b border-border">
            <h3 className="font-heading text-lg text-foreground">Asset Allocation</h3>
            <p className="text-xs text-muted-foreground mt-1 font-body">Current distribution</p>
          </div>
          <div className="p-5 flex items-center gap-6">
            <ResponsiveContainer width="50%" height={200}>
              <RechartsPie>
                <Pie data={allocation} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                  {allocation.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(40, 40%, 98%)", border: "1px solid hsl(40, 18%, 84%)", borderRadius: "6px", fontSize: "12px" }}
                  formatter={(value) => typeof value !== "number" ? ["", ""] : [`${value}%`, ""]}
                />
              </RechartsPie>
            </ResponsiveContainer>
            <div className="space-y-3">
              {allocation.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-foreground font-body">{item.name}</span>
                  <span className="text-xs text-muted-foreground font-body ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-card rounded-lg border border-border vintage-shadow mb-6">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-heading text-lg text-foreground">Holdings</h3>
            <p className="text-xs text-muted-foreground mt-1 font-body">Current positions</p>
          </div>
          {isAdmin && (
            <Button size="sm" onClick={openAddHolding} className="gap-1.5">
              <Plus size={14} /> Add
            </Button>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-xs font-body text-muted-foreground font-medium">Name</th>
                <th className="text-left p-4 text-xs font-body text-muted-foreground font-medium">Ticker</th>
                <th className="text-right p-4 text-xs font-body text-muted-foreground font-medium">Shares</th>
                <th className="text-right p-4 text-xs font-body text-muted-foreground font-medium">Price</th>
                <th className="text-right p-4 text-xs font-body text-muted-foreground font-medium">Change</th>
                <th className="text-right p-4 text-xs font-body text-muted-foreground font-medium">Value</th>
                {isAdmin && <th className="p-4" />}
              </tr>
            </thead>
            <tbody>
              {holdings.map((h) => (
                <tr key={h.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors group">
                  <td className="p-4 text-sm font-body text-foreground">{h.name}</td>
                  <td className="p-4 text-sm font-heading text-primary">{h.ticker}</td>
                  <td className="p-4 text-sm font-body text-foreground text-right">{h.shares}</td>
                  <td className="p-4 text-sm font-body text-foreground text-right">${h.price.toFixed(2)}</td>
                  <td className="p-4 text-right">
                    <span className={`inline-flex items-center gap-1 text-xs font-body ${h.change >= 0 ? "text-primary" : "text-destructive"}`}>
                      {h.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {h.change >= 0 ? "+" : ""}{h.change}%
                    </span>
                  </td>
                  <td className="p-4 text-sm font-heading text-foreground text-right">${h.value.toLocaleString()}</td>
                  {isAdmin && (
                    <td className="p-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                        <button onClick={() => openEditHolding(h)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"><Pencil size={13} /></button>
                        <button onClick={() => setDeleteId(h.id)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-destructive"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Summary Card Dialog */}
      <Dialog open={cardDialogOpen} onOpenChange={setCardDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Card</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Label" value={cardForm.label} onChange={e => setCardForm({ ...cardForm, label: e.target.value })} />
            <Input placeholder="Value (e.g. $1,267,662)" value={cardForm.value} onChange={e => setCardForm({ ...cardForm, value: e.target.value })} />
            <Input placeholder="Change (e.g. +$12,662)" value={cardForm.change} onChange={e => setCardForm({ ...cardForm, change: e.target.value })} />
            <div className="flex items-center gap-2">
              <input type="checkbox" id="card-positive" checked={cardForm.positive} onChange={e => setCardForm({ ...cardForm, positive: e.target.checked })} />
              <label htmlFor="card-positive" className="text-sm font-body text-muted-foreground">Positive change</label>
            </div>
            <Button className="w-full" onClick={handleSaveCard}>Update</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add / Edit Holding Dialog */}
      <Dialog open={holdingDialogOpen} onOpenChange={setHoldingDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingHolding ? "Edit Holding" : "Add Holding"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Name" value={holdingForm.name} onChange={e => setHoldingForm({ ...holdingForm, name: e.target.value })} />
            <Input placeholder="Ticker" value={holdingForm.ticker} onChange={e => setHoldingForm({ ...holdingForm, ticker: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Shares" type="number" value={holdingForm.shares} onChange={e => setHoldingForm({ ...holdingForm, shares: e.target.value })} />
              <Input placeholder="Price ($)" type="number" value={holdingForm.price} onChange={e => setHoldingForm({ ...holdingForm, price: e.target.value })} />
              <Input placeholder="Change (%)" type="number" value={holdingForm.change} onChange={e => setHoldingForm({ ...holdingForm, change: e.target.value })} />
              <Input placeholder="Value ($)" type="number" value={holdingForm.value} onChange={e => setHoldingForm({ ...holdingForm, value: e.target.value })} />
            </div>
            <Button className="w-full" onClick={handleSaveHolding}>{editingHolding ? "Update" : "Add"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Holding?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default Investments;