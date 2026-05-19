"use client";

import { motion } from 'framer-motion';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import CourseCard from './ClubCard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const courses = [
  {
    title: "Silver Oak Links",
    rating: 4.8,
    location: "Scottsdale, AZ",
    price: "$120-$210",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
  },
  {
    title: "Highland Dunes",
    rating: 4.6,
    location: "Monterey, CA",
    price: "$150-$300",
    image: "https://images.unsplash.com/photo-1562204320-31975a5e09ce",
  },
  {
    title: "Pine Hollow Reserve",
    rating: 4.9,
    location: "Pinehurst, NC",
    price: "$200-$450",
    image: "https://images.unsplash.com/photo-1592937238247-cd0090e02f65",
  },
];

const FeatureClub = () => {
  const router = useRouter();
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
      // ease: "easeOut"
    },
  };

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

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Top Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">

          {/* Card 1: Large Estate */}
          <motion.div variants={itemVariants} className="md:col-span-7 group relative rounded-2xl overflow-hidden h-[450px] shadow-lg cursor-pointer">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500932334442-8761ee4810a7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a0d]/90 via-[#0a1a0d]/40 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#22c55e] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm">
                  Hot Deal
                </span>
                <div className="flex items-center gap-1 text-white font-medium text-sm">
                  <Star className="w-4 h-4 fill-[#22c55e] text-[#22c55e]" />
                  <span>4.9 (128 reviews)</span>
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
                The Royal Ridges Estate
              </h3>
              <p className="text-white/80 text-sm md:text-base max-w-lg mb-6 leading-snug">
                Championship 18-hole course with panoramic coastal views and world-class amenities.
              </p>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/70 text-xs mb-1">Starting from</p>
                  <p className="text-white font-bold text-2xl md:text-3xl">
                    $240 <span className="text-base font-normal text-white/80">/ tee</span>
                  </p>
                </div>
                <button onClick={() => router.push(`/explore-clubs/1`)} className="bg-white text-[#113f1b] font-bold px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors shadow-md">
                  Details
                </button>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Emerald Valley */}
          <motion.div variants={itemVariants} className="md:col-span-5 group relative rounded-2xl overflow-hidden h-[450px] shadow-lg cursor-pointer">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1591491640784-3232eb748d4b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a0d]/90 via-[#0a1a0d]/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end">
              <div className="flex items-center gap-1 text-white font-medium text-sm mb-3">
                <Star className="w-4 h-4 fill-[#22c55e] text-[#22c55e]" />
                <span>4.7</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-md">
                Emerald Valley Club
              </h3>
              <p className="text-white/80 text-sm md:text-base mb-8 leading-snug max-w-sm">
                Secluded forest-lined fairways for a focused experience.
              </p>

              <div className="flex items-center justify-between">
                <p className="text-white font-bold text-2xl md:text-3xl">
                  $185 <span className="text-base font-normal text-white/80">/ tee</span>
                </p>
                <button onClick={() => router.push(`/explore-clubs/1`)} className="bg-white/15 backdrop-blur-md border border-white/30 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-white/25 transition-all shadow-md">
                  Details
                </button>
              </div>
            </div>
          </motion.div>

        </div>
        {/* Bottom Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FeatureClub;