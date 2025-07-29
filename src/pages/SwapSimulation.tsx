import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, AlertCircle } from "lucide-react";
import DashboardNavigation from "@/components/DashboardNavigation";
import { useState, useEffect, useMemo } from "react";

interface TreasuryState {
  eth: {
    amount: number;
    percentage: number;
  };
  usdc: {
    amount: number;
    percentage: number;
  };
}

const SwapSimulation = () => {
  // State for current treasury allocation
  const [treasuryState, setTreasuryState] = useState<TreasuryState>({
    eth: {
      amount: 1111.2,
      percentage: 90
    },
    usdc: {
      amount: 123457,
      percentage: 10
    }
  });

  // State for swap parameters
  const [swapRate, setSwapRate] = useState<number>(3500); // USDC per ETH
  const [slippage, setSlippage] = useState<number>(0.5); // 0.5%
  const [networkFee, setNetworkFee] = useState<number>(0.002); // ETH
  const [dexFee, setDexFee] = useState<number>(0.1); // 0.1%

  // Calculate imbalance and proposed swap
  const calculations = useMemo(() => {
    const targetUsdcPercentage = 30; // Target 30% USDC
    const currentUsdcPercentage = treasuryState.usdc.percentage;
    const imbalancePercentage = targetUsdcPercentage - currentUsdcPercentage;
    
    // Calculate ETH amount to swap
    const totalValueInEth = treasuryState.eth.amount + (treasuryState.usdc.amount / swapRate);
    const ethToSwap = (imbalancePercentage / 100) * totalValueInEth;
    
    // Calculate USDC to receive
    const usdcToReceive = ethToSwap * swapRate;
    
    // Calculate minimum received with slippage
    const minimumReceived = usdcToReceive * (1 - slippage / 100);
    
    // Calculate price impact
    const priceImpact = (usdcToReceive / (ethToSwap * swapRate) - 1) * 100;

    return {
      ethToSwap: Math.abs(ethToSwap).toFixed(1),
      usdcToReceive: Math.abs(usdcToReceive).toFixed(0),
      minimumReceived: Math.abs(minimumReceived).toFixed(0),
      imbalancePercentage: imbalancePercentage.toFixed(0),
      priceImpact: priceImpact.toFixed(2)
    };
  }, [treasuryState, swapRate, slippage]);

  // Simulate fetching live data
  useEffect(() => {
    const fetchLiveData = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update with mock live data
      setSwapRate(3500 + Math.random() * 100);
      setPriceImpact(0.02 + Math.random() * 0.1);
    };

    const interval = setInterval(fetchLiveData, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <DashboardNavigation />
      
      {/* Header */}
      <div className="border-b border-border/30 bg-card/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold">Simulate Swap</h1>
          <p className="text-muted-foreground mt-2">
            Preview upcoming swaps based on the current portfolio imbalance.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Current Allocation */}
          <Card className="glow-card">
            <CardHeader>
              <CardTitle>Current Allocation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">
                  {treasuryState.eth.percentage}% ETH, {treasuryState.usdc.percentage}% USDC
                </div>
                <div className="text-sm text-muted-foreground">Current asset allocation in the treasury</div>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0 rounded-full" style={{
                    background: `conic-gradient(from 0deg, hsl(var(--chart-1)) 0deg ${treasuryState.eth.percentage * 3.6}deg, hsl(var(--chart-2)) ${treasuryState.eth.percentage * 3.6}deg 360deg)`
                  }}></div>
                  <div className="absolute inset-4 rounded-full bg-card flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold">Imbalanced</div>
                      <div className="text-xs text-warning">{calculations.imbalancePercentage}% USDC</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full bg-chart-1"></div>
                    <span className="font-medium">ETH</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">90%</div>
                    <div className="text-sm text-muted-foreground">1,111.2 ETH</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full bg-chart-2"></div>
                    <span className="font-medium">USDC</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">10%</div>
                    <div className="text-sm text-muted-foreground">123,457 USDC</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Proposed Reallocation */}
          <Card className="glow-card">
            <CardHeader>
              <CardTitle>Proposed Reallocation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2 text-primary">
                  Swap {calculations.ethToSwap} ETH → {calculations.usdcToReceive} USDC
                </div>
                <div className="text-sm text-muted-foreground">Proposed swap based on current imbalance</div>
              </div>

              <div className="bg-secondary/30 rounded-lg p-6 space-y-4">
                <div className="text-center">
                  <h3 className="font-semibold mb-4">Swap Simulation</h3>
                  <div className="text-sm text-muted-foreground mb-2">
                    Live swap simulation based on current market rates.
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-chart-1 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">ETH</span>
                    </div>
                    <div className="text-sm font-medium">{calculations.ethToSwap} ETH</div>
                  </div>
                  
                  <ArrowRight className="h-6 w-6 text-primary" />
                  
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-chart-2 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">USDC</span>
                    </div>
                    <div className="text-sm font-medium">{calculations.usdcToReceive} USDC</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full bg-chart-1"></div>
                    <span className="font-medium">ETH (After)</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">70%</div>
                    <div className="text-sm text-muted-foreground">1,110.0 ETH</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full bg-chart-2"></div>
                    <span className="font-medium">USDC (After)</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">30%</div>
                    <div className="text-sm text-muted-foreground">127,657 USDC</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Quote Section */}
        <Card className="glow-card mt-8">
          <CardHeader>
            <CardTitle>Live Quote from OKX DEX API (Mockup)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Swap Rate</div>
                <div className="text-2xl font-bold font-mono">1 ETH = {swapRate.toFixed(0)} USDC</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Minimum Received</div>
                <div className="text-2xl font-bold font-mono">{calculations.minimumReceived} USDC</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Slippage</div>
                <div className="text-2xl font-bold">
                  <Badge variant="secondary" className="text-lg px-3 py-1">{slippage}%</Badge>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="bg-muted/30 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Network Fee</span>
                <span className="font-mono">~{networkFee} ETH</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">DEX Fee</span>
                <span className="font-mono">{dexFee}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Price Impact</span>
                <span className={`font-mono ${Number(calculations.priceImpact) > 0 ? 'text-success' : 'text-warning'}`}>
                  {calculations.priceImpact}%
                </span>
              </div>
            </div>

            <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 flex items-start space-x-3 mt-6">
              <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
              <div className="space-y-1">
                <div className="font-medium text-warning">Review Before Execution</div>
                <div className="text-sm text-muted-foreground">
                  This simulation is based on current market conditions. Actual results may vary due to market volatility and slippage.
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <Button 
                className="flex-1 glow-button"
                onClick={async () => {
                  // Here you would integrate with wallet and DEX
                  const ethToSwap = Number(calculations.ethToSwap);
                  const usdcToReceive = Number(calculations.usdcToReceive);
                  
                  // Update treasury state after successful swap
                  setTreasuryState(prev => ({
                    eth: {
                      amount: prev.eth.amount - ethToSwap,
                      percentage: 70
                    },
                    usdc: {
                      amount: prev.usdc.amount + usdcToReceive,
                      percentage: 30
                    }
                  }));
                }}
              >
                Approve & Execute
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  // Refresh rates and calculations
                  setSwapRate(prev => prev + Math.random() * 50 - 25);
                }}
              >
                Simulate Only
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SwapSimulation;

function setPriceImpact(arg0: number) {
  throw new Error("Function not implemented.");
}
