"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  UtensilsCrossed,
  Leaf,
  ConciergeBell,
} from "lucide-react";
import Image from "next/image";

const Architecture = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.1 }
  };

  return (
    <section className="bg-[#f7f8f6] py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">

        {/* Top Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">

          {/* Left: Image & Overlay */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-square relative rounded-lg overflow-hidden bg-[#0c1a14] flex items-center justify-center shadow-2xl">
              {/* Abstract Golf Tee Graphic/Icon */}
              <div className="relative w-48 h-48 flex items-center justify-center">
                <div className="absolute inset-0 bg-cyan-400/20 blur-[80px] rounded-full" />
                <svg
                  viewBox="0 0 100 100"
                  className="w-32 h-32 text-cyan-300 drop-shadow-[0_0_15px_rgba(103,232,249,0.5)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M50 20 L50 80 M30 30 C30 30 40 25 50 25 C60 25 70 30 70 30 M35 45 C35 45 42 40 50 40 C58 40 65 45 65 45 M40 60 L60 60 L55 75 L45 75 Z" />
                  <circle cx="50" cy="15" r="5" />
                </svg>
              </div>
            </div>

            {/* Yardage Badge Overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-6 -right-4 lg:-right-10 bg-[#0a3d0a] text-white p-8 md:p-10 rounded-lg shadow-xl max-w-[200px] md:max-w-[240px]"
            >
              <div className="text-[42px] md:text-[52px] font-bold leading-none mb-2">7,200</div>
              <div className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] opacity-80 leading-tight">
                Total Yardage From The Championship Tees
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <motion.span
              variants={fadeIn}
              className="text-[11px] font-bold tracking-[0.25em] text-[#0a4a1b] uppercase mb-6"
            >
              Legacy & Terrain
            </motion.span>

            <motion.h2
              variants={fadeIn}
              className="text-[36px] md:text-[48px] lg:text-[56px] font-bold text-[#0a4a1b] leading-[1.1] mb-8"
            >
              Architectural Precision Meets Natural Splendor.
            </motion.h2>

            <div className="space-y-6 text-[#4a554d] text-[15px] md:text-[16px] leading-relaxed mb-12">
              <motion.p variants={fadeIn}>
                Designed in 1924 and revitalized for the modern athlete, The Royal Ridges Estate seamlessly blends traditional course architecture with the rugged beauty of the valley's natural elevation changes.
              </motion.p>
              <motion.p variants={fadeIn}>
                Our course is famous for the "Gorge Run"—a three-hole stretch carved into the side of the ridge that requires nerves of steel and absolute precision. Here, every swing tells a story of heritage and ambition.
              </motion.p>
            </div>

            <motion.div variants={fadeIn} className="h-px bg-gray-300 w-full mb-10" />

            <motion.div variants={fadeIn} className="grid grid-cols-3 gap-4 md:gap-8">
              <div>
                <div className="text-[24px] md:text-[32px] font-bold text-[#0a4a1b] mb-1">72</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">
                  Par Rating
                </div>
              </div>
              <div>
                <div className="text-[24px] md:text-[32px] font-bold text-[#0a4a1b] mb-1">145</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">
                  Slope Rating
                </div>
              </div>
              <div>
                <div className="text-[24px] md:text-[32px] font-bold text-[#0a4a1b] mb-1 text-nowrap">A-4</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">
                  Bentgrass Type
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto lg:h-[600px]">

          {/* 18-Hole Pro Course Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 bg-white p-10 md:p-14 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col justify-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#f0f4f0] flex items-center justify-center mb-8">
              <Trophy className="w-6 h-6 text-[#0a4a1b]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#0a4a1b] mb-6">18-Hole Pro Course</h3>
            <p className="text-[#647167] text-[15px] leading-relaxed">
              Meticulously maintained bentgrass greens and white sand bunkers designed by legends.
            </p>
          </motion.div>

          {/* Right Bento Grid */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Michelin Dining */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#e9eee9] p-8 rounded-2xl"
            >
              <UtensilsCrossed className="w-6 h-6 text-[#0a4a1b] mb-6" />
              <h4 className="text-[18px] font-bold text-[#0a4a1b] mb-2">Michelin Dining</h4>
              <p className="text-[#647167] text-[13px] leading-relaxed max-w-[150px]">
                Farm-to-table excellence at The Ridges Grill.
              </p>
            </motion.div>

            {/* Elite Wellness Spa */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#e9eee9] p-8 rounded-2xl"
            >
              <Leaf className="w-6 h-6 text-[#0a4a1b] mb-6" />
              <h4 className="text-[18px] font-bold text-[#0a4a1b] mb-2">Elite Wellness Spa</h4>
              <p className="text-[#647167] text-[13px] leading-relaxed max-w-[150px]">
                Recovery and rejuvenation after your round.
              </p>
            </motion.div>

            {/* Pro-Shop Concierge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#e9eee9] p-8 rounded-2xl"
            >
              <ConciergeBell className="w-6 h-6 text-[#0a4a1b] mb-6" />
              <h4 className="text-[18px] font-bold text-[#0a4a1b] mb-2">Pro-Shop Concierge</h4>
              <p className="text-[#647167] text-[13px] leading-relaxed max-w-[150px]">
                Seamless equipment handling and caddy services.
              </p>
            </motion.div>

            {/* Clubhouse Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative rounded-2xl overflow-hidden min-h-[200px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Clubhouse interior"
                fill
                className="absolute inset-0 w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Architecture;
