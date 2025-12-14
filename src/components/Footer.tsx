"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#0B1221] text-white pt-24 pb-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Column */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <img src="/images/logo.png" alt="Kenny Logistics Services" className="h-12 w-auto" />
                        </Link>
                        <p className="text-gray-400 leading-relaxed mb-8">
                            Kenny Logistics Services - Leading the way in global supply chain management and logistics solutions. We connect your business to the world.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#E55D2C] hover:text-white transition-all"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Services</h4>
                        <ul className="space-y-4">
                            {["Supply Chain", "Air Freight", "Warehousing", "Cargo", "Customs Brokerage"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-400 hover:text-[#E55D2C] transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Company</h4>
                        <ul className="space-y-4">
                            {["About Us", "Case Studies", "Our Team", "Careers", "News & Insights"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-400 hover:text-[#E55D2C] transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Contact</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li>info@kennylogistics.com</li>
                            <li>07502142839</li>
                            <li>
                                6 Jaxons Court, Hallgate, Wigan<br />
                                ( By Stand U, Wigan Bus Station ) WN1 1LR
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    &copy; {new Date().getFullYear()} Kenny Logistics Services. All rights reserved.
                    <div className="flex gap-8 text-sm text-gray-500">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
