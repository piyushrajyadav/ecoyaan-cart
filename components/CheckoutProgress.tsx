"use client";

import { ShoppingCart, MapPin, CreditCard, CheckCircle2 } from "lucide-react";

const steps = [
    { label: "Cart", icon: ShoppingCart },
    { label: "Address", icon: MapPin },
    { label: "Payment", icon: CreditCard },
    { label: "Done", icon: CheckCircle2 },
];

interface CheckoutProgressProps {
    currentStep: number;
}

export default function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
    return (
        <div className="w-full max-w-xs mx-auto mb-8">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;

                    return (
                        <div key={step.label} className="flex items-center flex-1 last:flex-none">
                            <div className="flex flex-col items-center gap-1">
                                <div
                                    className={`
                                        w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300
                                        ${isCompleted
                                            ? "bg-primary-500 text-white"
                                            : isActive
                                                ? "bg-primary-500 text-white ring-4 ring-primary-100"
                                                : "bg-white border-2 border-slate-200 text-slate-400"
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                </div>
                                <span
                                    className={`text-[11px] font-medium transition-colors duration-300 ${
                                        isActive ? "text-primary-600" : isCompleted ? "text-primary-500" : "text-slate-400"
                                    }`}
                                >
                                    {step.label}
                                </span>
                            </div>

                            {index < steps.length - 1 && (
                                <div className="flex-1 mx-1.5 mb-4">
                                    <div className="h-0.5 rounded-full bg-slate-200 overflow-hidden">
                                        <div
                                            className={`h-full bg-primary-500 rounded-full transition-all duration-500 ${
                                                isCompleted ? "w-full" : "w-0"
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
