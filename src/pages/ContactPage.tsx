
import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Por favor, completa todos los campos");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("¡Gracias por tu mensaje! Te responderemos pronto.");
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Contacto</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Envíanos un mensaje</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="¿En qué podemos ayudarte?"
                  className="mt-1 min-h-32"
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-[#D3E4FD] hover:bg-[#c1d8f8] text-gray-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar consulta"}
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div>
            <div className="bg-[#F1F0FB] rounded-2xl p-6 lg:p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Información de contacto</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 w-10 h-10 flex items-center justify-center bg-[#D3E4FD] rounded-full flex-shrink-0">
                    <MapPin size={20} className="text-gray-800" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Dirección</h3>
                    <p className="text-gray-600">Avenida Principal 123, 28001, Madrid, España</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 w-10 h-10 flex items-center justify-center bg-[#D3E4FD] rounded-full flex-shrink-0">
                    <Phone size={20} className="text-gray-800" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Teléfono</h3>
                    <p className="text-gray-600">+34 912 345 678</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 w-10 h-10 flex items-center justify-center bg-[#D3E4FD] rounded-full flex-shrink-0">
                    <Mail size={20} className="text-gray-800" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Email</h3>
                    <p className="text-gray-600">info@vicheos.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 w-10 h-10 flex items-center justify-center bg-[#D3E4FD] rounded-full flex-shrink-0">
                    <Clock size={20} className="text-gray-800" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Horario de atención</h3>
                    <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
                    <p className="text-gray-600">Sábados: 10:00 - 14:00</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map (placeholder) */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-64">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194347.38440858177!2d-3.819064!3d40.4378693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2sMadrid%2C%20Espa%C3%B1a!5e0!3m2!1ses!2ses!4v1653310321544!5m2!1ses!2ses" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Vicheos"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
