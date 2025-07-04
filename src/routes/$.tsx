import { createFileRoute, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/$")({
    component: RouteComponent,
});

function RouteComponent() {
    const location = useLocation();

    useEffect(() => {
        console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }, [location.pathname]);

    return (
        <div className="container py-16">
            <div className="text-center max-w-md mx-auto">
                <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
                <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
                <p className="text-muted-foreground mb-8">Sorry, the page you're looking for doesn't exist or has been moved.</p>
                <div className="space-y-4">
                    <a
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark transition-colors">
                        Return to Home
                    </a>
                </div>
            </div>
        </div>
    );
}
