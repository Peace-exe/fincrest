import { Bell, LogOut, TrendingUp, TrendingDown, DollarSign, BarChart3, PieChart } from "lucide-react";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell } from "recharts";



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

const holdings = [
  { name: "Berkshire Hathaway B", ticker: "BRK.B", shares: 120, price: 412.50, change: +2.3, value: 49500 },
  { name: "Vanguard Total Stock", ticker: "VTI", shares: 450, price: 268.80, change: +1.1, value: 120960 },
  { name: "iShares Gold Trust", ticker: "IAU", shares: 800, price: 45.20, change: -0.4, value: 36160 },
  { name: "Prologis Inc", ticker: "PLD", shares: 300, price: 128.90, change: +0.8, value: 38670 },
  { name: "US Treasury Bond ETF", ticker: "TLT", shares: 500, price: 92.40, change: -0.2, value: 46200 },
  { name: "Apple Inc", ticker: "AAPL", shares: 200, price: 178.60, change: +1.5, value: 35720 },
  { name: "Johnson & Johnson", ticker: "JNJ", shares: 180, price: 156.30, change: -0.6, value: 28134 },
];

const summaryCards = [
  { label: "Portfolio Value", value: "$1,267,662", change: "+$12,662", positive: true, icon: DollarSign },
  { label: "Total Return", value: "+$187,662", change: "+17.4%", positive: true, icon: TrendingUp },
  { label: "Monthly Change", value: "+$12,662", change: "+1.01%", positive: true, icon: BarChart3 },
  { label: "Dividend Income", value: "$3,840/mo", change: "+$240", positive: true, icon: PieChart },
];

const Investments = () => {
  

  return (
    <main>
      

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryCards.map((card) => (
          <div key={card.label} className="bg-card rounded-lg p-5 border border-border vintage-shadow">
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
        {/* Portfolio Performance */}
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
                  contentStyle={{
                    backgroundColor: "hsl(40, 40%, 98%)",
                    border: "1px solid hsl(40, 18%, 84%)",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontFamily: "Inter",
                  }}
                  formatter={(value) => {
                    if (typeof value !== "number") return ["", ""];
                    return [`$${value.toLocaleString()}`, "Value"];
                  }}
                />
                <Area type="monotone" dataKey="value" stroke="hsl(152, 32%, 22%)" fill="url(#portfolioGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Asset Allocation */}
        <div className="bg-card rounded-lg border border-border vintage-shadow">
          <div className="p-5 border-b border-border">
            <h3 className="font-heading text-lg text-foreground">Asset Allocation</h3>
            <p className="text-xs text-muted-foreground mt-1 font-body">Current distribution</p>
          </div>
          <div className="p-5 flex items-center gap-6">
            <ResponsiveContainer width="50%" height={200}>
              <RechartsPie>
                <Pie data={allocation} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                  {allocation.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(40, 40%, 98%)",
                    border: "1px solid hsl(40, 18%, 84%)",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontFamily: "Inter",
                  }}
                  formatter={(value) => {
                    if (typeof value !== "number") return ["", ""];
                    return [`${value}%`, ""];
                  }}
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
        <div className="p-5 border-b border-border">
          <h3 className="font-heading text-lg text-foreground">Holdings</h3>
          <p className="text-xs text-muted-foreground mt-1 font-body">Current positions</p>
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
              </tr>
            </thead>
            <tbody>
              {holdings.map((h) => (
                <tr key={h.ticker} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Investments;