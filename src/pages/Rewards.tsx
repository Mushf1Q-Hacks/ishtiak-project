import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, Gift, Trophy, Crown, Zap, Award } from "lucide-react";
import Header from "@/components/Header";

const Rewards = () => {
  const currentPoints = 2450;
  const nextTierPoints = 3000;
  const progressPercent = (currentPoints / nextTierPoints) * 100;

  const rewardTiers = [
    {
      name: "Bronze",
      minPoints: 0,
      benefits: ["5% cashback", "Free shipping on orders $50+"],
      color: "bg-amber-600",
      icon: Award
    },
    {
      name: "Silver", 
      minPoints: 1000,
      benefits: ["10% cashback", "Priority support", "Early access to sales"],
      color: "bg-gray-400",
      icon: Star
    },
    {
      name: "Gold",
      minPoints: 2500,
      benefits: ["15% cashback", "Exclusive products", "Personal shopper"],
      color: "bg-yellow-500",
      icon: Trophy,
      current: true
    },
    {
      name: "Platinum",
      minPoints: 5000,
      benefits: ["20% cashback", "VIP events", "Custom products"],
      color: "bg-purple-600",
      icon: Crown
    }
  ];

  const availableRewards = [
    {
      id: "1",
      name: "$10 Store Credit",
      points: 500,
      description: "Use towards any purchase",
      icon: Gift,
      available: true
    },
    {
      id: "2", 
      name: "$25 Store Credit",
      points: 1200,
      description: "Use towards any purchase",
      icon: Gift,
      available: true
    },
    {
      id: "3",
      name: "Free Premium Shipping",
      points: 300,
      description: "Free express delivery for 3 months",
      icon: Zap,
      available: true
    },
    {
      id: "4",
      name: "Exclusive Product Access",
      points: 800,
      description: "Early access to new releases",
      icon: Star,
      available: true
    },
    {
      id: "5",
      name: "$50 Store Credit",
      points: 2800,
      description: "Use towards any purchase",
      icon: Gift,
      available: false
    }
  ];

  const pointsHistory = [
    { date: "2024-01-15", action: "Purchase - Pro Smartphone", points: +450 },
    { date: "2024-01-10", action: "Purchase - Wireless Earbuds", points: +75 },
    { date: "2024-01-08", action: "Product Review", points: +25 },
    { date: "2024-01-05", action: "Referral Bonus", points: +100 },
    { date: "2024-01-01", action: "Welcome Bonus", points: +200 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-hero py-16">
        <div className="container text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Loyalty Rewards
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Earn points with every purchase and unlock amazing rewards
          </p>
        </div>
      </section>

      <div className="container py-12 space-y-8">
        {/* Current Status */}
        <Card className="bg-gradient-card border-0 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <span>Your Loyalty Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Badge className="bg-yellow-500 text-white mb-2">Gold Member</Badge>
                <p className="text-2xl font-bold">{currentPoints} points</p>
                <p className="text-sm text-muted-foreground">
                  {nextTierPoints - currentPoints} points to Platinum tier
                </p>
              </div>
              <div className="text-right">
                <div className="w-32 h-32 rounded-full bg-gradient-primary flex items-center justify-center text-white">
                  <Trophy className="h-12 w-12" />
                </div>
              </div>
            </div>
            <Progress value={progressPercent} className="h-3" />
          </CardContent>
        </Card>

        {/* Reward Tiers */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Membership Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {rewardTiers.map((tier) => (
              <Card 
                key={tier.name} 
                className={`${tier.current ? 'ring-2 ring-primary shadow-glow' : ''} bg-gradient-card border-0 shadow-soft transition-smooth hover:scale-105`}
              >
                <CardHeader className="text-center">
                  <div className={`w-12 h-12 rounded-full ${tier.color} flex items-center justify-center mx-auto mb-2`}>
                    <tier.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="flex items-center justify-center space-x-2">
                    <span>{tier.name}</span>
                    {tier.current && <Badge variant="secondary">Current</Badge>}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {tier.minPoints}+ points
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Star className="h-3 w-3 fill-green-500 text-green-500" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Rewards */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Redeem Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableRewards.map((reward) => (
              <Card key={reward.id} className="bg-gradient-card border-0 shadow-soft">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <reward.icon className="h-8 w-8 text-primary" />
                    <Badge variant={reward.available ? "default" : "secondary"}>
                      {reward.points} points
                    </Badge>
                  </div>
                  <CardTitle>{reward.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{reward.description}</p>
                </CardHeader>
                <CardContent>
                  <Button 
                    className={`w-full ${reward.available ? 'bg-gradient-primary' : ''}`}
                    disabled={!reward.available || currentPoints < reward.points}
                  >
                    {reward.available && currentPoints >= reward.points ? 'Redeem' : 'Not Available'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Points History */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Points History</h2>
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-0">
              <div className="space-y-0">
                {pointsHistory.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border-b last:border-b-0">
                    <div>
                      <p className="font-medium">{entry.action}</p>
                      <p className="text-sm text-muted-foreground">{entry.date}</p>
                    </div>
                    <Badge variant={entry.points > 0 ? "default" : "secondary"}>
                      {entry.points > 0 ? '+' : ''}{entry.points} points
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Rewards;