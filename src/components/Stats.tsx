"use client";

import { motion } from "framer-motion";

const stats = [
    { value: "15K+", label: "Delivered Packages" },
    { value: "250+", label: "Countries Served" },
    { value: "1.2K", label: "Satisfied Clients" },
    { value: "50+", label: "Awards Won" },
];

export default function Stats() {
    return (
        <section className="py-20 bg-[#0B1221] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center mix-blend-overlay" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</h3>
                            <p className="text-gray-400 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
