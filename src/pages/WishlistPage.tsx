import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Price } from '../components/common/Price';
import { Rating } from '../components/common/Rating';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: typeof wishlist[0]) => {
    addToCart(product, 1, product.colors?.[0]?.name, product.sizes?.[0]);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-custom">
        <Breadcrumb items={[{ label: 'My Wishlist' }]} />

        <div className="flex items-center justify-between my-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              My Saved Wishlist ({wishlist.length})
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Keep track of items you love and move them directly into your shopping cart.
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 p-2 rounded-xl hover:bg-rose-50"
            >
              <Trash2 className="w-4 h-4" /> Clear All
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              Your wishlist is currently empty
            </h2>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Explore our trending lifestyle collections and tap the heart icon on any product to save it here!
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-xs font-bold rounded-xl shadow-md shadow-primary/25 hover:bg-primary-hover transition-colors"
            >
              Discover Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between group relative"
              >
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-400 transition-colors shadow-xs"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div>
                  <Link
                    to={`/product/${product.slug}`}
                    className="w-full aspect-square rounded-xl overflow-hidden bg-slate-50 relative mb-3 block"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1">
                    {product.brand}
                  </span>

                  <Link
                    to={`/product/${product.slug}`}
                    className="text-xs sm:text-sm font-bold text-slate-900 hover:text-primary transition-colors line-clamp-1 mb-1.5"
                  >
                    {product.name}
                  </Link>

                  <div className="mb-2">
                    <Rating value={product.rating} reviewsCount={product.reviews} size="sm" />
                  </div>

                  <Price
                    amount={product.price}
                    oldAmount={product.oldPrice}
                    discountPercentage={product.discount}
                    size="sm"
                  />
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
