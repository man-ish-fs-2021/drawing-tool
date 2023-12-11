'use client'
import { useAppSelector } from '@/redux/hooks/hooks';
import React, { useEffect, useRef } from 'react'

const Board = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeMenuItem = useAppSelector((state) => state.menu.active);
  const {color, size} = useAppSelector((state) => state.toolbox[activeMenuItem])
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, [])
  console.log({color, size})
  return (
    <canvas ref={canvasRef}></canvas>
  )
}

export default Board