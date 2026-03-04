"use client";

import Link from "next/link";
import { Leaf, ShoppingCart } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                            <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
                            Ecoyaan
                        </span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <span className="hidden sm:block text-sm text-slate-500 font-medium">
                            Eco-friendly Shopping
                        </span>
                        <Link
                            href="/"
                            className="relative p-2 rounded-xl hover:bg-primary-50 transition-colors group"
                        >
                            <ShoppingCart className="w-5 h-5 text-slate-600 group-hover:text-primary-600 transition-colors" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                2
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
