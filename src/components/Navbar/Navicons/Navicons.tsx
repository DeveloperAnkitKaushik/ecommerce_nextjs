'use client';

import React, { useEffect, useState } from 'react';
import styles from "./index.module.css";
import { MdOutlinePersonOutline } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navicons = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearchKeyDown = (e:any) => {
        if (e.key === 'Enter') {
            router.push(`/list?name=${searchQuery}`);
            setSearchOpen(false);
        }
    };

    return (
        <div className={styles.container}>
            <AnimatePresence>
                {cartOpen && (
                    <>
                        <motion.div
                            className={styles.cartoverlay}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setCartOpen(false)}
                        />
                        <motion.div
                            className={styles.cart}
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.2 }}
                        >
                            <div>
                                <div className={styles.cartheadng}>
                                    <h1>Shopping Cart</h1>
                                    <IoCloseSharp onClick={() => setCartOpen(false)} />
                                </div>
                                <div className={styles.cartsubhead}>
                                    <img src='/loading.gif' alt='Loading' />
                                    <h1>Congratulations! Your order qualifies for free shipping</h1>
                                </div>
                                <div className={styles.scroll}>
                                    <div className={styles.itemscontainer}>
                                        <div className={styles.itempic} style={{ backgroundImage: `url('https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww')` }}></div>
                                        <div className={styles.itemcontent}>
                                            <div>
                                                <h1>Digital Watch</h1>
                                                <h2>Available</h2>
                                            </div>
                                            <div className={styles.itemquantity}>Qty 1</div>
                                        </div>
                                        <div className={styles.pricecontainer}>
                                            <h1>$40.5</h1>
                                            <h2>Remove</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={styles.subtotalcontainer}>
                                    <div className={styles.subheading}>Sub Total</div>
                                    <div className={styles.subprice}>$40.5</div>
                                </div>
                                <div className={styles.detail}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                <div className={styles.btncontainer}>
                                    <div className={styles.viewcart}>View Cart</div>
                                    <div className={styles.checkout}>Check Out</div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {searchOpen && (
                    <>
                        <motion.div
                            className={styles.searchoverlay}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setSearchOpen(false)}
                        />
                        <motion.div
                            className={styles.searchbar}
                            initial={{ y: "-100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-100%" }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="maincontainer">
                                <div className={styles.searchheader}>
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className={styles.searchinput}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={handleSearchKeyDown}
                                    />
                                    <IoCloseSharp onClick={() => setSearchOpen(false)} className={styles.searchclose} />
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            <Link href="/profile"> <MdOutlinePersonOutline size={26} className={styles.icon} /></Link>
            <FiSearch size={23} onClick={() => setSearchOpen(prev => !prev)} className={styles.icon} />
            <div className={styles.cartcontainer}>
                <AiOutlineShoppingCart size={23} onClick={() => setCartOpen(prev => !prev)} className={styles.icon} />
                <div className={styles.cartitemnumber}>2</div>
            </div>
        </div>
    );
}

export default Navicons;
