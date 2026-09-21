import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { useTheme, ThemeMode } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeToggleProps {
  variant?: 'dropdown' | 'segmented';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'dropdown',
  className = ''
}) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const options: { mode: ThemeMode; label: string; icon: typeof Sun; desc: string }[] = [
    { mode: 'light', label: 'Light', icon: Sun, desc: 'Clean bright layout' },
    { mode: 'black', label: 'Black', icon: Moon, desc: 'Deep OLED dark mode' },
    { mode: 'system', label: 'System', icon: Monitor, desc: 'Follows OS preference' }
  ];

  // Segmented Pill Variant (Perfect for mobile menu drawer)
  if (variant === 'segmented') {
    return (
      <div
        className={`inline-flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 ${className}`}
        role="group"
        aria-label="Select color theme"
      >
        {options.map((opt) => {
          const Icon = opt.icon;
          const isActive = theme === opt.mode;
          return (
            <button
              key={opt.mode}
              onClick={() => setTheme(opt.mode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-slate-900 text-primary shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title={`${opt.label} mode - ${opt.desc}`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-primary' : ''}`} />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Current theme active icon
  const ActiveIcon =
    theme === 'black' ? Moon : theme === 'light' ? Sun : Monitor;

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {/* Theme Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700 flex items-center gap-1.5 cursor-pointer group"
        title={`Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)} (${resolvedTheme === 'dark' ? 'Dark active' : 'Light active'})`}
        aria-label="Toggle theme menu"
        aria-expanded={isOpen}
      >
        <div className="relative">
          {theme === 'black' ? (
            <Moon className="w-5 h-5 text-indigo-400 transition-transform group-hover:scale-110" />
          ) : theme === 'light' ? (
            <Sun className="w-5 h-5 text-amber-500 transition-transform group-hover:scale-110" />
          ) : (
            <div className="relative">
              <Monitor className="w-5 h-5 text-slate-600 dark:text-slate-300 transition-transform group-hover:scale-110" />
              <span
                className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-white dark:border-slate-900 ${
                  resolvedTheme === 'dark' ? 'bg-indigo-400' : 'bg-amber-500'
                }`}
              />
            </div>
          )}
        </div>
      </button>

      {/* Floating Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 overflow-hidden"
          >
            <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Select Theme
            </div>

            <div className="p-1 space-y-0.5">
              {options.map((opt) => {
                const Icon = opt.icon;
                const isSelected = theme === opt.mode;

                return (
                  <button
                    key={opt.mode}
                    onClick={() => {
                      setTheme(opt.mode);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
                      isSelected
                        ? 'bg-primary/10 text-primary dark:text-primary font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          isSelected
                            ? 'bg-primary text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs">{opt.label}</div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                          {opt.desc}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-primary shrink-0 stroke-[2.5]" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
