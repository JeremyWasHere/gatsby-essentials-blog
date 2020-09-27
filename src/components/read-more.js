import React from "react"
import Img from "gatsby-image"
import { Link, useStaticQuery, graphql } from "gatsby"
import styles from "./read-more.module.css"

const ReadMore = (props) => {

    let displayCount = 3
    if (props.displayCount !== undefined)
        displayCount = props.displayCount;

    const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { frontmatter: { pageType: {eq: "blog"}}}
          limit: 20
          ) {
        edges {
          node {
            id
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
  `)

    const posts = data.allMarkdownRemark.edges

    let randomPosts = props.isHome ? posts.slice(0,displayCount) : getRandomPosts(posts, displayCount, props.exclude)

    let header = props.isHome ? "<h2>A few things I have written about</h2>" : "<h2>Read this next</h2>"

    return (

        <nav className={styles.readMore}>
            <div dangerouslySetInnerHTML={{
                __html: header,
            }}/>
            
            <ul className={styles.cards}>
            {randomPosts.map(({ node }) => {
                const title = node.frontmatter.title || node.fields.slug
                return (
                    <li key={node.fields.slug} className={styles.card}>
                        <Link to={"/blog" + node.fields.slug} title={title}>
                            <div className={styles.image}><Img fixed={node.frontmatter.thumbnail.childImageSharp.fixed} alt={title} /></div>
                            <div className={styles.text}>
                                <header>
                                    <h3>{title}</h3>
                                </header>
                                <section>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: node.frontmatter.description || node.excerpt,
                                        }}
                                    />
                                    <p className={styles.cta}>Read More →</p>
                                </section>
                            </div>
                        </Link>
                    </li>
                )
            })}
            </ul>
        </nav>
    )
}

export default ReadMore

function getRandomPosts(population, k, exclude) {

    population = population.filter(function( obj ) {
        return obj.node.id !== exclude;
    });

    let n = population.length;
    if (k < 0 || k > n)
        return population;

    let result = new Array(k);
    let setsize = 21; // size of a small set minus size of an empty list

    if (k > 5)
        setsize += Math.pow(4, Math.ceil(Math.log(k * 3, 4)))

    if (n <= setsize) {
        // An n-length list is smaller than a k-length set
        let pool = population.slice();
        for (let i = 0; i < k; i++) { // invariant:  non-selected at [0,n-i)
            let j = Math.random() * (n - i) | 0;
            result[i] = pool[j];
            pool[j] = pool[n - i - 1]; // move non-selected item into vacancy
        }
    } else {
        var selected = new Set();
        for (let i = 0; i < k; i++) {
            let j = Math.random() * n | 0;
            while (selected.has(j)) {
                j = Math.random() * n | 0;
            }
            selected.add(j);
            result[i] = population[j];
        }
    }

    return result;
}