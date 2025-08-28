import React from "react";
import { ChevronDown, ArrowLeft } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  timeRange: string;
  setTimeRange: (range: "monthly" | "annually") => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  onBack?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  timeRange,
  setTimeRange,
  selectedYear,
  setSelectedYear,
  onBack,
}) => (
  <div className="flex flex-col md:flex-row justify-between items-start mb-8">
    <div className="flex items-center gap-4">
      {onBack && (
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-gray-800 transition"
          aria-label="Back"
        >
          <ArrowLeft size={28} />
        </button>
      )}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
    <div className="flex items-center gap-2 mt-4 md:mt-0 self-start md:self-center">
      <div className="flex items-center bg-white rounded-lg shadow-sm">
        <button
          onClick={() => setTimeRange("monthly")}
          className={`px-4 py-2 rounded-l-lg text-sm font-semibold transition ${
            timeRange === "monthly"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          รายเดือน
        </button>
        <button
          onClick={() => setTimeRange("annually")}
          className={`px-4 py-2 rounded-r-lg text-sm font-semibold transition ${
            timeRange === "annually"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          รายปี
        </button>
      </div>
      <div className="relative">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="appearance-none w-full md:w-32 bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        >
          <option value="2025">2568</option>
          <option value="2024">2567</option>
          <option value="2023">2566</option>
          <option value="2022">2565</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  </div>
);

export default DashboardHeader;
