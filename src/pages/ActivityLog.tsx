/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ExternalLink, Filter, Calendar } from "lucide-react";
import DashboardNavigation from "@/components/DashboardNavigation";
import { useState, useMemo } from "react";

interface Activity {
  timestamp: string;
  action: string;
  result: "Success" | "Failed" | "Pending";
  gasUsed: string;
  txHash: string;
  type: "swap" | "transfer" | "rebalance";
}

const ActivityLog = () => {
  // State for filters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [resultFilter, setResultFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("7days");

  const baseActivities = [
    {
      timestamp: "2024-07-26 14:30",
      action: "Swapped 1 ETH → 3500 USDC",
      result: "Success",
      gasUsed: "0.005 ETH",
      txHash: "0x742d...5B19",
      type: "swap"
    },
    {
      timestamp: "2024-07-26 12:15",
      action: "Transferred 1000 USDC to Project X",
      result: "Success",
      gasUsed: "0.002 ETH",
      txHash: "0xa123...7d8e",
      type: "transfer"
    },
    {
      timestamp: "2024-07-26 10:00",
      action: "Rebalanced Portfolio (30% USDC)",
      result: "Success",
      gasUsed: "0.008 ETH",
      txHash: "0xb456...9f1a",
      type: "rebalance"
    },
    {
      timestamp: "2024-07-25 16:45",
      action: "Transferred 500 USDC to Marketing",
      result: "Failed",
      gasUsed: "0.001 ETH",
      txHash: "0xc789...2b3c",
      type: "transfer"
    },
    {
      timestamp: "2024-07-25 14:20",
      action: "Swapped 2 ETH → 7000 USDC",
      result: "Success",
      gasUsed: "0.006 ETH",
      txHash: "0xd012...4e5f",
      type: "swap"
    },
    {
      timestamp: "2024-07-25 11:55",
      action: "Transferred 2000 USDC to Development",
      result: "Pending",
      gasUsed: "0.003 ETH",
      txHash: "0xe345...6g7h",
      type: "transfer"
    },
    {
      timestamp: "2024-07-25 09:30",
      action: "Swapped 1.5 ETH → 5250 USDC",
      result: "Success",
      gasUsed: "0.005 ETH",
      txHash: "0xf678...8i9j",
      type: "swap"
    },
    {
      timestamp: "2024-07-24 17:10",
      action: "Rebalanced Portfolio (25% USDC)",
      result: "Success",
      gasUsed: "0.007 ETH",
      txHash: "0x1234...0k1l",
      type: "rebalance"
    },
    {
      timestamp: "2024-07-24 15:45",
      action: "Swapped 0.75 ETH → 2625 USDC",
      result: "Success",
      gasUsed: "0.004 ETH",
      txHash: "0x5678...2m3n",
      type: "swap"
    },
    {
      timestamp: "2024-07-24 13:20",
      action: "Transferred 1250 USDC to Community",
      result: "Failed",
      gasUsed: "0.003 ETH",
      txHash: "0x9012...4o5p",
      type: "transfer"
    }
  ];

  // Filter activities based on current filters
  const filteredActivities = useMemo(() => {
    return baseActivities.filter(activity => {
      // Search query filter
      const matchesSearch = searchQuery === "" ||
        activity.action.toLowerCase().includes(searchQuery.toLowerCase());

      // Action type filter
      const matchesAction = actionFilter === "all" || activity.type === actionFilter;

      // Result filter
      const matchesResult = resultFilter === "all" || 
        activity.result.toLowerCase() === resultFilter.toLowerCase();

      // Date filter
      const activityDate = new Date(activity.timestamp);
      const now = new Date();
      const daysDiff = (now.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24);
      const matchesDate = dateFilter === "all" ||
        (dateFilter === "7days" && daysDiff <= 7) ||
        (dateFilter === "30days" && daysDiff <= 30) ||
        (dateFilter === "90days" && daysDiff <= 90);

      return matchesSearch && matchesAction && matchesResult && matchesDate;
    });
  }, [baseActivities, searchQuery, actionFilter, resultFilter, dateFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    const successful = filteredActivities.filter(a => a.result === "Success").length;
    const failed = filteredActivities.filter(a => a.result === "Failed").length;
    const pending = filteredActivities.filter(a => a.result === "Pending").length;
    const totalGas = filteredActivities.reduce((acc, curr) => {
      const gas = parseFloat(curr.gasUsed.split(" ")[0]);
      return acc + gas;
    }, 0);

    return {
      total: filteredActivities.length,
      successful,
      failed,
      pending,
      totalGasUsed: totalGas.toFixed(3) + " ETH"
    };
  }, [filteredActivities]);

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
                  placeholder="Search transactions" 
                  className="pl-10 bg-secondary/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Action Type Filter */}
              <Select value={actionFilter} onValueChange={setActionFilter}>
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
              <Select value={resultFilter} onValueChange={setResultFilter}>
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
              <Select value={dateFilter} onValueChange={setDateFilter}>
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
                  {filteredActivities.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground">
                        No activities found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredActivities.map((activity) => (
                      <tr key={activity.txHash} className="border-b border-border/20 hover:bg-secondary/20 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-mono text-sm">{activity.timestamp}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-medium">{activity.action}</div>
                        </td>
                        <td className="py-4 px-6">
                          <Badge 
                            variant="secondary" 
                            className={
                              activity.result === 'Success' 
                                ? 'bg-success/20 text-success border-success/30' 
                                : activity.result === 'Failed'
                                  ? 'bg-destructive/20 text-destructive border-destructive/30'
                                  : 'bg-warning/20 text-warning border-warning/30'
                            }
                          >
                            {activity.result}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-mono text-sm">{activity.gasUsed}</div>
                        </td>
                        <td className="py-4 px-6">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-primary hover:text-primary/80"
                            onClick={() => window.open(`https://etherscan.io/tx/${activity.txHash}`, '_blank')}
                          >
                            <ExternalLink className="mr-2 h-3 w-3" />
                            View on Explorer
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
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