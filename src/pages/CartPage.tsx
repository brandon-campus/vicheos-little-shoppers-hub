import { useCart } from "@/CartContext";
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
  const { cart, updateQuantity, removeFromCart } = useCart();
  
  // Calcular subtotal, envío y total
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + shipping;
  
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(amount);
  };
  
  const isCartEmpty = cart.length === 0;
  
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
                  <h2 className="font-semibold text-gray-800">Productos en el carrito ({cart.length})</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {cart.map((item) => (
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
                                    {formatPrice(item.price / (1 - (item.discountPercentage || 0) / 100))}
                                  </span>
                                  <span className="text-gray-800">
                                    {formatPrice(item.price)}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-gray-800">
                                  {formatPrice(item.price)}
                                </span>
                              )}
                            </div>
                          </div>
                          {/* Quantity controls */}
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
                            Total: {formatPrice(item.price * item.quantity)}
                          </span>
                          {/* Remove button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
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
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
