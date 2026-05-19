"use client"
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const BackButton = ({ redirectUrl, title }: { redirectUrl?: string, title?: string }) => {
  const router = useRouter();
  return (
    < div className="flex items-center gap-4 mb-8" >
      <button
        onClick={() => redirectUrl ? router.push(redirectUrl) : router.back()}
        className="h-10 w-10 flex items-center justify-center bg-white border border-gray-100 rounded-full shadow-sm hover:bg-gray-50 transition-all cursor-pointer">
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </button>
      <h1 className="text-[20px] font-bold text-[#1A2B3C]">{title}</h1>
    </div >
  )
}

export default BackButton