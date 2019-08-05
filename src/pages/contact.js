import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import Layout from "../layouts"
import SEO from "../components/seo"
import { underlineMixin } from "../components/shared"

const ContactSection = styled.section`
  padding-bottom: 1em;
  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 2em;
  }
  h2 {
    font-weight: 400;
    font-family: "Montserrat";
    font-size: 1.5em;
  }
  a {
    color: black;
    ${underlineMixin}
  }
  p {
    margin: 0.5em 0;
  }
`

class Index extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const author = data.site.siteMetadata.author
    const contact = data.site.siteMetadata.contact

    return (
      <Layout location={this.props.location} author={author} title={siteTitle}>
        <SEO title="contact" />
        <ContactSection>
          <header>
            <h2>{"contact"}</h2>
          </header>
          <p>{contact.email}</p>
          <a href={contact.github} target="_blank" rel="noopener noreferrer">
            {"github"}
          </a>
        </ContactSection>
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
        contact {
          github
          email
        }
      }
    }
  }
`
