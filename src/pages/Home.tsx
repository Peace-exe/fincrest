import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Shield, BarChart3, Wallet, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const features = [
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Bank-grade security with encrypted data storage and privacy-first design.",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "Comprehensive dashboards to track your wealth and spending patterns.",
  },
  {
    icon: Wallet,
    title: "Multi-Account",
    description: "Manage checking, savings, investments, and trusts in one place.",
  },
  {
    icon: TrendingUp,
    title: "Growth Tracking",
    description: "Monitor your net worth and portfolio performance over time.",
  },
];

const Home = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section — locked to viewport height */}
      <section
        className="h-screen flex items-center justify-center px-6 relative overflow-hidden"
        style={{
          backgroundImage: "url('/heroSectionImg2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Cream wash */}
        <div className="absolute inset-0 bg-background/60" />

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-background to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center ">
          <p className="text-sm font-body tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Established 1887
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading text-foreground leading-tight mb-6">
            Wealth Management,{" "}
            <span className="text-accent italic">Refined</span>
          </h1>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto mb-10 leading-relaxed">
            A distinguished approach to personal finance. Track your assets, monitor investments,
            and manage your legacy with the elegance it deserves.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="default" size="lg" asChild>
              <Link to="/signup">
                Get Started <ArrowRight size={18} />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-card border-t border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm font-body tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Why Heritage
          </p>
          <h2 className="text-3xl font-heading text-foreground text-center mb-12">
            Built for Discerning Individuals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-lg border border-border bg-background vintage-shadow hover:vintage-shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center text-primary mb-4">
                  <f.icon size={20} />
                </div>
                <h3 className="font-heading text-lg text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading text-foreground mb-4">
            Begin Your Financial Journey
          </h2>
          <p className="text-muted-foreground font-body mb-8">
            Join a legacy of prudent financial stewardship. Your portfolio deserves nothing less.
          </p>
          <Button variant="default" size="lg" asChild>
            <Link to="/signup">
              Create Your Account <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;