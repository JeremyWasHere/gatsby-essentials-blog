import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import styles from "./404.module.css"

import shareImage from "../../content/assets/default-content-image.jpg"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteUrl = data.site.siteMetadata.siteUrl

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" image={siteUrl + shareImage} url={siteUrl + "/404/"} />
      <article className={styles.contentPage} itemScope itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">Nope, sorry, it appears that page doesn't exist</h1>
        </header>
        <section itemProp="articleBody">

          <blockquote>
          Consider — One: Probability is a factor which operates within natural forces. Two: Probability is not operating as a factor. Three: We are now held within un-, sub-, or supernatural forces.
          </blockquote>

          <p>— Tom Stoppard, Rosencrantz and Guildenstern Are Dead</p>
        </section>
      </article>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title,
        siteUrl
      }
    }
  }
`
