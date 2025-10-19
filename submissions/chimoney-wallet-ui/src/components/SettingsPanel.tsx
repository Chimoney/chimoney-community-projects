import React, { useState } from "react";
import { useWalletTheme } from "./WalletContainer";

// Allowed theme types
export type ThemeType = "glassmorphic" | "neumorphic" | "modern";

// Settings type
export interface Settings {
  theme: ThemeType;
  pushEnabled: boolean;
  emailEnabled: boolean;
  securityEnabled: boolean;
  twoFactorEnabled: boolean;
  biometricEnabled: boolean;
  [key: string]: any; // optional dynamic keys
}

// Props for the SettingsPanel
interface SettingsPanelProps {
  settings: Settings;
  onSettingsChange?: (newSettings: Settings) => void;
  onThemeChange?: (themeId: ThemeType) => void;
}

export default function SettingsPanel({
  settings,
  onSettingsChange,
  onThemeChange,
}: SettingsPanelProps) {
  const theme = useWalletTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = (key: keyof Settings) => {
    if (onSettingsChange) {
      onSettingsChange({
        ...settings,
        [key]: !settings[key],
      });
    }
  };

  const themes: { id: ThemeType; name: string; preview: string }[] = [
    { id: "glassmorphic", name: "Glassmorphic", preview: "🔮" },
    { id: "neumorphic", name: "Neumorphic", preview: "🎨" },
    { id: "modern", name: "Modern Cards", preview: "💳" },
  ];

  return (
    <section className="mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between p-4 ${theme.card} rounded-2xl shadow transition-all duration-300 hover:shadow-lg`}
      >
        <div className="flex items-center">
          <span className="text-2xl mr-3">⚙️</span>
          <h3 className={`text-lg font-semibold ${theme.textPrimary}`}>Settings</h3>
        </div>
        <span
          className={`text-xl transition-transform duration-300 ${theme.textSecondary} ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isExpanded && (
        <div className={`mt-4 ${theme.card} rounded-2xl p-6 space-y-6 transition-all duration-300`}>
          {/* Theme Selection */}
          <div>
            <h4 className={`text-md font-medium ${theme.textPrimary} mb-3`}>Theme</h4>
            <div className="grid grid-cols-1 gap-2">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.id}
                  onClick={() => onThemeChange && onThemeChange(themeOption.id)}
                  className={`flex items-center p-3 rounded-xl border transition-all ${
                    settings.theme === themeOption.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-xl mr-3">{themeOption.preview}</span>
                  <span
  className={`font-medium ${theme.textPrimary} ${
    settings.theme === "glassmorphic" ? "text-black" : ""
  }`}
>
  {themeOption.name}
</span>

                </button>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h4 className={`text-md font-medium ${theme.textPrimary} mb-3`}>Notifications</h4>
            <div className="space-y-3">
              {[
                { key: "pushEnabled", label: "Push Notifications", icon: "📱", desc: "Receive notifications on your device" },
                { key: "emailEnabled", label: "Email Notifications", icon: "📧", desc: "Get updates via email" },
                { key: "securityEnabled", label: "Security Alerts", icon: "🔒", desc: "Important security notifications" },
              ].map((item) => (
                <label key={item.key} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg mr-3">{item.icon}</span>
                    <div>
                      <p className={`font-medium ${theme.textPrimary}`}>{item.label}</p>
                      <p className={`text-sm ${theme.textSecondary}`}>{item.desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle(item.key as keyof Settings)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings[item.key] ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings[item.key] ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </label>
              ))}
            </div>
          </div>

          {/* Security */}
          <div>
            <h4 className={`text-md font-medium ${theme.textPrimary} mb-3`}>Security</h4>
            <div className="space-y-3">
              {[
                { key: "twoFactorEnabled", label: "Two-Factor Authentication", icon: "🔐", desc: "Add an extra layer of security" },
                { key: "biometricEnabled", label: "Biometric Login", icon: "👆", desc: "Use fingerprint or face ID" },
              ].map((item) => (
                <label key={item.key} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg mr-3">{item.icon}</span>
                    <div>
                      <p className={`font-medium ${theme.textPrimary}`}>{item.label}</p>
                      <p className={`text-sm ${theme.textSecondary}`}>{item.desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle(item.key as keyof Settings)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings[item.key] ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings[item.key] ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
