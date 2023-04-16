import React from "react";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className="h-screen fixed top-0 left-0 bg-gray-700 w-full z-50 opacity-70 flex justify-center items-center">
      <div className={styles.newtons_cradle}>
        <div className={styles.newtons_cradle__dot}></div>
        <div className={styles.newtons_cradle__dot}></div>
        <div className={styles.newtons_cradle__dot}></div>
        <div className={styles.newtons_cradle__dot}></div>
      </div>
    </div>
  );
};

export default Loading;
