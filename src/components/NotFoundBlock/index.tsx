import React from "react";

import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock:React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span> ☹</span>
        <br /> Nothing found
      </h1>
      <p className={styles.description}>
        Unfortunately, there is no information about this page
      </p>
    </div>
  );
};

export default NotFoundBlock;
