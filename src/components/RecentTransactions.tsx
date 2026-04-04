import { useState, useMemo } from "react";
import { ArrowUpRight, ArrowDownLeft, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const transactions = [
  { name: "Claridge's Hotel", category: "Hospitality", amount: -1240, date: "Mar 28", type: "expense" },
  { name: "Quarterly Dividend", category: "Investment Income", amount: 8400, date: "Mar 27", type: "income" },
  { name: "Savile Row Tailors", category: "Personal", amount: -3800, date: "Mar 25", type: "expense" },
  { name: "Property Rental", category: "Real Estate", amount: 12000, date: "Mar 24", type: "income" },
  { name: "Christie's Auction", category: "Art & Antiques", amount: -24500, date: "Mar 22", type: "expense" },
  { name: "Bond Coupon Payment", category: "Fixed Income", amount: 2150, date: "Mar 20", type: "income" },
  { name: "Wine Cellar Society", category: "Membership", amount: -850, date: "Mar 18", type: "expense" },
];

const categories = [...new Set(transactions.map((t) => t.category))];

const RecentTransactions = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const filtered = useMemo(() => {
    let result = [...transactions];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) => t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
      );
    }

    if (filterType !== "all") {
      result = result.filter((t) => t.type === filterType);
    }

    if (filterCategory !== "all") {
      result = result.filter((t) => t.category === filterCategory);
    }

    result.sort((a, b) => {
      if (sortBy === "amount-asc") return a.amount - b.amount;
      if (sortBy === "amount-desc") return b.amount - a.amount;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0; // date — already in order
    });

    return result;
  }, [search, sortBy, filterType, filterCategory]);

  return (
    <div className="bg-card rounded-lg border border-border vintage-shadow">
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-lg text-foreground">Recent Transactions</h3>
          <button className="text-xs text-muted-foreground font-body tracking-widest uppercase hover:text-foreground transition-colors">
            View All
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-50">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm bg-secondary/50 border-border"
            />
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-32.5 h-9 text-sm bg-secondary/50">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40 h-9 text-sm bg-secondary/50">
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
            <SelectTrigger className="w-37.5 h-9 text-sm bg-secondary/50">
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
        {filtered.map((tx, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-5 py-4 hover:bg-secondary/50 transition-colors"
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
            <div className="text-right">
              <p
                className={`text-sm font-body ${
                  tx.type === "income" ? "text-primary" : "text-foreground"
                }`}
              >
                {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toLocaleString()}
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
