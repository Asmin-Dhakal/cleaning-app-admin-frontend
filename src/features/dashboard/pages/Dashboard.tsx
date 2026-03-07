import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../app/providers/ThemeProvider";

export const Dashboard = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-full py-20"
      style={{ color: theme.colors.text }}
    >
      {/* Animated gear / construction icon */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="mb-8 text-8xl select-none"
      >
        ⚙️
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold tracking-tight mb-3 text-center"
        style={{
          backgroundImage: `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.info} 100%)`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {t("dashboard.title")}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-lg text-center max-w-md"
        style={{ color: theme.colors.textMuted }}
      >
        {t("dashboard.subtitle")}
      </motion.p>

      {/* Animated progress bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 w-64 rounded-full overflow-hidden"
        style={{
          backgroundColor: theme.colors.border,
          height: "6px",
        }}
      >
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-1/2 rounded-full"
          style={{
            backgroundImage: `linear-gradient(90deg, ${theme.colors.accent}, ${theme.colors.info})`,
          }}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-sm"
        style={{ color: theme.colors.textMuted }}
      >
        Coming soon...
      </motion.p>
    </div>
  );
};
