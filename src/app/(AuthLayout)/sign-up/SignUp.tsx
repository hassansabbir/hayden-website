"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import InputField from "@/components/form/InputField";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFieldPassword from "@/components/form/InputFieldPassword";
import BottomDot from "../BottomDot";
import { useRouter } from "next/navigation";
import useLoginUser from "@/hooks/useUser";
import Link from "next/link";

const signinSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  password: z.string().min(6),
});

type SigninFormValues = z.infer<typeof signinSchema>

const SignUp = () => {
  const router = useRouter();
  const { login } = useLoginUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const onSubmit = (data: any) => {
    console.log(data);
    login();
    router.replace('/');
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[500px] rounded-[20px] bg-white p-4 lg:p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)] border border-gray-100"
      >
        <div className="mb-10">
          <h2 className="text-[40px] font-bold tracking-tight text-[#111827]">
            Create Account
          </h2>
          <p className="mt-2 text-[#6B7280] text-lg">
            Enter your details to create your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField title="Full Name  " name="name" placeholder="name@domain.com" register={register} error={errors.name} />
          <InputField title="Email Address" name="email" placeholder="name@domain.com" register={register} error={errors.email} />
          <InputField title="Phone Number" name="phone" placeholder="••••••••" register={register} error={errors.phone} />
          <div className="grid grid-cols-2 gap-4">
            <InputFieldPassword title="Password" name="password" placeholder="••••••••" register={register} error={errors.password} />
            <InputFieldPassword title="Password" name="password" placeholder="••••••••" register={register} error={errors.password} />
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-2xl bg-[#064e3b] py-5 text-[17px] font-bold text-white transition-all hover:bg-[#042f24] hover:shadow-lg active:scale-[0.99]"
          >
            Sign In
          </button>
          <p className="text-center">
            Already have an account? <Link href="/sign-in" className="text-[#064e3b] font-bold">Sign In</Link>
          </p>
        </form>
      </motion.div>
      {/* Footer Dots */}
      <BottomDot activeIndex={1} />
    </>
  );
};

export default SignUp;