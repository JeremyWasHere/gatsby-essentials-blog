import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import styles from "./content-page.module.css"

const ContentPageTemplate = ({ data, location }) => {
  const page = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const siteUrl = data.site.siteMetadata.siteUrl

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={page.frontmatter.title}
        description={page.frontmatter.description || page.excerpt}
        image={siteUrl + page.frontmatter.thumbnail.childImageSharp.fixed.src}
        url={siteUrl + page.fields.slug}
      />
      <article className={styles.contentPage} itemScope itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">
            {page.frontmatter.title}
          </h1>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: page.html }}
          itemProp="articleBody"
        />
      </article>
    </Layout>
  )
}

export default ContentPageTemplate

export const pageQuery = graphql`
  query pageBySlug($slug: String!) {
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
