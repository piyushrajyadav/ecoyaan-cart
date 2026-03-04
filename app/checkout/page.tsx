"use client";

import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/store/checkoutStore";
import { ShippingAddress } from "@/types/cart";
import CheckoutProgress from "@/components/CheckoutProgress";
import AddressForm from "@/components/AddressForm";
import { MapPin } from "lucide-react";

export default function CheckoutPage() {
    const router = useRouter();
    const setShippingAddress = useCheckoutStore((s) => s.setShippingAddress);
    const savedAddress = useCheckoutStore((s) => s.shippingAddress);

    const handleSubmit = (data: ShippingAddress) => {
        setShippingAddress(data);
        router.push("/payment");
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CheckoutProgress currentStep={1} />

            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 flex items-center gap-2">
                    <MapPin className="w-7 h-7 text-primary-500" />
                    Shipping Address
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    Where should we deliver your eco-friendly products?
                </p>
            </div>

            <div className="card p-5 sm:p-8 animate-fade-in-up">
                <AddressForm
                    onSubmit={handleSubmit}
                    defaultValues={savedAddress || undefined}
                />
            </div>
        </div>
    );
}
