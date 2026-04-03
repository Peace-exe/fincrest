import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Oct", income: 42000, expenses: 28000 },
  { month: "Nov", income: 48000, expenses: 32000 },
  { month: "Dec", income: 55000, expenses: 45000 },
  { month: "Jan", income: 44000, expenses: 30000 },
  { month: "Feb", income: 50000, expenses: 34000 },
  { month: "Mar", income: 62000, expenses: 38000 },
];

const SpendingChart = () => {
  return (
    <div className="bg-card rounded-lg border border-border vintage-shadow">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-heading text-lg text-foreground">Cash Flow</h3>
          <p className="text-xs text-muted-foreground mt-1 font-body">6-month overview</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-body">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="text-muted-foreground">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="text-muted-foreground">Expenses</span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(152, 32%, 22%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(152, 32%, 22%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(43, 72%, 52%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(43, 72%, 52%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 18%, 84%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(200, 10%, 46%)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(200, 10%, 46%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(40, 40%, 98%)",
                border: "1px solid hsl(40, 18%, 84%)",
                borderRadius: "6px",
                fontSize: "12px",
                fontFamily: "Inter",
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
            />
            <Area type="monotone" dataKey="income" stroke="hsl(152, 32%, 22%)" fill="url(#incomeGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="expenses" stroke="hsl(43, 72%, 52%)" fill="url(#expenseGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingChart;
