"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Testimonials() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 text-sm font-medium mb-6 shadow-sm">
                            Testimonials
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#0B1221] tracking-tight">
                            Customer experiences that inspire trust
                        </h2>
                    </div>
                    <p className="text-gray-600 max-w-md text-lg">
                        In today's fast-paced business environment, a streamlined supply chain is no longer a luxury but a necessity.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Person 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative h-[500px] rounded-3xl overflow-hidden group"
                    >
                        <Image
                            src="/images/person-1.png"
                            alt="Customer 1"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>

                    {/* Quote Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white p-10 rounded-3xl shadow-sm flex flex-col justify-between border border-gray-100 relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <p className="text-2xl font-medium text-[#0B1221] leading-relaxed mb-8">
                                "Kenny Logistics Services Has Been An Exceptional Logistics Partner For Me. Their User-Friendly Platform Has Made Managing Shipments A Breeze."
                            </p>
                        </div>

                        <div className="flex items-center justify-between relative z-10">
                            <div>
                                <h4 className="font-bold text-[#0B1221] text-lg">Alejandro Garnacho</h4>
                                <p className="text-gray-500">Management Resource</p>
                            </div>
                            <div className="h-8 relative w-24">
                                {/* FedEx Logo Placeholder - using text for simplicity/copyright safety, or a simple svg if preferred. 
                     The user screenshot had FedEx. I'll use a text representation styled to look like a logo 
                     or a generic placeholder if I don't have the SVG. 
                     I'll use a simple text for now to avoid external assets issues. */}
                                <span className="text-[#4D148C] font-bold text-xl italic">FedEx</span>
                            </div>
                        </div>

                        {/* Decorative Quote Icon */}
                        <div className="absolute top-8 right-8 text-gray-100">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                            </svg>
                        </div>
                    </motion.div>

                    {/* Person 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="relative h-[500px] rounded-3xl overflow-hidden group"
                    >
                        <Image
                            src="/images/person-2.png"
                            alt="Customer 2"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
