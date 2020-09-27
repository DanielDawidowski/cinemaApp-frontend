import React, { useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import Menu from "./Menu";

// Styled Components
import { NavList } from "./styles/navigationStyles";

import { Flex } from "./styles/globalStyles";
import { HeaderNav, HamburgerMenu, Logo } from "./styles/headerStyles";

const Header = ({ toggleMenu, setToggleMenu }) => {
  const hamburger = useRef(null);
  return (
    <HeaderNav
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -72, opacity: 0 }}
      transition={{
        duration: 1,
        ease: [0.6, 0.05, -0.01, 0.9],
      }}
    >
      <Flex spaceBetween>
        <Logo>
          <Link className="link" to="/">
            CinemaApp
          </Link>
        </Logo>
        <NavList displayNone>
          <Menu />
        </NavList>
        <HamburgerMenu
          onClick={() => setToggleMenu(!toggleMenu)}
          ref={hamburger}
        >
          <button>
            <span></span>
            <span></span>
          </button>
        </HamburgerMenu>
      </Flex>
    </HeaderNav>
  );
};

export default withRouter(Header);
