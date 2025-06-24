import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products } from "@/data/mockData";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

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
    </>
  );
};

export default Header;
