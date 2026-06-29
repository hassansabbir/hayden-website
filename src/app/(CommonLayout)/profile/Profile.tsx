"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Camera, CheckCircle2, Info, Loader2, X } from "lucide-react";
import Image from "next/image";
import useLoginUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { fetchUrl, getMediaUrl } from "@/lib/fetchUrl";
import { toast } from "sonner";

const MAX_AVATAR_SIZE_MB = 5;
const ALLOWED_AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

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
    const [userId, setUserId] = useState("");
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    const avatarInputRef = useRef<HTMLInputElement>(null);
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
                setUserId(res.data._id);
                setAvatarUrl(res.data.avatar?.url ?? null);
            })
            .catch((err: any) => toast.error(err.message || "Failed to load profile."))
            .finally(() => setIsLoadingProfile(false));
    }, [isAuthLoading, isLogin, reset]);

    const handleAvatarSelect = async (file: File) => {
        if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
            toast.error("Please choose a JPEG, PNG, WEBP, or AVIF image.");
            return;
        }
        if (file.size > MAX_AVATAR_SIZE_MB * 1024 * 1024) {
            toast.error(`Image must be smaller than ${MAX_AVATAR_SIZE_MB}MB.`);
            return;
        }

        setIsUploadingAvatar(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("type", "USER_AVATAR");
            formData.append("relatedModel", "User");
            formData.append("relatedTo", userId);

            const uploadResult = await fetchUrl("/media/upload", { method: "POST", body: formData });
            const result = await fetchUrl("/users/me", {
                method: "PATCH",
                body: { avatar: uploadResult.data._id },
            });

            const newAvatarUrl = result.data.avatar?.url ?? null;
            setAvatarUrl(newAvatarUrl);
            updateUser({ avatar: newAvatarUrl });
            toast.success("Profile photo updated.");
        } catch (err: any) {
            toast.error(err.message || "Failed to upload photo.");
        } finally {
            setIsUploadingAvatar(false);
        }
    };

    const handleRemoveAvatar = async () => {
        setIsUploadingAvatar(true);
        try {
            const result = await fetchUrl("/users/me", { method: "PATCH", body: { avatar: null } });
            const newAvatarUrl = result.data.avatar?.url ?? null;
            setAvatarUrl(newAvatarUrl);
            updateUser({ avatar: newAvatarUrl });
            toast.success("Profile photo removed.");
        } catch (err: any) {
            toast.error(err.message || "Failed to remove photo.");
        } finally {
            setIsUploadingAvatar(false);
        }
    };

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
                    <div className="relative w-24 h-24 shrink-0">
                        <div className="w-24 h-24 rounded-2xl ring-4 ring-slate-50 bg-[#0B4619] flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                            {avatarUrl ? (
                                <Image
                                    src={getMediaUrl(avatarUrl)}
                                    alt={user?.name || "Profile photo"}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                getInitials(user?.name)
                            )}
                            {isUploadingAvatar && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                                </div>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => avatarInputRef.current?.click()}
                            disabled={isUploadingAvatar}
                            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#0B4619] text-white flex items-center justify-center ring-4 ring-white hover:bg-[#083512] transition-colors disabled:opacity-60"
                            aria-label="Upload profile photo"
                        >
                            <Camera size={14} />
                        </button>

                        {avatarUrl && (
                            <button
                                type="button"
                                onClick={handleRemoveAvatar}
                                disabled={isUploadingAvatar}
                                className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white text-[#64748B] flex items-center justify-center ring-1 ring-slate-200 hover:bg-slate-50 hover:text-red-500 transition-colors disabled:opacity-60"
                                aria-label="Remove profile photo"
                            >
                                <X size={12} />
                            </button>
                        )}

                        <input
                            ref={avatarInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/avif"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleAvatarSelect(file);
                                e.target.value = "";
                            }}
                        />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-bold text-[#0B3D2E] mb-1">
                            Your Profile
                        </h3>
                        <p className="text-[#94A3B8] text-sm">
                            Click the camera icon to upload a profile photo, or update your name and phone number below.
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
