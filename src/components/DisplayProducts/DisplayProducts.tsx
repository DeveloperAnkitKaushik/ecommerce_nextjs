import React from 'react';
import styles from './index.module.css';
import Link from 'next/link';
import { wixClientServer } from '@/libs/wixClientServer';
import { products } from '@wix/stores';
import DOMPurify from 'isomorphic-dompurify';

let PRODUCT_PER_PAGE = 20;

const DisplayProducts = async ({ id, limit, searchParams }: { id: any, limit?: any, searchParams?: any }) => {
    const wixClient = await wixClientServer();
    const productQuery = wixClient.products
        .queryProducts()
        .startsWith("name", searchParams?.name || "")
        .eq("collectionIds", id)
        .hasSome(
            "productType",
            searchParams?.type ? [searchParams.type] : ["physical", "digital"]
        )
        .limit(limit || PRODUCT_PER_PAGE)
        .skip(
            searchParams?.page
                ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
                : 0
        );
    if (searchParams?.sort) {
        const [sortType, sortBy] = searchParams.sort.split(" ");

        if (sortType === "asc") {
            productQuery.ascending(sortBy);
        }
        if (sortType === "desc") {
            productQuery.descending(sortBy);
        }
    }
    const res = await productQuery.find();

    return (
        <div className={styles.container}>
            <div className={styles.innercontainer}>
                {res.items.map((product: products.Product) => (
                    <Link className={styles.productcontainer} href={"/" + product.slug} key={product._id}>
                        <div className={styles.imgcontainer}>
                            <div
                                className={`${styles.img} ${styles.defaultimg}`}
                                style={{ backgroundImage: `url(${product.media?.mainMedia?.image?.url || '/product.png'})` }}>
                            </div>
                            {product.media?.items?.[1]?.image?.url && (
                                <div
                                    className={`${styles.img} ${styles.hoverimg}`}
                                    style={{ backgroundImage: `url(${product.media?.items[1]?.image?.url || '/product.png'})` }}>
                                </div>
                            )}
                        </div>
                        <div className={styles.info}>
                            <div className={styles.productheading}>{product.name}</div>
                            <div className={styles.price}>{product.price?.formatted?.price}</div>
                        </div>
                        {product.additionalInfoSections && (
                            <div
                                className={styles.desc}
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(product.additionalInfoSections.find((section: any) => section.title === 'shortdesc')?.description || '')
                                }}></div>
                        )}
                        <button className={styles.btn}>Add to Cart</button>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default DisplayProducts;
