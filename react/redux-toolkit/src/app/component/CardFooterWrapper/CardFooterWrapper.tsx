import React from "react";
import styles from "./CardFooterWrapper.module.css";

const CardFooterWrapper: React.FC = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default CardFooterWrapper;
