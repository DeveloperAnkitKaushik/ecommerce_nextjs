import React, { Suspense } from 'react';
import styles from "./index.module.css"
import ProductImages from '@/components/ProductImages/ProductImages';
import CustomizeProduct from '@/components/CustomizeProduct/CustomizeProduct';
import Reviews from '@/components/Reviews/Reviews';
import { FaStar } from "react-icons/fa6";//full star
import { FaRegStarHalfStroke } from "react-icons/fa6"; // half star
import { FaRegStar } from "react-icons/fa6"; // no star
import { wixClientServer } from '@/libs/wixClientServer';
import { notFound } from 'next/navigation';
import AddCart from '@/components/AddCart/AddCart';
import ProductImagesSkeleton from '@/components/SkeletonBlocks/ProductImages/ProductImages';
import DOMPurify from 'isomorphic-dompurify';

const page = async ({ params }: { params: { slug: string } }) => {
  const wixClient = await wixClientServer();
  const productinfo = await wixClient.products.queryProducts().eq('slug', params.slug).find();

  if (!productinfo.items[0]) {
    return notFound();
  }

  const product = productinfo.items[0];


  return (
    <div className={styles.container}>
      <div className="maincontainer">
        <div className={styles.innercontainer}>
          <Suspense fallback={<ProductImagesSkeleton />}>
            <ProductImages items={product.media?.items} />
          </Suspense>
          <div className={styles.content}>
            <div className={styles.heading}>{product.name}</div>
            <div className={styles.para} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(product.description || '')}}></div>
            <div className={styles.rating}>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <h1>65 Reviews</h1>
            </div>
            {
              product.price?.price === product.price?.discountedPrice ? (
                <div className={styles.pricecontainer}>
                  <div className={styles.discountprice}>{product.price?.formatted?.price}</div>
                </div>
              ) : (
                <div className={styles.pricecontainer}>
                  <div className={styles.normalprice}><s>{product.price?.formatted?.price}</s></div>
                  <div className={styles.discountprice}>₹{product.price?.discountedPrice}</div>
                </div>
              )
            }
            {product.variants && product.productOptions ? (
              <CustomizeProduct productId={product._id!} variants={product.variants!} productOptions={product.productOptions!} />
            ) : <AddCart
              productId={product._id!}
              variantId="00000000-0000-0000-0000-000000000000"
              stockNumber={product?.stock?.quantity || 0}
            />}
            <div className={styles.productinfocontainer}>
              {
                product.additionalInfoSections?.map((section: any) => (
                  <div key={section.title}>
                    <div className={styles.infoheading}>{section.title}</div>
                    <div className={styles.info} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(section.description || '')}}></div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <Reviews />
      </div>
    </div>
  )
}

export default page
