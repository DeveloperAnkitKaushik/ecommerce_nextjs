"use client";

import React from 'react';
import styles from "./index.module.css"
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';

const page = () => {
  return (
    <div className={styles.container}>
        <LogoutLink>Log out</LogoutLink>
    </div>
  )
}

export default page