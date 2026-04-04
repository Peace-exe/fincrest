import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Hospitality", value: 8200, color: "hsl(43, 72%, 52%)" },
  { name: "Personal", value: 6400, color: "hsl(152, 32%, 32%)" },
  { name: "Art & Antiques", value: 24500, color: "hsl(200, 10%, 46%)" },
  { name: "Membership", value: 3200, color: "hsl(20, 50%, 50%)" },
  { name: "Real Estate", value: 12000, color: "hsl(152, 32%, 22%)" },
  { name: "Dining", value: 4800, color: "hsl(43, 50%, 65%)" },
];

const total = data.reduce((s, d) => s + d.value, 0);

const SpendingBreakdown = () => {
  return (
    <div className="bg-card rounded-lg border border-border vintage-shadow">
      <div className="p-5 border-b border-border">
        <h3 className="font-heading text-lg text-foreground">Spending Breakdown</h3>
        <p className="text-xs text-muted-foreground mt-1 font-body">By category this month</p>
      </div>
      <div className="p-5 flex flex-col lg:flex-row items-center gap-6">
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                strokeWidth={2}
                stroke="hsl(40, 40%, 98%)"
              >
                {data.map((entry, i) => (
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
                formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-3 w-full">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-body text-foreground">{item.name}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-body text-foreground">
                  ${item.value.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground ml-2">
                  {((item.value / total) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingBreakdown;
