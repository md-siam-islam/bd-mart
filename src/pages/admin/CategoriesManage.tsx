import React, { useState } from 'react';
import { CATEGORIES } from '../../data/categories';
import { Category } from '../../types';
import { useToast } from '../../context/ToastContext';
import { Plus, Trash2, Edit } from 'lucide-react';

export const CategoriesManage: React.FC = () => {
  const { showToast } = useToast();
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);

  const handleDelete = (id: string) => {
    if (confirm('Delete this category?')) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      showToast('Category removed', 'info');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Categories & Departments ({categories.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Organize catalog hierarchy, promotional banners, and product assignments.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="text-slate-400 border-b border-slate-100 uppercase tracking-wider">
              <th className="pb-3 font-bold">Category</th>
              <th className="pb-3 font-bold">Bengali Label</th>
              <th className="pb-3 font-bold">Slug</th>
              <th className="pb-3 font-bold">Live Items</th>
              <th className="pb-3 font-bold">Subcategories</th>
              <th className="pb-3 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3 flex items-center gap-3">
                  <img
                    src={cat.image}
                    alt=""
                    className="w-10 h-10 rounded-xl object-cover border shrink-0 bg-slate-50"
                  />
                  <span className="font-bold text-slate-900">{cat.name}</span>
                </td>
                <td className="py-3 font-semibold text-slate-700">{cat.nameBn || '—'}</td>
                <td className="py-3 font-mono text-slate-400">/{cat.slug}</td>
                <td className="py-3 font-bold text-primary">{cat.productCount}</td>
                <td className="py-3 text-slate-500 max-w-xs truncate">
                  {cat.subcategories.slice(0, 3).join(', ')}...
                </td>
                <td className="py-3 text-right">
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-1.5 rounded-lg border hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
