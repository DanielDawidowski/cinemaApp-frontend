import { motion } from "framer-motion";
import styled, { css } from "styled-components";

export const SeatLayout = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  position: relative;
  max-width: 100%;
  width: 30px;
  height: 35px;
  border: 2px solid ${(props) => props.theme.white};
  border-radius: 3px 3px 13px 13px;
  overflow: hidden;
  margin: 0.5rem;
  padding: 0;
`;

export const SeatNumber = styled(motion.div)`
  position: absolute;
  width: 40px;
  height: 45px;

  ${(props) =>
    props.grey &&
    css`
      background-color: ${(props) => props.theme.lightgrey};
    `}
  ${(props) =>
    props.transparent &&
    css`
      background-color: transparent;
    `}
`;
