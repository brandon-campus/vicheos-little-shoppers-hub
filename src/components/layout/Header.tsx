import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const cartItemCount = 0; // This would be managed by a cart context in a real application

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Productos", path: "/productos" },
    { name: "Categorías", path: "/categorias" },
    { name: "Ofertas", path: "/ofertas" },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/img/bicheoslogo.png" alt="Vicheos Logo" className="h-10" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Search size={20} />
            </button>
            <Link
              to="/carrito"
              className="p-1 text-gray-600 hover:text-gray-900 transition-colors relative"
            >
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FEC6A1] text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMenu}
              className="p-1 text-gray-600 hover:text-gray-900 transition-colors md:hidden"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-4 animate-fade-in">
            <form className="flex items-center">
              <Input
                type="text"
                placeholder="Buscar productos..."
                className="rounded-l-lg border-r-0"
              />
              <Button 
                type="submit" 
                className="rounded-l-none bg-[#D3E4FD] text-gray-800 hover:bg-[#c1d8f8]"
              >
                <Search size={18} />
              </Button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 animate-fade-in bg-white">
            <div className="flex flex-col space-y-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="px-4 py-2 font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
