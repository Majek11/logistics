import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Services from "@/components/Services";
import HomeAbout from "@/components/HomeAbout";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Partners />
      <HomeAbout />
      <Services />
      <Stats />
      <Testimonials />
      <CaseStudies />
      <CallToAction />
      <Footer />
    </main>
  );
}
