import { Building2, CreditCard, Landmark, BarChart3 } from "lucide-react";

const accounts = [
  { icon: Building2, label: "Checking", balance: "$45,230", change: "+$2,100", positive: true },
  { icon: CreditCard, label: "Savings", balance: "$284,500", change: "+$8,400", positive: true },
  { icon: Landmark, label: "Trust Fund", balance: "$1,250,000", change: "+$32,000", positive: true },
  { icon: BarChart3, label: "Investments", balance: "$1,267,662", change: "-$4,200", positive: false },
];

const AccountCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {accounts.map((acc) => (
        <div
          key={acc.label}
          className="bg-card rounded-lg p-5 border border-border vintage-shadow hover:vintage-shadow-md transition-shadow duration-300"
        >
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
  );
};

export default AccountCards;
