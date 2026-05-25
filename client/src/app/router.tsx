import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/home/HomePage";
import { SourcesPage } from "../pages/sources/SourcesPage";
import { SummaryPage } from "../pages/summary/SummaryPage";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sources" element={<SourcesPage />} />
      <Route path="/summary/:id" element={<SummaryPage />} />
    </Routes>
  );
}
