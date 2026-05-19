"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ClubData {
  id: number;
  badge?: string;
  badgeType?: "light" | "dark";
  rating: string;
  category: string;
  title: string;
  sessionTitle: string;
  sessionDesc: string;
  nextOpeningLabel: string;
  nextOpeningTime: string;
  image: string;
}

const clubs: ClubData[] = [
  {
    id: 1,
    badge: "MEMBER FAVORITE",
    badgeType: "light",
    rating: "4.9",
    category: "Championship Course",
    title: "The Ocean Whispers Links",
    sessionTitle: "Morning Coastal Tee",
    sessionDesc: "Similar to your play at Pebble Beach",
    nextOpeningLabel: "NEXT OPENING",
    nextOpeningTime: "Tomorrow, 8:15",
    image:
      "https://images.unsplash.com/photo-1679011734667-165e56d79037?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    badge: "NEW FOR ELITE",
    badgeType: "dark",
    rating: "4.7",
    category: "Alpine Series",
    title: "Summit Peak Highlands",
    sessionTitle: "Altitude Training Session",
    sessionDesc: "Perfect for your power-drive style",
    nextOpeningLabel: "NEXT OPENING",
    nextOpeningTime: "Thu, 10:30",
    image:
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    rating: "5.0",
    category: "Forest Reserve",
    title: "Emerald Shadows Grove",
    sessionTitle: "Twilight Strategy Round",
    sessionDesc: "Matches your short-game focus",
    nextOpeningLabel: "NEXT OPENING",
    nextOpeningTime: "Friday, 16:00",
    image:
      "https://images.unsplash.com/photo-1605144884374-ecbb643615f6?q=80&w=692&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const RecomandedClub = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 pb-20 pt-40">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#3A5046] uppercase mb-2 block">
            Curated Selection
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B3D2E]">
            Recommended for You
          </h2>
        </div>
        <Link
          href="/all-feature-club"
          className="flex items-center gap-2 text-[#0B3D2E] font-bold text-sm hover:translate-x-1 transition-transform cursor-pointer"
        >
          Explore All Courses <ArrowRight size={18} />
        </Link>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {clubs.map((club, index) => (
          <motion.div
            key={club.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group cursor-pointer"
          >
            {/* Image Card */}
            <div className="relative aspect-4/5 rounded-[1.5rem] overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
              <Image
                src={club.image}
                alt={club.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

              {/* Badge */}
              {club.badge && (
                <div
                  className={`absolute top-5 left-5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider ${
                    club.badgeType === "dark"
                      ? "bg-[#0B4619] text-white"
                      : "bg-white text-[#0B3D2E]"
                  }`}
                >
                  {club.badge}
                </div>
              )}

              {/* Card Title/Rating Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-1.5 text-xs mb-2 opacity-90">
                  <Star size={12} fill="currentColor" className="text-white" />
                  <span>{club.rating}</span>
                  <span className="opacity-60">•</span>
                  <span>{club.category}</span>
                </div>
                <h3 className="text-xl font-bold leading-tight group-hover:translate-x-1 transition-transform">
                  {club.title}
                </h3>
              </div>
            </div>

            {/* Bottom Info Section */}
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-[#0B3D2E] font-bold text-lg mb-1">
                  {club.sessionTitle}
                </h4>
                <p className="text-[#64748B] text-sm">{club.sessionDesc}</p>
              </div>
              <div className="text-right shrink-0 ml-4">
                <span className="block text-[10px] font-bold text-[#94A3B8] tracking-widest mb-1">
                  {club.nextOpeningLabel}
                </span>
                <span className="text-[#15803D] font-bold text-base whitespace-nowrap">
                  {club.nextOpeningTime}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecomandedClub;
