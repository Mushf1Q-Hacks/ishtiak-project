import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";

// Import product images
import productEarbuds from "@/assets/product-earbuds.jpg";
import productSmartphone from "@/assets/product-smartphone.jpg";
import productSmartwatch from "@/assets/product-smartwatch.jpg";
import productLaptop from "@/assets/product-laptop.jpg";

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

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const allProducts: Product[] = [
    {
      id: "1",
      name: "Premium Wireless Earbuds",
      price: 149,
      originalPrice: 199,
      image: productEarbuds,
      rating: 4.8,
      reviewCount: 324,
      description: "Experience crystal-clear audio with our premium wireless earbuds featuring active noise cancellation and 30-hour battery life.",
      category: "Audio",
      isLiked: false
    },
    {
      id: "2",
      name: "Pro Smartphone",
      price: 899,
      originalPrice: 1099,
      image: productSmartphone,
      rating: 4.9,
      reviewCount: 567,
      description: "The latest smartphone with cutting-edge camera technology, blazing-fast processor, and all-day battery life.",
      category: "Mobile",
      isLiked: true
    },
    {
      id: "3",
      name: "Smart Fitness Watch",
      price: 299,
      image: productSmartwatch,
      rating: 4.7,
      reviewCount: 892,
      description: "Track your health and fitness with advanced sensors, GPS, and a beautiful always-on display that lasts days.",
      category: "Wearables",
      isLiked: false
    },
    {
      id: "4",
      name: "Ultra-Thin Laptop",
      price: 1299,
      originalPrice: 1499,
      image: productLaptop,
      rating: 4.6,
      reviewCount: 234,
      description: "Powerful performance meets elegant design in this ultra-portable laptop perfect for work and creativity.",
      category: "Computing",
      isLiked: false
    },
    {
      id: "5",
      name: "Wireless Gaming Mouse",
      price: 79,
      originalPrice: 99,
      image: productEarbuds, // Using earbuds image as placeholder
      rating: 4.5,
      reviewCount: 156,
      description: "High-precision gaming mouse with customizable RGB lighting and ultra-responsive wireless connectivity.",
      category: "Computing",
      isLiked: false
    },
    {
      id: "6",
      name: "Smart Home Speaker",
      price: 199,
      image: productSmartphone, // Using smartphone image as placeholder
      rating: 4.4,
      reviewCount: 289,
      description: "Voice-controlled smart speaker with premium sound quality and seamless smart home integration.",
      category: "Audio",
      isLiked: true
    }
  ];

  const categories = ["all", "Audio", "Mobile", "Wearables", "Computing"];

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-hero py-16">
        <div className="container text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Products
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Discover our complete collection of premium products designed to enhance your lifestyle
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white shadow-soft">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {filteredProducts.length} products found
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-gradient-secondary">
        <div className="container">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={handleProductClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No products found matching your criteria.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="mt-4 bg-gradient-primary"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};

export default Products;