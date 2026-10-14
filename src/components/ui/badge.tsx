import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-slate-900 text-white shadow hover:bg-slate-800",
        secondary:
          "border-transparent bg-slate-100 text-slate-800 hover:bg-slate-200",
        destructive:
          "border-transparent bg-red-100 text-red-700 hover:bg-red-200",
        outline: "text-slate-700 border-slate-200",
        critical: "border-red-200 bg-red-50 text-red-700 font-semibold",
        high: "border-orange-200 bg-orange-50 text-orange-700 font-semibold",
        medium: "border-amber-200 bg-amber-50 text-amber-700 font-semibold",
        low: "border-blue-200 bg-blue-50 text-blue-700 font-semibold",
        success: "border-emerald-200 bg-emerald-50 text-emerald-700 font-semibold",
        monitoring: "border-purple-200 bg-purple-50 text-purple-700 font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
