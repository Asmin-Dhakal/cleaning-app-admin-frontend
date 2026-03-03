import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";
import { useTheme } from "../../../app/providers/ThemeProvider";

export const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const { theme } = useTheme();

  const handleSuccess = () => navigate("/");

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: theme.colors.background,
        backgroundImage: theme.gradients.subtleBg,
      }}
    >
      {/* Dynamic Grid Background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Floating Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${theme.palette.gray700} 0%, ${theme.palette.gray500} 100%)`,
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-[5%] right-[5%] w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${theme.palette.gray800} 0%, ${theme.palette.gray600} 100%)`,
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-[50%] right-[20%] w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${theme.palette.gray600} 0%, ${theme.palette.gray800} 100%)`,
        }}
      />

      <div className="z-10 w-full flex items-center justify-center p-4 sm:p-6 md:p-8">
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-sm sm:max-w-md md:max-w-lg"
            >
              <LoginForm
                onSuccess={handleSuccess}
                onSignupClick={() => setIsLogin(false)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-sm sm:max-w-md md:max-w-lg"
            >
              <SignupForm
                onSuccess={handleSuccess}
                onLoginClick={() => setIsLogin(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
