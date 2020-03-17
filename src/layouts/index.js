import React from "react"
import styled, { createGlobalStyle } from "styled-components"
import { underlineMixin } from "../components/shared"

import { TransitionPortal } from "gatsby-plugin-transition-link"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #FFF; 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #333; 
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }

  .tl-wrapper:-webkit-scrollbar { width: 0 !important }
  .gatsby-plugin-transition-link-portal {
    div {
      border-top: 1px solid black;
      border-bottom: 1px solid black;
    }
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: "Montserrat";
  }
  a, span, p {
    font-family: "Roboto";
  }
  a {
    text-decoration: none;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  height: calc(100vh - 2em);
  background-color: white;
`

const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;

  main {
    width: 100%;
    margin-left: 150px;
    margin-top: 2em;
    @media only screen and (max-width: 684px) {
      margin-left: unset;
      margin-top: 100px;
    }
  }
`

const Name = styled.h1`
  font-weight: bolder;
  font-style: italic;
  line-height: 0.725;
  font-size: 32px;
`

const NavHeader = styled.header`
  height: 100%;
  background: white;
  padding: 1em;
  width: 150px;
  position: fixed;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  a {
    color: black;
  }

  @media only screen and (max-width: 684px) {
    a {
      width: 30%;
    }
    justify-content: center;
    width: 100%;
    height: 100px;
    border-bottom: 1px solid;
  }

  @media only screen and (max-width: 350px) {
    h1 {
      font-size: 28px;
    }
  }
`

const Nav = styled.nav`
  position: relative;

  a {
    color: black;
  }

  ul {
    list-style: none;
    margin-top: 1.5em;
  }

  @media only screen and (max-width: 684px) {
    width: 60%;
    position: absolute;
    right: 10px;
    z-index: 1;
    padding: 0.5em 0;
    background-color: white;

    ul {
      display: flex;
      width: 100%;
      justify-content: space-evenly;
      margin-top: 0;
      li {
        padding: 0;
      }
    }
  }
  @media only screen and (max-width: 350px) {
    a {
      font-size: 14px;
    }
  }
`

const NavItem = styled.li`
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  font-style: ${({ active }) => (active ? "italic" : "normal")};
  padding-bottom: 0.5em;
  a {
    ${underlineMixin}
  }
`

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.5em 0;
  text-align: right;
  background-color: white;

  span {
    font-size: 0.75em;
    margin-right: 1em;

    a {
      color: black;
      ${underlineMixin}
    }
  }
`

const Header = props => {
  const transitionSettings = {
    cover: true,
    direction: "bottom",
    bg: "white",
    duration: 1.5,
  }
  return (
    <NavHeader>
      <AniLink fade to="/">
        <Name>{props.author}</Name>
      </AniLink>
      <Nav>
        <ul>
          {/* <NavItem active={props.location.pathname.includes("/blog")}>
            <AniLink {...transitionSettings} to="/blog">
              blog
            </AniLink>
          </NavItem> */}
          <NavItem active={props.location.pathname.includes("/works")}>
            <AniLink {...transitionSettings} to="/works">
              works
            </AniLink>
          </NavItem>
          <NavItem
            active={props.location.pathname === `${__PATH_PREFIX__}/likes`}
          >
            <AniLink {...transitionSettings} to="/likes">
              likes
            </AniLink>
          </NavItem>
          {/* <NavItem
            active={props.location.pathname === `${__PATH_PREFIX__}/contact`}
          >
            <AniLink {...transitionSettings} to="/contact">
              contact
            </AniLink>
          </NavItem> */}
        </ul>
      </Nav>
    </NavHeader>
  )
}

const Layout = ({ location, author, children }) => {
  const isHomepage = location.pathname === `${__PATH_PREFIX__}/`
  return (
    <React.Fragment>
      <GlobalStyle />
      <Container>
        <MainWrapper>
          <TransitionPortal level="top">
            <Header location={location} author={author} />
          </TransitionPortal>
          <main>{children}</main>
        </MainWrapper>
        {isHomepage && (
          <Footer>
            <span>
              built with
              {` `}
              <a target="_blank" href="https://www.gatsbyjs.org">
                gatsby
              </a>
            </span>
          </Footer>
        )}
      </Container>
    </React.Fragment>
  )
}

export default Layout
