"use client";

import { useEffect, useState } from "react";
import { Check, Users, Calendar, Clock, MapPin, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { fetchUrl, getMediaUrl } from "@/lib/fetchUrl";

// ── Types ──────────────────────────────────────────────────────────────────────

interface BookingDetails {
  bookingId: string;
  status: string;
  players: number;
  holesPreference: "9" | "18";
  contact: {
    fullName: string;
    email: string;
    phone: string;
  };
  pricing: {
    teeTimePrice: number;
    bookingFee: number;
    taxes: number;
    total: number;
  };
  teeTime: {
    startTime: string;
    endTime: string;
    session: string;
    date: string;
  };
  course: {
    name: string;
    location?: string;
    heroImage?: { url: string } | null;
  };
}

// ── Constants ──────────────────────────────────────────────────────────────────

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1200&auto=format&fit=crop";

// ── Helpers ────────────────────────────────────────────────────────────────────

const formatTime24to12 = (time24: string): string => {
  if (!time24) return "";
  const [h, m] = time24.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${String(h12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
};

const formatDisplayDate = (dateStr: string): string => {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
};

// ── Component ──────────────────────────────────────────────────────────────────

const Submit = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId") || "";
  const email = searchParams.get("email") || "";

  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId || !email) {
      setLoadError("Missing booking reference. Please contact support.");
      setIsLoading(false);
      return;
    }

    const fetchBooking = async () => {
      setIsLoading(true);
      try {
        const res = await fetchUrl(
          `/bookings/lookup?bookingId=${encodeURIComponent(bookingId)}&email=${encodeURIComponent(email)}`
        );
        setBooking(res.data);
      } catch (err: any) {
        setLoadError(err.message || "Could not retrieve your booking details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, email]);

  // ── Loading ──────────────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafbfa] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <Loader2 className="w-9 h-9 animate-spin text-emerald-700" />
          <span className="text-sm font-semibold">Loading your confirmation...</span>
        </div>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────────

  if (loadError || !booking) {
    return (
      <div className="min-h-screen bg-[#fafbfa] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-rose-100 max-w-md w-full text-center">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Booking not found
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            {loadError || "We couldn't retrieve your booking details."}
          </p>
          <Link
            href="/explore-clubs"
            className="inline-block bg-[#0a4a1b] text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-[#073814] transition-all"
          >
            Browse Clubs
          </Link>
        </div>
      </div>
    );
  }

  // ── Success Confirmation ─────────────────────────────────────────────────────

  const { teeTime, course, pricing, players } = booking;
  const heroUrl = getMediaUrl((course as any)?.heroImage?.url) || FALLBACK_IMAGE;
  const teeDate = teeTime?.date
    ? formatDisplayDate(teeTime.date)
    : "—";
  const startTime = teeTime?.startTime ? formatTime24to12(teeTime.startTime) : "—";

  return (
    <div className="min-h-screen bg-[#fafbfa] font-sans text-slate-900 flex flex-col items-center pt-16 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Success Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14">
        <div className="bg-[#e9eee9] w-25 h-25 rounded-[24px] flex items-center justify-center mb-7 shadow-inner">
          <div className="bg-[#10561c] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-[#10561c]/20">
            <Check strokeWidth={3.5} className="w-7 h-7" />
          </div>
        </div>
        <h1 className="text-[42px] sm:text-[50px] font-extrabold text-[#0a4a1b] tracking-tight mb-4 leading-tight">
          Request Submitted!
        </h1>
        <p className="text-[#647167] text-[17px] leading-relaxed max-w-107.5 mx-auto">
          Your tee time request has been sent to the clubhouse for confirmation.
          You'll receive an email update shortly.
        </p>
      </div>

      {/* Two-column detail layout */}
      <div className="w-full max-w-255 flex flex-col lg:flex-row gap-7">

        {/* ── Left: Booking Summary Card ── */}
        <div className="flex-[1.3] bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100 flex flex-col">

          {/* Course hero image */}
          <div className="relative h-60 w-full shrink-0">
            <Image
              src={heroUrl}
              alt={course?.name || "Golf Course"}
              fill
              className="w-full h-full object-cover"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-7">
              <div className="text-gray-300 text-[10px] font-bold tracking-widest uppercase mb-1 opacity-90">
                Confirmed Location
              </div>
              <div className="text-white text-[24px] font-bold tracking-tight">
                {course?.name || "—"}
              </div>
            </div>
          </div>

          <div className="p-8 flex-1 flex flex-col justify-between">
            {/* Details grid */}
            <div className="grid grid-cols-3 gap-5 mb-8">
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Booking ID
                </div>
                <div className="font-bold text-[#10561c] text-[18px] break-all">
                  {booking.bookingId}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Date
                </div>
                <div className="font-bold text-gray-900 text-[14.5px] leading-snug">
                  {teeDate}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Tee Time
                </div>
                <div className="font-bold text-gray-900 text-[14.5px]">
                  {startTime}
                </div>
              </div>
            </div>

            {/* Info rows */}
            <div className="space-y-4 mb-8">
              {/* Location */}
              {(course as any)?.location && (
                <div className="flex items-center gap-3 text-[14px] text-gray-600">
                  <MapPin className="w-4 h-4 text-[#10561c] shrink-0" strokeWidth={2} />
                  <span>{(course as any).location}</span>
                </div>
              )}
              {/* Clock */}
              <div className="flex items-center gap-3 text-[14px] text-gray-600">
                <Clock className="w-4 h-4 text-[#10561c] shrink-0" strokeWidth={2} />
                <span>
                  {startTime} —{" "}
                  {teeTime?.session?.replace(/_/g, " ") || "—"}
                </span>
              </div>
              {/* Calendar */}
              <div className="flex items-center gap-3 text-[14px] text-gray-600">
                <Calendar className="w-4 h-4 text-[#10561c] shrink-0" strokeWidth={2} />
                <span>{teeDate}</span>
              </div>
            </div>

            {/* Players & price footer */}
            <div className="bg-[#f4f6f4] rounded-[14px] p-5 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-[#c2dfc8] rounded-[12px] p-2.5 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#10561c]" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-[14px] mb-0.5">
                    {players} {players === 1 ? "Player" : "Players"}
                  </div>
                  <div className="text-[12px] text-gray-500">
                    {booking.holesPreference} Holes — {booking.status}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900 text-[16px] mb-0.5">
                  ${pricing.total.toFixed(2)}
                </div>
                <div className="text-[12px] text-gray-500">Estimated Total</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: What Happens Next ── */}
        <div className="flex-[0.85] flex flex-col gap-5">
          <div className="bg-[#f0f2f0] rounded-[20px] p-8 flex-1 border border-gray-100/50">
            <h2 className="text-[20px] font-bold text-[#0a4a1b] mb-8">
              What happens next?
            </h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-[#0a4a1b] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-[14.5px] mb-1.5">
                    Confirmation Email
                  </div>
                  <div className="text-[13px] text-[#647167] leading-relaxed pr-2">
                    Check your inbox at{" "}
                    <span className="font-semibold text-gray-700">
                      {booking.contact.email}
                    </span>{" "}
                    for a full summary and your booking reference.
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-[#0a4a1b] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-[14.5px] mb-1.5">
                    Save Your Booking ID
                  </div>
                  <div className="text-[13px] text-[#647167] leading-relaxed pr-2">
                    Your reference is{" "}
                    <span className="font-bold text-[#10561c]">
                      {booking.bookingId}
                    </span>
                    . Keep it safe for check-in.
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-[#0a4a1b] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-[14.5px] mb-1.5">
                    Arrive Early
                  </div>
                  <div className="text-[13px] text-[#647167] leading-relaxed pr-2">
                    Please arrive at least 20 minutes before your {startTime} tee time
                    for check-in and warm-up.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/explore-clubs"
            className="w-full bg-[#0a4a1b] hover:bg-[#073814] text-white font-bold py-4.5 rounded-[14px] transition-all shadow-[0_4px_14px_0_rgba(10,74,27,0.25)] hover:shadow-[0_6px_20px_rgba(10,74,27,0.3)] hover:-translate-y-px text-center text-[16px] block"
          >
            Explore More Clubs
          </Link>

          <Link
            href="/"
            className="w-full border border-[#0a4a1b]/30 hover:border-[#0a4a1b] text-[#0a4a1b] font-bold py-4 rounded-[14px] transition-all text-center text-[15px] block hover:bg-[#0a4a1b]/5"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Submit;
