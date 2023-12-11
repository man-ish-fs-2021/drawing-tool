"use client";
import { menuItems } from "@/constants/menuItems";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { actionItemClick } from "@/redux/slice/Menu";
import React, { useEffect, useLayoutEffect, useRef } from "react";

const Board = () => {
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawHistory = useRef<ImageData[]>([]);
  const pointer = useRef(0);
  const shouldDraw = useRef(false);
  const activeMenuItem = useAppSelector((state) => state.menu.active);
  const actionMenuItem = useAppSelector((state) => state.menu.actionMenuItem);
  const { color, size } = useAppSelector(
    (state) => state.toolbox[activeMenuItem]
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (actionMenuItem === menuItems.download) {
      const url = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "sketch.jpg";
      anchor.click();
    }
    if (actionMenuItem === menuItems.undo) {
      if (pointer.current > 0) {
        pointer.current -= 1;
      }
      const imageData = drawHistory.current[pointer.current];
      ctx?.putImageData(imageData, 0, 0);
      
    }
    if (actionMenuItem === menuItems.redo) {
      if (pointer.current < drawHistory.current.length) {
        pointer.current += 1;
      }
      const imageData = drawHistory.current[pointer.current];
      ctx?.putImageData(imageData, 0, 0);
    }
    dispatch(actionItemClick(null));
  }, [actionMenuItem, dispatch]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const changeConfig = () => {
      ctx.strokeStyle = color || "black";
      ctx.lineWidth = size || 0;
    };

    changeConfig();
  }, [color, size]);
  // before repaint
  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const beginPath = (x: number, y: number) => {
      ctx?.beginPath();
      ctx?.moveTo(x, y);
    };
    const drawLine = (x: number, y: number) => {
      ctx?.lineTo(x, y);
      ctx?.stroke();
    };
    const handleMouseDown = (e: MouseEvent) => {
      shouldDraw.current = true;
      beginPath(e.clientX, e.clientY);
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!shouldDraw.current) return;
      drawLine(e.clientX, e.clientY);
    };
    const handleMouseUp = () => {
      shouldDraw.current = false;
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (!drawHistory.current || !imageData) return;
      drawHistory.current.push(imageData);
      pointer.current = drawHistory.current.length - 1;
    };
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  console.log({ color, size });
  return <canvas ref={canvasRef}></canvas>;
};

export default Board;
