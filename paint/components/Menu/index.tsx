import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEraser,
  faFileArrowDown,
  faPencil,
  faRotateBack,
  faRotateForward,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.css";

const Menu = () => {
  return (
    <div className={styles.menuWrapper}>
      
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon icon={faPencil} className={styles.icon} />
      </div>
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon icon={faEraser} className={styles.icon} />
      </div>
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon icon={faFileArrowDown} className={styles.icon} />
      </div>
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon icon={faRotateForward} className={styles.icon} />
      </div>
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon icon={faRotateBack} className={styles.icon} />
      </div>
    </div>
  );
};

export default Menu;
