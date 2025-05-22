import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex justify-center items-center gap-1 px-2 py-0.5 border border-slate-200 focus-visible:border-slate-950 dark:border-slate-800 dark:focus-visible:border-slate-300 aria-invalid:border-red-500 dark:aria-invalid:border-red-900 rounded-md aria-invalid:ring-red-500/20 focus-visible:ring-[3px] focus-visible:ring-slate-950/50 dark:aria-invalid:ring-red-500/40 dark:aria-invalid:ring-red-900/20 dark:focus-visible:ring-slate-300/50 dark:dark:aria-invalid:ring-red-900/40 w-fit [&>svg]:size-3 overflow-hidden font-medium text-xs whitespace-nowrap transition-[color,box-shadow] [&>svg]:pointer-events-none shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-slate-900 text-slate-50 [a&]:hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:[a&]:hover:bg-slate-50/90",
        secondary:
          "border-transparent bg-slate-100 text-slate-900 [a&]:hover:bg-slate-100/90 dark:bg-slate-800 dark:text-slate-50 dark:[a&]:hover:bg-slate-800/90",
        destructive:
          "border-transparent bg-red-500 text-white [a&]:hover:bg-red-500/90 focus-visible:ring-red-500/20 dark:focus-visible:ring-red-500/40 dark:bg-red-500/60 dark:bg-red-900 dark:[a&]:hover:bg-red-900/90 dark:focus-visible:ring-red-900/20 dark:dark:focus-visible:ring-red-900/40 dark:dark:bg-red-900/60",
        outline:
          "text-slate-950 [a&]:hover:bg-slate-100 [a&]:hover:text-slate-900 dark:text-slate-50 dark:[a&]:hover:bg-slate-800 dark:[a&]:hover:text-slate-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
