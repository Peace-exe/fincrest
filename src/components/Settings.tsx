import { useState } from "react";
import { User, Shield, Save } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import useRoleStore from "@/store/roleStore"; // 👈 import store

const Settings = () => {
  const { userEmail } = useAuth();
  const { toast } = useToast();

  const [name, setName] = useState("James Rothwell");
  const [email, setEmail] = useState(userEmail || "james@heritage.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");

  const role = useRoleStore((state) => state.role);         // 👈 read from store
  const setRole = useRoleStore((state) => state.setRole);   // 👈 write to store

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your account details have been updated successfully.",
    });
  };

  return (
    <main>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Details */}
        <Card className="border-border bg-card vintage-shadow">
          <CardHeader className="flex flex-row items-center gap-3 pb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User size={18} className="text-primary" />
            </div>
            <CardTitle className="text-lg font-heading text-foreground">
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-body text-muted-foreground">
                Full Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-border bg-background font-body"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-body text-muted-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-border bg-background font-body"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-body text-muted-foreground">
                Phone Number
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border-border bg-background font-body"
              />
            </div>
            <Button onClick={handleSave} className="w-full gap-2">
              <Save size={16} />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Role Switcher */}
        <Card className="border-border bg-card vintage-shadow">
          <CardHeader className="flex flex-row items-center gap-3 pb-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Shield size={18} className="text-accent" />
            </div>
            <CardTitle className="text-lg font-heading text-foreground">
              Role & Permissions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label className="text-sm font-body text-muted-foreground">
                Current Role
              </Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="border-border bg-background font-body">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border border-border bg-muted/50 p-4 space-y-2">
              <p className="text-sm font-heading text-foreground">
                {role === "admin" ? "Administrator" : "Standard User"}
              </p>
              <p className="text-xs font-body text-muted-foreground leading-relaxed">
                {role === "admin"
                  ? "Full access to all features including CRUD operations on data."
                  : "Access to personal dashboard, transactions, investments, and account settings."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Settings;