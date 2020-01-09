import React from "react"
import styled from "styled-components"
import Image from "gatsby-image"
import { navigate } from "@reach/router"
import { Link, graphql } from "gatsby"

import Layout from "../../layouts"
import SEO from "../../components/seo"
import { scrollBarMixin, underlineMixin } from "../../components/shared"

const WorksSection = styled.section`
  padding-bottom: 3em;
  padding-right: 1em;
  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2em;
  }
  h2 {
    font-weight: 400;
    font-family: "Montserrat";
    font-size: 1.5em;
  }
  @media only screen and (max-width: 684px) {
    header {
      flex-direction: column;
      margin-bottom: 1em;
      h2 {
        align-self: flex-start;
      }
      div {
        ${scrollBarMixin}
        width: 100%;
        overflow-x: auto;
        align-self: flex-end;
        margin: 0.5em 0;
        text-align: right;
        ul {
          padding-bottom: 10px;
        }
      }
    }
  }
`

const WorksContainer = styled.div`
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: repeat(1, 1fr);
  @media only screen and (min-width: 684px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const WorkItem = styled.section`
  width: 100%;
  .details {
    margin: 0.5em 0 1.5em;
  }
  a {
    color: black;
  }
  img {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid;
    border-color: rgba(0, 0, 0, 0.5);
  }
  a {
    h3 {
      display: inline;
      ${underlineMixin}
    }
  }
  h3,
  p {
    margin-top: 0.25em;
  }

  ul {
    margin-top: 0.5em;
  }
  li {
    cursor: pointer;
    ${underlineMixin};
    font-size: 13px;
    display: inline;
    margin-right: 0.5em;
    font-family: "Roboto";
  }
`

const CategoryFilterContainer = styled.div`
  ul {
    font-family: "Roboto";
  }
  li {
    ${underlineMixin};
    cursor: pointer;
    display: inline;
    margin-left: 0.75em;
  }
`

const CategoryFilterItem = styled.li`
  ${({ active }) => active && `font-weight: bold;`};
`

const CategoryFilter = ({ categories, currentCategory, hash }) => (
  <CategoryFilterContainer>
    <ul>
      {categories.map(category => (
        <CategoryFilterItem
          alt={category}
          key={category}
          active={currentCategory === hash}
          onClick={() => navigate(`#${category}`)}
        >
          {category}
        </CategoryFilterItem>
      ))}
    </ul>
  </CategoryFilterContainer>
)

class WorksIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentCategory: null,
      categories: ["all", "web", "woodworking", "pi", "other"],
    }
  }
  render() {
    const currentHash = this.props.location.hash.slice(1)
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const author = data.site.siteMetadata.author
    const works = data.allMarkdownRemark.edges

    const filteredWorks = works.filter(({ node }) => {
      const work = node.frontmatter
      if (!!currentHash) {
        if (currentHash === "all") return node
        if (work.tags.includes(currentHash)) return node
      } else {
        if (work.title !== "boxes") return node
      }
    })

    return (
      <Layout location={this.props.location} author={author} title={siteTitle}>
        <SEO title="works" />
        <WorksSection>
          <header>
            <h2>{"works"}</h2>
            {/* <CategoryFilter
              currentCategory={this.state.currentCategory}
              categories={this.state.categories}
              hash={currentHash}
            /> */}
          </header>
          <WorksContainer>
            {filteredWorks.map(({ node }) => {
              const work = node.frontmatter
              return (
                <WorkItem key={work.title}>
                  <Link to={node.fields.slug}>
                    <Image
                      alt={work.title}
                      fluid={work.thumbnail.childImageSharp.fluid}
                    />
                  </Link>
                  <div className="details">
                    <Link to={node.fields.slug}>
                      <h3>{work.title}</h3>
                    </Link>
                    <p>{work.excerpt}</p>
                    {/* <ul>
                      {work.tags.map(tag => (
                        <li key={tag}>{`#${tag}`}</li>
                      ))}
                    </ul> */}
                  </div>
                </WorkItem>
              )
            })}
          </WorksContainer>
        </WorksSection>
      </Layout>
    )
  }
}

export default WorksIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(works)/" } }
      sort: { fields: [frontmatter___date], order: ASC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            tags
            thumbnail {
              childImageSharp {
                fluid(maxHeight: 500) {
                  src
                  srcSet
                  sizes
                  aspectRatio
                }
              }
            }
            source
            link
            excerpt
            about
            note
            designer
            designer_link
          }
        }
      }
    }
  }
`
