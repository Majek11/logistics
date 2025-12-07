import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import HomeAbout from "@/components/HomeAbout";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <PageHeader
                title="About Containa"
                description="We are redefining global logistics with technology and expertise. Learn more about our mission and values."
            />
            <HomeAbout />
            <Stats />
            <Testimonials />
            <CallToAction />
            <Footer />
        </main>
    );
}
