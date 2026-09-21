import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  reviewsCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  reviewsCount,
  size = 'sm',
  showNumber = true,
}) => {
  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFull = value >= star;
          const isHalf = !isFull && value >= star - 0.5;

          return (
            <Star
              key={star}
              className={`${starSizes[size]} ${
                isFull
                  ? 'fill-amber-400 text-amber-400'
                  : isHalf
                  ? 'fill-amber-400/50 text-amber-400'
                  : 'text-slate-300'
              }`}
            />
          );
        })}
      </div>

      {showNumber && (
        <span className={`font-semibold text-slate-700 ${textSizes[size]}`}>
          {value.toFixed(1)}
        </span>
      )}

      {reviewsCount !== undefined && (
        <span className={`text-slate-400 ${textSizes[size]}`}>
          ({reviewsCount})
        </span>
      )}
    </div>
  );
};
