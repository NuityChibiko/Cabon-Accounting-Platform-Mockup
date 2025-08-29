import React from "react";

interface Source {
  name: string;
  value: number;
}

interface TopSourcesDisplayProps {
  sources: Source[];
  total: number;
}

const TopSourcesDisplay: React.FC<TopSourcesDisplayProps> = ({
  sources,
  total,
}) => {
  if (!sources || sources.length === 0 || total === 0) {
    return null;
  }

  return (
    <div className="text-xs text-gray-600 pl-4">
      <h4 className="font-semibold mb-1 text-gray-500 text-[14px]">
        Top Emission Sources:
      </h4>
      <ul>
        {sources.slice(0, 3).map((source, index) => (
          <li
            key={index}
            className="flex justify-between items-center space-x-2 "
          >
            <span className="truncate pr-2">{source.name}</span>
            <span className="font-semibold whitespace-nowrap">
              {((source.value / total) * 100).toFixed(0)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSourcesDisplay;
