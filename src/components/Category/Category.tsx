import React from 'react';
import styles from "./index.module.css";

const Category = () => {
    let img = 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    return (
        <div className={styles.container}>
            <div className={styles.innercontainer}>
                <div className={styles.firstlayer}>
                    <div className={styles.imgcontainer1}>
                        <div className={`${styles.img} defaultimg`} style={{ backgroundImage: `url(${img})` }}></div>
                        <a href='/' className={styles.btn}>Shop Now</a>
                    </div>
                    <div className={styles.imgcontainer2}>
                        <div className={`${styles.img} defaultimg`} style={{ backgroundImage: `url(${img})` }}></div>
                        <a href='/' className={styles.btn}>Shop Now</a>
                    </div>
                </div>
                <div className={styles.secondlayer}>
                    <div className={styles.imgcontainer1}>
                        <div className={`${styles.img} defaultimg`} style={{ backgroundImage: `url(${img})` }}></div>
                        <a href='/' className={styles.btn}>Shop Now</a>
                    </div>
                    <div className={styles.imgcontainer2}>
                        <div className={`${styles.img} defaultimg`} style={{ backgroundImage: `url(${img})` }}></div>
                        <a href='/' className={styles.btn}>Shop Now</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category