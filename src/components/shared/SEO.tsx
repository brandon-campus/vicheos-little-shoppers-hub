import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({ 
  title = "Bicheos - Productos electrónicos innovadores para bebés",
  description = "Descubre productos electrónicos innovadores para bebés en Bicheos. Especialmente diseñados para mamás primerizas. Envío gratis y garantía de calidad.",
  keywords = "productos para bebés, electrónicos bebés, juguetes bebés, mamás primerizas, cuidado infantil, Bicheos",
  image = "https://bicheos.com/og-image.jpg",
  url = "https://bicheos.com",
  type = "website"
}: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO; 