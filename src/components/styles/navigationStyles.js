import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const Nav = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  background: #ea281e;
  color: #000;
  z-index: 100;
  overflow: hidden;
`;

export const NavHeader = styled.div`
  top: 48px;
  position: relative;
  h2 {
    color: ${(props) => props.theme.background};
  }
`;
export const CloseNav = styled(motion.div)`
  button {
    border: none;
    background: none;
    outline: none;
    width: 60px;
    height: 60px;
    z-index: 100;
    margin-right: -1rem;
    span {
      width: 40px;
      height: 12px;
      display: block;
      background: ${(props) => props.theme.black};
      border-radius: 13px;
      margin: 8px;
    }
  }
`;

export const NavList = styled.div`
  top: 148px;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;

  ul {
    padding: 0;
    display: flex;
    li {
      list-style: none;
      font-size: 1.6rem;
      text-transform: uppercase;
      font-weight: 900;
      margin-left: 1rem;
      height: 100px;
      overflow: hidden;

      @media (min-width: 700px) {
        font-size: 1rem;
        height: 96px;
        line-height: 96px;
      }
    }
  }
  ${(props) =>
    props.displayNone &&
    css`
      top: 0;
      flex-direction: column;
      ul {
        justify-content: flex-end;
        margin-right: 1rem;
      }
      @media (max-width: 700px) {
        display: none;
      }
    `}
  ${(props) =>
    props.displayBlock &&
    css`
      ul {
        flex-direction: column;
        align-items: flex-start;
      }
      @media (min-width: 700px) {
        display: block;
      }
    `}
`;
