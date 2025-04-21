
import { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Por favor, introduce un email válido");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("¡Gracias por suscribirte a nuestro newsletter!");
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-[#D3E4FD] py-12 px-4 rounded-2xl">
      <div className="max-w-xl mx-auto text-center">
        <h3 className="text-2xl font-semibold mb-2 text-gray-800">
          Suscríbete a nuestro newsletter
        </h3>
        <p className="mb-6 text-gray-700">
          Recibe noticias sobre los últimos productos y ofertas exclusivas para tu bebé.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu email"
            className="flex-1 bg-white border-white"
            required
          />
          <Button 
            type="submit" 
            className="bg-[#FEC6A1] hover:bg-[#f9b789] text-gray-800"
            disabled={isLoading}
          >
            {isLoading ? (
              "Enviando..."
            ) : (
              <>
                <Send size={18} className="mr-2" />
                Suscribirse
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterForm;
