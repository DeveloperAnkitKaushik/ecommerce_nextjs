import React from 'react';
import styles from "./index.module.css";
import Link from 'next/link';
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import Banner from './Banner/Banner';

const Footer = () => {
  return (
    <footer className={styles.container}>
      <Banner/>
      <div className="maincontainer">
        <div className={styles.innercontainer}>
            <div className={styles.content1}>
              <div className={styles.heading}>Get in Touch</div>
              <div className={styles.para}>Dont miss any updates of our new templates and extensions.!</div>
              <input type="text" />
              <div className={styles.btn}>Subscibe</div>
            </div>
            <div className={styles.content2}>
              <div className={styles.heading}>Download</div>
              <Link href='/'>Company</Link>
              <Link href='/'>Android App</Link>
              <Link href='/'>ios App</Link>
              <Link href='/'>Projects</Link>
              <Link href='/'>My tasks</Link>
              <Link href='/'>Desktop</Link>
            </div>
            <div className={styles.content3}>
              <div className={styles.heading}>Help</div>
              <Link href='/'>FAQ</Link>
              <Link href='/'>Term & conditions</Link>
              <Link href='/'>Reporting</Link>
              <Link href='/'>Documentation</Link>
              <Link href='/'>Support Policy</Link>
              <Link href='/'>Privacy</Link>
            </div>
            <div className={styles.content4}>
              <div className={styles.heading}>Social Links</div>
              <div className={styles.iconcontainer}>
                <Link href='/' className={styles.icon}><FaInstagram/></Link>
                <Link href='/' className={styles.icon}><FaLinkedin/></Link>
                <Link href='/' className={styles.icon}><FaTwitter/></Link>
              </div>
            </div>
        </div>
      </div>
      <div className={styles.new_footer_top}>
        <div className={styles.footer_bg}>
          <div className={styles.footer_bg_one}></div>
          <div className={styles.footer_bg_two}></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
