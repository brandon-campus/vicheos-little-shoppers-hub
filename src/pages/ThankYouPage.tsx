import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Download, Home, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { products } from "@/data/mockData";

const ThankYouPage = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");

  const product = products.find(p => p.id === parseInt(productId || "0"));

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(amount);
  };

  const whatsappNumber = "51947154677";

  const paidMessage = product ? `Hola Bicheos, ya he realizado la compra de mi producto ${product.name}` : "Hola Bicheos, ya he realizado la compra de mi producto";
  const paidWhatsAppUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(paidMessage)}`;

  const infoMessage = "Hola Bicheos, tengo una consulta sobre mi pedido.";
  const infoWhatsAppUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(infoMessage)}`;

  useEffect(() => {
    if (product) {
      toast.success("¡Formulario enviado con éxito!");
    }
  }, [product]);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Error al procesar pedido</h2>
          <p className="text-gray-600 mb-6">
            No pudimos encontrar los detalles del producto. Por favor, intenta de nuevo o contacta con soporte.
          </p>
          <Button asChild className="bg-[#D3E4FD] hover:bg-[#c1d8f8] text-gray-800">
            <Link to="/productos">Ver todos los productos</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8 text-center">
          <div className="w-20 h-20 bg-[#D3E4FD] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-[#FEC6A1]" />
          </div>
          
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">¡Solo queda un paso!</h1>
          
          <p className="text-gray-600 mb-6">
            Tu pedido está casi listo. Para completarlo, realiza el pago a través de Yape escaneando el código QR o usando el número de teléfono.
          </p>
          
          <div className="bg-[#F1F0FB] p-4 rounded-lg mb-6 text-left">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Resumen de tu pedido</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Producto:</span> {product.name}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Precio:</span> {formatPrice(product.price)}
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Paga con Yape</h3>
            
            <div className="mb-4">
              <img
                src="/img/yapex.jpeg"
                alt="Código QR de Yape"
                className="mx-auto rounded-lg"
                style={{ maxWidth: '250px' }}
              />
            </div>
            
            <p className="text-gray-700 mb-4">
              Número de Yape: <span className="font-semibold">+51 947 154 677</span>
            </p>
            
            <p className="text-gray-600 mb-6">
              Por favor, realiza el pago y luego confírmalo haciendo click en el botón de abajo.
            </p>
            
            <div className="flex flex-col gap-4 justify-center">
              <Button
                className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white text-lg py-6"
                asChild
              >
                <a href={paidWhatsAppUrl} target="_blank" rel="noopener noreferrer">
                  Ya he realizado el Pago
                </a>
              </Button>
              
              <Button
                variant="outline"
                className="w-full border-[#25D366] text-[#25D366] hover:bg-[#EBF9F1] text-lg py-6"
                asChild
              >
                <a href={infoWhatsAppUrl} target="_blank" rel="noopener noreferrer">
                  Hablar con WhatsApp
                </a>
              </Button>
            </div>
          </div>
          
          <div className="mt-8">
            <Button
              variant="link"
              className="text-gray-600 hover:text-[#FEC6A1]"
              asChild
            >
              <Link to="/productos">
                <ShoppingBag size={18} className="mr-2" />
                Ver otros productos
              </Link>
            </Button>
            
            <Button
              variant="link"
              className="text-gray-600 hover:text-[#FEC6A1] ml-4"
              asChild
            >
              <Link to="/">
                <Home size={18} className="mr-2" />
                Volver al inicio
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThankYouPage;
