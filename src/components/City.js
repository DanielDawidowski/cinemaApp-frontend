import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import Card from "./Card";
import { Grid } from "./styles/globalStyles";
import { readMovies } from "../api/apiAdmin";

const City = (props) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  // console.log(props);
  const loadMoviesByCityId = (cityId) => {
    readMovies(cityId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setMovies(data);
      }
    });
  };

  useEffect(() => {
    const cityId = props.match.params.cityId;
    loadMoviesByCityId(cityId);
  }, [props]);

  {
    console.log(movies);
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
        }}
        exit={{ opacity: 0, y: 100 }}
        style={{ height: "200vh" }}
      >
        <Grid>
          {movies.map((movie, i) => (
            <li key={i} value={movie._id}>
              {/* <Link to={`/movie/${movie._id}`}> */}
              <Card movie={movie} showAnimation={true} />
              {/* </Link> */}
            </li>
          ))}
        </Grid>
      </motion.div>
    </Layout>
  );
};

export default City;
