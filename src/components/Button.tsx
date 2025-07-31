import { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
  href?: string;
}

export default function Button({ 
  variant = 'primary', 
  children, 
  className = '', 
  href,
  ...props 
}: ButtonProps) {
  const baseStyles = 'px-6 py-2 rounded-full text-base font-semibold transition-colors cursor-pointer inline-block text-center';
  
  const variantStyles = {
    primary: 'bg-green-500 text-black hover:bg-green-400',
    secondary: 'bg-white text-black hover:bg-gray-100',
    tertiary: 'border border-green-400 text-green-400 bg-transparent hover:bg-green-400 hover:text-black'
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}