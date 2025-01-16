"use client";

import { motion } from "framer-motion";

interface AnimatedCardProps {
  children: React.ReactNode;
  delay: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  delay,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
    >
      {children}
    </motion.div>
  );
};
