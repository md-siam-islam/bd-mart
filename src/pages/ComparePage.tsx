import React from 'react';
import { Link } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';
import { useCart } from '../context/CartContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Price } from '../components/common/Price';
import { Rating } from '../components/common/Rating';
import { Layers, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { DEFAULT_PRODUCT_IMAGE, handleProductImageError } from '../utils/imageFallback';

export const ComparePage: React.FC = () => {
  const { comparedProducts, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-custom">
        <Breadcrumb items={[{ label: 'Compare Products' }]} />

        <div className="flex items-center justify-between my-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Compare Products ({comparedProducts.length}/4)
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Side-by-side specifications, pricing, and features breakdown.
            </p>
          </div>

          {comparedProducts.length > 0 && (
            <button
              onClick={clearCompare}
              className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 p-2 rounded-xl hover:bg-rose-50"
            >
              <Trash2 className="w-4 h-4" /> Clear All
            </button>
          )}
        </div>

        {comparedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-primary flex items-center justify-center mx-auto mb-4">
              <Layers className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              No products to compare
            </h2>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Add up to 4 items from the shop catalog using the compare icon on product cards.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-xs font-bold rounded-xl shadow-md shadow-primary/25 hover:bg-primary-hover transition-colors"
            >
              Browse Shop <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm overflow-x-auto">
            <table className="w-full min-w-[700px] text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-4 font-bold text-slate-400 w-44 uppercase tracking-wider">
                    Feature
                  </th>
                  {comparedProducts.map((p) => (
                    <th key={p.id} className="p-4 w-60 align-top">
                      <div className="relative group">
                        <button
                          onClick={() => removeFromCompare(p.id)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-400"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <img
                          src={p.images?.[0] || DEFAULT_PRODUCT_IMAGE}
                          alt={p.name}
                          onError={handleProductImageError}
                          className="w-32 h-32 rounded-2xl object-cover bg-slate-50 border border-slate-100 mx-auto mb-3"
                        />
                        <Link
                          to={`/product/${p.slug}`}
                          className="font-bold text-slate-900 hover:text-primary transition-colors line-clamp-2 text-center"
                        >
                          {p.name}
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {/* Price */}
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Price</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4">
                      <Price amount={p.price} oldAmount={p.oldPrice} size="md" />
                    </td>
                  ))}
                </tr>

                {/* Rating */}
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Rating</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4">
                      <Rating value={p.rating} reviewsCount={p.reviews} size="sm" />
                    </td>
                  ))}
                </tr>

                {/* Brand */}
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Brand</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4 font-semibold text-slate-700">
                      {p.brand}
                    </td>
                  ))}
                </tr>

                {/* Category */}
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Category</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4 text-slate-600">
                      {p.category} ({p.subcategory})
                    </td>
                  ))}
                </tr>

                {/* Availability */}
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Stock Status</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4">
                      <span className="text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        In Stock ({p.stock} units)
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Warranty */}
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Warranty</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4 text-slate-700 font-medium">
                      {p.warranty}
                    </td>
                  ))}
                </tr>

                {/* Action */}
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Action</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-4">
                      <button
                        onClick={() => addToCart(p)}
                        className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
