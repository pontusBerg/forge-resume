import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AppDataProvider } from "@/context/AppDataContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { appRoutes } from "@/routes";

import "./App.css";

const router = createBrowserRouter(appRoutes);

function App() {
  return (
    <TooltipProvider>
      <AppDataProvider>
        <RouterProvider router={router} />
      </AppDataProvider>
    </TooltipProvider>
  );
}

export default App;
