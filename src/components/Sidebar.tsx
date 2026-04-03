import { LayoutDashboard, ArrowLeftRight, PieChart, Wallet, Settings, TrendingUp, LogOut } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: ArrowLeftRight, label: "Transactions" },
  { icon: PieChart, label: "Budgets" },
  { icon: Wallet, label: "Accounts" },
  { icon: TrendingUp, label: "Investments" },
  { icon: Settings, label: "Settings" },
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 forest-gradient flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-heading tracking-wide text-sidebar-foreground">
          <span className="text-sidebar-primary">Heritage</span> Finance
        </h1>
        <p className="text-xs text-sidebar-foreground/50 mt-1 font-body tracking-widest uppercase">
          Est. 1887
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-body transition-all duration-200 ${
              item.active
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            }`}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-primary text-xs font-heading">
            JR
          </div>
          <div className="flex-1">
            <p className="text-sm text-sidebar-foreground">James Rothwell</p>
            <p className="text-xs text-sidebar-foreground/50">Premium Member</p>
          </div>
          <LogOut size={16} className="text-sidebar-foreground/40" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
