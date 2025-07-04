import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/checkout/success")({
    component: RouteComponent,
    validateSearch: (search: Record<string, unknown>) => {
        if (typeof search.orderId !== "string") {
            throw new Error("orderId is required and must be a string");
        }
        return search as { orderId: string };
    },
});

function RouteComponent() {
    const searchParams = Route.useSearch();
    const orderId = searchParams.orderId;

    useEffect(() => {
        // You could send analytics or confirmation emails here
        console.log("Order completed:", orderId);
    }, [orderId]);

    return (
        <div className="container py-16">
            <div className="max-w-md mx-auto text-center">
                <div className="mb-8">
                    <CheckCircle className="h-20 w-20 text-success mx-auto mb-4" />
                    <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
                    <p className="text-muted-foreground">Thank you for your purchase. Your order has been successfully placed.</p>
                </div>

                <Card className="mb-8">
                    <CardContent className="p-6">
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="font-medium">Order Number:</span>
                                <span className="font-mono text-primary">{orderId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Status:</span>
                                <span className="text-success">Confirmed</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Estimated Delivery:</span>
                                <span>3-5 business days</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        You will receive an email confirmation shortly with your order details and tracking information.
                    </p>

                    <div className="space-y-3">
                        <Button asChild variant="default" size="lg" className="w-full">
                            <Link to="/">
                                <ShoppingBag className="h-4 w-4" />
                                Continue Shopping
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
