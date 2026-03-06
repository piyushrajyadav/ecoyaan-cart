"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/store/checkoutStore";
import CheckoutProgress from "@/components/CheckoutProgress";
import PaymentSummary from "@/components/PaymentSummary";
import { CreditCard, ChevronLeft, Shield, Loader2 } from "lucide-react";

export default function PaymentPage() {
    const router = useRouter();
    const { cartItems, shippingFee, discount, shippingAddress } = useCheckoutStore();
    const [isProcessing, setIsProcessing] = useState(false);

    const subtotal = cartItems.reduce((sum, item) => sum + item.product_price * item.quantity, 0);
    const grandTotal = subtotal + shippingFee - discount;

    useEffect(() => {
        if (!shippingAddress || cartItems.length === 0) {
            router.replace("/");
        }
    }, [shippingAddress, cartItems, router]);

    if (!shippingAddress || cartItems.length === 0) {
        return null;
    }

    const handlePay = () => {
        setIsProcessing(true);
        setTimeout(() => {
            router.push("/success");
        }, 2500);
    };

    return (
        <>
            <div className="max-w-2xl mx-auto px-6 sm:px-8 py-8 pb-32">
                <CheckoutProgress currentStep={2} />

                <div className="mb-6">
                    <div className="flex items-center gap-2.5 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                            <CreditCard className="w-4 h-4 text-primary-600" />
                        </div>
                        <h1 className="text-xl font-bold text-slate-800">Review & Pay</h1>
                    </div>
                    <p className="text-sm text-slate-400 pl-10.5">
                        Check your order details before completing payment
                    </p>
                </div>

                <PaymentSummary
                    cartItems={cartItems}
                    shippingFee={shippingFee}
                    discount={discount}
                    shippingAddress={shippingAddress}
                />
            </div>

            {/* Sticky footer */}
            <div className="sticky-action-bar">
                <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
                    <button
                        onClick={() => router.back()}
                        disabled={isProcessing}
                        className="btn-outline flex items-center gap-2 disabled:opacity-40"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                    </button>

                    <button
                        onClick={handlePay}
                        disabled={isProcessing}
                        className="btn-primary flex items-center gap-2.5"
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Shield className="w-4 h-4" />
                                Pay &#8377;{grandTotal.toLocaleString("en-IN")}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
}
