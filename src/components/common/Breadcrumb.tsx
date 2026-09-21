import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 text-xs sm:text-sm text-slate-500">
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-primary transition-colors text-slate-600"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <li>
                {isLast || !item.link ? (
                  <span className="font-medium text-slate-900 line-clamp-1 max-w-[200px] sm:max-w-xs">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.link}
                    className="hover:text-primary transition-colors line-clamp-1 max-w-[150px]"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
