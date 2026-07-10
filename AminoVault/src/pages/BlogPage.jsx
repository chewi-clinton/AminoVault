import React from "react";
import { Link } from "react-router-dom";
import "../styles/BlogPage.css";
import blogData from "../data/blogData";

const BlogPage = () => {
  return (
    <div className="blog-page">
      <section className="contact-hero-container">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">AminoVault Research Blog</h1>
          <p className="contact-hero-description">
            Guides, science, and insights on research peptides — purity,
            testing, reconstitution, and the standards that matter.
          </p>
        </div>
      </section>

      <section className="blog-grid-section">
        <div className="blog-grid">
          {blogData.map((post) => (
            <article key={post.slug} className="blog-card">
              <Link to={`/blog/${post.slug}`} className="blog-card-thumb-link">
                {post.featuredImage && (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="blog-card-thumb"
                  />
                )}
                {post.category && (
                  <span className="blog-card-badge">{post.category}</span>
                )}
              </Link>
              <div className="blog-card-body">
                <h3 className="blog-card-title">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                {post.excerpt && (
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                )}
                <Link to={`/blog/${post.slug}`} className="blog-card-readmore">
                  Read More »
                </Link>
                {post.date && (
                  <p className="blog-card-date">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
