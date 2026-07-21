"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    Clock,
    Users,
    CalendarCheck,
    Star,
    Plus,
    Loader2,
    X,
    Phone,
    Mail,
    User,
    CreditCard,
    FileText,
    MapPin,
    ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchUrl, getMediaUrl } from "@/lib/fetchUrl";
import useLoginUser from "@/hooks/useUser";

interface ApiBooking {
    _id: string;
    bookingId: string;
    course: { _id: string; name: string; heroImage?: { url: string } };
    teeTime: {
        date: string;
        startTime: string;
        endTime: string;
        session: string;
        price: number;
        capacity: number;
    };
    contact: { fullName: string; email: string; phone: string };
    holesPreference: string;
    players: number;
    specialRequests?: string;
    status: "CONFIRMED" | "PENDING" | "DECLINED" | "CANCELLED";
    pricing: { teeTimePrice: number; bookingFee: number; taxes: number; total: number };
    createdAt: string;
}

const getInitials = (name?: string) =>
    (name || "")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("") || "U";

const FALLBACK_IMG =
    "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070&auto=format&fit=crop";

const STATUS_STYLES: Record<string, string> = {
    CONFIRMED: "bg-emerald-100 text-emerald-700",
    PENDING: "bg-slate-100 text-slate-500",
    DECLINED: "bg-red-100 text-red-600",
    CANCELLED: "bg-orange-100 text-orange-600",
};

/* ── helpers ── */
const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
    });

const formatTime = (t: string) => {
    const [h, m] = t.split(":");
    const hr = parseInt(h, 10);
    return `${hr % 12 || 12}:${m} ${hr >= 12 ? "PM" : "AM"}`;
};

const fmt$ = (n: number) => `$${n.toFixed(2)}`;

/* ══════════════════════════════════════════════
   Booking Detail Modal
══════════════════════════════════════════════ */
function BookingModal({ booking, onClose }: { booking: ApiBooking; onClose: () => void }) {
    // Lock body scroll while modal is open
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prev; };
    }, []);

    // Close on backdrop click
    const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                onClick={onBackdrop}
            >
                {/* Modal shell — image header fixed, body scrolls with no visible bar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.22 }}
                    className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl flex flex-col"
                    style={{ maxHeight: "90vh" }}
                >
                    {/* ── Pinned image header (never scrolls) ── */}
                    <div className="relative h-44 md:h-56 rounded-t-[2rem] overflow-hidden shrink-0">
                        <Image
                            src={getMediaUrl(booking.course?.heroImage?.url) || FALLBACK_IMG}
                            alt={booking.course?.name}
                            fill
                            unoptimized
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#092e14]/80 via-[#092e14]/30 to-transparent" />

                        {/* Status badge */}
                        <span
                            className={`absolute top-4 left-5 text-[10px] font-bold px-3 py-1.5 rounded-full ${STATUS_STYLES[booking.status]}`}
                        >
                            {booking.status}
                        </span>

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 flex items-center justify-center transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4 text-white" />
                        </button>

                        {/* Course name */}
                        <div className="absolute bottom-5 left-5 text-white">
                            <p className="text-xs font-semibold text-white/70 mb-0.5 uppercase tracking-wider">Golf Course</p>
                            <h2 className="text-xl md:text-2xl font-extrabold leading-tight">
                                {booking.course?.name}
                            </h2>
                        </div>
                    </div>

                    {/* ── Scrollable body — scrollbar hidden ── */}
                    <div
                        className="overflow-y-scroll flex-1 rounded-b-[2rem] [&::-webkit-scrollbar]:hidden"
                        style={{ scrollbarWidth: "none" } as React.CSSProperties}
                    >
                        <div className="p-6 md:p-8 space-y-7">

                        {/* Booking ID & date */}
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Booking Reference</p>
                                <p className="text-lg font-extrabold text-[#0B3D2E] font-mono">{booking.bookingId}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Booked On</p>
                                <p className="text-sm font-semibold text-slate-600">
                                    {new Date(booking.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                </p>
                            </div>
                        </div>

                        <hr className="border-slate-100" />

                        {/* Tee time details */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Tee Time Details</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-slate-50 rounded-2xl p-4">
                                    <CalendarCheck className="w-4 h-4 text-emerald-600 mb-2" />
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">Date</p>
                                    <p className="text-sm font-bold text-slate-800">{formatDate(booking.teeTime?.date)}</p>
                                </div>
                                <div className="bg-slate-50 rounded-2xl p-4">
                                    <Clock className="w-4 h-4 text-emerald-600 mb-2" />
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">Time</p>
                                    <p className="text-sm font-bold text-slate-800">
                                        {booking.teeTime?.startTime ? formatTime(booking.teeTime.startTime) : "—"}
                                        {booking.teeTime?.endTime ? ` – ${formatTime(booking.teeTime.endTime)}` : ""}
                                    </p>
                                </div>
                                <div className="bg-slate-50 rounded-2xl p-4">
                                    <Users className="w-4 h-4 text-emerald-600 mb-2" />
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">Players</p>
                                    <p className="text-sm font-bold text-slate-800">{booking.players} Player{booking.players !== 1 ? "s" : ""}</p>
                                </div>
                                <div className="bg-slate-50 rounded-2xl p-4">
                                    <MapPin className="w-4 h-4 text-emerald-600 mb-2" />
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">Holes</p>
                                    <p className="text-sm font-bold text-slate-800">{booking.holesPreference} Holes</p>
                                </div>
                            </div>
                        </div>

                        <hr className="border-slate-100" />

                        {/* Contact info */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Contact Information</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                                        <User className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold">Full Name</p>
                                        <p className="text-sm font-semibold text-slate-800">{booking.contact?.fullName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                                        <Mail className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold">Email</p>
                                        <p className="text-sm font-semibold text-slate-800">{booking.contact?.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                                        <Phone className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold">Phone</p>
                                        <p className="text-sm font-semibold text-slate-800">{booking.contact?.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Special requests */}
                        {booking.specialRequests && (
                            <>
                                <hr className="border-slate-100" />
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Special Requests</h3>
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
                                            <FileText className="w-4 h-4 text-amber-500" />
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed">{booking.specialRequests}</p>
                                    </div>
                                </div>
                            </>
                        )}

                        <hr className="border-slate-100" />

                        {/* Pricing */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Pricing Breakdown</h3>
                            <div className="bg-slate-50 rounded-2xl p-5 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Green Fee</span>
                                    <span className="font-semibold text-slate-700">{fmt$(booking.pricing?.teeTimePrice || 0)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Booking Fee</span>
                                    <span className="font-semibold text-slate-700">{fmt$(booking.pricing?.bookingFee || 0)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Taxes (8%)</span>
                                    <span className="font-semibold text-slate-700">{fmt$(booking.pricing?.taxes || 0)}</span>
                                </div>
                                <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                                    <span className="font-bold text-[#0B3D2E] flex items-center gap-2">
                                        <CreditCard className="w-4 h-4" /> Total Paid
                                    </span>
                                    <span className="text-xl font-extrabold text-[#0B3D2E]">{fmt$(booking.pricing?.total || 0)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Close footer */}
                        <button
                            onClick={onClose}
                            className="w-full py-3.5 rounded-2xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                            Close
                        </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

/* ══════════════════════════════════════════════
   Main Component
══════════════════════════════════════════════ */
const MyBookings = () => {
    const router = useRouter();
    const { user, isLogin, isLoading: authLoading } = useLoginUser();
    const [activeTab, setActiveTab] = useState<"Upcoming" | "Past">("Upcoming");
    const [bookings, setBookings] = useState<ApiBooking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selected, setSelected] = useState<ApiBooking | null>(null);

    useEffect(() => {
        if (!authLoading && !isLogin) {
            router.push("/sign-in");
            return;
        }

        // Wait for the real session token, not just the optimistic cached user cookie
        if (authLoading || !isLogin) return;

        fetchUrl("/bookings/mine?limit=100")
            .then((res) => {
                setBookings(res.data || []);
            })
            .catch((err) => {
                console.error("Failed to fetch bookings", err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [isLogin, authLoading, router]);

    const upcomingBookings = bookings.filter((b) => {
        const d = new Date(b.teeTime?.date || 0);
        const today = new Date(); today.setHours(0, 0, 0, 0);
        return (b.status === "PENDING" || b.status === "CONFIRMED") && d >= today;
    });

    const pastBookings = bookings.filter((b) => {
        const d = new Date(b.teeTime?.date || 0);
        const today = new Date(); today.setHours(0, 0, 0, 0);
        return b.status === "DECLINED" || b.status === "CANCELLED" || d < today;
    });

    const displayedBookings = activeTab === "Upcoming" ? upcomingBookings : pastBookings;

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
            </div>
        );
    }

    return (
        <>
            {/* ── Booking Detail Modal ── */}
            {selected && <BookingModal booking={selected} onClose={() => setSelected(null)} />}

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
                    <div className="relative group">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl bg-emerald-100 flex items-center justify-center text-4xl font-bold text-emerald-800">
                            {getInitials(user?.name)}
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left pt-2">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#15803D] uppercase mb-2 block">
                            Golfer Profile
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-[#0B3D2E] mb-4">
                            {user?.name || "Loading..."}
                        </h1>
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-[#64748B] text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-[#EAB308] fill-current" />
                                <span>{user?.email}</span>
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
                        <Link
                            href="/explore-clubs"
                            className="px-6 py-3 bg-[#0B4619] text-white rounded-2xl font-bold text-sm hover:bg-[#083512] transition-all shadow-lg shadow-green-900/20 hover:-translate-y-0.5 flex items-center gap-2"
                        >
                            <Plus size={18} />
                            New Booking
                        </Link>
                    </div>
                </div>

                {/* Bookings section */}
                <div>
                    <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                        <h2 className="text-2xl font-bold text-[#0B3D2E]">My Bookings</h2>
                        <div className="flex gap-8">
                            {["Upcoming", "Past"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`relative pb-4 text-sm font-bold transition-colors cursor-pointer ${activeTab === tab ? "text-[#0B3D2E]" : "text-[#94A3B8]"}`}
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
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mb-4" />
                                <p className="text-slate-500 font-medium">Loading your bookings...</p>
                            </div>
                        ) : displayedBookings.length === 0 ? (
                            <div className="text-center py-20 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
                                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-slate-700 mb-2">No {activeTab.toLowerCase()} bookings found</h3>
                                <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                                    You don't have any {activeTab.toLowerCase()} bookings at the moment. Explore clubs to book your next tee time!
                                </p>
                                <Link
                                    href="/explore-clubs"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors"
                                >
                                    Explore Clubs
                                </Link>
                            </div>
                        ) : (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    {displayedBookings.map((booking) => (
                                        <div
                                            key={booking._id}
                                            className="bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-slate-50 flex flex-col md:flex-row items-center gap-8 group hover:shadow-xl transition-all duration-500"
                                        >
                                            {/* Club Image */}
                                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden relative shadow-sm group-hover:scale-105 transition-transform duration-500 shrink-0 bg-slate-100">
                                                <Image
                                                    src={getMediaUrl(booking.course?.heroImage?.url) || FALLBACK_IMG}
                                                    alt={booking.course?.name || "Golf Course"}
                                                    fill
                                                    unoptimized
                                                    className="object-cover"
                                                    sizes="128px"
                                                />
                                            </div>

                                            {/* Booking Info */}
                                            <div className="flex-1 w-full md:w-auto">
                                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                                    <span
                                                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLES[booking.status] || "bg-slate-100 text-slate-500"}`}
                                                    >
                                                        {booking.status}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-[#94A3B8] tracking-wider uppercase font-mono">
                                                        {booking.bookingId}
                                                    </span>
                                                </div>

                                                <h3 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4">
                                                    {booking.course?.name || "Unknown Course"}
                                                </h3>

                                                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[#64748B] text-sm font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <CalendarCheck className="w-4 h-4 text-[#94A3B8]" />
                                                        <span>{formatDate(booking.teeTime?.date)}</span>
                                                    </div>
                                                    {booking.teeTime?.startTime && (
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="w-4 h-4 text-[#94A3B8]" />
                                                            <span>{formatTime(booking.teeTime.startTime)}</span>
                                                        </div>
                                                    )}
                                                    {booking.players > 0 && (
                                                        <div className="flex items-center gap-2">
                                                            <Users className="w-4 h-4 text-[#94A3B8]" />
                                                            <span>{booking.players} Player{booking.players !== 1 ? "s" : ""}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* View Button */}
                                            <div className="shrink-0 w-full md:w-auto flex justify-end">
                                                <button
                                                    onClick={() => setSelected(booking)}
                                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-sm hover:bg-emerald-100 active:scale-95 transition-all cursor-pointer group/btn"
                                                >
                                                    View Details
                                                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyBookings;
