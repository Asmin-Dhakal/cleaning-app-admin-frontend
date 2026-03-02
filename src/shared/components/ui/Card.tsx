import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn(
      'bg-white rounded-xl shadow-md border border-gray-200',
      className
    )}>
      {children}
    </div>
  );
};