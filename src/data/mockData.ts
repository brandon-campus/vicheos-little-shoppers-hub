
export const products = [
  {
    id: 1,
    name: "Monitor de bebé inteligente con cámara HD",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?w=800&h=800&auto=format&fit=crop",
    description: "Monitor de bebé con cámara HD, visión nocturna, sensor de temperatura y humedad, y conexión a la app móvil para vigilar a tu bebé en cualquier momento.",
    isNew: true,
    isOffer: false,
    discountPercentage: 0,
    category: 1,
    stock: 15,
    rating: 4.7,
    reviews: 24,
    features: [
      "Cámara HD 1080p",
      "Visión nocturna",
      "Audio bidireccional",
      "Sensor de temperatura y humedad",
      "Notificaciones de movimiento y sonido",
      "Compatible con iOS y Android"
    ]
  },
  {
    id: 2,
    name: "Termómetro digital sin contacto",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1584840467421-c3e6c55cdb2a?w=800&h=800&auto=format&fit=crop",
    description: "Termómetro digital sin contacto con tecnología infrarroja para medir la temperatura de tu bebé sin despertarlo. Resultados precisos en 1 segundo.",
    isNew: false,
    isOffer: true,
    discountPercentage: 20,
    category: 2,
    stock: 25,
    rating: 4.5,
    reviews: 18,
    features: [
      "Medición sin contacto",
      "Resultados en 1 segundo",
      "Pantalla LCD retroiluminada",
      "Alarma de fiebre",
      "Memoria de 20 mediciones",
      "Apagado automático"
    ]
  },
  {
    id: 3,
    name: "Chupete inteligente con termómetro integrado",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1586371045050-ab9b2a9d7e4a?w=800&h=800&auto=format&fit=crop",
    description: "Chupete con termómetro integrado que permite medir la temperatura de tu bebé mientras duerme o se relaja. Conectado a la app para seguimiento continuo.",
    isNew: true,
    isOffer: true,
    discountPercentage: 15,
    category: 2,
    stock: 18,
    rating: 4.2,
    reviews: 12,
    features: [
      "Termómetro integrado",
      "Material silicona grado médico",
      "Conexión Bluetooth",
      "Alertas de temperatura",
      "Batería de larga duración",
      "Fácil de limpiar"
    ]
  },
  {
    id: 4,
    name: "Cuna inteligente con balanceo automático",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1556894689-e5e6451c1cf8?w=800&h=800&auto=format&fit=crop",
    description: "Cuna inteligente con balanceo automático que imita el movimiento natural de los brazos. Incluye sonidos blancos, luces nocturnas y monitoreo del sueño.",
    isNew: false,
    isOffer: false,
    discountPercentage: 0,
    category: 3,
    stock: 8,
    rating: 4.8,
    reviews: 32,
    features: [
      "5 velocidades de balanceo",
      "8 sonidos blancos y nanas",
      "Luces nocturnas integradas",
      "Monitoreo del sueño",
      "Control por app móvil",
      "Tejidos hipoalergénicos"
    ]
  },
  {
    id: 5,
    name: "Esterilizador UV para biberones y chupetes",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1595751866979-a1a1863e2693?w=800&h=800&auto=format&fit=crop",
    description: "Esterilizador UV que elimina el 99.9% de bacterias y gérmenes en biberones, chupetes y accesorios del bebé en solo 5 minutos sin necesidad de usar productos químicos.",
    isNew: false,
    isOffer: true,
    discountPercentage: 10,
    category: 4,
    stock: 12,
    rating: 4.6,
    reviews: 15,
    features: [
      "Tecnología UV-C",
      "Esterilización en 5 minutos",
      "Capacidad para 6 biberones",
      "Función de secado",
      "Indicador LED",
      "Operación silenciosa"
    ]
  },
  {
    id: 6,
    name: "Báscula digital para bebés con app",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1520637102912-2df6bb2aec6d?w=800&h=800&auto=format&fit=crop",
    description: "Báscula digital de alta precisión para seguir el crecimiento de tu bebé. Conectada a una app que registra y grafica el peso a lo largo del tiempo.",
    isNew: true,
    isOffer: false,
    discountPercentage: 0,
    category: 2,
    stock: 10,
    rating: 4.4,
    reviews: 9,
    features: [
      "Precisión de 5g",
      "Superficie curva y segura",
      "Conexión Bluetooth",
      "Gráficos de crecimiento",
      "Memoria para varios perfiles",
      "Batería recargable"
    ]
  },
  {
    id: 7,
    name: "Calentador de biberones inteligente",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1635766054459-8df740364df5?w=800&h=800&auto=format&fit=crop",
    description: "Calentador de biberones inteligente con control de temperatura preciso, temporizador y modo de descongelación. Mantiene la leche a temperatura perfecta.",
    isNew: false,
    isOffer: false,
    discountPercentage: 0,
    category: 4,
    stock: 14,
    rating: 4.3,
    reviews: 11,
    features: [
      "Calentamiento rápido y uniforme",
      "Control de temperatura preciso",
      "Modo de descongelación",
      "Compatible con todos los biberones",
      "Apagado automático",
      "Pantalla táctil intuitiva"
    ]
  },
  {
    id: 8,
    name: "Intercomunicador de bebé con sensor de llanto",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1601085558053-4febf560dd7d?w=800&h=800&auto=format&fit=crop",
    description: "Intercomunicador de bebé con tecnología de reconocimiento de llanto, que te avisa inmediatamente cuando tu bebé está llorando, incluso sin ruido ambiental.",
    isNew: false,
    isOffer: true,
    discountPercentage: 25,
    category: 1,
    stock: 20,
    rating: 4.5,
    reviews: 16,
    features: [
      "Detección de llanto avanzada",
      "Alcance de 300 metros",
      "Luces indicadoras de sonido",
      "Nanas programables",
      "Modo de ahorro de energía",
      "Batería de 18 horas"
    ]
  }
];

export const categories = [
  {
    id: 1,
    name: "Monitores y Cámaras",
    image: "https://images.unsplash.com/photo-1579132568398-52a7358a70d5?w=800&h=400&auto=format&fit=crop",
    productCount: 8
  },
  {
    id: 2,
    name: "Salud y Bienestar",
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&h=400&auto=format&fit=crop",
    productCount: 12
  },
  {
    id: 3,
    name: "Mobiliario Inteligente",
    image: "https://images.unsplash.com/photo-1556894689-e5e6451c1cf8?w=800&h=400&auto=format&fit=crop",
    productCount: 6
  },
  {
    id: 4,
    name: "Alimentación",
    image: "https://images.unsplash.com/photo-1635766054459-8df740364df5?w=800&h=400&auto=format&fit=crop",
    productCount: 10
  },
  {
    id: 5,
    name: "Juguetes Interactivos",
    image: "https://images.unsplash.com/photo-1696307216650-542c8eefb01e?w=800&h=400&auto=format&fit=crop",
    productCount: 9
  },
  {
    id: 6,
    name: "Seguridad",
    image: "https://images.unsplash.com/photo-1604437676312-8057182e590d?w=800&h=400&auto=format&fit=crop",
    productCount: 7
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
