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
        <div className="group bg-white rounded-2xl border border-slate-100 p-4 transition-all duration-200 hover:border-slate-200 hover:shadow-sm">
            <div className="flex gap-3.5">
                {/* Product thumbnail */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-primary-50 to-emerald-50 flex-shrink-0 flex items-center justify-center">
                    <Leaf className="w-6 h-6 sm:w-7 sm:h-7 text-primary-300" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-slate-800 text-sm leading-snug">
                            {item.product_name}
                        </h3>
                        <button
                            onClick={() => removeItem(item.product_id)}
                            className="p-1.5 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 shrink-0"
                            aria-label="Remove item"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                        &#8377;{item.product_price.toLocaleString("en-IN")} each
                    </p>

                    <div className="flex items-center justify-between mt-3">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-0.5">
                            <button
                                onClick={() => decrementQty(item.product_id)}
                                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer"
                                aria-label="Decrease quantity"
                            >
                                <Minus className="w-3 h-3" />
                            </button>
                            <div className="w-9 h-7 flex items-center justify-center text-sm font-bold text-slate-700">
                                {item.quantity}
                            </div>
                            <button
                                onClick={() => incrementQty(item.product_id)}
                                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 active:bg-primary-100 transition-colors cursor-pointer"
                                aria-label="Increase quantity"
                            >
                                <Plus className="w-3 h-3" />
                            </button>
                        </div>

                        <p className="text-base font-bold text-slate-800">
                            &#8377;{lineTotal.toLocaleString("en-IN")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
