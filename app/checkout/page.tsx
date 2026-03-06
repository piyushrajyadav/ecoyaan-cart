"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/store/checkoutStore";
import { ShippingAddress } from "@/types/cart";
import CheckoutProgress from "@/components/CheckoutProgress";
import AddressForm from "@/components/AddressForm";
import { MapPin, Plus, ChevronLeft, ChevronRight, Trash2, CheckCircle2, User, Phone } from "lucide-react";

export default function CheckoutPage() {
    const router = useRouter();
    const {
        savedAddresses,
        selectedAddressIndex,
        addSavedAddress,
        removeSavedAddress,
        setSelectedAddressIndex,
        setShippingAddress,
    } = useCheckoutStore();

    const [localSelectedIdx, setLocalSelectedIdx] = useState<number | null>(selectedAddressIndex);
    const [showNewForm, setShowNewForm] = useState(savedAddresses.length === 0);
    const [deleteConfirmIdx, setDeleteConfirmIdx] = useState<number | null>(null);

    const handleAddressSelect = (idx: number) => {
        setLocalSelectedIdx(idx);
        setShowNewForm(false);
    };

    const handleNewAddressSubmit = (data: ShippingAddress) => {
        const withId = { ...data, id: Date.now().toString() };
        addSavedAddress(withId);
        setShippingAddress(withId);
        setSelectedAddressIndex(savedAddresses.length);
        router.push("/payment");
    };

    const handleContinue = () => {
        if (localSelectedIdx !== null && savedAddresses[localSelectedIdx]) {
            setShippingAddress(savedAddresses[localSelectedIdx]);
            setSelectedAddressIndex(localSelectedIdx);
            router.push("/payment");
        }
    };

    const handleDelete = (idx: number) => {
        removeSavedAddress(idx);
        setDeleteConfirmIdx(null);
        if (localSelectedIdx === idx) setLocalSelectedIdx(null);
        if (savedAddresses.length - 1 === 0) setShowNewForm(true);
    };

    const canContinue = showNewForm ? false : localSelectedIdx !== null;

    return (
        <>
            <div className="max-w-2xl mx-auto px-6 sm:px-8 py-8 pb-32">
                <CheckoutProgress currentStep={1} />

                {/* Page header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2.5 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-primary-600" />
                        </div>
                        <h1 className="text-xl font-bold text-slate-800">Delivery Address</h1>
                    </div>
                    <p className="text-sm text-slate-400 pl-10.5">
                        {savedAddresses.length > 0
                            ? `${savedAddresses.length} saved address${savedAddresses.length > 1 ? "es" : ""}`
                            : "Where should we deliver your order?"}
                    </p>
                </div>

                {/* Saved addresses list */}
                {savedAddresses.length > 0 && (
                    <div className="space-y-3 mb-5">
                        {savedAddresses.map((addr, idx) => {
                            const isSelected = localSelectedIdx === idx && !showNewForm;
                            return (
                                <div
                                    key={addr.id || idx}
                                    onClick={() => handleAddressSelect(idx)}
                                    className={`relative rounded-2xl border-2 cursor-pointer transition-all duration-200 p-4
                                        ${isSelected
                                            ? "border-primary-500 bg-primary-50/50 shadow-sm shadow-primary-100"
                                            : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                                        }`}
                                >
                                    {/* Selection indicator */}
                                    <div
                                        className={`absolute top-4 left-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                                            ${isSelected ? "border-primary-500 bg-primary-500" : "border-slate-300 bg-white"}`}
                                    >
                                        {isSelected && (
                                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                        )}
                                    </div>

                                    {/* Address content */}
                                    <div className="pl-8 pr-8">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="font-semibold text-slate-800 text-[15px]">
                                                {addr.fullName}
                                            </span>
                                            {idx === 0 && (
                                                <span className="text-[10px] font-bold text-primary-600 bg-primary-100 px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                                                    Default
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1 text-sm text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <Phone className="w-3.5 h-3.5" />
                                                {addr.phone}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {addr.city}, {addr.state} — {addr.pinCode}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Delete button */}
                                    {deleteConfirmIdx === idx ? (
                                        <div
                                            className="absolute top-3 right-3 flex items-center gap-1.5"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <button
                                                onClick={() => handleDelete(idx)}
                                                className="text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 px-2 py-1 rounded-lg transition-colors"
                                            >
                                                Remove
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirmIdx(null)}
                                                className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDeleteConfirmIdx(idx);
                                            }}
                                            className="absolute top-4 right-4 p-1 text-slate-300 hover:text-red-400 transition-colors rounded"
                                            aria-label="Remove address"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Add new address section */}
                {savedAddresses.length > 0 && !showNewForm && (
                    <button
                        onClick={() => {
                            setShowNewForm(true);
                            setLocalSelectedIdx(null);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed border-slate-200 text-sm font-medium text-slate-500 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50/30 transition-all duration-200 mb-5"
                    >
                        <Plus className="w-4 h-4" />
                        Add a new address
                    </button>
                )}

                {/* New address form */}
                {showNewForm && (
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 animate-fade-in-up">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2">
                                <User className="w-4.5 h-4.5 text-slate-500" />
                                <h3 className="font-semibold text-slate-700">
                                    {savedAddresses.length > 0 ? "New Delivery Address" : "Enter Delivery Address"}
                                </h3>
                            </div>
                            {savedAddresses.length > 0 && (
                                <button
                                    onClick={() => setShowNewForm(false)}
                                    className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors"
                                >
                                    Use saved address
                                </button>
                            )}
                        </div>
                        <AddressForm
                            formId="shipping-address-form"
                            onSubmit={handleNewAddressSubmit}
                            hideSubmitButton
                        />
                    </div>
                )}
            </div>

            {/* Sticky footer */}
            <div className="sticky-action-bar">
            <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
                    <button
                        onClick={() => router.push("/")}
                        className="btn-outline flex items-center gap-2"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Cart
                    </button>

                    {showNewForm ? (
                        <button
                            type="submit"
                            form="shipping-address-form"
                            className="btn-primary flex items-center gap-2"
                        >
                            Save & Continue
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            onClick={handleContinue}
                            disabled={!canContinue}
                            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                        >
                            Continue to Payment
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
