import React from 'react';
import styles from "./index.module.css";
import Link from 'next/link';

const Banner = () => {
    const img = 'https://cdn.builder.io/api/v1/image/assets%2F8a0dd03ad52340849785aa8840f575d4%2F64c736e397154e9883a4919e626cf449?format=webp&width=2000';
    return (
        <div className={styles.innercontainer}>
            <div className={`${styles.img} defaultimg`} style={{ backgroundImage: `url(${img})` }}></div>
            <div className={styles.content}>
                <div className={styles.heading}>Give Back With Us</div>
                <div className={styles.para}>
                    We are pledging 1% of all revenue to 4 partner charity organizations. You all be able to directly participate in this initiative at checkout, where you can choose which cause you do like us to donate to!
                </div>
                <Link href='/' className={styles.btn}>Our Causes</Link>
            </div>
        </div>
    )
}

export default Banner