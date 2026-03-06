"use client";

import { useForm } from "react-hook-form";
import { ShippingAddress } from "@/types/cart";
import { User, Mail, Phone, MapPin, Building2, Map, AlertCircle } from "lucide-react";

interface AddressFormProps {
    formId?: string;
    onSubmit: (data: ShippingAddress) => void;
    defaultValues?: ShippingAddress;
    hideSubmitButton?: boolean;
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

export default function AddressForm({
    formId,
    onSubmit,
    defaultValues,
    hideSubmitButton = false,
}: AddressFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ShippingAddress>({
        defaultValues: defaultValues || undefined,
    });

    return (
        <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map((field) => {
                    const Icon = field.icon;
                    const error = errors[field.name];
                    const isWide = field.name === "fullName" || field.name === "email";
                    return (
                        <div key={field.name} className={isWide ? "sm:col-span-2" : ""}>
                            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                {field.label}
                            </label>
                            <div className="relative">
                                <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                <input
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border transition-all duration-200 outline-none placeholder:text-slate-300
                                        ${error
                                            ? "bg-red-50 border-red-300 text-red-800 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                                            : "bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                                        }`}
                                    {...register(field.name, field.validation)}
                                />
                            </div>
                            {error && (
                                <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                    {error.message}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            {!hideSubmitButton && (
                <button
                    type="submit"
                    className="btn-primary w-full mt-2 flex items-center justify-center gap-2"
                >
                    Save & Continue
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </button>
            )}
        </form>
    );
}
