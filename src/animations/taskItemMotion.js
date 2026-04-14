export const taskItemMotion = {
  initial: { opacity: 0, y: 10, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.98 },
  transition: { duration: 0.2, ease: "easeOut" },
};

export const completionPulse = {
  active: { scale: 1 },
  completed: { scale: [1, 1.03, 1], transition: { duration: 0.25 } },
};
