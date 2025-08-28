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
import {
  monthlyData2025,
  monthlyData2024,
  annualData,
  COLORS,
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

  const monthlyData =
    selectedYear === "2025" ? monthlyData2025 : monthlyData2024;
  const trendData = timeRange === "monthly" ? monthlyData : annualData;
  const currentYearData = annualData.find((d) => d.name === selectedYear);
  const previousYearData = annualData.find(
    (d) => d.name === String(parseInt(selectedYear) - 1)
  );

  useEffect(() => {
    if (currentYearData) {
      setPieData([
        { name: "Scope 1", value: currentYearData.scope1 },
        { name: "Scope 2", value: currentYearData.scope2 },
        { name: "Scope 3", value: currentYearData.scope3 },
      ]);
      setTopSourcesData(
        [
          { name: `การจัดซื้อฯ (S3)`, value: currentYearData.scope3 * 0.6 },
          { name: `การเดินทาง (S3)`, value: currentYearData.scope3 * 0.4 },
          { name: `การใช้ไฟฟ้า (S2)`, value: currentYearData.scope2 },
          { name: `การใช้ยานพาหนะ (S1)`, value: currentYearData.scope1 * 0.6 },
          {
            name: `การใช้เชื้อเพลิง (S1)`,
            value: currentYearData.scope1 * 0.4,
          },
        ].sort((a, b) => b.value - a.value)
      );
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

  return (
    <>
      <DashboardHeader
        title="CFO Manager Dashboard"
        subtitle="สรุปภาพรวมการปล่อยก๊าซเรือนกระจกขององค์กร"
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title={`Total Emissions (${parseInt(selectedYear) + 543})`}
          value={currentYearData?.total || 0}
          unit="tCO2e"
          change={totalChange}
          period={`vs ${parseInt(selectedYear) - 1 + 543}`}
        />
        <StatCard
          title={`Scope 1 Emissions`}
          value={currentYearData?.scope1 || 0}
          unit="tCO2e"
          change={scope1Change}
          period={`vs ${parseInt(selectedYear) - 1 + 543}`}
          clickable={true}
          onClick={() => {
            setPageYear(selectedYear);
            onNavigate("scope1");
          }}
        />
        <StatCard
          title={`Scope 2 Emissions`}
          value={currentYearData?.scope2 || 0}
          unit="tCO2e"
          change={scope2Change}
          period={`vs ${parseInt(selectedYear) - 1 + 543}`}
          clickable={true}
          onClick={() => {
            setPageYear(selectedYear);
            onNavigate("scope2");
          }}
        />
        <StatCard
          title={`Scope 3 Emissions`}
          value={currentYearData?.scope3 || 0}
          unit="tCO2e"
          change={scope3Change}
          period={`vs ${parseInt(selectedYear) - 1 + 543}`}
          clickable={true}
          onClick={() => {
            setPageYear(selectedYear);
            onNavigate("scope3");
          }}
        />
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
                  dx: -30,
                  position: "insideLeft",
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
            สัดส่วนการปล่อย GHG ตาม Scope ({parseInt(selectedYear) + 543})
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
                {pieData.map((index) => (
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
                  offset: -100,
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
                formatter={(value: number) => `${value.toLocaleString()} tCO2e`}
              />
              <Bar dataKey="value" name="Emissions (tCO2e)" fill="#8884d8">
                {topSourcesData.map((index) => (
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
