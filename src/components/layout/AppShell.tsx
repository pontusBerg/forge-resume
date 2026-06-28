import { DownloadIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { ResumeUploadButton } from "@/components/resume/ResumeUploadButton";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { useAppData } from "@/context/AppDataContext";
import { cn } from "@/lib/utils";

type AppShellProps = {
  children: ReactNode;
  onPrint: () => void;
};

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
    isActive
      ? "bg-background text-foreground shadow-sm"
      : "text-muted-foreground hover:text-foreground",
  );

export function AppShell({ children, onPrint }: AppShellProps) {
  const location = useLocation();
  const { importCandidate } = useAppData();
  const isResume = location.pathname === "/";
  const isCoverLetter = location.pathname === "/cover-letter";

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-muted/30 text-foreground">
      <section className="no-print mx-auto grid w-full shrink-0">
        <Card className="rounded-none border-b border-border py-3">
          <CardHeader className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-6">
              <NavLink to="/">
                <img src="/logo.svg" alt="Resume Creator" className="size-28 h-auto shrink-0" />
              </NavLink>
              <nav className="flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-1">
                <NavLink to="/" className={navLinkClass} end viewTransition>
                  Resume
                </NavLink>
                <NavLink to="/cover-letter" className={navLinkClass} viewTransition>
                  Cover Letter
                </NavLink>
              </nav>
            </div>
            <div className="flex flex-wrap gap-2">
              {isResume ? <ResumeUploadButton onImport={importCandidate} /> : null}
              <Button type="button" variant="default" onClick={onPrint}>
                {isResume ? "Print resume" : isCoverLetter ? "Print cover letter" : "Print"}
                <HugeiconsIcon icon={DownloadIcon} />
              </Button>
            </div>
          </CardHeader>
        </Card>
      </section>

      {children}
    </main>
  );
}
