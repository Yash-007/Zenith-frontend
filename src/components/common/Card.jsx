import { clsx } from 'clsx';

export default function Card({ 
  className = '',
  children,
  padding = true,
  ...props 
}) {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg shadow-sm border border-gray-200',
        padding && 'p-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
