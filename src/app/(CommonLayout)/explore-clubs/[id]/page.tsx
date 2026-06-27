"use client";

import React, { useState } from "react";
import {
  Star,
  MapPin,
  Calendar,
  Check,
  ChevronRight,
  Lock,
  Trophy,
  Sparkles,
  ShieldCheck,
  Compass,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Mock Data representing the Golf Course Details
const courseData = {
  id: "1",
  name: "The Royal Ridges Estate",
  location: "Orchard Valley, CA",
  rating: 4.9,
  reviewsCount: 248,
  summary:
    "Excellence in every swing. Experience the pinnacle of sporting luxury on our award-winning championship terrain, designed for golfers who appreciate architectural precision and breathtaking valley landscapes.",
  description:
    "Designed originally in 1924 and beautifully revitalized for the modern competitor, The Royal Ridges Estate seamlessly blends traditional design principles with the rugged elevation changes of the orchard foothills. The course is characterized by strategic layouts that reward bold shot-making while offering safe bail-out routes for the conservative player. Meticulously groomed by a dedicated agronomy team, the fairways and greens provide tournament-level playability year-round.",
  stats: {
    yardage: "7,200",
    par: 72,
    slope: 145,
    rating: 74.8,
    holes: 18,
    tees: 5,
    elevation: "180 ft",
    avgTime: "4.5h",
    courseType: "Parkland / Ridge",
    difficulty: "Challenging",
  },
  sellingPoints: [
    {
      title: "Championship Layout",
      description:
        "Masterfully designed routing that tests every club in your bag with fair but demanding hazards.",
      icon: Trophy,
    },
    {
      title: "Scenic Valley Views",
      description:
        "Stunning panoramic backdrops of the Orchard Ridge that offer a majestic and serene atmosphere.",
      icon: Compass,
    },
    {
      title: "Fast A-4 Greens",
      description:
        "Immaculate green surfaces cutting-edge bentgrass rolling true and fast at a Stimpmeter rating of 11.5+.",
      icon: Sparkles,
    },
    {
      title: "Strategic Bunkering",
      description:
        "Over 80 meticulously placed white-sand bunkers that challenge your course management and placement.",
      icon: ShieldCheck,
    },
  ],
  facilities: [
    { name: "350-Yard Driving Range", description: "Grass tees with laser-measured targets and premium practice balls." },
    { name: "15,000 sq ft Putting Green", description: "Expansive green matching the slope and speed of the course." },
    { name: "Dedicated Chipping Area", description: "Practice pitch shots from various lies onto a dedicated green." },
    { name: "Greenside Bunker Practice", description: "Varied sand depths to hone your sand saves before teeing off." },
    { name: "Golf Academy", description: "PGA-certified instructors offering video analysis and private instruction." },
  ],
  signatureHole: {
    number: "14",
    name: "The Chasm",
    par: 4,
    yardage: 445,
    image: "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=1200&q=80",
    notes:
      "A dramatic par-4 requiring a precise tee shot over a deep forested ravine. A conservative play to the left fairway leaves a long iron into a double-tiered green. Playing closer to the ridge on the right gives a shorter wedge entry but risks going into the canyon.",
  },
  gallery: [
    "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1613149817748-eb09859f518e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1561214078-f3247647fc5e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=800&q=80",
  ],
  teeTimes: [
    {
      id: 1,
      time: "07:45 AM",
      session: "MORNING MIST",
      status: "Instant Booking",
      statusType: "instant",
      price: 210,
      available: true,
    },
    {
      id: 2,
      time: "09:15 AM",
      session: "PRIME MORNING",
      status: "Shared Cart Only",
      statusType: "shared",
      price: 245,
      available: true,
    },
    {
      id: 3,
      time: "10:30 AM",
      session: "PRIME MORNING",
      status: "Instant Booking",
      statusType: "instant",
      price: 245,
      available: true,
    },
    {
      id: 4,
      time: "01:30 PM",
      session: "AFTERNOON SESSION",
      status: "Member Only",
      statusType: "member",
      price: 185,
      available: false,
    },
    {
      id: 5,
      time: "03:15 PM",
      session: "TWILIGHT SESSION",
      status: "Instant Booking",
      statusType: "instant",
      price: 140,
      available: true,
    },
  ],
};

export default function ClubDetails() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("2026-06-27");
  const [selectedTimeId, setSelectedTimeId] = useState<number>(1);

  // Scroll to booking helper
  const handleScrollToBooking = () => {
    const section = document.getElementById("booking-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Find selected tee time details
  const activeTeeTime = courseData.teeTimes.find((t) => t.id === selectedTimeId) || courseData.teeTimes[0];

  // Dynamic pricing calculations
  const baseTeeTimePrice = activeTeeTime.price;
  const bookingFee = 9.95;
  const taxes = baseTeeTimePrice * 0.08;
  const totalCost = baseTeeTimePrice + bookingFee + taxes;

  const handleBookNow = () => {
    // Redirect to the reservation page with selected options
    router.push(`/explore-clubs/reserve/${courseData.id}`);
  };

  // Format date display helper
  const formatSelectedDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-[#f8faf9] min-h-screen text-slate-800 font-sans pb-24 lg:pb-12">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative w-full h-[500px] md:h-[650px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2000&auto=format&fit=crop"
            alt={courseData.name}
            fill
            priority
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient overlay to read text easily */}
          <div className="absolute inset-0 bg-linear-to-t from-emerald-950/90 via-emerald-950/45 to-transparent" />
        </div>

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end px-4 md:px-8 max-w-7xl mx-auto pb-12 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
            <div className="lg:col-span-2 text-white">
              {/* Eyebrow / Location */}
              <div className="flex items-center gap-2 mb-4 bg-emerald-950/50 backdrop-blur-md border border-emerald-500/20 w-fit px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{courseData.location}</span>
                <span className="text-emerald-500">•</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-bold">{courseData.rating}</span>
                  <span className="text-white/60">({courseData.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4 drop-shadow-md">
                {courseData.name}
              </h1>

              {/* Description */}
              <p className="text-white/80 text-sm md:text-base max-w-2xl leading-relaxed mb-6">
                {courseData.summary}
              </p>
            </div>

            {/* Quick CTA - Book Tee Time */}
            <div className="flex justify-start lg:justify-end">
              <button
                onClick={handleScrollToBooking}
                className="w-full lg:w-auto flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl text-base shadow-lg shadow-emerald-950/30 active:scale-95 transition-all cursor-pointer"
              >
                Book Tee Time
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK STATS BAR ── */}
      <section className="bg-emerald-950 text-emerald-50 py-6 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-4 gap-x-8 text-center divide-x divide-emerald-800/40">
            <div className="first:divide-none">
              <span className="block text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                {courseData.stats.yardage}
              </span>
              <span className="block text-xs uppercase tracking-widest text-emerald-400 font-semibold mt-1">
                Yardage
              </span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                {courseData.stats.par}
              </span>
              <span className="block text-xs uppercase tracking-widest text-emerald-400 font-semibold mt-1">
                Par Rating
              </span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                {courseData.stats.slope}
              </span>
              <span className="block text-xs uppercase tracking-widest text-emerald-400 font-semibold mt-1">
                Slope Rating
              </span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                {courseData.stats.courseType}
              </span>
              <span className="block text-xs uppercase tracking-widest text-emerald-400 font-semibold mt-1">
                Course Type
              </span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                {courseData.stats.difficulty}
              </span>
              <span className="block text-xs uppercase tracking-widest text-emerald-400 font-semibold mt-1">
                Difficulty
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2-COLUMN MAIN LAYOUT GRID ── */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* LEFT COLUMN: GOLF COURSE DETAILS */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* ── 2. COURSE OVERVIEW ── */}
            <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs">
              <h2 className="text-2xl font-extrabold text-emerald-950 mb-4">
                Course Overview
              </h2>
              <div className="h-1 w-12 bg-emerald-600 rounded-full mb-6" />
              <p className="text-slate-600 text-base leading-relaxed">
                {courseData.description}
              </p>
            </section>

            {/* ── 3. KEY COURSE STATISTICS ── */}
            <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs">
              <h2 className="text-2xl font-extrabold text-emerald-950 mb-4">
                Course Metrics & Specs
              </h2>
              <div className="h-1 w-12 bg-emerald-600 rounded-full mb-6" />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Total Yardage</span>
                  <span className="text-emerald-950 font-extrabold text-xl">{courseData.stats.yardage} yds</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Par</span>
                  <span className="text-emerald-950 font-extrabold text-xl">{courseData.stats.par}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Slope Rating</span>
                  <span className="text-emerald-950 font-extrabold text-xl">{courseData.stats.slope}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Course Rating</span>
                  <span className="text-emerald-950 font-extrabold text-xl">{courseData.stats.rating}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Holes</span>
                  <span className="text-emerald-950 font-extrabold text-xl">{courseData.stats.holes} Holes</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Tee Boxes</span>
                  <span className="text-emerald-950 font-extrabold text-xl">{courseData.stats.tees} Options</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Elevation Delta</span>
                  <span className="text-emerald-950 font-extrabold text-xl">{courseData.stats.elevation}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Avg. Round Time</span>
                  <span className="text-emerald-950 font-extrabold text-xl">{courseData.stats.avgTime}</span>
                </div>
              </div>
            </section>

            {/* ── 4. WHY GOLFERS LOVE THIS COURSE ── */}
            <section className="space-y-6">
              <div className="flex flex-col">
                <h2 className="text-2xl font-extrabold text-emerald-950">
                  Why Golfers Love This Course
                </h2>
                <div className="h-1 w-12 bg-emerald-600 rounded-full mt-2 mb-6" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courseData.sellingPoints.map((point, index) => {
                  const Icon = point.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex gap-4 items-start hover:-translate-y-0.5 transition-transform duration-200"
                    >
                      <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-emerald-950 text-lg mb-1">
                          {point.title}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── 5. PRACTICE & PLAYING FACILITIES ── */}
            <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs">
              <h2 className="text-2xl font-extrabold text-emerald-950 mb-4">
                Practice & Playing Facilities
              </h2>
              <div className="h-1 w-12 bg-emerald-600 rounded-full mb-6" />
              
              <div className="space-y-4">
                {courseData.facilities.map((fac, idx) => (
                  <div key={idx} className="flex gap-3.5 items-start py-3 border-b last:border-0 border-slate-100">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{fac.name}</h4>
                      <p className="text-slate-500 text-sm">{fac.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 7. SIGNATURE HOLE SHOWCASE ── */}
            <section className="bg-emerald-950 text-white rounded-3xl overflow-hidden border border-emerald-800/20 shadow-xl">
              <div className="relative h-[250px] md:h-[350px]">
                <Image
                  src={courseData.signatureHole.image}
                  alt={courseData.signatureHole.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-emerald-950 via-emerald-950/20 to-transparent" />
                
                {/* Float tag */}
                <div className="absolute top-6 left-6 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider">
                  Signature Hole
                </div>
              </div>
              <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div>
                    <span className="text-emerald-400 font-bold text-sm tracking-wide block uppercase">
                      Hole {courseData.signatureHole.number}
                    </span>
                    <h3 className="text-3xl font-extrabold tracking-tight">
                      {courseData.signatureHole.name}
                    </h3>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-emerald-900/60 border border-emerald-800 px-4 py-2 rounded-xl text-center">
                      <span className="block text-xs uppercase tracking-wider text-emerald-400 font-medium">Par</span>
                      <span className="text-lg font-bold">{courseData.signatureHole.par}</span>
                    </div>
                    <div className="bg-emerald-900/60 border border-emerald-800 px-4 py-2 rounded-xl text-center">
                      <span className="block text-xs uppercase tracking-wider text-emerald-400 font-medium">Yardage</span>
                      <span className="text-lg font-bold">{courseData.signatureHole.yardage} yds</span>
                    </div>
                  </div>
                </div>
                <p className="text-emerald-100/85 leading-relaxed text-sm md:text-base">
                  {courseData.signatureHole.notes}
                </p>
              </div>
            </section>

            {/* ── 8. COURSE GALLERY ── */}
            <section className="space-y-6">
              <div className="flex flex-col">
                <h2 className="text-2xl font-extrabold text-emerald-950">
                  Course Gallery
                </h2>
                <div className="h-1 w-12 bg-emerald-600 rounded-full mt-2 mb-6" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {courseData.gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative group h-[160px] md:h-[220px] rounded-2xl overflow-hidden shadow-xs cursor-pointer"
                  >
                    <Image
                      src={img}
                      alt={`Gallery view ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-100 group-hover:bg-black/30 transition-all" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── 10. BOOKING SECTION (STICKY SIDEBAR) ── */}
          <div id="booking-section" className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xl lg:sticky lg:top-8 scroll-mt-6">
              
              {/* Headline */}
              <div className="mb-6">
                <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest block mb-1">
                  Booking Console
                </span>
                <h3 className="text-xl font-extrabold text-emerald-950 flex items-center gap-1.5">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  Select Tee Time
                </h3>
              </div>

              {/* 1. Date Selector (Calendar Input) */}
              <div className="mb-6">
                <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-2.5">
                  1. Choose Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3.5 pl-11 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 accent-emerald-700 bg-white"
                    min="2026-06-27"
                  />
                  <Calendar className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <div className="text-[11px] text-slate-400 font-semibold mt-2.5 text-center">
                  Selected date: <span className="text-emerald-900 font-bold">{formatSelectedDate(selectedDate)}</span>
                </div>
              </div>

              {/* 3. Available Slots */}
              <div className="mb-6">
                <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-2.5">
                  2. Select Tee Time Slot
                </label>
                <div className="space-y-2">
                  {courseData.teeTimes.map((item) => (
                    <button
                      key={item.id}
                      disabled={!item.available}
                      onClick={() => setSelectedTimeId(item.id)}
                      className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                        !item.available
                          ? "bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed opacity-60"
                          : selectedTimeId === item.id
                          ? "bg-emerald-50 border-emerald-600 text-emerald-950 ring-1 ring-emerald-600"
                          : "bg-white border-slate-200 text-slate-700 hover:border-emerald-500"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <span className="font-extrabold text-base leading-none">
                            {item.time}
                          </span>
                          <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 mt-1">
                            {item.session}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="block font-bold text-base">
                            ${item.price}
                          </span>
                          <span className="text-[9px] uppercase tracking-wide block text-slate-400">
                            Green Fee
                          </span>
                        </div>
                        {item.statusType === "member" ? (
                          <div className="p-1 bg-rose-50 border border-rose-100 text-rose-600 rounded-md">
                            <Lock className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className={`w-2.5 h-2.5 rounded-full ${item.statusType === "instant" ? "bg-emerald-400" : "bg-blue-400"}`} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-slate-100 pt-5 space-y-2 mb-6">
                <div className="flex justify-between text-sm font-medium text-slate-500">
                  <span>Tee Time Green Fee</span>
                  <span>${baseTeeTimePrice}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-slate-500">
                  <span>Taxes & Booking Fees</span>
                  <span>${(taxes + bookingFee).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-emerald-950 pt-2 border-t border-dashed border-slate-100">
                  <span>Grand Total</span>
                  <span className="text-emerald-700 text-lg font-black">${totalCost.toFixed(2)}</span>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBookNow}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-base shadow-lg shadow-emerald-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Reserve Tee Time</span>
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-slate-400 text-xs font-semibold">
                <Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={3} />
                <span>Free cancellation up to 24h prior</span>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* ── MOBILE FLOATING ACTION BAR ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 py-3 z-50 flex items-center justify-between shadow-[0_-8px_30px_rgb(0,0,0,0.06)]">
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            {activeTeeTime.time} • Green Fee
          </span>
          <span className="text-xl font-extrabold text-emerald-700 block">
            ${totalCost.toFixed(2)}
          </span>
        </div>
        <button
          onClick={handleScrollToBooking}
          className="bg-emerald-600 text-white font-bold py-2.5 px-6 rounded-lg text-sm shadow-md shadow-emerald-600/15 cursor-pointer"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
