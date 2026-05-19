import { cn } from '@/lib/utils'
import Link from 'next/link'

const NavigateButton = ({ url, title, className }: { url: string, title: string, className?: string }) => {
  return (
    <Link href={url} className={cn(`bg-[#29BDBE] text-white hover:bg-[#25aaaa] transition-colors rounded-lg px-12 py-3.5 text-sm font-semibold min-w-[160px] shadow-sm transform active:scale-95`, className)}>
      {title}
    </Link>
  )
}

export default NavigateButton