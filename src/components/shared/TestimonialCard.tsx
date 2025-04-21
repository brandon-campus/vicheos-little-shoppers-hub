
import { Star } from "lucide-react";

export interface TestimonialProps {
  name: string;
  image: string;
  comment: string;
  rating: number;
  date: string;
}

const TestimonialCard = ({
  name,
  image,
  comment,
  rating,
  date,
}: TestimonialProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm animate-fade-in hover:shadow-md transition-shadow">
      <div className="flex items-center mb-4">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-medium text-gray-800">{name}</h4>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>

      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${
              i < rating
                ? "text-[#FEC6A1] fill-[#FEC6A1]"
                : "text-gray-300 fill-gray-300"
            }`}
          />
        ))}
      </div>

      <p className="text-gray-700">{comment}</p>
    </div>
  );
};

export default TestimonialCard;
