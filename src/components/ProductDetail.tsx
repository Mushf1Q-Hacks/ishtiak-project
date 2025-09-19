import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Star, Heart, ShoppingBag, X, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  description: string;
  category: string;
  isLiked?: boolean;
}

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

const ProductDetail = ({ product, onClose }: ProductDetailProps) => {
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [reviews] = useState<Review[]>([
    {
      id: "1",
      userName: "Sarah M.",
      userAvatar: "/placeholder-avatar.jpg",
      rating: 5,
      comment: "Absolutely love this product! The quality is outstanding and it exceeded my expectations.",
      date: "2024-01-15"
    },
    {
      id: "2",
      userName: "Mike R.",
      userAvatar: "/placeholder-avatar.jpg",
      rating: 4,
      comment: "Great value for money. Fast shipping and excellent customer service.",
      date: "2024-01-10"
    },
    {
      id: "3",
      userName: "Emma L.",
      userAvatar: "/placeholder-avatar.jpg",
      rating: 5,
      comment: "Perfect! Works exactly as described. Highly recommend to anyone considering this purchase.",
      date: "2024-01-08"
    }
  ]);

  const handleSubmitReview = () => {
    if (newReview.trim() && newRating > 0) {
      toast({
        title: "Review submitted!",
        description: "Thank you for your feedback. Your review helps other customers.",
      });
      setNewReview("");
      setNewRating(0);
    } else {
      toast({
        title: "Please complete your review",
        description: "Both rating and comment are required.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="space-y-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg shadow-medium"
              />
              <div className="flex space-x-2">
                <Button className="flex-1 bg-gradient-primary hover:shadow-glow transition-smooth">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {product.category}
                </Badge>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-3xl font-bold text-primary">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Write Review Section */}
              <Card className="bg-gradient-card border-0 shadow-soft">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Write a Review</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Your Rating</label>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setNewRating(star)}
                            className="p-1"
                          >
                            <Star
                              className={`h-5 w-5 ${
                                star <= newRating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              } transition-smooth hover:scale-110`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Your Review</label>
                      <Textarea
                        placeholder="Share your experience with this product..."
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        rows={3}
                      />
                    </div>
                    
                    <Button 
                      onClick={handleSubmitReview}
                      className="w-full bg-gradient-primary hover:shadow-glow transition-smooth"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Submit Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="bg-gradient-card border-0 shadow-soft">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-medium">
                        {review.userName.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{review.userName}</h4>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex items-center space-x-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;