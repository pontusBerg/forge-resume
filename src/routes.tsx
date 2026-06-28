import type { RouteObject } from "react-router-dom";

import { AppLayout } from "@/pages/AppLayout";
import { CoverLetterPage } from "@/pages/CoverLetterPage";
import { ResumePage } from "@/pages/ResumePage";

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <ResumePage /> },
      { path: "cover-letter", element: <CoverLetterPage /> },
    ],
  },
];
