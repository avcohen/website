import styled, { css } from "styled-components"

export const scrollBarMixin = css`
  /* width */
  &::-webkit-scrollbar {
    height: 3px;
    width: 3px;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

export const underlineMixin = css`
  text-decoration: none;
  text-shadow: 0px -2px 0 white, 0px -1px 0 white, 0px 0px 0 white,
    2px -2px 0 white, 2px -1px 0 white, 2px 0px 0 white, -2px -2px 0 white,
    -2px -1px 0 white, -2px 0px 0 white, 1px -2px 0 white, 1px -1px 0 white,
    1px 0px 0 white, -1px -2px 0 white, -1px -1px 0 white, -1px 0px 0 white,
    0px -2px 0 white, 0px -1px 0 white, 0px 0px 0 white;
  box-shadow: 0 -1px 0 0 white inset, 0 -2px 0 0 transparent inset;

  transition: all 0.3s ease-in;
  &:hover {
    transition: all 0.3s ease-out;
    box-shadow: 0 -1px 0 0 white inset, 0 -2px 0 0 black inset;
  }
`

export const SectionFooter = styled.aside`
  margin-bottom: 3em;
  ul {
    width: 100%;
    display: flex;
    padding: 1em 0;
    justify-content: space-between;
  }
  li {
    font-size: 14px;
    text-transform: lowercase;
    list-style: none;
  }

  a {
    color: black;
    ${underlineMixin}
  }
`

export const End = styled.div`
  margin: 1em;
  font-weight: 600;
  font-style: italic;
  font-size: 12px;
  letter-spacing: 1.33px;
  text-align: center;
  font-family: "Roboto";
`

export const BaseArticle = styled.article`
  header {
    margin-bottom: 2em;
  }
  h1 {
    font-weight: 700;
    font-family: "Montserrat";
    font-size: 1.5em;
  }
  p {
    margin: 0.75em 0;
    line-height: 1.33;
  }

  img {
    border: 1px solid;
    border-color: rgba(0, 0, 0, 0.5);
  }

  .title {
    font-family: "Montserrat";
  }
  .date {
    font-size: 12px;
    text-transform: uppercase;
  }
  .tags {
  }
`
