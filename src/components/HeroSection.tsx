import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Gift, Trophy, Zap } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center text-white">
        <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
          <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
          Premium Loyalty Program
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Unlock Amazing
          <br />
          <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            Rewards
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
          Discover premium products, earn loyalty points, and enjoy exclusive benefits 
          with every purchase in our curated collection.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-strong transition-bounce hover:scale-105">
            <Gift className="h-5 w-5 mr-2" />
            Explore Products
          </Button>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 transition-bounce hover:scale-105">
            <Trophy className="h-5 w-5 mr-2" />
            View Rewards
          </Button>
        </div>

        {/* Feature Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { icon: Trophy, label: "Premium Products", value: "500+" },
            { icon: Star, label: "Happy Customers", value: "50K+" },
            { icon: Zap, label: "Instant Rewards", value: "24/7" }
          ].map((stat, index) => (
            <div key={index} className="glass rounded-lg p-6 transition-smooth hover:scale-105">
              <stat.icon className="h-8 w-8 mx-auto mb-2 text-yellow-300" />
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-300/20 rounded-full blur-xl animate-pulse" />
    </section>
  );
};

export default HeroSection;