import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";

export const Login = () => {
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);

  const handleSuccess = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {showSignup ? (
          <SignupForm
            onSuccess={handleSuccess}
            onLoginClick={() => setShowSignup(false)}
          />
        ) : (
          <LoginForm
            onSuccess={handleSuccess}
            onSignupClick={() => setShowSignup(true)}
          />
        )}
      </div>
    </div>
  );
};
