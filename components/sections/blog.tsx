import SectionTitle from "@/components/section-title";
import { blogPosts } from "@/constants";

const Blog = () => {
  return (
    <section id="blog" className="section bg-background">
      <div className="container">
        <SectionTitle title="Recent Writing" titleNo="05" />
        
        <div className="mt-16">
          <div className="text-center mb-12">
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              I enjoy sharing my knowledge and experiences with the developer community. 
              Here are some of my recent articles on web development, best practices, and emerging technologies.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="card hover:shadow-cardHover group">
                <div className="mb-4">
                  <span className="text-sm text-accent font-medium bg-accent/10 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-serif font-semibold text-primary mb-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-text-secondary mb-4 line-clamp-3">
                  {post.summary}
                </p>
                
                <div className="flex items-center justify-between text-sm text-text-muted">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <span>{post.readTime} min read</span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <a 
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-accent hover:text-primary font-medium transition-colors"
                  >
                    Read Article
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="https://dev.to/raghuanand" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              View All Articles
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
