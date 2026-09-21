import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogPosts';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Fashion', 'Technology', 'Buying Guides', 'Grocery', 'Gaming', 'Lifestyle'];

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((b) => b.category === selectedCategory);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-custom">
        <Breadcrumb items={[{ label: 'BD Mart Blog' }]} />

        <div className="text-center my-6 max-w-xl mx-auto">
          <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
            Guides, Reviews & Trends
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            The BD Mart Journal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Expert buying guides, traditional craftsmanship spotlights, and smart living advice for Bangladeshi shoppers.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col group"
            >
              <Link
                to={`/blog/${post.slug}`}
                className="aspect-[16/10] overflow-hidden bg-slate-100 relative block"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  {post.category}
                </span>
              </Link>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-2 block"
                  >
                    {post.title}
                  </Link>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs font-bold text-slate-700">{post.author.name}</span>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1"
                  >
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
