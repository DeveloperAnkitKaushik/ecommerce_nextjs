import React from 'react';
import styles from "./index.module.css"

const page = () => {
  return (
    <div className={styles.container}>
      <div className="maincontainer">
        <div className={styles.innercontainer}>
          <div className={styles.banner}></div>
        </div>
      </div>
    </div>
  )
}

export default page