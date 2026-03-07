const en = {
    auth: {
        login: {
            title: "Welcome Back",
            subtitle: "Sign in to your admin dashboard",
            emailLabel: "Email",
            passwordLabel: "Password",
            rememberMe: "Remember me",
            forgotPassword: "Forgot password?",
            signIn: "Sign In",
            noAccount: "Don't have an account?",
            signUp: "Sign up",
            invalidCredentials: "Invalid email or password",
        },
        signup: {
            title: "Create Account",
            subtitle: "Join us and start managing",
            firstNameLabel: "First Name",
            lastNameLabel: "Last Name",
            emailLabel: "Email",
            phoneLabel: "Phone (Optional)",
            passwordLabel: "Password",
            confirmPasswordLabel: "Confirm Password",
            createAccount: "Create Account",
            alreadyHaveAccount: "Already have an account?",
            signIn: "Sign in",
            registrationFailed: "Email already exists or registration failed.",
        },
        validation: {
            emailInvalid: "Invalid email address",
            passwordMin: "Password must be at least 6 characters",
            firstNameMin: "First name must be at least 2 characters",
            lastNameMin: "Last name must be at least 2 characters",
            passwordsMustMatch: "Passwords don't match",
        },
    },
    navigation: {
        dashboard: "Dashboard",
        notifications: "Notifications",
        bookings: "Bookings",
        appointments: "Appointments",
        clients: "Clients",
        properties: "Properties",
        income: "Income",
        expenses: "Expenses",
        reports: "Reports",
        feedback: "Feedback",
        cleaners: "Cleaners",
    },
    header: {
        adminPanel: "Admin Panel",
        logout: "Logout",
        loggingOut: "Logging out...",
    },
    dashboard: {
        title: "Work in Progress",
        subtitle:
            "The dashboard is currently under development. Check back soon for powerful analytics and management tools.",
    },
} as const;

export default en;
