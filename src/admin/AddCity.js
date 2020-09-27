import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { isAuth } from "../auth";
import Layout from "../components/Layout";
import { createCity } from "../api/apiAdmin";
import Form from "../components/styles/formStyles";

const AddCity = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // desctructure user and token from localstorage
  const { user, token } = isAuth();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // make req to api to create category
    createCity(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => (
    <Form onSubmit={clickSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button>Dodaj Miasto</button>
    </Form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">Nazwa miasta została dodana</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Nazwa miasta już isnieje</h3>;
    }
  };

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
        <div>
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </motion.div>
    </Layout>
  );
};

export default AddCity;
