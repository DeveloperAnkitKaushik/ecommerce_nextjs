import React from 'react';
import styles from "./index.module.css";
import { wixClientServer } from '@/libs/wixClientServer';
import { products } from '@wix/stores';

const Category = async() => {
    const wixClient = await wixClientServer();
    const res = await wixClient.collections.queryCollections().find();
    let img = 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    return (
        <div className={styles.container}>
            <div className={styles.innercontainer}>
                <div className={styles.firstlayer}>
                    <div className={styles.imgcontainer1}>
                        <div className={`${styles.img} defaultimg`} style={{ backgroundImage: `url(https://images.unsplash.com/photo-1705096953495-8ea06879b986?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }}></div>
                        <a href='/list?cat=shoes' className={styles.btn}>Shop Now</a>
                    </div>
                    <div className={styles.imgcontainer2}>
                        <div className={`${styles.img} defaultimg`} style={{ backgroundImage: `url(https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }}></div>
                        <a href='/list?cat=tshirt' className={styles.btn}>Shop Now</a>
                    </div>
                </div>
                <div className={styles.secondlayer}>
                    <div className={styles.imgcontainer1}>
                        <div className={`${styles.img} defaultimg`} style={{ backgroundImage: `url(https://images.unsplash.com/photo-1625177602406-6ed44fcc8ef2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }}></div>
                        <a href='/list?cat=pants' className={styles.btn}>Shop Now</a>
                    </div>
                    <div className={styles.imgcontainer2}>
                        <div className={`${styles.img} defaultimg`} style={{ backgroundImage: `url(https://images.unsplash.com/photo-1519758340474-40fa8cba6584?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }}></div>
                        <a href='/list?cat=jackets' className={styles.btn}>Shop Now</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category