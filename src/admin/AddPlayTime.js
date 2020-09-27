import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { isAuth } from "../auth";
import { createMovie, getCities, getHalls, getMovies } from "../api/apiAdmin";
import { readCity } from "../api/ApiCore";

import Form from "../components/styles/formStyles";

const AddPlayTime = (props) => {
  const [data, setData] = useState({
    loading: false,

    error: "",
    date: "",
    time: "",
    movies: [],
    movie: "",
    hs: [],
    h: "",
    createdPlayTime: "",
  });

  const [showMovie, setShowMovie] = useState([]);
  const [showCity, setShowCity] = useState([]);

  const { user, token } = isAuth();
  const {
    date,
    time,
    movie,
    movies,
    h,
    hs,
    loading,

    error,
    createdPlayTime,
  } = data;

  const showCities = () => {
    getHalls().then((data) => {
      if (data.error) {
        setData({ error: data.error });
      } else {
        setShowCity(data);
      }
    });
  };

  const showMovies = () => {
    getMovies().then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setShowMovie(data);
      }
    });
  };

  useEffect(() => {
    const cityId = props.match.params.cityId;
    showCities(cityId);
    showMovies();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setData({ ...data, [name]: value });
  };

  let playTimeDate = data.date;
  let playTimeTime = data.time;
  let playTimeHall = data.hall;
  let playTimeMovie = data.movie;

  const clickSubmit = (event) => {
    event.preventDefault();
    setData({ ...data, error: "", loading: true });

    const createPlayTimeData = {
      date: playTimeDate,
      time: playTimeTime,
      hall: playTimeHall,
      movie: playTimeMovie,
    };

    createMovie(user._id, props.match.params.cityId, token, createPlayTimeData);
    if (data.error) {
      setData({ ...data, error: data.error });
    } else {
      setData({
        ...data,
        // date: "",
        // time: "",
        // movie: "",
        // h: "",
        loading: false,
        createdPlayTime: data.name,
      });
    }
  };

  {
    console.log(showCity);
  }

  // const { halls } = showCity;

  const newPostForm = () => (
    <Form className="mb-3" onSubmit={clickSubmit}>
      <fieldset disabled={loading} aria-busy={loading}>
        <div className="form-group">
          <label className="text-muted">Data</label>
          <input
            type="date"
            className="form-control"
            defaultValue={data.date}
            onChange={handleChange("date")}
          />
        </div>

        <div></div>

        <div className="form-group">
          <label className="text-muted">Godzina</label>
          <input
            type="time"
            className="form-control"
            defaultValue={data.time}
            onChange={handleChange("time")}
          />
        </div>

        <div className="form-group">
          <h3 className="mark mb-4">Wybierz Salę Kinową</h3>
          <select className="form-control" onChange={handleChange("hall")}>
            {showCity &&
              showCity.map((hall, i) => (
                <option key={i} defaultValue={data.hall}>
                  {hall.name}
                </option>
              ))}
          </select>
        </div>

        {/* <div className="form-group">
          <h3 className="mark mb-4">Wybierz Salę Kinową</h3>
          <select className="form-control" onChange={handleChange("hall")}>
            {halls &&
              halls.map((hall, i) => (
                <option key={i} defaultValue={data.hall}>
                  {hall.name}
                </option>
              ))}
          </select>
        </div> */}

        {/* <div className="form-group">
          <h3 className="mark mb-4">Wybierz Film</h3>
          <select className="form-control" onChange={handleChange("movie")}>
            <option>Wybierz</option>
            {showMovie.map((movie, i) => (
              <option key={i} defaultValue={data.movie}>
                {movie.name}---{movie.city.name}
              </option>
            ))}
          </select>
        </div> */}

        <button className="btn btn-outline-primary">Utwórz film</button>
      </fieldset>
    </Form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdPlayTime ? "" : "none" }}
    >
      <h2>Dodano {`${createdPlayTime}`}</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );

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
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
          {goBack()}
        </div>
      </motion.div>
    </Layout>
  );
};

export default AddPlayTime;
