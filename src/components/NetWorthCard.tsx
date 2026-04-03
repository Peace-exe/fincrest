import { TrendingUp } from "lucide-react";

const NetWorthCard = () => {
  return (
    <div className="gold-gradient rounded-lg p-6 vintage-shadow-md text-gold-foreground">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-body opacity-70 tracking-widest uppercase">Total Net Worth</p>
          <h2 className="text-3xl font-heading mt-1">$2,847,392</h2>
        </div>
        <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
          <TrendingUp size={22} />
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm font-body">
        <span className="bg-foreground/10 px-2 py-0.5 rounded text-xs">+12.4%</span>
        <span className="opacity-70">from last quarter</span>
      </div>
    </div>
  );
};

export default NetWorthCard;
