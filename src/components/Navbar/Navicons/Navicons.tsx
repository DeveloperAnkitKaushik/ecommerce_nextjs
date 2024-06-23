"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { FiSearch } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useWixClient } from "@/hooks/useWixClient";
import { useCartStore } from "@/hooks/useCart";
import { media as wixMedia } from "@wix/sdk";
import { MdOutlinePersonOutline } from "react-icons/md";
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";

const Navicons = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, isAuthenticated } = useKindeBrowserClient();
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [greeting, setGreeting] = useState('');
  const router = useRouter();

  const wixClient = useWixClient();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        setIsUserLoggedIn(false);
      } else {
        setIsUserLoggedIn(true);
      }
      setIsProfileLoading(false);
    };

      checkAuth();
  }, [user, isAuthenticated]);

  useEffect(() => {
    generateGreeting();
  }, []);

  const { cart, counter, removeItem } = useCartStore();

  const handleSearchKeyDown = (e: any) => {
    if (e.key === "Enter") {
      router.push(`/list?name=${searchQuery}`);
      setSearchOpen(false);
    }
  };

  const generateGreeting = () => {
    const currentHour = new Date().getHours();
    let greetingMessage = '';

    if (currentHour >= 5 && currentHour < 12) {
        greetingMessage = 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
        greetingMessage = 'Good afternoon';
    } else {
        greetingMessage = 'Good evening';
    }

    if (user && user.given_name) {
        greetingMessage += `, ${user.given_name}`;
    }

    setGreeting(greetingMessage);
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
              {counter == 0 ? (
                <div className={styles.emptycontainer}>
                  <IoCloseSharp onClick={() => setCartOpen(false)} className={styles.emptycartclose}/>
                  <img src="/emptycart.png" alt="" />
                </div>
              ) : (
                <>
                  <div>
                    <div className={styles.cartheadng}>
                      <h1>Shopping Cart</h1>
                      <IoCloseSharp onClick={() => setCartOpen(false)} />
                    </div>
                    <div className={styles.cartsubhead}>
                      <h1>
                        Congratulations! Your order qualifies for free shipping
                      </h1>
                    </div>
                    <div className={styles.scroll}>
                      {cart.lineItems &&
                        cart.lineItems.map((item: any) => (
                          <div className={styles.itemscontainer} key={item._id}>
                            {item.image && (
                              <div
                                className={styles.itempic}
                                style={{
                                  backgroundImage: `url(${wixMedia.getScaledToFillImageUrl(
                                    item.image,
                                    72,
                                    96,
                                    {}
                                  )})`,
                                }}
                              ></div>
                            )}
                            <div className={styles.itemcontent}>
                              <div>
                                <h1>{item.productName?.original}</h1>
                                <h2>{item.availability?.status}</h2>
                              </div>
                              <div className={styles.itemquantity}>
                                Qty {item.quantity}
                              </div>
                            </div>
                            <div className={styles.pricecontainer}>
                              <h1>{item.price?.formattedAmount}</h1>
                              <h2
                                onClick={() => removeItem(wixClient, item._id!)}
                                style={{ cursor: "pointer" }}
                              >
                                Remove
                              </h2>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <div className={styles.subtotalcontainer}>
                      <div className={styles.subheading}>Sub Total</div>
                      <div className={styles.subprice}>
                        {/* ₹{cart.subtotal.amount} */}
                      </div>
                    </div>
                    <div className={styles.detail}>*Including taxes*</div>
                    <div className={styles.btncontainer}>
                      <div className={styles.viewcart} title="coming soon..." style={{cursor: 'not-allowed'}}>View Cart</div>
                      <div className={styles.checkout} title="coming soon..." style={{cursor: 'not-allowed'}}>Check Out</div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {profileOpen && (
          <>
            <motion.div
              className={styles.searchoverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setProfileOpen(false)}
            />
            <motion.div
              className={styles.profilePopup}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.15 }}
            >
              {isProfileLoading ? (
                <div className={styles.profileloading}>
                  <img
                    src="/loading.png"
                    alt=""
                    className={`spinner ${styles.profileloadingimg}`}
                  />
                </div>
              ) : isUserLoggedIn ? (
                <div className={styles.profileContent}>
                  <div className={styles.profilebanner}></div>
                  <div className={styles.profileimagecontainer}>
                    <div
                      className={styles.profileimage}
                      style={{ backgroundImage: `url(${user?.picture})` }}
                    ></div>
                  </div>
                  <div className={styles.profilegreeting}>{greeting}</div>
                  <div className={styles.useremail}>{user?.email}</div>
                  <LogoutLink className={styles.profilebtn} postLogoutRedirectURL='/'>Logout</LogoutLink>
                </div>
              ) : (
                <div className={styles.profilelogin}>
                  <LoginLink className={styles.profilebtn} postLoginRedirectURL='/'>
                    Signup/Login
                  </LoginLink>
                </div>
              )}
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
                  <IoCloseSharp
                    onClick={() => setSearchOpen(false)}
                    className={styles.searchclose}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <MdOutlinePersonOutline
        size={26}
        className={styles.icon}
        onClick={() => setProfileOpen((prev) => !prev)}
      />
      <FiSearch
        size={23}
        onClick={() => setSearchOpen((prev) => !prev)}
        className={styles.icon}
      />
      <div className={styles.cartcontainer}>
        <AiOutlineShoppingCart
          size={23}
          onClick={() => setCartOpen((prev) => !prev)}
          className={styles.icon}
        />
        <div className={styles.cartitemnumber}>{counter}</div>
      </div>
    </div>
  );
};

export default Navicons;
