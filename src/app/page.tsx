import React, { Suspense, useContext, useEffect } from "react";
import Category from "@/components/Category/Category";
import DisplayProducts from "@/components/DisplayProducts/DisplayProducts";
import Slider from "@/components/Slider/Slider";
import styles from "./index.module.css";
import ProductList from "@/components/SkeletonBlocks/ProductList/ProductList";

const HomePage = async () => {
  return (
    <div className={styles.container}>
      <Slider />
      <div className="maincontainer">
        <Suspense fallback={<ProductList limit={4} />}>
          <DisplayProducts
            id={process.env.WIX_FEATURE_ID!}
            limit={4}
          />
        </Suspense>
      </div>
      <Category />
      <div className="maincontainer">
        <Suspense fallback={<ProductList limit={4} />}>
          <DisplayProducts
            id={process.env.WIX_HOME_PAGE_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
