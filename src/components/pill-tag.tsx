"use client"

type PillVariant = "blue" | "yellow" | "green" | "red" | "purple";

const variantStyles: Record<PillVariant, string> = {
  blue: "bg-cyan-200 text-black hover:bg-gray-100",
  yellow: "bg-yellow-200 text-black hover:bg-gray-100",
  green: "bg-green-400 text-black hover:bg-gray-100",
  red: "bg-red-200 text-black hover:bg-gray-100",
  purple: "bg-purple-200 text-black hover:bg-gray-100",
};

interface PillTagProp {
  variant: PillVariant;
  children?: React.ReactNode;
}

export function PillTag({ variant, children }: PillTagProp) {
  return (
    <div className={`rounded-full text-sm py-2 px-4 cursor-pointer select-none ${variantStyles[variant]}`}>
      {children}
    </div>
  )
}

