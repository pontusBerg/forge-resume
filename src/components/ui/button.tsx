import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border border-[color-mix(in_oklch,var(--primary),black_10%)] bg-gradient-to-b from-[color-mix(in_oklch,var(--primary),white_14%)] to-[color-mix(in_oklch,var(--primary),black_6%)] text-primary-foreground shadow-[0_1px_0_0_color-mix(in_oklch,var(--primary),white_28%)_inset,0_1px_2px_rgba(0,0,0,0.07),0_2px_3px_-1px_rgba(0,0,0,0.05)] hover:from-[color-mix(in_oklch,var(--primary),white_10%)] hover:to-[color-mix(in_oklch,var(--primary),black_4%)] hover:shadow-[0_1px_0_0_color-mix(in_oklch,var(--primary),white_22%)_inset,0_2px_4px_rgba(0,0,0,0.09)] active:border-[color-mix(in_oklch,var(--primary),black_14%)] active:from-[color-mix(in_oklch,var(--primary),black_4%)] active:to-[color-mix(in_oklch,var(--primary),black_10%)] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.14)]",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "border border-[color-mix(in_oklch,var(--secondary),black_5%)] bg-gradient-to-b from-[color-mix(in_oklch,var(--secondary),white_6%)] to-secondary text-secondary-foreground  hover:from-[color-mix(in_oklch,var(--secondary),white_4%)] hover:to-[color-mix(in_oklch,var(--secondary),var(--foreground)_3%)] hover:shadow-[0_1px_0_0_color-mix(in_oklch,var(--secondary),white_12%)_inset,0_1px_2px_rgba(0,0,0,0.05)] active:border-[color-mix(in_oklch,var(--secondary),black_8%)] active:from-[color-mix(in_oklch,var(--secondary),var(--foreground)_2%)] active:to-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] active:shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)] aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
        lg: "h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-9",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
