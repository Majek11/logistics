import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export default function TrackingPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <PageHeader
                title="Track Shipment"
                description="Real-time visibility for your cargo. Enter your tracking number to get the latest status updates."
            />

            <div className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 max-w-3xl mx-auto -mt-32 relative z-30">
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="relative group text-left">
                                    <label className="text-sm font-semibold text-gray-700 mb-3 block">Origin</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <select className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#E55D2C] focus:ring-2 focus:ring-red-100 transition-all appearance-none cursor-pointer font-medium">
                                            <option>Bali, Indonesia</option>
                                            <option>Singapore</option>
                                            <option>Rotterdam</option>
                                            <option>Los Angeles</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="relative group text-left">
                                    <label className="text-sm font-semibold text-gray-700 mb-3 block">Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="date"
                                            className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-[#E55D2C] focus:ring-2 focus:ring-red-100 transition-all font-medium"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="relative group text-left">
                                <label className="text-sm font-semibold text-gray-700 mb-3 block">Tracking Number</label>
                                <input
                                    type="text"
                                    placeholder="e.g. TRK-123456789"
                                    className="w-full h-14 pl-6 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E55D2C] focus:ring-2 focus:ring-red-100 transition-all font-medium text-lg"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full h-16 bg-[#E55D2C] hover:bg-[#ff4444] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-lg shadow-lg shadow-red-200"
                            >
                                Track Shipment
                                <ArrowRight size={24} />
                            </button>
                        </form>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                                <MapPin size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">Real-time Tracking</h3>
                            <p className="text-gray-500">Monitor your shipment's location 24/7 with our advanced GPS systems.</p>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                                <Calendar size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">Estimated Delivery</h3>
                            <p className="text-gray-500">Get accurate delivery estimates and delay notifications instantly.</p>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                                <ArrowRight size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">Proof of Delivery</h3>
                            <p className="text-gray-500">Digital signatures and photo proof upon successful delivery.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
