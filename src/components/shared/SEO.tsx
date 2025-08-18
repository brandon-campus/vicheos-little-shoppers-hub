import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  locale?: string;
  geoRegion?: string;
  geoPlacename?: string;
  geoPosition?: string;
  structuredData?: object;
}

const SEO = ({ 
  title = "Bicheos Perú - Productos para Bebés | Juguetes, Seguridad y Cuidado Infantil",
  description = "Tienda online de productos para bebés en Perú. Orejeras de seguridad, esterilizadores UV, termómetros y más. Envío gratis a todo Perú. Paga con Yape. Productos de calidad para el cuidado de tu bebé.",
  keywords = "productos para bebés Perú, juguetes bebés Lima, orejeras bebés, esterilizador chupones, termómetro bebé, almohadillas lactancia, cuidado infantil Perú, tienda bebés online, envío gratis Perú, pago Yape bebés",
  image = "https://www.bicheos.com/og-image.jpg",
  url = "https://www.bicheos.com",
  type = "website",
  locale = "es_PE",
  geoRegion = "PE",
  geoPlacename = "Lima, Perú",
  geoPosition = "-12.0464;-77.0428",
  structuredData
}: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Geographic Meta Tags */}
      <meta name="geo.region" content={geoRegion} />
      <meta name="geo.placename" content={geoPlacename} />
      <meta name="geo.position" content={geoPosition} />
      <meta name="ICBM" content={geoPosition.replace(';', ', ')} />
      
      {/* Language and Locale */}
      <meta name="language" content="Spanish" />
      <meta property="og:locale" content={locale} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Bicheos Perú" />
      
      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@bicheos" />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO; 