import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartStore, Product } from "@/api/types";

const TAX_RATE = 0.08; // 8% tax rate

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product: Product, quantity: number = 1) => {
                set((state) => {
                    const existingItem = state.items.find((item) => item.product.id === product.id);

                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                            ),
                        };
                    }

                    return {
                        items: [...state.items, { product, quantity }],
                    };
                });
            },

            removeItem: (productId: string) => {
                set((state) => ({
                    items: state.items.filter((item) => item.product.id !== productId),
                }));
            },

            updateQuantity: (productId: string, quantity: number) => {
                if (quantity <= 0) {
                    get().removeItem(productId);
                    return;
                }

                set((state) => ({
                    items: state.items.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
                }));
            },

            clearCart: () => {
                set({ items: [] });
            },

            getItemCount: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getSubtotal: () => {
                return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
            },

            getTotal: () => {
                const subtotal = get().getSubtotal();
                const tax = subtotal * TAX_RATE;
                return subtotal + tax;
            },
        }),
        {
            name: "mini-commerce-cart",
            version: 1,
        }
    )
);
