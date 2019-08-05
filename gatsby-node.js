const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const errorWrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

const markdownQuery = `
{
  posts : allMarkdownRemark(filter: { fileAbsolutePath: {regex: "/(blog)/"}}, sort: {fields: frontmatter___date}, limit: 1000) {
    edges {
    node {
        id
        frontmatter {
          title
          description
          date
          tags
        }
        fields {
          slug
        }
      }
    }
  }
  works : allMarkdownRemark(filter: { fileAbsolutePath: {regex: "/(works)/"}}, sort: {fields: frontmatter___date}, limit: 1000) {
    edges {
    node {
        id
        frontmatter {
          title
          description
          date
          tags
        }
        fields {
          slug
        }
      }
    }
  }
}
`

const createPosts = (posts, createPage, template) =>
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: template,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

const createWorks = (works, createPage, template) =>
  works.forEach((work, index) => {
    const previous = index === works.length - 1 ? null : works[index + 1].node
    const next = index === 0 ? null : works[index - 1].node

    createPage({
      path: work.node.fields.slug,
      component: template,
      context: {
        slug: work.node.fields.slug,
        previous,
        next,
      },
    })
  })

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)
  const worksItemTemplate = path.resolve(`./src/templates/works-item.js`)

  const result = await errorWrapper(
    graphql(
      `
        ${markdownQuery}
      `
    )
  )
  createPosts(result.data.posts.edges, createPage, blogPostTemplate)
  createWorks(result.data.works.edges, createPage, worksItemTemplate)
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
