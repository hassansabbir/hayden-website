"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    Clock,
    Users,
    CalendarCheck,
    Star,
    Settings,
    Plus,
    ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Booking {
    id: string;
    clubName: string;
    date: string;
    time: string;
    players: number;
    status: "CONFIRMED" | "PENDING" | "DECLINED";
    ref: string;
    image: string;
}

const upcomingBookings: Booking[] = [
    {
        id: "1",
        clubName: "Pine Valley Golf Club",
        date: "Saturday, Nov 12, 2024",
        time: "08:30 AM",
        players: 4,
        status: "CONFIRMED",
        ref: "FE-88219",
        image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: "2",
        clubName: "Oakmont Country Club",
        date: "Tuesday, Nov 15, 2024",
        time: "14:15 PM",
        players: 2,
        status: "PENDING",
        ref: "FE-88242",
        image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070&auto=format&fit=crop",
    },
];

const pastBookings: Booking[] = [
    {
        id: "3",
        clubName: "Shinnecock Hills",
        date: "Last Friday",
        time: "10:00 AM",
        players: 4,
        status: "DECLINED",
        ref: "FE-87900",
        image: "https://images.unsplash.com/photo-1592919016381-807eb896c78e?q=80&w=2070&auto=format&fit=crop",
    },
];

const MyBookings = () => {
    const [activeTab, setActiveTab] = useState<"Upcoming" | "Past">("Upcoming");

    const bookings = activeTab === "Upcoming" ? upcomingBookings : pastBookings;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Profile Header Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
                <div className="relative group">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl">
                        <Image
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
                            alt="Alexander Sterling"
                            width={160}
                            height={160}
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="flex-1 text-center md:text-left pt-2">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#15803D] uppercase mb-2 block">
                        Premium Member
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0B3D2E] mb-4">
                        Alexander Sterling
                    </h1>
                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-[#64748B] text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#94A3B8]" />
                            <span>Member since Oct 2022</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-[#EAB308] fill-current" />
                            <span>Handicap: 12.4</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 pt-4 md:pt-10">
                    <Link
                        href="/profile"
                        className="px-6 py-3 bg-[#F1F5F9] text-[#475569] rounded-2xl font-bold text-sm hover:bg-[#E2E8F0] transition-colors"
                    >
                        Edit Profile
                    </Link>
                    <button className="px-6 py-3 bg-[#0B4619] text-white rounded-2xl font-bold text-sm hover:bg-[#083512] transition-all shadow-lg shadow-green-900/20 hover:translate-y-[-2px] flex items-center gap-2">
                        <Plus size={18} />
                        New Booking
                    </button>
                </div>
            </div>

            {/* Bookings Section */}
            <div>
                <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                    <h2 className="text-2xl font-bold text-[#0B3D2E]">My Bookings</h2>
                    <div className="flex gap-8">
                        {["Upcoming", "Past"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`relative pb-4 text-sm font-bold transition-colors cursor-pointer ${activeTab === tab ? "text-[#0B3D2E]" : "text-[#94A3B8]"
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-1 bg-[#15803D] rounded-full"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            {bookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-slate-50 flex flex-col md:flex-row items-center gap-8 group hover:shadow-xl transition-all duration-500"
                                >
                                    {/* Club Image */}
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden relative shadow-sm group-hover:scale-105 transition-transform duration-500 shrink-0">
                                        <Image
                                            src={booking.image}
                                            alt={booking.clubName}
                                            fill
                                            className="object-cover"
                                            sizes="128px"
                                        />
                                    </div>

                                    {/* Booking Info */}
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-3 mb-3">
                                            <span
                                                className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${booking.status === "CONFIRMED"
                                                        ? "bg-[#DCFCE7] text-[#15803D]"
                                                        : booking.status === "PENDING"
                                                            ? "bg-[#F1F5F9] text-[#64748B]"
                                                            : "bg-[#FEE2E2] text-[#DC2626]"
                                                    }`}
                                            >
                                                {booking.status}
                                            </span>
                                            <span className="text-[10px] font-bold text-[#94A3B8] tracking-wider">
                                                Ref: {booking.ref}
                                            </span>
                                        </div>

                                        <h3 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4">
                                            {booking.clubName}
                                        </h3>

                                        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[#64748B] text-sm font-medium">
                                            <div className="flex items-center gap-2">
                                                <CalendarCheck className="w-4 h-4 text-[#94A3B8]" />
                                                <span>{booking.date}</span>
                                            </div>
                                            {booking.time && (
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-[#94A3B8]" />
                                                    <span>{booking.time}</span>
                                                </div>
                                            )}
                                            {booking.players > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4 text-[#94A3B8]" />
                                                    <span>{booking.players} Players</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="shrink-0">
                                        <button className="text-[#15803D] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
                                            Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default MyBookings;
