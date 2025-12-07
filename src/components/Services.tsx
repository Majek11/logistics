"use client";

import { motion } from "framer-motion";
import { Globe, Truck, Trash2, Package, ShieldCheck, Clock } from "lucide-react";

const services = [
    {
        icon: Truck,
        title: "Cargo and Logistics",
        description: "Comprehensive cargo solutions for businesses of all sizes. We handle domestic and international freight with precision.",
    },
    {
        icon: Package,
        title: "Man and Van",
        description: "Reliable man and van services for smaller moves and deliveries. Professional handling of your personal items.",
    },
    {
        icon: Trash2,
        title: "Waste Removal",
        description: "Eco-friendly waste removal and disposal services. We ensure responsible recycling and clearance.",
    },
    {
        icon: Globe,
        title: "Global Shipping",
        description: "Seamless international shipping network connecting you to markets worldwide with customs expertise.",
    },
    {
        icon: ShieldCheck,
        title: "Secure Storage",
        description: "State-of-the-art warehousing facilities with 24/7 security to keep your goods safe and accessible.",
    },
    {
        icon: Clock,
        title: "Express Delivery",
        description: "Time-critical delivery solutions when speed is your top priority. Same-day and next-day options available.",
    },
];

export default function Services() {
    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-20 right-10 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-20 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-gray-200 text-[#FF5757] text-sm font-bold mb-6 shadow-sm uppercase tracking-wider">
                        Our Services
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#0B1221] mb-6 tracking-tight">
                        Comprehensive logistics solutions
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        From large-scale cargo to specialized waste removal, we provide the essential services to keep your operations moving.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-100 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-full -mr-4 -mt-4 transition-colors group-hover:bg-[#FF5757]/10"></div>

                            <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FF5757] transition-colors duration-300 relative z-10">
                                <service.icon className="text-[#FF5757] group-hover:text-white transition-colors duration-300" size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-[#0B1221] mb-4 group-hover:text-[#FF5757] transition-colors relative z-10">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed relative z-10">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
