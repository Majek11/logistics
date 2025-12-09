"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, ArrowRight, Check, ChevronDown } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    image: "/images/hero-bg.png",
    title: "Kenny Logistics \nServices",
    subtitle: "Global Logistics Partner"
  },
  {
    image: "/images/case-1.png", // Using case study image as placeholder for Air Freight
    title: "Fast & Reliable \nAir Freight Services",
    subtitle: "Express Delivery Solutions"
  },
  {
    image: "/images/overview.png",
    title: "Secure Warehousing \n& Distribution",
    subtitle: "End-to-End Supply Chain"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Bali, Indonesia");

  const locations = [
    "Bali, Indonesia",
    "Singapore",
    "Rotterdam",
    "Los Angeles"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Slider */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt="Logistics Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1221]/90 via-[#0B1221]/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
                {slides[currentSlide].subtitle}
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-8 whitespace-pre-line">
                {slides[currentSlide].title}
              </h1>
            </motion.div>
          </AnimatePresence>

          {/* Search/Tracking Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl max-w-md"
          >
            <h2 className="text-xl font-semibold text-white mb-6">
              Get your supply here
            </h2>
            <form className="space-y-4">
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF5757] transition-colors" size={20} />

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white text-left flex items-center justify-between focus:outline-none focus:border-[#FF5757] focus:bg-white/10 transition-all"
                  >
                    <span className="truncate">{selectedLocation}</span>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-[#1F2937] rounded-xl shadow-xl border border-white/10 overflow-hidden z-50 py-2"
                      >
                        {locations.map((location) => (
                          <button
                            key={location}
                            type="button"
                            onClick={() => {
                              setSelectedLocation(location);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3"
                          >
                            <div className="w-5 flex items-center justify-center">
                              {selectedLocation === location && (
                                <Check size={16} className="text-white" />
                              )}
                            </div>
                            {location}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF5757] transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Thursday, 12 August 2024"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text";
                  }}
                  className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#FF5757] focus:bg-white/10 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-[#FF5757] hover:bg-[#ff4444] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 group"
              >
                Find Expeditions
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-[#FF5757] w-8" : "bg-white/50 hover:bg-white"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
