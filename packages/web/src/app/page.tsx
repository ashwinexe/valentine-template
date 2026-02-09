import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Terminal from "@/components/Terminal";
import Quiz from "@/components/Quiz";
import Letters from "@/components/Letters";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Timeline />
      <Terminal />
      <Quiz />
      <Letters />
      <Footer />
    </>
  );
}
