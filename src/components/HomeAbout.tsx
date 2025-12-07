"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HomeAbout() {
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
                        <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                            <Image
                                src="/images/overview.png"
                                alt="Logistics Operations"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>

                        {/* Experience Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-[#FF5757] text-white p-8 rounded-3xl shadow-xl hidden md:block">
                            <p className="text-4xl font-bold mb-1">25+</p>
                            <p className="text-sm font-medium opacity-90">Years of<br />Experience</p>
                        </div>

                        {/* Decorative Element */}
                        <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gray-100 rounded-full -z-10 blur-3xl opacity-50" />
                    </motion.div>

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#FF5757] text-sm font-bold mb-6 uppercase tracking-wider">
                            About Us
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#0B1221] mb-8 leading-tight">
                            We provide the best <span className="text-[#FF5757]">logistics solutions</span> for your business
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Containa is a global leader in supply chain management and logistics. We combine industry expertise with cutting-edge technology to deliver seamless, efficient, and sustainable solutions for businesses of all sizes.
                        </p>

                        <div className="space-y-4 mb-10">
                            {[
                                "Global Network Coverage",
                                "Real-time Cargo Tracking",
                                "Cost-Effective Shipping",
                                "24/7 Customer Support"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="text-[#FF5757]" size={20} />
                                    <span className="text-[#0B1221] font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0B1221] hover:bg-[#1a2332] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            Read More
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
