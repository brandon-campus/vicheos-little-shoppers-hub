
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/shared/ProductCard";
import { products } from "@/data/mockData";

const OffersPage = () => {
  // Filter only products with offers
  const offerProducts = products.filter(product => product.isOffer);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-3">Ofertas Especiales</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Aprovecha estas ofertas por tiempo limitado en nuestros productos electrónicos para bebés.
        </p>
        
        {offerProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerProducts.map((product) => (
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
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <h3 className="text-xl font-medium text-gray-800 mb-2">No hay ofertas disponibles</h3>
            <p className="text-gray-600">
              En este momento no hay ofertas activas. ¡Vuelve pronto para encontrar descuentos especiales!
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OffersPage;
