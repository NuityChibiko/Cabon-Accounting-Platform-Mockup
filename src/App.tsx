import { useState } from "react";
import MainDashboard from "./pages/MainDashboard";
import Scope1DetailsPage from "./pages/Scope1DetailsPage";
import Scope2DetailsPage from "./pages/Scope2DetailsPage";
import Scope3DetailsPage from "./pages/Scope3DetailsPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("main");
  const [pageYear, setPageYear] = useState("2025");

  const navigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "scope1":
        return (
          <Scope1DetailsPage onBack={() => navigate("main")} year={pageYear} />
        );
      case "scope2":
        return (
          <Scope2DetailsPage onBack={() => navigate("main")} year={pageYear} />
        );
      case "scope3":
        return (
          <Scope3DetailsPage onBack={() => navigate("main")} year={pageYear} />
        );
      case "main":
      default:
        return (
          <MainDashboard onNavigate={navigate} setPageYear={setPageYear} />
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-[90rem] mx-auto">{renderPage()}</div>
    </div>
  );
}
