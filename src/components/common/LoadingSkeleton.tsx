import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm animate-pulse flex flex-col">
      <div className="w-full aspect-square bg-slate-200 rounded-xl mb-4" />
      <div className="h-3 bg-slate-200 rounded w-1/3 mb-2" />
      <div className="h-4 bg-slate-200 rounded w-4/5 mb-3" />
      <div className="flex items-center gap-2 mb-3">
        <div className="h-3 bg-slate-200 rounded w-16" />
        <div className="h-3 bg-slate-200 rounded w-10" />
      </div>
      <div className="mt-auto flex items-center justify-between pt-2">
        <div className="h-6 bg-slate-200 rounded w-20" />
        <div className="h-8 bg-slate-200 rounded-lg w-8" />
      </div>
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 bg-slate-100 rounded-lg w-full" />
      ))}
    </div>
  );
};
