import Layout from "@/components/layout/Layout";
import SEO from "@/components/shared/SEO";
import CategoryCard from "@/components/shared/CategoryCard";
import { categories } from "@/data/mockData";

const CategoriesPage = () => {
  return (
    <Layout>
      <SEO 
        title="Categorías - Bicheos | Encuentra tu vicheo ideal"
        description="Explora nuestras categorías de productos para bebés. Desde juguetes electrónicos hasta dispositivos de seguridad, encuentra todo lo que necesitas."
        keywords="categorías bebés, juguetes bebés, seguridad infantil, productos electrónicos bebés, Bicheos categorías"
        url="https://bicheos.com/categorias"
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
