import Layout from "@/components/layout/Layout";
import SEO from "@/components/shared/SEO";
import CategoryCard from "@/components/shared/CategoryCard";
import { categories } from "@/data/mockData";

const CategoriesPage = () => {
  return (
    <Layout>
      <SEO 
        title="Categorías de Productos para Bebés Perú | Seguridad, Alimentación, Cuidado - Bicheos"
        description="Explora nuestras categorías de productos para bebés en Perú. Seguridad y protección, alimentación y lactancia, cuidados e higiene, paseo y viajes. Envío gratis a todo Perú."
        keywords="categorías bebés Perú, seguridad bebés, alimentación lactancia, cuidado higiene bebé, paseo viajes bebé, productos bebés Lima, tienda bebés online Perú"
        url="https://www.bicheos.com/categorias"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Categorías de Productos para Bebés",
          "description": "Categorías de productos para bebés en Perú",
          "url": "https://www.bicheos.com/categorias",
          "numberOfItems": categories.length,
          "itemListElement": categories.map((category, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Category",
              "name": category.name,
              "description": `Productos de ${category.name} para bebés`,
              "url": `https://www.bicheos.com/productos?categoria=${category.id}`
            }
          }))
        }}
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-3">Categorías</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Explora nuestra selección de productos electrónicos para bebés organizados por categorías para encontrar exactamente lo que necesitas.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              image={category.image}
              productCount={category.productCount}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
