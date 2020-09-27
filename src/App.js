import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import Layout from "./components/Layout";

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: ${(props) => props.theme.red};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const App = () => (
  <Layout>
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
      }}
      exit={{ opacity: 0, y: 100 }}
    >
      <Logo>Hello React</Logo>
      <h2>Hello React</h2>
    </motion.div>
  </Layout>
);

export default App;
