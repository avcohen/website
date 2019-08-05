import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { underlineMixin } from "../shared"

export const Tags = ({ node }) => null

const PostContainer = styled.div`
  margin: 1.5em 0;
  vertical-align: middle;
  span {
    font-size: 14px;
    text-transform: lowercase;
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
    display: inline;
  }

  a {
    color: black;
    ${underlineMixin}
  }
  p {
    margin-top: 0.5em;
  }

  li {
    margin-right: 1em;
    display: inline;
  }
`

export const Post = ({ node }) => {
  const title = node.frontmatter.title || node.fields.slug
  return (
    <PostContainer key={node.fields.slug}>
      <span>[ {node.frontmatter.date} ]</span>
      {" - "}
      <Link to={node.fields.slug}>
        <h3>{title}</h3>
      </Link>
      <p
        dangerouslySetInnerHTML={{
          __html: node.frontmatter.description || node.excerpt,
        }}
      />
    </PostContainer>
  )
}
