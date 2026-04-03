import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <Link to="/" className="font-heading text-lg text-foreground">
              <span className="text-accent">Heritage</span> Finance
            </Link>
          </div>
          <h2 className="text-2xl font-heading text-foreground mb-2">Welcome Back</h2>
          <p className="text-sm text-muted-foreground font-body mb-8">
            Sign in to access your portfolio
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-body">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="james@heritage.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-card"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-body">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-card"
              />
            </div>
            <Button type="submit" variant="default" className="w-full" size="lg">
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground font-body">
            Don't have an account?{" "}
            <Link to="/signup" className="text-accent hover:underline">Create one</Link>
          </p>
        </div>
      </div>

      {/* Right - Decorative */}
      <div className="hidden lg:flex flex-1 forest-gradient items-center justify-center p-12">
        <div className="max-w-md text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-primary-foreground/50 mb-4 font-body">Est. 1887</p>
          <h2 className="text-4xl font-heading text-primary-foreground leading-tight mb-4">
            Your Legacy,{" "}
            <span className="italic text-sidebar-primary">Protected</span>
          </h2>
          <p className="text-primary-foreground/60 font-body leading-relaxed">
            Prudent stewardship of wealth across generations, with the discretion and care you expect.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
