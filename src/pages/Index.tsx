import { Link } from "react-router-dom";
import { ChevronRight, Package, CreditCard, Phone, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/shared/ProductCard";
import CategoryCard from "@/components/shared/CategoryCard";
import TestimonialCard from "@/components/shared/TestimonialCard";
import NewsletterForm from "@/components/shared/NewsletterForm";
import { products, categories, testimonials, benefits } from "@/data/mockData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react';

interface Slide {
  background?: string;
  backgroundImage?: string;
  content: React.ReactNode;
}

const Index = () => {
  const featuredProducts = products.slice(0, 4);
  const featuredCategories = categories.slice(0, 4);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  const orejerasProduct = products.find(p => p.id === 105);
  const mochilaProduct = products.find(p => p.id === 111);

  const slides: Slide[] = [
    // Slide 1: Original Hero Section with Image Background
    {
      backgroundImage: '/img/productosparabebes.jpg',
      content: (
        <div className="flex flex-col md:flex-row items-center w-full">
          <div className="flex-1 mb-8 md:mb-0 md:pr-8 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
              Tecnología para el cuidado de tu bebé
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
          <div className="flex-1 flex justify-center items-center animate-fade-in">
             <img
               src="/img/productosparabebes.jpg"
               alt="Imagen de tecnología para bebés (emocional)"
               className="rounded-2xl shadow-lg w-full max-w-sm h-64 object-cover"
             />
          </div>
        </div>
      ),
    },
    // Slide 2: Orejeras with Gradient Background
    {
      background: 'linear-gradient(180deg, #FEC6A1, #D3E4FD)',
      content: (
        <div className="flex flex-col md:flex-row items-center w-full">
          <div className="flex-1 mb-8 md:mb-0 md:pr-8 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Seguridad y tranquilidad en todo momento
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Nuestras orejeras con cancelación de ruido cuidan la audición de tu bebé en ambientes ruidosos, para que siempre esté tranquilo y seguro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                className="bg-[#D3E4FD] hover:bg-[#c1d8f8] text-gray-800"
                asChild
              >
                <Link to={`/producto/${orejerasProduct?.id}`}>
                  Ver producto
                  <ChevronRight size={18} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center">
             <img
               src="/img/mochilamultifuncional.png"
               alt="Bebé con orejeras y padre/madre (emocional)"
               className="rounded-2xl shadow-lg w-full max-w-sm h-64 object-cover"
             />
          </div>
        </div>
      ),
    },
     // Slide 3: Mochila with Gradient Background
    {
      background: 'linear-gradient(180deg, #FEC6A1, #D3E4FD)',
      content: (
        <div className="flex flex-col md:flex-row items-center w-full">
          <div className="flex-1 mb-8 md:mb-0 md:pr-8 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Todo en su lugar, siempre
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Nuestra mochila multifuncional está diseñada para tener todo lo que necesita tu bebé al alcance, organizada y con estilo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                className="bg-[#D3E4FD] hover:bg-[#c1d8f8] text-gray-800"
                asChild
              >
                <Link to={`/producto/${mochilaProduct?.id}`}>
                  Ver Mochilas Inteligentes
                  <ChevronRight size={18} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center">
             <img
               src="/img/bicheoscol.jpg"
               alt="Escena emocional con la mochila"
               className="rounded-2xl shadow-lg w-full max-w-sm h-64 object-cover"
             />
          </div>
        </div>
      ),
    },
    // Slide 4: Pago con Yape with Gradient Background
    {
      background: 'linear-gradient(180deg, #FEC6A1, #D3E4FD)',
      content: (
        <div className="flex flex-col md:flex-row items-center w-full">
          <div className="flex-1 mb-8 md:mb-0 md:pr-8 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              ¡Pagá en segundos con Yape!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              En Vicheos aceptamos Yape para que puedas comprar lo que tu bebé necesita de forma rápida, segura y sin complicaciones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                className="bg-[#FEC6A1] hover:bg-[#f9b789] text-gray-800"
                asChild
              >
                <Link to="/productos">
                  Ver productos
                  <ChevronRight size={18} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center">
             <img
               src="/img/yapess.png"
               alt="Imagen de pago con Yape (emocional)"
               className="rounded-2xl shadow-lg w-full max-w-sm h-64 object-cover"
             />
          </div>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      {/* Hero Section with Carousel */}
      <section className="relative pt-12 pb-20 md:py-20 px-4 overflow-hidden min-h-[500px] flex items-center">
        <Slider {...settings} className="w-full">
          {slides.map((slide, index) => (
            <div key={index} className="relative w-full h-full" style={{
              height: '500px',
              ...(slide.background ? { background: slide.background } : {}),
              ...(slide.backgroundImage ? { backgroundImage: `url(${slide.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}),
            }}>
              <div className="container mx-auto relative z-10 h-full flex items-center">
                {slide.content}
              </div>
            </div>
          ))}
        </Slider>
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
