"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
    return (
        <section className="py-24 bg-[#FF5757] relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('/images/hero-bg.png')] bg-cover bg-center mix-blend-multiply" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
                    Ready to streamline your supply chain?
                </h2>
                <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
                    Join thousands of businesses that trust Containa for their logistics needs. Get a quote today or contact our team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/contact"
                        className="px-8 py-4 bg-white text-[#FF5757] font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        Contact Us
                        <ArrowRight size={20} />
                    </Link>
                    <Link
                        href="/tracking"
                        className="px-8 py-4 bg-[#0B1221] text-white font-bold rounded-xl hover:bg-gray-900 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        Track Shipment
                    </Link>
                </div>
            </div>
        </section>
    );
}
