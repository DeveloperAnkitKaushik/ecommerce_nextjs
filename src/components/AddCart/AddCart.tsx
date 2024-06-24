"use client";

import React, { useState } from "react";
import styles from "./index.module.css";
import { useWixClient } from "@/hooks/useWixClient";
import { useCartStore } from "@/hooks/useCart";

const AddCart = ({
  productId,
  variantId,
  stockNumber,
}: {
  productId: string;
  variantId: string;
  stockNumber: number;
}) => {
  const [quantity, setQuantity] = useState(1);

  const wixClient = useWixClient();

  const handleQuantityPlus = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleQuantityMinus = () => {
    setQuantity((prev) => prev - 1);
  };

  const { addItem, isLoading } = useCartStore();

  return (
    <div className={styles.qtyContainer}>
      <div className={styles.quantityContainer}>
        <button
          className={styles.minus}
          onClick={() => handleQuantityMinus()}
          disabled={quantity === 1}
        >
          -
        </button>
        <div className={styles.number}>{quantity}</div>
        <button
          className={styles.plus}
          onClick={() => handleQuantityPlus()}
          disabled={quantity === stockNumber}
        >
          +
        </button>
        {stockNumber ? (
          <div className={styles.stockInfo}>
            <h1>
              Only <b>{stockNumber} items left!</b>
            </h1>
            <h1>Dont Miss it</h1>
          </div>
        ) : null}
      </div>
      <div
        className={styles.button}
        onClick={() => addItem(wixClient, productId, variantId, quantity)}
      >
        Add to Cart
      </div>
    </div>
  );
};

export default AddCart;
