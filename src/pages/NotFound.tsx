import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-lg">
        <div className="text-6xl font-black text-primary mb-2">404</div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
          Page Not Found
        </h1>
        <p className="text-xs text-slate-500 mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md shadow-primary/25 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Go to Homepage
          </Link>
          <Link
            to="/shop"
            className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" /> Browse Shop
          </Link>
        </div>
      </div>
    </div>
  );
};
