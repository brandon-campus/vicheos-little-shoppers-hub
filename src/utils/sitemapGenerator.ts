import { supabase } from "@/lib/supabaseClient";

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const generateSitemap = async (): Promise<SitemapUrl[]> => {
  const baseUrl = 'https://www.bicheos.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // URLs estáticas
  const staticUrls: SitemapUrl[] = [
    {
      loc: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: `${baseUrl}/productos`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/categorias`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/contacto`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6
    },
    {
      loc: `${baseUrl}/libro-reclamaciones`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.4
    }
  ];

  try {
    // Obtener productos de la base de datos
    const { data: products, error } = await supabase
      .from('productos')
      .select('id, name, updated_at')
      .eq('active', true);

    if (error) {
      console.error('Error fetching products for sitemap:', error);
      return staticUrls;
    }

    // URLs de productos
    const productUrls: SitemapUrl[] = products.map(product => ({
      loc: `${baseUrl}/producto/${product.id}`,
      lastmod: product.updated_at ? new Date(product.updated_at).toISOString().split('T')[0] : currentDate,
      changefreq: 'monthly' as const,
      priority: 0.7
    }));

    return [...staticUrls, ...productUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticUrls;
  }
};

export const generateSitemapXML = async (): Promise<string> => {
  const urls = await generateSitemap();
  
  const xmlUrls = urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlUrls}
</urlset>`;
};
