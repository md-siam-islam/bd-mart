import React from 'react';

interface PriceProps {
  amount: number;
  oldAmount?: number;
  discountPercentage?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDiscountBadge?: boolean;
  className?: string;
}

export const Price: React.FC<PriceProps> = ({
  amount,
  oldAmount,
  discountPercentage,
  size = 'md',
  showDiscountBadge = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-sm font-bold',
    md: 'text-base font-bold',
    lg: 'text-xl font-bold',
    xl: 'text-2xl lg:text-3xl font-extrabold',
  };

  const oldSizeClasses = {
    sm: 'text-xs',
    md: 'text-xs font-normal',
    lg: 'text-sm font-normal',
    xl: 'text-base font-normal',
  };

  // Calculate discount if oldAmount is given but discountPercentage is not
  const discount =
    discountPercentage ||
    (oldAmount && oldAmount > amount
      ? Math.round(((oldAmount - amount) / oldAmount) * 100)
      : undefined);

  return (
    <div className={`flex items-baseline gap-2 flex-wrap ${className}`}>
      <span className={`text-slate-900 dark:text-slate-100 ${sizeClasses[size]}`}>
        ৳{amount.toLocaleString('en-IN')}
      </span>

      {oldAmount && oldAmount > amount && (
        <span className={`line-through text-slate-400 ${oldSizeClasses[size]}`}>
          ৳{oldAmount.toLocaleString('en-IN')}
        </span>
      )}

      {showDiscountBadge && discount && (
        <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-0.5 rounded-full">
          Save {discount}%
        </span>
      )}
    </div>
  );
};
