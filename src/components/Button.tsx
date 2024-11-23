import { cn } from "../lib/utils"

interface ButtonProps {
  title: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  containerClass?: string
  id: string
}
const Button = ({ title, leftIcon, rightIcon, id, containerClass} : ButtonProps) => {
  return (
    <button id={id} className={cn("group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black", containerClass)}>
      {leftIcon}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div>{title}</div>
        {rightIcon}
      </span>
    </button>
  )
}

export default Button