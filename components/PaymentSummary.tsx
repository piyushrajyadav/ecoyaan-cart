"use client";

import { CartItem } from "@/types/cart";
import { ShippingAddress } from "@/types/cart";
import {
    Shield,
    MapPin,
    User,
    Mail,
    Phone,
    Loader2,
} from "lucide-react";

interface PaymentSummaryProps {
    cartItems: CartItem[];
    shippingFee: number;
    discount: number;
    shippingAddress: ShippingAddress;
    isProcessing: boolean;
    onPay: () => void;
}

export default function PaymentSummary({
    cartItems,
    shippingFee,
    discount,
    shippingAddress,
    isProcessing,
    onPay,
}: PaymentSummaryProps) {
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.product_price * item.quantity,
        0
    );
    const grandTotal = subtotal + shippingFee - discount;

    return (
        <div className="space-y-5 animate-fade-in-up">
            {/* Shipping Address Card */}
            <div className="card p-5">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                    <MapPin className="w-4.5 h-4.5 text-primary-500" />
                    Shipping Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                        <User className="w-4 h-4 text-slate-400" />
                        {shippingAddress.fullName}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                        <Mail className="w-4 h-4 text-slate-400" />
                        {shippingAddress.email}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                        <Phone className="w-4 h-4 text-slate-400" />
                        {shippingAddress.phone}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pinCode}
                    </div>
                </div>
            </div>

            {/* Order Items */}
            <div className="card p-5">
                <h3 className="font-bold text-slate-800 mb-4">Order Items</h3>
                <div className="space-y-3">
                    {cartItems.map((item) => (
                        <div
                            key={item.product_id}
                            className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
                        >
                            <div>
                                <p className="text-sm font-medium text-slate-700">{item.product_name}</p>
                                <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-semibold text-slate-700">
                                ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="border-t border-dashed border-slate-200 mt-4 pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-slate-500">
                        <span>Subtotal</span>
                        <span className="font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500">
                        <span>Shipping</span>
                        <span className="font-medium">₹{shippingFee.toLocaleString("en-IN")}</span>
                    </div>
                    {discount > 0 && (
                        <div className="flex justify-between text-sm text-primary-600">
                            <span>Discount</span>
                            <span className="font-medium">-₹{discount.toLocaleString("en-IN")}</span>
                        </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-slate-200">
                        <span className="text-base font-bold text-slate-800">Total</span>
                        <span className="text-xl font-extrabold text-primary-600">
                            ₹{grandTotal.toLocaleString("en-IN")}
                        </span>
                    </div>
                </div>
            </div>

            {/* Pay Button */}
            <button
                onClick={onPay}
                disabled={isProcessing}
                className="btn-primary w-full flex items-center justify-center gap-2.5 text-base"
            >
                {isProcessing ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin-slow" />
                        Processing Payment...
                    </>
                ) : (
                    <>
                        <Shield className="w-5 h-5" />
                        Pay Securely — ₹{grandTotal.toLocaleString("en-IN")}
                    </>
                )}
            </button>

            <p className="text-xs text-center text-slate-400 flex items-center justify-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                Secured with 256-bit SSL encryption
            </p>
        </div>
    );
}
