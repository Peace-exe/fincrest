import { useState } from "react";
import { TrendingUp, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useRoleStore from "@/store/roleStore";

const NetWorthCard = () => {
  const isAdmin = useRoleStore((state) => state.role) === "admin";

  const [dialogOpen, setDialogOpen] = useState(false);
  const [data, setData] = useState({ worth: "$2,847,392", change: "+12.4%", label: "from last quarter" });
  const [form, setForm] = useState(data);

  const handleSave = () => {
    if (!form.worth) { toast.error("Net worth is required"); return; }
    setData(form);
    toast.success("Net worth updated");
    setDialogOpen(false);
  };

  return (
    <>
      <div className="gold-gradient rounded-lg p-6 vintage-shadow-md text-gold-foreground group relative">
        {isAdmin && (
          <button
            onClick={() => { setForm(data); setDialogOpen(true); }}
            className="absolute top-4 right-4 p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity bg-foreground/10 hover:bg-foreground/20"
          >
            <Pencil size={13} />
          </button>
        )}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-body opacity-70 tracking-widest uppercase">Total Net Worth</p>
            <h2 className="text-3xl font-heading mt-1">{data.worth}</h2>
          </div>
          <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
            <TrendingUp size={22} />
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-body">
          <span className="bg-foreground/10 px-2 py-0.5 rounded text-xs">{data.change}</span>
          <span className="opacity-70">{data.label}</span>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Net Worth</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Net worth (e.g. $2,847,392)" value={form.worth} onChange={e => setForm({ ...form, worth: e.target.value })} />
            <Input placeholder="Change (e.g. +12.4%)" value={form.change} onChange={e => setForm({ ...form, change: e.target.value })} />
            <Input placeholder="Label (e.g. from last quarter)" value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} />
            <Button className="w-full" onClick={handleSave}>Update</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NetWorthCard;