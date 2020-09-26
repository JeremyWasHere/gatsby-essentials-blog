import React from 'react'
import Img from "gatsby-image"
import { Link, graphql } from 'gatsby'
import Layout from "../components/layout"
import SEO from '../components/seo'
import Pagination from '../components/pagination'
import styles from "./blog-list.module.css"
import shareImage from "../../content/assets/default-content-image.jpg"

const BlogIndex = ({ data, location, pageContext }) => {
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description
    const siteUrl = data.site.siteMetadata.siteUrl
    const posts = data.allMarkdownRemark.edges

    const { currentPage, numPages } = pageContext

    return (
        <Layout location={location} title={siteTitle}>
            <SEO
                title={siteTitle}
                description={siteDescription}
                image={siteUrl + shareImage} url={siteUrl + "/blog/"}
            />
            <div className={styles.blogPostList}>
                {posts.map(({ node }) => {
                    const title = node.frontmatter.title || node.fields.slug
                    return (
                        <article
                            key={node.fields.slug}
                            itemScope
                            itemType="http://schema.org/Article"
                        >
                            <div className={styles.image}>
                                <Link to={"/blog" + node.fields.slug} itemProp="url">
                                    <Img fixed={node.frontmatter.thumbnail.childImageSharp.fixed} alt={title} title={title} />
                                </Link>
                            </div>
                            <div className={styles.text}>
                                <header>
                                    <h3>
                                        <Link to={"/blog" + node.fields.slug} itemProp="url">
                                            <span itemProp="headline">{title}</span>
                                        </Link>
                                    </h3>
                                </header>
                                <section>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: node.frontmatter.description || node.excerpt,
                                        }}
                                        itemProp="description"
                                    />
                                    <p className={styles.cta}><Link to={"/blog" + node.fields.slug} itemProp="url">Read More →</Link></p>
                                </section>
                            </div>
                        </article>
                    )
                })}

                <Pagination currentPage={currentPage} numPages={numPages} path="/blog/" /> 
            </div>
        </Layout>
    )
}

export default BlogIndex

export const pageQuery = graphql`
    query blogPageQuery($skip: Int!, $limit: Int!) {
      site {
        siteMetadata {
          title,
          description,
          siteUrl
        }
      }
      allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { frontmatter: { pageType: {eq: "blog"}}}
           limit: $limit
           skip: $skip
          ) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
              thumbnail {
                childImageSharp {
                  fixed(width: 308, height: 200) {
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
      }
    }
  `

