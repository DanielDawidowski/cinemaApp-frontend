import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Layout from "./Layout";
import { readMovie, readTicket, getPurchaseHistory } from "../api/ApiCore";
import { readPlayTimes } from "../api/apiAdmin";
import Seat from "./Seat";
import Card from "./Card";
import {
  TicketNav,
  SeatsGrid,
  HallLayout,
  SeatsLayout,
} from "./styles/movieStyles";

const Movie = (props) => {
  const [movie, setMovie] = useState({});
  const [playTimes, setPlayTimes] = useState([]);
  const [error, setError] = useState(false);
  const [tickets, setTickets] = useState([]);

  // console.log(props);

  const loadSingleMovie = (movieId) => {
    readMovie(movieId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setMovie(data);
      }
    });
  };

  const loadPlayTimeByMovieId = (movieId) => {
    readPlayTimes(movieId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setPlayTimes(data);
      }
    });
  };

  const loadTicket = (movieId) => {
    getPurchaseHistory(movieId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setTickets(data);
      }
    });
  };

  useEffect(() => {
    const movieId = props.match.params.movieId;
    loadSingleMovie(movieId);
    loadPlayTimeByMovieId(movieId);
    loadTicket(movieId);
  }, [props]);

  const loop = (total, id, time, sold) => {
    let seats = [];
    for (let i = 1; i <= total; i++) {
      seats.push(
        <Seat
          key={i}
          number={i}
          movie={movie}
          id={id}
          time={time}
          sold={sold}
          playTime={playTimes}
        />
      );
    }
    return seats;
  };

  {
    console.log(playTimes);
  }
  return (
    <Layout>
      <HallLayout
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
        }}
        exit={{ opacity: 0, y: 100 }}
      >
        <SeatsLayout>
          {playTimes.map((time, i) => (
            <div key={i} value={time._id}>
              {time.time}
              {/* {console.log(time.hall.totalSeats)} */}
              <h4>play time id: {time._id}</h4>
              <h4>rows: {time.hall.rows}</h4>
              <h4>columns: {time.hall.totalSeatsInRow}</h4>
              <SeatsGrid>
                {loop(time.hall.totalSeats, time._id, time.time, time.sold)}
              </SeatsGrid>
            </div>
          ))}
        </SeatsLayout>

        {/* <Tab>Title 1</Tab>
            <Tab>Title 2</Tab>

            <h2>Any content 1</h2>
            <TabPanel>
              <h2>Any content 2</h2>
            </TabPanel> */}
        <div>
          {movie && movie.description && (
            <Card movie={movie} showAnimation={false} />
          )}
        </div>
        <TicketNav>
          <Link className="link" to={"/cart"}>
            TICKETS
          </Link>
        </TicketNav>
      </HallLayout>
    </Layout>
  );
};

export default Movie;
