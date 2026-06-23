import { cn } from "@/lib/utils";

type SectionTitleProps = {
  title: string;
  className?: string;
};

export function SectionTitle({ title, className }: SectionTitleProps) {
  return (
    <div className={cn("flex items-center gap-8", className)}>
      <div className="shrink-0 whitespace-nowrap font-semibold text-sm text-neutral-800">
        {title}
      </div>
      <div className="h-px min-w-0 flex-1 bg-border" />
    </div>
  );
}
