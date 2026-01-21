import React, { useState, useRef, useEffect } from "react";
import { useWalletTheme } from "./WalletContainer";

interface SimpleLineChartProps {
  data?: number[];
  labels?: string[];
  height?: number;
  color?: string;
  onDetails?: (index: number) => React.ReactNode;
}

const SimpleLineChart: React.FC<SimpleLineChartProps> = ({
  data = [],
  labels = [],
  height = 200,
  color = "var(--primary-color)", // Uses CSS variable by default for live theming!
  onDetails,
}) => {
  const theme = useWalletTheme();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(300);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth - 32);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [containerRef.current]);

  if (!data || data.length === 0) return null;

  // Map event x-pos (pixels) to nearest index
  const getClosestIndex = (clientX: number) => {
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left - 16; // account for left padding
    if (x < 0) return 0;
    if (x > containerWidth) return data.length - 1;
    return Math.round((x / containerWidth) * (data.length - 1));
  };

  // SVG chart logic as before...
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * containerWidth;
    const y = height - ((value - min) / range) * (height - 40);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ touchAction: "pan-x" }}
      onMouseMove={e => setActiveIndex(getClosestIndex(e.clientX))}
      onMouseLeave={() => setActiveIndex(null)}
      onTouchMove={e => {
        if (e.touches[0]) setActiveIndex(getClosestIndex(e.touches[0].clientX));
      }}
      onTouchEnd={() => setActiveIndex(null)}
    >
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${containerWidth} ${height}`}
        className="overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="grid" width="50" height="40" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          </pattern>
        </defs>
        <rect width={containerWidth} height={height} fill="url(#grid)" />

        <path d={`M 0,${height} L ${points} L ${containerWidth},${height} Z`} fill={color} fillOpacity="0.1" />

        {data.length > 1 && (
          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * containerWidth;
          const y = height - ((value - min) / range) * (height - 40);
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r={4}
              fill={color}
              stroke="white"
              strokeWidth={2}
            />
          );
        })}

        {activeIndex !== null && data[activeIndex] !== undefined && (
          <>
            <line
              x1={(activeIndex / (data.length - 1)) * containerWidth}
              x2={(activeIndex / (data.length - 1)) * containerWidth}
              y1="25"
              y2={height}
              stroke={color}
              strokeWidth="2"
              strokeDasharray="2,4"
              opacity="0.6"
            />
            <circle
              cx={(activeIndex / (data.length - 1)) * containerWidth}
              cy={height - ((data[activeIndex] - min) / range) * (height - 40)}
              r={7}
              fill="white"
              stroke={color}
              strokeWidth={2}
              opacity={0.9}
            />
          </>
        )}
      </svg>

      {/* Dynamic tooltip */}
      {activeIndex !== null && data[activeIndex] !== undefined && (
        <div
          style={{
            position: "absolute",
            left: `calc(${(activeIndex / (data.length - 1)) * 100}% - 50px)`,
            top: 0,
            minWidth: 70,
            pointerEvents: "none",
            zIndex: 10
          }}
          className="bg-white text-xs border shadow rounded p-2 select-none"
        >
          <div>
            <span className="font-semibold">
              {labels[activeIndex]}:
            </span>{" "}
            ${data[activeIndex].toLocaleString()}
          </div>
          {onDetails && onDetails(activeIndex)}
        </div>
      )}

      {/* X-axis labels */}
      <div className="flex justify-between mt-2 px-1">
        {labels.map((label, index) => (
          <span
            key={index}
            className={`text-xs ${theme.textSecondary} truncate`}
            style={{ maxWidth: `${100 / labels.length}%` }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

// Helper for generating day labels
const generateLastNDaysLabels = (n: number) => {
  const labels: string[] = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const month = d.toLocaleString("default", { month: "short" });
    const dayNum = d.getDate();
    labels.push(`${month} ${dayNum}`);
  }
  return labels;
};

interface DashboardChartsProps {
  balanceHistory?: number[];
  accent?: string;
  incomeData?: number[];
  expenseData?: number[];
  dayLabels?: string[];
  onDetails?: (type: string, index: number) => React.ReactNode;
}

interface Tab {
  id: "balance" | "income" | "expense";
  name: string;
  color: string;
  icon: string;
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({
  balanceHistory = [],
  incomeData = [],
  expenseData = [],
  accent,
  dayLabels,
  onDetails
}) => {
  const theme = useWalletTheme();
  const [activeTab, setActiveTab] = useState<"balance" | "income" | "expense">(
    "balance"
  );
  const chartData: Record<string, number[]> = {
    balance: balanceHistory,
    income: incomeData,
    expense: expenseData,
  };

  const dataLen = chartData[activeTab]?.length || 5;
  const labels = dayLabels || generateLastNDaysLabels(dataLen);

  const tabs: Tab[] = [
    { id: "balance", name: "Balance", color: "var(--primary-color)", icon: "📊" },
    { id: "income", name: "Income", color: "var(--secondary-color)", icon: "📈" },
    { id: "expense", name: "Expenses", color: "#f59e0b", icon: "📉" },
  ];

  const currentData = chartData[activeTab] || [];
  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section className="mb-6">
      <div className={`${theme.card} rounded-2xl p-4 sm:p-6 transition-all duration-300 overflow-hidden`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <h3 className={`text-lg font-semibold ${theme.textPrimary}`}>Analytics</h3>
          <div className="flex w-full sm:w-auto space-x-1 bg-gray-100 rounded-lg p-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-white shadow-sm text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span className="mr-1">{tab.icon}</span>
                <span className="text-xs sm:text-sm truncate">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4 w-full">
          <SimpleLineChart
            data={currentData}
            labels={labels}
            height={160}
            color={currentTab.color}
            onDetails={onDetails ? (i) => onDetails(activeTab, i) : undefined}
          />
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6">
          <div className="text-center">
            <p className={`text-xs sm:text-sm ${theme.textSecondary}`}>Current</p>
            <p className={`text-sm sm:text-lg font-semibold ${theme.textPrimary} truncate`}>
              ${currentData[currentData.length - 1]?.toLocaleString?.() || 0}
            </p>
          </div>
          <div className="text-center">
            <p className={`text-xs sm:text-sm ${theme.textSecondary}`}>Highest</p>
            <p className={`text-sm sm:text-lg font-semibold ${theme.textPrimary} truncate`}>
              ${Math.max(...currentData, 0).toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className={`text-xs sm:text-sm ${theme.textSecondary}`}>Average</p>
            <p className={`text-sm sm:text-lg font-semibold ${theme.textPrimary} truncate`}>
              ${Math.round(
                currentData.reduce((a, b) => a + b, 0) / (currentData.length || 1)
              ).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardCharts;
