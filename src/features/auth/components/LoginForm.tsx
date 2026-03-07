import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLogin } from "../hooks/useAuth";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { Input } from "../../../shared/components/ui/Input";
import { Button } from "../../../shared/components/ui/Button";

type LoginFormData = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onSuccess?: () => void;
  onSignupClick?: () => void;
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export const LoginForm = ({ onSuccess, onSignupClick }: LoginFormProps) => {
  const login = useLogin();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const loginSchema = useMemo(
    () =>
      z.object({
        email: z.string().email(t("auth.validation.emailInvalid")),
        password: z.string().min(6, t("auth.validation.passwordMin")),
      }),
    [t],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login.mutateAsync(data);
      onSuccess?.();
    } catch (error) {
      // Error handled by mutation
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="w-full p-6 sm:p-8 md:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border backdrop-blur-2xl"
      style={{
        backgroundColor: `${theme.colors.surfaceElevated}cc`,
        borderColor: theme.colors.border,
        borderWidth: `1px`,
      }}
    >
      <motion.div variants={itemVariants} className="text-center mb-10">
        <h1
          className="text-4xl font-extrabold tracking-tight mb-2"
          style={{
            backgroundImage: `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.info} 100%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {t("auth.login.title")}
        </h1>
        <p
          style={{ color: theme.colors.textMuted }}
          className="text-sm font-medium"
        >
          {t("auth.login.subtitle")}
        </p>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <motion.div variants={itemVariants}>
          <Input
            label={t("auth.login.emailLabel")}
            type="email"
            placeholder="admin@example.com"
            error={errors.email?.message}
            theme={theme}
            {...register("email")}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            label={t("auth.login.passwordLabel")}
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            theme={theme}
            {...register("password")}
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between text-sm pt-1"
        >
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 rounded transition-all"
              style={{
                borderColor: theme.colors.border,
                backgroundColor: `rgba(0,0,0,0.2)`,
              }}
            />
            <span
              className="ml-2.5 group-hover:opacity-80 transition-opacity"
              style={{ color: theme.colors.textMuted }}
            >
              {t("auth.login.rememberMe")}
            </span>
          </label>
          <a
            href="#"
            style={{ color: theme.colors.accent }}
            className="font-medium hover:opacity-80 transition-opacity"
          >
            {t("auth.login.forgotPassword")}
          </a>
        </motion.div>

        {login.isError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="p-3.5 border rounded-xl"
            style={{
              backgroundColor: `${theme.colors.danger}15`,
              borderColor: `${theme.colors.danger}50`,
            }}
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
                style={{ color: theme.colors.danger }}
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p
                className="text-sm font-medium"
                style={{ color: theme.colors.danger }}
              >
                {t("auth.login.invalidCredentials")}
              </p>
            </div>
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="pt-4">
          <Button type="submit" theme={theme} isLoading={login.isPending}>
            <span className="relative z-10 flex items-center justify-center gap-2">
              {t("auth.login.signIn")}
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </Button>
        </motion.div>
      </form>

      <motion.div variants={itemVariants} className="mt-8 text-center">
        <p className="text-sm" style={{ color: theme.colors.textMuted }}>
          {t("auth.login.noAccount")}{" "}
          <button
            type="button"
            onClick={onSignupClick}
            className="font-semibold hover:opacity-80 transition-opacity"
            style={{ color: theme.colors.accent }}
          >
            {t("auth.login.signUp")}
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
};
