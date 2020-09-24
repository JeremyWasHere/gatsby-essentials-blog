import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import ReadMore from "../components/read-more"
import Header from "../components/header"
import Footer from "../components/footer"
import styles from "./index.module.css"
import splash from "../../content/assets/splash.jpg"
import shareImage from "../../content/assets/default-content-image.jpg"

const Index = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description
  const siteUrl = data.site.siteMetadata.siteUrl

  return (
    <div>
      <SEO title="Welcome" description={siteDescription} image={siteUrl + shareImage} url={siteUrl + "/"} />
      <Header />
      <div className={styles.splash} style={{backgroundImage: "url(" + splash + ")"}}>
        <div className={styles.splashContent}>
          <h1>{siteTitle}</h1>
          <p>{siteDescription}</p>
        </div>
      </div>
      <ReadMore displayCount={6} isHome={true} />
      <Footer />
    </div>
  )
}

export default Index

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title,
        description,
        siteUrl
      }
    }
  }
`
