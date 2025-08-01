import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/CartContext";

export interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  gallery?: string[] | string;
  isNew?: boolean;
  isOffer?: boolean;
  discountPercentage?: number;
  category?: string;
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  gallery,
  isNew = false,
  isOffer = false,
  discountPercentage = 0,
}: ProductProps) => {
  const discountedPrice = isOffer
    ? parseFloat((price - (price * discountPercentage) / 100).toFixed(2))
    : price;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(amount);
  };

  // Función para obtener la imagen a mostrar
  const getDisplayImage = () => {
    // Si hay imagen principal y no está vacía
    if (image && image.trim() !== '') {
      return image;
    }
    
    // Si no hay imagen principal pero hay galería
    if (gallery) {
      let galleryArray = gallery;
      
      // Si gallery es string, convertir a array
      if (typeof gallery === 'string') {
        galleryArray = gallery.split('|').map(url => url.trim()).filter(Boolean);
      }
      
      // Si hay imágenes en la galería, usar la primera
      if (Array.isArray(galleryArray) && galleryArray.length > 0) {
        return galleryArray[0];
      }
    }
    
    // Si no hay ninguna imagen, usar placeholder
    return '/img/placeholder.svg';
  };

  const displayImage = getDisplayImage();

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price: discountedPrice,
      image: displayImage,
      quantity: 1,
      isOffer,
      discountPercentage,
    });
    // No mostrar toast, el feedback es el mini cart
  };

  const handleBuyNow = () => {
    addToCart({
      id,
      name,
      price: discountedPrice,
      image: displayImage,
      quantity: 1,
      isOffer,
      discountPercentage,
    });
    navigate("/carrito");
  };

  const handleWhatsAppClick = (e: React.MouseEvent, productName: string) => {
    e.preventDefault();
    const whatsappNumber = "51947154677";
    const message = `Hola, quisiera obtener más información sobre el producto ${productName}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md animate-fade-in">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
        {isNew && (
          <Badge className="bg-[#D3E4FD] text-gray-800 hover:bg-[#c1d8f8]">
            Nuevo
          </Badge>
        )}
        {isOffer && (
          <Badge className="bg-[#FEC6A1] text-gray-800 hover:bg-[#f9b789]">
            {discountPercentage}% dto
          </Badge>
        )}
      </div>

      {/* Image */}
      <Link to={`/producto/${id}`} className="block">
        <div className="aspect-square overflow-hidden">
          <img
            src={displayImage}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Si la imagen falla al cargar, usar placeholder
              const target = e.target as HTMLImageElement;
              target.src = '/img/placeholder.svg';
            }}
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link to={`/producto/${id}`} className="block">
          <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 hover:text-[#FEC6A1] transition-colors">
            {name}
          </h3>
        </Link>

        <div className="flex justify-between items-center mb-3">
          {isOffer ? (
            <div className="flex flex-col">
              <span className="text-gray-500 line-through text-sm">
                {formatPrice(price)}
              </span>
              <span className="font-semibold text-gray-800">
                {formatPrice(discountedPrice)}
              </span>
            </div>
          ) : (
            <span className="font-semibold text-gray-800">
              {formatPrice(price)}
            </span>
          )}
        </div>

        <div className="flex space-x-2">
          <Button
            size="sm"
            className="flex-1 bg-[#FEC6A1] text-gray-800 hover:bg-[#f9b789] font-semibold"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Añadir al carrito
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-[#D3E4FD] text-gray-700 hover:bg-[#D3E4FD] hover:text-gray-800"
            asChild
          >
            <Link to={`/producto/${id}`}>Ver más</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

