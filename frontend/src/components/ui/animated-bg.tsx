'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export const AnimatedBackground = () => {
  // State to hold random values after the component mounts
  const [squares, setSquares] = useState<number[]>([])

  useEffect(() => {
    // Only generate random values on the client side (after hydration)
    const newSquares = Array.from({ length: 20 }, (_, i) => i)
    setSquares(newSquares)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden bg-slate-100" style={{ zIndex: -1 }}>
      {squares.map((square) => (
        <motion.div
          key={square}
          className="absolute bg-slate-300 rounded-full"
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 400 - 200],
            y: [0, Math.random() * 400 - 200],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  )
}

