// Configuración SEO optimizada para Bicheos Perú
export const seoConfig = {
  // Palabras clave principales
  primaryKeywords: [
    "productos para bebés Perú",
    "juguetes bebés Lima",
    "orejeras bebés",
    "esterilizador chupones",
    "termómetro bebé",
    "almohadillas lactancia",
    "cuidado infantil Perú",
    "tienda bebés online",
    "envío gratis Perú",
    "pago Yape bebés"
  ],

  // Palabras clave secundarias
  secondaryKeywords: [
    "productos bebés Lima",
    "juguetes electrónicos bebés",
    "seguridad bebés Perú",
    "higiene bebé",
    "alimentación lactancia",
    "paseo bebé",
    "viajes bebé",
    "regalos bebés",
    "mamás primerizas Perú",
    "papás primerizos"
  ],

  // Palabras clave de productos específicos
  productKeywords: {
    orejeras: ["orejeras bebés", "protección auditiva bebés", "cancelación ruido bebés"],
    esterilizador: ["esterilizador chupones", "esterilizador UV", "limpieza chupones"],
    termometro: ["termómetro bebé", "termómetro agua", "temperatura bebé"],
    almohadillas: ["almohadillas lactancia", "compresas lactancia", "cuidado senos"]
  },

  // Configuración por página
  pages: {
    home: {
      title: "Bicheos Perú - Productos para Bebés | Juguetes, Seguridad y Cuidado Infantil",
      description: "Tienda online de productos para bebés en Perú. Orejeras de seguridad, esterilizadores UV, termómetros y más. Envío gratis a todo Perú. Paga con Yape. Productos de calidad para el cuidado de tu bebé.",
      keywords: "productos para bebés Perú, juguetes bebés Lima, orejeras bebés, esterilizador chupones, termómetro bebé, almohadillas lactancia, cuidado infantil Perú, tienda bebés online, envío gratis Perú, pago Yape bebés"
    },
    products: {
      title: "Productos para Bebés Perú | Orejeras, Esterilizadores, Termómetros - Bicheos",
      description: "Compra productos para bebés en Perú. Orejeras de seguridad, esterilizadores UV, termómetros, almohadillas de lactancia y más. Envío gratis a todo Perú. Paga con Yape.",
      keywords: "productos bebés Perú, orejeras bebés, esterilizador chupones, termómetro bebé, almohadillas lactancia, juguetes bebés Lima, cuidado infantil Perú, tienda bebés online"
    },
    categories: {
      title: "Categorías de Productos para Bebés Perú | Seguridad, Alimentación, Cuidado - Bicheos",
      description: "Explora nuestras categorías de productos para bebés en Perú. Seguridad y protección, alimentación y lactancia, cuidados e higiene, paseo y viajes. Envío gratis a todo Perú.",
      keywords: "categorías bebés Perú, seguridad bebés, alimentación lactancia, cuidado higiene bebé, paseo viajes bebé, productos bebés Lima, tienda bebés online Perú"
    },
    contact: {
      title: "Contacto Bicheos Perú | Atención al Cliente Productos para Bebés",
      description: "Contáctanos para consultas sobre productos para bebés en Perú. WhatsApp: +51 947-154-677. Envío gratis a todo Perú. Atención personalizada para el cuidado de tu bebé.",
      keywords: "contacto Bicheos Perú, atención cliente bebés, WhatsApp bebés Perú, consultas productos bebés Lima, soporte Bicheos Perú"
    }
  },

  // Configuración de localización
  localization: {
    country: "PE",
    region: "Lima",
    language: "es",
    locale: "es_PE",
    coordinates: {
      latitude: -12.0464,
      longitude: -77.0428
    }
  },

  // Configuración de redes sociales
  social: {
    facebook: "https://www.facebook.com/bicheos",
    instagram: "https://www.instagram.com/bicheos",
    twitter: "@bicheos"
  },

  // Configuración de contacto
  contact: {
    phone: "+51-947-154-677",
    whatsapp: "+51-947-154-677",
    email: "info@bicheos.com"
  },

  // Configuración de envío
  shipping: {
    freeThreshold: 200,
    currency: "PEN",
    symbol: "S/"
  }
};

// Función para generar palabras clave dinámicas
export const generateKeywords = (baseKeywords: string[], additionalKeywords: string[] = []) => {
  return [...baseKeywords, ...additionalKeywords].join(", ");
};

// Función para generar structured data de producto
export const generateProductStructuredData = (product: any) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "image": product.image,
  "url": `https://www.bicheos.com/producto/${product.id}`,
  "brand": {
    "@type": "Brand",
    "name": "Bicheos Perú"
  },
  "offers": {
    "@type": "Offer",
    "price": product.price,
    "priceCurrency": "PEN",
    "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    "seller": {
      "@type": "Organization",
      "name": "Bicheos Perú"
    }
  },
  "aggregateRating": product.rating ? {
    "@type": "AggregateRating",
    "ratingValue": product.rating,
    "reviewCount": product.reviews || 0
  } : undefined
});
