interface BadgeProps {
  children: React.ReactNode;
  variant?: 'pink' | 'amber' | 'green' | 'blue';
}

export default function Badge({ children, variant = 'pink' }: BadgeProps) {
  const variantStyles = {
    pink: 'bg-pink-400',
    amber: 'bg-amber-400',
    green: 'bg-green-400',
    blue: 'bg-blue-400'
  };

  return (
    <div className={`${variantStyles[variant]} rounded-full px-2 py-0.5`}>
      <span className="text-xs font-normal text-black">
        {children}
      </span>
    </div>
  );
}