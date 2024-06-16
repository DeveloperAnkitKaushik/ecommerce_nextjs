'use client';

import React, { Suspense, useState } from 'react';
import styles from './index.module.css';
import Image from 'next/image';
import ProductImagesSkeleton from '../SkeletonBlocks/ProductImages/ProductImages';

const ProductImages = ({ items }: { items: any }) => {
  const [mainImage, setMainImage] = useState(items[0].image?.url);

  return (
    <Suspense fallback={<ProductImagesSkeleton />}>
      <div className={styles.container}>
        <div className={styles.mainImage}>
          <Image
            src={mainImage}
            alt='Main Product Image'
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            className={styles.img}
          />
        </div>
        <div className={styles.thumbnailContainer}>
          {items.map((item: any) => (
            <div className={styles.thumbnail} key={item._id} onClick={() => setMainImage(item.image?.url)}>
              <Image
                src={item.image?.url}
                alt=''
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                className={styles.img}
              />
            </div>
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default ProductImages;
