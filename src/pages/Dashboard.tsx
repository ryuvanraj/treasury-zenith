import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, ExternalLink, TrendingUp } from "lucide-react";
import DashboardNavigation from "@/components/DashboardNavigation";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNavigation />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Top Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Value Locked</p>
                  <p className="text-2xl font-bold">$1,234,567</p>
                  <p className="text-xs text-success">+12.5% this month</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">24h PnL</p>
                  <p className="text-2xl font-bold text-success">+$8,420</p>
                  <p className="text-xs text-success">+0.68%</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Positions</p>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-xs text-muted-foreground">ETH, USDC</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rebalances</p>
                  <p className="text-2xl font-bold">47</p>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-chart-1/20 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-chart-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Treasury Overview - Larger Card */}
          <div className="lg:col-span-2">
            <Card className="glow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Treasury Overview
                  <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                    Active
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Pie Chart */}
                  <div className="flex items-center justify-center">
                    <div className="relative w-48 h-48">
                      <div className="absolute inset-0 rounded-full" style={{
                        background: `conic-gradient(from 0deg, hsl(var(--chart-1)) 0deg 252deg, hsl(var(--chart-2)) 252deg 360deg)`
                      }}></div>
                      <div className="absolute inset-4 rounded-full bg-card flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold">$1,234,567</div>
                          <div className="text-sm text-muted-foreground">Total Value Locked</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Current Token Allocation */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Current Token Allocation</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full bg-chart-1"></div>
                          <span className="font-medium">ETH</span>
                          <Badge variant="outline" className="text-xs">Target: 50%</Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">70%</div>
                          <div className="text-sm text-muted-foreground">$864,397</div>
                          <div className="text-xs text-orange-400">+20% over target</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full bg-chart-2"></div>
                          <span className="font-medium">USDC</span>
                          <Badge variant="outline" className="text-xs">Target: 50%</Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">30%</div>
                          <div className="text-sm text-muted-foreground">$370,170</div>
                          <div className="text-xs text-red-400">-20% under target</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border/30">
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Rebalance Needed</span>
                        <span className="text-orange-400">High Priority</span>
                      </div>
                      <div className="w-full bg-secondary/30 rounded-full h-2 mb-4">
                        <div className="bg-orange-400 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>

                    <Button className="w-full glow-button">
                      <Zap className="mr-2 h-4 w-4" />
                      Trigger Rebalance
                    </Button>
                  </div>
                </div>

                {/* Additional Treasury Details */}
                <div className="pt-6 border-t border-border/30">
                  <h3 className="text-lg font-semibold mb-4">Detailed Holdings</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">ETH Balance</span>
                        <span className="font-mono">247.12 ETH</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">ETH Price</span>
                        <span className="font-mono">$3,500.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">24h Change</span>
                        <span className="font-mono text-success">+2.4%</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">USDC Balance</span>
                        <span className="font-mono">370,170 USDC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">USDC Price</span>
                        <span className="font-mono">$1.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">24h Change</span>
                        <span className="font-mono">0.0%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Last Rebalance Status */}
            <Card className="glow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <span>Last Rebalance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Date/Time:</div>
                  <div className="font-medium">2024-01-15 14:30</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Result:</div>
                  <Badge className="bg-success/20 text-success border-success/30">Success</Badge>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Transaction:</div>
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="mr-2 h-3 w-3" />
                    View on Explorer
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Auto-Rebalance Toggle */}
            <Card className="glow-card">
              <CardHeader>
                <CardTitle>Auto-Rebalance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                    <span className="text-sm text-success">ON</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Trigger Frequency:</div>
                  <div className="font-medium">Daily</div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Risk Profile:</div>
                  <Badge variant="outline">Balanced</Badge>
                </div>

                <Button variant="outline" className="w-full">
                  Configure Settings
                </Button>
              </CardContent>
            </Card>

            {/* Live Quote Preview */}
            <Card className="glow-card">
              <CardHeader>
                <CardTitle>Live Quote (OKX DEX)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">ETH/USDC</span>
                  <span className="font-mono">$3,500</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Slippage</span>
                  <span className="text-sm">0.1%</span>
                </div>

                <div className="text-xs text-muted-foreground pt-2 border-t border-border/30">
                  Last updated: 2s ago
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;