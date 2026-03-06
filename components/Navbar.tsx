"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
            <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-sm">
                            <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-800 tracking-tight">
                            Ecoyaan
                        </span>
                    </Link>

                    <span className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary-700 bg-primary-50 border border-primary-100 px-4 py-2 rounded-full">
                        <Leaf className="w-3.5 h-3.5" />
                        Sustainable Shopping
                    </span>
                </div>
            </div>
        </nav>
    );
}
