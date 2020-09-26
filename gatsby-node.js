const path = require(`path`)
const _ = require("lodash")

const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const postTemplate = path.resolve(`./src/templates/blog-post.js`)
  const postListTemplate = path.resolve('./src/templates/blog-list.js')
  const pageTemplate = path.resolve(`./src/templates/content-page.js`)
  const topicListTemplate = path.resolve("src/templates/topic-list.js")

  const result = await graphql(
    `
      {
        site {
          siteMetadata {
            numPostsPerPage
          }
        }
        pagesRemark: allMarkdownRemark(
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
        postsRemark: allMarkdownRemark(
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
        topicsGroup: allMarkdownRemark(limit: 1000) {
          group(field: frontmatter___topics) {
            fieldValue
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const numPostsPerPage = result.data.site.siteMetadata.numPostsPerPage
  const posts = result.data.postsRemark.edges

  posts.forEach((post) => {
    createPage({
      path: "/blog" + post.node.fields.slug,
      component: postTemplate,
      context: {
        slug: post.node.fields.slug
      }
    })

    const numPages = Math.ceil(posts.length / numPostsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog` : `/blog/${i + 1}`,
        component: postListTemplate,
        context: {
          limit: numPostsPerPage,
          skip: i * numPostsPerPage,
          numPages,
          currentPage: i + 1
        },
      });
    });
  })

  const topics = result.data.topicsGroup.group

  topics.forEach(topic => {
    createPage({
      path: `/topic/${_.kebabCase(topic.fieldValue)}/`,
      component: topicListTemplate,
      context: {
        topic: topic.fieldValue,
      }
    })
  })

  const pages = result.data.pagesRemark.edges

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
