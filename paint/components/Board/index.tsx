'use client'
import { useAppSelector } from '@/redux/hooks/hooks';
import React, { useEffect, useLayoutEffect, useRef } from 'react'

const Board = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldDraw = useRef(false);
  const activeMenuItem = useAppSelector((state) => state.menu.active);
  const {color, size} = useAppSelector((state) => state.toolbox[activeMenuItem]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const changeConfig = () => {
      ctx.strokeStyle = color || 'black';
      ctx.lineWidth = size || 0;
    }
  
    changeConfig()
  }, [color, size])
  // before repaint
  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const beginPath = (x: number, y: number) => {
      ctx?.beginPath()
      ctx?.moveTo(x, y)
    }
    const drwaLine = (x: number, y: number) => {
      ctx?.lineTo(x, y)
    }
    const handleMouseDown = (e: MouseEvent) => {
      shouldDraw.current = true
      beginPath(e.clientX, e.clientY)
    }
    const handleMouseMove = (e: MouseEvent) => {
      if (!shouldDraw.current ) return;
      drwaLine(e.clientX, e.clientY)
    }
    const handleMouseUp = () => {
      shouldDraw.current = false

    }
    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])
  console.log({color, size})
  return (
    <canvas ref={canvasRef}></canvas>
  )
}

export default Board