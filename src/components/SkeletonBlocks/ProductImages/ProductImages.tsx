import React from 'react';
import styles from './index.module.css';

const ProductImagesSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainImage}>
        <div className={`${styles.img} ${styles.loading}`}></div>
      </div>
      <div className={styles.thumbnailContainer}>
        {[...Array(4)].map((_, index) => (
          <div className={styles.thumbnail} key={index}>
            <div className={`${styles.img} ${styles.loading}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImagesSkeleton;
