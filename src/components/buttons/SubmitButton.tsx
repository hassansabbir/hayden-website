import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const SubmitButton = ({ isSubmitting, title, className }: { isSubmitting: boolean, title: string, className?: string }) => {
  return (
    <button type="submit" disabled={isSubmitting} className={cn(`w-full rounded-2xl bg-[#064e3b] py-2 md:py-3 lg:py-4 text-[17px] font-bold text-white transition-all hover:bg-[#042f24] hover:shadow-lg active:scale-[0.99]`, className)}>
      {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
      <span>{isSubmitting ? "Processing..." : title}</span>
    </button>
  )
}

export default SubmitButton