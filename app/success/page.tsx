"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCheckoutStore } from "@/store/checkoutStore";
import CheckoutProgress from "@/components/CheckoutProgress";
import { CheckCircle2, Leaf, ArrowLeft, PartyPopper } from "lucide-react";

export default function SuccessPage() {
    const resetStore = useCheckoutStore((s) => s.resetStore);

    useEffect(() => {
        // Reset the store on success
        return () => {
            resetStore();
        };
    }, [resetStore]);

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CheckoutProgress currentStep={3} />

            <div className="card p-8 sm:p-12 text-center animate-scale-in">
                {/* Confetti dots */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center justify-center">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-2 h-2 rounded-full animate-confetti"
                                style={{
                                    backgroundColor: ["#16a34a", "#22c55e", "#4ade80", "#86efac", "#fbbf24", "#f97316", "#a855f7", "#3b82f6"][i],
                                    left: `${30 + Math.random() * 40}%`,
                                    top: `${10 + Math.random() * 30}%`,
                                    animationDelay: `${i * 0.15}s`,
                                }}
                            />
                        ))}
                    </div>
                    <div className="w-20 h-20 mx-auto rounded-full bg-primary-50 flex items-center justify-center ring-4 ring-primary-100">
                        <CheckCircle2 className="w-10 h-10 text-primary-500" />
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 mb-3">
                    <PartyPopper className="w-6 h-6 text-amber-500" />
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
                        Order Successful!
                    </h1>
                    <PartyPopper className="w-6 h-6 text-amber-500 scale-x-[-1]" />
                </div>

                <p className="text-slate-500 text-base sm:text-lg max-w-md mx-auto mb-2">
                    Your eco-friendly products are on the way! 🎉
                </p>
                <p className="text-slate-400 text-sm max-w-sm mx-auto mb-8">
                    Thank you for choosing sustainable shopping. Together we make a difference!
                </p>

                {/* Eco badge */}
                <div className="inline-flex items-center gap-2 bg-primary-50 px-5 py-2.5 rounded-full mb-8">
                    <Leaf className="w-4 h-4 text-primary-500" />
                    <span className="text-sm font-semibold text-primary-700">
                        100% Carbon-Neutral Delivery
                    </span>
                </div>

                <div>
                    <Link
                        href="/"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
