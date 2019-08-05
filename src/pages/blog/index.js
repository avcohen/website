import React from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"

import Layout from "../../layouts"

import SEO from "../../components/seo"
import { Post } from "../../components/blog"

const PostsSection = styled.section`
  padding-bottom: 3em;
  padding-right: 1em;
  header {
    margin-bottom: 2em;
  }
  h2 {
    font-weight: 400;
    font-family: "Montserrat";
    font-size: 1.5em;
  }
`

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const author = data.site.siteMetadata.author
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} author={author} title={siteTitle}>
        <SEO title="blog" />
        <PostsSection>
          <header>
            <h2>{"blog"}</h2>
          </header>
          {posts.length > 0 ? (
            posts.map(({ node }) => (
              <Post key={node.frontmatter.title} node={node} />
            ))
          ) : (
            <p>{"no posts yet."}</p>
          )}
        </PostsSection>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(blog)/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD-MM-YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
