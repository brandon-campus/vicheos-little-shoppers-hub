import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const ThankYouPage = () => {
  const [order, setOrder] = useState<{ products: any[]; total: number } | null>(null);

  useEffect(() => {
    // Recuperar el resumen del pedido guardado en localStorage antes de limpiar el carrito
    const lastOrder = localStorage.getItem("lastOrder");
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder));
      localStorage.removeItem("lastOrder");
    }
  }, []);

  // Generar mensajes de WhatsApp dinámicos
  let pagoMsg = "Hola Bicheos, ya he realizado la compra de mi producto";
  let consultaMsg = "Hola Bicheos tengo una consulta sobre mi pedido";
  if (order && order.products.length > 0) {
    const productos = order.products.map(p => `${p.name} x${p.quantity}`).join(", ");
    pagoMsg = `Hola Bicheos, ya he realizado la compra de mi producto: ${productos}`;
  }
  const whatsappNumber = "51947154677";
  const pagoUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(pagoMsg)}`;
  const consultaUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(consultaMsg)}`;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8 text-center">
          <div className="w-20 h-20 bg-[#D3E4FD] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-[#FEC6A1]" />
          </div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">¡Gracias por tu compra!</h1>
          <p className="text-gray-600 mb-6">
            Hemos recibido tu pedido correctamente. Para completarlo, realiza el pago a través de <b>Yape</b> o <b>transferencia bancaria</b> usando los datos a continuación. Apenas confirmemos el pago, prepararemos tu envío.
          </p>
          {order && (
            <div className="bg-[#F1F0FB] p-4 rounded-lg mb-6 text-left">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Resumen de tu pedido</h2>
              <ul className="mb-2">
                {order.products.map((item, idx) => (
                  <li key={idx} className="flex justify-between text-gray-700">
                    <span>{item.name} x{item.quantity}</span>
                    <span>S/ {item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between font-bold text-gray-800 border-t pt-2">
                <span>Total</span>
                <span>S/ {order.total}</span>
              </div>
            </div>
          )}
          <div className="bg-[#F1F0FB] p-4 rounded-lg mb-6 text-left">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Instrucciones de pago</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><b>Yape:</b> Escanea el código QR o usa el número <b>+51 947 154 677</b></li>
              <li><b>Transferencia:</b> Solicita los datos bancarios por WhatsApp si lo prefieres</li>
              <li>Envía el comprobante de pago por WhatsApp para agilizar el proceso</li>
            </ul>
            <div className="my-4 flex flex-col items-center">
              <img src="/img/yapex.jpeg" alt="Código QR de Yape" className="mx-auto rounded-lg" style={{ maxWidth: '200px' }} />
              <p className="text-gray-700 mt-2">Número de Yape: <span className="font-semibold">+51 947 154 677</span></p>
            </div>
            <Button
              className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white text-lg py-6 mb-2"
              asChild
            >
              <a href={pagoUrl} target="_blank" rel="noopener noreferrer">
                Ya he realizado el Pago
              </a>
            </Button>
            <Button
              variant="outline"
              className="w-full border-[#25D366] text-[#25D366] hover:bg-[#EBF9F1] text-lg py-6"
              asChild
            >
              <a href={consultaUrl} target="_blank" rel="noopener noreferrer">
                Hablar con WhatsApp
              </a>
            </Button>
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
