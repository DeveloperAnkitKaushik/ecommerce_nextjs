import React from 'react';
import styles from './index.module.css';

const SuspenseFeaturedProduct = ({limit}:{limit:number}) => {
    return (
        <div className={styles.container}>
            <div className={styles.innercontainer}>
                {[...Array(limit)].map((_, index) => (
                    <div className={styles.productcontainer} key={index}>
                        <div className={`${styles.img} ${styles.loading}`}></div>
                        <div className={styles.info}>
                            <h4 className={styles.loading}></h4>
                            <div className={`${styles.description} ${styles.loading}`}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuspenseFeaturedProduct;
