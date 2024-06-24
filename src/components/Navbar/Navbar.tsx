"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./index.module.css";
import { MdOutlineStackedLineChart } from "react-icons/md";
import { GiCrossedBones } from "react-icons/gi";
import Navicons from "./Navicons/Navicons";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <header className={styles.container}>
        <div className={`${styles.innercontainer} maincontainer`}>
          <nav className={`${styles.links} ${isMenuOpen ? `${styles.menuOpen} ${styles.animationOpen}` : ""}`}>
            <Link href="/" className={styles.link}>Shop</Link>
            <a href="/list" className={styles.link} target="_blank">Deals</a>
            <a href="https://kaushikankit.vercel.app/" className={styles.link} target="_blank">About</a>
            <a href="https://www.linkedin.com/in/ankitkaushik/" className={styles.link} target="_blank">Contact</a>
          </nav>
          <Link href="/" className={styles.imagecontainer}><img src="/logo.png" alt="" className={styles.logo} /></Link>
          <Navicons/>
          {isMenuOpen ? (
            <GiCrossedBones size={30} className={`${styles.cross} `} onClick={toggleMenu} />
          ) : (
            <MdOutlineStackedLineChart size={30} className={styles.hamburger} onClick={toggleMenu} />
          )}
        </div>
      </header>
      <div className={styles.spacesupport}></div>
    </>
  );
};

export default Navbar;