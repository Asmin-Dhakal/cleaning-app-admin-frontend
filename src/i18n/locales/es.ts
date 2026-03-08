const es = {
    auth: {
        login: {
            title: "Bienvenido de nuevo",
            subtitle: "Inicia sesión en tu panel de administración",
            emailLabel: "Correo electrónico",
            passwordLabel: "Contraseña",
            rememberMe: "Recuérdame",
            forgotPassword: "¿Olvidaste tu contraseña?",
            signIn: "Iniciar sesión",
            noAccount: "¿No tienes una cuenta?",
            signUp: "Regístrate",
            invalidCredentials: "Correo electrónico o contraseña incorrectos",
        },
        signup: {
            title: "Crear cuenta",
            subtitle: "Únete y comienza a gestionar",
            firstNameLabel: "Nombre",
            lastNameLabel: "Apellido",
            emailLabel: "Correo electrónico",
            phoneLabel: "Teléfono (Opcional)",
            passwordLabel: "Contraseña",
            confirmPasswordLabel: "Confirmar contraseña",
            createAccount: "Crear cuenta",
            alreadyHaveAccount: "¿Ya tienes una cuenta?",
            signIn: "Iniciar sesión",
            registrationFailed: "El correo ya existe o el registro falló.",
        },
        validation: {
            emailInvalid: "Dirección de correo electrónico inválida",
            passwordMin: "La contraseña debe tener al menos 6 caracteres",
            firstNameMin: "El nombre debe tener al menos 2 caracteres",
            lastNameMin: "El apellido debe tener al menos 2 caracteres",
            passwordsMustMatch: "Las contraseñas no coinciden",
        },
    },
    navigation: {
        dashboard: "Panel",
        notifications: "Notificaciones",
        bookings: "Reservas",
        appointments: "Citas",
        clients: "Clientes",
        properties: "Propiedades",
        income: "Ingresos",
        expenses: "Gastos",
        reports: "Informes",
        feedback: "Comentarios",
        cleaners: "Limpiadores",
    },
    header: {
        adminPanel: "Panel de Administración",
        logout: "Cerrar sesión",
        loggingOut: "Cerrando sesión...",
    },
    dashboard: {
        title: "En desarrollo",
        subtitle:
            "El panel está actualmente en desarrollo. Vuelve pronto para obtener potentes herramientas de análisis y gestión.",
    },
    clients: {
        title: "Solicitudes de Clientes",
        tabs: {
            pending: "Pendientes",
            active: "Activos",
            deactivated: "Desactivados",
        },
        columns: {
            name: "Nombre",
            email: "Correo",
            phone: "Teléfono",
            createdAt: "Creado",
            status: "Estado",
            actions: "Acciones",
        },
        status: {
            active: "Activo",
            pending: "Pendiente",
        },
        actions: {
            activate: "Activar",
            deactivate: "Desactivar",
        },
        loading: "Cargando clientes...",
        error: "No se pudieron cargar los clientes.",
        empty: "No hay clientes en esta lista.",
    },
} as const;

export default es;
