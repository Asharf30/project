export const taskListMotion = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.03,
    },
  },
  exit: { opacity: 0 },
};
