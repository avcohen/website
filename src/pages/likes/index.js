import React from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"

import Layout from "../../layouts"
import SEO from "../../components/seo"
import { scrollBarMixin, underlineMixin } from "../../components/shared"
// import { LinkCategory, LinkList } from "../../components/links"

const LinksSection = styled.section`
  ${scrollBarMixin}
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

const LinksContainer = styled.div`
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: repeat(1, 1fr);
  padding: 0 1em;
  @media only screen and (min-width: 475px) {
    grid-column-gap: 15px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (min-width: 768px) {
    grid-column-gap: 20px;
    grid-template-columns: repeat(3, 1fr);
    padding: 0;
  }
  @media only screen and (min-width: 1080px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

export const LinkCategory = styled.section`
  padding: 0.5em 0em;
`
export const LinkList = styled.ul`
  padding-left: 1em;
  margin-top: 0.5em;
  a {
    color: black;
    text-transform: lowercase;
    text-decoration: none;
    ${underlineMixin};
  }
`

class Index extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const author = data.site.siteMetadata.author
    // const bookData = data.books.frontmatter.books
    const linksData = data.links.frontmatter.linkGroups

    return (
      <Layout location={this.props.location} author={author} title={siteTitle}>
        <SEO title="likes" />
        <LinksSection>
          <header>
            <h2>{"likes"}</h2>
          </header>
          <LinksContainer>
            {linksData.map(group => (
              <LinkCategory key={group.title}>
                <h3>{group.title}</h3>
                <LinkList>
                  {group.links.map(link => (
                    <li key={link.name}>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={link.url}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </LinkList>
              </LinkCategory>
            ))}
            {/* <LinkCategory key={"book"}>
              <h3>{"books"}</h3>
              <LinkList>
                {bookData.map(book => (
                  <li key={book.title}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.betterworldbooks.com/search/results?q=${book.isbn}`}
                    >
                      {book.title}
                    </a>
                  </li>
                ))}
              </LinkList>
            </LinkCategory> */}
          </LinksContainer>
        </LinksSection>
      </Layout>
    )
  }
}

export default Index

export const pageQuery = graphql`
  query LikesQuery {
    site {
      siteMetadata {
        author
        title
      }
    }
    books: markdownRemark(frontmatter: { templateKey: { eq: "books" } }) {
      frontmatter {
        books {
          title
          author
          isbn
        }
      }
    }
    links: markdownRemark(frontmatter: { templateKey: { eq: "links" } }) {
      frontmatter {
        linkGroups {
          title
          links {
            name
            url
          }
        }
      }
    }
  }
`
