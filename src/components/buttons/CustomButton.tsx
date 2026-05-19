import { cn } from '@/lib/utils'

interface CustomButtonProps {
  onClick?: () => void;
  title: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const CustomButton = ({ onClick, title, className, type = "button" }: CustomButtonProps) => {
  return (
    <button
      type={type}
      onClick={() => onClick ? onClick() : null}
      className={cn(`bg-[#29BDBE] text-white hover:bg-[#25aaaa] transition-colors rounded-lg px-12 py-3.5 text-sm font-semibold min-w-[160px] shadow-sm transform active:scale-95`, className)}
    >
      {title}
    </button>
  )
}

export default CustomButton;