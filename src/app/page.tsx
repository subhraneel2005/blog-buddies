import { Features } from "@/components/ui/base/Features";
import Footer from "@/components/ui/base/Footer";
import LandingPage from "@/components/ui/base/LandingPage";
import { Process } from "@/components/ui/base/Process";
import { Testimonials } from "@/components/ui/base/Testimonials";
import DotPattern from "@/components/ui/dot-pattern";

export default function Home() {
  return (
    <>
          <LandingPage />
          <Testimonials/>
          <Features />
          <Process/>
          <Footer/>
    </>
  );
}
