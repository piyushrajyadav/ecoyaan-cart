"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CartResponse } from "@/types/cart";
import { useCheckoutStore } from "@/store/checkoutStore";
import CheckoutProgress from "@/components/CheckoutProgress";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import { Leaf } from "lucide-react";

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

    const items = cartItems.length > 0 ? cartItems : data.cartItems;
    const fee = cartItems.length > 0 ? shippingFee : data.shipping_fee;
    const disc = cartItems.length > 0 ? discount : data.discount_applied;

    return (
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-10">
            <CheckoutProgress currentStep={0} />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Your Cart
                </h1>
                <p className="text-slate-400 text-sm mt-0.5">
                    {items.length === 0
                        ? "Nothing here yet"
                        : `${items.reduce((s, i) => s + i.quantity, 0)} item${items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""} ready to checkout`}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-3">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <CartItem key={item.product_id} item={item} />
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
                            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-slate-100 flex items-center justify-center">
                                <Leaf className="w-6 h-6 text-slate-300" />
                            </div>
                            <p className="text-slate-500 font-medium">Your cart is empty</p>
                            <p className="text-sm text-slate-400 mt-1">Add some eco-friendly products!</p>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="lg:sticky lg:top-20 space-y-3">
                        <OrderSummary
                            cartItems={items}
                            shippingFee={fee}
                            discount={disc}
                            buttonLabel="Proceed to Checkout"
                            onButtonClick={() => router.push("/checkout")}
                            showButton={items.length > 0}
                        />

                        <div className="px-4 py-3 rounded-xl bg-primary-50 border border-primary-100">
                            <p className="text-xs text-primary-700 leading-relaxed text-center font-medium">
                                🌱 Every order plants a tree &mdash; free shipping above &#8377;999
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
