import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AppDataProvider } from "@/context/AppDataContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { appRoutes } from "@/routes";

vi.mock("@/lib/storage", () => ({
  loadStoredAppData: vi.fn(() => null),
  saveAppData: vi.fn(),
}));

function renderApp(initialRoute = "/") {
  const router = createMemoryRouter(appRoutes, { initialEntries: [initialRoute] });

  return render(
    <TooltipProvider>
      <AppDataProvider>
        <RouterProvider router={router} />
      </AppDataProvider>
    </TooltipProvider>,
  );
}

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("navigates between resume and cover letter pages", async () => {
    const user = userEvent.setup();

    renderApp("/");

    expect(screen.queryByLabelText("Cover letter")).not.toBeInTheDocument();
    expect(document.querySelector(".resume-document")).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Cover Letter" }));

    expect(screen.getByLabelText("Cover letter")).toBeVisible();
    expect(screen.getByRole("button", { name: /print cover letter/i })).toBeInTheDocument();
    expect(document.querySelector(".resume-document")).not.toBeInTheDocument();
  });
});
