import { Route, Routes } from "react-router-dom";

import { AppDataProvider } from "@/context/AppDataContext";
import { CoverLetterPage } from "@/pages/CoverLetterPage";
import { ResumePage } from "@/pages/ResumePage";
import { TooltipProvider } from "@/components/ui/tooltip";

import "./App.css";

function App() {
  return (
    <TooltipProvider>
      <AppDataProvider>
        <Routes>
          <Route path="/" element={<ResumePage />} />
          <Route path="/cover-letter" element={<CoverLetterPage />} />
        </Routes>
      </AppDataProvider>
    </TooltipProvider>
  );
}

export default App;
