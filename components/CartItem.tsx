"use client";

import { CartItem as CartItemType } from "@/types/cart";
import { useCheckoutStore } from "@/store/checkoutStore";
import { Minus, Plus, Trash2, Leaf } from "lucide-react";

interface CartItemProps {
    item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
    const incrementQty = useCheckoutStore((s) => s.incrementQty);
    const decrementQty = useCheckoutStore((s) => s.decrementQty);
    const removeItem = useCheckoutStore((s) => s.removeItem);

    const lineTotal = item.product_price * item.quantity;

    return (
        <div className="group bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 transition-all duration-200 hover:border-slate-200 hover:shadow-sm">
            <div className="flex gap-4">
                {/* Product thumbnail */}
                <div className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 flex-shrink-0 flex items-center justify-center">
                    <Leaf className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-300" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h3 className="font-semibold text-slate-800 text-[15px] leading-snug">
                                {item.product_name}
                            </h3>
                            <p className="text-[13px] text-slate-400 mt-0.5">
                                ₹{item.product_price.toLocaleString("en-IN")} each
                            </p>
                        </div>
                        <button
                            onClick={() => removeItem(item.product_id)}
                            className="p-1.5 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                            aria-label="Remove item"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Bottom row: quantity + price */}
                    <div className="flex items-center justify-between mt-3">
                        {/* Quantity controls */}
                        <div className="flex items-center">
                            <button
                                onClick={() => decrementQty(item.product_id)}
                                className="w-8 h-8 rounded-l-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-700 active:bg-slate-100 transition-colors"
                                aria-label="Decrease quantity"
                            >
                                <Minus className="w-3.5 h-3.5" />
                            </button>
                            <div className="w-10 h-8 border-y border-slate-200 flex items-center justify-center text-sm font-semibold text-slate-700 bg-white">
                                {item.quantity}
                            </div>
                            <button
                                onClick={() => incrementQty(item.product_id)}
                                className="w-8 h-8 rounded-r-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 active:bg-emerald-100 transition-colors"
                                aria-label="Increase quantity"
                            >
                                <Plus className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        <p className="text-base font-bold text-slate-800">
                            ₹{lineTotal.toLocaleString("en-IN")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
