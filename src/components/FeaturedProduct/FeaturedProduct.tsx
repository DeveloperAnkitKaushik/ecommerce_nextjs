import React from 'react';
import styles from './index.module.css';
import Link from 'next/link';

const FeaturedProduct = () => {
    const img = 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
    return (
        <div className={styles.container}>
            <div className="maincontainer">
                {/* <div className={styles.heading}>Featured Products</div> */}
                <div className={styles.innercontainer}>
                    {[1, 2, 3, 4].map((_, idx) => (
                        <div className={styles.productcontainer} key={idx}>
                            <div className={`${styles.img} defaultimg`} style={{ backgroundImage: `url(${img})` }}></div>
                            <div className={styles.info}>
                                <div className={styles.productheading}>Digital Marketing</div>
                                <div className={styles.price}>$90</div>
                            </div>
                            <div className={styles.desc}>Lorem ipsum dolor sit amet.</div>
                            <Link href='/' className={styles.btn}>Add to Cart</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedProduct;
