import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  open: { opacity: 1, height: "auto" },
  closed: { opacity: 0, height: 0 },
};

// const Accordion = ({ title, body }) => {
const Accordion = () => {
  const [isToggled, setIsToggled] = useState(false);
  return (
    <article>
      <h2 role="button" onClick={() => setIsToggled((prevState) => !prevState)}>
        The Heading
      </h2>
      <AnimatePresence>
        {isToggled && (
          <motion.div
            variants={variants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{ overflow: "hidden" }}
          >
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              magni voluptatem impedit. Veniam laudantium vero culpa ea! Earum
              nihil pariatur doloribus vel temporibus fugit accusantium,
              architecto, non repudiandae, quas in.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

export default Accordion;
