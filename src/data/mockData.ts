import { supabase } from "@/lib/supabaseClient";

export const products = [
  {
    id: 105,
    name: "Orejeras de seguridad con cancelación de ruido para bebés",
    price: 266,
    image: "/img/Orejeras para bebes/orejeras para bebés.webp",
    gallery: [
      "/img/Orejeras para bebes/celeste.webp",
      "/img/Orejeras para bebes/blanco.webp",
      "/img/Orejeras para bebes/package.webp",
      "/img/Orejeras para bebes/tipos.webp"
    ],
    description: "Protege las delicadas orejas de tu bebé con estas orejeras con cancelación de ruido. Ofrecen una reducción de hasta 25 dB, ideales para conciertos, viajes o eventos. Diadema suave sin presión, plegables y fáciles de transportar. Incluye bolsa con cordón. Apto para bebés de 0 a 48 meses.",
    isNew: true,
    isOffer: false,
    discountPercentage: 0,
    category: 1,
    stock: 1,
    rating: 4.5,
    reviews: 0,
    features: [
      "Cancelación de ruido (25 dB)",
      "Diadema suave sin presión",
      "Plegables y portátiles",
      "Incluye bolsa con cordón",
      "Apto para 0-48 meses"
    ],
    tallyFormUrl: "https://tally.so/r/wAGd2B"
  },
  {
    id: 106,
    name: "Esterilizador Portátil UV para Chupones Mommed",
    price: 260,
    image: "/img/Nueva carpeta/Esterilizador para bebes.webp",
    gallery: [
      "/img/Nueva carpeta/tamaño.webp",
      "/img/Nueva carpeta/uso.webp",
      "/img/Nueva carpeta/distinto.webp",
      "/img/Nueva carpeta/carga.webp"
    ],
    description: "Esteriliza rápidamente chupetes con luz UV sin químicos ni agua. Portátil, con correa para cochecito. Elimina 99,9% de bacterias. Batería recargable USB-C.",
    isNew: true,
    isOffer: false,
    discountPercentage: 0,
    category: 1,
    stock: 1,
    rating: 4.5,
    reviews: 0,
    features: [
      "Esterilización UV sin químicos",
      "Portátil con correa",
      "Elimina 99.9% de bacterias",
      "Batería recargable USB-C",
      "Sin necesidad de agua"
    ],
    tallyFormUrl: "https://tally.so/r/wLNb7G"
  },
  {
    id: 107,
    name: "Almohadillas para Senos Especial Lactancia (2 piezas)",
    price: 127,
    image: "/img/Almhadillas/Almohadilla.webp",
    gallery: [
      "/img/Almhadillas/2piezas.webp",
      "/img/Almhadillas/colores.webp",
      "/img/Almhadillas/confort.webp",
      "/img/Almhadillas/morado.webp",
      "/img/Almhadillas/protección.webp"
    ],
    description: "Diseño en PVC y terciopelo para frío o calor. Reduce inflamación, mejora la circulación y alivia molestias de la lactancia. Cómodas, reutilizables y ergonómicas.",
    isNew: true,
    isOffer: false,
    discountPercentage: 0,
    category: 2,
    stock: 1,
    rating: 4.5,
    reviews: 0,
    features: [
      "Efecto frío/calor",
      "Reduce inflamación",
      "Mejora la circulación",
      "Reutilizables",
      "Diseño ergonómico"
    ],
    tallyFormUrl: "https://tally.so/r/np1KyV"
  },
  {
    id: 108,
    name: "Termómetro de Agua con Detección de Temperatura – Elefante",
    price: 207,
    image: "/img/Termometro de elefante/Termometro de elefante.webp",
    gallery: [
      "/img/Termometro de elefante/b914e9a2-b653-4ae7-b183-7c5b73c23946.webp",
      "/img/Termometro de elefante/8104cf70-0bbe-40f5-9bd6-412c65917d8a.webp",
      "/img/Termometro de elefante/1673d561-f6e3-4be7-a6fb-9b4c4d76b48f.webp",
      "/img/Termometro de elefante/5b8cb9f9-151b-48ac-b6f1-cbba51fb3c52.webp"
    ],
    description: "Mide la temperatura del agua del baño con alta precisión. Diseño seguro para bebés, portátil y compacto. Ideal para recién nacidos.",
    isNew: true,
    isOffer: false,
    discountPercentage: 0,
    category: 1,
    stock: 1,
    rating: 4.5,
    reviews: 0,
    features: [
      "Diseño seguro para bebés",
      "Alta precisión",
      "Portátil y compacto",
      "Ideal para recién nacidos",
      "Fácil de usar"
    ],
    tallyFormUrl: "https://tally.so/r/wMqbNY"
  },
  {
    id: 109,
    name: "Taza Giratoria 360° Anti-Derrames",
    price: 109,
    image: "/img/Nueva carpeta (2)/regalo.webp",
    gallery: [
      "/img/Nueva carpeta (2)/61d612f4aa6ecfacdf0019a763b20202.webp",
      "/img/Nueva carpeta (2)/317cd03f5a4ffff3212056b1cf0ece84.webp",
      "/img/Nueva carpeta (2)/abf06cd28a287e458a0839aa39a8b285.webp",
      "/img/Nueva carpeta (2)/e989b003e68becfe9e8548ab2307bb68.webp"
    ],
    description: "Tazón con diseño tipo Saturno, gira 360° para evitar derrames. Tres asas y tapa incluida. Hecho de material PP de grado alimenticio.",
    isNew: true,
    isOffer: false,
    discountPercentage: 0,
    category: 2,
    stock: 1,
    rating: 4.5,
    reviews: 0,
    features: [
      "Diseño giratorio 360°",
      "Anti-derrames",
      "Tres asas ergonómicas",
      "Tapa incluida",
      "Material PP grado alimenticio"
    ],
    tallyFormUrl: "https://tally.so/r/mJx6pJ"
  },
  {
    id: 110,
    name: "Lima de Uñas Eléctrica para Bebés",
    price: 169,
    image: "/img/Nueva carpeta (3)/lima de uñas para bebes.webp",
    gallery: [
      "/img/Nueva carpeta (3)/2abf6933-28f4-47dd-bdda-aefbb4cbf26c (1).webp",
      "/img/Nueva carpeta (3)/2abf6933-28f4-47dd-bdda-aefbb4cbf26c.webp",
      "/img/Nueva carpeta (3)/82d69397-d9d0-437f-a493-0775033cf9cd.webp",
      "/img/Nueva carpeta (3)/670e7a76-1862-406c-84ef-e1db6a50b969.webp",
      "/img/Nueva carpeta (3)/Lima de Uñas.webp",
      "/img/Nueva carpeta (3)/colores.webp"
    ],
    description: "Corta y pule uñas de forma segura. Silenciosa, liviana y fácil de usar. Incluye cabezales de pulido. No interrumpe el sueño del bebé.",
    isNew: true,
    isOffer: false,
    discountPercentage: 0,
    category: 3,
    stock: 1,
    rating: 4.5,
    reviews: 0,
    features: [
      "Operación silenciosa",
      "Cabezales de pulido incluidos",
      "Liviana y portátil",
      "No interrumpe el sueño",
      "Fácil de usar"
    ],
    tallyFormUrl: "https://tally.so/r/wg10dN"
  },
  {
    id: 111,
    name: "Mochila Multifuncional para Artículos de Bebé",
    price: 269,
    image: "/img/Mochila/2cec5304-43a0-4f3a-b19c-6d7c39ec2437.webp",
    gallery: [
      "/img/Mochila/0033111f-751c-41fc-a8db-e05ae393cf7e.webp",
      "/img/Mochila/565273a8-f94b-4617-bc46-1e8141ff64d5.webp",
      "/img/Mochila/992530ac-7c9d-464b-9149-f6740784d034.webp",
      "/img/Mochila/a195285a-9035-45f0-a336-f055e10ca0ba.webp",
      "/img/Mochila/d22f410f-8c8a-4243-bc2f-bb62bb24e085.webp",
      "/img/Mochila/d166082b-88b1-4e08-80f3-db4ec16944d0.webp",
      "/img/Mochila/e4df9f56-deeb-4529-bcca-14db96b275d2.webp",
      "/img/Mochila/e792b2f8-c92c-49f6-a286-1e6fa66f15f1.webp",
      "/img/Mochila/f19e3208-5ae8-483e-afdb-80db2b60c20b.webp"
    ],
    description: "Mochila maternal 3 en 1 con cambiador y cuna plegable. Gran capacidad, resistente e impermeable. Organiza biberones, pañales y más.",
    isNew: true,
    isOffer: false,
    discountPercentage: 0,
    category: 4,
    stock: 1,
    rating: 4.5,
    reviews: 0,
    features: [
      "3 en 1: mochila, cambiador y cuna",
      "Gran capacidad",
      "Resistente e impermeable",
      "Organizador múltiple",
      "Plegable y portátil"
    ],
    tallyFormUrl: "https://tally.so/r/3XkDJO"
  },
  {
    id: 112,
    name: "Termómetro de Agua 3 en 1 – Tortuga",
    price: 249,
    image: "/img/Tortuga/1717311061649-a5ab964a64aa46bd9ba2b4be50bce6ff-goods.webp",
    gallery: [
      "/img/Tortuga/21b5d38b-cea6-44a3-bf01-168d300886de.webp",
      "/img/Tortuga/1717311060680-6d602faae6ce4f79bedee1e1a7d319f7-goods.webp",
      "/img/Tortuga/1717311061649-a5ab964a64aa46bd9ba2b4be50bce6ff-goods.webp",
      "/img/Tortuga/1717311064681-afd5918e45e34bbbb4d807cc636dad17-goods.webp",
      "/img/Tortuga/ff969a24-b4a2-4684-9394-841d32ac6475.webp",
      "/img/Tortuga/1717311063926-bcc20a4aa5294a4cb62aaf23530e4269-goods.webp"
    ],
    description: "Divertido termómetro LED con forma de tortuga. Sensor de alta precisión. Indicadores de color para verificar temperatura. Portátil y duradero.",
    isNew: true,
    isOffer: false,
    discountPercentage: 0,
    category: 1,
    stock: 1,
    rating: 4.5,
    reviews: 0,
    features: [
      "Diseño LED con forma de tortuga",
      "Sensor de alta precisión",
      "Indicadores de color",
      "Portátil",
      "Duradero"
    ],
    tallyFormUrl: "https://tally.so/r/w8yKaA"
  }
];

export const categories = [
  {
    id: 1,
    name: "Seguridad y Protección",
    image: "/img/seguridad.jpg",
    productCount: 4
  },
  {
    id: 2,
    name: "Alimentación y Lactancia",
    image: "/img/alimentacion2.jpg",
    productCount: 2
  },
  {
    id: 3,
    name: "Cuidados e Higiene del bebé",
    image: "/img/higiene.png",
    productCount: 1
  },
  {
    id: 4,
    name: "Paseo y Viajes con el bebé",
    image: "/img/paseo.jpg",
    productCount: 1
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Lucía Martínez",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&auto=format&fit=crop",
    comment: "El monitor de bebé es increíble, me da mucha tranquilidad saber que puedo ver a mi bebé desde el teléfono en cualquier momento. ¡Lo recomiendo totalmente!",
    rating: 5,
    date: "12/03/2025"
  },
  {
    id: 2,
    name: "Carmen Rodríguez",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&auto=format&fit=crop",
    comment: "La báscula digital ha sido muy útil para seguir el desarrollo de mi bebé. La app es muy intuitiva y me permite ver su progreso de forma sencilla.",
    rating: 4,
    date: "18/02/2025"
  },
  {
    id: 3,
    name: "Marta Sánchez",
    image: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=300&h=300&auto=format&fit=crop",
    comment: "El termómetro digital es maravilloso, no tengo que despertar a mi bebé para tomarle la temperatura. Delivery rápido y excelente atención al cliente.",
    rating: 5,
    date: "05/04/2025"
  }
];

export const benefits = [
  {
    id: 1,
    title: "Envío gratuito",
    description: "En todos los pedidos superiores a 50€",
    icon: "package"
  },
  {
    id: 2,
    title: "Pago seguro",
    description: "Plataforma de pago encriptada",
    icon: "credit-card"
  },
  {
    id: 3,
    title: "Atención 24/7",
    description: "Asistencia personalizada",
    icon: "phone"
  },
  {
    id: 4,
    title: "Garantía de calidad",
    description: "2 años en todos los productos",
    icon: "shield"
  }
];
