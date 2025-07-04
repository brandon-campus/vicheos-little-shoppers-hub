import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ChevronRight, CreditCard, Truck, Shield } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/CartContext";
import { supabase } from "@/lib/supabaseClient";

// For demo, we'll use a few products
const cartItems = [
  { id: 1, name: "Monitor de bebé inteligente con cámara HD", price: 149.99, quantity: 1, discount: 0 },
  { id: 2, name: "Termómetro digital sin contacto", price: 39.99, quantity: 2, discount: 20 },
];

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
    payment: "yape"
  });
  
  // Calcular totales
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + shipping;
  
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(amount);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address || !formData.city) {
      toast.error("Por favor, completa todos los campos obligatorios");
      return;
    }
    if (cart.length === 0) {
      toast.error("El carrito está vacío");
      return;
    }
    setIsSubmitting(true);
    // Guardar pedido en Supabase
    const { data: pedido, error } = await supabase.from("pedidos").insert([
      {
        nombre: formData.firstName + " " + formData.lastName,
        email: formData.email,
        telefono: formData.phone,
        direccion: formData.address + ", " + formData.city,
        total,
        estado: "pendiente",
        notas: formData.notes,
        metodo_pago: formData.payment
      }
    ]).select().single();
    if (error || !pedido) {
      toast.error("Error al guardar el pedido");
      setIsSubmitting(false);
      return;
    }
    // Guardar productos del pedido
    const items = cart.map(item => ({
      pedido_id: pedido.id,
      producto_id: item.id,
      nombre_producto: item.name,
      cantidad: item.quantity,
      precio_unitario: item.price
    }));
    const { error: itemsError } = await supabase.from("pedido_items").insert(items);
    if (itemsError) {
      toast.error("Error al guardar los productos del pedido");
      setIsSubmitting(false);
      return;
    }
    // Guardar resumen del pedido en localStorage para la página de gracias
    localStorage.setItem("lastOrder", JSON.stringify({
      products: cart,
      total
    }));
    clearCart();
    setIsSubmitting(false);
    navigate("/gracias");
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Finaliza tu compra</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Información personal</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="firstName">Nombre <span className="text-red-500">*</span></Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Apellidos <span className="text-red-500">*</span></Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono <span className="text-red-500">*</span></Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Shipping Information */}
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Dirección de envío</h2>
                
                <div className="mb-4">
                  <Label htmlFor="address">Dirección <span className="text-red-500">*</span></Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="city">Ciudad <span className="text-red-500">*</span></Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
                
                {/* Eliminar el input de país: */}
                {/* <div>
                  <Label htmlFor="country">País <span className="text-red-500">*</span></Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1"
                    disabled
                  />
                </div> */}
              </div>
              
              {/* Shipping Method */}
              {/* Eliminar la sección de método de envío (RadioGroup de shipping). */}
              
              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Método de pago</h2>
                <div className="flex flex-col gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="payment" value="yape" checked={formData.payment === "yape"} onChange={handleChange} />
                    <span>Yape</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="payment" value="transferencia" checked={formData.payment === "transferencia"} onChange={handleChange} />
                    <span>Transferencia bancaria</span>
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-2">Recibirás las instrucciones de pago al finalizar tu pedido.</p>
              </div>
              
              {/* Additional Notes */}
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Notas adicionales</h2>
                
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Instrucciones especiales para la entrega o cualquier otra información..."
                  className="min-h-32"
                />
              </div>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Resumen del pedido</h2>
              
              {/* Products */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex-1">
                      <p className="text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                    </div>
                    <p className="text-gray-800 ml-4">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              {/* Totals */}
              <div className="space-y-2 mb-6">
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
                
                <Separator className="my-2" />
                
                <div className="flex justify-between font-medium text-lg">
                  <span className="text-gray-800">Total</span>
                  <span className="text-gray-800">{formatPrice(total)}</span>
                </div>
              </div>
              
              {/* Benefits */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Truck size={16} className="mr-2" />
                  <span>Envío gratuito en pedidos superiores a 50€</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Shield size={16} className="mr-2" />
                  <span>Garantía de 2 años en todos los productos</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CreditCard size={16} className="mr-2" />
                  <span>Pago 100% seguro</span>
                </div>
              </div>
              
              {/* Submit Button */}
              <Button 
                onClick={handleSubmit}
                className="w-full bg-[#FEC6A1] hover:bg-[#f9b789] text-gray-800 text-lg py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Procesando..."
                ) : (
                  <>
                    Confirmar pedido
                    <ChevronRight size={20} className="ml-2" />
                  </>
                )}
              </Button>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                Al hacer clic en "Confirmar pedido" aceptas nuestros términos y condiciones y política de privacidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
