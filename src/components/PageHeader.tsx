"use client";

import Image from "next/image";

interface PageHeaderProps {
    title: string;
    description?: string;
    image?: string;
}

export default function PageHeader({
    title,
    description,
    image = "/images/hero-bg.png"
}: PageHeaderProps) {
    return (
        <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-[#0B1221]">
            <div className="absolute inset-0 z-0 opacity-40">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221] to-transparent z-10" />

            <div className="container mx-auto px-6 relative z-20 text-center pt-20">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                    {title}
                </h1>
                {description && (
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
