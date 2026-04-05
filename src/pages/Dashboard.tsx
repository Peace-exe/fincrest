import { Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import NetWorthCard from "@/components/NetWorthCard";
import AccountCards from "@/components/AccountCards";
import RecentTransactions from "@/components/RecentTransactions";
import BudgetOverview from "@/components/BudgetOverview";
import SpendingChart from "@/components/SpendingChart";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import InsightsSection from "@/components/InsightsSection";
import SpendingBreakdown from "@/components/SpendingBreakdown";
import Investments from "@/components/Investments";
import Settings from "@/components/Settings";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const [activeTab, setActiveTab] = useState("Overview");
  
  return (
    <div className="min-h-screen bg-background">

      {/* Background image — bottom right */}
<div className="fixed bottom-4 right-4 z-0 pointer-events-none select-none">
  <img
    src="/watch2.png"
    alt=""
    className="w-50 opacity-15 mix-blend-multiply dark:mix-blend-screen"
  />
</div>

      <Sidebar activeTab = {activeTab} onTabChange={setActiveTab}/>

      <main className="ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-heading text-foreground">Good Afternoon, James</h1>
            <p className="text-sm text-muted-foreground font-body mt-1">
              Here's your financial overview for March 2024
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors vintage-shadow">
              <Bell size={18} />
            </button>
            <button
              onClick={handleLogout}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors vintage-shadow"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        <div className="mb-6">
          {activeTab === "Overview" && <NetWorthCard />} 
        </div>

        <div className="mb-6">
          {activeTab === "Accounts" && <AccountCards />}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {activeTab === "Budgets" && <SpendingChart />} 
          {activeTab === "Budgets" && <SpendingBreakdown />} 
        </div>
        <div className="mb-6">
          {activeTab === "Budgets" && <BudgetOverview />}
        </div>
        <div className="mb-6">
        {activeTab === "Transactions" && <RecentTransactions/>}
        </div>
        <div className="mb-6">
          {activeTab === "Insights" && <InsightsSection/>}
        </div>
        <div className="mb-6">
          {activeTab === "Investments" && <Investments/>}
        </div>
        <div>
          {activeTab === "Settings" && <Settings/>}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
