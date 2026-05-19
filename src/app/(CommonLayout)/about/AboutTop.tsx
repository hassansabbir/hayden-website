"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { AboutUs } from '@/asset/asset';

const AboutTop = () => {
  return (
    <div className="w-full max-w-[1150px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-16 font-sans">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16 md:mb-24"
      >
        <h1 className="text-4xl sm:text-[44px] font-extrabold text-[#0a4a1b] tracking-tight mb-4">
          About Us
        </h1>
        <p className="text-[#647167] text-[15px] sm:text-[16px] max-w-[450px] leading-relaxed">
          Provide your player information to finalize your request. Our clubhouse concierge will confirm your slot within 15 minutes.
        </p>
      </motion.div>

      {/* Legacy Section */}
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-28 items-center lg:items-start mb-32">
        {/* Left: Image & Badge */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-[420px] shrink-0"
        >
          <img
            src={AboutUs.src}
            alt="Vintage Golf Clubs"
            className="w-full h-[450px] md:h-[520px] object-cover rounded-[10px] shadow-sm"
          />
          {/* Est Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6, type: "spring", bounce: 0.4 }}
            className="absolute -bottom-8 -right-8 md:-bottom-10 md:-right-16 bg-[#e4e7e4] w-[180px] h-[180px] md:w-[210px] md:h-[210px] rounded-xl flex flex-col items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
          >
            <div className="text-[22px] md:text-[26px] font-bold text-[#0a4a1b] mb-1">Est.</div>
            <div className="text-[54px] md:text-[62px] font-black text-[#0a4a1b] leading-none tracking-tight">1992</div>
          </motion.div>
        </motion.div>

        {/* Right: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex-1 pt-12 lg:pt-4"
        >
          <h2 className="text-[28px] sm:text-[32px] font-bold text-[#0a4a1b] tracking-tight mb-6">
            A Legacy Reimagined
          </h2>
          <div className="space-y-6 text-[#647167] text-[14.5px] leading-relaxed">
            <p>
              Founded by visionary architect Julian Thorne, Fairway Elite began as a private retreat in the rolling hills of the Scottish Highlands. Our journey started with a singular focus: to blend the wild beauty of nature with the refined discipline of championship golf.
            </p>
            <p>
              Over three decades, we have expanded into a global network of elite destinations, each curated to provide an unparalleled sensory experience. From the sand-swept dunes of Dubai to the lush valleys of California, our courses remain the gold standard for the modern enthusiast.
            </p>
          </div>

          <div className="h-px bg-gray-200 my-10 w-full"></div>

          <div className="flex gap-20">
            <div>
              <div className="text-[36px] font-bold text-[#0a4a1b] mb-2 leading-none">
                15
              </div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                GLOBAL COURSES
              </div>
            </div>
            <div>
              <div className="text-[36px] font-bold text-[#0a4a1b] mb-2 leading-none">
                2.4k
              </div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                ELITE MEMBERS
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Use of Service Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-16 md:mb-20"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="h-1 w-8 bg-[#0a4a1b] rounded-full"></div>
          <h2 className="text-[28px] font-bold text-[#0a4a1b] tracking-tight">Use of Service</h2>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50/50">
          <p className="text-[#647167] text-[14.5px] leading-relaxed mb-8 max-w-[800px]">
            By accessing Fairway Elite and its facilities, you agree to comply with our code of conduct and service standards. Our services are designed for individuals who value sportsmanship, precision, and mutual respect.
          </p>

          <h3 className="text-[17px] font-bold text-gray-900 mb-4">User Eligibility</h3>
          <p className="text-[#647167] text-[14.5px] leading-relaxed mb-6 max-w-[800px]">
            Users must be at least 18 years of age or accompanied by a legal guardian. Fairway Elite reserves the right to refuse service to anyone at any time for any reason.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-[18px] h-[18px] text-[#10561c] shrink-0 mt-0.5" strokeWidth={2.5} />
              <p className="text-[#647167] text-[14.5px] leading-relaxed">
                Compliance with all local, state, and national golf association rules.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-[18px] h-[18px] text-[#10561c] shrink-0 mt-0.5" strokeWidth={2.5} />
              <p className="text-[#647167] text-[14.5px] leading-relaxed">
                Strict adherence to the dress code: proper golf attire is mandatory at all times on the course and in the clubhouse.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Booking Policies Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="h-1 w-8 bg-[#0a4a1b] rounded-full"></div>
          <h2 className="text-[28px] font-bold text-[#0a4a1b] tracking-tight">Booking Policies</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Reservations Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#0a4a1b]"></div>
            <h3 className="text-[18px] font-bold text-gray-900 mb-5 mt-2">Reservations</h3>
            <p className="text-[#647167] text-[13.5px] leading-relaxed">
              Tee times can be reserved up to 14 days in advance for members and 7 days for guests. All bookings are subject to availability and seasonal adjustments. Fairway Elite reserves the right to modify reserved slots for tournament play or essential maintenance.
            </p>
          </div>

          {/* Cancellations Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#0a4a1b]"></div>
            <h3 className="text-[18px] font-bold text-gray-900 mb-5 mt-2">Cancellations</h3>
            <p className="text-[#647167] text-[13.5px] leading-relaxed">
              Cancellations made less than 24 hours prior to the tee time will incur a 50% service fee. "No-shows" will be charged the full rate of the booking. Weather-related cancellations are at the sole discretion of the Course Superintendent.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutTop;