"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Overview() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/overview.png"
                                alt="Logistics Overview"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>

                        {/* Decorative Element */}
                        <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-red-50 rounded-full -z-10 blur-3xl opacity-50" />
                        <div className="absolute -top-8 -left-8 w-64 h-64 bg-blue-50 rounded-full -z-10 blur-3xl opacity-50" />
                    </motion.div>

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-gray-600 text-sm font-medium mb-6">
                            Overview
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#0B1221] mb-8 leading-tight">
                            Control, visibility, efficiency from start - finish
                        </h2>
                        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                            Supply chains can be complicated. That's why we have designed our Supply Chain Management (SCM) services to help cater to your logistics complexities. We provide the tools and expertise you need to stay ahead.
                        </p>

                        <button className="px-8 py-4 bg-[#FF5757] hover:bg-[#ff4444] text-white font-semibold rounded-xl transition-all flex items-center gap-2 group shadow-lg shadow-red-200">
                            Read More
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
