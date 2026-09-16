"use client";

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import CourseCard from './ClubCard';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { fetchUrl, getMediaUrl } from "@/lib/fetchUrl";

interface FeaturedCourse {
  _id: string;
  slug: string;
  name: string;
  location: string;
  rating: number;
  reviewsCount: number;
  heroImage?: { url: string } | null;
  priceRange?: { min: number; max: number };
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9";

const formatPrice = (priceRange?: { min: number; max: number }) => {
  if (!priceRange || (!priceRange.min && !priceRange.max)) return "Contact for pricing";
  if (!priceRange.max || priceRange.min === priceRange.max) return `$${priceRange.min}`;
  return `$${priceRange.min}-$${priceRange.max}`;
};

const AllFeatureClub = () => {
  const router = useRouter();
  const [clubs, setClubs] = useState<FeaturedCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUrl("/courses/featured")
      .then((res) => setClubs(res.data || []))
      .catch(() => setClubs([]))
      .finally(() => setIsLoading(false));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section className="py-20 px-4 md:px-8 max-w-350 mx-auto w-full font-sans bg-white">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
      >
        <div>
          <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-2">
            Exclusive Destinations
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#113f1b] tracking-tight mb-3">
            All Featured Clubs
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl leading-relaxed">
            Discover hand-picked elite courses curated for the discerning player. <br className="hidden md:block" />
            Precision, privacy, and prestige.
          </p>
        </div>

        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1.5 text-[#113f1b] font-bold hover:underline transition-all group pb-1">
          <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          Back to Home
        </button>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Bottom Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-1 md:col-span-3 text-center py-10 text-gray-400">Loading clubs...</div>
          ) : clubs.length === 0 ? (
            <div className="col-span-1 md:col-span-3 text-center py-10 text-gray-400">No featured clubs found.</div>
          ) : (
            clubs.map((club) => (
              <CourseCard
                key={club._id}
                title={club.name}
                rating={club.rating}
                location={club.location}
                price={formatPrice(club.priceRange)}
                image={club.heroImage?.url ? getMediaUrl(club.heroImage.url) : FALLBACK_IMAGE}
              />
            ))
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default AllFeatureClub;