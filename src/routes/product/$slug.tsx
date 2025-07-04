import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star, ShoppingCart, ChevronLeft, Heart } from "lucide-react";
import { fetchProductBySlug } from "@/api/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$slug")({
    component: RouteComponent,
});

function RouteComponent() {
    const { slug } = Route.useParams();
    const [quantity, setQuantity] = useState(1);
    const addItem = useCartStore((state) => state.addItem);

    const {
        data: product,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["product", slug],
        queryFn: () => fetchProductBySlug(slug!),
        enabled: !!slug,
    });

    if (isLoading) {
        return (
            <div className="container py-8">
                <LoadingSpinner size="lg" className="min-h-[400px]" />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container py-8">
                <div className="text-center max-w-md mx-auto">
                    <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                    <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
                    <Button asChild>
                        <Link to="/">
                            <ChevronLeft className="h-4 w-4" />
                            Back to Products
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (!product.inStock) return;

        addItem(product, quantity);
        toast(`${quantity}x ${product.name} added to your cart.`);
    };

    const discountPercent = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    return (
        <div className="container py-8">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 mb-8 text-sm text-muted-foreground">
                <Link to="/" className="hover:text-primary transition-colors">
                    Products
                </Link>
                <span>/</span>
                <span className="text-foreground">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Image */}
                <div className="space-y-4">
                    <div className="relative overflow-hidden rounded-lg bg-muted">
                        <img src={product.image} alt={product.name} className="w-full h-96 lg:h-[500px] object-cover" />
                        {!product.inStock && (
                            <Badge variant="destructive" className="absolute top-4 left-4">
                                Out of Stock
                            </Badge>
                        )}
                        {discountPercent > 0 && (
                            <Badge variant="destructive" className="absolute top-4 right-4">
                                -{discountPercent}% OFF
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <Badge variant="outline" className="mb-3">
                            {product.category}
                        </Badge>
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                        <div className="flex items-center space-x-4 mb-4">
                            <div className="flex items-center space-x-1">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <span className="font-semibold">{product.rating}</span>
                                <span className="text-muted-foreground">({product.reviews} reviews)</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 mb-6">
                            <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                                <span className="text-xl text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                            )}
                            {discountPercent > 0 && (
                                <Badge variant="secondary" className="bg-success text-success-foreground">
                                    Save ${(product.originalPrice! - product.price).toFixed(2)}
                                </Badge>
                            )}
                        </div>

                        <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                    </div>

                    {/* Features */}
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-4">Key Features</h3>
                            <ul className="space-y-2">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="flex items-center space-x-2">
                                        <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Add to Cart */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <label htmlFor="quantity" className="text-sm font-medium">
                                Quantity:
                            </label>
                            <select
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                                disabled={!product.inStock}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex space-x-4">
                            <Button size="lg" variant="cart" onClick={handleAddToCart} disabled={!product.inStock} className="flex-1">
                                <ShoppingCart className="h-5 w-5" />
                                {product.inStock ? "Add to Cart" : "Out of Stock"}
                            </Button>

                            <Button size="lg" variant="outline">
                                <Heart className="h-5 w-5" />
                            </Button>
                        </div>

                        {!product.inStock && <p className="text-sm text-muted-foreground">This item is currently out of stock. Check back soon!</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
