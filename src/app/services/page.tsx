import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import Services from "@/components/Services";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <PageHeader
                title="Our Services"
                description="Comprehensive logistics solutions tailored to your business needs. From global shipping to local delivery."
            />
            <Services />
            <CallToAction />
            <Footer />
        </main>
    );
}
