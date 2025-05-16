import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import CallToAction from "@/components/landing/CallToAction";
import Footer from "@/components/landing/Footer";

export const runtime = 'edge';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}