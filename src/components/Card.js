import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import useWindowScrollPosition from "@rehooks/window-scroll-position";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import ShowImage from "./ShowImage";
import moment from "moment";
import { updateTicket } from "../api/cartHelpers";
import {
  CardStyles,
  CardBody,
  CardImage,
  CardSVG,
  CardBodyContent,
} from "../components/styles/cardStyles";
import SVGIcon from "../assets/SVG/SVGIcon";
import Info from "../assets/SVG/info.svg";

const hoverVariants = {
  open: { height: "100px" },
  closed: { height: 0 },
};

const Card = ({
  movie,
  // showViewMovieButton = true,
  showAnimation = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { y } = useWindowScrollPosition({
    throttle: 500,
  });
  const x = useMotionValue(0);
  // const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

  // const showViewButton = (showViewMovieButton) => {
  //   return (
  //     showViewMovieButton && (
  //       <Link to={`/movie/${movie._id}`}>
  //         <button>View Movie</button>
  //       </Link>
  //     )
  //   );
  // };

  // const handleChange = (movieId) => (event) => {
  //   setRun(!run); // run useEffect in parent Cart
  //   if (event.target.value >= 1) {
  //     updateTicket(movieId, event.target.value);
  //   }
  // };

  {
    console.log(movie);
  }
  return (
    <CardStyles
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 1,
        // delay: 0.1,
      }}
      exit={{ opacity: 0, y: -210 }}
      onTap={() => setIsHovered(!isHovered)}
      // onHoverEnd={() => setIsHovered(!isHovered)}
    >
      {showAnimation ? (
        <CardImage
          whileHover={{ scale: 1.1, y: -10 }}
          className="card-image"
          animate={
            isHovered
              ? {
                  y: -20,
                  x: 20,
                  scale: 0.84,
                }
              : { y: 0, x: 0, scale: 1 }
          }
        >
          <ShowImage item={movie} url="movie" />
        </CardImage>
      ) : (
        <CardImage>
          <ShowImage item={movie} url="movie" />
        </CardImage>
      )}
      <CardBody
        animate={
          isHovered
            ? {
                width: "220px",
                height: "50px",
                y: -100,
                zIndex: 1,
                backgroundColor: "#F77F00",
              }
            : {
                width: "220px",
                height: "100px",
                y: 0,
                zIndex: -1,
                // backgroundColor: "rgba(247, 127, 0, 0.65)",
                backgroundColor: "rgba(0, 0, 0, 0)",
              }
        }
        style={
          isHovered
            ? {
                marginLeft: "40px",
                marginBottom: "-100px",
              }
            : {
                marginLeft: "0",
                marginBottom: "-50px",
              }
        }
        // whileHover={{
        //   width: "300px",
        //   marginLeft: "-27px",
        //   borderRadius: "27px",
        // }}
        // initial={{ opacity: 0, width: "50px", height: "50px" }}
        // animate={{ opacity: 1 }}
        // transition={{ damping: 100 }}
        className="card-body"
      >
        <h2>{movie.name}</h2>
        <CardSVG
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          // whileHover={{ opacity: 1 }}
          className="cardSVG"
        >
          {/* <SVGIcon name="info" width={50} fill={"#ffffff"} /> */}
          {/* <img src={Info} alt="info" /> */}
        </CardSVG>
      </CardBody>
      <CardBodyContent
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 0 }}
        // whileHover={{ opacity: 1 }}
        className="card-body-content"
      >
        <ul
          style={
            isHovered
              ? {
                  marginLeft: "5px",
                  bottom: "50px",
                  display: "block",
                }
              : {
                  marginLeft: "0",
                  bottom: "0",
                  display: "none",
                }
          }
        >
          {movie.history.map((time, i) => (
            <motion.li
              whileHover={{
                scale: 1.1,
                backgroundColor: "#F77F00",
                color: "#ffffff",
              }}
              key={i}
            >
              <Link to={`/hall/${time.hall}`}>
                <h3>{time.time}</h3>
              </Link>
            </motion.li>
          ))}
        </ul>
        {/* <p className="card-p black-10">$ {movie.price}</p> */}

        {/* <p className="black-9">Category: {movie.movieCategory}</p> */}
        {/* <p className="black-8">
              Added on {moment(movie.createdAt).fromNow()}
            </p> */}
      </CardBodyContent>
    </CardStyles>
  );
};

export default Card;
