import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../styles/BlogPage.css";
import blogData from "../data/blogData";

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogData.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="blog-post-notfound">
        <h2>Post not found</h2>
        <p>This article may have been removed or no longer exists.</p>
        <button className="lab-btn" onClick={() => navigate("/blog")}>
          Back to Blog
        </button>
      </div>
    );
  }

  const related = blogData.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="blog-post-page">
      <section className="blog-post-hero">
        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="blog-post-hero-img"
          />
        )}
        <div className="blog-post-hero-overlay" />
        <div className="blog-post-hero-content">
          <nav className="blog-post-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> /{" "}
            <span>{post.title}</span>
          </nav>
          {post.category && (
            <span className="blog-card-badge blog-post-badge">
              {post.category}
            </span>
          )}
          <h1 className="blog-post-title">{post.title}</h1>
          {post.date && (
            <p className="blog-post-date">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </div>
      </section>

      <div className="blog-post-body-wrap">
        <article
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {related.length > 0 && (
          <aside className="blog-post-related">
            <h3>More Articles</h3>
            <div className="blog-post-related-list">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/blog/${r.slug}`}
                  className="blog-post-related-item"
                >
                  {r.featuredImage && (
                    <img src={r.featuredImage} alt={r.title} />
                  )}
                  <span>{r.title}</span>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default BlogPostPage;
