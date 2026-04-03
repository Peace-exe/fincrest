import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

const transactions = [
  { name: "Claridge's Hotel", category: "Hospitality", amount: "-$1,240", date: "Mar 28", type: "expense" },
  { name: "Quarterly Dividend", category: "Investment Income", amount: "+$8,400", date: "Mar 27", type: "income" },
  { name: "Savile Row Tailors", category: "Personal", amount: "-$3,800", date: "Mar 25", type: "expense" },
  { name: "Property Rental", category: "Real Estate", amount: "+$12,000", date: "Mar 24", type: "income" },
  { name: "Christie's Auction", category: "Art & Antiques", amount: "-$24,500", date: "Mar 22", type: "expense" },
  { name: "Bond Coupon Payment", category: "Fixed Income", amount: "+$2,150", date: "Mar 20", type: "income" },
  { name: "Wine Cellar Society", category: "Membership", amount: "-$850", date: "Mar 18", type: "expense" },
];

const RecentTransactions = () => {
  return (
    <div className="bg-card rounded-lg border border-border vintage-shadow">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h3 className="font-heading text-lg text-foreground">Recent Transactions</h3>
        <button className="text-xs text-muted-foreground font-body tracking-widest uppercase hover:text-foreground transition-colors">
          View All
        </button>
      </div>
      <div className="divide-y divide-border">
        {transactions.map((tx, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-5 py-4 hover:bg-secondary/50 transition-colors"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                tx.type === "income" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
              }`}>
                {tx.type === "income" ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
              </div>
              <div>
                <p className="text-sm font-body text-foreground">{tx.name}</p>
                <p className="text-xs text-muted-foreground">{tx.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-body ${tx.type === "income" ? "text-primary" : "text-foreground"}`}>
                {tx.amount}
              </p>
              <p className="text-xs text-muted-foreground">{tx.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
