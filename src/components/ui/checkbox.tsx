"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";

import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-5 shrink-0 items-center justify-center rounded-[4px] border border-input shadow-xs transition-shadow outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-[color-mix(in_oklch,var(--primary),black_10%)] data-checked:bg-gradient-to-b data-checked:from-[color-mix(in_oklch,var(--primary),white_14%)] data-checked:to-[color-mix(in_oklch,var(--primary),black_6%)] data-checked:text-primary-foreground data-checked:shadow-[0_1px_0_0_color-mix(in_oklch,var(--primary),white_28%)_inset,0_1px_2px_rgba(0,0,0,0.07),0_2px_3px_-1px_rgba(0,0,0,0.05)]",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
