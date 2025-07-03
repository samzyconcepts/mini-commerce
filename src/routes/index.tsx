import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { fetchProducts } from "@/api/product";
import { ProductGrid } from "@/components/product-grid";

export const Route = createFileRoute("/")({
    component: App,
});

function App() {
    return (
    <ErrorBoundary>
      <div className="container py-8">
        <ProductsCatalogue />
      </div>
    </ErrorBoundary>
  );
}


function ProductsCatalogue() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return <LoadingSpinner size="lg" className="min-h-[400px]" />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">Failed to load products</h3>
        <p className="text-muted-foreground mb-4">
          {error instanceof Error ? error.message : 'Something went wrong'}
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="text-primary hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-16 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Mini-Commerce
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover amazing products at unbeatable prices
          </p>
          <div className="inline-flex items-center space-x-4 text-sm">
            <span className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-white rounded-full" />
              <span>Free Shipping on Orders $50+</span>
            </span>
            <span className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-white rounded-full" />
              <span>30-Day Returns</span>
            </span>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated selection of high-quality products 
            designed to enhance your lifestyle.
          </p>
        </div>
        
        {products && <ProductGrid products={products} />}
      </section>
    </div>
  );
}
