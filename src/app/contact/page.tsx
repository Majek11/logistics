import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <PageHeader
                title="Contact Us"
                description="Get in touch with our team for any inquiries or support. We are here to help you 24/7."
            />

            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-3xl font-bold text-[#0B1221] mb-8">Get in touch</h2>
                            <p className="text-gray-600 mb-12 text-lg">
                                Have questions about our services or need a custom quote? We're here to help you navigate your supply chain needs.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-[#FF5757] shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0B1221] mb-2">Email Us</h3>
                                        <p className="text-gray-600">info@kennylogistics.com</p>
                                        <p className="text-gray-600">support@kennylogistics.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-[#FF5757] shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0B1221] mb-2">Call Us</h3>
                                        <p className="text-gray-600">+1 (555) 123-4567</p>
                                        <p className="text-gray-600">+1 (555) 987-6543</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-[#FF5757] shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0B1221] mb-2">Visit Us</h3>
                                        <p className="text-gray-600">
                                            123 Logistics Way<br />
                                            Port City, PC 12345<br />
                                            United States
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                        <input type="text" className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5757] transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                        <input type="text" className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5757] transition-colors" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input type="email" className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5757] transition-colors" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea rows={4} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5757] transition-colors resize-none"></textarea>
                                </div>

                                <button type="submit" className="w-full h-14 bg-[#FF5757] hover:bg-[#ff4444] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                                    Send Message
                                    <Send size={20} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
