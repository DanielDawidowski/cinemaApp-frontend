import styled from "styled-components";
import { motion } from "framer-motion";

export const Logo = styled.h1`
  position: relative;
  z-index: 2;
  transform: skew(-7deg);

  @media (max-width: 1300px) {
    text-align: center;
  }
  .link {
    color: ${(props) => props.theme.gold_transparent};
  }
`;

export const HeaderNav = styled(motion.div)`
  height: 0px;
  width: 100%;
  color: ${(props) => props.theme.red};
  z-index: 99;

  @media (max-width: 700px) {
    margin-top: 1rem;
  }
`;

export const HamburgerMenu = styled.div`
  @media (min-width: 700px) {
    display: none;
  }
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
      background: ${(props) => props.theme.gold};
      border-radius: 13px;
      margin: 8px;
    }
  }
`;
