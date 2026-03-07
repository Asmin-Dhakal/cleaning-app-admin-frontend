import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useRegister } from "../hooks/useAuth";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { Input } from "../../../shared/components/ui/Input";
import { Button } from "../../../shared/components/ui/Button";

type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
};

interface SignupFormProps {
  onSuccess?: () => void;
  onLoginClick?: () => void;
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export const SignupForm = ({ onSuccess, onLoginClick }: SignupFormProps) => {
  const register = useRegister();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const signupSchema = useMemo(
    () =>
      z
        .object({
          firstName: z.string().min(2, t("auth.validation.firstNameMin")),
          lastName: z.string().min(2, t("auth.validation.lastNameMin")),
          email: z.string().email(t("auth.validation.emailInvalid")),
          phone: z.string().optional(),
          password: z.string().min(6, t("auth.validation.passwordMin")),
          confirmPassword: z.string(),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: t("auth.validation.passwordsMustMatch"),
          path: ["confirmPassword"],
        }),
    [t],
  );

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const { confirmPassword, ...signupData } = data;
      await register.mutateAsync(signupData);
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
            backgroundImage: `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.primary} 100%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {t("auth.signup.title")}
        </h1>
        <p
          style={{ color: theme.colors.textMuted }}
          className="text-sm font-medium"
        >
          {t("auth.signup.subtitle")}
        </p>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
          <Input
            label={t("auth.signup.firstNameLabel")}
            placeholder="John"
            error={errors.firstName?.message}
            theme={theme}
            {...registerField("firstName")}
          />
          <Input
            label={t("auth.signup.lastNameLabel")}
            placeholder="Doe"
            error={errors.lastName?.message}
            theme={theme}
            {...registerField("lastName")}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            label={t("auth.signup.emailLabel")}
            type="email"
            placeholder="admin@example.com"
            error={errors.email?.message}
            theme={theme}
            {...registerField("email")}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            label={t("auth.signup.phoneLabel")}
            type="tel"
            placeholder="+1234567890"
            error={errors.phone?.message}
            theme={theme}
            {...registerField("phone")}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            label={t("auth.signup.passwordLabel")}
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            theme={theme}
            {...registerField("password")}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            label={t("auth.signup.confirmPasswordLabel")}
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            theme={theme}
            {...registerField("confirmPassword")}
          />
        </motion.div>

        {register.isError && (
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
                {t("auth.signup.registrationFailed")}
              </p>
            </div>
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="pt-4">
          <Button type="submit" theme={theme} isLoading={register.isPending}>
            <span className="relative z-10 flex items-center justify-center gap-2">
              {t("auth.signup.createAccount")}
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
          {t("auth.signup.alreadyHaveAccount")}{" "}
          <button
            type="button"
            onClick={onLoginClick}
            className="font-semibold hover:opacity-80 transition-opacity"
            style={{ color: theme.colors.accent }}
          >
            {t("auth.signup.signIn")}
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
};
