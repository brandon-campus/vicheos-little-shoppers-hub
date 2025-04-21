
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Download, Home, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const ThankYouPage = () => {
  // Generate a random order number
  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  
  // Show welcome toast on mount
  useEffect(() => {
    toast.success("¡Compra realizada con éxito!");
  }, []);
  
  // Handle download receipt
  const handleDownload = () => {
    toast.info("Comprobante enviado a tu correo electrónico");
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8 text-center">
          <div className="w-20 h-20 bg-[#D3E4FD] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-[#FEC6A1]" />
          </div>
          
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">¡Gracias por tu compra!</h1>
          
          <p className="text-gray-600 mb-6">
            Hemos recibido tu pedido correctamente. Te enviaremos un correo electrónico
            con los detalles y el seguimiento de tu envío.
          </p>
          
          <div className="bg-[#F1F0FB] p-4 rounded-lg inline-block mb-8">
            <p className="text-gray-600">Número de pedido:</p>
            <p className="text-xl font-bold text-gray-800">#{orderNumber}</p>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 bg-[#FEC6A1] rounded-full flex items-center justify-center mr-3">
                <span className="font-bold text-gray-800">1</span>
              </div>
              <p className="text-gray-800">Pedido confirmado</p>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 bg-[#F1F0FB] rounded-full flex items-center justify-center mr-3">
                <span className="font-bold text-gray-600">2</span>
              </div>
              <p className="text-gray-600">Pedido en preparación</p>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 bg-[#F1F0FB] rounded-full flex items-center justify-center mr-3">
                <span className="font-bold text-gray-600">3</span>
              </div>
              <p className="text-gray-600">En camino</p>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 bg-[#F1F0FB] rounded-full flex items-center justify-center mr-3">
                <span className="font-bold text-gray-600">4</span>
              </div>
              <p className="text-gray-600">Entregado</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button 
              variant="outline"
              className="border-[#D3E4FD] hover:bg-[#D3E4FD] text-gray-800"
              onClick={handleDownload}
            >
              <Download size={18} className="mr-2" />
              Descargar comprobante
            </Button>
            
            <Button 
              className="bg-[#FEC6A1] hover:bg-[#f9b789] text-gray-800"
              asChild
            >
              <Link to="/productos">
                <ShoppingBag size={18} className="mr-2" />
                Seguir comprando
              </Link>
            </Button>
          </div>
          
          <p className="text-gray-600 mb-4">
            Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos.
          </p>
          
          <Button 
            variant="link" 
            className="text-gray-600 hover:text-[#FEC6A1]"
            asChild
          >
            <Link to="/">
              <Home size={18} className="mr-2" />
              Volver al inicio
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ThankYouPage;
