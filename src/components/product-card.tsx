import { Star, ShoppingCart } from "lucide-react";
import type { Product } from "@/api/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cartStore";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation
        if (!product.inStock) return;

        addItem(product);
        toast(`${product.name} has been added to your cart.`);
    };

    const discountPercent = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    return (
        <Card className="group overflow-hidden transition-all duration-300 hover:shadow-glow hover:-translate-y-1">
            <Link to="/product/$slug" params={{ slug: product.slug }}>
                <div className="relative overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {!product.inStock && (
                        <Badge variant="destructive" className="absolute top-3 left-3">
                            Out of Stock
                        </Badge>
                    )}
                    {discountPercent > 0 && (
                        <Badge variant="destructive" className="absolute top-3 right-3">
                            -{discountPercent}%
                        </Badge>
                    )}
                </div>
            </Link>

            <CardContent className="p-4">
                <Link to="/product/$slug" params={{ slug: product.slug }}>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                                {product.category}
                            </Badge>
                            <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm text-muted-foreground">
                                    {product.rating} ({product.reviews})
                                </span>
                            </div>
                        </div>

                        <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                            {product.name}
                        </h3>

                        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                    </div>
                </Link>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <div className="flex items-center justify-between w-full">
                    <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                            )}
                        </div>
                    </div>

                    <Button variant="cart" size="sm" onClick={handleAddToCart} disabled={!product.inStock} className="shrink-0">
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
