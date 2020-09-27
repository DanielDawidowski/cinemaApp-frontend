import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "./Layout";
import { Redirect } from "react-router-dom";

import { createTicket } from "../api/ApiCore";
import { getCart, emptyCart } from "../api/cartHelpers";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [run, setRun] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    name: "",
  });

  useEffect(() => {
    setCartItems(getCart());
  }, [run]);

  const handleName = (e) => {
    setData({ ...data, name: e.target.value });
  };

  const showTickets = (cartItems) => {
    return (
      <div>
        <h2>Your cart has {`${cartItems.length}`} items</h2>
        <h2>{cartItems[0].time}</h2>
        {/* <h3>{console.log(cartItems[0].movie._id)}</h3> */}

        {/* <h3>{console.log(cartItems[0].playTime[0]._id)}</h3> */}
        {/* <h3>{console.log(cartItems[0].playTime)}</h3> */}
        {/* <h6>{cartItems[i].seat}</h6> */}

        <hr />
        {cartItems.map((movie, i) => (
          <div key={i}>
            <h1>{movie.seatNumber.toString()}</h1>
            {/* <h2>{movie.movie} zł</h2> */}
            <h2>{movie.movie.price} zł</h2>
          </div>
        ))}
      </div>
    );
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const noTicketsMessage = () => (
    <h2>
      Your cart is empty.
      <br />
      {/* <Link to="/shop">Continue shopping</Link> */}
    </h2>
  );

  const getTotal = () => {
    return cartItems.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.movie.price;
    }, 0);
  };

  let ticketOwnerName = data.name;

  const buy = () => {
    setData({ loading: true });

    const createTicketData = {
      seats: cartItems.map((t) => t.seatNumber),
      time: cartItems[0].time,
      playTime: cartItems[0].playTime[0]._id,
      movie: cartItems[0].movie._id,
      amount: getTotal(),
      name: ticketOwnerName,
    };

    createTicket(cartItems[0].playTime[0]._id, createTicketData)
      .then((response) => {
        // emptyCart(() => {
        //   console.log("payment success and empty cart");
        //   setData({
        //     loading: false,
        //     success: true,
        //   });
        //   setRedirect(true);
        // });
      })
      .catch((error) => {
        console.log(error);
        setData({ loading: false });
      });
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
        {shouldRedirect(redirect)}
        <h1>{cartItems.map((t) => t.playTime.map((id) => id._id))}</h1>
        <div className="col-6">
          {cartItems.length > 0 ? showTickets(cartItems) : noTicketsMessage()}
        </div>

        <div className="col-6">
          <h2 className="mb-4">Your cart summary</h2>
          <hr />
          <div>
            <label>Name:</label>
            <input
              onChange={handleName}
              defaultValue={data.name}
              placeholder="Imię i nazwisko"
            />
          </div>
          <h2>Total: ${getTotal(cartItems)}</h2>
          <button onClick={buy}>Pay</button>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Cart;
