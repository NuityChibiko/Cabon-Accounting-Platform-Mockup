import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import type { PieLabelRenderProps } from "recharts";
import StatCard from "../components/StatCard";
import DashboardHeader from "../components/DashboardHeader";
import TopSourcesDisplay from "../components/TopSourcesDisplay";
import {
  monthlyData2025,
  monthlyData2024,
  annualData,
  COLORS,
  scope1DetailsData,
  scope2DetailsData,
  scope3DetailsData,
} from "../data/mockData";

interface MainDashboardProps {
  onNavigate: (page: string) => void;
  setPageYear: (year: string) => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({
  onNavigate,
  setPageYear,
}) => {
  const [timeRange, setTimeRange] = useState<"monthly" | "annually">(
    "annually"
  );
  const [selectedYear, setSelectedYear] = useState("2025");

  const [pieData, setPieData] = useState<{ name: string; value: number }[]>([]);
  const [topSourcesData, setTopSourcesData] = useState<
    { name: string; value: number }[]
  >([]);

  const currentYearData = annualData.find((d) => d.name === selectedYear);
  const previousYearData = annualData.find(
    (d) => d.name === String(parseInt(selectedYear) - 1)
  );

  // --- START: Chart Data Processing Logic ---
  const getTrendData = () => {
    // If user selects "annually", return the annual data directly.
    if (timeRange === "annually") {
      return annualData;
    }

    // --- Logic for processing MONTHLY data ---
    const allMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonthIndex = new Date("2025-09-22").getMonth();

    const sourceMonthlyData =
      selectedYear === "2025" ? monthlyData2025 : monthlyData2024;
    const fullYearTargetData =
      selectedYear === "2025"
        ? [
            ...monthlyData2025,
            { name: "Sep", target: 22091 },
            { name: "Oct", target: 21818 },
            { name: "Nov", target: 21545 },
            { name: "Dec", target: 21273 },
          ]
        : monthlyData2024;

    // Create a new data array for all 12 months.
    const monthlyChartData = allMonths.map((month, index) => {
      const existingData = sourceMonthlyData.find((d) => d.name === month);
      const targetDataPoint = fullYearTargetData.find((d) => d.name === month);
      const isFutureMonthInCurrentYear =
        selectedYear === "2025" && index > currentMonthIndex;

      return {
        name: month,
        total:
          existingData && !isFutureMonthInCurrentYear
            ? existingData.total
            : null,
        target: targetDataPoint ? targetDataPoint.target : 0,
      };
    });

    return monthlyChartData;
  };

  const trendData = getTrendData();
  // --- END: Chart Data Processing Logic ---

  useEffect(() => {
    if (currentYearData) {
      setPieData([
        { name: "SCOPE 1", value: currentYearData.scope1 },
        { name: "SCOPE 2", value: currentYearData.scope2 },
        { name: "SCOPE 3", value: currentYearData.scope3 },
      ]);

      const s1Data = scope1DetailsData[selectedYear];
      const s2Data = scope2DetailsData[selectedYear];
      const s3Data = scope3DetailsData[selectedYear];

      const allSources: { name: string; value: number }[] = [];

      // Corrected check for s1Data and its breakdown property
      if (s1Data && s1Data.breakdown) {
        s1Data.breakdown.forEach((item) => {
          allSources.push({
            name: `${item.item} (S1)`,
            value: item.value,
          });
        });
      }
      if (s2Data) {
        s2Data.categories.forEach((item) => {
          allSources.push({ name: `${item.name} (S2)`, value: item.value });
        });
      }
      if (s3Data) {
        s3Data.categories.forEach((item) => {
          allSources.push({ name: `${item.name} (S3)`, value: item.value });
        });
      }

      const newTopSources = allSources
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

      setTopSourcesData(newTopSources);
    }
  }, [selectedYear, currentYearData]);

  const calculateChange = (current?: number, previous?: number) => {
    if (current === undefined || previous === undefined || previous === 0)
      return "0.0";
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  const totalChange = calculateChange(
    currentYearData?.total,
    previousYearData?.total
  );
  const scope1Change = calculateChange(
    currentYearData?.scope1,
    previousYearData?.scope1
  );
  const scope2Change = calculateChange(
    currentYearData?.scope2,
    previousYearData?.scope2
  );
  const scope3Change = calculateChange(
    currentYearData?.scope3,
    previousYearData?.scope3
  );

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = (props: PieLabelRenderProps) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
    if (
      cx === undefined ||
      cy === undefined ||
      midAngle === undefined ||
      innerRadius === undefined ||
      outerRadius === undefined ||
      percent === undefined
    )
      return null;
    const numInnerRadius = Number(innerRadius);
    const numOuterRadius = Number(outerRadius);
    const radius = numInnerRadius + (numOuterRadius - numInnerRadius) * 0.6;
    const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
    const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const scope1TopSources = scope1DetailsData[selectedYear]?.categories.sort(
    (a, b) => b.value - a.value
  );
  const scope2TopSources = scope2DetailsData[selectedYear]?.categories.sort(
    (a, b) => b.value - a.value
  );
  const scope3TopSources = scope3DetailsData[selectedYear]?.categories.sort(
    (a, b) => b.value - a.value
  );

  return (
    <>
      <DashboardHeader
        title="ชื่อบริษัท"
        subtitle="สรุปภาพรวมการปล่อยก๊าซเรือนกระจกขององค์กร"
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-md transition-transform ">
          <StatCard
            title={`Total Emissions (${parseInt(selectedYear) + 543})`}
            value={currentYearData?.total || 0}
            unit="tCO2e"
            change={totalChange}
            period={`vs ${parseInt(selectedYear) - 1 + 543}`}
          />
        </div>

        <div
          className="bg-white p-4 rounded-xl shadow-md transition-transform hover:scale-105 cursor-pointer flex justify-between items-start gap-2"
          onClick={() => {
            setPageYear(selectedYear);
            onNavigate("scope1");
          }}
        >
          <StatCard
            title={`SCOPE 1 Emissions`}
            value={currentYearData?.scope1 || 0}
            unit="tCO2e"
            change={scope1Change}
            period={`vs ${parseInt(selectedYear) - 1 + 543}`}
          />
          <div className="self-end">
            {scope1TopSources && (
              <TopSourcesDisplay
                sources={scope1TopSources}
                total={currentYearData?.scope1 || 0}
              />
            )}
          </div>
        </div>

        <div
          className="bg-white p-4 rounded-xl shadow-md transition-transform hover:scale-105 cursor-pointer flex justify-between items-start gap-2"
          onClick={() => {
            setPageYear(selectedYear);
            onNavigate("scope2");
          }}
        >
          <StatCard
            title={`SCOPE 2 Emissions`}
            value={currentYearData?.scope2 || 0}
            unit="tCO2e"
            change={scope2Change}
            period={`vs ${parseInt(selectedYear) - 1 + 543}`}
          />
          <div className="self-end">
            {scope2TopSources && (
              <TopSourcesDisplay
                sources={scope2TopSources}
                total={currentYearData?.scope2 || 0}
              />
            )}
          </div>
        </div>

        <div
          className="bg-white p-4 rounded-xl shadow-md transition-transform hover:scale-105 cursor-pointer flex justify-between items-start gap-2"
          onClick={() => {
            setPageYear(selectedYear);
            onNavigate("scope3");
          }}
        >
          <StatCard
            title={`SCOPE 3 Emissions`}
            value={currentYearData?.scope3 || 0}
            unit="tCO2e"
            change={scope3Change}
            period={`vs ${parseInt(selectedYear) - 1 + 543}`}
          />
          <div className="self-end">
            {scope3TopSources && (
              <TopSourcesDisplay
                sources={scope3TopSources}
                total={currentYearData?.scope3 || 0}
              />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-semibold text-gray-800 mb-4">
            แนวโน้มการปล่อย GHG (
            {timeRange === "monthly"
              ? `รายเดือน ปี ${parseInt(selectedYear) + 543}`
              : "รายปี"}
            )
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={trendData}
              margin={{ top: 5, right: 20, left: 50, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                tickFormatter={(tick) =>
                  timeRange === "annually" ? parseInt(tick) + 543 : tick
                }
                tick={{ fontSize: 12 }}
                label={{
                  value: timeRange === "annually" ? "Year" : "Month",
                  position: "insideBottom",
                  offset: -15,
                  style: {
                    textAnchor: "middle",
                    fontSize: "14px",
                    fill: "#666",
                  },
                }}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                label={{
                  value: "GHG (ton CO2eq)",
                  angle: -90,
                  position: "insideLeft",
                  offset: -25,
                  style: {
                    textAnchor: "middle",
                    fontSize: "14px",
                    fill: "#666",
                  },
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "14px" }}
                verticalAlign="top"
                align="right"
              />
              <Line
                type="monotone"
                dataKey="total"
                name="Total Emissions"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                connectNulls={false} // This prop stops the line from connecting over null data points
              />
              <Line
                type="monotone"
                dataKey="target"
                name="เป้าหมายการลด"
                stroke="#F43F5E"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-semibold text-gray-800 mb-4">
            สัดส่วนการปล่อย GHG ตาม SCOPE ({parseInt(selectedYear) + 543})
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={110}
                fill="#8884d8"
                dataKey="value"
                label={renderCustomizedLabel}
              >
                {pieData.map((_entry, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${value.toLocaleString()} tCO2e`,
                  name,
                ]}
              />
              <Legend wrapperStyle={{ fontSize: "14px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-semibold text-gray-800 mb-4">
            5 แหล่งที่มาหลักของการปล่อย GHG ({parseInt(selectedYear) + 543})
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              layout="vertical"
              data={topSourcesData}
              margin={{ top: 5, right: 30, left: 150, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 12 }}
                label={{
                  value: "GHG (ton CO2eq)",
                  position: "insideBottom",
                  offset: -20,
                  style: {
                    textAnchor: "middle",
                    fontSize: "14px",
                    fill: "#666",
                  },
                }}
              />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fontSize: 12, width: 150 }}
                label={{
                  value: "แหล่งที่มา",
                  angle: -90,
                  position: "insideLeft",
                  offset: -120,
                  style: {
                    textAnchor: "middle",
                    fontSize: "16px",
                    fill: "#666",
                  },
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => `${value.toLocaleString()} tCO2e`}
              />
              <Bar dataKey="value" name="Emissions (tCO2e)" fill="#8884d8">
                {topSourcesData.map((_entry, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default MainDashboard;
