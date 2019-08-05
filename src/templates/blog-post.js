import React from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"

import Layout from "../layouts"
import SEO from "../components/seo"
import { BaseArticle, SectionFooter, End } from "../components/shared"

const BlogPost = styled(BaseArticle)`
  ul,
  ol {
    padding-left: 1em;
  }
`
const PostFooter = styled(SectionFooter)``

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const author = this.props.data.site.siteMetadata.author
    const { previous, next } = this.props.pageContext

    return (
      <Layout author={author} location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <BlogPost>
          <h1 className={"title"}>{post.frontmatter.title}</h1>
          <p className={"date"}>{post.frontmatter.date}</p>
          {"—"}
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </BlogPost>
        <End>{"-###-"}</End>
        <PostFooter>
          <ul>
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  {`< ${previous.frontmatter.title}`}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {`${next.frontmatter.title} >`}
                </Link>
              )}
            </li>
          </ul>
        </PostFooter>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
