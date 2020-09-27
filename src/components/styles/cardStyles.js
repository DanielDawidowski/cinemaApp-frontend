import styled from "styled-components";
import { motion } from "framer-motion";

export const CardStyles = styled(motion.div)`
  position: relative;
  /* background-color: ${(props) => props.theme.green}; */
  margin-right: 20px;
  width: 220px;
  /* z-index: 9997; */
  /* &:hover .card-image {
    transform: scale(0.64);
    transition: all 0.1s ease-in-out;
  }
  &:hover .card-body {
    transform: scale(1.3, 2.5);
    transition: all 0.1s ease-in-out;
  } */
`;

export const CardBody = styled(motion.div)`
  position: absolute;
  bottom: -20px;
  border-radius: 27px;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardImage = styled(motion.div)``;

export const CardSVG = styled(motion.div)`
  img {
    width: 30px;
  }
`;

export const CardBodyContent = styled(motion.div)`
  ul {
    position: absolute;
    li {
      background-color: ${(props) => props.theme.offWhite};
      color: ${(props) => props.theme.gold_transparent};
      padding: 10px;
      margin-top: 7px;
      border-radius: 13px;
      border: 1px solid ${(props) => props.theme.gold_transparent};
      cursor: pointer;
    }
  }
  h2 {
    color: ${(props) => props.theme.white};
  }
`;
