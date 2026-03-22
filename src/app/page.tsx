import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Demos from "@/components/Demos";
import Differentials from "@/components/Differentials";
import Stats from "@/components/Stats";
import Audience from "@/components/Audience";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <Demos />
      <Differentials />
      <Stats />
      <Audience />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
