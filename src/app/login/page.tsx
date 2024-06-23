"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const Login = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useKindeBrowserClient();
  const [bgImage, setBgImage] = useState("/loginbg.png");

  useEffect(() => {
    const updateBgImage = () => {
      if (window.innerWidth < 768) {
        setBgImage("/loginbgmobile.png");
      } else {
        setBgImage("/loginbg.png");
      }
    };

    updateBgImage();
    window.addEventListener("resize", updateBgImage);
    return () => {
      window.removeEventListener("resize", updateBgImage);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/profile");
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return <Loading/>; // You can replace this with a spinner or any loading component
  }

  return (
    <div className={styles.container}>
      <img src={bgImage} alt="Background" className={styles.bg} />
      <div className="maincontainer">
        <div className={styles.innercontainer}>
          <h3>Click Here to Login</h3>
          <LoginLink className={styles.btn}>SignUp/LogIn</LoginLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
