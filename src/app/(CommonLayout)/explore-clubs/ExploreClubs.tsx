"use client";

import React from "react";
import {
  Search,
  MapPin,
  Clock,
  Users,
  Star,
  ArrowRight,
  Check,
} from "lucide-react";
import Link from "next/link";

const courses = [
  {
    id: 1,
    title: "Pinecrest Valley Links",
    location: "Scottsdale, AZ",
    price: 185,
    time: "08:45 AM",
    slots: "2 Slots Left",
    rating: 4.9,
    reviews: 120,
    badge: "HIGH DEMAND",
    badgeColor: "bg-[#25632d]",
    image:
      "https://images.unsplash.com/photo-1592937238247-cd0090e02f65?q=80&w=1500&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: 2,
    title: "Silver Oak Shores",
    location: "Pebble Beach, CA",
    price: 310,
    time: "10:15 AM",
    slots: "4 Slots Open",
    rating: 4.7,
    reviews: 84,
    badge: "OCEAN VIEW",
    badgeColor: "bg-[#516b54]",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1500&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: 3,
    title: "Highland Meadows",
    location: "Denver, CO",
    price: 125,
    time: "01:30 PM",
    slots: "1 Slot Left",
    rating: 4.5,
    reviews: 210,
    badge: "",
    badgeColor: "",
    image:
      "https://images.unsplash.com/photo-1535135930260-84518bf7512f?q=80&w=1500&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

const ExploreClubs = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-gray-900 pb-20">
      {/* Header Area */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-10 pb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-2">
              Premium Tee Times
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#113f1b] tracking-tight mb-3">
              Explore Available Courses
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Discover 12 premium tee times matching your preferences for
              Friday, October 24, 2024.
            </p>
          </div>
          <div className="flex bg-[#f3f4f6] p-1.5 rounded-full w-max mt-4 md:mt-0 shadow-inner">
            <button className="bg-white text-sm font-bold text-gray-900 px-6 py-2.5 rounded-full shadow-sm">
              18 Holes
            </button>
            <button className="text-sm font-bold text-gray-500 px-6 py-2.5 rounded-full hover:text-gray-700 transition-colors">
              9 Holes
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-8 relative max-w-[1400px]">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full bg-[#f3f4f6] border-none rounded-2xl py-4 pl-12 pr-4 text-gray-700 outline-none focus:ring-2 focus:ring-[#113f1b]/20 text-sm md:text-base font-medium placeholder-gray-400"
          />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-[280px] xl:w-[320px] shrink-0">
          <div className="bg-[#f3f4f6] rounded-2xl p-6 lg:p-8">
            {/* Time of Day */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-5">Time of Day</h3>
              <div className="space-y-4">
                {[
                  {
                    id: "early",
                    label: "Early Morning (6am - 9am)",
                    checked: false,
                  },
                  { id: "midday", label: "Midday (9am - 2pm)", checked: true },
                  {
                    id: "afternoon",
                    label: "Afternoon (2pm - 5pm)",
                    checked: false,
                  },
                  {
                    id: "twilight",
                    label: "Twilight (After 5pm)",
                    checked: false,
                  },
                ].map((time) => (
                  <label
                    key={time.id}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${time.checked ? "bg-[#113f1b] border-[#113f1b]" : "bg-white border-gray-300 group-hover:border-[#113f1b]"}`}
                    >
                      {time.checked && (
                        <Check
                          className="w-3.5 h-3.5 text-white"
                          strokeWidth={3.5}
                        />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {time.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Number of Players */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-5">
                Number of Players
              </h3>
              <div className="flex gap-2.5">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    className={`flex-1 h-11 rounded-lg text-sm font-bold border transition-colors flex items-center justify-center ${num === 2 ? "bg-[#113f1b] border-[#113f1b] text-white" : "bg-white border-gray-200 text-gray-600 hover:border-[#113f1b]"}`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-5">Price Range</h3>
              <div className="h-2 w-full bg-white rounded-full relative mb-3">
                <div className="absolute inset-y-0 left-0 w-full bg-white rounded-full" />
                {/* thumb left */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-4 h-4 bg-white border-2 border-gray-200 rounded-full shadow-sm cursor-pointer" />
                {/* thumb right */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-4 h-4 bg-white border-2 border-gray-200 rounded-full shadow-sm cursor-pointer" />
              </div>
              <div className="flex justify-between items-center text-[11px] font-bold text-gray-500">
                <span>$50</span>
                <span>$500+</span>
              </div>
            </div>

            {/* Clear Filters */}
            <button className="w-full py-3.5 bg-gray-200 hover:bg-gray-300 transition-colors rounded-xl text-sm font-bold text-gray-800 mt-4">
              Clear All Filters
            </button>
          </div>
        </aside>

        {/* Course List */}
        <div className="flex-1 flex flex-col gap-6">
          {courses.map((course, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[24px] p-3 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col md:flex-row gap-6 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-all"
            >
              {/* Image Box */}
              <div className="w-full md:w-[45%] h-[240px] md:h-auto min-h-[240px] rounded-[18px] overflow-hidden relative shrink-0 group">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url('${course.image}')` }}
                />
                {course.badge && (
                  <div
                    className={`absolute top-4 left-4 ${course.badgeColor} text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-md`}
                  >
                    {course.badge}
                  </div>
                )}
              </div>

              {/* Content Box */}
              <div className="flex-1 flex flex-col py-3 pr-4 md:py-4 md:pr-6">
                <div className="flex justify-between items-start mb-2">
                  <Link href={`/explore-clubs/${course?.id}`}>
                    <h2 className="text-2xl font-bold text-[#113f1b] leading-tight pr-4">
                      {course.title}
                    </h2>
                  </Link>
                  <div className="text-right shrink-0">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                      Per Player
                    </p>
                    <p className="text-[28px] font-bold text-[#113f1b] leading-none">
                      ${course.price}
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
                    <span>{course.time}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#f3f4f6] px-3.5 py-2 rounded-lg text-[13px] font-bold text-gray-800">
                    <Users className="w-4 h-4 text-[#113f1b]" />
                    <span>{course.slots}</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="h-px w-full bg-gray-100 mb-5" />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Star className="w-4 h-4 fill-[#113f1b] text-[#113f1b]" />
                      <span className="font-bold text-[#113f1b]">
                        {course.rating}
                      </span>
                      <span className="text-gray-500 font-medium">
                        ({course.reviews} Reviews)
                      </span>
                    </div>
                    <Link
                      href={`/explore-clubs/reserve/${course?.id}`}
                      className="bg-[#113f1b] hover:bg-[#0a2e0f] text-white text-[13px] font-bold px-6 py-2.5 rounded-xl transition-colors shadow-sm"
                    >
                      Reserve Tee Time
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-6">
            <button className="flex items-center gap-2 bg-[#f3f4f6] hover:bg-gray-200 text-gray-800 font-bold text-[13px] px-6 py-3 rounded-xl transition-colors">
              View More Available Times
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreClubs;
