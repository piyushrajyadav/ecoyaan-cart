import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, ShippingAddress } from "@/types/cart";

interface CheckoutState {
    cartItems: CartItem[];
    shippingFee: number;
    discount: number;
    shippingAddress: ShippingAddress | null;
    savedAddresses: ShippingAddress[];
    selectedAddressIndex: number | null;
    setCartData: (items: CartItem[], shippingFee: number, discount: number) => void;
    setShippingAddress: (address: ShippingAddress) => void;
    addSavedAddress: (address: ShippingAddress) => void;
    removeSavedAddress: (index: number) => void;
    setSelectedAddressIndex: (index: number | null) => void;
    incrementQty: (productId: number) => void;
    decrementQty: (productId: number) => void;
    removeItem: (productId: number) => void;
    resetStore: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
    persist(
        (set) => ({
            cartItems: [],
            shippingFee: 0,
            discount: 0,
            shippingAddress: null,
            savedAddresses: [],
            selectedAddressIndex: null,

            setCartData: (items, shippingFee, discount) =>
                set({ cartItems: items, shippingFee, discount }),

            setShippingAddress: (address) =>
                set({ shippingAddress: address }),

            addSavedAddress: (address) =>
                set((state) => ({
                    savedAddresses: [...state.savedAddresses, address],
                })),

            removeSavedAddress: (index) =>
                set((state) => ({
                    savedAddresses: state.savedAddresses.filter((_, i) => i !== index),
                    selectedAddressIndex:
                        state.selectedAddressIndex === index
                            ? null
                            : state.selectedAddressIndex !== null && state.selectedAddressIndex > index
                            ? state.selectedAddressIndex - 1
                            : state.selectedAddressIndex,
                })),

            setSelectedAddressIndex: (index) =>
                set({ selectedAddressIndex: index }),

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
        }),
        {
            name: "ecoyaan-checkout-v1",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                savedAddresses: state.savedAddresses,
                shippingAddress: state.shippingAddress,
                selectedAddressIndex: state.selectedAddressIndex,
            }),
        }
    )
);
