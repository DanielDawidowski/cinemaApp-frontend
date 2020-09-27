import React, { useState, useEffect } from "react";
import Seat from "./Seat";
import styled from "styled-components";
import { motion } from "framer-motion";
import Layout from "./Layout";
import { readHall } from "../api/ApiCore";

const GridLayout = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  max-width: 100%;
`;

const Tr = styled(motion.tr)`
  padding: 1rem;
  margin: 1rem;
`;

const Hall = (props) => {
  const [hall, setHall] = useState([]);
  const [error, setError] = useState(false);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  const loadHallSeats = (hallId) => {
    readHall(hallId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setHall(data);
      }
    });
  };

  // const displaySoldNumber = () => {
  //   let num = [number];
  //   console.log(num);
  //   let soldNumber = sold.flat();
  //   console.log(soldNumber);

  //   for (let i = 0; i <= soldNumber[i]; i++) {
  //     for (let j = 0; j <= soldNumber[j]; j++) {
  //       if (num[j] !== soldNumber[j]) {
  //         return <div style={{ backgroundColor: "yellow" }}>{number}</div>;
  //       } else {
  //         return <div style={{ backgroundColor: "green" }}>{number}</div>;
  //       }
  //     }
  //   }
  // };

  useEffect(() => {
    const hallId = props.match.params.hallId;
    loadHallSeats(hallId);
  }, [props]);
  {
    console.log(hall);
  }

  const loop = (total, id, time, sold) => {
    let seats = [];
    for (let i = 1; i <= total; i++) {
      seats.push(
        <Seat
          key={i}
          number={i}
          // movie={movie}
          id={id}
          time={time}
          sold={sold}
          // playTime={playTimes}
        />
      );
    }
    return seats;
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
        <h1>Hall Page</h1>
        <h1>{hall._id}</h1>
        <ul>
          {hall.map((hall, i) => (
            <li key={i} value={hall._id}>
              <h2>Hall nr {hall.name}</h2>
              {console.log(hall.rows, hall.column)}
              <thead>
                {columns.map((column, i) => (
                  <tr key={i}>
                    <th>{hall.column}</th>
                  </tr>
                ))}
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    <th>{hall.rows}</th>
                  </tr>
                ))}
              </tbody>
              {/* {loop(hall.totalSeats)} */}
              <GridLayout>
                {loop(hall.totalSeats)}
                {hall.totalSeats.map((seat, i) => (
                  <Seat seat={seat} key={i} />
                ))}
              </GridLayout>
            </li>
          ))}
        </ul>
      </motion.div>
    </Layout>
  );
};

export default Hall;
