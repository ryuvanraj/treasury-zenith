import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ExternalLink, Filter, Calendar } from "lucide-react";
import DashboardNavigation from "@/components/DashboardNavigation";

const ActivityLog = () => {
  const activities = [
    {
      timestamp: "2024-07-26 14:30",
      action: "Swapped 1 ETH → 3500 USDC",
      result: "Success",
      gasUsed: "0.005 ETH",
      txHash: "0x742d...5B19"
    },
    {
      timestamp: "2024-07-26 12:15",
      action: "Transferred 1000 USDC to Project X",
      result: "Success",
      gasUsed: "0.002 ETH",
      txHash: "0xa123...7d8e"
    },
    {
      timestamp: "2024-07-26 10:00",
      action: "Swapped 0.5 ETH → 1750 USDC",
      result: "Success",
      gasUsed: "0.004 ETH",
      txHash: "0xb456...9f1a"
    },
    {
      timestamp: "2024-07-25 16:45",
      action: "Transferred 500 USDC to Marketing",
      result: "Success",
      gasUsed: "0.001 ETH",
      txHash: "0xc789...2b3c"
    },
    {
      timestamp: "2024-07-25 14:20",
      action: "Swapped 2 ETH → 7000 USDC",
      result: "Success",
      gasUsed: "0.006 ETH",
      txHash: "0xd012...4e5f"
    },
    {
      timestamp: "2024-07-25 11:55",
      action: "Transferred 2000 USDC to Development",
      result: "Success",
      gasUsed: "0.003 ETH",
      txHash: "0xe345...6g7h"
    },
    {
      timestamp: "2024-07-25 09:30",
      action: "Swapped 1.5 ETH → 5250 USDC",
      result: "Success",
      gasUsed: "0.005 ETH",
      txHash: "0xf678...8i9j"
    },
    {
      timestamp: "2024-07-24 17:10",
      action: "Transferred 750 USDC to Operations",
      result: "Success",
      gasUsed: "0.002 ETH",
      txHash: "0x1234...0k1l"
    },
    {
      timestamp: "2024-07-24 15:45",
      action: "Swapped 0.75 ETH → 2625 USDC",
      result: "Success",
      gasUsed: "0.004 ETH",
      txHash: "0x5678...2m3n"
    },
    {
      timestamp: "2024-07-24 13:20",
      action: "Transferred 1250 USDC to Community",
      result: "Success",
      gasUsed: "0.003 ETH",
      txHash: "0x9012...4o5p"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavigation />
      
      {/* Header */}
      <div className="border-b border-border/30 bg-card/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold">Activity Log</h1>
          <p className="text-muted-foreground mt-2">
            View all actions taken by the Treasurer Agent.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <Card className="glow-card mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by token" 
                  className="pl-10 bg-secondary/50"
                />
              </div>

              {/* Action Type Filter */}
              <Select defaultValue="all">
                <SelectTrigger className="w-full lg:w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="swap">Swaps</SelectItem>
                  <SelectItem value="transfer">Transfers</SelectItem>
                  <SelectItem value="rebalance">Rebalances</SelectItem>
                </SelectContent>
              </Select>

              {/* Result Type Filter */}
              <Select defaultValue="all">
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Results</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Range Filter */}
              <Select defaultValue="7days">
                <SelectTrigger className="w-full lg:w-48">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Activity Table */}
        <Card className="glow-card">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left py-4 px-6 font-medium text-muted-foreground">Timestamp</th>
                    <th className="text-left py-4 px-6 font-medium text-muted-foreground">Action</th>
                    <th className="text-left py-4 px-6 font-medium text-muted-foreground">Result</th>
                    <th className="text-left py-4 px-6 font-medium text-muted-foreground">Gas Used</th>
                    <th className="text-left py-4 px-6 font-medium text-muted-foreground">Transaction</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr key={index} className="border-b border-border/20 hover:bg-secondary/20 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-mono text-sm">{activity.timestamp}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium">{activity.action}</div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge 
                          variant="secondary" 
                          className={activity.result === 'Success' 
                            ? 'bg-success/20 text-success border-success/30' 
                            : 'bg-destructive/20 text-destructive border-destructive/30'
                          }
                        >
                          {activity.result}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-mono text-sm">{activity.gasUsed}</div>
                      </td>
                      <td className="py-4 px-6">
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          <ExternalLink className="mr-2 h-3 w-3" />
                          View on Explorer
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          <Card className="glow-card text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary mb-2">127</div>
              <div className="text-sm text-muted-foreground">Total Transactions</div>
            </CardContent>
          </Card>

          <Card className="glow-card text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-success mb-2">126</div>
              <div className="text-sm text-muted-foreground">Successful</div>
            </CardContent>
          </Card>

          <Card className="glow-card text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-destructive mb-2">1</div>
              <div className="text-sm text-muted-foreground">Failed</div>
            </CardContent>
          </Card>

          <Card className="glow-card text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold mb-2">0.847 ETH</div>
              <div className="text-sm text-muted-foreground">Total Gas Used</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;