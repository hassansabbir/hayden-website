"use client";

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import CourseCard from './ClubCard';
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
  {
    title: "Emerald Greens Club",
    rating: 4.7,
    location: "Orlando, FL",
    price: "$130-$260",
    image: "https://images.unsplash.com/photo-1530028828-25e8270793c5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Sunset Valley Course",
    rating: 4.5,
    location: "Austin, TX",
    price: "$110-$220",
    image: "https://images.unsplash.com/photo-1508780709619-79562169bc64",
  },
  {
    title: "Crystal Lake Greens",
    rating: 4.8,
    location: "Lake Tahoe, CA",
    price: "$180-$350",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    title: "Golden Ridge Links",
    rating: 4.6,
    location: "Denver, CO",
    price: "$140-$280",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  },
  {
    title: "Willow Creek Estate",
    rating: 4.7,
    location: "Nashville, TN",
    price: "$160-$300",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  },
  {
    title: "Ocean Breeze Course",
    rating: 4.9,
    location: "San Diego, CA",
    price: "$220-$400",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
];

const AllFeatureClub = () => {
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
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AllFeatureClub;