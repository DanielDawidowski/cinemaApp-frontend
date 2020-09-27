import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { isAuth } from "../auth";
import { getCities, getMovies } from "../api/apiAdmin";

const AdminDashboard = () => {
  const [cities, setCities] = useState([]);
  const [showMovie, setShowMovie] = useState([]);
  const [error, setError] = useState(false);

  const {
    user: { name, email, role },
  } = isAuth();

  const showCities = () => {
    getCities().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCities(data);
      }
    });
  };

  const showMovies = () => {
    getMovies().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setShowMovie(data);
      }
    });
  };

  {
    console.log(cities, showMovie);
  }

  useEffect(() => {
    showMovies();
    showCities();
  }, []);

  const adminLinks = () => {
    return (
      <div>
        <h4>User Links</h4>
        <ul>
          <li style={{ marginTop: "2rem" }}>
            <Link to="/create/city">Dodaj Miasto</Link>
          </li>
          <li style={{ marginTop: "2rem" }}>
            <h2>Dodaj Salę Kinową</h2>
            <br />
            {cities.map((city, i) => (
              <div key={i} style={{ marginTop: "0.2rem" }}>
                <Link
                  to={`/create/hall/${city._id}`}
                  style={{ color: "#ffffff" }}
                  value={city._id}
                >
                  {city.name}
                </Link>
              </div>
            ))}
          </li>
          <li style={{ marginTop: "2rem" }}>
            <Link to="/create/movie">Dodaj Film</Link>
          </li>
          <li style={{ marginTop: "2rem" }}>
            <h2>Dodaj Seans</h2>
            <br />
            {showMovie.map((movie, i) => (
              <div key={i} style={{ marginTop: "0.5rem" }}>
                <Link
                  to={`/create/playTime/${movie._id}`}
                  style={{ color: "#ffffff" }}
                  value={movie._id}
                >
                  {movie.name} - {movie.city.name}
                </Link>
              </div>
            ))}
          </li>
          <li style={{ marginTop: "2rem" }}>
            <Link to="/admin/movies">Manage Movies</Link>
          </li>
        </ul>
      </div>
    );
  };

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
        <div className="col-3">{adminLinks()}</div>
      </motion.div>
    </Layout>
  );
};

export default AdminDashboard;
