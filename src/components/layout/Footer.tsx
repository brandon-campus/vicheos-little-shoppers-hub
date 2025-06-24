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
            <img
              src="/img/bicheoslogo.png"
              alt="Vicheos Logo"
              className="h-10 mb-4"
            />
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
                <Link to="/contacto" className="hover:text-gray-900 transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/libro-reclamaciones" className="hover:text-gray-900 transition-colors">
                  Libro de Reclamaciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <address className="not-italic">
              <p className="mb-2">Arequipa, Perú</p>
              <p className="mb-2">Email: bicheosb@gmail.com</p>
              <p>Teléfono: +51 947 154 677</p>
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
            &copy; {new Date().getFullYear()} Bicheos. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
