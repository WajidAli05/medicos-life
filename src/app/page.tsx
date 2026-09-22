import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Approach from "@/components/Approach";
import PhysioServices from "@/components/services/PhysioServices";
import AestheticShowcase from "@/components/services/AestheticShowcase";
import { ServiceModalProvider } from "@/components/services/ServiceModal";
import Journey from "@/components/Journey";
import { BodyMap, FaceMap } from "@/components/anatomy/CareMaps";
import Stats from "@/components/Stats";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";

export default function Home() {
  return (
    <ServiceModalProvider>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Approach />
        <PhysioServices />
        <BodyMap />
        <FaceMap />
        <AestheticShowcase />
        <Journey />
        <Stats />
        <Team />
        <Testimonials />
        <Faq />
        <Booking />
      </main>
      <Footer />
      <WhatsAppFab />
    </ServiceModalProvider>
  );
}
