import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"

import Layout from "../layouts"
import SEO from "../components/seo"
import {
  BaseArticle,
  SectionFooter,
  End,
  underlineMixin,
} from "../components/shared"

const WorksArticle = styled(BaseArticle)`
  background-color: white;
  p {
    margin: 0.25em 0;
  }
  a {
    color: black;
    text-decoration: underline;
    /* ${underlineMixin} */
  }
  .note {
    font-style: italic;
  }
  .designer {
  }
  .depricated {
    margin-left: 0.5em;
    font-size: 12px;
    font-style: italic;
  }
  .gif {
    width: 100%;
  }
  video {
    margin: 0 auto;
    display: flex;
    border-top: 1px solid black;
    border-right: 1.2px solid black;
    border-left: 1.1px solid black;
    border-bottom: 1px solid black;
    max-height: 500px;
  }
  div.video--portrait {
    p > video {
      width: auto;
    }
  }
  div.video--landscape {
    p > video {
      width: auto;
      max-width: 100%;
    }
  }
`
const WorksFooter = styled(SectionFooter)``
const TagsList = styled.ul`
  display: flex;
  margin: 0.5em 0;
  li {
    font-size: 14px;
    list-style: none;
    margin-right: 0.5em;
    text-transform: lowercase;
    a,
    span {
      color: black;
      /* ${underlineMixin} */
    }
  }
`

const Tags = ({ tags }) => (
  <TagsList>
    {tags.map(tag => (
      <li key={tag}>
        {/* <Link to={`/works#${tag}`}>{`#${tag}`}</Link> */}
        <span>#{tag}</span>
      </li>
    ))}
  </TagsList>
)

class WorksItemTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const author = this.props.data.site.siteMetadata.author
    const transitionSettings = {
      cover: true,
      bg: "white",
      duration: 1.5,
    }

    const { previous, next } = this.props.pageContext
    return (
      <Layout author={author} location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <WorksArticle>
          <h1 className={"title"}>{post.frontmatter.title}</h1>
          <p>{post.frontmatter.description}</p>
          <p
            className="note"
            dangerouslySetInnerHTML={{ __html: post.frontmatter.note }}
          />
          {/* <Tags tags={post.frontmatter.tags} /> */}
          {post.frontmatter.about && <p>{post.frontmatter.about}</p>}
          {post.frontmatter.designer && post.frontmatter.designer_link && (
            <p
              className="designer"
              dangerouslySetInnerHTML={{
                __html: `design by: <a target="_blank" rel="noopener noreferrer" href=${post.frontmatter.designer_link}>${post.frontmatter.designer}</a>`,
              }}
            />
          )}
          {post.frontmatter.link && (
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={post.frontmatter.link}
              >
                {"link"}
              </a>
              {post.frontmatter.isDepricated && (
                <span className="depricated">{"depricated"}</span>
              )}
            </p>
          )}
          {post.frontmatter.source && (
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={post.frontmatter.source}
              >
                {"source"}
              </a>
            </p>
          )}
          {"—"}
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </WorksArticle>
        <End>{"-###-"}</End>
        <WorksFooter>
          <ul>
            <li>
              {previous && (
                <AniLink
                  {...transitionSettings}
                  direction="left"
                  to={previous.fields.slug}
                  rel="prev"
                >
                  {`< ${previous.frontmatter.title}`}
                </AniLink>
              )}
            </li>
            <li>
              {next && (
                <AniLink
                  {...transitionSettings}
                  direction="right"
                  to={next.fields.slug}
                  rel="next"
                >
                  {`${next.frontmatter.title} >`}
                </AniLink>
              )}
            </li>
          </ul>
        </WorksFooter>
      </Layout>
    )
  }
}

export default WorksItemTemplate

export const pageQuery = graphql`
  query WorksItemBySlug($slug: String!) {
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
        tags
        source
        link
        excerpt
        about
        note
        designer
        designer_link
        isDepricated
      }
    }
  }
`
