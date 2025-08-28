import React, { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import type { PieLabelRenderProps } from "recharts";
import DashboardHeader from "../components/DashboardHeader";
import {
  scope1DetailsData,
  scope1MonthlyDetailsData,
  COLORS,
} from "../data/mockData";

interface Scope1DetailsPageProps {
  onBack: () => void;
  year: string;
}

const Scope1DetailsPage: React.FC<Scope1DetailsPageProps> = ({
  onBack,
  year,
}) => {
  const [timeRange, setTimeRange] = useState<"monthly" | "annually">(
    "annually"
  );
  const [selectedYear, setSelectedYear] = useState(year);

  const yearData =
    scope1DetailsData[selectedYear as keyof typeof scope1DetailsData];
  const monthlyData =
    scope1MonthlyDetailsData[
      selectedYear as keyof typeof scope1MonthlyDetailsData
    ];

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
    ) {
      return null;
    }

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

  const renderAnnualView = () => (
    <>
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
        <h3 className="font-semibold text-gray-800 mb-4">
          สัดส่วนตามประเภทกิจกรรม ({parseInt(selectedYear) + 543})
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={yearData.categories}
              cx="50%"
              cy="50%"
              outerRadius={110}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {yearData.categories.map((index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })} tCO2e`,
                name,
              ]}
            />
            <Legend wrapperStyle={{ fontSize: "14px", paddingTop: "20px" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
        <h3 className="font-semibold text-gray-800 mb-4">
          รายละเอียดการปล่อย GHG ({parseInt(selectedYear) + 543})
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ประเภทกิจกรรม
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  รายการ
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  GHG (ton CO2eq)
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  %
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {yearData.breakdown.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.item}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {item.value.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {((item.value / yearData.total) * 100).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td
                  colSpan={2}
                  className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase"
                >
                  รวม
                </td>
                <td className="px-6 py-3 text-right text-sm font-bold text-gray-700">
                  {yearData.total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="px-6 py-3 text-right text-sm font-bold text-gray-700">
                  100.00%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );

  const renderMonthlyView = () => (
    <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
      <h3 className="font-semibold text-gray-800 mb-4">
        แนวโน้มรายเดือนตามประเภทกิจกรรม ({parseInt(selectedYear) + 543})
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={monthlyData}
          margin={{ top: 5, right: 20, left: 30, bottom: 25 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            label={{
              value: "Month",
              position: "insideBottom",
              offset: -15,
              style: { textAnchor: "middle", fontSize: "14px", fill: "#666" },
            }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            label={{
              value: "GHG (ton CO2eq)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle", fontSize: "14px", fill: "#666" },
            }}
          />
          <Tooltip
            formatter={(value: number) =>
              `${value.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })} tCO2e`
            }
          />
          <Legend
            wrapperStyle={{ fontSize: "14px" }}
            verticalAlign="top"
            align="right"
          />
          <Bar dataKey="การเผาไหม้แบบอยู่กับที่" stackId="a" fill={COLORS[0]} />
          <Bar dataKey="การเผาไหม้แบบเคลื่อนที่" stackId="a" fill={COLORS[1]} />
          <Bar dataKey="การรั่วไหล" stackId="a" fill={COLORS[2]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <>
      <DashboardHeader
        title="Scope 1 Emissions Details"
        subtitle={`รายละเอียดการปล่อยก๊าซเรือนกระจกขอบเขตที่ 1`}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        onBack={onBack}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md flex flex-col justify-center items-center">
          <h3 className="text-lg font-medium text-gray-500">
            Total Scope 1 Emissions ({parseInt(selectedYear) + 543})
          </h3>
          <p className="mt-2 text-5xl font-bold text-gray-900">
            {yearData.total.toLocaleString()}
          </p>
          <p className="text-md text-gray-600">tCO2e</p>
        </div>

        {timeRange === "annually" ? renderAnnualView() : renderMonthlyView()}
      </div>
    </>
  );
};

export default Scope1DetailsPage;
