import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, x: 0 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 0 },
};

const pageTransition = {
  type: 'linear',
  duration: 0.25,
};

export default function PageTransition({ children, className, keyProp }) {
  return (
    <motion.div
      className={className}
      key={keyProp}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};