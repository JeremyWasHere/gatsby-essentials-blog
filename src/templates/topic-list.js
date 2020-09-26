import React from "react"
import Img from "gatsby-image"
import { Link, graphql } from "gatsby"
import shareImage from "../../content/assets/default-content-image.jpg"
import Layout from "../components/layout"
import SEO from '../components/seo'
import styles from "./topic-list.module.css"

const TopicList = ({ data, location, pageContext }) => {

    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description
    const siteUrl = data.site.siteMetadata.siteUrl

    const { topic } = pageContext
    const { totalCount } = data.allMarkdownRemark
    const posts = data.allMarkdownRemark.edges

    return (
        <Layout location={location} title={siteTitle}>
            <SEO
                title={siteTitle}
                description={siteDescription}
                image={siteUrl + shareImage} url={siteUrl + "/topic/" + topic}
            />
            <div className={styles.topicList}>
                <h2>{topic}</h2>
                <div className={styles.postCount}>
                    There {totalCount === 1 ? "is 1 post" : "are " + totalCount + " posts"} under "{topic}"
                </div>

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
            </div>
        </Layout>
    )
}

export default TopicList

export const pageQuery = graphql`
  query topicPageQuery($topic: String) {
    site {
        siteMetadata {
          title,
          description,
          siteUrl
        }
      }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { topics: { in: [$topic] }, pageType: {eq: "blog"} } }
    ) {
      totalCount
      edges {
        node {
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