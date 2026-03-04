"use client";

import { CartItem } from "@/types/cart";
import { ShoppingBag, Truck, Tag, Receipt } from "lucide-react";

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
        <div className="card p-5 sm:p-6 animate-fade-in-up">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-5">
                <Receipt className="w-5 h-5 text-primary-500" />
                Order Summary
            </h2>

            <div className="space-y-3.5">
                <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-500">
                        <ShoppingBag className="w-4 h-4" />
                        Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)
                    </span>
                    <span className="font-semibold text-slate-700">
                        ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-500">
                        <Truck className="w-4 h-4" />
                        Shipping Fee
                    </span>
                    <span className="font-semibold text-slate-700">
                        {shippingFee === 0 ? (
                            <span className="text-primary-600">Free</span>
                        ) : (
                            `₹${shippingFee.toLocaleString("en-IN")}`
                        )}
                    </span>
                </div>

                {discount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-primary-600">
                            <Tag className="w-4 h-4" />
                            Discount
                        </span>
                        <span className="font-semibold text-primary-600">
                            -₹{discount.toLocaleString("en-IN")}
                        </span>
                    </div>
                )}

                <div className="border-t border-dashed border-slate-200 pt-3.5 mt-3.5">
                    <div className="flex items-center justify-between">
                        <span className="text-base font-bold text-slate-800">Grand Total</span>
                        <span className="text-xl font-extrabold text-primary-600">
                            ₹{grandTotal.toLocaleString("en-IN")}
                        </span>
                    </div>
                </div>
            </div>

            {showButton && onButtonClick && (
                <button
                    onClick={onButtonClick}
                    className="btn-primary w-full mt-6 text-center flex items-center justify-center gap-2"
                >
                    {buttonLabel}
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}
