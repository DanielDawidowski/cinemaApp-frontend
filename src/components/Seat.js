import React, { useState, useEffect } from "react";
import { addTicket, removeTicket } from "../api/cartHelpers";
import { SeatLayout, SeatNumber } from "./styles/seatStyles";

const Seat = (props) => {
  const { movie, number, sold, time, playTime } = props;

  const [seatColor, setSeatColor] = useState(false);

  const addToCart = (movie) => (event) => {
    // console.log(movie);
    addTicket({ movie, seatNumber: number, time, playTime });
    setSeatColor(() => !seatColor);
    if (seatColor) {
      removeTicket(movie.id, number);
    }
  };

  const displaySoldNumber = () => {
    let num = [number];
    // console.log(num);
    let soldNumber = sold.flat();
    // console.log(soldNumber);
    let arrNew = soldNumber.concat(num);
    let arrNew1 = arrNew.pop();
    // console.log(arrNew1);

    // console.log(total);
    // console.log(num.length);
    for (let i = 0; i <= num; i++) {
      if (number === soldNumber[i]) {
        return <SeatNumber grey>{}</SeatNumber>;
      } else if (number !== arrNew1) {
        return <SeatNumber transparent>{}</SeatNumber>;
      }
    }
    // return arrNew1;
  };

  // {
  //   console.log(displaySoldNumber());
  // }

  return (
    <SeatLayout>
      <SeatNumber value={number} onClick={addToCart(movie)}>
        {displaySoldNumber()}
      </SeatNumber>
    </SeatLayout>
  );
};

export default Seat;
