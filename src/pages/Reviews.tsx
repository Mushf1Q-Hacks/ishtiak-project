import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, ThumbsUp, ThumbsDown, MessageCircle, Filter } from "lucide-react";
import Header from "@/components/Header";
import { toast } from "@/hooks/use-toast";

interface Review {
  id: string;
  productName: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpfulCount: number;
  verified: boolean;
  images?: string[];
}

const Reviews = () => {
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [newTitle, setNewTitle] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const reviews: Review[] = [
    {
      id: "1",
      productName: "Premium Wireless Earbuds",
      productId: "1",
      userName: "Sarah M.",
      userAvatar: "",
      rating: 5,
      title: "Absolutely fantastic sound quality!",
      comment: "These earbuds exceeded all my expectations. The noise cancellation is incredible and the battery life is exactly as advertised. I've been using them daily for workouts and commuting - they stay in place perfectly and the sound quality rivals much more expensive options.",
      date: "2024-01-15",
      helpfulCount: 24,
      verified: true
    },
    {
      id: "2",
      productName: "Pro Smartphone",
      productId: "2", 
      userName: "Mike R.",
      userAvatar: "",
      rating: 4,
      title: "Great value for money",
      comment: "Really impressed with the camera quality and overall performance. The only minor complaint is that it can get warm during intensive gaming sessions, but for normal use it's perfect. Fast shipping and excellent customer service too.",
      date: "2024-01-12",
      helpfulCount: 18,
      verified: true
    },
    {
      id: "3",
      productName: "Smart Fitness Watch",
      productId: "3",
      userName: "Emma L.",
      userAvatar: "",
      rating: 5,
      title: "Perfect fitness companion",
      comment: "This watch has completely changed how I approach fitness. The heart rate monitoring is very accurate, GPS is precise, and I love the sleep tracking features. Battery easily lasts 5-6 days with normal use. Highly recommend!",
      date: "2024-01-10",
      helpfulCount: 31,
      verified: true
    },
    {
      id: "4",
      productName: "Ultra-Thin Laptop",
      productId: "4",
      userName: "David K.",
      userAvatar: "",
      rating: 4,
      title: "Powerful and portable",
      comment: "Great laptop for work and creative projects. It's incredibly thin and light, making it perfect for travel. Performance is excellent for most tasks, though it can struggle with very intensive video editing. Overall very satisfied.",
      date: "2024-01-08",
      helpfulCount: 12,
      verified: true
    },
    {
      id: "5",
      productName: "Premium Wireless Earbuds",
      productId: "1",
      userName: "Lisa W.",
      userAvatar: "",
      rating: 3,
      title: "Good but not great",
      comment: "The sound quality is good and they're comfortable to wear. However, I had some connectivity issues with my phone initially. Customer service was helpful in resolving it, but it was frustrating at first.",
      date: "2024-01-06",
      helpfulCount: 8,
      verified: true
    },
    {
      id: "6",
      productName: "Pro Smartphone",
      productId: "2",
      userName: "Alex T.",
      userAvatar: "",
      rating: 5,
      title: "Best phone I've ever owned",
      comment: "Everything about this phone is premium. The camera takes professional-quality photos, the display is gorgeous, and it handles everything I throw at it effortlessly. Worth every penny!",
      date: "2024-01-04",
      helpfulCount: 45,
      verified: true
    }
  ];

  const filteredReviews = reviews.filter(review => {
    if (filterRating === "all") return true;
    return review.rating === parseInt(filterRating);
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      case "helpful":
        return b.helpfulCount - a.helpfulCount;
      default:
        return 0;
    }
  });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => 
    reviews.filter(review => review.rating === rating).length
  );

  const handleSubmitReview = () => {
    if (newReview.trim() && newRating > 0 && newTitle.trim()) {
      toast({
        title: "Review submitted!",
        description: "Thank you for your feedback. Your review will help other customers.",
      });
      setNewReview("");
      setNewRating(0);
      setNewTitle("");
    } else {
      toast({
        title: "Please complete your review",
        description: "Title, rating, and comment are all required.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-hero py-16">
        <div className="container text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Customer Reviews
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Read honest reviews from our community and share your own experience
          </p>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Reviews Overview */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Overall Rating</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(averageRating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on {reviews.length} reviews
                  </p>
                </div>
                
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating, index) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <span className="text-sm w-6">{rating}</span>
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${(ratingDistribution[index] / reviews.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-8">
                        {ratingDistribution[index]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Write Review */}
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Write a Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Rating</label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1"
                      >
                        <Star
                          className={`h-6 w-6 ${
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
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Summarize your experience..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Review</label>
                  <Textarea
                    placeholder="Share your detailed experience..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    rows={4}
                  />
                </div>
                
                <Button 
                  onClick={handleSubmitReview}
                  className="w-full bg-gradient-primary hover:shadow-glow transition-smooth"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Submit Review
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <Card className="bg-white border-0 shadow-soft">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Select value={filterRating} onValueChange={setFilterRating}>
                      <SelectTrigger className="w-40">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ratings</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="1">1 Star</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                        <SelectItem value="highest">Highest Rated</SelectItem>
                        <SelectItem value="lowest">Lowest Rated</SelectItem>
                        <SelectItem value="helpful">Most Helpful</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {sortedReviews.length} reviews
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <div className="space-y-4">
              {sortedReviews.map((review) => (
                <Card key={review.id} className="bg-gradient-card border-0 shadow-soft">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={review.userAvatar} />
                            <AvatarFallback>
                              {review.userName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">{review.userName}</h4>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{review.productName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{review.date}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-2">{review.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Helpful ({review.helpfulCount})
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ThumbsDown className="h-4 w-4 mr-1" />
                            Not Helpful
                          </Button>
                        </div>
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

export default Reviews;