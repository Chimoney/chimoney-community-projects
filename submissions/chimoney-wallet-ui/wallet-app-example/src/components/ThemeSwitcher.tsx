import React from "react";
import { WalletWidgetConfig } from "chimoney-wallet-ui";

interface ThemeSwitcherProps {
  currentTheme: string;
  onThemeChange: (themeName: string, config: WalletWidgetConfig) => void;
}

const themes: Record<string, WalletWidgetConfig> = {
  default: {
    primaryColor: "#6366f1",
    secondaryColor: "#10b981",
    fontFamily: "system-ui, sans-serif",
    borderRadius: "8px",
    showAnalytics: true,
  },
  ocean: {
    primaryColor: "#0ea5e9",
    secondaryColor: "#06b6d4",
    fontFamily: "Inter, sans-serif",
    borderRadius: "12px",
    showAnalytics: true,
  },
  sunset: {
    primaryColor: "#f97316",
    secondaryColor: "#ef4444",
    fontFamily: "Poppins, sans-serif",
    borderRadius: "16px",
    showAnalytics: true,
  },
  forest: {
    primaryColor: "#22c55e",
    secondaryColor: "#84cc16",
    fontFamily: "Roboto, sans-serif",
    borderRadius: "10px",
    showAnalytics: true,
  },
  midnight: {
    primaryColor: "#8b5cf6",
    secondaryColor: "#ec4899",
    fontFamily: "Montserrat, sans-serif",
    borderRadius: "14px",
    showAnalytics: true,
  },
};

export default function ThemeSwitcher({
  currentTheme,
  onThemeChange,
}: ThemeSwitcherProps) {
  return (
    <div className="mb-6 bg-white rounded-lg shadow-md p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Choose Theme
      </h3>
      <div className="flex flex-wrap gap-2">
        {Object.keys(themes).map((themeName) => (
          <button
            key={themeName}
            onClick={() => onThemeChange(themeName, themes[themeName])}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              currentTheme === themeName
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
