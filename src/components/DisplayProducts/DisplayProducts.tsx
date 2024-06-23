import React from 'react';
import styles from './index.module.css';
import Link from 'next/link';
import { wixClientServer } from '@/libs/wixClientServer';
import { products } from '@wix/stores';
import DOMPurify from 'isomorphic-dompurify';

let PRODUCT_PER_PAGE = 20;

const truncateDescription = (description: string, length: number) => {
    if (description.length <= length) {
        return description;
    }
    return description.substring(0, length) + '...';
};

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

    let res;
    try {
        res = await productQuery.find();
    } catch (error) {
        console.error("Error fetching products:", error);
        return <div>Error loading products. Please try again later.</div>;
    }

    if (!res.items) {
        console.error("No items found in response:", res);
        return <div>No products found.</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.innercontainer}>
                {res.items.map((product: products.Product) => (
                    <div className={styles.productcontainer} key={product._id}>
                        <Link href={"/" + product.slug} className={styles.imgcontainer}>
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
                        </Link>
                        <div className={styles.info}>
                            <div className={styles.productheading}>{product.name}</div>
                            <div className={styles.price}>{product.price?.formatted?.price}</div>
                        </div>
                        {product.description && (
                            <div
                                className={styles.desc}
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(truncateDescription(product.description, 60))
                                }}></div>
                        )}
                        <button className={styles.btn} title='not working'>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplayProducts;
