"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2, Info, Loader2 } from "lucide-react";
import useLoginUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { fetchUrl } from "@/lib/fetchUrl";
import { toast } from "sonner";

interface ProfileFormValues {
    fullName: string;
    phone: string;
}

const getInitials = (name?: string) =>
    (name || "")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("") || "U";

const Profile = () => {
    const router = useRouter();
    const { isLogin, isLoading: isAuthLoading, user, updateUser } = useLoginUser();
    const [email, setEmail] = useState("");
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfileFormValues>({
        defaultValues: {
            fullName: "",
            phone: "",
        },
    });

    useEffect(() => {
        if (!isAuthLoading && !isLogin) {
            router.push('/sign-in');
        }
    }, [isAuthLoading, isLogin, router]);

    useEffect(() => {
        // Wait for the real session check, not just the optimistic cached
        // `user` — fetching before refreshSession sets the access token
        // would race ahead with no Authorization header and 401.
        if (isAuthLoading || !isLogin) return;

        fetchUrl("/users/me")
            .then((res) => {
                reset({ fullName: res.data.fullName, phone: res.data.phone || "" });
                setEmail(res.data.email);
            })
            .catch((err: any) => toast.error(err.message || "Failed to load profile."))
            .finally(() => setIsLoadingProfile(false));
    }, [isAuthLoading, isLogin, reset]);

    const onSubmit = async (data: ProfileFormValues) => {
        setIsSubmitting(true);
        try {
            const result = await fetchUrl("/users/me", {
                method: "PATCH",
                body: { fullName: data.fullName, phone: data.phone },
            });
            updateUser({ name: result.data.fullName, phone: result.data.phone });
            toast.success("Profile updated successfully.");
        } catch (err: any) {
            toast.error(err.message || "Failed to update profile.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isAuthLoading || !isLogin) return null;

    if (isLoadingProfile) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-24 flex items-center justify-center text-[#94A3B8]">
                <Loader2 className="w-6 h-6 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Header Section */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-[#0B3D2E] mb-2">
                    Personal Information
                </h1>
                <p className="text-[#64748B] text-lg max-w-2xl leading-relaxed">
                    Manage your personal details and how other members see you across The
                    Modern Clubhouse ecosystem.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Profile Avatar Card */}
                <div className="bg-white p-8 rounded-[1.5rem] shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-slate-50 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-24 h-24 rounded-2xl ring-4 ring-slate-50 bg-[#0B4619] flex items-center justify-center text-white text-2xl font-bold">
                        {getInitials(user?.name)}
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-bold text-[#0B3D2E] mb-1">
                            Your Profile
                        </h3>
                        <p className="text-[#94A3B8] text-sm">
                            Update your name and phone number below.
                        </p>
                    </div>
                </div>

                {/* Input Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                    {/* Full Name */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase px-1">
                            Full Name
                        </label>
                        <input
                            {...register("fullName", { required: "Full name is required" })}
                            className="w-full bg-[#F8FAFC] border-none rounded-2xl px-5 py-4 text-[#1E293B] font-medium focus:ring-2 focus:ring-[#0B4619]/10 transition-all placeholder:text-slate-300"
                            placeholder="Enter your full name"
                        />
                        {errors.fullName && (
                            <p className="text-sm text-red-500 px-1">{errors.fullName.message}</p>
                        )}
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase px-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                value={email}
                                readOnly
                                className="w-full bg-[#F1F5F9] border-none rounded-2xl px-5 py-4 text-[#64748B] font-medium cursor-not-allowed"
                            />
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[#22C55E]">
                                <CheckCircle2 size={20} />
                            </div>
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase px-1">
                            Phone Number
                        </label>
                        <input
                            {...register("phone")}
                            className="w-full bg-[#F8FAFC] border-none rounded-2xl px-5 py-4 text-[#1E293B] font-medium focus:ring-2 focus:ring-[#0B4619]/10 transition-all"
                            placeholder="Enter your phone number"
                        />
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-slate-100 gap-6">
                    <div className="flex items-center gap-3 text-[#94A3B8]">
                        <Info size={16} />
                        <p className="text-xs leading-none">
                            Your data is stored securely in accordance with our Privacy Policy.
                        </p>
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto px-10 py-4 bg-[#0B4619] text-white rounded-2xl font-bold text-base hover:bg-[#083512] transition-all shadow-lg shadow-green-900/10 hover:translate-y-[-2px] disabled:opacity-60 disabled:translate-y-0"
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
