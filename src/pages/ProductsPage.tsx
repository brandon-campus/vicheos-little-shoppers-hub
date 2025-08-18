import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, SlidersHorizontal } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { categories } from "@/data/mockData";
import SEO from "@/components/shared/SEO";
import { supabase } from "@/lib/supabaseClient";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const categoryParam = searchParams.get("categoria");
  const searchParam = searchParams.get("buscar");
  const sortParam = searchParams.get("ordenar") || "destacados";
  
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("productos").select("*");
      if (error) {
        console.error("Error al obtener productos:", error);
        setProducts([]);
      } else {
        // Procesar cada producto para arreglar la galería
        const processedProducts = data.map(product => {
          let processedGallery = product.gallery;
          
          if (product.gallery) {
            if (typeof product.gallery === "string") {
              try {
                processedGallery = JSON.parse(product.gallery);
              } catch {
                processedGallery = product.gallery.split("|").map(url => url.trim()).filter(Boolean);
              }
            } else if (Array.isArray(product.gallery)) {
              processedGallery = product.gallery.flatMap(item => {
                if (typeof item === "string") {
                  try {
                    const parsed = JSON.parse(item);
                    return Array.isArray(parsed) ? parsed : [parsed];
                  } catch {
                    return [item];
                  }
                }
                return [item];
              }).filter(Boolean);
            }
          }
          
          return {
            ...product,
            gallery: processedGallery || []
          };
        });
        
        setProducts(processedProducts);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);
  
  useEffect(() => {
    let result = [...products];
    
    // Filter by search query if specified
    if (searchParam) {
      const searchLower = searchParam.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        (product.description && product.description.toLowerCase().includes(searchLower))
      );
    }
    
    // Filter by category if specified
    if (categoryParam) {
      result = result.filter(product => product.category === parseInt(categoryParam));
    }
    
    // Sort products
    switch (sortParam) {
      case "precio-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "precio-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "nombre-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nombre-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Default sort by "destacados" - we'll use the order they are in the data
        break;
    }
    
    setFilteredProducts(result);
  }, [products, categoryParam, searchParam, sortParam]);
  
  // Handle sort change
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("ordenar", value);
    setSearchParams(params);
  };
  
  // Handle category filter
  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (categoryId === "all") {
      params.delete("categoria");
    } else {
      params.set("categoria", categoryId);
    }
    
    setSearchParams(params);
  };
  
  // Clear search
  const clearSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("buscar");
    setSearchParams(params);
  };
  
  // Toggle filter sidebar on mobile
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  return (
    <Layout>
      <SEO 
        title="Productos para Bebés Perú | Orejeras, Esterilizadores, Termómetros - Bicheos"
        description="Compra productos para bebés en Perú. Orejeras de seguridad, esterilizadores UV, termómetros, almohadillas de lactancia y más. Envío gratis a todo Perú. Paga con Yape."
        keywords="productos bebés Perú, orejeras bebés, esterilizador chupones, termómetro bebé, almohadillas lactancia, juguetes bebés Lima, cuidado infantil Perú, tienda bebés online"
        url="https://www.bicheos.com/productos"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Productos para Bebés",
          "description": "Catálogo completo de productos para bebés en Perú",
          "url": "https://www.bicheos.com/productos",
          "numberOfItems": products.length,
          "itemListElement": products.slice(0, 10).map((product, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Product",
              "name": product.name,
              "description": product.description,
              "image": product.image,
              "url": `https://www.bicheos.com/producto/${product.id}`,
              "offers": {
                "@type": "Offer",
                "price": product.price,
                "priceCurrency": "PEN",
                "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
              }
            }
          }))
        }}
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">
          {searchParam ? `Resultados para: "${searchParam}"` : "Nuestros Productos"}
        </h1>
        
        {searchParam && (
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={clearSearch}
              className="border-[#D3E4FD] hover:bg-[#D3E4FD] text-gray-800"
            >
              Limpiar búsqueda
            </Button>
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <Button 
              onClick={toggleFilter} 
              variant="outline" 
              className="w-full border-[#D3E4FD] hover:bg-[#D3E4FD] text-gray-800"
            >
              <SlidersHorizontal size={18} className="mr-2" />
              {isFilterOpen ? "Ocultar filtros" : "Mostrar filtros"}
            </Button>
          </div>
          
          {/* Filters */}
          <div className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center mb-6">
                <Filter size={20} className="mr-2 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-800">Filtros</h2>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-3">Categorías</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="all-categories"
                      name="category"
                      checked={!categoryParam}
                      onChange={() => handleCategoryChange("all")}
                      className="w-4 h-4 text-[#D3E4FD] border-gray-300 focus:ring-[#D3E4FD]"
                    />
                    <label htmlFor="all-categories" className="ml-2 text-gray-700">
                      Todas las categorías
                    </label>
                  </div>
                  
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category.id}`}
                        name="category"
                        checked={categoryParam === category.id.toString()}
                        onChange={() => handleCategoryChange(category.id.toString())}
                        className="w-4 h-4 text-[#D3E4FD] border-gray-300 focus:ring-[#D3E4FD]"
                      />
                      <label htmlFor={`category-${category.id}`} className="ml-2 text-gray-700">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-3">Ordenar por</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="destacados"
                      name="sort"
                      checked={sortParam === "destacados"}
                      onChange={() => handleSortChange("destacados")}
                      className="w-4 h-4 text-[#D3E4FD] border-gray-300 focus:ring-[#D3E4FD]"
                    />
                    <label htmlFor="destacados" className="ml-2 text-gray-700">
                      Destacados
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="precio-asc"
                      name="sort"
                      checked={sortParam === "precio-asc"}
                      onChange={() => handleSortChange("precio-asc")}
                      className="w-4 h-4 text-[#D3E4FD] border-gray-300 focus:ring-[#D3E4FD]"
                    />
                    <label htmlFor="precio-asc" className="ml-2 text-gray-700">
                      Precio: menor a mayor
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="precio-desc"
                      name="sort"
                      checked={sortParam === "precio-desc"}
                      onChange={() => handleSortChange("precio-desc")}
                      className="w-4 h-4 text-[#D3E4FD] border-gray-300 focus:ring-[#D3E4FD]"
                    />
                    <label htmlFor="precio-desc" className="ml-2 text-gray-700">
                      Precio: mayor a menor
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="nombre-asc"
                      name="sort"
                      checked={sortParam === "nombre-asc"}
                      onChange={() => handleSortChange("nombre-asc")}
                      className="w-4 h-4 text-[#D3E4FD] border-gray-300 focus:ring-[#D3E4FD]"
                    />
                    <label htmlFor="nombre-asc" className="ml-2 text-gray-700">
                      Nombre: A-Z
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="nombre-desc"
                      name="sort"
                      checked={sortParam === "nombre-desc"}
                      onChange={() => handleSortChange("nombre-desc")}
                      className="w-4 h-4 text-[#D3E4FD] border-gray-300 focus:ring-[#D3E4FD]"
                    />
                    <label htmlFor="nombre-desc" className="ml-2 text-gray-700">
                      Nombre: Z-A
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Reset Filters Button */}
              <Button
                variant="outline"
                className="w-full border-[#FEC6A1] hover:bg-[#FEC6A1] text-gray-800"
                onClick={() => setSearchParams({})}
              >
                Limpiar filtros
              </Button>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Mobile Sort */}
            <div className="lg:hidden mb-6">
              <Label htmlFor="sort-mobile" className="mb-2 block">Ordenar por</Label>
              <Select
                value={sortParam}
                onValueChange={handleSortChange}
              >
                <SelectTrigger id="sort-mobile" className="w-full">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="destacados">Destacados</SelectItem>
                  <SelectItem value="precio-asc">Precio: menor a mayor</SelectItem>
                  <SelectItem value="precio-desc">Precio: mayor a menor</SelectItem>
                  <SelectItem value="nombre-asc">Nombre: A-Z</SelectItem>
                  <SelectItem value="nombre-desc">Nombre: Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Results */}
            {filteredProducts.length > 0 ? (
              <>
                <div className="mb-6">
                  <p className="text-gray-600">
                    Mostrando {filteredProducts.length} productos{categoryParam ? ' en categoría seleccionada' : ''}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      gallery={product.gallery}
                      isNew={product.isNew}
                      isOffer={product.isOffer}
                      discountPercentage={product.discountPercentage}
                      category={product.category}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-800 mb-2">No se encontraron productos</h3>
                <p className="text-gray-600 mb-6">
                  Lo sentimos, no hay productos que coincidan con tu búsqueda.
                </p>
                <Button
                  onClick={() => setSearchParams({})}
                  className="bg-[#D3E4FD] hover:bg-[#c1d8f8] text-gray-800"
                >
                  Ver todos los productos
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
