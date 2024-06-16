'use client';

import React from 'react';
import styles from './index.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


const Filter = () => {
  const path = usePathname();
  const searchParams = useSearchParams()
  const {replace} = useRouter();
  const handleChanges = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const {name,value} = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name,value);
    replace(`${path}?${params.toString()}`)
  } 
  return (
    <div className={styles.container}>
      <select name="type" className={styles.filterItem} onChange={handleChanges}>
        <option>Type</option>
        <option value="physical">Physical</option>
        <option value="digital">Digital</option>
      </select>
      <select name="category" className={styles.filterItem} onChange={handleChanges}>
        <option>Category</option>
        <option value="NewArrival">New Arrival</option>
        <option value="Popular">Popular</option>
      </select>
      <select name="sort" className={styles.filterItem} onChange={handleChanges}>
        <option>Sort By</option>
        <option value="asc price">Price (low to high)</option>
        <option value="desc price">Price (high to low)</option>
        <option value="asc lastUpdated">Newest</option>
        <option value="desc lastUpdated">Oldest</option>
      </select>
    </div>
  );
}

export default Filter;
