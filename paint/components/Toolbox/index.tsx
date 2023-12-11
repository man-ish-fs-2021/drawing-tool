"use client";
import React from "react";
import styles from "./index.module.css";
import { brushColors } from "@/constants/colors";
import { useAppSelector } from "@/redux/hooks/hooks";
import { menuItems } from "@/constants/menuItems";

const Toolbox = () => {
  const activeMenuItem = useAppSelector((state) => state.menu.active);
  const showColor = activeMenuItem === menuItems.pencil;
  const showBrush =
    activeMenuItem === menuItems.pencil || activeMenuItem === menuItems.eraser;
  const updateSize = () => {};
  return (
    <div className={styles.toolboxContainer}>
      {showColor && (
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
      )}
      {showBrush && (
        <div className={styles.tool}>
          <h4 className={styles.heading}>Brush size {activeMenuItem}</h4>
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
      )}
    </div>
  );
};

export default Toolbox;
