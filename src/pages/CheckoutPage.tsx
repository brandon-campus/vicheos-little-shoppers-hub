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

// For demo, we'll use a few products
const cartItems = [
  { id: 1, name: "Monitor de bebé inteligente con cámara HD", price: 149.99, quantity: 1, discount: 0 },
  { id: 2, name: "Termómetro digital sin contacto", price: 39.99, quantity: 2, discount: 20 },
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "España",
    shipping: "standard",
    payment: "card",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVC: "",
    notes: ""
  });
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const itemPrice = item.discount > 0 
      ? item.price - (item.price * item.discount / 100) 
      : item.price;
    return sum + (itemPrice * item.quantity);
  }, 0);
  
  const shipping = formData.shipping === "express" ? 9.99 : (subtotal >= 50 ? 0 : 4.99);
  const total = subtotal + shipping;
  
  // Format price as currency
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(amount);
  };
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle radio button changes
  const handleRadioChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode
    ) {
      toast.error("Por favor, completa todos los campos obligatorios");
      return;
    }
    
    // Validate payment details if card is selected
    if (formData.payment === "card") {
      if (
        !formData.cardNumber ||
        !formData.cardName ||
        !formData.cardExpiry ||
        !formData.cardCVC
      ) {
        toast.error("Por favor, completa todos los datos de la tarjeta");
        return;
      }
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/gracias");
    }, 1500);
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
                  <div>
                    <Label htmlFor="postalCode">Código Postal <span className="text-red-500">*</span></Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="country">País <span className="text-red-500">*</span></Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1"
                    disabled
                  />
                </div>
              </div>
              
              {/* Shipping Method */}
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Método de envío</h2>
                
                <RadioGroup 
                  value={formData.shipping} 
                  onValueChange={(value) => handleRadioChange("shipping", value)}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3 border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-[#D3E4FD]">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Envío estándar</p>
                          <p className="text-sm text-gray-500">Entrega en 2-4 días laborables</p>
                        </div>
                        <div className="font-medium">
                          {subtotal >= 50 ? "Gratis" : formatPrice(15.90)}
                        </div>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-[#D3E4FD]">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Envío express</p>
                          <p className="text-sm text-gray-500">Entrega en 24-48 horas</p>
                        </div>
                        <div className="font-medium">{formatPrice(29.90)}</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Método de pago</h2>
                
                <RadioGroup 
                  value={formData.payment} 
                  onValueChange={(value) => handleRadioChange("payment", value)}
                  className="space-y-4 mb-6"
                >
                  <div className="flex items-center space-x-3 border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-[#D3E4FD]">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <CreditCard size={24} className="mr-2 text-gray-600" />
                        <p className="font-medium">Tarjeta de crédito/débito</p>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-[#D3E4FD]">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <div className="bg-[#169BD7] text-white px-2 py-1 rounded text-xs font-bold mr-2">Pay</div>
                        <p className="font-medium">PayPal</p>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-[#D3E4FD]">
                    <RadioGroupItem value="transfer" id="transfer" />
                    <Label htmlFor="transfer" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <div className="mr-2 w-6 h-6 bg-[#F1F0FB] rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">T</span>
                        </div>
                        <p className="font-medium">Transferencia bancaria</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
                
                {/* Card Details (shown only if card is selected) */}
                {formData.payment === "card" && (
                  <div className="space-y-4 p-4 bg-[#F1F0FB] rounded-lg">
                    <div>
                      <Label htmlFor="cardNumber">Número de tarjeta</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        placeholder="NOMBRE APELLIDOS"
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardExpiry">Fecha de caducidad</Label>
                        <Input
                          id="cardExpiry"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          placeholder="MM/AA"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardCVC">CVC</Label>
                        <Input
                          id="cardCVC"
                          name="cardCVC"
                          value={formData.cardCVC}
                          onChange={handleChange}
                          placeholder="123"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}
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
                {cartItems.map((item) => {
                  const itemPrice = item.discount > 0 
                    ? item.price - (item.price * item.discount / 100) 
                    : item.price;
                    
                  return (
                    <div key={item.id} className="flex justify-between">
                      <div className="flex-1">
                        <p className="text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Cantidad: {item.quantity}
                        </p>
                      </div>
                      <p className="text-gray-800 ml-4">
                        {formatPrice(itemPrice * item.quantity)}
                      </p>
                    </div>
                  );
                })}
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
