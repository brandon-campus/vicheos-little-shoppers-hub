import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products } from "@/data/mockData";
import { useCart } from "@/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const { cart, showMiniCart, setShowMiniCart } = useCart();
  const [cartBounce, setCartBounce] = useState(false);

  useEffect(() => {
    if (cart.length > 0) {
      setCartBounce(true);
      const timeout = setTimeout(() => setCartBounce(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [cart.length]);

  useEffect(() => {
    if (showMiniCart) {
      const timeout = setTimeout(() => setShowMiniCart(false), 2500);
      return () => clearTimeout(timeout);
    }
  }, [showMiniCart, setShowMiniCart]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  // Generate search suggestions based on products
  const generateSuggestions = (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const queryLower = query.toLowerCase();
    const suggestionsSet = new Set<string>();

    // Search in product names
    products.forEach(product => {
      const words = product.name.toLowerCase().split(' ');
      words.forEach(word => {
        if (word.startsWith(queryLower) && word.length > 2) {
          suggestionsSet.add(word);
        }
      });
    });

    // Search in product descriptions
    products.forEach(product => {
      const words = product.description.toLowerCase().split(' ');
      words.forEach(word => {
        if (word.startsWith(queryLower) && word.length > 2) {
          suggestionsSet.add(word);
        }
      });
    });

    // Search in product features
    products.forEach(product => {
      product.features.forEach(feature => {
        const words = feature.toLowerCase().split(' ');
        words.forEach(word => {
          if (word.startsWith(queryLower) && word.length > 2) {
            suggestionsSet.add(word);
          }
        });
      });
    });

    // Convert to array and limit to 5 suggestions
    const suggestionsArray = Array.from(suggestionsSet).slice(0, 5);
    setSuggestions(suggestionsArray);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSelectedSuggestion(-1);
    generateSuggestions(value);
    setShowSuggestions(true);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestion(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestion(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedSuggestion >= 0 && suggestions[selectedSuggestion]) {
        handleSuggestionClick(suggestions[selectedSuggestion]);
      } else {
        handleSearch(e);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedSuggestion(-1);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setSelectedSuggestion(-1);
    navigate(`/productos?buscar=${encodeURIComponent(suggestion)}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/productos?buscar=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowSuggestions(false);
      setIsSearchOpen(false);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Productos", path: "/productos" },
    { name: "Categorías", path: "/categorias" },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <>
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
            <Link to="/carrito" className="relative">
              <ShoppingCart
                size={28}
                className={`text-gray-600 hover:text-[#FEC6A1] transition-all duration-300 ${cartBounce ? 'animate-bounce-cart' : ''}`}
              />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FEC6A1] text-gray-800 rounded-full px-2 py-0.5 text-xs font-bold shadow">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
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
            <div className="mt-4 animate-fade-in" ref={searchRef}>
              <form onSubmit={handleSearch} className="flex items-center relative">
              <Input
                type="text"
                placeholder="Buscar productos..."
                className="rounded-l-lg border-r-0"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setShowSuggestions(true)}
              />
              <Button 
                type="submit" 
                className="rounded-l-none bg-[#D3E4FD] text-gray-800 hover:bg-[#c1d8f8]"
              >
                <Search size={18} />
              </Button>
                
                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                          index === selectedSuggestion ? 'bg-[#D3E4FD] text-gray-800' : 'text-gray-700'
                        }`}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <div className="flex items-center">
                          <Search size={16} className="mr-3 text-gray-400" />
                          <span className="font-medium">{suggestion}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
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
      {/* Barra de anuncio personalizada debajo del header */}
      <div className="w-full bg-[#FEF3DE] text-[#000] text-center flex items-center justify-center gap-2 h-10 font-bold text-base tracking-wide shadow-sm">
        ¡Envío gratis en compras desde S/500!
      </div>

    {/* MiniCart flotante */}
    {showMiniCart && cart.length > 0 && (
      <div className="fixed top-20 right-4 z-[100] bg-white border border-[#D3E4FD] rounded-2xl shadow-xl p-4 w-80 animate-fade-in flex flex-col gap-2">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-gray-800">Producto añadido al carrito</span>
          <button onClick={() => setShowMiniCart(false)} className="text-gray-400 hover:text-gray-700 text-xl">&times;</button>
        </div>
        <div className="divide-y divide-gray-100 max-h-40 overflow-y-auto">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center py-2 gap-3">
              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border" />
              <div className="flex-1">
                <div className="font-medium text-gray-800 text-sm line-clamp-1">{item.name}</div>
                <div className="text-xs text-gray-500">Cantidad: {item.quantity}</div>
              </div>
              <div className="font-semibold text-gray-800 text-sm">S/ {item.price * item.quantity}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="font-semibold text-gray-800">Total:</span>
          <span className="font-bold text-[#2563eb]">S/ {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span>
        </div>
        <Link to="/carrito">
          <Button className="w-full mt-2 bg-[#FEC6A1] text-gray-800 hover:bg-[#f9b789]">Ir al carrito</Button>
        </Link>
      </div>
    )}
    </>
  );
};

export default Header;
