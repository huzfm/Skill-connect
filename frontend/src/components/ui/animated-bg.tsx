"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const AnimatedBackground = () => {
  // State to hold random values after the component mounts
  const [squares, setSquares] = useState<number[]>([]);

  useEffect(() => {
    // Only generate random values on the client side (after hydration)
    const newSquares = Array.from({ length: 20 }, (_, i) => i);
    setSquares(newSquares);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden bg-white"
      style={{
        zIndex: 1, // Keeps it in the background
        pointerEvents: "none", // Prevents interaction with background
      }}
      animate={{
        backgroundColor: ["#ffffff", "#f0f0f0", "#ffffff"], // Animate background color
        scale: [1, 1.05, 1], // Slightly scale the background to create a subtle zoom effect
      }}
      transition={{
        duration: 10, // Duration of the background animation
        repeat: Infinity, // Infinite animation loop
        repeatType: "reverse", // Reverse the animation after each loop
      }}
    >
      {squares.map((square) => {
        const uniqueKey = `${square}-${Math.random()}`; // Ensure a unique key
        return (
          <motion.div
            key={uniqueKey}
            className="absolute bg-black rounded-full"
            style={{
              width: `${Math.random() * 100 + 50}px`, // Random size between 50px to 150px
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 400 - 200], // Random x position animation
              y: [0, Math.random() * 400 - 200], // Random y position animation
              opacity: [0.1, 0.3, 0.1], // Fade effect
            }}
            transition={{
              duration: Math.random() * 10 + 10, // Random animation duration
              repeat: Infinity,
              repeatType: "reverse", // Make animation reverse after each iteration
            }}
          />
        );
      })}
    </motion.div>
  );
};
