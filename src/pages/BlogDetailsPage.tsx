import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogPosts';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';

export const BlogDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const post = useMemo(() => {
    return BLOG_POSTS.find((b) => b.slug === slug) || BLOG_POSTS[0];
  }, [slug]);

  const relatedPosts = useMemo(() => {
    return BLOG_POSTS.filter((b) => b.id !== post.id).slice(0, 3);
  }, [post]);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container-custom max-w-4xl">
        <Breadcrumb
          items={[
            { label: 'Blog', link: '/blog' },
            { label: post.title }
          ]}
        />

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm mt-4">
          <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-2">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center justify-between gap-4 pb-6 border-b border-slate-100 flex-wrap text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-9 h-9 rounded-full object-cover border border-slate-200"
              />
              <div>
                <span className="font-bold text-slate-800 block">{post.author.name}</span>
                <span className="text-[11px] text-slate-400">{post.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {post.readTime}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 my-6">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Article Body */}
          <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
            <p className="font-medium text-slate-800 text-base leading-relaxed">
              {post.excerpt}
            </p>
            <div className="whitespace-pre-line">{post.content}</div>
          </div>

          {/* Tags */}
          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-slate-400" />
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-lg"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h3 className="text-xl font-black text-slate-900 mb-6">More from the Journal</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((r) => (
              <Link
                key={r.id}
                to={`/blog/${r.slug}`}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 p-4 shadow-xs hover:shadow-md transition-all group block"
              >
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3">
                  <img src={r.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                  {r.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
