import React from 'react';
import { Crown } from 'lucide-react';

export interface PremiumBadgeProps {
  size?: 'xs' | 'sm' | 'md';
  variant?: 'gold' | 'red' | 'dark' | 'outline';
  showIcon?: boolean;
  className?: string;
}

export const PremiumBadge: React.FC<PremiumBadgeProps> = ({
  size = 'sm',
  variant = 'gold',
  showIcon = true,
  className = ''
}) => {
  const sizeClasses = {
    xs: 'text-[9px] px-1.5 py-0.5 gap-1 tracking-wider',
    sm: 'text-[11px] px-2 py-0.5 gap-1.5 tracking-wider',
    md: 'text-xs px-2.5 py-1 gap-1.5 tracking-wider'
  };

  const iconSizes = {
    xs: 'w-2.5 h-2.5',
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5'
  };

  const variantClasses = {
    gold: 'bg-amber-100 text-amber-950 border border-amber-300/80 shadow-2xs',
    red: 'bg-red-600 text-white border border-red-700 shadow-2xs',
    dark: 'bg-slate-900 text-amber-300 border border-amber-400/40 shadow-2xs',
    outline: 'bg-transparent text-amber-600 border border-amber-400'
  };

  return (
    <span
      className={`inline-flex items-center font-extrabold uppercase rounded-full select-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {showIcon && <Crown className={`${iconSizes[size]} flex-shrink-0 text-amber-500`} />}
      <span>PREMIUM</span>
    </span>
  );
};
