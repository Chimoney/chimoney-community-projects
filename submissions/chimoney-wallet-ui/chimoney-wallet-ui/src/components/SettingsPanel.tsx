import React, { useState } from "react";
import { WalletWidgetConfig, ThemeType } from "../types";
import { themes } from "./themes";

interface SettingsPanelProps {
  config: WalletWidgetConfig;
  onConfigChange: (newConfig: WalletWidgetConfig) => void;
  onClose?: () => void;
  onSave?: (newConfig: WalletWidgetConfig) => void;
}

const fontOptions = [
  { label: "Inter", value: "Inter, sans-serif" },
  { label: "Poppins", value: "Poppins, sans-serif" },
  { label: "Roboto", value: "Roboto, sans-serif" },
  { label: "System UI", value: "system-ui, sans-serif" },
];

const featureFlags = [
  { key: "enableFunding", label: "Enable Funding" },
  { key: "enableWithdraw", label: "Enable Withdraw" },
  { key: "enableCharts", label: "Enable Charts" },
  { key: "enableSettings", label: "Enable Settings" },
  { key: "enableLogout", label: "Enable Logout" },
];

export default function SettingsPanel({
  config,
  onConfigChange,
  onClose,
  onSave,
}: SettingsPanelProps) {
  const [localConfig, setLocalConfig] = useState(config);

  const handleLocalChange = (
    field: keyof WalletWidgetConfig,
    value: string | boolean
  ) => {
    setLocalConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleThemeChange = (themeName: ThemeType) => {
    const selectedTheme = themes[themeName];
    setLocalConfig({
      ...localConfig,
      theme: themeName,
      primaryColor: selectedTheme.primaryColor,
      secondaryColor: selectedTheme.secondaryColor,
      surfaceColor: selectedTheme.surfaceColor,
      backgroundColor: selectedTheme.backgroundColor,
      fontFamily: selectedTheme.fontFamily,
      fontSizeBase: selectedTheme.fontSize,
      borderRadius: selectedTheme.borderRadius,
    });
  };

  const handleFeatureToggle = (
    key: keyof WalletWidgetConfig,
    checked: boolean
  ) => {
    setLocalConfig((prev) => ({ ...prev, [key]: checked }));
  };

  const handleSave = () => {
    if (onSave) onSave(localConfig);
    onConfigChange(localConfig);
    if (onClose) onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "19rem",
        maxWidth: "97vw",
        height: "100vh",
        background: "#fff", // Settings panel has constant color
        color: "#222",
        fontFamily: "Inter, sans-serif",
        fontSize: "0.95rem",
        boxShadow: "0 8px 36px rgba(60,60,90,.13)",
        borderRadius: "1.2rem 0 0 1.2rem",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        border: "1px solid #e5e7eb",
      }}
    >
      <div style={{ flex: 1, overflowY: "auto", padding: "1.1rem 1rem 1rem 1rem" }}>
        {/* Header */}
        <div
          className="flex justify-between items-center mb-4 pb-2 border-b"
          style={{ borderColor: "#ececec" }}
        >
          <h3
            style={{
              color: "#2242cc",
              fontSize: "1.15rem",
              fontWeight: "bold",
              letterSpacing: "0.03em",
            }}
          >
            Wallet Settings
          </h3>
          {onClose && (
            <button
              onClick={onClose}
              className="text-lg hover:opacity-70 transition-opacity"
              style={{
                color: "#6b7280",
                fontSize: "1.4rem",
                padding: "0 0.5rem",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          )}
        </div>

        {/* Theme Selection */}
        <div className="mb-4">
          <h4
            style={{
              color: "#2242cc",
              fontSize: "1rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            Choose Theme
          </h4>
          <div className="flex flex-col gap-2">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => handleThemeChange(key as ThemeType)}
                className={`p-2 rounded border text-left text-sm ${
                  localConfig.theme === key
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-400"
                }`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "2px",
                  cursor: "pointer",
                  background: localConfig.theme === key ? "#e8edfb" : "#fff",
                  borderColor: localConfig.theme === key ? "#2563eb" : "#e5e7eb",
                }}
              >
                <div>
                  <div className="font-medium capitalize">{key}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {key === "glassmorphic" && "Translucent glass effect"}
                    {key === "neumorphic" && "Soft inset shadows"}
                    {key === "modern" && "Clean minimalist design"}
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div
                    className="w-3 h-3 rounded-full border"
                    style={{ backgroundColor: theme.primaryColor }}
                  />
                  <div
                    className="w-3 h-3 rounded-full border"
                    style={{ backgroundColor: theme.secondaryColor }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Color Customization */}
        <div className="mb-4">
          <h4 className="mb-2" style={{ color: "#2242cc", fontSize: "1rem", fontWeight: 600 }}>
            Customize Colors
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium mb-1">Primary Color</label>
              <input
                type="color"
                value={localConfig.primaryColor || "#6366f1"}
                onChange={(e) => handleLocalChange("primaryColor", e.target.value)}
                className="w-full h-8 rounded border border-gray-300 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Secondary Color</label>
              <input
                type="color"
                value={localConfig.secondaryColor || "#10b981"}
                onChange={(e) => handleLocalChange("secondaryColor", e.target.value)}
                className="w-full h-8 rounded border border-gray-300 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Surface Color</label>
              <input
                type="color"
                value={localConfig.surfaceColor || "#f3f4f6"}
                onChange={(e) => handleLocalChange("surfaceColor", e.target.value)}
                className="w-full h-8 rounded border border-gray-300 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Background Color</label>
              <input
                type="color"
                value={localConfig.backgroundColor || "#eef2fa"}
                onChange={(e) => handleLocalChange("backgroundColor", e.target.value)}
                className="w-full h-8 rounded border border-gray-300 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="mb-4">
          <h4 className="mb-2" style={{ color: "#2242cc", fontSize: "1rem", fontWeight: 600 }}>
            Typography
          </h4>
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-medium mb-1">Font Family</label>
              <select
                value={localConfig.fontFamily || "Inter, sans-serif"}
                onChange={(e) => handleLocalChange("fontFamily", e.target.value)}
                className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
              >
                {fontOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Font Size</label>
              <input
                type="text"
                value={localConfig.fontSizeBase || "1rem"}
                onChange={(e) => handleLocalChange("fontSizeBase", e.target.value)}
                className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                placeholder="e.g. 1rem, 16px"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Border Radius</label>
              <input
                type="text"
                value={localConfig.borderRadius || "1.5rem"}
                onChange={(e) => handleLocalChange("borderRadius", e.target.value)}
                className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                placeholder="e.g. 8px, 1rem"
              />
            </div>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="mb-4">
          <h4 className="mb-2" style={{ color: "#2242cc", fontSize: "1rem", fontWeight: 600 }}>
            Features
          </h4>
          <div className="space-y-2">
            {featureFlags.map((flag) => (
              <label
                key={flag.key}
                className="flex items-center justify-between p-2 rounded border border-gray-200 hover:bg-gray-50 text-xs"
              >
                <span className="font-medium">{flag.label}</span>
                <input
                  type="checkbox"
                  checked={localConfig[flag.key as keyof WalletWidgetConfig] !== false}
                  onChange={(e) =>
                    handleFeatureToggle(
                      flag.key as keyof WalletWidgetConfig,
                      e.target.checked
                    )
                  }
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
      {/* Sticky Save Button at bottom */}
      <div
        style={{
          position: "sticky",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "1rem",
          background: "#fff",
          boxShadow: "0 -1px 8px rgba(100,100,120,0.05)"
        }}
      >
        <button
          onClick={handleSave}
          className="w-full py-2 rounded-lg font-semibold text-sm shadow"
          style={{
            background: "#2242cc",
            color: "#fff",
            borderRadius: "0.85rem",
            letterSpacing: "0.03em"
          }}
        >
          Save & Close
        </button>
      </div>
    </div>
  );
}
