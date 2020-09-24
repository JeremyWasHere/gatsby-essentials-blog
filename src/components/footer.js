import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons"
import styles from "./footer.module.css"
import { useStaticQuery, graphql } from "gatsby"

const Footer = () => {
    const { site } = useStaticQuery(
        graphql`
          query {
            site {
              siteMetadata {
                title
                social {
                  twitter,
                  instagram,
                  github
                }
              }
            }
          }
        `
      )

    const siteInfo = site.siteMetadata

    return (
        <footer className={styles.siteFooter}>
            &copy; {new Date().getFullYear()} {siteInfo.title}. All rights reserved.
            <div className={styles.socialIcons}>
            <a href={`https://twitter.com/` + siteInfo.social.twitter} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} /> </a>
            <a href={`https://instagram.com/` + siteInfo.social.instagram} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} /> </a>
            <a href={`https://github.com/` + siteInfo.social.github} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} /> </a>
            </div>
        </footer>
    )
}

export default Footer