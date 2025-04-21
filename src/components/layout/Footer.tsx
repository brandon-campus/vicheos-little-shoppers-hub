
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-[#F1F0FB] text-gray-700 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-[#D3E4FD]">Vi</span>
              <span className="text-[#FEC6A1]">che</span>
              <span className="text-gray-700">os</span>
            </h3>
            <p className="mb-4">
              Productos electrónicos innovadores para bebés, diseñados especialmente para mamás primerizas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-900 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/productos" className="hover:text-gray-900 transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/categorias" className="hover:text-gray-900 transition-colors">
                  Categorías
                </Link>
              </li>
              <li>
                <Link to="/ofertas" className="hover:text-gray-900 transition-colors">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-gray-900 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <address className="not-italic">
              <p className="mb-2">Avenida Principal 123</p>
              <p className="mb-2">Madrid, España</p>
              <p className="mb-2">Email: info@vicheos.com</p>
              <p>Teléfono: +34 912 345 678</p>
            </address>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="mb-4">Suscríbete para recibir las últimas novedades y ofertas exclusivas.</p>
            <form className="flex">
              <Input
                type="email"
                placeholder="Tu email"
                className="rounded-r-none"
              />
              <Button
                type="submit"
                className="rounded-l-none bg-[#FEC6A1] hover:bg-[#f9b789] text-gray-800"
              >
                <Send size={18} />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Vicheos. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
