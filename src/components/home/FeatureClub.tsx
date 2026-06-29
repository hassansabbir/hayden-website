"use client";

import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import CourseCard from './ClubCard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchUrl, getMediaUrl } from "@/lib/fetchUrl";
import { cn } from "@/lib/utils";

interface FeaturedCourse {
  id: string;
  slug: string;
  name: string;
  location: string;
  summary?: string;
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

const formatRatingLabel = (rating: number, reviewsCount: number) =>
  rating > 0 ? `${rating.toFixed(1)} (${reviewsCount} review${reviewsCount === 1 ? "" : "s"})` : "New";

const FeatureClub = () => {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const [first, second, ...rest] = clubs;
  const smallClubs = rest.slice(0, 3);

  return (
    <section className="py-20 px-4 md:px-8 max-w-[1400px] mx-auto w-full font-sans bg-white">
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
            Featured Clubs
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl leading-relaxed">
            Discover hand-picked elite courses curated for the discerning player. <br className="hidden md:block" />
            Precision, privacy, and prestige.
          </p>
        </div>

        <Link href={"all-feature-club"} className="flex items-center gap-1.5 text-[#113f1b] font-bold hover:underline transition-all group pb-1">
          View All Venues
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          <div className="md:col-span-7 h-[450px] rounded-2xl bg-gray-100 animate-pulse" />
          <div className="md:col-span-5 h-[450px] rounded-2xl bg-gray-100 animate-pulse" />
        </div>
      ) : !first ? (
        <p className="text-gray-500 text-center py-16">No featured clubs yet — check back soon.</p>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Top Row Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
            {/* Card 1 */}
            <motion.div
              variants={itemVariants}
              className={cn(
                "group relative rounded-2xl overflow-hidden h-[450px] shadow-lg cursor-pointer",
                second ? "md:col-span-7" : "md:col-span-12"
              )}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${getMediaUrl(first.heroImage?.url) || FALLBACK_IMAGE}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a0d]/90 via-[#0a1a0d]/40 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end">
                <div className="flex items-center gap-1 text-white font-medium text-sm mb-4">
                  <Star className="w-4 h-4 fill-[#22c55e] text-[#22c55e]" />
                  <span>{formatRatingLabel(first.rating, first.reviewsCount)}</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
                  {first.name}
                </h3>
                <p className="text-white/80 text-sm md:text-base max-w-lg mb-6 leading-snug">
                  {first.summary || `Discover ${first.name} in ${first.location}.`}
                </p>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-white/70 text-xs mb-1">Starting from</p>
                    <p className="text-white font-bold text-2xl md:text-3xl">
                      {formatPrice(first.priceRange)}
                    </p>
                  </div>
                  <button
                    onClick={() => router.push(`/explore-clubs/${first.slug}`)}
                    className="bg-white text-[#113f1b] font-bold px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors shadow-md"
                  >
                    Details
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            {second && (
              <motion.div
                variants={itemVariants}
                className="md:col-span-5 group relative rounded-2xl overflow-hidden h-[450px] shadow-lg cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${getMediaUrl(second.heroImage?.url) || FALLBACK_IMAGE}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a0d]/90 via-[#0a1a0d]/30 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end">
                  <div className="flex items-center gap-1 text-white font-medium text-sm mb-3">
                    <Star className="w-4 h-4 fill-[#22c55e] text-[#22c55e]" />
                    <span>{formatRatingLabel(second.rating, second.reviewsCount)}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-md">
                    {second.name}
                  </h3>
                  <p className="text-white/80 text-sm md:text-base mb-8 leading-snug max-w-sm">
                    {second.summary || `Discover ${second.name} in ${second.location}.`}
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="text-white font-bold text-2xl md:text-3xl">
                      {formatPrice(second.priceRange)}
                    </p>
                    <button
                      onClick={() => router.push(`/explore-clubs/${second.slug}`)}
                      className="bg-white/15 backdrop-blur-md border border-white/30 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-white/25 transition-all shadow-md"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Row Grid */}
          {smallClubs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {smallClubs.map((club) => (
                <CourseCard
                  key={club.id}
                  title={club.name}
                  rating={club.rating}
                  location={club.location}
                  price={formatPrice(club.priceRange)}
                  image={getMediaUrl(club.heroImage?.url) || FALLBACK_IMAGE}
                  slug={club.slug}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </section>
  );
};

export default FeatureClub;
