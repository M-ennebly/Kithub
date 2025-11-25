
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin } from 'lucide-react';
import { MOCK_BLOG_POSTS } from '../constants';
import SpotlightCard from '../components/SpotlightCard';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = MOCK_BLOG_POSTS.find(p => p.slug === slug);
  
  // Find next post for navigation
  const currentIndex = MOCK_BLOG_POSTS.findIndex(p => p.slug === slug);
  const nextPost = currentIndex >= 0 && currentIndex < MOCK_BLOG_POSTS.length - 1 ? MOCK_BLOG_POSTS[currentIndex + 1] : null;
  const prevPost = currentIndex > 0 ? MOCK_BLOG_POSTS[currentIndex - 1] : null;

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Article not found</h2>
        <Link to="/blog" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-12 min-h-screen">
      
      {/* Back Link */}
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-8">
        <ArrowLeft size={14} /> Back to Articles
      </Link>

      {/* Article Header */}
      <div className="mb-10 text-center">
         <div className="flex items-center justify-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
               {post.category}
            </span>
            <span className="text-zinc-400 text-xs">•</span>
            <span className="text-zinc-500 text-sm font-medium">{post.readTime}</span>
         </div>
         <h1 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-6 leading-tight">
            {post.title}
         </h1>
         <div className="flex items-center justify-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold">
                  {post.author.charAt(0)}
               </div>
               <span>{post.author}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
               <Calendar size={14} /> {post.date}
            </div>
         </div>
      </div>

      {/* Featured Image */}
      <div className="rounded-2xl overflow-hidden aspect-video mb-12 shadow-2xl border border-zinc-200 dark:border-zinc-800">
         <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="prose prose-zinc dark:prose-invert max-w-none mx-auto mb-16">
         {/* Using dangerouslySetInnerHTML for mock content structure. In production, use a Markdown parser. */}
         <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Share & Tags */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 border-y border-zinc-200 dark:border-zinc-800 mb-16">
         <div className="text-sm font-medium text-zinc-900 dark:text-white">
            Share this article
         </div>
         <div className="flex gap-4">
            <button className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 transition-colors">
               <Twitter size={18} />
            </button>
            <button className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 transition-colors">
               <Linkedin size={18} />
            </button>
            <button className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 transition-colors">
               <Share2 size={18} />
            </button>
         </div>
      </div>

      {/* Next/Prev Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {prevPost ? (
            <SpotlightCard as={Link} to={`/blog/${prevPost.slug}`} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-surface hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group">
               <div className="text-xs text-zinc-500 mb-2">Previous Article</div>
               <div className="font-bold text-zinc-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                  {prevPost.title}
               </div>
            </SpotlightCard>
         ) : <div />}

         {nextPost ? (
            <SpotlightCard as={Link} to={`/blog/${nextPost.slug}`} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-surface hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group text-right">
               <div className="text-xs text-zinc-500 mb-2">Next Article</div>
               <div className="font-bold text-zinc-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                  {nextPost.title}
               </div>
            </SpotlightCard>
         ) : <div />}
      </div>

    </article>
  );
};

export default BlogPostPage;
