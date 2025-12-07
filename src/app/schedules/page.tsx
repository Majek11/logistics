import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import { Search, Ship, Calendar, Clock, ArrowRight } from "lucide-react";

export default function SchedulesPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <PageHeader
                title="Sailing Schedules"
                description="Find the perfect departure for your cargo. Search our global network of shipping routes and schedules."
            />

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    {/* Search Card */}
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 -mt-32 relative z-10 mb-16">
                        <form className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                            <div className="md:col-span-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Origin Port</label>
                                <input type="text" placeholder="e.g. Shanghai" className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5757] transition-colors" />
                            </div>
                            <div className="md:col-span-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Destination Port</label>
                                <input type="text" placeholder="e.g. Rotterdam" className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5757] transition-colors" />
                            </div>
                            <div className="md:col-span-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Departure Date</label>
                                <input type="date" className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5757] transition-colors" />
                            </div>
                            <div className="md:col-span-1">
                                <button type="submit" className="w-full h-12 bg-[#FF5757] hover:bg-[#ff4444] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                                    Search
                                    <Search size={20} />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Results Table (Mock) */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8 border-b border-gray-100">
                            <h2 className="text-2xl font-bold text-[#0B1221]">Upcoming Departures</h2>
                            <p className="text-gray-500">Showing schedules for popular routes</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-600 font-semibold text-sm uppercase tracking-wider">
                                    <tr>
                                        <th className="p-6">Vessel</th>
                                        <th className="p-6">Route</th>
                                        <th className="p-6">Departure</th>
                                        <th className="p-6">Arrival</th>
                                        <th className="p-6">Transit Time</th>
                                        <th className="p-6">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        { vessel: "MSC GULSUN", route: "Shanghai → Rotterdam", dep: "12 Aug 2024", arr: "15 Sep 2024", time: "34 Days" },
                                        { vessel: "MAERSK MC-KINNEY", route: "Singapore → Los Angeles", dep: "14 Aug 2024", arr: "02 Sep 2024", time: "19 Days" },
                                        { vessel: "CMA CGM JACQUES", route: "Hamburg → New York", dep: "16 Aug 2024", arr: "26 Aug 2024", time: "10 Days" },
                                        { vessel: "HMM ALGECIRAS", route: "Busan → Dubai", dep: "18 Aug 2024", arr: "08 Sep 2024", time: "21 Days" },
                                        { vessel: "EVER ACE", route: "Tokyo → Vancouver", dep: "20 Aug 2024", arr: "30 Aug 2024", time: "10 Days" },
                                    ].map((row, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors group">
                                            <td className="p-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                                        <Ship size={20} />
                                                    </div>
                                                    <span className="font-semibold text-[#0B1221]">{row.vessel}</span>
                                                </div>
                                            </td>
                                            <td className="p-6 text-gray-600">{row.route}</td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Calendar size={16} />
                                                    {row.dep}
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Calendar size={16} />
                                                    {row.arr}
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Clock size={16} />
                                                    {row.time}
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-[#0B1221] hover:text-white hover:border-[#0B1221] transition-all flex items-center gap-2">
                                                    Book
                                                    <ArrowRight size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
