"use client";

import { useForm } from "react-hook-form";
import { ShippingAddress } from "@/types/cart";
import { User, Mail, Phone, MapPin, Building2, Map } from "lucide-react";

interface AddressFormProps {
    onSubmit: (data: ShippingAddress) => void;
    defaultValues?: ShippingAddress;
}

const fields = [
    {
        name: "fullName" as const,
        label: "Full Name",
        icon: User,
        placeholder: "John Doe",
        validation: { required: "Full name is required" },
        type: "text",
    },
    {
        name: "email" as const,
        label: "Email Address",
        icon: Mail,
        placeholder: "john@example.com",
        validation: {
            required: "Email is required",
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
            },
        },
        type: "email",
    },
    {
        name: "phone" as const,
        label: "Phone Number",
        icon: Phone,
        placeholder: "9876543210",
        validation: {
            required: "Phone number is required",
            pattern: {
                value: /^\d{10}$/,
                message: "Phone must be exactly 10 digits",
            },
        },
        type: "tel",
    },
    {
        name: "pinCode" as const,
        label: "PIN Code",
        icon: MapPin,
        placeholder: "560001",
        validation: {
            required: "PIN code is required",
            pattern: {
                value: /^\d{6}$/,
                message: "PIN code must be 6 digits",
            },
        },
        type: "text",
    },
    {
        name: "city" as const,
        label: "City",
        icon: Building2,
        placeholder: "Bangalore",
        validation: { required: "City is required" },
        type: "text",
    },
    {
        name: "state" as const,
        label: "State",
        icon: Map,
        placeholder: "Karnataka",
        validation: { required: "State is required" },
        type: "text",
    },
];

export default function AddressForm({ onSubmit, defaultValues }: AddressFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ShippingAddress>({
        defaultValues: defaultValues || undefined,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map((field) => {
                    const Icon = field.icon;
                    const error = errors[field.name];
                    return (
                        <div
                            key={field.name}
                            className={field.name === "fullName" || field.name === "email" ? "sm:col-span-2" : ""}
                        >
                            <label className="block text-sm font-medium text-slate-600 mb-1.5">
                                {field.label}
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Icon className="w-4.5 h-4.5" />
                                </div>
                                <input
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    className={`input-field ${error ? "error" : ""}`}
                                    {...register(field.name, field.validation)}
                                />
                            </div>
                            {error && (
                                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {error.message}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-6 flex items-center justify-center gap-2">
                Continue to Payment
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </button>
        </form>
    );
}
