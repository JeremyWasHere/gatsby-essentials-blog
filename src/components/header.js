import React from "react"
import logo from "../../content/assets/logo.png"
import styles from "./header.module.css"
import { useStaticQuery, graphql } from "gatsby"

const Header = () => {
    const { site } = useStaticQuery(
        graphql`
          query {
            site {
              siteMetadata {
                title
              }
            }
          }
        `
      )

    const siteTitle = site.siteMetadata.title

    return (
        <header className={styles.siteHeader}>
            <nav>
                <ul className={styles.menu}>
                    <li className={styles.logo}>
                        <a href="/"><img src={logo} alt={siteTitle} title={siteTitle} />
                        <span className={styles.title}>{siteTitle}</span></a>
                    </li>
                    <li className={styles.item}><a href="/blog">My Blog</a></li>
                    <li className={styles.item}><a href="/about-me">About Me</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header