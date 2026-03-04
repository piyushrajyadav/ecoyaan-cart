import { create } from "zustand";
import { CartItem, ShippingAddress } from "@/types/cart";

interface CheckoutState {
    cartItems: CartItem[];
    shippingFee: number;
    discount: number;
    shippingAddress: ShippingAddress | null;
    setCartData: (items: CartItem[], shippingFee: number, discount: number) => void;
    setShippingAddress: (address: ShippingAddress) => void;
    incrementQty: (productId: number) => void;
    decrementQty: (productId: number) => void;
    removeItem: (productId: number) => void;
    resetStore: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
    cartItems: [],
    shippingFee: 0,
    discount: 0,
    shippingAddress: null,

    setCartData: (items, shippingFee, discount) =>
        set({ cartItems: items, shippingFee, discount }),

    setShippingAddress: (address) =>
        set({ shippingAddress: address }),

    incrementQty: (productId) =>
        set((state) => ({
            cartItems: state.cartItems.map((item) =>
                item.product_id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ),
        })),

    decrementQty: (productId) =>
        set((state) => ({
            cartItems: state.cartItems
                .map((item) =>
                    item.product_id === productId
                        ? { ...item, quantity: Math.max(0, item.quantity - 1) }
                        : item
                )
                .filter((item) => item.quantity > 0),
        })),

    removeItem: (productId) =>
        set((state) => ({
            cartItems: state.cartItems.filter((item) => item.product_id !== productId),
        })),

    resetStore: () =>
        set({
            cartItems: [],
            shippingFee: 0,
            discount: 0,
            shippingAddress: null,
        }),
}));
