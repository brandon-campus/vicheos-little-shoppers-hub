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
import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Megaphone } from "lucide-react";

interface Slide {
  background?: string;
  backgroundImage?: string;
  content: React.ReactNode;
  mainImage?: string;
  thumbnail?: string;
}

const heroSlides = [
  {
    id: 1,
    title: 'Hasta 40% OFF',
    subtitle: 'en Electrónica para bebés',
    description: 'Productos seleccionados • Garantía oficial • Stock limitado',
    image: '/img/bicheoscol.jpg',
    buttonText: 'Ver ofertas',
    background: 'bg-gradient-to-r from-[#F6A623] via-[#FFD580] to-[#FEC6A1]',
    badge: 'OFERTA',
    badgeColor: 'bg-[#D9E4EA] text-[#2A4263]',
  },
  {
    id: 2,
    title: 'Envío gratis',
    subtitle: 'en compras desde S/200',
    description: 'Rápido • Seguro • A todo el país',
    image: '/img/paseo.jpg',
    buttonText: 'Ver productos',
    background: 'bg-gradient-to-r from-[#4BC0F1] via-[#D9E4EA] to-[#A0E7E5]',
    badge: 'GRATIS',
    badgeColor: 'bg-[#D9E4EA] text-[#2A4263]',
  },
  {
    id: 3,
    title: '¡12 cuotas sin interés!',
    subtitle: 'Pagá fácil y seguro',
    description: 'Tarjetas seleccionadas • Sin recargo • 100% online',
    image: '/img/Productos electrónicos.png',
    buttonText: 'Ver más',
    background: 'bg-gradient-to-r from-[#F6A623] via-[#FEC6A1] to-[#F1F0FB]',
    badge: '12 CUOTAS',
    badgeColor: 'bg-[#D9E4EA] text-[#2A4263]',
  },
];

const HeroSlider = () => {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [hovered]);

  const goTo = (idx: number) => setActive(idx);
  const prev = () => setActive((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  const next = () => setActive((prev) => (prev + 1) % heroSlides.length);

  return (
    <section className="relative h-[320px] md:h-[400px] mx-4 md:mx-8 mt-4 rounded-2xl shadow-lg overflow-hidden select-none group" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {heroSlides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out ${
            idx === active
              ? 'translate-x-0 z-20 opacity-100'
              : idx < active
              ? '-translate-x-full z-10 opacity-0'
              : 'translate-x-full z-10 opacity-0'
          } ${slide.background}`}
          style={{ borderRadius: '1rem' }}
        >
          {/* Círculos decorativos */}
          <div className="absolute w-32 h-32 bg-white opacity-10 rounded-full -top-16 -left-16" />
          <div className="absolute w-24 h-24 bg-white opacity-10 rounded-full bottom-4 right-4 translate-x-12 translate-y-12" />
          {/* Contenido */}
          <div className="grid grid-cols-1 md:grid-cols-2 h-full px-10 md:px-20">
            {/* Texto */}
            <div className="flex flex-col justify-center h-full text-white">
              <span className={`text-sm font-bold px-3 py-1 rounded-full mb-4 inline-block max-w-max ${slide.badgeColor}`}>
                {slide.badge}
              </span>
              <h2 className="text-3xl md:text-5xl font-black leading-tight mb-2 drop-shadow-lg">{slide.title}</h2>
              <h3 className="text-xl md:text-2xl font-semibold opacity-95 mb-2 drop-shadow-lg">{slide.subtitle}</h3>
              <p className="text-base md:text-lg opacity-90 mb-6 drop-shadow-lg">{slide.description}</p>
              <Button asChild className="bg-white text-gray-900 hover:bg-vicheos-cream font-semibold px-8 py-3 text-lg rounded-lg shadow-lg hover:scale-105 transition-all duration-300 w-fit">
                <Link to="/productos">{slide.buttonText}</Link>
              </Button>
            </div>
            {/* Imagen */}
            <div className="hidden md:flex items-center justify-end h-full">
              <div className="relative w-full h-72 flex items-center justify-end">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-72 object-cover rounded-xl shadow-2xl bg-white bg-opacity-10"
                  style={{ maxWidth: 340 }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Botones navegación */}
      <button
        aria-label="Anterior"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 hover:bg-white rounded-full p-2 md:p-3 transition-all duration-300 hover:scale-110 shadow-lg z-30"
        tabIndex={0}
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-vicheos-blue" />
      </button>
      <button
        aria-label="Siguiente"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 hover:bg-white rounded-full p-2 md:p-3 transition-all duration-300 hover:scale-110 shadow-lg z-30"
        tabIndex={0}
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-vicheos-blue" />
      </button>
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              idx === active ? 'bg-white scale-125' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Ir al slide ${idx + 1}`}
            tabIndex={0}
          />
        ))}
      </div>
    </section>
  );
};

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
    // Slide 1: Diseño moderno con formas orgánicas y layout profesional
    {
      content: (
        <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden bg-[#FDFBF6]">
          {/* Formas orgánicas de fondo */}
          <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-[#E3F0FF] rounded-full opacity-70 blur-2xl z-0" />
          <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-[#FFE5C2] rounded-full opacity-70 blur-2xl z-0" />
          <div className="absolute top-1/2 left-1/3 w-[200px] h-[200px] bg-[#FFB996] rounded-full opacity-40 blur-2xl z-0 transform -translate-y-1/2" />
          <div className="w-full flex flex-col md:flex-row items-center justify-between h-full relative z-10 px-4">
            {/* Texto a la izquierda */}
            <div className="w-full md:w-1/2 text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-[#2A4263] mb-6 leading-tight" style={{fontFamily: 'Quicksand, sans-serif'}}>Tecnología pensada para cuidar lo que más amás</h1>
              <p className="text-lg text-[#4B5C6B] mb-8" style={{fontFamily: 'Quicksand, sans-serif'}}>Descubrí productos inteligentes que simplifican tu vida como mamá o papá.</p>
              <Button size="lg" className="bg-[#FF8C5A] hover:bg-[#ffb996] text-white font-semibold rounded-full px-8 py-3 text-lg shadow-lg transition" asChild>
                <Link to="/productos">Explorar productos</Link>
              </Button>
            </div>
            {/* Imagen a la derecha */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0">
             <img
                src="/img/bicheoscol.jpg"
                alt="Mamá y bebé usando tecnología"
                className="max-w-md md:max-w-xl h-[340px] md:h-[420px] rounded-2xl shadow-xl object-contain"
              />
            </div>
          </div>
        </div>
      ),
    },
    // Slide 2: Producto estrella o novedad
    {
      content: (
        <div className="relative w-full h-[500px] flex items-center justify-center py-10 md:py-0 overflow-hidden bg-[#FDFBF6]">
          {/* Fondo con imagen sugerida (placeholder) */}
          <div className="absolute inset-0">
            <img src="/img/hero-orejeras-bebe.jpg" alt="Bebé con orejeras de seguridad" className="w-full h-full object-cover object-center opacity-60" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-4 bg-[#D3E4FD]/90 rounded-[40px] shadow-lg py-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">Nuevo Orejeras de seguridad° – Con cancelación de ruido</h1>
            <p className="text-lg text-gray-700 mb-8 text-center">Protege las delicadas orejas de tu bebé con estas orejeras con cancelación de ruido.</p>
            <Button size="lg" className="bg-[#FEC6A1] hover:bg-[#f9b789] text-gray-800 font-semibold rounded-full px-8 py-3 text-lg" asChild>
              <Link to="/producto/105">Ver más</Link>
            </Button>
          </div>
        </div>
      ),
    },
    // Slide 3: Beneficio principal o promoción
    {
      content: (
        <div className="relative w-full h-[500px] flex items-center justify-center py-10 md:py-0 overflow-hidden bg-[#FDFBF6]">
          {/* Fondo con imagen sugerida (placeholder) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img src="/img/hero-yape-familia.jpg" alt="Paquete entregado a familia feliz" className="w-full h-full object-cover object-center opacity-60" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-4 bg-[#FEC6A1]/90 rounded-[40px] shadow-lg py-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">Paga con Yape</h1>
            <p className="text-lg text-gray-700 mb-8 text-center">Comprá con confianza, cuidamos de vos y de tu bebé.</p>
            <Button size="lg" className="bg-[#D3E4FD] hover:bg-[#c1d8f8] text-gray-800 font-semibold rounded-full px-8 py-3 text-lg" asChild>
              <Link to="/productos">Ver productos</Link>
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <HeroSlider />

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
              <p className="text-gray-600">En todos los pedidos superiores a 200 soles</p>
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
