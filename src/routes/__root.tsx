import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "@/components/ui/sonner.tsx";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const Route = createRootRoute({
    component: () => (
        <>
            <Toaster />
            <Header />
            <Outlet />
            <Footer />
            <TanStackRouterDevtools />
        </>
    ),
});
