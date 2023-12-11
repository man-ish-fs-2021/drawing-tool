"use client";
import React from "react";
import styles from "./index.module.css";
import { brushColors } from "@/constants/colors";

const Toolbox = () => {
  const updateSize = () => {};
  return (
    <div className={styles.toolboxContainer}>
      <div className={styles.tool}>
        <h4 className={styles.heading}>Stroke</h4>
        <div className={styles.itemContainer}>
          {Object.values(brushColors).map((backgroundColor) => (
            <div
              key={backgroundColor}
              className={styles.colorBox}
              style={{ backgroundColor }}
            />
          ))}
        </div>
      </div>
      <div className={styles.tool}>
        <h4 className={styles.heading}>Brush size</h4>
        <div className={styles.itemContainer}>
          <input
            className={styles.brushSize}
            type="range"
            min={1}
            max={10}
            step={1}
            onChange={updateSize}
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbox;
