"use client";

import { CartItem } from "@/types/cart";
import { ShoppingBag, Truck, Tag } from "lucide-react";

interface OrderSummaryProps {
    cartItems: CartItem[];
    shippingFee: number;
    discount: number;
    buttonLabel?: string;
    onButtonClick?: () => void;
    showButton?: boolean;
}

export default function OrderSummary({
    cartItems,
    shippingFee,
    discount,
    buttonLabel = "Proceed to Checkout",
    onButtonClick,
    showButton = true,
}: OrderSummaryProps) {
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.product_price * item.quantity,
        0
    );
    const grandTotal = subtotal + shippingFee - discount;

    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-5 animate-fade-in-up">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">
                Order Summary
            </h2>

            <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-slate-500">
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Subtotal
                        <span className="text-slate-400 text-xs">({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    </span>
                    <span className="font-semibold text-slate-700">
                        &#8377;{subtotal.toLocaleString("en-IN")}
                    </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-slate-500">
                        <Truck className="w-3.5 h-3.5" />
                        Shipping
                    </span>
                    <span className="font-semibold">
                        {shippingFee === 0 ? (
                            <span className="text-primary-600">Free</span>
                        ) : (
                            <span className="text-slate-700">&#8377;{shippingFee.toLocaleString("en-IN")}</span>
                        )}
                    </span>
                </div>

                {discount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1.5 text-primary-600">
                            <Tag className="w-3.5 h-3.5" />
                            Discount
                        </span>
                        <span className="font-semibold text-primary-600">
                            -&#8377;{discount.toLocaleString("en-IN")}
                        </span>
                    </div>
                )}

                <div className="border-t border-slate-100 pt-3 mt-1">
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">Total</span>
                        <span className="text-xl font-extrabold text-primary-600">
                            &#8377;{grandTotal.toLocaleString("en-IN")}
                        </span>
                    </div>
                </div>
            </div>

            {showButton && onButtonClick && (
                <button
                    onClick={onButtonClick}
                    className="btn-primary w-full mt-5 flex items-center justify-center gap-2"
                >
                    {buttonLabel}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </button>
            )}
        </div>
    );
}
