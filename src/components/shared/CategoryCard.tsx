
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export interface CategoryProps {
  id: number;
  name: string;
  image: string;
  productCount: number;
}

const CategoryCard = ({ id, name, image, productCount }: CategoryProps) => {
  return (
    <Link
      to={`/productos?categoria=${id}`}
      className="group block bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover-scale"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent flex items-end">
          <div className="p-4 w-full">
            <h3 className="text-white font-medium text-lg">{name}</h3>
            <Badge variant="outline" className="mt-1 bg-white/20 text-white border-none">
              {productCount} productos
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
