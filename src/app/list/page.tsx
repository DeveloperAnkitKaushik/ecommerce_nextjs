import React, { Suspense } from 'react';
import styles from "./index.module.css";
import Link from 'next/link';
import Filter from '@/components/Filter/Filter';
import DisplayProducts from '@/components/DisplayProducts/DisplayProducts';
import ProductList from '@/components/SkeletonBlocks/ProductList/ProductList';
import { wixClientServer } from '@/libs/wixClientServer';

const page = async ({ searchParams }: { searchParams: any }) => {
  const wixClient = await wixClientServer();
  const cat = await wixClient.collections.getCollectionBySlug(
    searchParams.cat || "all-products"
  );
  
  return (
    <div className={styles.container}>
      <div className="maincontainer">
        <div className={styles.innercontainer}>
          <Link href='/'>
            <picture>
              <source srcSet="/listbgmobile.png" media="(max-width: 600px)" />
              <img src="/listbg.png" alt="Background" className={styles.img} />
            </picture>
          </Link>
          <Filter />
          <Suspense fallback={<ProductList limit={4} />}>
            <DisplayProducts
              id={cat.collection?._id || "00000000-000000-000000-000000000001"}
              searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default page;
