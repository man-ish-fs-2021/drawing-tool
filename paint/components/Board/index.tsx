'use client'
import React, { useEffect, useRef } from 'react'

const Board = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, [])
  return (
    <canvas ref={canvasRef}></canvas>
  )
}

export default Board