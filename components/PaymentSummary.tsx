"use client";

import { CartItem } from "@/types/cart";
import { ShippingAddress } from "@/types/cart";
import {
    MapPin,
    User,
    Mail,
    Phone,
} from "lucide-react";

interface PaymentSummaryProps {
    cartItems: CartItem[];
    shippingFee: number;
    discount: number;
    shippingAddress: ShippingAddress;
}

export default function PaymentSummary({
    cartItems,
    shippingFee,
    discount,
    shippingAddress,
}: PaymentSummaryProps) {
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.product_price * item.quantity,
        0
    );
    const grandTotal = subtotal + shippingFee - discount;

    return (
        <div className="space-y-4 animate-fade-in-up">
            {/* Shipping Address Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    Delivering to
                </h3>
                <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                        <User className="w-4.5 h-4.5 text-primary-500" />
                    </div>
                    <div>
                        <p className="font-semibold text-slate-800">{shippingAddress.fullName}</p>
                        <div className="mt-1 space-y-0.5">
                            <p className="text-sm text-slate-500 flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 text-slate-400" />
                                {shippingAddress.phone}
                            </p>
                            <p className="text-sm text-slate-500 flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-slate-400" />
                                {shippingAddress.email}
                            </p>
                            <p className="text-sm text-slate-500 flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                {shippingAddress.city}, {shippingAddress.state} — {shippingAddress.pinCode}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Order Summary</h3>
                <div className="space-y-3">
                    {cartItems.map((item) => (
                        <div
                            key={item.product_id}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary-300" />
                                <div>
                                    <p className="text-sm font-medium text-slate-700 leading-snug">{item.product_name}</p>
                                    <p className="text-xs text-slate-400">x{item.quantity} &nbsp;&#183;&nbsp; &#8377;{item.product_price.toLocaleString("en-IN")} each</p>
                                </div>
                            </div>
                            <p className="text-sm font-semibold text-slate-700 shrink-0 ml-4">
                                &#8377;{(item.product_price * item.quantity).toLocaleString("en-IN")}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-4 pt-4 border-t border-dashed border-slate-200 space-y-2">
                    <div className="flex justify-between text-sm text-slate-500">
                        <span>Subtotal</span>
                        <span className="font-medium text-slate-700">&#8377;{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500">
                        <span>Shipping</span>
                        <span className="font-medium text-slate-700">
                            {shippingFee === 0 ? <span className="text-primary-600 font-semibold">Free</span> : `&#8377;${shippingFee.toLocaleString("en-IN")}`}
                        </span>
                    </div>
                    {discount > 0 && (
                        <div className="flex justify-between text-sm">
                            <span className="text-primary-600">Discount</span>
                            <span className="font-medium text-primary-600">-&#8377;{discount.toLocaleString("en-IN")}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                        <span className="font-bold text-slate-800">Total Payable</span>
                        <span className="text-xl font-extrabold text-primary-600">
                            &#8377;{grandTotal.toLocaleString("en-IN")}
                        </span>
                    </div>
                </div>
            </div>

            <p className="text-xs text-center text-slate-400 flex items-center justify-center gap-1.5 pb-1">
                <svg className="w-3.5 h-3.5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secured with 256-bit SSL encryption
            </p>
        </div>
    );
}
