import React from "react";

interface StatCardProps {
  title: string;
  value: number;
  unit: string;
  change: string;
  period: string;
  onClick?: () => void;
  clickable?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  change,
  period,
  onClick,
  clickable,
}) => (
  <div
    className={`bg-white p-6 rounded-xl shadow-md transition-transform ${
      clickable ? "cursor-pointer hover:scale-105" : ""
    }`}
    onClick={onClick}
  >
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="mt-2 text-3xl font-bold text-gray-900">
      {value.toLocaleString()}
    </p>
    <p className="text-sm text-gray-600">{unit}</p>
    <div
      className={`mt-2 flex items-center text-sm ${
        parseFloat(change) >= 0 ? "text-red-500" : "text-green-500"
      }`}
    >
      {parseFloat(change) >= 0 ? "▲" : "▼"} {Math.abs(parseFloat(change))}%
      <span className="text-gray-500 ml-1">vs {period}</span>
    </div>
  </div>
);

export default StatCard;
