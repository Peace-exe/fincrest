import { Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";

const insights = [
  {
    icon: AlertTriangle,
    title: "Highest Spending Category",
    description:
      "Art & Antiques accounts for 41% of your spending this month at $24,500 — significantly above your 3-month average of $12,000.",
    type: "warning" as const,
  },
  {
    icon: TrendingUp,
    title: "Monthly Comparison",
    description:
      "Your income increased 24% compared to February ($50,000 → $62,000), while expenses grew only 12% ($34,000 → $38,000). Net savings improved by $14,000.",
    type: "positive" as const,
  },
  {
    icon: Lightbulb,
    title: "Savings Observation",
    description:
      "You're saving 39% of your income this month — your best ratio in 6 months. At this rate, your projected annual savings would exceed $288,000.",
    type: "info" as const,
  },
];

const typeStyles = {
  warning: "bg-destructive/10 text-destructive",
  positive: "bg-primary/10 text-primary",
  info: "bg-accent/20 text-accent-foreground",
};

const InsightsSection = () => {
  return (
    <div className="bg-card rounded-lg border border-border vintage-shadow">
      <div className="p-5 border-b border-border">
        <h3 className="font-heading text-lg text-foreground">Insights</h3>
        <p className="text-xs text-muted-foreground mt-1 font-body">
          Key observations from your financial data
        </p>
      </div>
      <div className="divide-y divide-border">
        {insights.map((insight, i) => (
          <div key={i} className="p-5 flex items-start gap-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${typeStyles[insight.type]}`}
            >
              <insight.icon size={18} />
            </div>
            <div>
              <p className="text-sm font-heading text-foreground mb-1">{insight.title}</p>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                {insight.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsSection;
