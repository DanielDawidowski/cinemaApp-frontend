import React from "react";
import Menu from "./Menu";
//Styled Components
import { Container, Flex } from "./styles/globalStyles";
import { Nav, NavHeader, CloseNav, NavList } from "./styles/navigationStyles";

//Framer Motion
import { AnimatePresence } from "framer-motion";

const Navigation = ({ toggleMenu, setToggleMenu }) => {
  return (
    <>
      <AnimatePresence>
        {toggleMenu && (
          <Nav
            initial={{ x: "-100%" }}
            exit={{ x: "-100%" }}
            animate={{ x: toggleMenu ? 0 : "-100%" }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
          >
            <Container>
              <NavHeader>
                <Flex spaceBetween noHeight>
                  <h2 to="/">CinemaApp</h2>
                  <CloseNav onClick={() => setToggleMenu(!toggleMenu)}>
                    <button>
                      <span></span>
                      <span></span>
                    </button>
                  </CloseNav>
                </Flex>
              </NavHeader>
              <NavList displayBlock>
                <Menu onClick={() => setToggleMenu(!toggleMenu)} />
              </NavList>
            </Container>
          </Nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
