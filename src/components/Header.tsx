import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Star, User } from "lucide-react";
import ishtiakAvatar from "@/assets/ishtiak-avatar.png";

const Header = () => {
  const location = useLocation();
  const [currentUser] = useState({
    name: "Ishtiak",
    avatar: ishtiakAvatar,
    loyaltyPoints: 2450,
    tier: "Gold Member"
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <Heart className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            LoyaltyHub
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/products">
            <Button variant={location.pathname === "/products" ? "default" : "ghost"}>
              Products
            </Button>
          </Link>
          <Link to="/rewards">
            <Button variant={location.pathname === "/rewards" ? "default" : "ghost"}>
              Rewards
            </Button>
          </Link>
          <Link to="/reviews">
            <Button variant={location.pathname === "/reviews" ? "default" : "ghost"}>
              Reviews
            </Button>
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <ShoppingBag className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{currentUser.name}</p>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  {currentUser.tier}
                </Badge>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{currentUser.loyaltyPoints}</span>
                </div>
              </div>
            </div>
            
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;