'use client';

import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { products } from "@wix/stores";
import AddCart from "../AddCart/AddCart";

interface AddProductProps {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
}

const AddProduct = ({ productId, variants, productOptions }: AddProductProps) => {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});

  const [selectVariant,setselectVariant] = useState<products.Variant>()

  useEffect(() => {
    const variant = variants.find((v) => {
      const variantChoice = v.choices;
      if(!variantChoice) return false;
      return Object.entries(selectedOptions).every(([key,value]) => variantChoice[key] === value);
    });
    setselectVariant(variant)
  },[selectedOptions,variants]);

  const handleOptionSelect = (optionType: any, choice: any) => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  };

  const isVariantInStock = (choices: { [key: string]: string }) => {
    return variants.some((variant) => {
      const variantChoices = variant.choices;
      if (!variantChoices) return false;
      return Object.entries(choices).every(([key, value]) => variantChoices[key] === value) &&
        variant.stock?.inStock &&
        variant.stock?.quantity &&
        variant.stock?.quantity > 0;
    });
  };

  return (
    <div className={styles.container}>
      {productOptions.map((option) => (
        <div key={option.name} className={styles.optionContainer}>
          {option.choices?.map((choice) => {
            const disabled = !isVariantInStock({
              ...selectedOptions,
              [option.name!]: choice.description!,
            });
            const selected = selectedOptions[option.name!] === choice.description;
            return (
              <div
                key={choice.value}
                className={`${option.name === 'Color' ? styles.color : styles.btn} 
                            ${disabled ? option.name === 'Color' ? styles.colorDisabled : styles.btnDisabled : ''} 
                            ${selected ? option.name === 'Color' ? styles.colorSelected : styles.btnActive : ''}`}
                style={option.name === 'Color' ? { backgroundColor: choice.value } : {}}
                onClick={() => !disabled && handleOptionSelect(option.name, choice.description)}
              >
                {option.name !== 'Color' && choice.description}
              </div>
            );
          })}
        </div>
      ))}
      <AddCart productId={productId}
        variantId={
          selectVariant?._id || "00000000-0000-0000-0000-000000000000"
        }
        stockNumber={selectVariant?.stock?.quantity || 0} />
    </div>
  );
};

export default AddProduct;
