import { Outlet, useLocation } from "react-router-dom";

import { AppShell } from "@/components/layout/AppShell";
import { useAppData } from "@/context/AppDataContext";

function printDocument(printTarget: "resume" | "cover-letter", title: string) {
  const originalTitle = document.title;

  document.body.dataset.printTarget = printTarget;
  document.title = title;
  window.setTimeout(() => window.print(), 50);
  window.addEventListener(
    "afterprint",
    () => {
      document.title = originalTitle;
      delete document.body.dataset.printTarget;
    },
    { once: true },
  );
}

export function AppLayout() {
  const location = useLocation();
  const { data } = useAppData();
  const candidateName = data.candidate.name || (location.pathname === "/" ? "Resume" : "Candidate");

  const onPrint = () => {
    if (location.pathname === "/") {
      printDocument("resume", `${candidateName} Resume`);
      return;
    }

    if (location.pathname === "/cover-letter") {
      printDocument("cover-letter", `${candidateName} Cover Letter`);
    }
  };

  return (
    <AppShell onPrint={onPrint}>
      <div
        key={location.pathname}
        className="page-content flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <Outlet />
      </div>
    </AppShell>
  );
}
