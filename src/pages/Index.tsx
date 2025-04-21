
import { Link } from "react-router-dom";
import { ChevronRight, Package, CreditCard, Phone, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/shared/ProductCard";
import CategoryCard from "@/components/shared/CategoryCard";
import TestimonialCard from "@/components/shared/TestimonialCard";
import NewsletterForm from "@/components/shared/NewsletterForm";
import { products, categories, testimonials, benefits } from "@/data/mockData";

const Index = () => {
  const featuredProducts = products.slice(0, 4);
  const featuredCategories = categories.slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1 mb-8 md:mb-0 md:pr-8 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
                Tecnología innovadora para tu bebé
              </h1>
              <p className="text-lg text-gray-600 mb-8 animate-fade-in">
                Productos electrónicos que facilitan la vida de las mamás primerizas y mejoran el bienestar de sus bebés.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in">
                <Button 
                  size="lg"
                  className="bg-[#D3E4FD] hover:bg-[#c1d8f8] text-gray-800"
                  asChild
                >
                  <Link to="/productos">
                    Ver Productos
                    <ChevronRight size={18} className="ml-2" />
                  </Link>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-[#FEC6A1] hover:bg-[#FEC6A1] text-gray-800"
                  asChild
                >
                  <Link to="/contacto">Conocer más</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600"
                alt="Tecnología para bebés" 
                className="rounded-2xl shadow-lg w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 px-4 bg-[#F1F0FB]">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">Categorías Destacadas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra amplia gama de productos organizados por categorías para encontrar lo que necesitas más fácilmente.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                image={category.image}
                productCount={category.productCount}
              />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button 
              variant="outline"
              className="border-[#D3E4FD] hover:bg-[#D3E4FD] text-gray-800"
              asChild
            >
              <Link to="/categorias">
                Ver todas las categorías
                <ChevronRight size={18} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">Productos Destacados</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Los productos más populares seleccionados para facilitar el cuidado de tu bebé con la última tecnología.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                isNew={product.isNew}
                isOffer={product.isOffer}
                discountPercentage={product.discountPercentage}
              />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button 
              variant="outline"
              className="border-[#FEC6A1] hover:bg-[#FEC6A1] text-gray-800"
              asChild
            >
              <Link to="/productos">
                Ver todos los productos
                <ChevronRight size={18} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4 bg-[#D3E4FD]/20">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">¿Por qué elegirnos?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nos comprometemos a ofrecerte la mejor experiencia de compra para los productos de tu bebé.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center animate-fade-in">
              <div className="w-12 h-12 bg-[#D3E4FD] rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="text-gray-800" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{benefits[0].title}</h3>
              <p className="text-gray-600">{benefits[0].description}</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center animate-fade-in">
              <div className="w-12 h-12 bg-[#D3E4FD] rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="text-gray-800" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{benefits[1].title}</h3>
              <p className="text-gray-600">{benefits[1].description}</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center animate-fade-in">
              <div className="w-12 h-12 bg-[#D3E4FD] rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-gray-800" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{benefits[2].title}</h3>
              <p className="text-gray-600">{benefits[2].description}</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center animate-fade-in">
              <div className="w-12 h-12 bg-[#D3E4FD] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-gray-800" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{benefits[3].title}</h3>
              <p className="text-gray-600">{benefits[3].description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">Lo que dicen nuestras clientas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre por qué las mamás confían en Vicheos para los productos tecnológicos de sus bebés.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                image={testimonial.image}
                comment={testimonial.comment}
                rating={testimonial.rating}
                date={testimonial.date}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <NewsletterForm />
        </div>
      </section>
    </Layout>
  );
};

export default Index;
