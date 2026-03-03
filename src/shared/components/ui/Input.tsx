import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import type { Theme } from "../../../styles/themes";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  labelClassName?: string;
  theme?: Theme;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, labelClassName, theme, ...props }, ref) => {
    const labelColor = theme ? theme.colors.text : "#374151";
    const inputBgColor = theme ? `${theme.colors.surface}99` : "#ffffff";
    const inputBorderColor = theme ? theme.colors.border : "#d1d5db";
    const inputTextColor = theme ? theme.colors.text : "#111827";
    const errorColor = theme ? theme.colors.danger : "#ef4444";

    return (
      <div className="w-full">
        {label && (
          <label
            className={cn("block text-sm font-semibold mb-2", labelClassName)}
            style={{ color: labelColor }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-1 transition-all duration-200 text-base",
            className,
          )}
          style={
            {
              backgroundColor: error ? `${errorColor}10` : inputBgColor,
              borderColor: error ? errorColor : inputBorderColor,
              color: error ? errorColor : inputTextColor,
              "--tw-ring-color": error ? errorColor : "var(--color-accent)",
            } as any
          }
          placeholder={props.placeholder}
          {...props}
        />
        {error && (
          <p
            className="mt-1.5 text-sm flex items-start gap-1"
            style={{ color: errorColor }}
          >
            <svg
              className="w-4 h-4 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
