"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Trophy, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero2 = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        // ease: "easeOut",
      },
      // ease: "easeInOut",
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.8,
        // ease: "easeOut",
      },
      // ease: "easeInOut",
    }),
  };

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-end bg-slate-50">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070&auto=format&fit=crop"
          alt="Golf Course at Sunset"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-black/10" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20 pb-32 md:pb-48">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <motion.span
            variants={itemVariants}
            className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#0B3D2E] uppercase mb-4 block"
          >
            Elite Member Access
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-[#0B3D2E] leading-[1.1] tracking-tight mb-6"
          >
            Welcome back, <br />
            Alexander.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-[#3A5046] font-medium leading-relaxed mb-10 max-w-lg"
          >
            The morning dew is still on the 14th green. Your preferred 7:30 AM
            slot is available at the North Course.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-[#0B4619] text-white rounded-xl font-bold text-sm md:text-base hover:bg-[#083512] transition-colors duration-300 shadow-lg shadow-green-900/20 cursor-pointer">
              Reserve 7:30 AM Slot
            </button>
            <button className="px-8 py-4 bg-[#F1F5F0] text-[#0B3D2E] rounded-xl font-bold text-sm md:text-base hover:bg-[#E8EDE6] transition-colors duration-300 shadow-sm cursor-pointer border border-white/50">
              View Schedule
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Cards Section */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 -mb-20 md:-mb-24 lg:-mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col relative group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="absolute top-8 right-8 text-[#CBD5E1] group-hover:text-[#0B3D2E] transition-colors">
              <ArrowUpRight size={24} />
            </div>
            <div className="w-12 h-12 bg-[#E7F3EF] rounded-lg flex items-center justify-center mb-10">
              <Calendar className="text-[#15803D]" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-[#0B3D2E] mb-3 leading-tight">
              Book Next <br />
              Tee Time
            </h3>
            <p className="text-[#64748B] text-sm md:text-base leading-relaxed">
              Personalized availability based on your handicap and preferences.
            </p>
          </motion.div>

          {/* Card 2 */}
         <Link href="/my-bookings">
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col relative group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="w-12 h-12 bg-[#F1F5F9] rounded-lg flex items-center justify-center mb-10">
              <Trophy className="text-[#64748B]" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-[#0B3D2E] mb-3 leading-tight">
              View Upcoming <br />
              Bookings
            </h3>
            <p className="text-[#64748B] text-sm md:text-base leading-relaxed">
              3 events matching your skill level this month.
            </p>
          </motion.div></Link>

        </div>
      </div>
    </section>
  );
};

export default Hero2;
