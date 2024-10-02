import { Features } from "@/components/ui/base/Features";
import LandingPage from "@/components/ui/base/LandingPage";
import Navbar from "@/components/ui/base/Navbar";
import { Process } from "@/components/ui/base/Process";
import DotPattern from "@/components/ui/dot-pattern";

export default function Home() {
  return (
    <div className="relative min-h-screen select-none">
      <DotPattern className="fixed inset-0 pointer-events-none" />
      <div className="relative z-10">
        <Navbar />
        <LandingPage />
        <Features />
        <Process/>
      </div>
    </div>
  );
}
