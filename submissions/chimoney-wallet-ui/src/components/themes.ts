export type ThemeType = "glassmorphic" | "neumorphic" | "modern";
export const themes: Record<ThemeType, any> = {
  glassmorphic: {
    background: "from-blue-900/20 to-purple-900/20",
    card: "bg-black/25 backdrop-blur-md border border-white/20",
    textPrimary: "text-white",
    textSecondary: "text-gray-300",
    accent: "blue-400",
    shadow: "shadow-lg",
    buttonBg: "bg-blue-500",      // button background for better contrast
    buttonText: "text-white",     // button text
  },
  neumorphic: {
    background: "from-gray-100 to-gray-200",
    card: "bg-gray-100 shadow-inner rounded-xl",
    textPrimary: "text-gray-900",
    textSecondary: "text-gray-600",
    accent: "blue-500",
    shadow: "shadow-md",
    buttonBg: "bg-blue-600",      // darker button for visibility
    buttonText: "text-white",
  },
  modern: {
    background: "from-white to-gray-50",
    card: "bg-white shadow-lg rounded-xl",
    textPrimary: "text-gray-900",
    textSecondary: "text-gray-600",
    accent: "purple-500",
    shadow: "shadow-lg",
    buttonBg: "bg-purple-600",    // darker for contrast
    buttonText: "text-white",
  },
};
