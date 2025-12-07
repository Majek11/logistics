"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Plane, Box, Truck, Anchor, ShoppingBag, Cpu } from "lucide-react";

const caseStudies = [
    {
        image: "/images/case-1.png",
        tags: ["Air Freight", "Supply Chain", "Asia"],
        title: "Integrated Solution for the World's Leading Salmon Producer",
        date: "12 December 2024",
        location: "Indonesia",
    },
    {
        image: "/images/case-2.png",
        tags: ["Warehousing", "Supply Chain", "America"],
        title: "Abacus teams up with Containa to drive efficiency",
        date: "13 June 2024",
        location: "United States",
    },
    {
        gradient: "from-orange-400 to-red-500",
        icon: Plane,
        tags: ["Air Freight", "Growth"],
        title: "Enabling Manitoba's growth with a strategic partnership",
        date: "26 March 2024",
        location: "Spain",
    },
    {
        gradient: "from-teal-400 to-emerald-500",
        icon: Box,
        tags: ["Air Freight", "Supply Chain"],
        title: "A Partnership to transform Automotive Supply Chain",
        date: "30 April 2024",
        location: "Hungary",
    },
    {
        gradient: "from-purple-400 to-pink-500",
        icon: Truck,
        tags: ["Cargo", "Middle East"],
        title: "Tailored End-to-End Solution for Rally Car Events",
        date: "15 May 2024",
        location: "Dubai",
    },
    {
        gradient: "from-pink-400 to-rose-500",
        icon: ShoppingBag,
        tags: ["E-commerce", "Technology"],
        title: "Streamlining Global E-commerce Logistics",
        date: "22 July 2024",
        location: "Singapore",
    },
];

export default function CaseStudies() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-gray-600 text-sm font-medium mb-6">
                            Case Studies
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#0B1221] tracking-tight">
                            Simplify your supply chain with our expertise
                        </h2>
                    </div>
                    <button className="px-6 py-3 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors">
                        View All Case Studies
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {caseStudies.map((study, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative h-72 rounded-2xl overflow-hidden mb-6 shadow-sm">
                                {study.image ? (
                                    <Image
                                        src={study.image}
                                        alt={study.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient} flex items-center justify-center transition-transform duration-700 group-hover:scale-110`}>
                                        {study.icon && <study.icon className="text-white/80 w-20 h-20" strokeWidth={1.5} />}
                                    </div>
                                )}

                                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                    {study.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#0B1221] text-xs font-semibold rounded-full shadow-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                                <div className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                                    <ArrowUpRight size={20} className="text-[#0B1221]" />
                                </div>
                            </div>

                            <div>
                                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                                    Case Studies
                                </span>
                                <h3 className="text-xl font-bold text-[#0B1221] mb-3 group-hover:text-[#FF5757] transition-colors line-clamp-2">
                                    {study.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {study.date} • {study.location}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
