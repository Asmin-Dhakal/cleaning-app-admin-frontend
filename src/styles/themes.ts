export type ThemeMode = "light" | "dark";

export type SemanticColors = {
    primary: string;
    primaryHover: string;
    accent: string;
    accentSoft: string;
    background: string;
    surface: string;
    surfaceElevated: string;
    text: string;
    textMuted: string;
    textInverse: string;
    border: string;
    focusRing: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
};

export type TypographyTokens = {
    fontFamily: {
        sans: string;
        heading: string;
        mono: string;
    };
    fontSize: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        "2xl": string;
        "3xl": string;
    };
    fontWeight: {
        regular: number;
        medium: number;
        semibold: number;
        bold: number;
    };
    lineHeight: {
        tight: number;
        normal: number;
        relaxed: number;
    };
    letterSpacing: {
        tight: string;
        normal: string;
        wide: string;
    };
};

export type MotionTokens = {
    duration: {
        instant: string;
        fast: string;
        normal: string;
        slow: string;
    };
    easing: {
        standard: string;
        emphasized: string;
        decelerate: string;
    };
    transition: {
        hover: string;
        fadeIn: string;
        scaleIn: string;
    };
};

export type Theme = {
    mode: ThemeMode;
    palette: {
        gray100: string; // #F8F9FA
        gray200: string; // #E9ECEF
        gray300: string; // #DEE2E6
        gray400: string; // #CED4DA
        gray500: string; // #ADB5BD
        gray600: string; // #6C757D
        gray700: string; // #495057
        gray800: string; // #343A40
        gray900: string; // #212529
    };
    colors: SemanticColors;
    typography: TypographyTokens;
    spacing: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        8: string;
        10: string;
        12: string;
        16: string;
        20: string;
        24: string;
    };
    radius: {
        none: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        "2xl": string;
        full: string;
    };
    shadow: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
        focus: string;
    };
    motion: MotionTokens;
    gradients: {
        hero: string;
        card: string;
        button: string;
        subtleBg: string;
    };
};

const palette = {
    gray100: "#F8F9FA",
    gray200: "#E9ECEF",
    gray300: "#DEE2E6",
    gray400: "#CED4DA",
    gray500: "#ADB5BD",
    gray600: "#6C757D",
    gray700: "#495057",
    gray800: "#343A40",
    gray900: "#212529",
} as const;

const typography: TypographyTokens = {
    fontFamily: {
        sans:
            'Inter, "Poppins", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        heading: 'Poppins, Inter, "Segoe UI", Roboto, Arial, sans-serif',
        mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        md: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
    },
    fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },
    lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.7,
    },
    letterSpacing: {
        tight: "-0.01em",
        normal: "0",
        wide: "0.02em",
    },
};

const spacing = {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
} as const;

const radius = {
    none: "0",
    sm: "0.375rem",
    md: "0.625rem",
    lg: "0.875rem",
    xl: "1rem",
    "2xl": "1.25rem",
    full: "9999px",
} as const;

const motion: MotionTokens = {
    duration: {
        instant: "80ms",
        fast: "160ms",
        normal: "240ms",
        slow: "360ms",
    },
    easing: {
        standard: "cubic-bezier(0.2, 0, 0, 1)",
        emphasized: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        decelerate: "cubic-bezier(0, 0, 0.2, 1)",
    },
    transition: {
        hover:
            "background-color 160ms cubic-bezier(0.2, 0, 0, 1), color 160ms cubic-bezier(0.2, 0, 0, 1), transform 160ms cubic-bezier(0.2, 0, 0, 1)",
        fadeIn: "opacity 240ms cubic-bezier(0.2, 0, 0, 1)",
        scaleIn:
            "transform 240ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 240ms cubic-bezier(0.2, 0, 0, 1)",
    },
};

export const lightTheme: Theme = {
    mode: "light",
    palette,
    colors: {
        primary: palette.gray800,
        primaryHover: palette.gray900,
        accent: palette.gray700,
        accentSoft: palette.gray600,
        background: palette.gray100,
        surface: "#FFFFFF",
        surfaceElevated: palette.gray200,
        text: palette.gray900,
        textMuted: palette.gray600,
        textInverse: palette.gray100,
        border: palette.gray300,
        focusRing: "rgba(73, 80, 87, 0.35)",
        success: "#198754",
        warning: "#D97706",
        danger: "#DC3545",
        info: palette.gray600,
    },
    typography,
    spacing,
    radius,
    shadow: {
        sm: "0 1px 2px rgba(33, 37, 41, 0.08)",
        md: "0 8px 24px rgba(33, 37, 41, 0.12)",
        lg: "0 16px 40px rgba(33, 37, 41, 0.16)",
        xl: "0 24px 56px rgba(33, 37, 41, 0.2)",
        focus: "0 0 0 3px rgba(73, 80, 87, 0.35)",
    },
    motion,
    gradients: {
        hero: "linear-gradient(135deg, #212529 0%, #495057 50%, #ADB5BD 100%)",
        card: "linear-gradient(145deg, #FFFFFF 0%, #F8F9FA 100%)",
        button: "linear-gradient(135deg, #343A40 0%, #6C757D 100%)",
        subtleBg: "radial-gradient(circle at top right, #DEE2E6 0%, #F8F9FA 55%)",
    },
};

export const darkTheme: Theme = {
    mode: "dark",
    palette,
    colors: {
        primary: palette.gray500,
        primaryHover: palette.gray400,
        accent: palette.gray400,
        accentSoft: palette.gray600,
        background: palette.gray900,
        surface: "#2B3035",
        surfaceElevated: palette.gray800,
        text: palette.gray100,
        textMuted: palette.gray500,
        textInverse: palette.gray900,
        border: palette.gray700,
        focusRing: "rgba(173, 181, 189, 0.35)",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#F87171",
        info: palette.gray500,
    },
    typography,
    spacing,
    radius,
    shadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.35)",
        md: "0 8px 24px rgba(0, 0, 0, 0.45)",
        lg: "0 16px 40px rgba(0, 0, 0, 0.55)",
        xl: "0 24px 56px rgba(0, 0, 0, 0.65)",
        focus: "0 0 0 3px rgba(173, 181, 189, 0.35)",
    },
    motion,
    gradients: {
        hero: "linear-gradient(135deg, #212529 0%, #343A40 50%, #495057 100%)",
        card: "linear-gradient(145deg, #2B3035 0%, #343A40 100%)",
        button: "linear-gradient(135deg, #495057 0%, #6C757D 100%)",
        subtleBg: "radial-gradient(circle at top right, #343A40 0%, #212529 60%)",
    },
};

export const themes: Record<ThemeMode, Theme> = {
    light: lightTheme,
    dark: darkTheme,
};

export const getTheme = (mode: ThemeMode = "light"): Theme => themes[mode];

export default lightTheme;