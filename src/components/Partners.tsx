"use client";

import Image from "next/image";

const partners = [
    "FedEx", "DHL", "Maersk", "UPS", "Amazon", "Alibaba"
];

export default function Partners() {
    return (
        <section className="py-12 bg-white border-b border-gray-100">
            <div className="container mx-auto px-6">
                <p className="text-center text-gray-400 text-sm font-semibold uppercase tracking-widest mb-8">Trusted by industry leaders</p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Using text placeholders styled as logos since we don't have SVGs handy, 
                but in a real app these would be SVGs */}
                    {partners.map((partner) => (
                        <span key={partner} className="text-2xl md:text-3xl font-bold text-gray-800 hover:text-[#FF5757] transition-colors cursor-default">
                            {partner}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
