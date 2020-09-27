import React, { useState } from "react";
import Header from "./Header";
import Navigation from "./Navigation";

//Styled Components
import { Container } from "./styles/globalStyles.js";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const theme = {
  red: "#FF0000",
  white: "#ffffff",
  black: "#000000",
  grey: "#3A3A3A",
  gold: "#F77F00",
  gold_transparent: "rgba(247, 127, 0, 0.65)",
  green: "#90BE6D",
  lightgrey: "#E5E5E5",
  offWhite: "#EDEDED",
  maxWidth: "1000px",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)",
};

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  }
html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased; 
}
body {
  font-size: 16px;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: ${(props) => props.theme.black};
  overscroll-behavior: none;
  overflow-x: hidden;
  color: ${(props) => props.theme.white};
}

a {
  text-decoration: none
}
  a:focus {
    outline: none;
  }

ul {
  list-style: none
}

li {
  list-style-type: none
}

img {
    max-width: 100%;
}
`;

const Layout = ({ children }) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Header toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
        <Navigation toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
        <main style={{ marginTop: "15%" }}>{children}</main>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
