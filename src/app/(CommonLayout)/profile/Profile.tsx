"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2, Info, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import useLoginUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";

interface ProfileFormValues {
    fullName: string;
    memberId: string;
    email: string;
    phoneNumber: string;
}

const Profile = () => {
    const router = useRouter();
    const { isLogin } = useLoginUser();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormValues>({
        defaultValues: {
            fullName: "Alexander Sterling",
            memberId: "CH-99210",
            email: "alex.sterling@clubhouse.com",
            phoneNumber: "+1 (555) 234-8890",
        },
    });

    const onSubmit = (data: ProfileFormValues) => {
        console.log("Form Data:", data);
        // Add save logic here
    };

    useEffect(() => {
        if (!isLogin) {
            router.push('/sign-in');
        }
    }, [isLogin]);

    if (!isLogin) return null;

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
                {/* Profile Photo Card */}
                <div className="bg-white p-8 rounded-[1.5rem] shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-slate-50 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-slate-50">
                            <Image
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop"
                                alt="Profile"
                                width={96}
                                height={96}
                                className="object-cover"
                            />
                        </div>
                        <button
                            type="button"
                            className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#0B4619] text-white rounded-full flex items-center justify-center border-2 border-white hover:bg-[#083512] transition-colors shadow-sm"
                        >
                            <Pencil size={14} />
                        </button>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-bold text-[#0B3D2E] mb-1">
                            Your Profile Photo
                        </h3>
                        <p className="text-[#94A3B8] text-sm mb-5">
                            Recommended: 800×800px. JPG or PNG.
                        </p>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                            <button
                                type="button"
                                className="px-6 py-2.5 bg-[#0B4619] text-white rounded-xl font-bold text-sm hover:bg-[#083512] transition-colors"
                            >
                                Upload New
                            </button>
                            <button
                                type="button"
                                className="px-6 py-2.5 bg-[#F1F5F9] text-[#475569] rounded-xl font-bold text-sm hover:bg-[#E2E8F0] transition-colors"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>

                {/* Input Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                    {/* Full Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase px-1">
                            Full Name
                        </label>
                        <input
                            {...register("fullName")}
                            className="w-full bg-[#F8FAFC] border-none rounded-2xl px-5 py-4 text-[#1E293B] font-medium focus:ring-2 focus:ring-[#0B4619]/10 transition-all placeholder:text-slate-300"
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Member ID */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase px-1">
                            Member ID
                        </label>
                        <input
                            {...register("memberId")}
                            readOnly
                            className="w-full bg-[#F1F5F9] border-none rounded-2xl px-5 py-4 text-[#64748B] font-medium cursor-not-allowed"
                        />
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase px-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                {...register("email")}
                                className="w-full bg-[#F8FAFC] border-none rounded-2xl px-5 py-4 text-[#1E293B] font-medium focus:ring-2 focus:ring-[#0B4619]/10 transition-all"
                                placeholder="Enter your email"
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
                            {...register("phoneNumber")}
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
                        className="w-full md:w-auto px-10 py-4 bg-[#0B4619] text-white rounded-2xl font-bold text-base hover:bg-[#083512] transition-all shadow-lg shadow-green-900/10 hover:translate-y-[-2px]"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
