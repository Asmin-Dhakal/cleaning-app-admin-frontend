import { cn } from "../../lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Card = ({ children, className, style }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-md border border-gray-200",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
};
