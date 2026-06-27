import { Route, Routes } from "react-router-dom";

import { AppDataProvider } from "@/context/AppDataContext";
import { CoverLetterPage } from "@/pages/CoverLetterPage";
import { ResumePage } from "@/pages/ResumePage";

import "./App.css";

function App() {
  return (
    <AppDataProvider>
      <Routes>
        <Route path="/" element={<ResumePage />} />
        <Route path="/cover-letter" element={<CoverLetterPage />} />
      </Routes>
    </AppDataProvider>
  );
}

export default App;
