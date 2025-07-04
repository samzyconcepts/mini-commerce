import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cartStore";

export const Route = createFileRoute("/cart/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { items, updateQuantity, removeItem, getSubtotal, getTotal } = useCartStore();

    const subtotal = getSubtotal();
    const total = getTotal();
    const tax = total - subtotal;

    if (items.length === 0) {
        return (
            <div className="container py-8">
                <div className="text-center max-w-md mx-auto">
                    <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
                    <Button asChild size="lg">
                        <Link to="/">Start Shopping</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <Card key={item.product.id}>
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-4">
                                    <Link to="/product/$slug" params={{ slug: item.product.slug }}>
                                        <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
                                    </Link>

                                    <div className="flex-1 min-w-0">
                                        <Link
                                            to="/product/$slug"
                                            params={{ slug: item.product.slug }}
                                            className="text-lg font-semibold hover:text-primary transition-colors">
                                            {item.product.name}
                                        </Link>
                                        <p className="text-muted-foreground text-sm mt-1">{item.product.category}</p>
                                        <p className="text-xl font-bold text-primary mt-2">${item.product.price.toFixed(2)}</p>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}>
                                            <Minus className="h-4 w-4" />
                                        </Button>

                                        <span className="w-12 text-center font-semibold">{item.quantity}</span>

                                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-lg font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeItem(item.product.id)}
                                            className="text-destructive hover:text-destructive mt-2">
                                            <Trash2 className="h-4 w-4" />
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Order Summary */}
                <div>
                    <Card className="sticky top-8">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span>Subtotal ({items.length} items)</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span className="text-primary">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Button asChild variant="cart" size="lg" className="w-full">
                                <Link to="/checkout">Proceed to Checkout</Link>
                            </Button>

                            <Button asChild variant="outline" size="lg" className="w-full">
                                <Link to="/">Continue Shopping</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
