const budgets = [
  { category: "Hospitality & Dining", spent: 4200, budget: 6000 },
  { category: "Personal & Fashion", spent: 8500, budget: 10000 },
  { category: "Art & Collectibles", spent: 24500, budget: 30000 },
  { category: "Travel & Leisure", spent: 12800, budget: 15000 },
  { category: "Memberships & Clubs", spent: 3200, budget: 5000 },
];

const BudgetOverview = () => {
  return (
    <div className="bg-card rounded-lg border border-border vintage-shadow">
      <div className="p-5 border-b border-border">
        <h3 className="font-heading text-lg text-foreground">Monthly Budget</h3>
        <p className="text-xs text-muted-foreground mt-1 font-body">March 2024</p>
      </div>
      <div className="p-5 space-y-5">
        {budgets.map((b) => {
          const pct = Math.round((b.spent / b.budget) * 100);
          const isOver = pct > 90;
          return (
            <div key={b.category}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-body text-foreground">{b.category}</p>
                <p className="text-xs text-muted-foreground font-body">
                  ${b.spent.toLocaleString()} / ${b.budget.toLocaleString()}
                </p>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isOver ? "bg-burgundy" : "bg-primary"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetOverview;
