import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Star, 
  ShoppingCart, 
  ChevronRight, 
  ChevronLeft, 
  Truck, 
  Shield, 
  CreditCard, 
  Clock 
} from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabaseClient";
import { useCart } from "@/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase.from("productos").select("*").eq("id", id).single();
      if (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } else {
        console.log("Product data received:", data);
        // Convierte gallery y features a array si vienen como string
        const fixedData = {
          ...data,
          gallery: typeof data.gallery === "string" ? data.gallery.split("|").filter(Boolean) : (data.gallery || []),
          features: typeof data.features === "string" ? data.features.split("|").filter(Boolean) : (data.features || []),
        };
        console.log("Fixed product data:", fixedData);
        setProduct(fixedData);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product && product.category) {
      const fetchRelated = async () => {
        const { data, error } = await supabase.from("productos").select("*").eq("category", product.category).neq("id", id).limit(4);
        if (!error) setRelatedProducts(data);
      };
      fetchRelated();
    }
  }, [product, id]);
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#D3E4FD] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando producto...</p>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Producto no encontrado</h2>
          <p className="text-gray-600 mb-6">
            Lo sentimos, el producto que estás buscando no existe o ha sido eliminado.
          </p>
          <Button asChild className="bg-[#D3E4FD] hover:bg-[#c1d8f8] text-gray-800">
            <Link to="/productos">Ver todos los productos</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  // Calculate the discounted price if it's on offer
  const discountedPrice = product.isOffer
    ? parseFloat((product.price - (product.price * product.discountPercentage) / 100).toFixed(2))
    : product.price;
    
  // Format price as currency
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(amount);
  };
  
  // Handle quantity changes
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      toast.error(`Solo hay ${product.stock} unidades disponibles`);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  // Handle add to cart - now redirects to Tally form
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: discountedPrice,
      image: product.image,
      quantity,
      isOffer: product.isOffer,
      discountPercentage: product.discountPercentage,
    });
    // No mostrar toast, el feedback es el mini cart
  };
  
  // Handle buy now - also redirects to Tally form
  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: discountedPrice,
      image: product.image,
      quantity,
      isOffer: product.isOffer,
      discountPercentage: product.discountPercentage,
    });
    navigate("/carrito");
  };
  
  // Añadir esta función para manejar el enlace de WhatsApp
  const handleWhatsAppClick = () => {
    const whatsappNumber = "51947154677";
    const message = `Hola, quisiera obtener más información sobre el producto ${product.name}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  // Mejorar el manejo de imágenes
  const getGalleryImages = () => {
    const images = [];
    
    // Añadir imagen principal si existe
    if (product.image && product.image.trim() !== "") {
      images.push(product.image);
    }
    
    // Añadir imágenes de galería si existen
    if (product.gallery && Array.isArray(product.gallery)) {
      product.gallery.forEach(img => {
        if (img && img.trim() !== "" && !images.includes(img)) {
          images.push(img);
        }
      });
    }
    
    // Si no hay imágenes, usar una imagen por defecto
    if (images.length === 0) {
      images.push("/img/placeholder.svg"); // Asegúrate de tener esta imagen
    }
    
    console.log("Gallery images:", images);
    return images;
  };

  // Función helper para manejar errores de imagen
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    console.error("Error loading image:", target.src);
    target.src = "/img/placeholder.svg";
  };

  const galleryImages = getGalleryImages();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-6 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">Inicio</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to="/productos" className="hover:text-gray-700">Productos</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-700">{product.name}</span>
        </nav>
        
        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="bg-white rounded-2xl overflow-hidden mb-4">
              <img 
                src={galleryImages[selectedImageIndex] || "/img/placeholder.svg"} 
                alt={product.name} 
                className="w-full object-cover aspect-square"
                onError={handleImageError}
              />
            </div>
            
            {/* Image Gallery */}
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`bg-white rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index ? "border-[#FEC6A1]" : "border-transparent"
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - imagen ${index + 1}`} 
                      className="w-full h-full object-cover aspect-square"
                      onError={handleImageError}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {product.isNew && (
                <Badge className="bg-[#D3E4FD] text-gray-800 hover:bg-[#c1d8f8]">
                  Nuevo
                </Badge>
              )}
              {product.isOffer && (
                <Badge className="bg-[#FEC6A1] text-gray-800 hover:bg-[#f9b789]">
                  {product.discountPercentage}% dto
                </Badge>
              )}
              <Badge variant="outline" className="border-gray-300 text-gray-600">
                Stock: {product.stock} unidades
              </Badge>
            </div>
            
            <h1 className="text-3xl font-semibold text-gray-800 mb-3">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < Math.floor(product.rating)
                        ? "text-[#FEC6A1] fill-[#FEC6A1]"
                        : "text-gray-300 fill-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.rating} ({product.reviews} reseñas)
              </span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              {product.isOffer ? (
                <div className="flex items-center">
                  <span className="text-gray-500 line-through text-lg mr-2">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-2xl font-semibold text-gray-800">
                    {formatPrice(discountedPrice)}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-semibold text-gray-800">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            
            {/* Description */}
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Características principales</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            {/* Quantity Selector - Keep for display, but logic is simpler now */}
            <div className="flex items-center mb-6">
              <span className="mr-4 text-gray-700">Cantidad:</span>
              <div className="flex border border-gray-300 rounded-md">
                <button
                  onClick={decreaseQuantity}
                  className="px-3 py-1 border-r border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1 text-gray-800 flex items-center">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="px-3 py-1 border-l border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                onClick={handleBuyNow}
                className="flex-1 bg-[#FEC6A1] hover:bg-[#f9b789] text-gray-800 text-lg py-6"
              >
                Comprar Ahora
              </Button>
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1 border-[#D3E4FD] hover:bg-[#D3E4FD] text-gray-800 text-lg py-6"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Agregar al carrito
              </Button>
              <Button
                onClick={handleWhatsAppClick}
                variant="outline"
                className="flex-1 border-[#D3E4FD] hover:bg-[#D3E4FD] text-gray-800 text-lg py-6"
              >
                Consultar por WhatsApp
              </Button>
            </div>
            
            {/* Shipping & Warranty */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#D3E4FD] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <Truck size={20} className="text-gray-800" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Envío gratuito</h4>
                  <p className="text-sm text-gray-600">En pedidos superiores a 50€</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#D3E4FD] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <Shield size={20} className="text-gray-800" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Garantía de 2 años</h4>
                  <p className="text-sm text-gray-600">Calidad asegurada</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#D3E4FD] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <CreditCard size={20} className="text-gray-800" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Pago seguro</h4>
                  <p className="text-sm text-gray-600">Múltiples métodos de pago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#D3E4FD] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <Clock size={20} className="text-gray-800" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Envío rápido</h4>
                  <p className="text-sm text-gray-600">Entrega en 24-48h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products (Optional - you can remove this section if not needed) */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">También te puede interesar</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  id={relatedProduct.id}
                  name={relatedProduct.name}
                  price={relatedProduct.price}
                  image={relatedProduct.image}
                  isNew={relatedProduct.isNew}
                  isOffer={relatedProduct.isOffer}
                  discountPercentage={relatedProduct.discountPercentage}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Reviews */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Opiniones de clientes</h2>
          
          {product.reviews > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&auto=format&fit=crop"
                    alt="Usuario"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800">Ana García</h4>
                    <p className="text-sm text-gray-500">05/04/2025</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < 5 ? "text-[#FEC6A1] fill-[#FEC6A1]" : "text-gray-300"}
                    />
                  ))}
                </div>
                
                <p className="text-gray-700">
                  ¡Increíble producto! Cumple perfectamente con lo que promete y ha sido muy útil para nosotros.
                  La calidad es excelente y la aplicación funciona genial. Muy recomendable para todas las mamás.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&auto=format&fit=crop"
                    alt="Usuario"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800">María López</h4>
                    <p className="text-sm text-gray-500">18/03/2025</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < 4 ? "text-[#FEC6A1] fill-[#FEC6A1]" : "text-gray-300"}
                    />
                  ))}
                </div>
                
                <p className="text-gray-700">
                  Muy buen producto, fácil de usar y me da mucha tranquilidad. El envío fue rápido y
                  el producto llegó en perfectas condiciones. Lo recomiendo, aunque la batería podría
                  durar un poco más.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-2xl shadow-sm">
              <h3 className="text-xl font-medium text-gray-800 mb-2">Sin opiniones aún</h3>
              <p className="text-gray-600">
                Sé el primero en dejar una opinión sobre este producto.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
