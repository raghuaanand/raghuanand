"use client";

import { useDetailModalStore } from "@/hooks/use-detail-modal-store";
import { blogPosts } from "@/constants";

const BlogOverview = () => {
  const { openModal } = useDetailModalStore();

  return (
    <section id="blog" className="section bg-surface">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-4">
            <span className="text-lg font-sans font-medium text-accent mr-4 bg-accent/10 px-3 py-1 rounded-full">
              05
            </span>
            Recent Writing
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Sharing knowledge and insights about web development and emerging technologies.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {blogPosts.slice(0, 3).map((post, index) => (
            <article key={index} className="card hover:shadow-cardHover group">
              <div className="mb-3">
                <span className="text-sm text-accent font-medium bg-accent/10 px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              
              <h3 className="text-lg font-serif font-semibold text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                {post.summary}
              </p>
              
              <div className="flex items-center justify-between text-sm text-text-muted mb-4">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
                <span>{post.readTime} min read</span>
              </div>
              
              <a 
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm w-full"
              >
                Read Article
              </a>
            </article>
          ))}
        </div>
        
        <div className="text-center">
          <button 
            onClick={() => openModal('blog')}
            className="btn btn-primary"
          >
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogOverview;
