import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "@/components/ui/BackToTop";
import { Megaphone } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Contenedor sticky para barra + header */}
      <div className="sticky top-0 z-50 w-full">
        <div className="w-full bg-[#F6A623] text-white text-center flex items-center justify-center gap-2 h-10 font-semibold text-sm tracking-wide shadow-sm">
          <Megaphone className="w-5 h-5" />
          20% OFF en tu primera compra
        </div>
        <Header />
      </div>
      <main className="flex-1 bg-[#f1f0fb]">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
