"use client";

import { ShoppingCart, MapPin, CreditCard, CheckCircle2 } from "lucide-react";

const steps = [
    { label: "Cart", icon: ShoppingCart, path: "/" },
    { label: "Address", icon: MapPin, path: "/checkout" },
    { label: "Payment", icon: CreditCard, path: "/payment" },
    { label: "Success", icon: CheckCircle2, path: "/success" },
];

interface CheckoutProgressProps {
    currentStep: number;
}

export default function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
    return (
        <div className="w-full max-w-2xl mx-auto mb-8 px-4">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;

                    return (
                        <div key={step.label} className="flex items-center flex-1 last:flex-none">
                            {/* Step circle */}
                            <div className="flex flex-col items-center gap-1.5">
                                <div
                                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${isCompleted
                                            ? "bg-primary-500 text-white shadow-md shadow-primary-200"
                                            : isActive
                                                ? "bg-primary-500 text-white shadow-lg shadow-primary-200 scale-110"
                                                : "bg-slate-100 text-slate-400"
                                        }
                  `}
                                >
                                    <Icon className="w-4.5 h-4.5" />
                                </div>
                                <span
                                    className={`text-xs font-medium transition-colors duration-300 ${isActive || isCompleted ? "text-primary-600" : "text-slate-400"
                                        }`}
                                >
                                    {step.label}
                                </span>
                            </div>

                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div className="flex-1 mx-2 mb-5">
                                    <div className="h-0.5 rounded-full bg-slate-200 relative overflow-hidden">
                                        <div
                                            className={`absolute inset-y-0 left-0 bg-primary-500 rounded-full transition-all duration-500 ${isCompleted ? "w-full" : "w-0"
                                                }`}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
