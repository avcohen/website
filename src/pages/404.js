import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import Layout from "../layouts"
import SEO from "../components/seo"

const NotFoundContainer = styled.section`
  width: 100%;
  height: 100%;
  h1 {
    font-size: 30px;
    font-family: monospace;
    text-align: center;
    line-height: 1;
    letter-spacing: 1pc;
  }
`

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout
        location={this.props.location}
        author={siteTitle}
        title={siteTitle}
      >
        <SEO title="404" />
        <NotFoundContainer>
          <h1>. . . . —</h1>
          <h1>— — — — —</h1>
          <h1>. . . . —</h1>
        </NotFoundContainer>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
