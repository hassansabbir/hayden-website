"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  Users,
  Star,
  ArrowRight,
  Check,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { fetchUrl, getMediaUrl } from "@/lib/fetchUrl";
import { cn } from "@/lib/utils";

interface CourseType {
  _id: string;
  name: string;
  slug: string;
  location: string;
  rating: number;
  reviewsCount: number;
  heroImage?: { url: string } | null;
  priceRange?: { min: number; max: number };
  stats?: {
    holes?: number;
    yardage?: string;
    difficulty?: string;
  };
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9";

const ExploreClubs = () => {
  const [courseList, setCourseList] = useState<CourseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Filter States
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("location") || searchParams.get("search") || "");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [session, setSession] = useState<string | null>(null);
  const [players, setPlayers] = useState<number | null>(null);
  const [holes, setHoles] = useState<number | null>(null);

  // Debounced Filter States
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [debouncedPriceMin, setDebouncedPriceMin] = useState("");
  const [debouncedPriceMax, setDebouncedPriceMax] = useState("");

  // Search Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 450);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Price Min Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPriceMin(priceMin);
    }, 450);
    return () => clearTimeout(handler);
  }, [priceMin]);

  // Price Max Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPriceMax(priceMax);
    }, 450);
    return () => clearTimeout(handler);
  }, [priceMax]);

  // Fetch Courses when filters change
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const queryParams = new URLSearchParams();
        if (debouncedSearchTerm) queryParams.set("search", debouncedSearchTerm);
        if (debouncedPriceMin) queryParams.set("priceMin", debouncedPriceMin);
        if (debouncedPriceMax) queryParams.set("priceMax", debouncedPriceMax);
        if (session) queryParams.set("session", session);
        if (players) queryParams.set("players", String(players));
        if (holes) queryParams.set("holes", String(holes));

        const res = await fetchUrl(`/courses?${queryParams.toString()}`);
        setCourseList(res.data || []);
      } catch (err: any) {
        setLoadError(err.message || "Failed to load courses.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [debouncedSearchTerm, debouncedPriceMin, debouncedPriceMax, session, players, holes]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setPriceMin("");
    setPriceMax("");
    setSession(null);
    setPlayers(null);
    setHoles(null);
  };

  const formatPrice = (priceRange?: { min: number; max: number }) => {
    if (!priceRange || (!priceRange.min && !priceRange.max)) return "Contact for pricing";
    if (!priceRange.max || priceRange.min === priceRange.max) return `$${priceRange.min}`;
    return `$${priceRange.min}-$${priceRange.max}`;
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-gray-900 pb-20">
      {/* Header Area */}
      <div className="max-w-350 mx-auto px-4 md:px-8 pt-10 pb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-2">
              Premium Tee Times
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#113f1b] tracking-tight mb-3">
              Explore Available Courses
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Discover active premium golf courses matching your preferences.
            </p>
          </div>
          <div className="flex bg-[#f3f4f6] p-1.5 rounded-full w-max mt-4 md:mt-0 shadow-inner">
            <button
              onClick={() => setHoles(holes === 18 ? null : 18)}
              className={cn(
                "text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-250 cursor-pointer",
                holes === 18 ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}
            >
              18 Holes
            </button>
            <button
              onClick={() => setHoles(holes === 9 ? null : 9)}
              className={cn(
                "text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-250 cursor-pointer",
                holes === 9 ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}
            >
              9 Holes
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-8 relative max-w-350">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#f3f4f6] border-none rounded-2xl py-4 pl-12 pr-4 text-gray-700 outline-none focus:ring-2 focus:ring-[#113f1b]/20 text-sm md:text-base font-medium placeholder-gray-400"
          />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-350 mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-70 xl:w-[320px] shrink-0">
          <div className="bg-[#f3f4f6] rounded-2xl p-6 lg:p-8">
            {/* Time of Day */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-5">Time of Day</h3>
              <div className="space-y-4">
                {[
                  { id: "EARLY_MORNING", label: "Early Morning (6am - 9am)" },
                  { id: "MIDDAY", label: "Midday (9am - 2pm)" },
                  { id: "AFTERNOON", label: "Afternoon (2pm - 5pm)" },
                  { id: "TWILIGHT", label: "Twilight (After 5pm)" },
                ].map((time) => {
                  const isChecked = session === time.id;
                  return (
                    <button
                      key={time.id}
                      onClick={() => setSession(isChecked ? null : time.id)}
                      className="flex items-center gap-3 cursor-pointer group w-full text-left bg-transparent border-none p-0 outline-none"
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded flex items-center justify-center border transition-colors",
                          isChecked ? "bg-[#113f1b] border-[#113f1b]" : "bg-white border-gray-300 group-hover:border-[#113f1b]"
                        )}
                      >
                        {isChecked && (
                          <Check
                            className="w-3.5 h-3.5 text-white"
                            strokeWidth={3.5}
                          />
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {time.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Number of Players */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-5">
                Number of Players
              </h3>
              <div className="flex gap-2.5">
                {[1, 2, 3, 4].map((num) => {
                  const isSelected = players === num;
                  return (
                    <button
                      key={num}
                      onClick={() => setPlayers(isSelected ? null : num)}
                      className={cn(
                        "flex-1 h-11 rounded-lg text-sm font-bold border transition-colors flex items-center justify-center cursor-pointer",
                        isSelected ? "bg-[#113f1b] border-[#113f1b] text-white" : "bg-white border-gray-200 text-gray-600 hover:border-[#113f1b]"
                      )}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-5">Price Range ($)</h3>
              <div className="flex gap-2 items-center">
                <div className="flex-1">
                  <span className="text-[10px] text-gray-400 font-bold block mb-1">MIN PRICE</span>
                  <input
                    type="number"
                    min="0"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none"
                  />
                </div>
                <span className="text-gray-400 mt-4">—</span>
                <div className="flex-1">
                  <span className="text-[10px] text-gray-400 font-bold block mb-1">MAX PRICE</span>
                  <input
                    type="number"
                    min="0"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={handleClearFilters}
              className="w-full py-3.5 bg-gray-200 hover:bg-gray-300 transition-colors rounded-xl text-sm font-bold text-gray-800 mt-4 cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        </aside>

        {/* Course List */}
        <div className="flex-1 flex flex-col gap-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin text-[#113f1b] mb-2" />
              <span>Loading premium courses...</span>
            </div>
          ) : loadError ? (
            <div className="text-center py-20 text-red-500 font-medium">
              {loadError}
            </div>
          ) : courseList.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No courses found matching your preferences. Try clearing some filters.
            </div>
          ) : (
            courseList.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-[24px] p-3 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col md:flex-row gap-6 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-all animate-in fade-in duration-300"
              >
                {/* Image Box */}
                <div className="w-full md:w-[45%] h-60 md:h-auto min-h-60 rounded-[18px] overflow-hidden relative shrink-0 group">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url('${getMediaUrl(course.heroImage?.url) || FALLBACK_IMAGE}')` }}
                  />
                </div>

                {/* Content Box */}
                <div className="flex-1 flex flex-col py-3 pr-4 md:py-4 md:pr-6">
                  <div className="flex justify-between items-start mb-2">
                    <Link href={`/explore-clubs/${course.slug}`}>
                      <h2 className="text-2xl font-bold text-[#113f1b] leading-tight pr-4">
                        {course.name}
                      </h2>
                    </Link>
                    <div className="text-right shrink-0">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                        Starting from
                      </p>
                      <p className="text-[28px] font-bold text-[#113f1b] leading-none">
                        {formatPrice(course.priceRange)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium mb-5">
                    <MapPin className="w-4 h-4" />
                    <span>{course.location}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 bg-[#f3f4f6] px-3.5 py-2 rounded-lg text-[13px] font-bold text-gray-800">
                      <Clock className="w-4 h-4 text-[#113f1b]" />
                      <span>{course.stats?.holes || 18} Holes</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#f3f4f6] px-3.5 py-2 rounded-lg text-[13px] font-bold text-gray-800">
                      <Users className="w-4 h-4 text-[#113f1b]" />
                      <span>{course.stats?.yardage || "—"} Yards</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#f3f4f6] px-3.5 py-2 rounded-lg text-[13px] font-bold text-gray-800">
                      <span className="text-[#113f1b] font-extrabold text-xs">★</span>
                      <span className="capitalize">{course.stats?.difficulty || "Standard"}</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="h-px w-full bg-gray-100 mb-5" />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Star className="w-4 h-4 fill-[#113f1b] text-[#113f1b]" />
                        <span className="font-bold text-[#113f1b]">
                          {(course.rating || 0).toFixed(1)}
                        </span>
                        <span className="text-gray-500 font-medium">
                          ({course.reviewsCount || 0} Reviews)
                        </span>
                      </div>
                      <Link
                        href={`/explore-clubs/${course.slug}`}
                        className="bg-[#113f1b] hover:bg-[#0a2e0f] text-white text-[13px] font-bold px-6 py-2.5 rounded-xl transition-colors shadow-sm"
                      >
                        Reserve Tee Time
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreClubs;
