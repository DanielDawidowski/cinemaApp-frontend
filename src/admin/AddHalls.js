import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { isAuth } from "../auth";
import { createHall } from "../api/apiAdmin";
import Form from "../components/styles/formStyles";

const AddHalls = (props) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    name: "",
    totalSeats: 0,
    rows: 0,
    totalSeatsInRow: 0,
    createdHall: "",
  });

  const { user, token } = isAuth();
  {
    console.log(user._id);
  }
  const {
    name,
    cities,
    city,
    totalSeats,
    rows,
    totalSeatsInRow,
    loading,
    error,
    createdHall,
    redirectToProfile,
  } = data;

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setData({ ...data, [name]: value });
  };

  let hallName = data.name;
  let hallTotalSeats = data.totalSeats;
  let hallRows = data.rows;
  let hallTotalSeatsInRow = data.totalSeatsInRow;

  const clickSubmit = (event) => {
    event.preventDefault();
    setData({ loading: true });

    const createHallData = {
      totalSeatsInRow: hallTotalSeatsInRow,
      rows: hallRows,
      totalSeats: hallTotalSeats,
      name: hallName,
    };

    createHall(user._id, props.match.params.cityId, token, createHallData);
    if (data.error) {
      setData({ ...data, error: data.error });
    } else {
      setData({
        ...data,
        // name: "",
        // totalSeats: 0,
        // typeOfSeats: "",
        // rows: 0,
        // totalSeatsInRow: 0,
        loading: false,
        createdHall: data.name,
      });
    }
  };

  const newPostForm = () => (
    <Form className="mb-3" onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Numer Sali</label>
        <input
          type="text"
          className="form-control"
          defaultValue={data.name}
          onChange={handleChange("name")}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Ilość foteli</label>
        <input
          type="number"
          className="form-control"
          defaultValue={data.totalSeats}
          onChange={handleChange("totalSeats")}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Ilość rzędów</label>
        <input
          type="number"
          className="form-control"
          defaultValue={data.rows}
          onChange={handleChange("rows")}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Ilość foteli w jednym rzędzie</label>
        <input
          type="number"
          className="form-control"
          defaultValue={data.totalSeatsInRow}
          onChange={handleChange("totalSeatsInRow")}
        />
      </div>

      <button className="btn btn-outline-primary">Dodaj Salę Kinową</button>
    </Form>
  );

  //   const showError = () => (
  //     <div
  //       className="alert alert-danger"
  //       style={{ display: error ? "" : "none" }}
  //     >
  //       {error}
  //     </div>
  //   );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdHall ? "" : "none" }}
    >
      <h2>{`${createdHall}`} dodana</h2>
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
          {/* {showError()} */}
          {newPostForm()}
          {goBack()}
        </div>
      </motion.div>
    </Layout>
  );
};

export default AddHalls;
