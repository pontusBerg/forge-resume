import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { ExportCheckResult } from "@/lib/resume-countries";
import { Alert02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type ExportCheckDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  failures: ExportCheckResult[];
  onProceed: () => void;
};

export function ExportCheckDialog({
  open,
  onOpenChange,
  failures,
  onProceed,
}: ExportCheckDialogProps) {
  const handleProceed = () => {
    onProceed();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="mb-0 rounded-lg border border-border bg-muted/60 text-amber-600 dark:text-amber-500">
            <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="size-7" />
          </AlertDialogMedia>
          <AlertDialogTitle>Resume may not match local expectations</AlertDialogTitle>
          <AlertDialogDescription>
            Review these items for your target country before printing.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="rounded-lg border border-border/80 bg-muted/30 p-4">
          <ul className="flex flex-col gap-3">
            {failures.map((failure) => (
              <li key={failure.id} className="flex gap-2.5 text-sm leading-snug text-foreground/90">
                <span
                  aria-hidden
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground"
                />
                <span>{failure.message}</span>
              </li>
            ))}
          </ul>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel variant="secondary">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleProceed}>Print anyway</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
