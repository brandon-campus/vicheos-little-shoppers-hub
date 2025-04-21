
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, CreditCard } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { products } from "@/data/mockData";

// For demo, we'll use a few products as cart items
const initialCartItems = [
  { id: 1, quantity: 1 },
  { id: 2, quantity: 2 },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [cartProducts, setCartProducts] = useState<any[]>([]);
  
  // Calculate totals
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);
  
  // Get full product details from product IDs in cart
  useEffect(() => {
    const productsInCart = cartItems.map(item => {
      const product = products.find(p => p.id === item.id);
      if (!product) return null;
      
      // Calculate product price (with discount if applicable)
      const price = product.isOffer
        ? product.price - (product.price * product.discountPercentage) / 100
        : product.price;
      
      return {
        ...product,
        quantity: item.quantity,
        itemTotal: price * item.quantity
      };
    }).filter(Boolean);
    
    setCartProducts(productsInCart as any[]);
    
    // Calculate subtotal
    const calculatedSubtotal = productsInCart.reduce(
      (sum, item) => sum + (item?.itemTotal || 0), 
      0
    );
    setSubtotal(calculatedSubtotal);
    
    // Calculate shipping (free if over 50€)
    const calculatedShipping = calculatedSubtotal >= 50 ? 0 : 4.99;
    setShipping(calculatedShipping);
    
    // Calculate total
    setTotal(calculatedSubtotal + calculatedShipping);
  }, [cartItems]);
  
  // Format price as currency
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };
  
  // Update quantity
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    // Check if we have enough stock
    const product = products.find(p => p.id === productId);
    if (product && newQuantity > product.stock) {
      toast.error(`Solo hay ${product.stock} unidades disponibles`);
      return;
    }
    
    setCartItems(
      cartItems.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  // Remove item from cart
  const removeItem = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    toast.success("Producto eliminado del carrito");
  };
  
  // Check if cart is empty
  const isCartEmpty = cartItems.length === 0;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 flex items-center">
          <ShoppingCart className="mr-3" size={28} />
          Tu Carrito
        </h1>
        
        {isCartEmpty ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-20 h-20 bg-[#F1F0FB] rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart size={32} className="text-gray-500" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Parece que no has añadido ningún producto a tu carrito todavía.
            </p>
            <Button asChild className="bg-[#D3E4FD] hover:bg-[#c1d8f8] text-gray-800">
              <Link to="/productos">Ver productos</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-[#F1F0FB]">
                  <h2 className="font-semibold text-gray-800">Productos en el carrito ({cartItems.length})</h2>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {cartProducts.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row p-6">
                      {/* Product Image */}
                      <div className="sm:w-24 sm:h-24 mb-4 sm:mb-0 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="sm:ml-6 flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                          <div>
                            <Link 
                              to={`/producto/${item.id}`} 
                              className="font-medium text-gray-800 hover:text-[#FEC6A1] transition-colors"
                            >
                              {item.name}
                            </Link>
                            
                            {/* Price and discount */}
                            <div className="mt-1">
                              {item.isOffer ? (
                                <div className="flex items-center">
                                  <span className="text-gray-500 line-through text-sm mr-2">
                                    {formatPrice(item.price)}
                                  </span>
                                  <span className="text-gray-800">
                                    {formatPrice(item.price - (item.price * item.discountPercentage) / 100)}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-gray-800">
                                  {formatPrice(item.price)}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Quantity controls on mobile */}
                          <div className="flex items-center mt-3 sm:mt-0">
                            <span className="text-gray-600 mr-3 hidden sm:inline">Cantidad:</span>
                            <div className="flex border border-gray-300 rounded-md">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-3 py-1 border-r border-gray-300 text-gray-600 hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="px-4 py-1 text-gray-800 flex items-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-3 py-1 border-l border-gray-300 text-gray-600 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          {/* Total */}
                          <span className="font-medium text-gray-800">
                            Total: {formatPrice(item.itemTotal)}
                          </span>
                          
                          {/* Remove button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-gray-500 hover:text-red-500 hover:bg-red-50"
                          >
                            <Trash2 size={18} />
                            <span className="ml-2 hidden sm:inline">Eliminar</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Resumen del pedido</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800">{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío</span>
                    <span className="text-gray-800">
                      {shipping === 0 ? "Gratis" : formatPrice(shipping)}
                    </span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-800">Total</span>
                    <span className="text-gray-800">{formatPrice(total)}</span>
                  </div>
                </div>
                
                <Button 
                  asChild 
                  className="w-full bg-[#FEC6A1] hover:bg-[#f9b789] text-gray-800 text-lg py-6"
                >
                  <Link to="/checkout">
                    <CreditCard size={20} className="mr-2" />
                    Finalizar compra
                  </Link>
                </Button>
                
                <div className="mt-6">
                  <h3 className="font-medium text-gray-800 mb-2">Métodos de pago aceptados</h3>
                  <div className="flex gap-2">
                    {["Visa", "Mastercard", "PayPal", "Apple Pay"].map((method) => (
                      <span 
                        key={method} 
                        className="text-sm text-gray-600 px-2 py-1 bg-[#F1F0FB] rounded"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
