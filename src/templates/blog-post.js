import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import ReadMore from "../components/read-more"
import Share from "../components/share"
import Topics from "../components/topics"
import SEO from "../components/seo"

import styles from "./blog-post.module.css"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const siteUrl = data.site.siteMetadata.siteUrl

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={siteUrl + post.frontmatter.thumbnail.childImageSharp.fixed.src}
        url={siteUrl + "/blog" + post.fields.slug}
      />
      <article className={styles.blogPost} itemScope itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">
            {post.frontmatter.title}
          </h1>
        </header>

        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />

        <Share url={siteUrl + "/blog" + post.fields.slug} />

        <Topics topics={post.frontmatter.topics} />

        <footer>
          <Bio />
        </footer>
      </article>

      <ReadMore displayCount={3} isHome={false} exclude={post.id} />

    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query blogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title,
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      fields { slug }
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        topics
        thumbnail {
          childImageSharp {
            fixed(width: 1080, height: 1080) {
              base64
              width
              height
              src
              srcSet
            }
          }
        }
      }
    }
  }
`
