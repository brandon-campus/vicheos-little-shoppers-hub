import { Phone } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '51947154677'; // Número real: +51 947 154 677
  const message = encodeURIComponent('Hola, quisiera más información sobre los productos de Bicheos');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const handleClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      aria-label="Contactar por WhatsApp"
    >
      <Phone className="w-6 h-6" />
    </button>
  );
};

export default WhatsAppButton; 