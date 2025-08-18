import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Configuración de Google Analytics
const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Reemplazar con tu ID real

// Función para inicializar Google Analytics
const initializeGA = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    return;
  }

  // Cargar Google Analytics
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_TRACKING_ID}', {
      page_title: document.title,
      page_location: window.location.href
    });
  `;
  document.head.appendChild(script2);
};

// Función para trackear páginas
const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      page_title: document.title
    });
  }
};

// Función para trackear eventos
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// Función para trackear conversiones de e-commerce
export const trackPurchase = (transactionId: string, value: number, currency: string = 'PEN') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency
    });
  }
};

// Función para trackear productos vistos
export const trackProductView = (productId: string, productName: string, category: string, price: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'PEN',
      value: price,
      items: [{
        item_id: productId,
        item_name: productName,
        item_category: category,
        price: price,
        currency: 'PEN'
      }]
    });
  }
};

// Función para trackear productos agregados al carrito
export const trackAddToCart = (productId: string, productName: string, category: string, price: number, quantity: number = 1) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'PEN',
      value: price * quantity,
      items: [{
        item_id: productId,
        item_name: productName,
        item_category: category,
        price: price,
        quantity: quantity,
        currency: 'PEN'
      }]
    });
  }
};

// Componente principal de Analytics
const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Inicializar Google Analytics
    initializeGA();
  }, []);

  useEffect(() => {
    // Trackear cambio de página
    if (typeof window !== 'undefined' && window.gtag) {
      trackPageView(location.pathname + location.search);
    }
  }, [location]);

  return null; // Este componente no renderiza nada
};

export default Analytics;
