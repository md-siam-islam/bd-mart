import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { Product } from '../../types';
import { Price } from '../../components/common/Price';
import { useToast } from '../../context/ToastContext';
import {
  Search,
  Plus,
  Trash2,
  Edit,
  X,
  CheckCircle2,
  AlertTriangle,
  Package,
  Layers,
  Sparkles
} from 'lucide-react';

export const ProductsManage: React.FC = () => {
  const { showToast } = useToast();

  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    brand: 'BD Mart Originals',
    price: 1500,
    oldPrice: 1800,
    stock: 25,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    description: 'High quality premium product built for Bangladeshi lifestyle.',
    sku: 'BDM-NEW-01',
    warranty: '1 Year Brand Warranty'
  });

  const filtered = productsList.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter ? p.category === categoryFilter : true;
    return matchesSearch && matchesCat;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Electronics',
      brand: 'BD Mart Originals',
      price: 1500,
      oldPrice: 1800,
      stock: 25,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      description: 'High quality premium product built for Bangladeshi lifestyle.',
      sku: 'BDM-NEW-' + Math.floor(100 + Math.random() * 900),
      warranty: '1 Year Brand Warranty'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category: p.category,
      brand: p.brand,
      price: p.price,
      oldPrice: p.oldPrice || Math.round(p.price * 1.2),
      stock: p.stock,
      status: p.stock > 0 ? 'Active' : 'Out of Stock',
      image: p.images[0],
      description: p.description,
      sku: p.sku,
      warranty: p.warranty
    });
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    setProductsList((prev) => prev.filter((p) => p.id !== productToDelete.id));
    showToast(`Product "${productToDelete.name}" deleted from catalog`, 'info');
    setProductToDelete(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingProduct) {
      setProductsList((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formData.name,
                category: formData.category,
                brand: formData.brand,
                price: Number(formData.price),
                oldPrice: Number(formData.oldPrice),
                stock: Number(formData.stock),
                images: [formData.image],
                description: formData.description,
                sku: formData.sku,
                warranty: formData.warranty
              }
            : p
        )
      );
      showToast('Product updated successfully!', 'success');
    } else {
      const newProd: Product = {
        id: 'prod-' + Date.now(),
        name: formData.name,
        slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: formData.category,
        categorySlug: formData.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        subcategory: 'General',
        brand: formData.brand,
        price: Number(formData.price),
        oldPrice: Number(formData.oldPrice),
        discount: Math.round(((formData.oldPrice - formData.price) / formData.oldPrice) * 100),
        rating: 5.0,
        reviews: 1,
        stock: Number(formData.stock),
        images: [formData.image],
        description: formData.description,
        specifications: { 'Origin': 'Bangladesh' },
        sku: formData.sku,
        warranty: formData.warranty,
        tags: [formData.category, formData.brand],
        featured: true,
        newArrival: true
      };
      setProductsList((prev) => [newProd, ...prev]);
      showToast('New product added to catalog!', 'success');
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Inventory & Catalog Management ({productsList.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage product images, standard prices, sale discounts, category taxonomy, and stock reserves.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name, brand, or SKU..."
            className="w-full bg-slate-50 text-xs px-3.5 py-2 pl-9 rounded-xl border border-slate-200 outline-none focus:border-primary font-medium"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full sm:w-56 bg-slate-50 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 outline-none"
        >
          <option value="">All Categories ({productsList.length})</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="text-slate-400 border-b border-slate-100 uppercase tracking-wider font-semibold">
              <th className="pb-3">Product Name & Image</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Price / Sale Price</th>
              <th className="pb-3">Stock Level</th>
              <th className="pb-3">SKU</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((prod) => (
              <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5">
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-11 h-11 rounded-xl object-cover border border-slate-200 bg-slate-100 shrink-0"
                    />
                    <div>
                      <p className="font-bold text-slate-900 text-sm line-clamp-1">{prod.name}</p>
                      <p className="text-[11px] text-slate-400">{prod.brand}</p>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 font-semibold text-slate-700">
                  {prod.category}
                </td>

                <td className="py-3.5">
                  <span className="font-bold text-slate-900 block">৳{prod.price.toLocaleString()}</span>
                  {prod.oldPrice && prod.oldPrice > prod.price && (
                    <span className="text-[10px] text-slate-400 line-through">
                      ৳{prod.oldPrice.toLocaleString()}
                    </span>
                  )}
                </td>

                <td className="py-3.5">
                  <span
                    className={`font-bold ${
                      prod.stock <= 5
                        ? 'text-rose-600'
                        : prod.stock <= 15
                        ? 'text-amber-600'
                        : 'text-slate-800'
                    }`}
                  >
                    {prod.stock} units
                  </span>
                </td>

                <td className="py-3.5 font-mono text-[11px] text-slate-500 font-semibold">
                  {prod.sku}
                </td>

                <td className="py-3.5">
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      prod.stock > 0
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {prod.stock > 0 ? 'Active' : 'Out of Stock'}
                  </span>
                </td>

                <td className="py-3.5 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(prod)}
                      className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      title="Edit Product"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setProductToDelete(prod)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL: Add / Edit Product */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-100 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
              <h3 className="text-base font-black text-slate-900">
                {editingProduct ? 'Edit Catalog Product' : 'Add New Inventory Item'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Aarong Fine Cotton Embroidered Festive Panjabi"
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 outline-none font-semibold text-slate-900"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 outline-none font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Selling Price (৳) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 outline-none font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Sale / Old Price (৳)</label>
                  <input
                    type="number"
                    value={formData.oldPrice}
                    onChange={(e) => setFormData({ ...formData, oldPrice: Number(e.target.value) })}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 outline-none text-slate-700"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 outline-none font-bold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Primary Image URL</label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 outline-none text-slate-800"
                />
                {formData.image && (
                  <div className="mt-2 flex items-center gap-2">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-100"
                    />
                    <span className="text-[11px] text-slate-400">Live image preview</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">SKU Code</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Warranty Policy</label>
                  <input
                    type="text"
                    value={formData.warranty}
                    onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-colors cursor-pointer shadow-sm"
                >
                  {editingProduct ? 'Update Product' : 'Save New Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL: Delete Product */}
      {productToDelete && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Delete Product?</h3>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to delete "{productToDelete.name}" from inventory? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold cursor-pointer shadow-sm"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
