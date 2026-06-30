"use client";

import React, { use, useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchUrl, getMediaUrl } from "@/lib/fetchUrl";
import { cn } from "@/lib/utils";

interface CourseType {
  _id: string;
  name: string;
  slug: string;
  location: string;
  rating: number;
  reviewsCount: number;
  summary: string;
  description: string;
  heroImage?: { url: string } | null;
  priceRange?: { min: number; max: number };
  stats?: {
    yardage?: string;
    par?: number;
    slope?: number;
    rating?: number;
    holes?: number;
    tees?: number;
    elevation?: string;
    avgTime?: string;
    courseType?: string;
    difficulty?: string;
  };
  sellingPoints?: { title: string; description: string }[];
  facilities?: { name: string; description: string }[];
  signatureHole?: {
    number?: string;
    name?: string;
    par?: number;
    yardage?: number;
    notes?: string;
    image?: { url: string } | null;
  };
  gallery?: { url: string }[];
  holeVideos?: { holeNumber: number; url: string }[];
}

interface TeeTimeType {
  _id: string;
  startTime: string;
  endTime: string;
  session: string;
  bookingType: string;
  price: number;
  capacity: number;
  bookedCount: number;
  status: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

const SELLING_POINT_ICONS = [Trophy, Compass, Sparkles, ShieldCheck];
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1200&auto=format&fit=crop";

const getVideoEmbed = (url: string): { type: "iframe" | "video"; src: string } => {
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return { type: "iframe", src: `https://www.youtube.com/embed/${ytMatch[1]}` };

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return { type: "iframe", src: `https://player.vimeo.com/video/${vimeoMatch[1]}` };

  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url)) return { type: "video", src: url };

  return { type: "iframe", src: url };
};

export default function ClubDetails({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const slug = resolvedParams.id;

  const [course, setCourse] = useState<CourseType | null>(null);
  const [teeTimes, setTeeTimes] = useState<TeeTimeType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const getTodayDateStr = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [selectedDate, setSelectedDate] = useState(getTodayDateStr());
  const [selectedTimeId, setSelectedTimeId] = useState<string | null>(null);
  const [loadingTeeTimes, setLoadingTeeTimes] = useState(false);

  // Fetch Course details on mount
  useEffect(() => {
    const fetchCourseDetails = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const res = await fetchUrl(`/courses/${slug}`);
        setCourse(res.data);
      } catch (err: any) {
        setLoadError(err.message || "Failed to load course details.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourseDetails();
  }, [slug]);

  // Fetch available tee times when date changes
  useEffect(() => {
    const fetchAvailableTeeTimes = async () => {
      setLoadingTeeTimes(true);
      try {
        const res = await fetchUrl(`/courses/${slug}/tee-times?date=${selectedDate}`);
        setTeeTimes(res.data || []);
      } catch (err) {
        console.error("Failed to load tee times:", err);
      } finally {
        setLoadingTeeTimes(false);
      }
    };
    if (slug && selectedDate) {
      fetchAvailableTeeTimes();
    }
  }, [slug, selectedDate]);

  // Set default selected time when list changes
  useEffect(() => {
    if (teeTimes.length > 0) {
      setSelectedTimeId(teeTimes[0]._id);
    } else {
      setSelectedTimeId(null);
    }
  }, [teeTimes]);

  // Scroll to booking helper
  const handleScrollToBooking = () => {
    const section = document.getElementById("booking-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const activeTeeTime = teeTimes.find((t) => t._id === selectedTimeId);

  // Dynamic pricing calculations
  const baseTeeTimePrice = activeTeeTime ? activeTeeTime.price : 0;
  const bookingFee = activeTeeTime ? 9.95 : 0;
  const taxes = baseTeeTimePrice * 0.08;
  const totalCost = baseTeeTimePrice + bookingFee + taxes;

  const handleBookNow = () => {
    if (activeTeeTime && course) {
      router.push(`/explore-clubs/reserve/${course.slug}?date=${selectedDate}&slot=${activeTeeTime._id}`);
    }
  };

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

  const formatTimeStr = (time24: string) => {
    if (!time24) return "";
    const [hoursStr, minutesStr] = time24.split(":");
    const hours = parseInt(hoursStr, 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const formattedHours = displayHours < 10 ? `0${displayHours}` : displayHours;
    return `${formattedHours}:${minutesStr} ${ampm}`;
  };

  const formatSession = (sess: string) => {
    if (!sess) return "";
    return sess.replace("_", " ");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8faf9] flex flex-col items-center justify-center py-20 text-slate-500">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-700 mb-2" />
        <span className="font-semibold text-sm">Loading course details...</span>
      </div>
    );
  }

  if (loadError || !course) {
    return (
      <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center py-20 text-red-500 font-medium">
        {loadError || "Course not found"}
      </div>
    );
  }

  const galleryImages = (course.gallery || []).map((item: any) => {
    if (typeof item === 'string') return item;
    return item?.url || "";
  }).filter(Boolean);

  return (
    <div className="bg-[#f8faf9] min-h-screen text-slate-800 font-sans pb-24 lg:pb-12">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative w-full h-[500px] md:h-[650px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={getMediaUrl(course.heroImage?.url) || FALLBACK_IMAGE}
            alt={course.name}
            fill
            priority
            sizes="100vw"
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient overlay to read text easily */}
          <div className="absolute inset-0 bg-linear-to-t from-[#092e14]/90 via-[#092e14]/45 to-transparent" />
        </div>

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end px-4 md:px-8 max-w-7xl mx-auto pb-12 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
            <div className="lg:col-span-2 text-white">
              {/* Eyebrow / Location */}
              <div className="flex items-center gap-2 mb-4 bg-emerald-950/50 backdrop-blur-md border border-emerald-500/20 w-fit px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{course.location}</span>
                <span className="text-emerald-500">•</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-bold">{(course.rating || 0).toFixed(1)}</span>
                  <span className="text-white/60">({course.reviewsCount || 0} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4 drop-shadow-md">
                {course.name}
              </h1>

              {/* Description */}
              <p className="text-white/80 text-sm md:text-base max-w-2xl leading-relaxed mb-6">
                {course.summary}
              </p>
            </div>

            {/* Quick CTA - Book Tee Time */}
            <div className="flex justify-start lg:justify-end">
              <button
                onClick={handleScrollToBooking}
                className="w-full lg:w-auto flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl text-base shadow-lg shadow-emerald-950/30 active:scale-95 transition-all cursor-pointer border-none outline-none"
              >
                Book Tee Time
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK STATS BAR ── */}
      <section className="bg-[#092e14] text-emerald-50 py-6 border-b border-[#0f4d1e]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-4 gap-x-8 text-center divide-x divide-emerald-800/40">
            <div className="first:divide-none">
              <span className="block text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                {course.stats?.yardage || "—"}
              </span>
              <span className="block text-xs uppercase tracking-widest text-emerald-400 font-semibold mt-1">
                Yardage
              </span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                {course.stats?.par || "—"}
              </span>
              <span className="block text-xs uppercase tracking-widest text-emerald-400 font-semibold mt-1">
                Par Rating
              </span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                {course.stats?.slope || "—"}
              </span>
              <span className="block text-xs uppercase tracking-widest text-emerald-400 font-semibold mt-1">
                Slope Rating
              </span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-extrabold tracking-tight text-white capitalize">
                {course.stats?.courseType || "—"}
              </span>
              <span className="block text-xs uppercase tracking-widest text-emerald-400 font-semibold mt-1">
                Course Type
              </span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-extrabold tracking-tight text-white capitalize">
                {course.stats?.difficulty || "—"}
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
              <p className="text-slate-600 text-base leading-relaxed whitespace-pre-line">
                {course.description}
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
                  <span className="text-emerald-950 font-extrabold text-xl">{course.stats?.yardage || "—"} yds</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Par</span>
                  <span className="text-emerald-950 font-extrabold text-xl">{course.stats?.par || "—"}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Slope Rating</span>
                  <span className="text-emerald-950 font-extrabold text-xl">{course.stats?.slope || "—"}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Course Rating</span>
                  <span className="text-emerald-950 font-extrabold text-xl">{course.stats?.rating || "—"}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Holes</span>
                  <span className="text-emerald-950 font-extrabold text-xl">{course.stats?.holes || "—"} Holes</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Tee Boxes</span>
                  <span className="text-emerald-950 font-extrabold text-xl">{course.stats?.tees || "—"} Options</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Elevation Delta</span>
                  <span className="text-emerald-950 font-extrabold text-xl">{course.stats?.elevation || "—"}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Avg. Round Time</span>
                  <span className="text-emerald-950 font-extrabold text-xl">{course.stats?.avgTime || "—"}</span>
                </div>
              </div>
            </section>

            {/* ── 4. WHY GOLFERS LOVE THIS COURSE ── */}
            {course.sellingPoints && course.sellingPoints.length > 0 && (
              <section className="space-y-6">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-extrabold text-emerald-950">
                    Why Golfers Love This Course
                  </h2>
                  <div className="h-1 w-12 bg-emerald-600 rounded-full mt-2 mb-6" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {course.sellingPoints.map((point, index) => {
                    const Icon = SELLING_POINT_ICONS[index % SELLING_POINT_ICONS.length];
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
            )}

            {/* ── 5. PRACTICE & PLAYING FACILITIES ── */}
            {course.facilities && course.facilities.length > 0 && (
              <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs">
                <h2 className="text-2xl font-extrabold text-emerald-950 mb-4">
                  Practice & Playing Facilities
                </h2>
                <div className="h-1 w-12 bg-emerald-600 rounded-full mb-6" />
                
                <div className="space-y-4">
                  {course.facilities.map((fac, idx) => (
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
            )}

            {/* ── 7. SIGNATURE HOLE SHOWCASE ── */}
            {course.signatureHole && (
              <section className="bg-emerald-950 text-white rounded-3xl overflow-hidden border border-emerald-800/20 shadow-xl">
                <div className="relative h-[250px] md:h-[350px]">
                  <Image
                    src={getMediaUrl(course.signatureHole.image?.url) || FALLBACK_IMAGE}
                    alt={course.signatureHole.name || "Signature Hole"}
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    unoptimized
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
                        Hole {course.signatureHole.number || "—"}
                      </span>
                      <h3 className="text-3xl font-extrabold tracking-tight">
                        {course.signatureHole.name || "—"}
                      </h3>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-[#0b3815] border border-emerald-800 px-4 py-2 rounded-xl text-center">
                        <span className="block text-xs uppercase tracking-wider text-emerald-400 font-medium">Par</span>
                        <span className="text-lg font-bold">{course.signatureHole.par || "—"}</span>
                      </div>
                      <div className="bg-[#0b3815] border border-emerald-800 px-4 py-2 rounded-xl text-center">
                        <span className="block text-xs uppercase tracking-wider text-emerald-400 font-medium">Yardage</span>
                        <span className="text-lg font-bold">{course.signatureHole.yardage || "—"} yds</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-emerald-100/85 leading-relaxed text-sm md:text-base whitespace-pre-line">
                    {course.signatureHole.notes}
                  </p>
                </div>
              </section>
            )}

            {/* ── 8. COURSE GALLERY ── */}
            {galleryImages.length > 0 && (
              <section className="space-y-6">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-extrabold text-emerald-950">
                    Course Gallery
                  </h2>
                  <div className="h-1 w-12 bg-emerald-600 rounded-full mt-2 mb-6" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {galleryImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative group h-[160px] md:h-[220px] rounded-2xl overflow-hidden shadow-xs cursor-pointer bg-slate-100"
                    >
                      <Image
                        src={getMediaUrl(img)}
                        alt={`Gallery view ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        unoptimized
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-100 group-hover:bg-black/30 transition-all" />
                    </div>
                  ))}
                </div>
              </section>
            )}
            {/* ── 9. COURSE HOLE VIDEOS ── */}
            {course.holeVideos && course.holeVideos.length > 0 && (
              <section className="space-y-6">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-extrabold text-emerald-950">
                    Course Hole Videos
                  </h2>
                  <div className="h-1 w-12 bg-emerald-600 rounded-full mt-2 mb-2" />
                  <p className="text-slate-500 text-sm">
                    Virtual walkthroughs of each hole — watch before you play.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[...course.holeVideos]
                    .sort((a, b) => a.holeNumber - b.holeNumber)
                    .map((hole) => {
                      const embed = getVideoEmbed(hole.url);
                      return (
                        <div
                          key={hole.holeNumber}
                          className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden"
                        >
                          <div className="relative aspect-video bg-slate-100">
                            {embed.type === "video" ? (
                              <video
                                src={embed.src}
                                controls
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <iframe
                                src={embed.src}
                                title={`Hole ${hole.holeNumber} video`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full border-0"
                              />
                            )}
                          </div>
                          <div className="px-4 py-3 flex items-center gap-2">
                            <span className="inline-block text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100 uppercase tracking-wider">
                              Hole #{hole.holeNumber}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </section>
            )}

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
                
                {loadingTeeTimes ? (
                  <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin text-emerald-600 mb-1" />
                    <span className="text-xs">Fetching slots...</span>
                  </div>
                ) : teeTimes.length === 0 ? (
                  <div className="text-center py-8 px-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs leading-relaxed">
                    No tee times available for this date.<br />Please choose another date.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                    {teeTimes.map((item) => {
                      const isAvailable = item.bookedCount < item.capacity;
                      const isSelected = selectedTimeId === item._id;
                      return (
                        <button
                          key={item._id}
                          disabled={!isAvailable}
                          onClick={() => setSelectedTimeId(item._id)}
                          className={cn(
                            "w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer border-solid",
                            !isAvailable
                              ? "bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed opacity-60"
                              : isSelected
                              ? "bg-emerald-50 border-emerald-600 text-emerald-950 ring-1 ring-emerald-600"
                              : "bg-white border-slate-200 text-slate-700 hover:border-emerald-500"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <span className="font-extrabold text-base leading-none">
                                {formatTimeStr(item.startTime)}
                              </span>
                              <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 mt-1">
                                {formatSession(item.session)}
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
                            {item.bookingType === "REQUEST" ? (
                              <div className="p-1 bg-rose-50 border border-rose-100 text-rose-600 rounded-md">
                                <Lock className="w-3.5 h-3.5" />
                              </div>
                            ) : (
                              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              {activeTeeTime && (
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
              )}

              {/* Book Button */}
              <button
                onClick={handleBookNow}
                disabled={!activeTeeTime}
                className={cn(
                  "w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-base shadow-lg shadow-emerald-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer border-none outline-none active:scale-[0.98]",
                  !activeTeeTime && "opacity-50 cursor-not-allowed"
                )}
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
      {activeTeeTime && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 py-3 z-50 flex items-center justify-between shadow-[0_-8px_30px_rgb(0,0,0,0.06)]">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              {formatTimeStr(activeTeeTime.startTime)} • Green Fee
            </span>
            <span className="text-xl font-extrabold text-emerald-700 block">
              ${totalCost.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleScrollToBooking}
            className="bg-emerald-600 text-white font-bold py-2.5 px-6 rounded-lg text-sm shadow-md shadow-emerald-600/15 cursor-pointer border-none outline-none"
          >
            Book Now
          </button>
        </div>
      )}
    </div>
  );
}
