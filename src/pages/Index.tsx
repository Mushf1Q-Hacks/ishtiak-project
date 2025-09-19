import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
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

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
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
    }
  ];

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* Products Section */}
      <section className="py-16 bg-gradient-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collection of premium products. Each purchase earns you valuable loyalty points.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
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

export default Index;