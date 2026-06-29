"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  MapPin,
  Calendar,
  Users,
  Lock,
  BadgeCheck,
  Loader2,
  ChevronDown,
  Clock,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { fetchUrl, getMediaUrl } from "@/lib/fetchUrl";

// ── Types ──────────────────────────────────────────────────────────────────────

type ReserveFormValues = {
  fullName: string;
  phoneNumber: string;
  email: string;
  players: number;
  holesPreference: "9" | "18";
  specialRequests: string;
  agreeToTerms: boolean;
};

interface CourseBasic {
  name: string;
  location: string;
  heroImage?: { url: string } | null;
}

interface TeeTimeSlot {
  _id: string;
  startTime: string;
  endTime: string;
  session: string;
  price: number;
  capacity: number;
  bookedCount: number;
  date: string;
}

interface UserProfile {
  fullName: string;
  email: string;
  phone?: string;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const BOOKING_FEE = 9.95;
const TAX_RATE = 0.08;
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

const Reserve = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // URL params
  const slug = params.id as string;
  const date = searchParams.get("date") || "";
  const slotId = searchParams.get("slot") || "";

  // State
  const [course, setCourse] = useState<CourseBasic | null>(null);
  const [slot, setSlot] = useState<TeeTimeSlot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Derived pricing
  const teeTimePrice = slot?.price ?? 0;
  const taxes = Number((teeTimePrice * TAX_RATE).toFixed(2));
  const total = Number((teeTimePrice + BOOKING_FEE + taxes).toFixed(2));

  // Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReserveFormValues>({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      players: 1,
      holesPreference: "18",
      specialRequests: "",
      agreeToTerms: false,
    },
  });

  // ── Data fetching ────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!slug || !date || !slotId) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Parallel: course details + tee times for the date
        const [courseRes, teeTimesRes] = await Promise.all([
          fetchUrl(`/courses/${slug}`),
          fetchUrl(`/courses/${slug}/tee-times?date=${date}`),
        ]);

        setCourse(courseRes.data);

        // Find the exact slot from all returned slots
        const allSlots: TeeTimeSlot[] = teeTimesRes.data || [];
        const matched = allSlots.find((s) => s._id === slotId) || null;
        setSlot(matched);
      } catch (err) {
        console.error("Failed to load booking data:", err);
      }

      // Separately try to fetch the logged-in user profile (optional)
      try {
        const profileRes = await fetchUrl("/users/me");
        const profile: UserProfile = profileRes.data;
        // Auto-fill the form with profile data
        reset((prev) => ({
          ...prev,
          fullName: profile.fullName || "",
          email: profile.email || "",
          phoneNumber: profile.phone || "",
        }));
      } catch {
        // User is not logged in — form stays blank, that's fine
      }

      setIsLoading(false);
    };

    fetchData();
  }, [slug, date, slotId, reset]);

  // ── Form submit ──────────────────────────────────────────────────────────────

  const onSubmit = async (data: ReserveFormValues) => {
    if (!slotId) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetchUrl("/bookings", {
        method: "POST",
        body: {
          teeTimeId: slotId,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          players: Number(data.players),
          holesPreference: data.holesPreference,
          specialRequests: data.specialRequests || undefined,
          agreeToTerms: true,
        },
      });

      const booking = res.data;
      // Redirect to confirmation page on same route
      const successUrl = `/explore-clubs/reserve/${slug}?isSubmit=true&bookingId=${booking.bookingId}&email=${encodeURIComponent(data.email)}`;
      router.push(successUrl);
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Loading skeleton ─────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafbfa] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <Loader2 className="w-9 h-9 animate-spin text-emerald-700" />
          <span className="text-sm font-semibold">Loading booking details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafbfa] font-sans text-slate-900 flex justify-center py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1150px]">
        {/* Breadcrumb */}
        <div className="flex items-center text-[11px] font-bold tracking-widest uppercase mb-10 text-gray-500">
          <span>RESERVATIONS</span>
          <span className="mx-2.5">&gt;</span>
          <span className="text-[#0a4a1b]">SECURE BOOKING</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-[80px]">
          {/* ── LEFT: Booking Form ── */}
          <div className="flex-1">
            <h1 className="text-4xl sm:text-[44px] font-extrabold text-[#0a4a1b] tracking-tight mb-4 leading-tight">
              Request Your Tee Time
            </h1>
            <p className="text-gray-500 text-lg mb-10 max-w-[500px] leading-relaxed">
              Provide your player information to finalize your request. Our
              clubhouse will confirm your slot shortly.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
              {/* Row 1: Full Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="block text-[11px] font-bold text-gray-700 tracking-widest uppercase"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="E.g. Alexander Sterling"
                    {...register("fullName", {
                      required: "Full name is required",
                      minLength: { value: 2, message: "Minimum 2 characters" },
                    })}
                    className="w-full bg-[#f4f5f4] rounded-xl px-4 py-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a4a1b] focus:bg-white transition-all border border-transparent focus:border-emerald-600"
                  />
                  {errors.fullName && (
                    <p className="text-rose-500 text-xs font-semibold flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-[11px] font-bold text-gray-700 tracking-widest uppercase"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                      minLength: { value: 5, message: "Too short" },
                    })}
                    className="w-full bg-[#f4f5f4] rounded-xl px-4 py-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a4a1b] focus:bg-white transition-all border border-transparent focus:border-emerald-600"
                  />
                  {errors.phoneNumber && (
                    <p className="text-rose-500 text-xs font-semibold flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-[11px] font-bold text-gray-700 tracking-widest uppercase"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="a.sterling@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full bg-[#f4f5f4] rounded-xl px-4 py-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a4a1b] focus:bg-white transition-all border border-transparent focus:border-emerald-600"
                />
                {errors.email && (
                  <p className="text-rose-500 text-xs font-semibold flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Row 2: Number of Players + Holes Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="players"
                    className="block text-[11px] font-bold text-gray-700 tracking-widest uppercase"
                  >
                    Number of Players
                  </label>
                  <div className="relative">
                    <select
                      id="players"
                      {...register("players", { required: true, valueAsNumber: true })}
                      className="w-full appearance-none bg-[#f4f5f4] rounded-xl px-4 py-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0a4a1b] focus:bg-white transition-all border border-transparent focus:border-emerald-600 pr-10"
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Player" : "Players"}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="holesPreference"
                    className="block text-[11px] font-bold text-gray-700 tracking-widest uppercase"
                  >
                    Holes Preference
                  </label>
                  <div className="relative">
                    <select
                      id="holesPreference"
                      {...register("holesPreference", { required: true })}
                      className="w-full appearance-none bg-[#f4f5f4] rounded-xl px-4 py-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0a4a1b] focus:bg-white transition-all border border-transparent focus:border-emerald-600 pr-10"
                    >
                      <option value="18">18 Holes (Full Round)</option>
                      <option value="9">9 Holes (Front / Back Nine)</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <label
                  htmlFor="specialRequests"
                  className="block text-[11px] font-bold text-gray-700 tracking-widest uppercase"
                >
                  Special Requests{" "}
                  <span className="text-gray-400 normal-case font-normal">(optional)</span>
                </label>
                <textarea
                  id="specialRequests"
                  placeholder="Mention equipment rentals, caddy preference, dietary needs, accessibility requirements..."
                  rows={4}
                  {...register("specialRequests")}
                  className="w-full bg-[#f4f5f4] rounded-xl px-4 py-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a4a1b] focus:bg-white transition-all border border-transparent focus:border-emerald-600 resize-none"
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-4 p-5 bg-[#e8ebe9] rounded-xl">
                <div className="flex items-center h-6 pt-0.5">
                  <input
                    id="agreeToTerms"
                    type="checkbox"
                    {...register("agreeToTerms", {
                      required: "You must agree to the terms to book",
                    })}
                    className="w-5 h-5 text-[#0a4a1b] bg-white border-gray-300 rounded cursor-pointer accent-[#0a4a1b]"
                  />
                </div>
                <label
                  htmlFor="agreeToTerms"
                  className="text-[14.5px] text-gray-600 leading-relaxed cursor-pointer pr-4"
                >
                  I agree to the Tea It Up{" "}
                  <span className="font-semibold text-[#0a4a1b]">
                    Membership Terms
                  </span>{" "}
                  and understand the 24-hour cancellation policy for clubhouse
                  reservations.
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-rose-500 text-xs font-semibold flex items-center gap-1 -mt-4">
                  <AlertCircle className="w-3 h-3" />
                  {errors.agreeToTerms.message}
                </p>
              )}

              {/* API error */}
              {submitError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-5 py-4 text-sm font-medium flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-px" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#10561c] hover:bg-[#0c4714] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-[18px] rounded-xl transition-all shadow-[0_4px_14px_0_rgba(16,86,28,0.25)] hover:shadow-[0_6px_20px_rgba(16,86,28,0.3)] hover:-translate-y-px text-[17px] mt-2 flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting Request...
                  </>
                ) : (
                  "Submit Booking Request"
                )}
              </button>
            </form>
          </div>

          {/* ── RIGHT: Booking Summary ── */}
          <div className="w-full lg:w-[460px] shrink-0">
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.05)] relative overflow-hidden border border-slate-100 lg:sticky lg:top-8">
              <h2 className="text-[26px] font-bold text-[#0a4a1b] mb-7">
                Booking Summary
              </h2>

              {/* Course Image */}
              <div className="relative rounded-[18px] overflow-hidden mb-8 h-52 group bg-slate-100">
                <Image
                  src={
                    getMediaUrl(course?.heroImage?.url) || FALLBACK_IMAGE
                  }
                  alt={course?.name || "Golf Course"}
                  fill
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 460px"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex flex-col justify-end p-5">
                  <span className="text-white/70 text-[10px] font-bold tracking-widest uppercase mb-1">
                    CLUBHOUSE
                  </span>
                  <span className="text-white text-lg font-extrabold leading-tight">
                    {course?.name || "—"}
                  </span>
                </div>
              </div>

              {/* Info Rows */}
              <div className="space-y-5">
                {/* Location */}
                <div className="flex gap-4 items-center">
                  <div className="bg-[#f4f5f4] rounded-[14px] p-3 h-[48px] w-[48px] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#10561c]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-[10.5px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                      Location
                    </div>
                    <div className="font-bold text-gray-900 text-[15px]">
                      {course?.location || "—"}
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div className="flex gap-4 items-center">
                  <div className="bg-[#f4f5f4] rounded-[14px] p-3 h-[48px] w-[48px] flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-[#10561c]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-[10.5px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                      Date
                    </div>
                    <div className="font-bold text-gray-900 text-[15px]">
                      {formatDisplayDate(date)}
                    </div>
                  </div>
                </div>

                {/* Time */}
                <div className="flex gap-4 items-center">
                  <div className="bg-[#f4f5f4] rounded-[14px] p-3 h-[48px] w-[48px] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#10561c]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-[10.5px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                      Tee Time
                    </div>
                    <div className="font-bold text-gray-900 text-[15px]">
                      {slot
                        ? `${formatTime24to12(slot.startTime)} — ${slot.session.replace(/_/g, " ")}`
                        : "—"}
                    </div>
                  </div>
                </div>

                {/* Players */}
                <div className="flex gap-4 items-center">
                  <div className="bg-[#f4f5f4] rounded-[14px] p-3 h-[48px] w-[48px] flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-[#10561c]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-[10.5px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                      Capacity
                    </div>
                    <div className="font-bold text-gray-900 text-[15px]">
                      {slot
                        ? `Up to ${slot.capacity - slot.bookedCount} spot(s) available`
                        : "—"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 my-7" />

              {/* Price breakdown */}
              <div className="space-y-2.5 mb-6">
                <div className="flex justify-between text-[14px] text-gray-500">
                  <span>Green Fee</span>
                  <span>${teeTimePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[14px] text-gray-500">
                  <span>Booking Fee</span>
                  <span>${BOOKING_FEE.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[14px] text-gray-500">
                  <span>Taxes (8%)</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-end pt-2 border-t border-dashed border-gray-200">
                  <div>
                    <div className="text-[13px] font-medium text-gray-400">
                      Estimated Total
                    </div>
                    <div className="text-[10.5px] text-gray-400">Pay at Clubhouse</div>
                  </div>
                  <div className="text-[38px] font-black text-[#0a4a1b] leading-none">
                    ${total.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Trust badge */}
              <div className="bg-[#f2f7f3] border border-[#e8efe9] rounded-xl p-4 flex gap-3 items-start">
                <BadgeCheck
                  className="w-5 h-5 text-[#10561c] shrink-0 mt-px"
                  strokeWidth={2.5}
                />
                <p className="text-[13px] text-[#0f4d19] leading-relaxed">
                  <span className="font-bold">Free cancellation</span> up to 24
                  hours before your tee time. No upfront payment required.
                </p>
              </div>

              {/* Encrypted notice */}
              <div className="flex items-center justify-center gap-2 mt-6 text-gray-400 font-bold text-[11px] uppercase tracking-widest">
                <Lock className="w-3.5 h-3.5" strokeWidth={2.5} />
                <span>Encrypted Submission</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
