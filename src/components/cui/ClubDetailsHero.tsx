"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const ClubDetailsHero = () => {
  return (
    <section className="relative w-full h-[480px] sm:h-[540px] md:h-[880px] overflow-hidden">
      {/* ── Background image with Ken-Burns zoom-out ── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2000&auto=format&fit=crop"
          alt="The Royal Ridges Estate golf course"
          fill
          className="w-full h-full object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Very light mid-tone overlay — matches screenshot (sky stays vivid) */}
        <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/20 to-black/50" />
      </motion.div>

      {/* ── Centred content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-8">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35 }}
          className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#6ee89a] mb-5 drop-shadow"
        >
          Est. 1924&nbsp;&nbsp;•&nbsp;&nbsp;Signature Championship Course
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[54px] sm:text-[68px] md:text-[82px] font-extrabold text-white
                     leading-[1.04] tracking-[-0.5px] max-w-[900px] mb-6 drop-shadow-md"
        >
          The Royal Ridges Estate
        </motion.h1>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.68 }}
          className="text-white/80 text-[15px] sm:text-[17px] leading-relaxed max-w-[500px] mb-10"
        >
          Excellence in every swing. Experience the pinnacle of sporting luxury
          on our award-winning championship terrain.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.84 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Primary */}
          <motion.button
            whileHover={{ scale: 1.035 }}
            whileTap={{ scale: 0.965 }}
            className="flex items-center gap-2.5 bg-[#10561c] text-white font-bold
                       px-8 py-[15px] rounded-[10px] text-[15px]
                       shadow-[0_4px_20px_rgba(16,86,28,0.5)]"
          >
            Explore Tee Times
            <ArrowRight className="w-[17px] h-[17px]" strokeWidth={2.5} />
          </motion.button>

          {/* Secondary — ghost / glassmorphism */}
          <motion.button
            whileHover={{
              scale: 1.035,
              backgroundColor: "rgba(255,255,255,0.14)",
            }}
            whileTap={{ scale: 0.965 }}
            className="flex flex-col items-center justify-center
                       bg-white/8 border border-white/30 backdrop-blur-sm
                       text-white font-semibold px-10 py-[11px]
                       rounded-[10px] text-[14px] leading-snug"
          >
            <span>Hole by Hole</span>
            <span>Drone Footage</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ClubDetailsHero;
