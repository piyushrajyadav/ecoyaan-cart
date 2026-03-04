"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/store/checkoutStore";
import CheckoutProgress from "@/components/CheckoutProgress";
import PaymentSummary from "@/components/PaymentSummary";
import { CreditCard } from "lucide-react";

export default function PaymentPage() {
    const router = useRouter();
    const { cartItems, shippingFee, discount, shippingAddress } = useCheckoutStore();
    const [isProcessing, setIsProcessing] = useState(false);

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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CheckoutProgress currentStep={2} />

            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 flex items-center gap-2">
                    <CreditCard className="w-7 h-7 text-primary-500" />
                    Payment
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    Review your order and complete payment
                </p>
            </div>

            <PaymentSummary
                cartItems={cartItems}
                shippingFee={shippingFee}
                discount={discount}
                shippingAddress={shippingAddress}
                isProcessing={isProcessing}
                onPay={handlePay}
            />
        </div>
    );
}
