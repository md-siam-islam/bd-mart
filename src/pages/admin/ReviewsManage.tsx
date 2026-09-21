import React, { useState } from 'react';
import { CUSTOMER_REVIEWS } from '../../data/reviews';
import { CustomerReview } from '../../types';
import { Rating } from '../../components/common/Rating';
import { useToast } from '../../context/ToastContext';
import { Check, X, Trash2, MessageSquare } from 'lucide-react';

export const ReviewsManage: React.FC = () => {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<CustomerReview[]>(CUSTOMER_REVIEWS);

  const handleDelete = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast('Review removed from storefront', 'info');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Product Reviews Moderation ({reviews.length})
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Approve, review, and moderate customer testimonials and verified feedback.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="text-slate-400 border-b border-slate-100 uppercase tracking-wider">
              <th className="pb-3 font-bold">Customer</th>
              <th className="pb-3 font-bold">Rating</th>
              <th className="pb-3 font-bold">Comment Feedback</th>
              <th className="pb-3 font-bold">Verified</th>
              <th className="pb-3 font-bold">Date</th>
              <th className="pb-3 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reviews.map((rev) => (
              <tr key={rev.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3 font-bold text-slate-900">{rev.userName}</td>
                <td className="py-3">
                  <Rating value={rev.rating} showNumber={false} size="sm" />
                </td>
                <td className="py-3 text-slate-600 max-w-sm">{rev.comment}</td>
                <td className="py-3">
                  {rev.verifiedPurchase ? (
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  ) : (
                    <span className="text-slate-400">Regular</span>
                  )}
                </td>
                <td className="py-3 text-slate-400 text-[11px]">{rev.date}</td>
                <td className="py-3 text-right">
                  <button
                    onClick={() => handleDelete(rev.id)}
                    className="p-1.5 rounded-lg border hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                    title="Delete Review"
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
