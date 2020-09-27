import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const TicketNav = styled(motion.div)`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 4%;
  background-color: ${(props) => props.theme.gold};
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .link {
    color: ${(props) => props.theme.white};
  }
`;

export const SeatsGrid = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  max-width: 100%;
  margin-bottom: 5rem;
`;

export const HallLayout = styled(motion.div)`
  display: grid;
  grid-template-columns: 8fr 1fr;
  grid-column-gap: 3rem;
  max-width: 100%;
  margin-bottom: 5rem;
`;

export const SeatsLayout = styled(motion.div)``;
