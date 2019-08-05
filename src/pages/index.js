import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import Layout from "../layouts"
import SEO from "../components/seo"
// import { Post } from "../components/blog"
import { underlineMixin } from "../components/shared"

const SeeMore = styled.span`
  a {
    color: black;
    ${underlineMixin}
  }
`
const Bio = styled.p`
  a {
    text-decoration: underline;
    color: black;
  }
`
class Index extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const author = data.site.siteMetadata.author
    const bio = data.site.siteMetadata.bio
    // const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} author={author} title={siteTitle}>
        <SEO title="home" />
        <Bio
          dangerouslySetInnerHTML={{
            __html: bio,
          }}
        />
        {/* {posts.map(({ node }) => (
          <Post node={node} />
        ))} */}
        {/* <SeeMore>
          <Link to="/blog">{`more >`}</Link>
        </SeeMore> */}
      </Layout>
    )
  }
}

export default Index

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author
        title
        bio
      }
    }
    gif: file(absolutePath: { regex: "/construction.gif/" }) {
      childImageSharp {
        fixed(width: 100, height: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1
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
          }
        }
      }
    }
  }
`
