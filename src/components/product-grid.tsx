import type { Product } from "@/api/types";
import { ProductCard } from "./product-card";

interface ProductGridProps {
    products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your search or check back later.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
