import type { Product } from "@/api/types";

const STORAGE_KEY = "mini-commerce-products";
const BASE_URL = "http://localhost:5000/products";

// Initialize localStorage with product data if empty
const initializeProducts = async (): Promise<Product[]> => {
    const storedProducts = localStorage.getItem(STORAGE_KEY);

    if (storedProducts) {
        return JSON.parse(storedProducts);
    }

    // Fetch from JSON file and seed localStorage
    try {
        const response = await fetch("/products.json");

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        const products: Product[] = await response.json();

        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        return products;
    } catch (error) {
        console.error("Error loading products:", error);
        throw new Error("Failed to load products. Please try again later.");
    }
};

export const fetchProducts = async (): Promise<Product[]> => {
    // Simulate network delay for better UX demonstration
    await new Promise((resolve) => setTimeout(resolve, 500));
    return initializeProducts();
};

export const fetchProductBySlug = async (slug: string): Promise<Product | null> => {
    const products = await fetchProducts();
    return products.find((product) => product.slug === slug) || null;
};
