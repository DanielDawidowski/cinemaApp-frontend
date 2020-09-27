import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "./Layout";
import { signin, authenticate, isAuth } from "../auth";
import Form from "./styles/formStyles";

const Signin = () => {
  const [values, setValues] = useState({
    email: "dvds@wp.pl",
    password: "qweqwe1",
    error: "",
    loading: false,
    redirectToRefferer: false,
  });

  const { email, password, loading, error, redirectToRefferer } = values;
  const { user } = isAuth();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToRefferer: true,
          });
        });
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToRefferer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    if (isAuth()) {
      return <Redirect to="/" />;
    }
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
        {showLoading()}
        {showError()}
        <Form>
          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              type="email"
              className="form-control"
              onChange={handleChange("email")}
              value={email}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              type="password"
              className="form-control"
              onChange={handleChange("password")}
              value={password}
            />
          </div>
          <button onClick={clickSubmit} className="btn btn-primary">
            Submit
          </button>
        </Form>
        {redirectUser()}
      </motion.div>
    </Layout>
  );
};

export default Signin;
