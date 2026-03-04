"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CartResponse } from "@/types/cart";
import { useCheckoutStore } from "@/store/checkoutStore";
import CheckoutProgress from "@/components/CheckoutProgress";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";

interface CartPageClientProps {
    data: CartResponse;
}

export default function CartPageClient({ data }: CartPageClientProps) {
    const router = useRouter();
    const setCartData = useCheckoutStore((s) => s.setCartData);
    const cartItems = useCheckoutStore((s) => s.cartItems);
    const shippingFee = useCheckoutStore((s) => s.shippingFee);
    const discount = useCheckoutStore((s) => s.discount);

    useEffect(() => {
        setCartData(data.cartItems, data.shipping_fee, data.discount_applied);
    }, [data, setCartData]);

    // Use store data if hydrated, otherwise fall back to SSR data
    const items = cartItems.length > 0 ? cartItems : data.cartItems;
    const fee = cartItems.length > 0 ? shippingFee : data.shipping_fee;
    const disc = cartItems.length > 0 ? discount : data.discount_applied;

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
            <CheckoutProgress currentStep={0} />

            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Shopping Cart
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                    {items.length} {items.length === 1 ? "item" : "items"} in your cart
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-3">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <CartItem key={item.product_id} item={item} />
                        ))
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                            <p className="text-slate-400 text-lg">Your cart is empty</p>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="lg:sticky lg:top-20 space-y-4">
                        <OrderSummary
                            cartItems={items}
                            shippingFee={fee}
                            discount={disc}
                            buttonLabel="Proceed to Checkout"
                            onButtonClick={() => router.push("/checkout")}
                            showButton={items.length > 0}
                        />

                        <div className="px-4 py-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                            <p className="text-xs text-emerald-700 leading-relaxed text-center">
                                🌱 Every order plants a tree. Free shipping on orders above ₹999.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
