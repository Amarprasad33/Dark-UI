import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { ParticleBackground } from "@/components/landing/particle-background";
import Navbar  from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-primary selection:bg-white/20">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-background/90 pointer-events-none" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <section className="py-32 text-center px-6">
           <div className="max-w-3xl mx-auto space-y-8">
             <h2 className="text-4xl font-bold">Ready to build?</h2>
             <p className="text-muted-foreground">Join thousands of developers building the next generation of dark-mode apps.</p>
             <button className="px-8 py-4 bg-white text-black font-bold text-lg rounded-sm hover:scale-105 transition-transform">
               Get Early Access
             </button>
           </div>
        </section>
        <Footer />
      </div>
    </main>
  );
}
