const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const postTemplate = path.resolve(`./src/templates/blog-post.js`)
  const postListTemplate = path.resolve('./src/templates/blog-list.js')
  const pageTemplate = path.resolve(`./src/templates/content-page.js`)

  // Fetch blog posts...
  const postsResult = await graphql(
    `
      {
        site {
          siteMetadata {
            numPostsPerPage
          }
        }
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: {
            frontmatter: {pageType: {eq: "blog"}}
          }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                thumbnail {
                  childImageSharp {
                    fixed(width: 200, height: 200) {
                      base64
                      width
                      height
                      src
                      srcSet
                    }
                  }
                }
                pageType
              }
            }
          }
        }
      }
    `
  )

  if (postsResult.errors) {
    throw postsResult.errors
  }

  const numPostsPerPage = postsResult.data.site.siteMetadata.numPostsPerPage
  const posts = postsResult.data.allMarkdownRemark.edges

  posts.forEach((post) => {
    createPage({
      path: "/blog" + post.node.fields.slug,
      component: postTemplate,
      context: {
        slug: post.node.fields.slug
      }
    })

    const postsPerPage = numPostsPerPage;
    const numPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog` : `/blog/${i + 1}`,
        component: postListTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1
        },
      });
    });
  })

  // Fetch content pages...
  const pagesResult = await graphql(
    `
      {
        site {
          siteMetadata {
            numPostsPerPage
          }
        }
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: {
            frontmatter: {pageType: {eq: "page"}}
          }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                thumbnail {
                  childImageSharp {
                    fixed(width: 200, height: 200) {
                      base64
                      width
                      height
                      src
                      srcSet
                    }
                  }
                }
                pageType
              }
            }
          }
        }
      }
    `
  )

  if (pagesResult.errors) {
    throw pagesResult.errors
  }

  const pages = pagesResult.data.allMarkdownRemark.edges

  pages.forEach((page) => {
    createPage({
      path: page.node.fields.slug,
      component: pageTemplate,
      context: {
        slug: page.node.fields.slug
      }
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
