import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { isAuth } from "../auth";
import {
  createMovie,
  getCities,
  getHalls,
  getMovieCategory,
} from "../api/apiAdmin";
import Form from "../components/styles/formStyles";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    movieCategory: "",
    price: 0,
    cities: [],
    city: "",
    photo: "",
    loading: false,
    error: "",
    createdMovie: "",
    redirectToProfile: false,
    formData: "",
  });

  const [movieCat, setMovieCat] = useState([]);
  const [citiess, setCities] = useState([]);

  const { user, token } = isAuth();
  const {
    name,
    description,
    movieCategory,
    price,
    cities,
    city,
    loading,
    error,
    createdMovie,
    redirectToProfile,
    formData,
  } = values;

  const loadMovieCategories = () => {
    getMovieCategory(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMovieCat(data);
      }
    });
  };

  const showCities = () => {
    getCities().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          formData: new FormData(),
        });
        setCities(data);
      }
    });
  };

  useEffect(() => {
    showCities();
    loadMovieCategories();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createMovie(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          // name: "",
          // description: "",
          // photo: "",
          // city: "",
          // price: 0,
          // movieCategory: "",
          loading: false,
          createdMovie: data.name,
        });
      }
    });
  };

  {
    console.log(citiess);
  }

  const newPostForm = () => (
    <Form className="mb-3" onSubmit={clickSubmit}>
      <fieldset disabled={loading} aria-busy={loading}>
        <h4>Zdjęcie</h4>
        <div className="form-group">
          <label className="btn btn-secondary">
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange("photo")}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={handleChange("name")}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Opis Filmu</label>
          <textarea
            className="form-control"
            value={description}
            onChange={handleChange("description")}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Cena Biletu</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={handleChange("price")}
          />
        </div>

        <div className="form-group">
          <h3 className="mark mb-4">Miasto</h3>
          <select className="form-control" onChange={handleChange("city")}>
            <option>Wybierz</option>
            {citiess &&
              citiess.map((city, i) => (
                <option key={i} value={city._id}>
                  {city.name}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <h3 className="mark mb-4">Kategoria</h3>
          <select
            className="form-control"
            onChange={handleChange("movieCategory")}
          >
            <option>Wybierz</option>
            {movieCat.map((movieCat, index) => (
              <option key={index} value={movieCat}>
                {movieCat}
              </option>
            ))}
          </select>
        </div>

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
      style={{ display: createdMovie ? "" : "none" }}
    >
      <h2>Dodano {`${createdMovie}`}</h2>
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

export default AddProduct;
