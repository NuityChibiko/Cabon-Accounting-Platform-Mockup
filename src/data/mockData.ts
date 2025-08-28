export const monthlyData2025 = [
  {
    name: "Jan",
    total: 22000,
    scope1: 1000,
    scope2: 1900,
    scope3: 19100,
    target: 24000,
  },
  {
    name: "Feb",
    total: 21500,
    scope1: 950,
    scope2: 1850,
    scope3: 18700,
    target: 24000,
  },
  {
    name: "Mar",
    total: 22800,
    scope1: 1100,
    scope2: 2000,
    scope3: 19700,
    target: 24000,
  },
  {
    name: "Apr",
    total: 22600,
    scope1: 1050,
    scope2: 2100,
    scope3: 19450,
    target: 24000,
  },
  {
    name: "May",
    total: 23400,
    scope1: 1150,
    scope2: 2150,
    scope3: 20100,
    target: 24000,
  },
  {
    name: "Jun",
    total: 24000,
    scope1: 1200,
    scope2: 2200,
    scope3: 20600,
    target: 24000,
  },
  {
    name: "Jul",
    total: 24200,
    scope1: 1220,
    scope2: 2300,
    scope3: 20680,
    target: 24000,
  },
  {
    name: "Aug",
    total: 23900,
    scope1: 1180,
    scope2: 2250,
    scope3: 20470,
    target: 24000,
  },
];

export const monthlyData2024 = [
  {
    name: "Jan",
    total: 23450,
    scope1: 1100,
    scope2: 2050,
    scope3: 20300,
    target: 25000,
  },
  {
    name: "Feb",
    total: 22980,
    scope1: 1050,
    scope2: 1980,
    scope3: 19950,
    target: 25000,
  },
  {
    name: "Mar",
    total: 24010,
    scope1: 1200,
    scope2: 2100,
    scope3: 20710,
    target: 25000,
  },
  {
    name: "Apr",
    total: 23880,
    scope1: 1150,
    scope2: 2200,
    scope3: 20530,
    target: 25000,
  },
  {
    name: "May",
    total: 24550,
    scope1: 1250,
    scope2: 2250,
    scope3: 21050,
    target: 25000,
  },
  {
    name: "Jun",
    total: 25100,
    scope1: 1300,
    scope2: 2300,
    scope3: 21500,
    target: 25000,
  },
  {
    name: "Jul",
    total: 25320,
    scope1: 1320,
    scope2: 2400,
    scope3: 21600,
    target: 25000,
  },
  {
    name: "Aug",
    total: 24800,
    scope1: 1280,
    scope2: 2350,
    scope3: 21170,
    target: 25000,
  },
  {
    name: "Sep",
    total: 24100,
    scope1: 1210,
    scope2: 2250,
    scope3: 20640,
    target: 25000,
  },
  {
    name: "Oct",
    total: 23900,
    scope1: 1190,
    scope2: 2150,
    scope3: 20560,
    target: 25000,
  },
  {
    name: "Nov",
    total: 23500,
    scope1: 1150,
    scope2: 2000,
    scope3: 20350,
    target: 25000,
  },
  {
    name: "Dec",
    total: 26423,
    scope1: 1400,
    scope2: 2500,
    scope3: 22523,
    target: 25000,
  },
];

export const annualData = [
  {
    name: "2022",
    total: 592750,
    scope1: 29532,
    scope2: 38753,
    scope3: 524465,
    target: 600000,
  },
  {
    name: "2023",
    total: 419061,
    scope1: 21544,
    scope2: 28310,
    scope3: 369207,
    target: 450000,
  },
  {
    name: "2024",
    total: 282013,
    scope1: 13993,
    scope2: 24349,
    scope3: 243671,
    target: 300000,
  },
  {
    name: "2025",
    total: 187800,
    scope1: 9250,
    scope2: 16800,
    scope3: 161750,
    target: 290000,
  },
];

// --- Scope 1 Details Data ---
export const scope1DetailsData = {
  "2025": {
    total: 9250,
    categories: [
      { name: "การเผาไหม้แบบอยู่กับที่", value: 9250 * 0.58 },
      { name: "การเผาไหม้แบบเคลื่อนที่", value: 9250 * 0.27 },
      { name: "การรั่วไหล", value: 9250 * 0.15 },
    ],
    breakdown: [
      {
        category: "การเผาไหม้แบบอยู่กับที่",
        item: "น้ำมันดีเซลและน้ำมันเบนซิน",
        value: 9250 * 0.38,
      },
      {
        category: "การเผาไหม้แบบอยู่กับที่",
        item: "ก๊าซ LPG",
        value: 9250 * 0.2,
      },
      {
        category: "การเผาไหม้แบบเคลื่อนที่",
        item: "น้ำมันดีเซลและน้ำมันเบนซิน",
        value: 9250 * 0.27,
      },
      {
        category: "การรั่วไหล",
        item: "CH4 จาก Septic tank",
        value: 9250 * 0.1,
      },
      { category: "การรั่วไหล", item: "สารทำความเย็น", value: 9250 * 0.05 },
    ],
  },
  "2024": {
    total: 13993,
    categories: [
      { name: "การเผาไหม้แบบอยู่กับที่", value: 13993 * 0.6 },
      { name: "การเผาไหม้แบบเคลื่อนที่", value: 13993 * 0.25 },
      { name: "การรั่วไหล", value: 13993 * 0.15 },
    ],
    breakdown: [
      {
        category: "การเผาไหม้แบบอยู่กับที่",
        item: "น้ำมันดีเซลและน้ำมันเบนซิน",
        value: 13993 * 0.4,
      },
      {
        category: "การเผาไหม้แบบอยู่กับที่",
        item: "ก๊าซ LPG",
        value: 13993 * 0.2,
      },
      {
        category: "การเผาไหม้แบบเคลื่อนที่",
        item: "น้ำมันดีเซลและน้ำมันเบนซิน",
        value: 13993 * 0.25,
      },
      {
        category: "การรั่วไหล",
        item: "CH4 จาก Septic tank",
        value: 13993 * 0.1,
      },
      { category: "การรั่วไหล", item: "สารทำความเย็น", value: 13993 * 0.05 },
    ],
  },
  "2023": {
    total: 21544,
    categories: [
      { name: "การเผาไหม้แบบอยู่กับที่", value: 21544 * 0.6 },
      { name: "การเผาไหม้แบบเคลื่อนที่", value: 21544 * 0.25 },
      { name: "การรั่วไหล", value: 21544 * 0.15 },
    ],
    breakdown: [
      {
        category: "การเผาไหม้แบบอยู่กับที่",
        item: "น้ำมันดีเซลและน้ำมันเบนซิน",
        value: 21544 * 0.4,
      },
      {
        category: "การเผาไหม้แบบอยู่กับที่",
        item: "ก๊าซ LPG",
        value: 21544 * 0.2,
      },
      {
        category: "การเผาไหม้แบบเคลื่อนที่",
        item: "น้ำมันดีเซลและน้ำมันเบนซิน",
        value: 21544 * 0.25,
      },
      {
        category: "การรั่วไหล",
        item: "CH4 จาก Septic tank",
        value: 21544 * 0.1,
      },
      { category: "การรั่วไหล", item: "สารทำความเย็น", value: 21544 * 0.05 },
    ],
  },
  "2022": {
    total: 29532,
    categories: [
      { name: "การเผาไหม้แบบอยู่กับที่", value: 29532 * 0.6 },
      { name: "การเผาไหม้แบบเคลื่อนที่", value: 29532 * 0.25 },
      { name: "การรั่วไหล", value: 29532 * 0.15 },
    ],
    breakdown: [
      {
        category: "การเผาไหม้แบบอยู่กับที่",
        item: "น้ำมันดีเซลและน้ำมันเบนซิน",
        value: 29532 * 0.4,
      },
      {
        category: "การเผาไหม้แบบอยู่กับที่",
        item: "ก๊าซ LPG",
        value: 29532 * 0.2,
      },
      {
        category: "การเผาไหม้แบบเคลื่อนที่",
        item: "น้ำมันดีเซลและน้ำมันเบนซิน",
        value: 29532 * 0.25,
      },
      {
        category: "การรั่วไหล",
        item: "CH4 จาก Septic tank",
        value: 29532 * 0.1,
      },
      { category: "การรั่วไหล", item: "สารทำความเย็น", value: 29532 * 0.05 },
    ],
  },
};

export const scope1MonthlyDetailsData = {
  "2025": monthlyData2025.map((month) => ({
    name: month.name,
    การเผาไหม้แบบอยู่กับที่: month.scope1 * 0.58,
    การเผาไหม้แบบเคลื่อนที่: month.scope1 * 0.27,
    การรั่วไหล: month.scope1 * 0.15,
  })),
  "2024": monthlyData2024.map((month) => ({
    name: month.name,
    การเผาไหม้แบบอยู่กับที่: month.scope1 * 0.6,
    การเผาไหม้แบบเคลื่อนที่: month.scope1 * 0.25,
    การรั่วไหล: month.scope1 * 0.15,
  })),
  "2023": monthlyData2024.map((month) => ({
    name: month.name,
    การเผาไหม้แบบอยู่กับที่: month.scope1 * 1.5 * 0.6,
    การเผาไหม้แบบเคลื่อนที่: month.scope1 * 1.5 * 0.25,
    การรั่วไหล: month.scope1 * 1.5 * 0.15,
  })),
  "2022": monthlyData2024.map((month) => ({
    name: month.name,
    การเผาไหม้แบบอยู่กับที่: month.scope1 * 2 * 0.6,
    การเผาไหม้แบบเคลื่อนที่: month.scope1 * 2 * 0.25,
    การรั่วไหล: month.scope1 * 2 * 0.15,
  })),
};

// --- Scope 2 Details Data ---
export const scope2DetailsData = {
  "2025": {
    total: 16800,
    categories: [
      { name: "ไฟฟ้าจากกริด", value: 16800 * 0.9 },
      { name: "พลังงานหมุนเวียน", value: 16800 * 0.1 },
    ],
  },
  "2024": {
    total: 24349,
    categories: [
      { name: "ไฟฟ้าจากกริด", value: 24349 * 0.92 },
      { name: "พลังงานหมุนเวียน", value: 24349 * 0.08 },
    ],
  },
  "2023": {
    total: 28310,
    categories: [
      { name: "ไฟฟ้าจากกริด", value: 28310 * 0.95 },
      { name: "พลังงานหมุนเวียน", value: 28310 * 0.05 },
    ],
  },
  "2022": {
    total: 38753,
    categories: [
      { name: "ไฟฟ้าจากกริด", value: 38753 * 0.98 },
      { name: "พลังงานหมุนเวียน", value: 38753 * 0.02 },
    ],
  },
};

export const scope2MonthlyDetailsData = {
  "2025": monthlyData2025.map((month) => ({
    name: month.name,
    ไฟฟ้าจากกริด: month.scope2 * 0.9,
    พลังงานหมุนเวียน: month.scope2 * 0.1,
  })),
  "2024": monthlyData2024.map((month) => ({
    name: month.name,
    ไฟฟ้าจากกริด: month.scope2 * 0.92,
    พลังงานหมุนเวียน: month.scope2 * 0.08,
  })),
  "2023": monthlyData2024.map((month) => ({
    name: month.name,
    ไฟฟ้าจากกริด: month.scope2 * 1.2 * 0.95,
    พลังงานหมุนเวียน: month.scope2 * 1.2 * 0.05,
  })),
  "2022": monthlyData2024.map((month) => ({
    name: month.name,
    ไฟฟ้าจากกริด: month.scope2 * 1.5 * 0.98,
    พลังงานหมุนเวียน: month.scope2 * 1.5 * 0.02,
  })),
};

// --- NEW: Scope 3 Details Data ---
export const scope3DetailsData = {
  "2025": {
    total: 161750,
    categories: [
      { name: "Waste Gen", value: 161750 * 0.6 },
      { name: "Use of Sold Product", value: 161750 * 0.2 },
      { name: "Fuel Related", value: 161750 * 0.1 },
      { name: "Employee Commuting", value: 161750 * 0.1 },
    ],
  },
  "2024": {
    total: 243671,
    categories: [
      { name: "Waste Gen", value: 243671 * 0.6 },
      { name: "Use of Sold Product", value: 243671 * 0.2 },
      { name: "Fuel Related", value: 243671 * 0.1 },
      { name: "Employee Commuting", value: 243671 * 0.1 },
    ],
  },
  "2023": {
    total: 369207,
    categories: [
      { name: "Waste Gen", value: 369207 * 0.6 },
      { name: "Use of Sold Product", value: 369207 * 0.2 },
      { name: "Fuel Related", value: 369207 * 0.1 },
      { name: "Employee Commuting", value: 369207 * 0.1 },
    ],
  },
  "2022": {
    total: 524465,
    categories: [
      { name: "Waste Gen", value: 524465 * 0.6 },
      { name: "Use of Sold Product", value: 524465 * 0.2 },
      { name: "Fuel Related", value: 524465 * 0.1 },
      { name: "Employee Commuting", value: 524465 * 0.1 },
    ],
  },
};

export const scope3MonthlyDetailsData = {
  "2025": monthlyData2025.map((month) => ({
    name: month.name,
    "Waste Gen": month.scope3 * 0.6,
    "Use of Sold Product": month.scope3 * 0.2,
    "Fuel Related": month.scope3 * 0.1,
    "Employee Commuting": month.scope3 * 0.1,
  })),
  "2024": monthlyData2024.map((month) => ({
    name: month.name,
    "Waste Gen": month.scope3 * 0.6,
    "Use of Sold Product": month.scope3 * 0.2,
    "Fuel Related": month.scope3 * 0.1,
    "Employee Commuting": month.scope3 * 0.1,
  })),
  "2023": monthlyData2024.map((month) => ({
    name: month.name,
    "Waste Gen": month.scope3 * 1.5 * 0.6,
    "Use of Sold Product": month.scope3 * 1.5 * 0.2,
    "Fuel Related": month.scope3 * 1.5 * 0.1,
    "Employee Commuting": month.scope3 * 1.5 * 0.1,
  })),
  "2022": monthlyData2024.map((month) => ({
    name: month.name,
    "Waste Gen": month.scope3 * 2.15 * 0.6,
    "Use of Sold Product": month.scope3 * 2.15 * 0.2,
    "Fuel Related": month.scope3 * 2.15 * 0.1,
    "Employee Commuting": month.scope3 * 2.15 * 0.1,
  })),
};

export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
