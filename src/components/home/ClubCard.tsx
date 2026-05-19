type CourseCardProps = {
  title: string;
  rating: number;
  location: string;
  price: string;
  image: string;
};

import { motion, Variants } from "framer-motion";
import { ArrowRight, MapPin, Star } from "lucide-react";
import Link from "next/link";

const CourseCard = ({
  title,
  rating,
  location,
  price,
  image,
}: CourseCardProps) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="h-52 w-full overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url('${image}')` }}
        />
      </div>

      <div className="p-5 md:p-6">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-xl font-bold text-[#113f1b] leading-tight">
            {title}
          </h4>

          <div className="flex items-center gap-1 text-gray-700 text-sm font-semibold">
            <Star className="w-3.5 h-3.5 fill-gray-700" />
            <span>{rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium mb-5">
          <MapPin className="w-3.5 h-3.5" />
          <span>{location}</span>
        </div>

        <div className="h-px w-full bg-gray-100 mb-4" />

        <div className="flex justify-between items-center">
          <span className="text-[#113f1b] font-bold text-lg">{price}</span>

          <Link
            href={`/explore-clubs/1`}
            className="flex items-center gap-1 text-[#113f1b] font-bold text-sm hover:underline group/btn"
          >
            Book
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
