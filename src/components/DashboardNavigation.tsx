import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, Settings, BarChart3, Activity, Shield, ArrowLeftRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const DashboardNavigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/rebalance", label: "Rebalance", icon: Settings },
    { path: "/swap", label: "Swap", icon: ArrowLeftRight },
    { path: "/activity", label: "Activity", icon: Activity },
    { path: "/governance", label: "Governance", icon: Shield },
  ];

  return (
    <nav className="border-b border-border/30 bg-card/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent"></div>
              <span className="text-xl font-bold">DAO Treasury</span>
            </Link>
            
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} to={item.path}>
                    <Button 
                      variant={isActive(item.path) ? "secondary" : "ghost"} 
                      size="sm"
                      className={isActive(item.path) ? "bg-primary/20 text-primary" : ""}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg bg-secondary/50">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <span className="text-sm font-mono">0x742d...5B19</span>
            </div>
            <Badge variant="secondary" className="bg-success/20 text-success border-success/30 hidden sm:flex">
              Connected
            </Badge>
            <Button variant="outline" size="sm">
              Disconnect
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="lg:hidden mt-4 flex items-center space-x-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path}>
                <Button 
                  variant={isActive(item.path) ? "secondary" : "ghost"} 
                  size="sm"
                  className={`whitespace-nowrap ${isActive(item.path) ? "bg-primary/20 text-primary" : ""}`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavigation;