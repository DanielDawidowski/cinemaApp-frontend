import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { motion } from "framer-motion";
import { Grid } from "./styles/globalStyles";
import { getMovies } from "../api/ApiCore";

const Home = () => {
  const [moviesBySell, setMoviesBySell] = useState([]);
  const [moviesByArrival, setMoviesByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadMoviesBySell = () => {
    getMovies("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setMoviesBySell(data);
      }
    });
  };

  const loadMoviesByArrival = () => {
    getMovies("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setMoviesByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadMoviesByArrival();
    loadMoviesBySell();
  }, []);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
        }}
        exit={{ opacity: 0, y: 100 }}
      >
        <h2>New Arrivals</h2>
        <Grid>
          {moviesByArrival.map((movie, i) => (
            <div key={i}>
              <Card movie={movie} />
            </div>
          ))}
        </Grid>
        <h2 style={{ marginTop: "14rem" }}>Best Sellers</h2>
        <Grid>
          {moviesBySell.map((movie, i) => (
            <div key={i}>
              <Card movie={movie} />
            </div>
          ))}
        </Grid>
      </motion.div>
    </Layout>
  );
};

export default Home;
